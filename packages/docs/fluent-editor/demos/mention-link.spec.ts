import { expect, test } from '@playwright/test'

test.describe('MentionLink.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/mention')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-mention-link')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with mention link support', async ({ page }) => {
    const mentionLink = await page.$('.ql-mention-link')
    expect(mentionLink).not.toBeNull()
  })

  test('should create a mention link when typing "@"', async ({ page }) => {
    const editor = await page.$('#editor-mention-link .ql-editor')
    await editor.click()
    await page.keyboard.type('@mention')

    const mentionLink = await page.$('.ql-mention-link')
    expect(mentionLink).toBeVisible()
  })

  // 添加更多测试用例
})
