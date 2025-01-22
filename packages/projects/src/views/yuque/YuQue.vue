<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'

let editor

onMounted(() => {
  editor = new FluentEditor('#editor', {
    theme: 'snow',
  })
})
</script>

<template>
  <RouterLink to="/">&lt;返回</RouterLink>
  <div id="editor">
    <p>Hello <strong>TinyEditor</strong>!</p>
  </div>
</template>
