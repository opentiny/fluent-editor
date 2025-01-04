import { expect, test } from '@playwright/test'

test.describe('HeaderList.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/header-list')
  })

  test('should render the header list', async ({ page }) => {
    const list = await page.$('#header-list')
    expect(list).not.toBeNull()
  })

  test('should display header items', async ({ page }) => {
    const items = await page.$$('.header-item')
    expect(items.length).toBeGreaterThan(0)
  })

  // 添加更多测试用例
})
