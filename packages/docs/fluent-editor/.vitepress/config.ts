import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  title: 'FluentEditor',
  description: '富文本编辑器, Rich text editor, rich-text-editor, rich-text, wysiwyg, wysiwyg-editor, fluent-editor',
  base: '/fluent-editor/',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/quick-start', activeMatch: '/guide/' },
      {
        text: '生态',
        items: [
          { text: 'TinyVue', link: 'https://opentiny.design/tiny-vue/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/opentiny/fluent-editor/' }
    ],
    sidebar: {
      '/guide/': sidebar(),
    }
  }
})
