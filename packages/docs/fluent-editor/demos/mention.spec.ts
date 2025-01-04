import { expect, test } from '@playwright/test'

test.describe('Mention.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/mention')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-mention')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with mention support', async ({ page }) => {
    const mention = await page.$('.ql-mention')
    expect(mention).not.toBeNull()
  })

  test('should display mention list when typing "@"', async ({ page }) => {
    const editor = await page.$('#editor-mention .ql-editor')
    await editor.click()
    await page.keyboard.type('@')

    const mentionList = await page.$('.ql-mention-list')
    expect(mentionList).toBeVisible()
  })

  // 添加更多测试用例
})
