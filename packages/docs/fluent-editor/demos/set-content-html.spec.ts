import { expect, test } from '@playwright/test'

test.describe('SetContentHtml.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/set-content')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-set-content-html')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with HTML content', async ({ page }) => {
    const editorContent = await page.$eval('#editor-set-content-html .ql-editor', el => el.innerHTML)
    expect(editorContent).toContain('<p>Initial content</p>')
  })

  test('should set content using HTML', async ({ page }) => {
    const setContentButton = await page.$('.ql-set-content')
    await setContentButton.click()

    const editorContent = await page.$eval('#editor-set-content-html .ql-editor', el => el.innerHTML)
    expect(editorContent).toContain('<p>New content</p>')
  })

  // 添加更多测试用例
})
