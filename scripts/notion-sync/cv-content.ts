/**
 * The part of the website content that Notion owns. Everything else in the
 * locale files (UI labels, hero metrics, icons, client project cards, SEO)
 * stays owned by the website and is never touched by the sync.
 */
export interface CvSkillCategory {
  id: string
  title: string
  skills: SkillCardSkill[]
}

export interface CvContent {
  /** home.title */
  title: string
  /** home.description; keeps the {years} placeholder */
  summary: string
  experiences: TimelineExperience[]
  /** projects.items with personal: true */
  personalProjects: PortfolioProject[]
  education: EducationItem[]
  languages: LanguageItem[]
  skills: CvSkillCategory[]
}

export type Locale = 'es' | 'en'
export type LocaleMessages = TranslationKeys

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))

export function extractCvContent(messages: LocaleMessages): CvContent {
  return clone({
    title: messages.home.title,
    summary: messages.home.description,
    experiences: messages.timeline.experiences,
    personalProjects: messages.projects.items.filter((p) => p.personal),
    education: messages.education.items,
    languages: messages.languages.items,
    skills: messages.skills.categories.map(({ id, title, skills }) => ({
      id,
      title,
      skills
    }))
  })
}

/** Icon and colors for skill categories that Notion adds. */
const NEW_CATEGORY_STYLE = {
  icon: 'heroicons:cog-6-tooth',
  gradient: 'from-gray-500 to-gray-600'
}

/** Returns a copy of the locale messages with the Notion-owned content applied. */
export function applyCvContent(
  messages: LocaleMessages,
  content: CvContent
): LocaleMessages {
  const next = clone(messages)
  next.home.title = content.title
  next.home.description = content.summary
  next.timeline.experiences = clone(content.experiences)
  next.education.items = clone(content.education)
  next.languages.items = clone(content.languages)

  // personal projects are replaced in place; client projects stay as they are
  const personal = clone(content.personalProjects).map((p) => ({
    ...p,
    personal: true
  }))
  const items: PortfolioProject[] = []
  let inserted = false
  for (const item of next.projects.items) {
    if (!item.personal) items.push(item)
    else if (!inserted) {
      items.push(...personal)
      inserted = true
    }
  }
  if (!inserted) items.push(...personal)
  next.projects.items = items

  const styles = new Map(next.skills.categories.map((c) => [c.id, c]))
  next.skills.categories = content.skills.map((category) => {
    const existing = styles.get(category.id)
    return {
      id: category.id,
      title: category.title,
      gradient: existing?.gradient ?? NEW_CATEGORY_STYLE.gradient,
      icon: existing?.icon ?? NEW_CATEGORY_STYLE.icon,
      skills: clone(category.skills)
    }
  })

  return next
}

const WORK_MODES = new Set(['remote', 'onsite', 'hybrid'])
const LEVELS = new Set(['primary', 'secondary'])
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/

function checkText(errors: string[], path: string, value: unknown) {
  if (typeof value !== 'string' || !value.trim())
    errors.push(`${path} must be a non-empty text`)
}

function checkList(
  errors: string[],
  path: string,
  value: unknown
): value is unknown[] {
  if (!Array.isArray(value)) {
    errors.push(`${path} must be a list`)
    return false
  }
  return true
}

/** Structural checks for one language. Returns the problems found. */
export function validateCvContent(content: CvContent, label: string): string[] {
  const errors: string[] = []
  const at = (path: string) => `${label}.${path}`

  checkText(errors, at('title'), content?.title)
  checkText(errors, at('summary'), content?.summary)
  if (
    typeof content?.summary === 'string' &&
    !content.summary.includes('{years}')
  ) {
    errors.push(`${at('summary')} must keep the {years} placeholder`)
  }

  if (checkList(errors, at('experiences'), content?.experiences)) {
    if (!content.experiences.length)
      errors.push(`${at('experiences')} cannot be empty`)
    content.experiences.forEach((exp, i) => {
      const p = at(`experiences[${i}]`)
      for (const key of [
        'company',
        'position',
        'location',
        'period',
        'description'
      ] as const) {
        checkText(errors, `${p}.${key}`, exp?.[key])
      }
      if (!WORK_MODES.has(exp?.workMode))
        errors.push(`${p}.workMode must be remote, onsite or hybrid`)
      if (checkList(errors, `${p}.achievements`, exp?.achievements)) {
        exp.achievements.forEach((a, j) =>
          checkText(errors, `${p}.achievements[${j}]`, a)
        )
      }
      if (checkList(errors, `${p}.projects`, exp?.projects)) {
        exp.projects.forEach((proj, j) => {
          for (const key of ['name', 'period', 'description'] as const) {
            checkText(errors, `${p}.projects[${j}].${key}`, proj?.[key])
          }
        })
      }
      checkList(errors, `${p}.technologies`, exp?.technologies)
    })
  }

  if (checkList(errors, at('personalProjects'), content?.personalProjects)) {
    content.personalProjects.forEach((project, i) => {
      const p = at(`personalProjects[${i}]`)
      if (typeof project?.id !== 'string' || !ID.test(project.id))
        errors.push(`${p}.id must be kebab-case`)
      checkText(errors, `${p}.title`, project?.title)
      checkText(errors, `${p}.description`, project?.description)
      checkList(errors, `${p}.technologies`, project?.technologies)
      if (project?.projectUrl && !/^https:\/\//.test(project.projectUrl)) {
        errors.push(`${p}.projectUrl must use https`)
      }
    })
  }

  if (checkList(errors, at('education'), content?.education)) {
    content.education.forEach((item, i) => {
      checkText(errors, at(`education[${i}].institution`), item?.institution)
      checkText(errors, at(`education[${i}].degree`), item?.degree)
    })
  }

  if (checkList(errors, at('languages'), content?.languages)) {
    content.languages.forEach((item, i) => {
      checkText(errors, at(`languages[${i}].name`), item?.name)
      checkText(errors, at(`languages[${i}].level`), item?.level)
    })
  }

  if (checkList(errors, at('skills'), content?.skills)) {
    content.skills.forEach((category, i) => {
      const p = at(`skills[${i}]`)
      if (typeof category?.id !== 'string' || !ID.test(category.id))
        errors.push(`${p}.id must be kebab-case`)
      checkText(errors, `${p}.title`, category?.title)
      if (checkList(errors, `${p}.skills`, category?.skills)) {
        category.skills.forEach((skill, j) => {
          checkText(errors, `${p}.skills[${j}].name`, skill?.name)
          if (!LEVELS.has(skill?.level))
            errors.push(`${p}.skills[${j}].level must be primary or secondary`)
        })
      }
    })
  }

  return errors
}

/** Data that must be identical in Spanish and English (ids, companies, stacks…). */
function languageIndependent(content: CvContent) {
  return {
    experiences: content.experiences.map((e) => ({
      company: e.company,
      current: Boolean(e.current),
      workMode: e.workMode,
      technologies: e.technologies,
      achievements: e.achievements.length,
      projects: e.projects.length
    })),
    personalProjects: content.personalProjects.map((p) => ({
      id: p.id,
      projectUrl: p.projectUrl,
      githubRepos: p.githubRepos,
      technologies: p.technologies,
      isPublic: p.isPublic
    })),
    education: content.education.length,
    languages: content.languages.length,
    skills: content.skills.map((c) => ({ id: c.id, skills: c.skills }))
  }
}

export function validateTranslations(es: CvContent, en: CvContent): string[] {
  const errors = [
    ...validateCvContent(es, 'es'),
    ...validateCvContent(en, 'en')
  ]
  if (errors.length) return errors
  const a = JSON.stringify(languageIndependent(es))
  const b = JSON.stringify(languageIndependent(en))
  if (a !== b)
    errors.push(
      'es and en differ in data that must be the same (ids, companies, technologies, list sizes)'
    )
  return errors
}

/** TypeScript source of a locale file (formatted afterwards with Prettier). */
export function serializeLocale(messages: LocaleMessages): string {
  return `export default ${JSON.stringify(messages, null, 2)} satisfies TranslationKeys\n`
}
