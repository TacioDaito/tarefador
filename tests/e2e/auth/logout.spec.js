import { test, expect } from '@playwright/test';
import { createTestUser } from '../helpers/createTestUser.js';

test.describe('Logout', () => {

  test('successful logout redirects to login page', async ({ page, request, baseURL }) => {
    // Create and login a test user
    const { success, email, password } = await createTestUser(request);
    test.expect(success).toBeTruthy();

    await page.goto('/login');
    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 15000 });

    // Click the logout button ("Sair")
    await page.click('button:has-text("Sair")');

    // Should redirect to login page
    await page.waitForURL('**/login', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Login');
  });

  test('after logout, accessing dashboard redirects to login', async ({ page, request, baseURL }) => {
    // Create and login a test user
    const { success, email, password } = await createTestUser(request);
    test.expect(success).toBeTruthy();

    await page.goto('/login');
    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard', { timeout: 15000 });

    // Logout
    await page.click('button:has-text("Sair")');
    await page.waitForURL('**/login', { timeout: 15000 });

    // Try to access dashboard
    await page.goto('/dashboard');

    // Should redirect back to login
    await page.waitForURL('**/login', { timeout: 10000 });
  });
});