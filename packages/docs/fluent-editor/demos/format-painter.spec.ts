import { expect, test } from '@playwright/test'

test.describe('FormatPainter.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/format-painter')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-format-painter')
    await expect(editor).not.toBeNull()
  })

  test('should initialize the editor with format painter support', async ({ page }) => {
    const toolbar = await page.$('.ql-toolbar')
    await expect(toolbar).not.toBeNull()
    const formatPainterButton = await toolbar.$('.ql-format-painter')
    expect(formatPainterButton).not.toBeNull()
  })

  test('should apply format painter when button is clicked', async ({ page }) => {
    const editor = await page.$('#editor-format-painter .ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const formatPainterButton = await page.$('.ql-format-painter')
    await formatPainterButton.click()
    await page.keyboard.type(' Formatted')

    const editorHtml = await editor.innerHTML()
    expect(editorHtml).toContain('<span class="ql-format-painter"> Formatted</span>')
  })

  // 添加更多测试用例
})
