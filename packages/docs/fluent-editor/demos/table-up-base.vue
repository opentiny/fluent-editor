<script setup lang="ts">
import Quill from 'quill'
import { onMounted, ref } from 'vue'

let editor
const editorRef = ref()

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    Quill.register({
      [`modules/${module.TableUp.moduleName}`]: module.TableUp,
    }, true)

    editor = new FluentEditor(editorRef.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [] }],
          ['bold', 'italic', 'underline', 'link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean', 'code', 'code-block', 'image', 'video'],
          [{ [module.TableUp.toolName]: [] }],
        ],
        [module.TableUp.moduleName]: {},
      },
    })
  })
})
</script>

<template>
  <div ref="editorRef" />
</template>
