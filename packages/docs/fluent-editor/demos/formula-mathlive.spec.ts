import { expect, test } from '@playwright/test'

test.describe('FormulaMathlive.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/formula')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-formula-mathlive')
    await expect(editor).not.toBeNull()
  })

  test('should initialize the editor with formula support', async ({ page }) => {
    const toolbar = await page.$('.ql-toolbar')
    await expect(toolbar).not.toBeNull()
    const formulaButton = await toolbar.$('.ql-formula')
    expect(formulaButton).not.toBeNull()
  })

  test('should insert formula when formula button is clicked', async ({ page }) => {
    const editor = await page.$('#editor-formula-mathlive .ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const formulaButton = await page.$('.ql-formula')
    await formulaButton.click()
    await page.keyboard.type('E=mc^2')

    const editorHtml = await editor.innerHTML()
    expect(editorHtml).toContain('Test text')
    expect(editorHtml).toContain('<span class="ql-formula">E=mc^2</span>')
  })

  // 添加更多测试用例
})
