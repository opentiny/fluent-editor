<script setup lang="ts">
import FluentEditor from '@opentiny/fluent-editor'
import { onMounted } from 'vue'

let editor

onMounted(() => {
  editor = new FluentEditor('#editor', {
    theme: 'snow',
    modules: {
      toolbar: {
        container: '#toolbar',
      },
    },
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
      <button class="ql-undo" />
      <button class="ql-redo" />
      <button class="ql-format-painter" />
      <button class="ql-clean" />
    </span>
    <span class="ql-formats">
      <select class="ql-header">
        <option value="" />
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option value="5" />
        <option value="6" />
      </select>
      <select class="ql-size">
        <option value="12px" />
        <option value="13px" />
        <option value="14px" />
        <option value="15px" />
        <option value="16px" />
        <option value="19px" />
        <option value="22px" />
        <option value="24px" />
        <option value="29px" />
        <option value="32px" />
        <option value="40px" />
        <option value="48px" />
      </select>
      <button class="ql-bold" />
      <button class="ql-italic" />
      <button class="ql-strike" />
      <button class="ql-underline" />
      <button class="ql-script" value="super" />
      <button class="ql-script" value="sub" />
      <button class="ql-code" />
    </span>
    <span class="ql-formats">
      <select class="ql-color">
        <option value="rgb(0, 0, 0)" />
        <option value="rgb(38, 38, 38)" />
        <option value="rgb(88, 90, 90)" />
        <option value="rgb(138, 143, 141)" />
        <option value="rgb(216, 218, 217)" />
        <option value="rgb(231, 233, 232)" />
        <option value="rgb(239, 240, 240)" />
        <option value="rgb(223, 42, 63)" />
        <option value="rgb(237, 116, 12)" />
        <option value="rgb(236, 170, 4)" />
        <option value="rgb(251, 222, 40)" />
        <option value="rgb(116, 182, 2)" />
        <option value="rgb(29, 192, 201)" />
        <option value="rgb(17, 124, 238)" />
      </select>
      <select class="ql-background">
        <option value="rgb(0, 0, 0)" />
        <option value="rgb(38, 38, 38)" />
        <option value="rgb(88, 90, 90)" />
        <option value="rgb(138, 143, 141)" />
        <option value="rgb(216, 218, 217)" />
        <option value="rgb(231, 233, 232)" />
        <option value="rgb(239, 240, 240)" />
        <option value="rgb(223, 42, 63)" />
        <option value="rgb(237, 116, 12)" />
        <option value="rgb(236, 170, 4)" />
        <option value="rgb(251, 222, 40)" />
        <option value="rgb(116, 182, 2)" />
        <option value="rgb(29, 192, 201)" />
        <option value="rgb(17, 124, 238)" />
      </select>
    </span>
    <span class="ql-formats">
      <select class="ql-align">
        <option value="" />
        <option value="center" />
        <option value="right" />
        <option value="justify" />
      </select>
      <button class="ql-list" value="ordered" />
      <button class="ql-list" value="bullet" />
      <button class="ql-indent" value="+1" />
      <button class="ql-indent" value="-1" />
      <select class="ql-lineheight">
        <option value="1" />
        <option value="1.15" />
        <option value="1.5" />
        <option value="2" />
        <option value="2.5" />
        <option value="3" />
      </select>
    </span>
    <span class="ql-formats">
      <button class="ql-list" value="check" />
      <button class="ql-link" />
      <button class="ql-blockquote" />
      <button class="ql-divider" />
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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
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

  h5,
  h6 {
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
