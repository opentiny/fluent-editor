import { expect, test } from '@playwright/test'

test.describe('SetContentDelta.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/set-content')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-set-content-delta')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with delta content', async ({ page }) => {
    const editorContent = await page.$eval('#editor-set-content-delta .ql-editor', el => el.innerHTML)
    expect(editorContent).toContain('Initial content')
  })

  test('should set content using delta', async ({ page }) => {
    const setContentButton = await page.$('.ql-set-content')
    await setContentButton.click()

    const editorContent = await page.$eval('#editor-set-content-delta .ql-editor', el => el.innerHTML)
    expect(editorContent).toContain('New content')
  })

  // 添加更多测试用例
})
