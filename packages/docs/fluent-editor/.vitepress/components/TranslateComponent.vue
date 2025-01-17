<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const currentLang = ref('chinese_simplified')

onMounted(() => {
  setTimeout(() => {
    currentLang.value = translate.language.getCurrent()
  }, 3000)
})

function switchLang() {
  if (translate.language.getCurrent() === 'chinese_simplified') {
    translate.changeLanguage('english')
    currentLang.value = 'english'
  }
  else {
    translate.changeLanguage('chinese_simplified')
    currentLang.value = 'chinese_simplified'
  }
}
</script>

<template>
  <div class="translate-switch">
    <a @click="switchLang">{{ currentLang === 'english' ? 'English' : '简体中文' }}</a>
  </div>
</template>

<style scoped>
.translate-switch {
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}
</style>
