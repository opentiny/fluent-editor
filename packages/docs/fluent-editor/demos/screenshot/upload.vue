<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Html2Canvas from 'html2canvas'

let editor
const editorRef = ref<HTMLElement>()

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  ['screenshot'],
]

// to solve html2canvas get image empty
const imgToBase64 = (imageUrl: string) => new Promise<string>((resolve, reject) => {
  let canvas = document.createElement('canvas')
  let img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = imageUrl
  img.onload = function () {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      canvas.height = img.height
      canvas.width = img.width
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/png', 1)
      resolve(dataURL)
    }
  }
  img.onerror = function () {
    reject(new Error('Could not load image at ' + imageUrl))
  }
})

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default
    if (!editorRef.value) return
    editor = new FluentEditor(editorRef.value, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_CONFIG,
      },
      screenshot: {
        Html2Canvas,
        onclone: async (doc: Document) => {
          const imgs = doc.querySelectorAll('img')
          const promises = Array.from(imgs).map(async (img) => {
            img.src = await imgToBase64(img.src)
          })
          await Promise.all(promises)
        },
        beforeCreateImage(canvas) {
          return new Promise((resolve) => {
            canvas.toBlob(
              (data: Blob | null) => {
                if (!data) return
                const file = new File([data], `screenshot.png`, { type: 'image/jpeg' })
                // here can upload file to server. demo just use setTimeout to simulate
                setTimeout(() => {
                  // return the final image url
                  resolve('https://res.hc-cdn.com/tiny-vue-web-doc/3.18.9.20240902190525/static/images/mountain.png')
                }, 1000)
              },
              'image/png',
              1,
            )
          })
        },
      },
    })
  })
})
</script>

<template>
  <div ref="editorRef" />
</template>
