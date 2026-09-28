import { defineConfig, devices } from '@playwright/test'

const PORT = 3100
const MOCK_DEEPSEEK_PORT = 3199

// Runs against the production build: `bun run build` first.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    // English is the default locale whatever the browser language
    locale: 'en-US',
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ],
  webServer: [
    {
      command: 'node tests/e2e/mock-deepseek.mjs',
      port: MOCK_DEEPSEEK_PORT,
      env: { MOCK_DEEPSEEK_PORT: String(MOCK_DEEPSEEK_PORT) },
      reuseExistingServer: !process.env.CI
    },
    {
      command: 'node .output/server/index.mjs',
      url: `http://localhost:${PORT}`,
      env: {
        PORT: String(PORT),
        DEEPSEEK_API_KEY: 'test-key',
        DEEPSEEK_BASE_URL: `http://localhost:${MOCK_DEEPSEEK_PORT}`,
        CHAT_IP_LIMIT: '1000'
      },
      reuseExistingServer: !process.env.CI
    }
  ]
})
