import { expect, test } from '@playwright/test'

test.describe('FileUpload.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/file-upload')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-file-upload')
    await expect(editor).not.toBeNull()
  })

  test('should initialize the editor with file upload support', async ({ page }) => {
    const toolbar = await page.$('.ql-toolbar')
    await expect(toolbar).not.toBeNull()
    const uploadButton = await toolbar.$('.ql-upload')
    expect(uploadButton).not.toBeNull()
  })

  test('should upload file when upload button is clicked', async ({ page }) => {
    const editor = await page.$('#editor-file-upload .ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const uploadButton = await page.$('.ql-upload')
    await uploadButton.click()
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      uploadButton.click(),
    ])
    await fileChooser.setFiles('path/to/file.png')

    const editorHtml = await editor.innerHTML()
    expect(editorHtml).toContain('Test text')
    expect(editorHtml).toContain('<img src="path/to/file.png">')
  })

  // 添加更多测试用例
})
