interface SkillCardSkill {
  name: string
  /** primary: 3+ years of experience · secondary: 1–3 years */
  level: 'primary' | 'secondary'
}

interface SkillCategory {
  id: string
  title: string
  /** Iconify icon name, e.g. heroicons:server-stack */
  icon: string
  gradient: string
  skills: SkillCardSkill[]
}

interface TimelineProject {
  name: string
  period: string
  description: string
}

interface TimelineExperience {
  company: string
  position: string
  location: string
  workMode: 'remote' | 'onsite' | 'hybrid'
  /** the role in progress (its timeline dot pulses) */
  current?: boolean
  period: string
  description: string
  achievements: string[]
  projects: TimelineProject[]
  technologies: string[]
}

interface PortfolioRepository {
  name: string
  url: string
}

interface PortfolioProject {
  id: string
  title: string
  description: string
  projectUrl?: string
  githubRepos?: PortfolioRepository[]
  technologies: string[]
  isPublic: boolean
  /** own side project, listed in the Harvard CV */
  personal?: boolean
  logo?: string
}

interface HeroMetric {
  value: string
  label: string
}

interface EducationItem {
  institution: string
  degree: string
  period?: string
  note?: string
}

interface LanguageItem {
  name: string
  level: string
}

interface TranslationKeys {
  website: {
    title: string
    description: string
    keywords: string
  }
  nav: {
    skills: string
    experience: string
    projects: string
    education: string
    cv: string
    contact: string
    openMenu: string
    closeMenu: string
    switchLanguage: string
    mainNavigation: string
    skipToContent: string
    toggleTheme: string
  }
  home: {
    title: string
    description: string
    viewProjects: string
    contactMe: string
    metrics: HeroMetric[]
  }
  skills: {
    title: string
    legend: {
      primary: string
      secondary: string
    }
    categories: SkillCategory[]
  }
  timeline: {
    title: string
    workModes: {
      remote: string
      onsite: string
      hybrid: string
    }
    achievementsLabel: string
    projectsLabel: string
    experiences: TimelineExperience[]
  }
  projects: {
    title: string
    description: string
    CTA: string
    viewProject: string
    showMore: string
    showLess: string
    visibilityPublic: string
    visibilityPrivate: string
    items: PortfolioProject[]
  }
  education: {
    title: string
    items: EducationItem[]
  }
  languages: {
    title: string
    items: LanguageItem[]
  }
  cv: {
    title: string
    description: string
    view: string
    download: string
    print: string
    back: string
    zoomIn: string
    zoomOut: string
    zoomLevel: string
    fitWidth: string
    actualSize: string
    summary: string
    experience: string
    education: string
    projects: string
    skills: string
    technologies: string
  }
  chat: {
    open: string
    title: string
    close: string
    disclaimer: string
    greeting: string
    suggestions: string[]
    placeholder: string
    send: string
    typing: string
    errors: {
      rateLimited: string
      unavailable: string
      generic: string
    }
  }
  footer: {
    telegram: string
    whatsapp: string
    email: string
    linkedin: string
    github: string
    copyright: string
  }
}
