<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'
import MarkdownShortcuts from 'quill-markdown-shortcuts'

let editor

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    FluentEditor.register('modules/markdownShortcuts', MarkdownShortcuts)

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        markdownShortcuts: true,
      },
    })
  })
})
</script>

<template>
  <div id="editor" />
</template>
