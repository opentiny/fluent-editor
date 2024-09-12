<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'

let editor

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['better-table'],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        'toolbar': TOOLBAR_CONFIG,
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
  })
})

</script>

<template>
  <div id="editor" />
</template>
