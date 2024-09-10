<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'
import '@opentiny/fluent-editor/index.scss'

let editor

const TOOLBAR_CONFIG = [
  ['undo', 'redo', 'clean'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }, { size: ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '36px', '48px', '72px'] }],
  ['bold', 'italic', 'strike', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  ['link', 'blockquote', 'code', 'code-block'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
      },
    })
  })
})
</script>

<template>
  <div id="editor" />
</template>
