<script setup lang="ts">
import { onMounted, ref } from 'vue'

let editor
const editorRef = ref()

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor(editorRef.value, {
      theme: 'snow',
      modules: {
        'toolbar': [
          ['bold', 'italic', 'strike', 'underline'],
          ['link', 'image'],
          [{ color: [] }, { background: [] }],
          ['better-table'],
        ],
        'counter': true,
        'better-table': true,
      },
      lang: 'zh-CN',
      langText: {
        'copy-cells': '复制单元格',
        'copy-table': '复制表格',
        'cut-cells': '剪切单元格',
        'empty-cells': '清空单元格',
      },
    })
  })
})
</script>

<template>
  <div ref="editorRef" />
</template>
