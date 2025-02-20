<script setup lang="ts">
import { createSelectBox, defaultCustomSelect, TableUp } from 'quill-table-up'
import { onMounted, ref } from 'vue'
import 'quill-table-up/index.css'
import 'quill-table-up/table-creator.css'

let editor
const editorRef = ref<HTMLElement>()

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  [{ 'table-up': [] }],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then(({ default: FluentEditor, generateTableUp, generateTableUpShortKeyMenu }) => {
    FluentEditor.register({ 'modules/table-up': generateTableUp(TableUp) }, true)
    const { tableUpConfig, tableUpKeyboardControl } = generateTableUpShortKeyMenu(createSelectBox)
    if (editorRef.value) {
      editor = new FluentEditor(editorRef.value, {
        theme: 'snow',
        modules: {
          'toolbar': TOOLBAR_CONFIG,
          'table-up': {
            customSelect: defaultCustomSelect,
          },
          'shortcut-key': {
            menuItems: [tableUpConfig],
            isMenuItemsAdd: true,
            menuKeyboardControls(event, data) {
              let result = false
              result = tableUpKeyboardControl(event, data) || result
              return result
            },
          },
        },
      })
    }
  })
})
</script>

<template>
  <div ref="editorRef" />
</template>
