// Generates public/og-image.png (1200x630), the preview image shown when the
// site is shared on LinkedIn, WhatsApp, X, etc. Run: bun scripts/generate-og-image.mjs
import { readFileSync } from 'node:fs'
import { chromium } from '@playwright/test'

const logo = readFileSync(new URL('../public/logo.png', import.meta.url)).toString('base64')

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  body { margin: 0; width: 1200px; height: 630px; display: flex; align-items: center;
    gap: 56px; padding: 0 72px; box-sizing: border-box; font-family: system-ui, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #fff; }
  img { width: 200px; height: 200px; flex-shrink: 0; border-radius: 50%; background: #fff; padding: 16px; box-sizing: border-box; }
  h1 { font-size: 72px; margin: 0 0 12px; }
  h2 { font-size: 36px; margin: 0 0 32px; color: #93c5fd; font-weight: 600; }
  p { font-size: 25px; margin: 0; color: #cbd5e1; }
</style></head><body>
  <img src="data:image/png;base64,${logo}" alt="">
  <div>
    <h1>Carlos García</h1>
    <h2>Senior Backend / Platform Engineer</h2>
    <p>Node.js · TypeScript · NestJS · AWS · GCP · Terraform</p>
  </div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.screenshot({ path: new URL('../public/og-image.png', import.meta.url).pathname })
await browser.close()
console.log('public/og-image.png generated')
