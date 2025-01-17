import { fileURLToPath, URL } from 'node:url'
import { demoPreviewPlugin } from '@vitepress-code-preview/plugin'
import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  title: 'TinyEditor',
  titleTemplate: '基于 Quill 2.0 的富文本编辑器',
  description: '富文本编辑器, Rich text editor, rich-text-editor, rich-text, wysiwyg, wysiwyg-editor, quill, fluent-editor',
  base: '/fluent-editor/',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: 'favicon.ico' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.development.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/antd/dist/antd.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/lottie-web/build/player/lottie.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@petercatai/assistant@1.0.7/dist/umd/assistant.min.js' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@petercatai/assistant@1.0.7/dist/umd/assistant.min.css' }],
    ['script', { src: 'https://cdn.staticfile.net/translate.js/3.12.0/translate.js' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '文档', link: '/docs/quick-start', activeMatch: '/docs/' },
      {
        text: '生态',
        items: [
          { text: 'TinyVue', link: 'https://opentiny.design/tiny-vue/' },
        ],
      },
      {
        component: 'TranslateComponent'
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/opentiny/fluent-editor/' },
    ],
    sidebar: {
      '/docs/': sidebar(),
    },
    footer: {
      message: 'Made with ❤ by',
      copyright: '<a href="https://opentiny.design/" target="_blank">OpenTiny</a> and his friends',
    },
    outline: {
      label: '本页目录',
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '重置',
            backButtonTitle: '关闭搜索',
            noResultsText: '无相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: 'Enter',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上箭头',
              navigateDownKeyAriaLabel: '向下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'ESC',
            },
          },
        },
      },
    },
  },
  markdown: {
    config(md) {
      const docRoot = fileURLToPath(new URL('../', import.meta.url))
      md.use(demoPreviewPlugin, { docRoot })
    },
  },
})
