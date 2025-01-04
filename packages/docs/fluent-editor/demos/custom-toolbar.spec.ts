import { expect, test } from '@playwright/test'

test.describe('CustomToolbar.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/custom-toolbar')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-custom-toolbar')
    await expect(editor).not.toBeNull()
  })

  test('should initialize the editor with custom toolbar items', async ({ page }) => {
    const toolbar = await page.$('.ql-toolbar')
    await expect(toolbar).not.toBeNull()
    const customButton = await toolbar.$('.ql-custom')
    expect(customButton).not.toBeNull()
  })

  test('should apply custom formats when toolbar buttons are clicked', async ({ page }) => {
    const editor = await page.$('#editor-custom-toolbar .ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const customButton = await page.$('.ql-custom')
    await customButton.click()
    await page.keyboard.type(' Custom')

    const editorHtml = await editor.innerHTML()
    expect(editorHtml).toContain('<span class="ql-custom"> Custom</span>')
  })

  // 添加更多测试用例
})
