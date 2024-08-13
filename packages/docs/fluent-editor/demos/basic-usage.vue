<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'

let editor

onMounted(() => {
  editor = new FluentEditor('#editor', {
    theme: 'snow'
  })
})
</script>

<template>
  <div id="editor">
    <p>Hello <strong>FluentEditor</strong>!</p>
  </div>
</template>
