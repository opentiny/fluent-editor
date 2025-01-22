<script setup lang="ts">
import FluentEditor from '@opentiny/fluent-editor'
import { onMounted } from 'vue'

let editor

onMounted(() => {
  editor = new FluentEditor('#editor', {
    theme: 'snow',
  })
})
</script>

<template>
  <RouterLink to="/">
    &lt;返回
  </RouterLink>
  <div id="editor">
    <p>Hello <strong>TinyEditor</strong>!</p>
  </div>
</template>
