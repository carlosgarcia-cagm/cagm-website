import { expect, test } from '@playwright/test'

test.describe('Harvard CV', () => {
  test('is reachable from the hero and shows every section', async ({ page }) => {
    await page.goto('/es')
    await page.getByTestId('cta-cv').click()
    await expect(page).toHaveURL(/\/es\/cv$/)

    const cv = page.getByTestId('harvard-cv')
    await expect(cv.locator('h1')).toHaveText('Carlos García')
    await expect(cv.locator('h2')).toHaveText([
      'Resumen',
      'Experiencia',
      'Proyectos personales',
      'Educación',
      'Habilidades técnicas e idiomas'
    ])
    await expect(cv).toContainText('Roi Studio')
    await expect(page).toHaveTitle(/CV en formato Harvard/)
  })

  test('downloads the PDF of the current language', async ({ page }) => {
    await page.goto('/cv')
    const link = page.getByTestId('cv-download')
    await expect(link).toHaveAttribute('href', '/cv/carlos-garcia-cv-en.pdf')

    const [download] = await Promise.all([page.waitForEvent('download'), link.click()])
    expect(download.suggestedFilename()).toBe('Carlos-Garcia-CV-EN.pdf')
  })

  test('serves valid PDFs and 404 for unknown files', async ({ request }) => {
    for (const lang of ['es', 'en']) {
      const response = await request.get(`/cv/carlos-garcia-cv-${lang}.pdf`)
      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toBe('application/pdf')
      expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
    }
    expect((await request.get('/cv/other.pdf')).status()).toBe(404)
  })

  test('prints only the CV', async ({ page }) => {
    await page.goto('/cv')
    await page.emulateMedia({ media: 'print' })
    await expect(page.getByTestId('harvard-cv')).toBeVisible()
    await expect(page.getByTestId('cv-toolbar')).toBeHidden()
    await expect(page.locator('body > div header').first()).toBeHidden()
    await expect(page.locator('footer')).toBeHidden()
  })
})

test.describe('Harvard CV viewer', () => {
  const pageOverflow = (page: import('@playwright/test').Page) =>
    page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  const viewerOverflow = (page: import('@playwright/test').Page) =>
    page.getByTestId('cv-viewport').evaluate((el) => el.scrollWidth - el.clientWidth)

  test('fits the page to narrow screens and can switch to the real size', async ({
    page,
    isMobile
  }) => {
    test.skip(!isMobile, 'the fit toggle only exists on narrow screens')
    await page.goto('/cv')
    await expect(page.locator('.cv-stage.is-measured')).toBeVisible()

    const level = page.getByTestId('cv-zoom-level')
    await expect(level).not.toHaveText('100%')
    expect(await pageOverflow(page)).toBeLessThanOrEqual(0)
    expect(await viewerOverflow(page)).toBeLessThanOrEqual(0)

    const toggle = page.getByTestId('cv-fit-toggle')
    await expect(toggle).toHaveText('Actual size')
    await toggle.click()
    await expect(level).toHaveText('100%')
    // the document scrolls inside the viewer, the site itself never overflows
    expect(await viewerOverflow(page)).toBeGreaterThan(0)
    expect(await pageOverflow(page)).toBeLessThanOrEqual(0)

    await expect(toggle).toHaveText('Fit to width')
    await toggle.click()
    await expect(level).not.toHaveText('100%')
  })

  test('zooms in and out in steps', async ({ page }) => {
    await page.goto('/cv')
    const level = page.getByTestId('cv-zoom-level')
    // wait until the viewer has measured the screen and applied its zoom
    await expect(page.locator('.cv-stage.is-measured')).toBeVisible()

    const before = parseInt((await level.textContent()) ?? '0')
    await page.getByTestId('cv-zoom-in').click()
    const zoomedIn = parseInt((await level.textContent()) ?? '0')
    expect(zoomedIn).toBeGreaterThan(before)

    await page.getByTestId('cv-zoom-out').click()
    await page.getByTestId('cv-zoom-out').click()
    expect(parseInt((await level.textContent()) ?? '0')).toBeLessThan(before)
    expect(await pageOverflow(page)).toBeLessThanOrEqual(0)
  })

  test('shows the page at real size on wide screens without the fit toggle', async ({
    page,
    isMobile
  }) => {
    test.skip(isMobile, 'desktop only')
    await page.goto('/cv')
    await expect(page.getByTestId('cv-zoom-level')).toHaveText('100%')
    await expect(page.getByTestId('cv-fit-toggle')).toBeHidden()
  })
})
