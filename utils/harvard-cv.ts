import { PROFILE, SITE_URL, fillProfileValues } from './profile'

/**
 * Harvard-style resume: name and contact centered on top, then sections with
 * one entry per role / degree / project. Each entry has a bold title with the
 * location on the right and an italic subtitle with the dates on the right.
 *
 * The web page (pages/cv.vue) and the PDF (server/utils/harvard-pdf.ts) both
 * render this model, so they always show the same content.
 */
export interface HarvardContact {
  text: string
  href?: string
}

export interface HarvardEntry {
  title: string
  titleRight?: string
  subtitle?: string
  subtitleRight?: string
  summary?: string
  bullets: string[]
}

/** A "Label: text" line, used for skills and languages. */
export interface HarvardLine {
  label: string
  text: string
}

export interface HarvardSection {
  id: 'summary' | 'experience' | 'education' | 'projects' | 'skills'
  title: string
  /** free text, used by the summary */
  paragraph?: string
  entries: HarvardEntry[]
  lines: HarvardLine[]
}

export interface HarvardCv {
  name: string
  headline: string
  contact: HarvardContact[]
  sections: HarvardSection[]
}

const withoutProtocol = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export function buildHarvardCv(cv: TranslationKeys): HarvardCv {
  const summary: HarvardSection = {
    id: 'summary',
    title: cv.cv.summary,
    paragraph: fillProfileValues(cv.home.description),
    entries: [],
    lines: []
  }

  const experience: HarvardSection = {
    id: 'experience',
    title: cv.cv.experience,
    lines: [],
    entries: cv.timeline.experiences.map((exp) => ({
      title: exp.company,
      titleRight: `${exp.location} · ${cv.timeline.workModes[exp.workMode]}`,
      subtitle: exp.position,
      subtitleRight: exp.period,
      summary: exp.description,
      bullets: [
        ...exp.achievements,
        ...(exp.projects.length
          ? [`${cv.timeline.projectsLabel}: ${exp.projects.map((p) => p.name).join(', ')}.`]
          : [])
      ]
    }))
  }

  const projects: HarvardSection = {
    id: 'projects',
    title: cv.cv.projects,
    lines: [],
    entries: cv.projects.items
      .filter((project) => project.personal)
      .map((project) => ({
        title: project.title,
        titleRight: project.projectUrl ? withoutProtocol(project.projectUrl) : undefined,
        subtitle: `${cv.cv.technologies}: ${project.technologies.join(', ')}`,
        summary: project.description,
        bullets: []
      }))
  }

  const education: HarvardSection = {
    id: 'education',
    title: cv.cv.education,
    lines: [],
    entries: cv.education.items.map((item) => ({
      title: item.institution,
      subtitle: item.degree,
      subtitleRight: item.period,
      summary: item.note,
      bullets: []
    }))
  }

  const skills: HarvardSection = {
    id: 'skills',
    title: cv.cv.skills,
    entries: [],
    lines: [
      ...cv.skills.categories.map((category) => ({
        label: category.title,
        text: category.skills.map((skill) => skill.name).join(', ')
      })),
      {
        label: cv.languages.title,
        text: cv.languages.items.map((l) => `${l.name} — ${l.level}`).join(' · ')
      }
    ]
  }

  return {
    name: PROFILE.name,
    headline: `${cv.home.title} · ${PROFILE.city}, Ecuador`,
    contact: [
      { text: PROFILE.email, href: `mailto:${PROFILE.email}` },
      { text: PROFILE.phoneDisplay, href: `tel:+${PROFILE.phone}` },
      { text: withoutProtocol(PROFILE.linkedin), href: PROFILE.linkedin },
      { text: withoutProtocol(PROFILE.github), href: PROFILE.github },
      { text: withoutProtocol(SITE_URL), href: SITE_URL }
    ],
    sections: [summary, experience, projects, education, skills].filter(
      (section) => section.paragraph || section.entries.length || section.lines.length
    )
  }
}
