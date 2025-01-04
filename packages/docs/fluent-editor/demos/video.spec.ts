import { expect, test } from '@playwright/test'

test.describe('Video.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/video')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-video')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with video support', async ({ page }) => {
    const videoButton = await page.$('.ql-video')
    expect(videoButton).not.toBeNull()
  })

  test('should insert video when video button is clicked', async ({ page }) => {
    const videoButton = await page.$('.ql-video')
    await videoButton.click()

    const video = await page.$('video')
    expect(video).toBeVisible()
  })

  // 添加更多测试用例
})
