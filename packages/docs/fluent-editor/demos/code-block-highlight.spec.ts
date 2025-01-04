import { expect, test } from '@playwright/test'

test.describe('CodeBlockHighlight.vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/fluent-editor/docs/code-block-highlight')
  })

  test('should render the editor', async ({ page }) => {
    const editor = await page.$('#editor')
    await expect(editor).not.toBeNull()
  })

  test('should initialize the editor with syntax highlighting', async ({ page }) => {
    const editor = await page.$('.ql-editor')
    await expect(editor).not.toBeNull()
    await expect(await editor.innerHTML()).toContain('<pre><code class="language-go">')
  })

  test('should apply syntax highlighting when code block is added', async ({ page }) => {
    const editor = await page.$('.ql-editor')
    await editor.click()
    await page.keyboard.type('```go\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}\n```')

    const editorHtml = await editor.innerHTML()
    expect(editorHtml).toContain('<pre><code class="language-go">')
    expect(editorHtml).toContain('package main')
    expect(editorHtml).toContain('fmt.Println("Hello, World!")')
  })

  // 添加更多测试用例
})
