import { expect, test } from '@playwright/test'

test.describe('Table.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/table')
  })

  test('should render the table', async ({ page }) => {
    const table = await page.$('#table-component')
    expect(table).not.toBeNull()
  })

  test('should initialize the table with correct number of rows and columns', async ({ page }) => {
    const rows = await page.$$('#table-component tr')
    const columns = await page.$$('#table-component tr:first-child td')
    expect(rows.length).toBeGreaterThan(0)
    expect(columns.length).toBeGreaterThan(0)
  })

  test('should add a new row when the add row button is clicked', async ({ page }) => {
    const initialRows = await page.$$('#table-component tr')
    const addRowButton = await page.$('#add-row-button')
    await addRowButton.click()
    const updatedRows = await page.$$('#table-component tr')
    expect(updatedRows.length).toBe(initialRows.length + 1)
  })

  test('should add a new column when the add column button is clicked', async ({ page }) => {
    const initialColumns = await page.$$('#table-component tr:first-child td')
    const addColumnButton = await page.$('#add-column-button')
    await addColumnButton.click()
    const updatedColumns = await page.$$('#table-component tr:first-child td')
    expect(updatedColumns.length).toBe(initialColumns.length + 1)
  })

  // 添加更多测试用例
})
