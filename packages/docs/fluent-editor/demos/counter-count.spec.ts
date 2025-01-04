import { expect, test } from '@playwright/test'

test.describe('CounterCount.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/counter')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor-counter-count')
    await expect(editor).not.toBeNull()
  })

  test('should initialize the editor with character counter', async ({ page }) => {
    const editor = await page.$('.ql-editor')
    await expect(editor).not.toBeNull()
    const counter = await page.$('.ql-counter')
    await expect(counter).not.toBeNull()
    await expect(await counter.innerText()).toContain('2000')
  })

  test('should update character counter when text is added', async ({ page }) => {
    const editor = await page.$('.ql-editor')
    await editor.click()
    await page.keyboard.type('Test text')

    const counter = await page.$('.ql-counter')
    await expect(await counter.innerText()).toContain('1991')
  })

  // 添加更多测试用例
})
