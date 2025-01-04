import { expect, test } from '@playwright/test'

test.describe('ImageUploadMulti.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/image-upload')
  })

  test('should render the image upload multi component', async ({ page }) => {
    const component = await page.$('#image-upload-multi')
    expect(component).not.toBeNull()
  })

  test('should handle multiple image uploads', async ({ page }) => {
    const uploadButton = await page.$('.upload-button')
    expect(uploadButton).not.toBeNull()
    // 模拟文件上传
    // await uploadButton.setInputFiles(['path/to/image1.png', 'path/to/image2.png'])
  })

  // 添加更多测试用例
})
