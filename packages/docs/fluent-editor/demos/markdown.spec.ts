import { expect, test } from '@playwright/test'

test.describe('Markdown.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/markdown')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-markdown')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with markdown support', async ({ page }) => {
    const toolbar = await page.$('.ql-toolbar')
    await expect(toolbar).not.toBeNull()
    const markdownButton = await toolbar.$('.ql-markdown')
    expect(markdownButton).not.toBeNull()
  })

  test('should apply markdown format when toolbar button is clicked', async ({ page }) => {
    const editor = await page.$('#editor-markdown .ql-editor')
    await editor.click()
    await page.keyboard.type('**Bold Text**')

    const markdownButton = await page.$('.ql-markdown')
    await markdownButton.click()

    const editorHtml = await editor.innerHTML()
    expect(editorHtml).toContain('<strong>Bold Text</strong>')
  })

  // 添加更多测试用例
})
