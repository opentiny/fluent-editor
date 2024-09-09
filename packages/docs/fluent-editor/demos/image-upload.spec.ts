import { test, expect } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const currentDirectory = path.dirname(__filename)
const baseUrl = path.dirname(currentDirectory)

test('image-upload', async ({ page }) => {
  await page.goto('http://localhost:5173/fluent-editor/docs/image-upload')

  // upload
  await page.getByLabel('image').first().click()
  await page.locator('.ql-toolbar input').setInputFiles(path.join(baseUrl, 'public', 'logo.png'))
  await expect(page.locator('#editor').getByRole('img')).toBeVisible()

  // overlay
  await page.locator('#editor').getByRole('img').click()
  await expect(page.locator('.blot-formatter__overlay')).toBeVisible()

  // zoom
  const moveDistance = 100
  const imageElement = page.locator('#editor').getByRole('img')
  const oldBox = await imageElement.boundingBox() as { x: number, y: number, width: number, height: number }
  await page.mouse.move(oldBox.x, oldBox.y)
  await page.mouse.down()
  await page.mouse.move(oldBox.x + moveDistance, oldBox.y + moveDistance)
  await page.mouse.up()
  const newBox = await imageElement.boundingBox() as { x: number, y: number, width: number, height: number }
  expect(newBox.width + moveDistance).toEqual(oldBox.width)
  expect(newBox.height + moveDistance).toEqual(oldBox.height)

  // remove overlay
  await page.mouse.click(newBox.x + newBox.width + 2, newBox.y + newBox.height + 2)
  await expect(page.locator('.blot-formatter__overlay')).not.toBeVisible()
})
