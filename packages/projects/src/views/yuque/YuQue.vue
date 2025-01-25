<script setup lang="ts">
import FluentEditor from '@opentiny/fluent-editor'
import HeaderList from 'quill-header-list'
import { onMounted, ref } from 'vue'

FluentEditor.register({ 'modules/header-list': HeaderList }, true)

let editor
const headerListRef = ref()

onMounted(() => {
  editor = new FluentEditor('#editor', {
    theme: 'snow',
    modules: {
      'toolbar': {
        container: '#toolbar',
        handlers: {
          'header-list': HeaderList.toolbarHandle,
        },
      },
      'header-list': {
        container: headerListRef.value,
      },
    },
  })
})
</script>

<template>
  <div
    class="fixed top-0 z-1 h-[52px] w-full flex items-center pl-[16px] bg-white"
  >
    <RouterLink to="/">
      &lt;返回
    </RouterLink>
  </div>
  <div
    id="toolbar"
    class="!fixed z-1 h-[42px] w-full top-[52px] !border-l-0 !border-r-0 !border-[rgba(0,0,0,0.04)] text-center"
  >
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

        <option value="rgb(251, 228, 231)" />
        <option value="rgb(253, 230, 211)" />
        <option value="rgb(249, 239, 205)" />
        <option value="rgb(251, 245, 203)" />
        <option value="rgb(232, 247, 207)" />
        <option value="rgb(206, 245, 247)" />
        <option value="rgb(217, 234, 252)" />

        <option value="rgb(241, 162, 171)" />
        <option value="rgb(248, 184, 129)" />
        <option value="rgb(245, 212, 128)" />
        <option value="rgb(252, 231, 90)" />
        <option value="rgb(193, 231, 126)" />
        <option value="rgb(129, 223, 228)" />
        <option value="rgb(129, 187, 248)" />

        <option value="rgb(228, 73, 91)" />
        <option value="rgb(243, 143, 57)" />
        <option value="rgb(243, 187, 47)" />
        <option value="rgb(237, 206, 2)" />
        <option value="rgb(140, 207, 23)" />
        <option value="rgb(1, 178, 188)" />
        <option value="rgb(47, 142, 244)" />

        <option value="rgb(173, 26, 43)" />
        <option value="rgb(199, 92, 0)" />
        <option value="rgb(201, 145, 3)" />
        <option value="rgb(165, 143, 4)" />
        <option value="rgb(92, 141, 7)" />
        <option value="rgb(7, 120, 126)" />
        <option value="rgb(12, 104, 202)" />

        <option value="rgb(112, 0, 13)" />
        <option value="rgb(102, 48, 0)" />
        <option value="rgb(102, 73, 0)" />
        <option value="rgb(102, 88, 0)" />
        <option value="rgb(42, 66, 0)" />
        <option value="rgb(0, 67, 71)" />
        <option value="rgb(0, 52, 107)" />
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

        <option value="rgb(251, 228, 231)" />
        <option value="rgb(253, 230, 211)" />
        <option value="rgb(249, 239, 205)" />
        <option value="rgb(251, 245, 203)" />
        <option value="rgb(232, 247, 207)" />
        <option value="rgb(206, 245, 247)" />
        <option value="rgb(217, 234, 252)" />

        <option value="rgb(241, 162, 171)" />
        <option value="rgb(248, 184, 129)" />
        <option value="rgb(245, 212, 128)" />
        <option value="rgb(252, 231, 90)" />
        <option value="rgb(193, 231, 126)" />
        <option value="rgb(129, 223, 228)" />
        <option value="rgb(129, 187, 248)" />

        <option value="rgb(228, 73, 91)" />
        <option value="rgb(243, 143, 57)" />
        <option value="rgb(243, 187, 47)" />
        <option value="rgb(237, 206, 2)" />
        <option value="rgb(140, 207, 23)" />
        <option value="rgb(1, 178, 188)" />
        <option value="rgb(47, 142, 244)" />

        <option value="rgb(173, 26, 43)" />
        <option value="rgb(199, 92, 0)" />
        <option value="rgb(201, 145, 3)" />
        <option value="rgb(165, 143, 4)" />
        <option value="rgb(92, 141, 7)" />
        <option value="rgb(7, 120, 126)" />
        <option value="rgb(12, 104, 202)" />

        <option value="rgb(112, 0, 13)" />
        <option value="rgb(102, 48, 0)" />
        <option value="rgb(102, 73, 0)" />
        <option value="rgb(102, 88, 0)" />
        <option value="rgb(42, 66, 0)" />
        <option value="rgb(0, 67, 71)" />
        <option value="rgb(0, 52, 107)" />
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
    <span class="ql-formats">
      <button class="ql-header-list" />
    </span>
  </div>
  <div class="!mt-[94px]">
    <div class="flex justify-center pt-[33px] pb-[26px]">
      <textarea placeholder="请输入标题" class="w-[750px] text-[#262626] h-[54px] outline-none resize-none text-[36px] font-bold placeholder-[#bfbfbf]">测试文档</textarea>
    </div>
    <div id="editor" class="!border-0 max-w-[750px] !ml-auto !mr-auto">
      <p>
        这是一篇<a
          class="ql-normal-link"
          href="https://opentiny.github.io/tiny-editor/"
          target="_blank"
        >测试文档</a>
      </p>
      <p>这是<strong>粗体</strong></p>
      <p>这是<em>斜体</em></p>
      <p>这是<u class="ql-custom-strike">删除线</u></p>
      <p>这是<u>下划线</u></p>
      <p>这是上标X<sup>2</sup>和下标X<sub>2</sub></p>
      <p>
        这是<span style="color: rgb(223, 42, 63)">文本色</span>和<span
          style="background-color: rgb(116, 182, 2)"
        >背景色</span>
      </p>
      <ol class="unchecked">
        <li class="bullet">
          <span class="ql-ui" contenteditable="false" />这是一个无序列表
        </li>
        <li class="bullet">
          <span class="ql-ui" contenteditable="false" />这是一个无序列表
        </li>
        <li class="ordered">
          <span class="ql-ui" contenteditable="false" />这是一个有序列表
        </li>
        <li class="ordered">
          <span class="ql-ui" contenteditable="false" />这是一个有序列表
        </li>
        <li class="unchecked">
          <span class="ql-ui" contenteditable="false" />这是一个任务项
        </li>
        <li class="unchecked">
          <span class="ql-ui" contenteditable="false" />这是一个任务项
        </li>
      </ol>
      <blockquote>这是一段引用</blockquote>
      <blockquote>这是一段引用</blockquote>
      <p>
        这是一段<code style="background-color: rgba(0, 0, 0, 0.06)">行内代码</code>。
      </p>
      <hr contenteditable="false">
      <h1><span style="line-height: 36px">标题1</span></h1>
      <h2><span style="line-height: 32px">标题2</span></h2>
      <h3><span style="line-height: 28px">标题3</span></h3>
      <h4><span style="line-height: 24px">标题4</span></h4>
      <h5><span style="line-height: 24px">标题5</span></h5>
      <h6><span style="line-height: 24px">标题6</span></h6>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <h1><span style="line-height: 36px">标题2</span></h1>
      <p>正文</p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p><br></p>
      <p>这是测试文档的底部。</p>
    </div>
  </div>
  <div ref="headerListRef" class="header-list is-hidden fixed top-[140px] right-0">
    <p>大纲</p>
  </div>
</template>

<style lang="scss">
.ql-editor {
  padding: 0 !important;
  min-height: calc(100vh - 94px);
  font-family:
    PingFang SC,
    Hiragino Sans GB,
    Microsoft YaHei,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif,
    Segoe UI;
  font-size: 15px !important;
  color: #262626;

  p {
    line-height: 2.2;
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
    opacity: 0.7;
    line-height: 24px;
  }

  a {
    color: #117cee !important;
    text-decoration: none !important;
  }

  ol {
    padding-left: 0 !important;
  }

  li {
    padding-left: 2em !important;
  }

  li.checked > .ql-ui,
  li.unchecked > .ql-ui {
    border-radius: 4px;
    transition: all 0.3s;
    margin-left: -20px !important;
    top: 3px;
  }

  li.unchecked > .ql-ui {
    border-color: #e7e9e8 !important;
  }

  li.checked > .ql-ui {
    border-color: #00b96b !important;
    background-color: #00b96b !important;
  }

  li.bullet::before,
  li.ordered::before {
    position: absolute;
  }

  li.bullet::before {
    left: 26px;
    font-size: 16px;
  }

  li.ordered::before {
    left: 28px;
    font-size: 14px;
  }

  code {
    margin: 1px 3px;
    font-size: 15px !important;
    background-color: #0000000f !important;
    border-color: #e7e9e8;
  }
}
</style>
