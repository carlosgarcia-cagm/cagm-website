import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import en from '../../locales/en-US'
import es from '../../locales/es-ES'
import { renderHarvardPdf } from '../../server/utils/harvard-pdf'
import { buildHarvardCv } from '../../utils/harvard-cv'
import { yearsOfExperience } from '../../utils/profile'

const font = (name: string) => readFileSync(`server/assets/fonts/Tinos-${name}.ttf`)
const fonts = {
  regular: font('Regular'),
  bold: font('Bold'),
  italic: font('Italic'),
  boldItalic: font('BoldItalic')
}

describe('buildHarvardCv', () => {
  const cv = buildHarvardCv(es)

  it('orders the sections as a Harvard CV', () => {
    expect(cv.sections.map((s) => s.id)).toEqual([
      'summary',
      'experience',
      'projects',
      'education',
      'skills'
    ])
  })

  it('opens with a summary stating the current years of experience', () => {
    const summary = cv.sections[0]!
    expect(summary.paragraph).toContain(`Más de ${yearsOfExperience()} años`)
    expect(summary.paragraph).not.toContain('{years}')
  })

  it('lists every role with its achievements, newest first', () => {
    const experience = cv.sections.find((s) => s.id === 'experience')!
    expect(experience.entries.map((e) => e.title)).toEqual(
      es.timeline.experiences.map((e) => e.company)
    )
    const roi = experience.entries[0]!
    expect(roi.subtitleRight).toBe(es.timeline.experiences[0]!.period)
    for (const achievement of es.timeline.experiences[0]!.achievements) {
      expect(roi.bullets).toContain(achievement)
    }
  })

  it('only includes personal projects', () => {
    const projects = cv.sections.find((s) => s.id === 'projects')!
    expect(projects.entries.map((e) => e.title)).toEqual(
      es.projects.items.filter((p) => p.personal).map((p) => p.title)
    )
  })

  it('puts contact links in the header', () => {
    expect(cv.contact.map((c) => c.href)).toEqual(
      expect.arrayContaining([
        'mailto:carlosgarcia.cagm@gmail.com',
        'https://www.linkedin.com/in/carlosgarcia-cagm/',
        'https://github.com/carlosgarcia-cagm'
      ])
    )
  })

  it('adds skills and languages as label lines', () => {
    const skills = cv.sections.find((s) => s.id === 'skills')!
    expect(skills.lines.map((l) => l.label)).toEqual([
      ...es.skills.categories.map((c) => c.title),
      es.languages.title
    ])
  })
})

describe('renderHarvardPdf', () => {
  it.each([
    ['es', es],
    ['en', en]
  ] as const)('renders the %s CV as a PDF of at most two pages with embedded fonts', async (lang, messages) => {
    const pdf = await renderHarvardPdf(buildHarvardCv(messages), fonts, { title: 'CV', lang })
    const raw = pdf.toString('latin1')

    expect(raw.startsWith('%PDF-')).toBe(true)
    expect(raw.match(/\/Type \/Page\b/g)?.length).toBeLessThanOrEqual(2)
    expect(raw).toContain('Tinos-Bold')
    expect(raw).toContain('mailto:carlosgarcia.cagm@gmail.com')
  })
})
