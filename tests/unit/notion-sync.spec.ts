import { readFileSync } from 'node:fs'

import * as prettier from 'prettier'
import { describe, expect, it, vi } from 'vitest'

import en from '../../locales/en-US'
import es from '../../locales/es-ES'
import {
  applyCvContent,
  extractCvContent,
  serializeLocale,
  validateTranslations,
  type CvContent
} from '../../scripts/notion-sync/cv-content'
import {
  buildSyncMessages,
  parseSyncProposal
} from '../../scripts/notion-sync/prompt'
import {
  hashNotion,
  runSync,
  type SyncDeps
} from '../../scripts/notion-sync/sync'

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))

describe('Notion-owned content', () => {
  it('extracting and applying it again leaves the locale unchanged', () => {
    expect(applyCvContent(es, extractCvContent(es))).toEqual(es)
    expect(applyCvContent(en, extractCvContent(en))).toEqual(en)
  })

  it('regenerated locale files are byte-identical, so sync PRs only show real changes', async () => {
    for (const [file, messages] of [
      ['locales/es-ES.ts', es],
      ['locales/en-US.ts', en]
    ] as const) {
      const config = await prettier.resolveConfig(file)
      const source = await prettier.format(serializeLocale(messages), {
        ...config,
        filepath: file
      })
      expect(source).toBe(readFileSync(file, 'utf8'))
    }
  })

  it('replaces personal projects in place and keeps client projects', () => {
    const content = extractCvContent(en)
    content.personalProjects = [
      {
        id: 'new-tool',
        title: 'New Tool',
        description: 'A tool',
        technologies: ['Go'],
        isPublic: true
      }
    ]
    const next = applyCvContent(en, content)
    const ids = next.projects.items.map((p) => p.id)
    expect(ids).toContain('new-tool')
    expect(ids).not.toContain('adaptcv')
    expect(ids).toEqual(
      expect.arrayContaining(['nextgen-timbres', 'la-nube-tv'])
    )
    expect(next.projects.items.find((p) => p.id === 'new-tool')?.personal).toBe(
      true
    )
  })

  it('keeps icons of existing skill categories and styles new ones', () => {
    const content = extractCvContent(en)
    content.skills.push({
      id: 'ai',
      title: 'AI',
      skills: [{ name: 'LLMs', level: 'secondary' }]
    })
    const next = applyCvContent(en, content)
    expect(next.skills.categories[0]!.icon).toBe(en.skills.categories[0]!.icon)
    expect(next.skills.categories.at(-1)).toMatchObject({
      id: 'ai',
      icon: 'heroicons:cog-6-tooth'
    })
  })

  it('never touches website-owned content', () => {
    const content = extractCvContent(en)
    content.title = 'Changed'
    const next = applyCvContent(en, content)
    expect(next.home.metrics).toEqual(en.home.metrics)
    expect(next.nav).toEqual(en.nav)
    expect(next.website).toEqual(en.website)
  })
})

describe('validateTranslations', () => {
  const valid = () => ({ es: extractCvContent(es), en: extractCvContent(en) })

  it('accepts the current content', () => {
    const { es: a, en: b } = valid()
    expect(validateTranslations(a, b)).toEqual([])
  })

  it('requires the {years} placeholder', () => {
    const { es: a, en: b } = valid()
    b.summary = '7+ years as an independent contractor'
    expect(validateTranslations(a, b)).toContain(
      'en.summary must keep the {years} placeholder'
    )
  })

  it('rejects unknown work modes, levels and empty texts', () => {
    const { es: a, en: b } = valid()
    ;(b.experiences[0] as { workMode: string }).workMode = 'office'
    ;(b.skills[0]!.skills[0] as { level: string }).level = 'expert'
    b.experiences[0]!.achievements[0] = ' '
    const errors = validateTranslations(a, b).join('\n')
    expect(errors).toMatch(/workMode/)
    expect(errors).toMatch(/level must be primary or secondary/)
    expect(errors).toMatch(/achievements\[0\] must be a non-empty text/)
  })

  it('rejects languages that drift apart', () => {
    const { es: a, en: b } = valid()
    b.experiences[0]!.technologies = [
      ...b.experiences[0]!.technologies,
      'Kafka'
    ]
    expect(validateTranslations(a, b)[0]).toMatch(/es and en differ/)
  })
})

describe('model answer', () => {
  it('is parsed or rejected with a clear message', () => {
    expect(() => parseSyncProposal('not json')).toThrow(/valid JSON/)
    expect(() => parseSyncProposal('{"changes": []}')).toThrow(/missing/)
    const content = extractCvContent(en)
    expect(
      parseSyncProposal(
        JSON.stringify({ changes: ['x'], es: content, en: content })
      )
    ).toMatchObject({
      changes: ['x']
    })
  })

  it('prompt carries the rules, both versions of Notion and the current content', () => {
    const [system, user] = buildSyncMessages({
      current: { es: extractCvContent(es), en: extractCvContent(en) },
      previousNotion: 'OLD NOTION',
      currentNotion: 'NEW NOTION'
    })
    expect(system!.content).toMatch(/Never invent facts/)
    expect(system!.content).toMatch(/\{years\}/)
    expect(user!.content).toContain('OLD NOTION')
    expect(user!.content).toContain('NEW NOTION')
    expect(user!.content).toContain('Roi Studio')
  })
})

describe('runSync', () => {
  const page = (markdown: string) => [{ id: 'p1', label: 'CV', markdown }]

  function fakeDeps(options: {
    notion: string
    snapshot: string | null
    answer?: (current: { es: CvContent; en: CvContent }) => unknown
  }) {
    const written: Record<string, string> = {}
    const deps: SyncDeps = {
      readLocale: async (locale) => clone(locale === 'es' ? es : en),
      writeLocaleSource: async (locale, source) => {
        written[locale] = source
      },
      readSnapshot: async () => options.snapshot,
      writeSnapshot: async (markdown) => {
        written.snapshot = markdown
      },
      fetchNotion: async () => page(options.notion),
      complete: vi.fn(async () => {
        const current = { es: extractCvContent(es), en: extractCvContent(en) }
        return JSON.stringify(
          options.answer ? options.answer(current) : { changes: [], ...current }
        )
      }),
      log: () => {}
    }
    return { deps, written }
  }

  const snapshotOf = (markdown: string) =>
    `=== Notion page: CV (p1) ===\n${markdown}`

  it('does nothing (and calls no model) when Notion did not change', async () => {
    const { deps, written } = fakeDeps({
      notion: 'same',
      snapshot: snapshotOf('same')
    })
    expect(await runSync(deps)).toEqual({ status: 'unchanged' })
    expect(deps.complete).not.toHaveBeenCalled()
    expect(written).toEqual({})
  })

  it('applies the proposed changes to both languages and saves the new snapshot', async () => {
    const { deps, written } = fakeDeps({
      notion: 'new achievement',
      snapshot: snapshotOf('old'),
      answer: (current) => {
        current.es.experiences[0]!.achievements.push('Nuevo logro')
        current.en.experiences[0]!.achievements.push('New achievement')
        return { changes: ['Roi Studio: nuevo logro'], ...current }
      }
    })
    expect(await runSync(deps)).toEqual({
      status: 'updated',
      changes: ['Roi Studio: nuevo logro']
    })
    expect(written.es).toContain('Nuevo logro')
    expect(written.en).toContain('New achievement')
    expect(hashNotion(written.snapshot!)).toBe(
      hashNotion(snapshotOf('new achievement'))
    )
  })

  it('only moves the snapshot when Notion changed something the website does not show', async () => {
    const { deps, written } = fakeDeps({
      notion: 'private note',
      snapshot: snapshotOf('old')
    })
    expect(await runSync(deps)).toEqual({
      status: 'no-content-change',
      notionChanged: true
    })
    expect(written.snapshot).toBeDefined()
    expect(written.es).toBeUndefined()
  })

  it('writes nothing when the model answer is invalid', async () => {
    const { deps, written } = fakeDeps({
      notion: 'x',
      snapshot: null,
      answer: (current) => {
        current.en.summary = 'no placeholder'
        return { changes: ['broken'], ...current }
      }
    })
    await expect(runSync(deps)).rejects.toThrow(/invalid/)
    expect(written).toEqual({})
  })

  it('dry run reports the changes without writing', async () => {
    const { deps, written } = fakeDeps({
      notion: 'x',
      snapshot: null,
      answer: (current) => {
        current.es.title = 'Nuevo título'
        current.en.title = 'New title'
        return { changes: ['Título nuevo'], ...current }
      }
    })
    expect(await runSync(deps, { dryRun: true })).toEqual({
      status: 'updated',
      changes: ['Título nuevo']
    })
    expect(written).toEqual({})
  })
})
