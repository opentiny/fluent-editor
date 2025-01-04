import { expect, test } from '@playwright/test'

test.describe('GetContentHtml.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/get-content')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-get-content-html')
    expect(editor).not.toBeNull()
  })

  test('should get content HTML when button is clicked', async ({ page }) => {
    const editor = await page.$('#editor-get-content-html .ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const getHtmlButton = await page.$('#get-html-button')
    await getHtmlButton.click()

    const htmlOutput = await page.$('#html-output')
    const htmlText = await htmlOutput.innerText()
    expect(htmlText).toContain('<p>Test text</p>')
  })

  // 添加更多测试用例
})
