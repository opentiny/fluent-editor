import { isNullOrUndefined } from './editor.utils'

export * from './editor.config'
export * from './editor.utils'

// 触发上传
export function inputFile(type, accept) {
  const defaultMIMETypes = this.quill.uploader.options[type].join(', ')
  const mimeTypes = accept || defaultMIMETypes
  let fileInput = this.container.querySelector(`input.ql-${type}[type=file]`)
  this.quill.uploader.options.enableMultiUpload = this.quill.options.uploadOption?.multiple
  if (isNullOrUndefined(fileInput)) {
    fileInput = document.createElement('input')
    fileInput.classList.add(`ql-${type}`)
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', mimeTypes)
    if (
      this.quill.uploader.options.enableMultiUpload === true
      || (this.quill.uploader.options.enableMultiUpload?.file && type === 'file')
      || (this.quill.uploader.options.enableMultiUpload?.image && type === 'image')
    ) {
      fileInput.setAttribute('multiple', '')
    }
    fileInput.addEventListener('change', () => {
      const range = this.quill.getSelection(true)
      this.quill.uploader.upload(range, fileInput.files, type === 'file')
      fileInput.value = ''
    })
    this.container.appendChild(fileInput)
  }
  fileInput.click()
}

export function getListValue(value, preListValue) {
  let curListValue = value
  if (preListValue && preListValue === value) {
    curListValue = false
  }
  else if (value === 'check') {
    if (preListValue === 'checked' || preListValue === 'unchecked') {
      curListValue = false
    }
    else {
      curListValue = 'unchecked'
    }
  }
  return curListValue
}
/** css namespace */
export const namespace = 'fe'
