<script setup lang="ts">
import { onMounted } from 'vue'

let mathliveEditor

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['formula'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    mathliveEditor = new FluentEditor('#mathliveEditor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR_CONFIG,
          handlers: {
            formula() {
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
  <div id="mathliveEditor" />
</template>
