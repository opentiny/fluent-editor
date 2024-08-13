import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  title: 'FluentEditor',
  description: '富文本编辑器, Rich text editor, rich-text-editor, rich-text, wysiwyg, wysiwyg-editor, fluent-editor',
  base: '/fluent-editor/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '文档', link: '/docs/quick-start', activeMatch: '/docs/' },
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
      '/docs/': sidebar(),
    }
  }
})
