import { expect, test } from '@playwright/test'

test.describe('TableTextOptions.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/table')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-table-text-options')
    expect(editor).not.toBeNull()
  })

  test('should initialize the editor with table text options', async ({ page }) => {
    const tableButton = await page.$('.ql-table')
    expect(tableButton).not.toBeNull()
  })

  test('should apply table text options when toolbar button is clicked', async ({ page }) => {
    const tableButton = await page.$('.ql-table')
    await tableButton.click()

    const table = await page.$('table')
    expect(table).toBeVisible()
  })

  // 添加更多测试用例
})
