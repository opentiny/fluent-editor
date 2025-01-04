import { expect, test } from '@playwright/test'

test.describe('I18nCustom.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/i18n')
  })

  test('should render the i18n custom component', async ({ page }) => {
    const component = await page.$('#i18n-custom')
    expect(component).not.toBeNull()
  })

  test('should display translated text', async ({ page }) => {
    const text = await page.textContent('.translated-text')
    expect(text).toBe('Translated Text')
  })

  // 添加更多测试用例
})
