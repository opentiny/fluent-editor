<script setup lang="ts">
import {
  defaultCustomSelect,
  TableResizeBox,
  TableResizeLine,
  TableResizeScale,
  TableUp,
} from 'quill-table-up'
import { onMounted, ref } from 'vue'
import 'quill-table-up/index.css'
import 'quill-table-up/table-creator.css'

let editorbox
let editorLine
let editorScale
const editorBoxRef = ref<HTMLElement>()
const editorLineRef = ref<HTMLElement>()
const editorScaleRef = ref<HTMLElement>()

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  [{ 'table-up': [] }],
]

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then(({ default: FluentEditor, generateTableUp }) => {
    FluentEditor.register({ 'modules/table-up': generateTableUp(TableUp) }, true)
    if (editorBoxRef.value) {
      editorbox = new FluentEditor(editorBoxRef.value, {
        theme: 'snow',
        modules: {
          'toolbar': TOOLBAR_CONFIG,
          'better-table': false,
          'table-up': {
            customSelect: defaultCustomSelect,
            resize: TableResizeBox,
          },
        },
      })
    }
    if (editorLineRef.value) {
      editorLine = new FluentEditor(editorLineRef.value, {
        theme: 'snow',
        modules: {
          'toolbar': TOOLBAR_CONFIG,
          'better-table': false,
          'table-up': {
            customSelect: defaultCustomSelect,
            resize: TableResizeLine,
          },
        },
      })
    }
    if (editorScaleRef.value) {
      editorScale = new FluentEditor(editorScaleRef.value, {
        theme: 'snow',
        modules: {
          'toolbar': TOOLBAR_CONFIG,
          'better-table': false,
          'table-up': {
            customSelect: defaultCustomSelect,
            resizeScale: TableResizeScale,
          },
        },
      })
    }
  })
})
</script>

<template>
  <div>
    <p>包围盒：点击表格内部显示调整包围盒</p>
    <div ref="editorBoxRef" />
    <p>内部隐藏线：点击表格内部，鼠标移至单元格右侧或下侧拖拽进行调整</p>
    <div ref="editorLineRef" />
    <p>整体单元格调整：点击表格内部，拖拽右下角方块调整</p>
    <div ref="editorScaleRef" />
  </div>
</template>
