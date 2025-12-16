import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect the heading to contain the app title
  await expect(page.locator('h1')).toContainText('Book Rating');
});

test('has heading with data-testid', async ({ page }) => {
  await page.goto('/');

  // Use getByTestId to locate elements by data-testid attribute
  await expect(page.getByTestId('app-heading')).toContainText('Book Rating');
});
