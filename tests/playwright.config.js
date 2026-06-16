// @ts-check
import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'
config({ path: '../.env' })

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1',
    // extraHTTPHeaders: {
    //   Host: process.env.NUXT_PUBLIC_SPA_URL,
    // },
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
