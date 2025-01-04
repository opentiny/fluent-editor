import { expect, test } from '@playwright/test'

test.describe('MentionCustomList.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/mention')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-mention-custom-list')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with custom mention list', async ({ page }) => {
    const mentionList = await page.$('.ql-mention-list')
    expect(mentionList).not.toBeNull()
  })

  test('should display custom mention list when typing "@"', async ({ page }) => {
    const editor = await page.$('#editor-mention-custom-list .ql-editor')
    await editor.click()
    await page.keyboard.type('@')

    const mentionList = await page.$('.ql-mention-list')
    expect(mentionList).toBeVisible()
  })

  // 添加更多测试用例
})
