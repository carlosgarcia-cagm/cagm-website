import { expect, test } from '@playwright/test'

test.describe('home page', () => {
  test('renders English by default and Spanish under /es', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Senior Backend / Platform Engineer'
    )

    await page.goto('/es')
    await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Ingeniero Senior Backend'
    )
  })

  test('language switch is a real link to the other locale', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByTestId('language-switch')
    await expect(toggle).toHaveAttribute('href', '/es')
    await toggle.click()
    await expect(page).toHaveURL(/\/es$/)
    await expect(page.getByTestId('language-switch')).toHaveAttribute('href', '/')
  })

  test('shows every section of the CV', async ({ page }) => {
    await page.goto('/')
    for (const id of ['skills', 'experience', 'projects', 'education', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
    await expect(page.getByTestId('skills-legend')).toBeVisible()
    await expect(page.locator('#experience')).toContainText('Roi Studio')
    await expect(page.locator('#education')).toContainText('ESPOL')
  })

  test('hero buttons point to projects and the CV', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('cta-cv')).toHaveAttribute('href', '/cv')

    await page.getByTestId('cta-projects').click()
    await expect(page).toHaveURL(/#projects$/)
    await expect(page.locator('#projects h2')).toBeInViewport()
  })

  test('LinkedIn and GitHub are linked from hero and footer', async ({ page }) => {
    await page.goto('/')
    for (const container of ['hero-social', 'footer-links']) {
      const links = page.getByTestId(container)
      await expect(
        links.locator('a[href="https://www.linkedin.com/in/carlosgarcia-cagm/"]')
      ).toHaveCount(1)
      await expect(
        links.locator('a[href="https://github.com/carlosgarcia-cagm"]')
      ).toHaveCount(1)
    }
  })

  test('exposes SEO metadata', async ({ page }) => {
    await page.goto('/')
    const head = page.locator('head')
    await expect(head.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /Carlos García/
    )
    await expect(head.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://cagm-website.vercel.app/og-image.png'
    )
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://cagm-website.vercel.app'
    )
    await expect(head.locator('link[hreflang="es"]').first()).toBeAttached()

    const jsonLd = JSON.parse(
      (await head.locator('script[type="application/ld+json"]').textContent()) ?? '{}'
    )
    expect(jsonLd['@type']).toBe('Person')
    expect(jsonLd.sameAs).toContain('https://github.com/carlosgarcia-cagm')
  })

  test('serves sitemap, robots and OG image', async ({ request }) => {
    expect((await request.get('/sitemap.xml')).ok()).toBe(true)
    expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap:')
    expect((await request.get('/og-image.png')).ok()).toBe(true)
  })

  test('has no horizontal scroll and no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    )
    expect(overflow).toBeLessThanOrEqual(0)
    expect(errors).toEqual([])
  })
})

test.describe('Spanish browser', () => {
  test.use({ locale: 'es-ES' })

  test('still starts in English and can switch to Spanish', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')

    await page.getByTestId('language-switch').click()
    await expect(page).toHaveURL(/\/es$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES')
  })
})

test('old /en links redirect to the English pages', async ({ request }) => {
  for (const [from, to] of [
    ['/en', '/'],
    ['/en/cv', '/cv']
  ]) {
    const response = await request.get(from, { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    expect(new URL(response.headers().location!, 'http://x').pathname).toBe(to)
  }
})

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'menu toggle only exists on small screens')

  test('opens, navigates and closes', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByTestId('menu-toggle')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await page.locator('#mobile-menu').getByRole('link', { name: 'Experience' }).click()
    await expect(page).toHaveURL(/#experience$/)
    await expect(page.locator('#mobile-menu')).toBeHidden()
  })
})
