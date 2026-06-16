import { test, expect } from '@playwright/test';
import { generateUniqueEmail } from '../helpers/generateUniqueEmail.js';

test.describe('Sign Up', () => {

  test('successful registration with valid data redirects to dashboard', async ({ page, baseURL }) => {
    const email = generateUniqueEmail();
    const password = 'TestPass123';

    await page.goto('/signup');

    await page.fill('input[id=name]', 'Test User');
    await page.fill('input[id=email]', email);
    await page.fill('input[id=password]', password);
    await page.fill('input[id=confirmPassword]', password);

    await page.click('button[type="submit"]');

    // Should redirect to dashboard on success
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Minhas Tarefas');
  });

  test('redirects to login page when already authenticated', async ({ page, baseURL }) => {
    // First sign up to create and authenticate user
    const email = generateUniqueEmail();
    const password = 'TestPass123';

    await page.goto('/signup');
    await page.fill('input[id=name]', 'Test User');
    await page.fill('input[id=email]', email);
    await page.fill('input[id=password]', password);
    await page.fill('input[id=confirmPassword]', password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 15000 });

    // Navigate back to signup - should redirect to dashboard since sanctum:guest middleware
    await page.goto('/signup');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
  });
});