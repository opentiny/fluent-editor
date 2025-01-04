import { expect, test } from '@playwright/test'

test.describe('GetContentDelta.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/get-content')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-get-content-delta')
    expect(editor).not.toBeNull()
  })

  test('should get content delta when button is clicked', async ({ page }) => {
    const editor = await page.$('#editor-get-content-delta .ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const getDeltaButton = await page.$('#get-delta-button')
    await getDeltaButton.click()

    const deltaOutput = await page.$('#delta-output')
    const deltaText = await deltaOutput.innerText()
    expect(deltaText).toContain('Test text')
  })

  // 添加更多测试用例
})
