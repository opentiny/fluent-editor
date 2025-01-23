<script setup lang="ts">
import FluentEditor from '@opentiny/fluent-editor'
import { onMounted } from 'vue'

let editor

onMounted(() => {
  editor = new FluentEditor('#editor', {
    theme: 'snow',
    modules: {
      toolbar: {
        container: '#toolbar'
      }
    }
  })
})
</script>

<template>
  <div class="fixed h-[52px] w-full flex items-center pl-[16px]">
    <RouterLink to="/">
      &lt;返回
    </RouterLink>
  </div>
  <div id="toolbar" class="fixed h-[42px] w-full top-[52px] !border-l-0 !border-r-0 !border-[rgba(0,0,0,0.04)] text-center">
    <span class="ql-formats">
      <button class="ql-undo"></button>
      <button class="ql-redo"></button>
      <button class="ql-format-painter"></button>
      <button class="ql-clean"></button>
    </span>
    <span class="ql-formats">
      <select class="ql-header">
        <option value=""></option>
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
      </select>
      <select class="ql-size">
        <option value="12px"></option>
        <option value="13px"></option>
        <option value="14px"></option>
        <option value="15px"></option>
        <option value="16px"></option>
        <option value="19px"></option>
        <option value="22px"></option>
        <option value="24px"></option>
        <option value="29px"></option>
        <option value="32px"></option>
        <option value="40px"></option>
        <option value="48px"></option>
      </select>
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-strike"></button>
      <button class="ql-underline"></button>
      <button class="ql-script" value="super"></button>
      <button class="ql-script" value="sub"></button>
      <button class="ql-code"></button>
    </span>
    <span class="ql-formats">
      <select class="ql-color">
        <option value="rgb(0, 0, 0)"></option>
        <option value="rgb(38, 38, 38)"></option>
        <option value="rgb(88, 90, 90)"></option>
        <option value="rgb(138, 143, 141)"></option>
        <option value="rgb(216, 218, 217)"></option>
        <option value="rgb(231, 233, 232)"></option>
        <option value="rgb(239, 240, 240)"></option>
        <option value="rgb(223, 42, 63)"></option>
        <option value="rgb(237, 116, 12)"></option>
        <option value="rgb(236, 170, 4)"></option>
        <option value="rgb(251, 222, 40)"></option>
        <option value="rgb(116, 182, 2)"></option>
        <option value="rgb(29, 192, 201)"></option>
        <option value="rgb(17, 124, 238)"></option>
      </select>
      <select class="ql-background">
        <option value="rgb(0, 0, 0)"></option>
        <option value="rgb(38, 38, 38)"></option>
        <option value="rgb(88, 90, 90)"></option>
        <option value="rgb(138, 143, 141)"></option>
        <option value="rgb(216, 218, 217)"></option>
        <option value="rgb(231, 233, 232)"></option>
        <option value="rgb(239, 240, 240)"></option>
        <option value="rgb(223, 42, 63)"></option>
        <option value="rgb(237, 116, 12)"></option>
        <option value="rgb(236, 170, 4)"></option>
        <option value="rgb(251, 222, 40)"></option>
        <option value="rgb(116, 182, 2)"></option>
        <option value="rgb(29, 192, 201)"></option>
        <option value="rgb(17, 124, 238)"></option>
      </select>
    </span>
    <span class="ql-formats">
      <select class="ql-align">
        <option value=""></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="+1"></button>
      <button class="ql-indent" value="-1"></button>
      <select class="ql-lineheight">
        <option value="1"></option>
        <option value="1.15"></option>
        <option value="1.5"></option>
        <option value="2"></option>
        <option value="2.5"></option>
        <option value="3"></option>
      </select>
    </span>
    <span class="ql-formats">
      <button class="ql-list" value="check"></button>
      <button class="ql-link"></button>
      <button class="ql-blockquote"></button>
      <button class="ql-divider"></button>
    </span>
  </div>
  <div id="editor" class="!mt-[52px] !border-0 max-w-[750px] !ml-auto !mr-auto">
    <p>这是一篇测试文档。</p>
  </div>
</template>

<style lang="scss">
.ql-editor {
  min-height: calc(100vh - 94px);

  p {
    line-height: 1.74;
    margin-bottom: 7.83px !important;
  }

  hr {
    margin: 12px 0;
    color: #e7e9e8;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #262626;
    font-weight: 700;
  }

  h1 {
    font-size: 28px !important;
    line-height: 38px !important;
    margin-top: 38px !important;
    margin-bottom: 19px !important;
  }

  h2 {
    font-size: 24px !important;
    line-height: 34px !important;
    margin-top: 34px !important;
    margin-bottom: 17px !important;
  }

  h3 {
    font-size: 20px !important;
    line-height: 30px !important;
    margin-top: 30px !important;
    margin-bottom: 15px !important;
  }

  h4 {
    font-size: 16px !important;
    line-height: 26px !important;
    margin-top: 26px !important;
    margin-bottom: 13px !important;
  }

  h5, h6 {
    font-size: 15px !important;
    line-height: 24px !important;
    margin-top: 24px !important;
    margin-bottom: 12px !important;
  }

  blockquote {
    margin: 0 !important;
    border-left: solid 2px #d8dad9 !important;
    padding-left: 10px !important;
    padding-bottom: 7.83px !important;
  }

  a {
    color: #117cee !important;
    text-decoration: none !important;
  }
}
</style>
