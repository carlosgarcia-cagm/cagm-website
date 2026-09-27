import { expect, test } from '@playwright/test'

import { yearsOfExperience } from '../../utils/profile'

test('hero shows the key metrics', async ({ page }) => {
  await page.goto('/')
  const metrics = page.getByTestId('hero-metrics')
  const years = yearsOfExperience()
  // the numbers count up once the row is on screen
  await metrics.scrollIntoViewIfNeeded()
  await expect(metrics.locator('dd')).toHaveText([`${years}+`, '42x', '10x', '6'])
  await expect(page.locator('h1 + p')).toContainText(`${years}+ years as an independent`)
})

test('long project descriptions can be expanded', async ({ page }) => {
  await page.goto('/')
  const toggle = page.getByTestId('project-toggle').first()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(toggle).toHaveText('Show less')
})

test('experience is a single timeline ordered from newest', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('timeline').locator('h3')).toHaveText([
    'Roi Studio',
    'Lanubetv S.A.',
    'Nextgen S.A.'
  ])
})

test('follows the system dark mode', async ({ browser }) => {
  const background = async (colorScheme: 'light' | 'dark') => {
    const page = await browser.newPage({ colorScheme })
    await page.goto('/')
    const value = await page
      .locator('#main')
      .evaluate((el) => getComputedStyle(el.parentElement!).backgroundColor)
    await page.close()
    return value
  }
  expect(await background('dark')).not.toBe(await background('light'))
})

test.describe('Ask my CV chat', () => {
  test('answers suggested and follow-up questions with streamed text', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('chat-toggle').click()
    const panel = page.getByTestId('chat-panel')
    await expect(panel).toBeVisible()
    await expect(page.getByTestId('chat-input')).toBeFocused()

    await panel.getByRole('button', { name: 'Has he led teams?' }).click()
    const messages = page.getByTestId('chat-messages')
    await expect(messages.locator('[data-role="assistant"]').last()).toHaveText(
      'Mock answer (with CV, 1 messages): Has he led teams?'
    )

    await page.getByTestId('chat-input').fill('And with AWS?')
    await page.getByTestId('chat-input').press('Enter')
    // the follow-up carries the previous question and answer as context
    await expect(messages.locator('[data-role="assistant"]').last()).toHaveText(
      'Mock answer (with CV, 3 messages): And with AWS?'
    )
  })

  test('shows a friendly error when the assistant fails', async ({ page }) => {
    await page.goto('/es')
    await page.getByTestId('chat-toggle').click()
    await page.getByTestId('chat-input').fill('[fail]')
    await page.getByTestId('chat-input').press('Enter')
    await expect(
      page.getByTestId('chat-messages').locator('[data-role="assistant"]').last()
    ).toHaveText('No pude responder. Intenta de nuevo.')
  })

  test('stays hidden when the backend says the chat is unavailable', async ({ page }) => {
    await page.route('**/api/chat/status', (route) =>
      route.fulfill({ json: { available: false } })
    )
    await page.goto('/')
    await expect(page.getByTestId('hero-metrics')).toBeVisible()
    await expect(page.getByTestId('chat-toggle')).toHaveCount(0)
  })

  test('stays hidden when the status check fails', async ({ page }) => {
    await page.route('**/api/chat/status', (route) => route.fulfill({ status: 500 }))
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page.getByTestId('chat-toggle')).toHaveCount(0)
  })

  test('status endpoint reports the chat as available', async ({ request }) => {
    const response = await request.get('/api/chat/status')
    expect(await response.json()).toEqual({ available: true })
  })

  test('closes with Escape', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('chat-toggle').click()
    await page.getByTestId('chat-input').press('Escape')
    await expect(page.getByTestId('chat-panel')).toBeHidden()
  })

  test('API rejects invalid requests and other origins', async ({ request }) => {
    const valid = { locale: 'en', messages: [{ role: 'user', content: 'Hi' }] }
    expect((await request.post('/api/chat', { data: { locale: 'xx' } })).status()).toBe(400)
    expect(
      (
        await request.post('/api/chat', {
          data: valid,
          headers: { origin: 'https://evil.example' }
        })
      ).status()
    ).toBe(403)
  })
})

test.describe('animations', () => {
  test('reveal sections below the fold when scrolled into view', async ({ page }) => {
    await page.goto('/')
    const lastProject = page.locator('#projects [class*="reveal"]').last()
    await expect(lastProject).toHaveClass(/reveal-pending/)
    await lastProject.scrollIntoViewIfNeeded()
    await expect(lastProject).toHaveClass(/is-revealed/)
    await expect(lastProject).not.toHaveClass(/reveal-pending/)
  })

  test('light up the timeline and pulse the current role', async ({ page }) => {
    await page.goto('/')
    const roles = page.getByTestId('timeline').locator('> li')
    await roles.last().scrollIntoViewIfNeeded()
    await expect(roles.last()).toHaveClass(/is-revealed/)
    await expect(roles.first().locator('.timeline-dot')).toHaveClass(/is-current/)
    await expect(roles.nth(1).locator('.timeline-dot')).not.toHaveClass(/is-current/)
  })

  test('types the title and keeps its full text for assistive technology', async ({ page }) => {
    await page.goto('/')
    const title = page.getByRole('heading', { level: 1 })
    await expect(title).toHaveAccessibleName(/Senior Backend \/ Platform Engineer/)
  })
})

test.describe('with reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test('shows everything immediately', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.reveal-pending')).toHaveCount(0)
    await expect(page.getByTestId('hero-metrics').locator('dd').last()).toHaveText('6')
  })
})

test.describe('theme toggle', () => {
  test('switches to dark, remembers it and can go back to light', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    await expect(page.getByTestId('theme-icon-moon')).toBeVisible()
    await expect(page.getByTestId('theme-icon-sun')).toBeHidden()

    await page.getByTestId('theme-toggle').click()
    await expect(html).toHaveClass(/dark/)
    await expect(page.getByTestId('theme-toggle')).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByTestId('theme-icon-sun')).toBeVisible()
    await expect(page.getByTestId('theme-icon-moon')).toBeHidden()

    await page.reload()
    await expect(html).toHaveClass(/dark/)

    await page.getByTestId('theme-toggle').click()
    await expect(html).not.toHaveClass(/dark/)
  })

  test('starts in dark when the system prefers it', async ({ browser }) => {
    const page = await browser.newPage({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.close()
  })
})

test('types the title only on the first visit', async ({ page }) => {
  await page.goto('/')
  const typing = page.locator('h1 .type-caret')
  await expect(typing).toHaveCount(1)
  await page.reload()
  await page.waitForLoadState('networkidle')
  await expect(typing).toHaveCount(0)
})

test('serves llms.txt for AI assistants', async ({ request }) => {
  const response = await request.get('/llms.txt')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('text/markdown')
  const body = await response.text()
  expect(body.startsWith('# Carlos García')).toBe(true)
  expect(body).toContain('/cv/carlos-garcia-cv-en.pdf')
  expect(body).toContain('Roi Studio')
})
