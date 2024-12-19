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

    editor = new FluentEditor('#editor-image-upload-option', {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
      },
      uploadOption: {
        imageAccept: ['image/png', 'image/gif'],
        maxSize: 1024 * 1024, // 1MB
        success: (file) => {
          Modal.message({ status: 'info', message: 'Upload successfully!' })
        },
        fail: (file) => {
          Modal.message({ status: 'error', message: 'Upload failed!' })
        },
      },
    })
  })
})
</script>

<template>
  <div id="editor-image-upload-option" />
  <div />
</template>
