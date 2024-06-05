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
  
    // Search page show no results for uncommon search term
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
  
    // Search page shows 2 results
    await expect(page.getByText('Showing 2 results for \'S9+\'')).toBeVisible({timeout:3000});
  });

  test('clearing search box', async ({ page }) => {
    await page.fill('input[name="search"]', 'Testing');
    await page.click('tg-icon[name="basic-cross"]');
  
    // Search box is cleared
    await expect(page.locator('input[name="search"]')).toBeEmpty();
  });

  test('search does not allow sql injection', async ({ page }) => {
    await page.fill('input[name="search"]', 'test\;\<body onload=alert(\'test1\')>');
    await page.click('button[aria-label="Search all of Trade Me"]');

  
    
    await expect(page.getByText('Showing 0 results for \'test')).toBeVisible({timeout:3000});
  });
})





