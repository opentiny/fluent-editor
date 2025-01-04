import { expect, test } from '@playwright/test'

test.describe('ImageUploadOption.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/image-upload')
  })

  test('should render the image upload option component', async ({ page }) => {
    const component = await page.$('#image-upload-option')
    expect(component).not.toBeNull()
  })

  test('should handle image upload with options', async ({ page }) => {
    const uploadButton = await page.$('.upload-button')
    expect(uploadButton).not.toBeNull()
    // 模拟文件上传
    // await uploadButton.setInputFiles('path/to/image.png')
  })

  // 添加更多测试用例
})
