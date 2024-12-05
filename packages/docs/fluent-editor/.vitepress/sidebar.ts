export function sidebar() {
  return [
    { text: '快速开始', link: '/docs/quick-start' },
    { text: '在前端框架中使用', link: '/docs/used-in-framework' },
    {
      text: '使用示例',
      items: [
        { text: '基本用法', link: '/docs/basic-usage' },
        { text: '内容初始化', link: '/docs/set-content' },
        { text: '获取内容', link: '/docs/get-content' },
        { text: '自定义工具栏', link: '/docs/custom-toolbar' },
        { text: '图片上传', link: '/docs/image-upload' },
        { text: '文件上传', link: '/docs/file-upload' },
        { text: '代码块高亮', link: '/docs/code-block-highlight' },
        { text: '表格', link: '/docs/table' },
        { text: '@提醒', link: '/docs/mention' },
        { text: '插入表情', link: '/docs/emoji' },
        { text: '格式刷', link: '/docs/format-painter' },
        { text: '公式', link: '/docs/formula' },
        { text: 'Markdown', link: '/docs/markdown' },
        { text: '字符统计', link: '/docs/counter' },
        { text: '视频', link: '/docs/video' },
        { text: '截屏', link: '/docs/screenshot' },
        { text: '国际化', link: '/docs/i18n' },
      ],
    },
  ]
}
