<script setup lang="ts">
import { onMounted } from 'vue'

let editor

const TOOLBAR_CONFIG = [
  ['formula'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR_CONFIG,
          handlers: {
            formula: function () {
              const mathlive = this.quill.getModule('mathlive')
              mathlive.createDialog('e=mc^2')
            },
          },
        },
        mathlive: true,
      },
    })
  })
})
</script>

<template>
  <div id="editor" />
</template>
