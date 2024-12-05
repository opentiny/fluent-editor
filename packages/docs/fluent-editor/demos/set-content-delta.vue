<script setup lang="ts">
import { onMounted } from 'vue'

let editor

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor-set-content-delta', {
      theme: 'snow',
    })

    const delta = {"ops":[{"insert":"Hello "},{"attributes":{"bold":true},"insert":"Fluent Editor"},{"insert":"!\n"}]}

    editor.setContents(delta)
  })
})
</script>

<template>
  <div id="editor-set-content-delta"></div>
</template>
