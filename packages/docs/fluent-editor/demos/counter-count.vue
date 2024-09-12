<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'

let editor

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor-counter-count', {
      theme: 'snow',
      modules: {
        counter: {
          count: 2000,
        },
      },
    })
  })
})
</script>

<template>
  <div id="editor-counter-count" />
</template>
