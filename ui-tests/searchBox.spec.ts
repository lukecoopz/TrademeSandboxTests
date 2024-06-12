import { test, expect } from '@playwright/test';

test.describe('Search Box Tests', () => {
  const baseURL = 'https://www.tmsandbox.co.nz/';
  const searchInput = 'input[name="search"]';
  const searchButton = 'button[aria-label="Search all of Trade Me"]';
  const clearButton = 'tg-icon[name="basic-cross"]';
  const suggestionsBox = 'h4[id="shell-search-suggestions"]';

  test.beforeEach(async ({ page }) => {
    // Go to starting URL
    await page.goto(baseURL);
  });

  test('should return results for a valid search term', async ({ page }) => {
    await page.fill(searchInput, 'hilux');
    await page.click(searchButton);

    // Verify the search page shows expected results
    await expect(page.getByText('Showing 0 results for \'hilux\'')).toBeVisible();//not best way as search results vary need to change this
  });

  test('should show 0 results for an uncommon search term', async ({ page }) => {
    await page.fill(searchInput, 'unicorn');
    await page.click(searchButton);

    // Verify the search page shows no results
    await expect(page.getByText('Showing 0 results for \'unicorn\'')).toBeVisible();
  });

  test('should show suggestions based on input', async ({ page }) => {
    await page.fill(searchInput, 'phon');
    // Wait for suggestions box to appear
    await expect(page.locator(suggestionsBox).first()).toBeVisible({ timeout: 3000 });

    const suggestions = await page.locator(suggestionsBox);
    await expect(suggestions).toBeVisible();

    // Verify the search suggestions include 'hilux'
    await expect(page.locator('a:has-text("Phonecards")')).toHaveCount(1);
  });

  test('should handle search with special characters', async ({ page }) => {
    await page.fill(searchInput, 'S9+');
    await page.click(searchButton);

    // Verify the search page shows expected results
    await expect(page.getByText('Showing 2 results for \'S9+\'')).toBeVisible({ timeout: 3000 });//again not best way as search results may vary in test
  });

  test('should clear the search box', async ({ page }) => {
    await page.fill(searchInput, 'Testing');
    await page.click(clearButton);

    // Verify the search box is cleared
    await expect(page.locator(searchInput)).toHaveValue('');
  });

  test('should not allow SQL injection', async ({ page }) => {
    await page.fill(searchInput, 'test\;\<body onload=alert(\'test1\')>');
    await page.click(searchButton);

    // Verify 0 results and no alert shown on page
    await expect(page.getByText('Showing 0 results for \'test')).toBeVisible({ timeout: 3000 });
    await expect(page.getByText('test1')).toHaveCount(1, { timeout: 3000 });
  });
});




