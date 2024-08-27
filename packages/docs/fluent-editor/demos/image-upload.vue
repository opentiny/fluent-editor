<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'

let editor

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['image', 'video']
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG
      }
    })
  })
})

const con = () => {
  console.log(editor.getContents())
}
</script>

<template>
  <button @click="con">some</button>
  <div id="editor"></div>
</template>
