import type { Range } from 'quill/core/quill'

import Quill from 'quill'
import {
  FILE_UPLOADER_MIME_TYPES,
  IMAGE_UPLOADER_MIME_TYPES,
} from './config/editor.config'

interface InsertFileData {
  code: number
  message?: string
  data: {
    title: string
    size: number
    src: string
  }
}

const Uploader = Quill.imports['modules/uploader']
const Delta = Quill.import('delta')

class CustomUploader extends Uploader {
  quill
  options

  upload(range, files, isFile?) {
    const uploads = []
    const fileFlags = []
    const rejectFlags = {
      file: false,
      image: false,
    }
    const uploadOption = this.quill.options.uploadOption
    const acceptObj
      = (uploadOption && {
        image: uploadOption.imageAccept,
        file: uploadOption.fileAccept,
      })
      || {}
    Array.from(files).forEach((file: any) => {
      if (file) {
        const fileFlag
          = typeof isFile === 'boolean'
            ? isFile
            : !/^image\/[-\w.]+$/.test(file.type)
        const fileType = fileFlag ? 'file' : 'image'
        const accept = acceptObj[fileType] || this.options[fileType]
        if (this.isAllowedFileType(accept, file)) {
          uploads.push(file)
          fileFlags.push(fileFlag)
        }
        else {
          rejectFlags[fileType] = true
        }
      }
    })
    this.options.handler.call(this, range, uploads, fileFlags, rejectFlags)
  }

  isAllowedFileType = (accept: Array<string> | string, file: File) => {
    if (accept) {
      const baseMimeType = file.type.replace(/\/.*$/, '')
      const acceptArr = typeof accept === 'string' ? accept.split(',') : accept
      return acceptArr.some((type: string) => {
        const validType = type.trim()
        //  suffix name (e.g. '.png,.xlsx')
        if (validType.startsWith('.')) {
          return (
            file.name
              .toLowerCase()
              .includes(validType.toLowerCase(), file.name.toLowerCase().length - validType.toLowerCase().length)
          )
          // mime type like 'image/*'
        }
        else if (/\/\*$/.test(validType)) {
          return baseMimeType === validType.replace(/\/.*$/, '')
        }
        //  mime type like 'text/plain,application/json'
        return file.type === validType
      })
    }
    return true
  }

  // 处理上传文件
  handleUploadFile(range, files, _hasRejectedFile) {
    this.insertFileToEditor(range, files[0], {
      code: 0,
      data: {
        title: files[0].name,
        size: files[0].size,
        src: files[0].src,
      },
    })
  }

  // 将文件插入编辑器
  insertFileToEditor(range: Range, file: File, { code, message, data }: InsertFileData) {
    if (code === 0) {
      const oldContent = new Delta().retain(range.index).delete(range.length)
      const videoFlag = this.uploadOption && this.uploadOption.isVideoPlay && /^video\/[-\w.]+$/.test(file.type)
      const insertObj = videoFlag ? { video: data } : { file: data }
      const currentContent = new Delta([{ insert: insertObj }])
      const newContent = oldContent.concat(currentContent)
      this.quill.updateContents(newContent, Quill.sources.USER)
      this.quill.setSelection(range.index + 1)
    }
    else {
      console.error('error message:', message)
    }
  }

  // 将图片插入编辑器
  insertImageToEditor(range, { code, message, data }) {
    if (code === 0) {
      const { imageId, imageUrl } = data
      // 粘贴截图或者从外源直接拷贝的单图时，需要将编辑器中已选中的内容删除
      const oldContent = new Delta().retain(range.index).delete(range.length)
      const currentContent = new Delta([
        {
          insert: { image: imageUrl },
          attributes: { 'image-id': imageId },
        },
      ])
      const newContent = oldContent.concat(currentContent)
      this.quill.updateContents(newContent, Quill.sources.USER)
      this.quill.setSelection(range.index + 1)
    }
    else {
      console.error('error message:', message)
    }
  }

  // 处理上传图片
  handleUploadImage(range, { file, files }, hasRejectedImage) {
    if (this.quill.options.uploadOption?.imageUpload) {
      const imageEnableMultiUpload = this.enableMultiUpload === true || this.enableMultiUpload?.image

      const result = {
        file,
        data: { files: [file] },
        hasRejectedImage,
        callback: (res) => {
          if (!res) {
            return
          }
          if (imageEnableMultiUpload && Array.isArray(res)) {
            res.forEach(value => this.insertImageToEditor(range, value))
          }
          else {
            this.insertImageToEditor(range, res)
          }
        },
      }
      if (imageEnableMultiUpload) {
        result.data = { files }
      }
      this.quill.options.uploadOption?.imageUpload(result)
    }
    else {
      const promises = files.map((fileItem) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e: any) => {
            resolve(e.target.result)
          }
          reader.readAsDataURL(fileItem)
        })
      })
      Promise.all(promises).then((images) => {
        const update = images.reduce((delta: any, image) => {
          return delta.insert({ image })
        }, new Delta().retain(range.index).delete(range.length))

        this.quill.updateContents(update, Quill.sources.USER)
        this.quill.setSelection(range.index + images.length, Quill.sources.SILENT)
      })
    }
  }
}

CustomUploader.DEFAULTS = {
  file: FILE_UPLOADER_MIME_TYPES,
  image: IMAGE_UPLOADER_MIME_TYPES,
  enableMultiUpload: false,
  handler(range, files, fileFlags, rejectFlags) {
    const fileArr = []
    const imgArr = []
    files.forEach((file, index) => (fileFlags[index] ? fileArr.push(file) : imgArr.push(file)))
    if (this.quill.options.modules.file && (fileArr.length || rejectFlags.file)) {
      this.handleUploadFile(range, fileArr, rejectFlags.file)
    }
    if (imgArr.length || rejectFlags.image) {
      this.handleUploadImage(range, { file: imgArr[0], files: imgArr }, rejectFlags.image)
    }
  },
}

export default CustomUploader
