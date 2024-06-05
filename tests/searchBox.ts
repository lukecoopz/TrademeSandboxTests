import { test, expect } from '@playwright/test';

test('can search for results', async ({ page }) => {
  await page.goto('https://www.tmsandbox.co.nz/');
  await page.fill('input[name="search"]', 'laptop')

  // Search page show expected results.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
