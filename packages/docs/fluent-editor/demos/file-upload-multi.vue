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

    editor = new FluentEditor('#editor-multi-upload', {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
        file: true,
      },
      uploadOption: {
        multiple: true,
      },
    })
  })
})
</script>

<template>
  <div id="editor-multi-upload" />
</template>
