import { expect, test } from '@playwright/test'

test.describe('Emoji.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/emoji')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-emoji')
    await expect(editor).not.toBeNull()
  })

  test('should initialize the editor with emoji support', async ({ page }) => {
    const toolbar = await page.$('.ql-toolbar')
    await expect(toolbar).not.toBeNull()
    const emojiButton = await toolbar.$('.ql-emoji')
    expect(emojiButton).not.toBeNull()
  })

  test('should insert emoji when emoji button is clicked', async ({ page }) => {
    const editor = await page.$('#editor-emoji .ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const emojiButton = await page.$('.ql-emoji')
    await emojiButton.click()
    await page.click('.emoji-picker .emoji')

    const editorHtml = await editor.innerHTML()
    expect(editorHtml).toContain('Test text')
    expect(editorHtml).toContain('<span class="emoji">')
  })

  // 添加更多测试用例
})
