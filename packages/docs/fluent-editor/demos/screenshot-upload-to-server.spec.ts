import { expect, test } from '@playwright/test'

test.describe('ScreenshotUploadToServer.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/screenshot')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-screenshot-upload-to-server')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with screenshot upload support', async ({ page }) => {
    const uploadButton = await page.$('.ql-upload')
    expect(uploadButton).not.toBeNull()
  })

  test('should upload screenshot when upload button is clicked', async ({ page }) => {
    const uploadButton = await page.$('.ql-upload')
    await uploadButton.click()

    // 模拟文件上传
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      uploadButton.click(),
    ])
    await fileChooser.setFiles('path/to/screenshot.png')

    const uploadedImage = await page.$('img[src="path/to/screenshot.png"]')
    expect(uploadedImage).toBeVisible()
  })

  // 添加更多测试用例
})
