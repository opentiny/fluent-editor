import { expect, test } from '@playwright/test'

test.describe('AddToolbarItem.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/add-toolbar-item')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-add-toolbar-item')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with custom toolbar items', async ({ page }) => {
    const toolbar = await page.$('.ql-toolbar')
    await expect(toolbar).not.toBeNull()
    const goodButton = await toolbar.$('.ql-good')
    const badButton = await toolbar.$('.ql-bad')
    expect(goodButton).not.toBeNull()
    expect(badButton).not.toBeNull()
  })

  test('should apply custom formats when toolbar buttons are clicked', async ({ page }) => {
    const editor = await page.$('#editor-add-toolbar-item .ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const goodButton = await page.$('.ql-good')
    await goodButton.click()
    await page.keyboard.type(' Good')

    const badButton = await page.$('.ql-bad')
    await badButton.click()
    await page.keyboard.type(' Bad')

    const editorHtml = await editor.innerHTML()
    expect(editorHtml).toContain('<span style="color: rgb(92, 179, 0);"> Good</span>')
    expect(editorHtml).toContain('<span style="color: rgb(242, 48, 48);"> Bad</span>')
  })

  // 添加更多测试用例
})
