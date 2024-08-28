import { test, expect } from '@playwright/test';

test('has toolbar', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('http://localhost:5173/fluent-editor/docs/basic-usage');

  const toolbar = page.locator('.ql-toolbar')

  await expect(toolbar).toBeVisible();
});
