import { test, expect } from '@playwright/test';
import { createTestUser } from '../helpers/createTestUser.js';
import { generateUniqueEmail } from '../helpers/generateUniqueEmail.js';

test.describe('Login', () => {

  test('successful login with valid credentials redirects to dashboard', async ({ page, request, baseURL }) => {
    // Create a test user via API
    const { success, email, password } = await createTestUser(request);
    test.expect(success).toBeTruthy();

    await page.goto('/login');

    await page.fill('#email', email);
    await page.fill('#password', password);

    await page.click('button[type="submit"]');

    // Should redirect to dashboard on success
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Minhas Tarefas');
  });

  test('failed login with wrong password shows error message', async ({ page, request, baseURL }) => {
    // Create a test user via API
    const { success, email } = await createTestUser(request);
    test.expect(success).toBeTruthy();

    await page.goto('/login');

    await page.fill('#email', email);
    await page.fill('#password', 'WrongPassword123');

    await page.click('button[type="submit"]');

    // Should display error message and stay on login page
    await expect(page.locator('.p-message')).toBeVisible({ timeout: 10000 });
  });

  test('failed login with non-existent email shows error message', async ({ page, baseURL }) => {
    await page.goto('/login');

    await page.fill('#email', 'nonexistent@example.com');
    await page.fill('#password', 'TestPass123');

    await page.click('button[type="submit"]');

    // Should display error message and stay on login page
    await expect(page.locator('.p-message')).toBeVisible({ timeout: 10000 });
  });

  test('redirects to login when accessing dashboard without auth', async ({ page, baseURL }) => {
    await page.goto('/dashboard');

    // Should redirect to login
    await page.waitForURL('**/login', { timeout: 10000 });
  });
});