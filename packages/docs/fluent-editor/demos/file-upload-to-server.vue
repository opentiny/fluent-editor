<script setup lang="ts">
import { onMounted } from 'vue'

let editor

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['file'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor-file-upload-to-server', {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
        file: true,
      },
      uploadOption: {
        fileUpload: ({ file, callback }) => {
          // Upload file to server, get fileUrl: https://calibre-ebook.com/downloads/demos/demo.docx
          callback({
            fileUrl: 'https://calibre-ebook.com/downloads/demos/demo.docx',
          })
        },
      },
    })
  })
})
</script>

<template>
  <div id="editor-file-upload-to-server" />
</template>
