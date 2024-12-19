<script setup lang="ts">
import Modal from '@opentiny/vue-modal'
import { onMounted } from 'vue'

let editor

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['image'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default
    const { imageFileToUrl } = module

    editor = new FluentEditor('#editor-image-upload-before-upload', {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
      },
      uploadOption: {
        imageUpload: ({ file, editor }) => {
          if (file.type === 'image/gif') {
            Modal.message({ status: 'warning', message: 'Do not support uploading images in GIF format.' })
            return
          }

          if (file.size > 1024 * 1024) {
            Modal.message({ status: 'warning', message: 'The image size must not exceed 1MB.' })
            return
          }

          const range = editor.getSelection()

          imageFileToUrl(file).then((imageUrl) => {
            editor.uploader.insertImageToEditor(range, {
              code: 0,
              data: {
                imageUrl,
              },
            })
            Modal.message({ status: 'info', message: 'Upload successfully!' })
          })
        },
      },
    })
  })
})
</script>

<template>
  <div id="editor-image-upload-before-upload" />
  <div />
</template>
