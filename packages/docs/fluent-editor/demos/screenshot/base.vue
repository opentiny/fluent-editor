<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Html2Canvas from 'html2canvas'

let editor
const editorRef = ref<HTMLElement>()

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['screenshot'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default
    if (!editorRef.value) return
    editor = new FluentEditor(editorRef.value, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
      },
      screenshot: {
        Html2Canvas,
      },
    })
  })
})
</script>

<template>
  <div ref="editorRef" />
</template>
