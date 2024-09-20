<script setup lang="ts">
import { onMounted } from 'vue'

let editor

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        counter: true,
      },
    })
  })
})
</script>

<template>
  <div id="editor" />
</template>
