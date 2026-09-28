import { describe, expect, it } from 'vitest'

import {
  PROFILE,
  SITE_URL,
  buildContactLinks,
  buildPersonJsonLd,
  cvDownloadPath,
  fillProfileValues,
  localeUrl,
  yearsOfExperience
} from '../../utils/profile'

describe('buildContactLinks', () => {
  const links = buildContactLinks(
    ['linkedin', 'github', 'email', 'whatsapp', 'telegram'],
    (key) => `label:${key}`
  )

  it('keeps the requested order and translated labels', () => {
    expect(links.map((l) => l.key)).toEqual([
      'linkedin',
      'github',
      'email',
      'whatsapp',
      'telegram'
    ])
    expect(links[0]?.label).toBe('label:linkedin')
  })

  it('builds the expected hrefs', () => {
    const href = Object.fromEntries(links.map((l) => [l.key, l.href]))
    expect(href.linkedin).toBe(PROFILE.linkedin)
    expect(href.github).toBe(PROFILE.github)
    expect(href.email).toBe(`mailto:${PROFILE.email}`)
    expect(href.whatsapp).toBe(`https://wa.me/${PROFILE.phone}`)
    expect(href.telegram).toBe(`https://t.me/+${PROFILE.phone}`)
  })

  it('opens every link except email in a new tab', () => {
    for (const link of links) {
      expect(link.external).toBe(link.key !== 'email')
    }
  })
})

describe('cvDownloadPath', () => {
  it('returns the PDF of each language and falls back to English', () => {
    expect(cvDownloadPath('en')).toBe('/cv/carlos-garcia-cv-en.pdf')
    expect(cvDownloadPath('es')).toBe('/cv/carlos-garcia-cv-es.pdf')
    expect(cvDownloadPath('fr')).toBe('/cv/carlos-garcia-cv-en.pdf')
  })
})

describe('localeUrl', () => {
  it('serves English at the root and Spanish under /es', () => {
    expect(localeUrl('en')).toBe(`${SITE_URL}/`)
    expect(localeUrl('es')).toBe(`${SITE_URL}/es`)
  })
})

describe('buildPersonJsonLd', () => {
  it('describes the person with profiles and skills', () => {
    const jsonLd = buildPersonJsonLd({
      locale: 'en',
      jobTitle: 'Senior Backend / Platform Engineer',
      description: 'desc',
      skills: ['Node.js', 'NestJS']
    })

    expect(jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.name,
      url: `${SITE_URL}/`,
      jobTitle: 'Senior Backend / Platform Engineer',
      sameAs: [PROFILE.linkedin, PROFILE.github],
      knowsAbout: ['Node.js', 'NestJS']
    })
  })
})

describe('yearsOfExperience', () => {
  // career started on 2019-01-26
  it.each([
    ['2026-01-25', 6],
    ['2026-01-26', 7],
    ['2026-09-27', 7],
    ['2027-01-25', 7],
    ['2027-01-26', 8],
    ['2030-12-31', 11]
  ])('on %s is %i', (date, years) => {
    expect(yearsOfExperience(new Date(`${date}T12:00:00`))).toBe(years)
  })

  it('fills the {years} placeholder in CV texts', () => {
    const now = new Date('2027-02-01T12:00:00')
    expect(fillProfileValues('Más de {years} años · {years}+', now)).toBe('Más de 8 años · 8+')
  })
})
