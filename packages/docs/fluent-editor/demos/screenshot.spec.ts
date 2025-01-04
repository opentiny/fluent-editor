import { expect, test } from '@playwright/test'

test.describe('Screenshot.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/screenshot')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-screenshot')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with screenshot support', async ({ page }) => {
    const screenshotButton = await page.$('.ql-screenshot')
    expect(screenshotButton).not.toBeNull()
  })

  test('should take a screenshot when screenshot button is clicked', async ({ page }) => {
    const screenshotButton = await page.$('.ql-screenshot')
    await screenshotButton.click()

    // 验证截图是否成功
    const screenshotImage = await page.$('img.screenshot')
    expect(screenshotImage).toBeVisible()
  })

  // 添加更多测试用例
})
