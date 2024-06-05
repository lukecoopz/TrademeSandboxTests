import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';

test.describe('searhbox tests', () => {

  test.beforeEach(async ({page}) => {
    //go to starting URL
    await page.goto('https://www.tmsandbox.co.nz/');
  })


  test('can search for results', async ({ page }) => {
    await page.fill('input[name="search"]', 'hilux');
    await page.click('button[aria-label="Search all of Trade Me"]');
  
    // Search page show expected results.
    await expect(page.getByText('Showing 1 result for \'hilux\'')).toBeVisible();
  });

  test('search shows 0 results', async ({ page }) => {
    await page.fill('input[name="search"]', 'unicorn');
    await page.click('button[aria-label="Search all of Trade Me"]');
  
    // Search page show expected results.
    await expect(page.getByText('Showing 0 results for \'unicorn\'')).toBeVisible();
  });

  test('search box shows sugesstions based on input', async ({ page }) => {
    await page.fill('input[name="search"]', 'hil');
    //waits for suggestions box to appear
    await expect(page.getByText('suggestions').first()).toBeVisible({timeout:3000});

    const suggestions = await page.$$('div[class^="tm-global-search__search-suggestions"]');
    expect(suggestions.length).toBeGreaterThan(0);

    // Search shows dropdown of suggested
    await expect(page.getByText('hilux')).toHaveCount(4);
  });

  test('searching with special characters', async ({ page }) => {
    await page.fill('input[name="search"]', 'S9+');
    await page.click('button[aria-label="Search all of Trade Me"]');
  
    // Search page show expected results.
    await expect(page.getByText('Showing 1 result for \'S9+\'')).toBeVisible();
  });
})




