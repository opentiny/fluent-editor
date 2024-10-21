<script setup lang="ts">
import { onMounted } from 'vue'

// 代码块高亮
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// 插入公式
import katex from 'katex'
import 'katex/dist/katex.min.css'

// 截屏
import Html2Canvas from 'html2canvas'

window.hljs = hljs
window.katex = katex
window.Html2Canvas = Html2Canvas

let editor

const TOOLBAR_CONFIG = [
  ['undo', 'redo', 'clean', 'format-painter'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: ['songti', 'yahei', 'kaiti', 'heiti', 'lishu', 'mono', 'arial', 'arialblack', 'comic', 'impact', 'times'] }, { size: ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '36px', '48px', '72px'] }],
  ['bold', 'italic', 'strike', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  ['link', 'blockquote', 'code', 'code-block'],
  ['image', 'file', 'better-table'],
  ['emoji', 'video', 'formula', 'screenshot'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        'toolbar': TOOLBAR_CONFIG,
        'file': true,
        'emoji-toolbar': true,
        'syntax': true,
      },
    })
  })
})
</script>

<template>
  <div id="editor" />
</template>
