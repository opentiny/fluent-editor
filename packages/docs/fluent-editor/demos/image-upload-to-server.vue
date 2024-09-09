<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'

let editor

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['image'],
]

// 这里需要换成你自己的图片上传服务地址
const IMG_API_URL = 'https://run.mocky.io/v3/f34365b4-679d-4e8f-8313-ddb11d6750be'

/**
 * 上传图片到服务器
 * @param image File 格式的图片
 * @param callback 回调函数，用来处理服务器返回的图片 URL
 * 除了 XMLHttpRequest，也可以使用 fetch / axios 等工具实现图片上传。
 */
function imageHandler(image, callback) {
  const data = new FormData()
  data.append('image', image)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', IMG_API_URL, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // 这里需要换成实际的接口返回值，比如：JSON.parse(xhr.responseText)
      const response = {
        status: 200,
        success: 'Upload success!',
        data: {
          link: 'https://res.hc-cdn.com/tiny-vue-web-doc/3.18.9.20240902190525/static/images/mountain.png',
        },
      }
      if (response.status === 200 && response.success) {
        callback(response.data.link)
      }
      else {
        // 图片上传失败了，就转成 Base64 格式
        var reader = new FileReader()
        reader.onload = function (e) {
          callback(e.target.result)
        }
        reader.readAsDataURL(image)
      }
    }
  }
  xhr.send(data)
}

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor-image-upload-to-server', {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
      },
      uploadOption: {
        imageUpload: ({ file, callback }) => {
          imageHandler(file, (imageUrl) => {
            // 调用 callback，传入 imageUrl 即可实现图片渲染
            callback({
              code: 0,
              message: 'Upload success!',
              data: {
                imageUrl,
              },
            })
          })
        },
      },
    })
  })
})

</script>

<template>
  <div id="editor-image-upload-to-server" />
</template>
