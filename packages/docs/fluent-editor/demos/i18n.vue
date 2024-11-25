<script setup lang="ts">
import { onMounted, ref } from 'vue'

let editor
const editorRef = ref()
const lang = ref('zh-CN')

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
      lang: lang.value,
    })
  })
})
function switchLanguage() {
  lang.value = lang.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  editor.changeLanguage({ lang: lang.value })
}
</script>

<template>
  <button @click="switchLanguage">
    Click here to switch between Chinese and English languages
  </button>
  <div ref="editorRef" />
</template>
