<script setup lang="ts">
import { onMounted, ref } from 'vue'

let editor
const headerListRef = ref()

onMounted(() => {
  // ssr compat, reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  import('@opentiny/fluent-editor').then((module) => {
    const FluentEditor = module.default

    editor = new FluentEditor('#editor', {
      theme: 'snow',
      modules: {
        'toolbar': [
          [{ header: [] }, 'header-list'],
        ],
        'header-list': {
          container: headerListRef.value,
          onItemClick: (id: string) => {
            const nav = document.querySelector('header.VPNav')
            if (!nav) return
            const navHeight = nav.getBoundingClientRect().height
            const offset = 60
            const offsetPosition = window.pageYOffset - navHeight - offset
            window.scrollTo({
              top: offsetPosition,
            })
          },
        },
      },
    })

    editor.setContents([
      {
        insert: 'header 1',
      },
      {
        attributes: {
          header: {
            value: 1,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\n\n\nheader 1.1',
      },
      {
        attributes: {
          header: {
            value: 2,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\n\nheader 1.2',
      },
      {
        attributes: {
          header: {
            value: 2,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\nheader 1.3',
      },
      {
        attributes: {
          header: {
            value: 2,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\n\n\n\nheader 2',
      },
      {
        attributes: {
          header: {
            value: 1,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\nheader 2.1',
      },
      {
        attributes: {
          header: {
            value: 2,
          },
        },
        insert: '\n',
      },
      {
        insert: '\nheader 2.1.1',
      },
      {
        attributes: {
          header: {
            value: 3,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\n\n\nheader 2.1.2',
      },
      {
        attributes: {
          header: {
            value: 3,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\n\n\nheader 44444444',
      },
      {
        attributes: {
          header: {
            value: 4,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\n\n\nheader 44444444',
      },
      {
        attributes: {
          header: {
            value: 4,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\n\n\nheader 5',
      },
      {
        attributes: {
          header: {
            value: 5,
          },
        },
        insert: '\n',
      },
      {
        insert: '\n\n\n\n\n\n\n\n\n\nheader 6',
      },
      {
        attributes: {
          header: {
            value: 6,
          },
        },
        insert: '\n',
      },
    ])
  })
})
</script>

<template>
  <div ref="headerListRef" class="header-list" />
  <div id="editor" style="height: 500px" />
</template>

<style scoped>
.header-list {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  height: 100%;
  padding: 8px 0px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
