import { describe, expect, it } from 'vitest'

import nuxtConfig from '../../nuxt.config'
import en from '../../locales/en-US'
import es from '../../locales/es-ES'

/** Describes the shape of a value: object keys, array lengths and leaf types. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, shape((value as Record<string, unknown>)[key])])
    )
  }
  return typeof value
}

function strings(value: unknown, path = ''): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]]
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      strings(child, path ? `${path}.${key}` : key)
    )
  }
  return []
}

describe('locales', () => {
  it('ES and EN have exactly the same structure', () => {
    expect(shape(es)).toEqual(shape(en))
  })

  it.each([
    ['es', es],
    ['en', en]
  ])('%s has no empty texts', (_, locale) => {
    const empty = strings(locale).filter(([, text]) => text.trim() === '')
    expect(empty).toEqual([])
  })

  it('language-independent data is identical in both locales', () => {
    const skills = (l: TranslationKeys) =>
      l.skills.categories.map((c) => ({
        id: c.id,
        icon: c.icon,
        skills: c.skills
      }))
    const projects = (l: TranslationKeys) =>
      l.projects.items.map(({ id, projectUrl, githubRepos, technologies, isPublic }) => ({
        id,
        projectUrl,
        githubRepos,
        technologies,
        isPublic
      }))
    const experiences = (l: TranslationKeys) =>
      l.timeline.experiences.map(({ company, current, workMode, technologies }) => ({
        company,
        current,
        workMode,
        technologies
      }))

    expect(skills(es)).toEqual(skills(en))
    expect(projects(es)).toEqual(projects(en))
    expect(experiences(es)).toEqual(experiences(en))
  })

  it('project links use https', () => {
    const urls = en.projects.items.flatMap((p) => [
      ...(p.projectUrl ? [p.projectUrl] : []),
      ...(p.githubRepos ?? []).map((r) => r.url)
    ])
    for (const url of urls) expect(url).toMatch(/^https:\/\//)
  })

  it('project ids are unique', () => {
    const ids = en.projects.items.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every skill icon is bundled in nuxt.config', () => {
    const bundled = nuxtConfig.icon?.clientBundle?.icons ?? []
    for (const category of en.skills.categories) {
      expect(bundled).toContain(category.icon)
    }
  })
})
