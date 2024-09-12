<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'
import '@opentiny/fluent-editor/index.scss'
import hljs from 'highlight.js'
// import the highlight.js theme you want
import 'highlight.js/styles/atom-one-dark.css'
// config extra languages
import go from 'highlight.js/lib/languages/go'
hljs.registerLanguage('go', go)

let editor

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['code-block'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
        syntax: {
          hljs,
          languages: [
            { key: 'go', label: 'Golang' },
          ],
        },
      },
    })
  })
})
</script>

<template>
  <div id="editor" />
</template>
