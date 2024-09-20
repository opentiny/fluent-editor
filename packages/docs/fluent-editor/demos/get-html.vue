<script setup lang="ts">
import { onMounted, ref } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
window.katex = katex

let editor

// @提醒
const searchKey = 'name'
const mentionList = [
  {
    name: 'Jack',
    age: 26,
    cn: 'Jack 杰克',
  },
  {
    name: 'Lucy',
    age: 22,
    cn: 'Lucy 露西',
  },
]

const TOOLBAR_CONFIG = [
  ['undo', 'redo', 'clean', 'format-painter'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }, { size: ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '36px', '48px', '72px'] }],
  ['bold', 'italic', 'strike', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  ['link', 'blockquote', 'code', 'code-block'],
  ['image', 'file', 'better-table'],
  ['emoji', 'video', 'formula'],
]

const articleRef = ref<HTMLElement>()
const updateHTML = (html: string) => {
  if (articleRef.value) {
    articleRef.value.innerHTML = html
  }
}

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        'toolbar': TOOLBAR_CONFIG,
        'syntax': { hljs },
        'emoji-toolbar': true,
        'file': true,
        'mention': {
          itemKey: 'cn',
          searchKey,
          search: function (term) {
            return mentionList.filter((item) => {
              return item[searchKey] && String(item[searchKey]).includes(term)
            })
          },
        },
        'better-table': {
          operationMenu: {
            color: {
              text: '主题色',
              colors: [
                '#ffffff', '#f2f2f2', '#dddddd', '#a6a6a6', '#666666', '#000000',
                '#c00000', '#ff0000', '#ffc8d3', '#ffc000', '#ffff00', '#fff4cb',
                '#92d050', '#00b050', '#dff3d2', '#00b0f0', '#0070c0', '#d4f1f5',
                '#002060', '#7030a0', '#7b69ee', '#1476ff', '#ec66ab', '#42b883',
              ],
            },
          },
        },
      },
    })

    updateHTML(editor.root.innerHTML)

    editor.on('text-change', () => {
      updateHTML(editor.root.innerHTML)
    })
  })
})
</script>

<template>
  <div id="editor">
    <p>Hello <strong>Fluent Editor</strong>!</p>
  </div>
  <br>
  预览效果：
  <div
    ref="articleRef"
    class="article ql-editor"
  />
</template>
