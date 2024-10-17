<script setup lang="ts">
import hljs from 'highlight.js'
import katex from 'katex'
import Quill from 'quill'
import { onMounted, ref, shallowRef } from 'vue'
import 'highlight.js/styles/atom-one-dark.css'
import 'katex/dist/katex.min.css'

window.katex = katex

let editor
const editorRef = ref()
const contents = shallowRef<Record<string, any>[]>([])

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    module.updateTableConstants({
      blotName: {
        tableCol: 'a-col',
        tableCellInner: 'a-cell-inner',
      },
      tableUpSize: {
        colMinWidthPre: 20,
        colMinWidthPx: 40,
      },
    })

    Quill.register({
      [`modules/${module.TableUp.moduleName}`]: module.TableUp,
    }, true)

    editor = new FluentEditor(editorRef.value, {
      theme: 'snow',
      modules: {
        'toolbar': [
          [{ header: [] }],
          ['bold', 'italic', 'underline', 'link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean', 'code', 'code-block', 'image', 'video'],
          ['formula', 'emoji'],
          [{ [module.TableUp.toolName]: [] }],
        ],
        [module.TableUp.moduleName]: {},
        'emoji-toolbar': true,
        'syntax': {
          hljs,
        },
      },
    })
    editor.on(Quill.events.TEXT_CHANGE, () => {
      contents.value = editor.getContents().ops
    })
  })
})
</script>

<template>
  <div ref="editorRef" />
  <ul style="max-height: 500px; overflow: auto;">
    <li v-for="(val, i) in contents" :key="i" style="margin-top: 0">
      {{ JSON.stringify(val) }},
    </li>
  </ul>
</template>
