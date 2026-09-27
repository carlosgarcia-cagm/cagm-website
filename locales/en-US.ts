export default {
  website: {
    title: 'Carlos García | Senior Backend / Platform Engineer',
    description:
      'Professional portfolio of Carlos García, Senior Backend / Platform Engineer specialized in Node.js, TypeScript, NestJS, cloud infrastructure (AWS, GCP), CI/CD, and observability.',
    keywords:
      'portfolio, senior backend engineer, platform engineer, node.js, typescript, nestjs, backend, automation, infrastructure, observability, ci/cd, terraform, aws, gcp, digitalocean, docker, postgresql, mongodb'
  },
  nav: {
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education',
    cv: 'CV',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Ver en español',
    mainNavigation: 'Main navigation',
    skipToContent: 'Skip to content',
    toggleTheme: 'Toggle dark mode'
  },
  home: {
    title: 'Senior Backend / Platform Engineer',
    description:
      '{years}+ years as an independent contractor building production systems across media, IoT, and enterprise productivity with Node.js, TypeScript, and NestJS. I design AWS and GCP infrastructure with Terraform, CI/CD, and observability, with a proven record of 10x cost reductions and up to 42x performance improvements in production.',
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
    metrics: [
      { value: '{years}+', label: 'years of experience' },
      { value: '42x', label: 'faster video conversion' },
      { value: '10x', label: 'cheaper storage' },
      { value: '6', label: 'people led' }
    ]
  },
  skills: {
    title: 'Technical Skills',
    legend: { primary: '3+ years', secondary: '1–3 years' },
    categories: [
      {
        id: 'backend',
        title: 'Backend',
        gradient: 'from-orange-500 to-orange-600',
        icon: 'heroicons:computer-desktop',
        skills: [
          { name: 'Node.js', level: 'primary' },
          { name: 'TypeScript', level: 'primary' },
          { name: 'NestJS', level: 'primary' }
        ]
      },
      {
        id: 'databases',
        title: 'Databases',
        gradient: 'from-green-500 to-green-600',
        icon: 'heroicons:circle-stack',
        skills: [
          { name: 'MongoDB', level: 'primary' },
          { name: 'PostgreSQL', level: 'secondary' },
          { name: 'Redis', level: 'secondary' },
          { name: 'Prisma', level: 'secondary' }
        ]
      },
      {
        id: 'infra',
        title: 'Cloud & Infrastructure',
        gradient: 'from-purple-500 to-purple-600',
        icon: 'heroicons:server-stack',
        skills: [
          { name: 'GCP', level: 'primary' },
          { name: 'DigitalOcean', level: 'primary' },
          { name: 'Docker', level: 'primary' },
          { name: 'Terraform', level: 'secondary' },
          { name: 'AWS', level: 'secondary' }
        ]
      },
      {
        id: 'cicd',
        title: 'CI/CD & Testing',
        gradient: 'from-pink-500 to-pink-600',
        icon: 'heroicons:arrow-path',
        skills: [
          { name: 'GitHub Actions', level: 'primary' },
          { name: 'Vitest', level: 'primary' },
          { name: 'Jest', level: 'secondary' }
        ]
      },
      {
        id: 'observability',
        title: 'Observability & Tools',
        gradient: 'from-indigo-500 to-indigo-600',
        icon: 'heroicons:chart-bar',
        skills: [
          { name: 'FFmpeg', level: 'primary' },
          { name: 'Grafana', level: 'secondary' },
          { name: 'Prometheus', level: 'secondary' }
        ]
      },
      {
        id: 'frontend',
        title: 'Frontend',
        gradient: 'from-blue-500 to-blue-600',
        icon: 'heroicons:cog-6-tooth',
        skills: [
          { name: 'Angular', level: 'primary' },
          { name: 'Vue.js / Nuxt 3', level: 'primary' }
        ]
      }
    ]
  },
  timeline: {
    title: 'Professional Experience',
    workModes: { remote: 'Remote', onsite: 'On-site', hybrid: 'Hybrid' },
    achievementsLabel: 'Main achievements',
    projectsLabel: 'Projects',
    experiences: [
      {
        company: 'Roi Studio',
        current: true,
        position: 'Senior Backend / Platform Engineer (Contract)',
        location: 'Guayaquil, Ecuador',
        workMode: 'remote',
        period: 'November 2023 – Present',
        description:
          'International contract building and operating production systems for real-time IoT location, special education SaaS, and enterprise productivity.',
        achievements: [
          'Implemented end-to-end observability (metrics → alerts → dashboards) with Prometheus, Grafana, and Alertmanager over ECS microservices',
          'Built on-demand, PR-specific sandbox environments on Docker-based EC2 with GitHub Actions CI/CD',
          'Set up Metabase from scratch on ECS with automated, versioned configuration and S3 → Glacier backup and retention policies',
          'Redesigned the core modules of a multi-tenant special education SaaS (sessions, billing, IEP, OTP auth) with NestJS, Prisma, and PostgreSQL, and contributed to Jest unit/e2e test coverage of ~76%',
          'Implemented SSO with Azure AD + WorkOS for federated enterprise authentication',
          'Ran critical production data operations on a MongoDB database with 200k+ active users and 1 TB+ of data: bulk corrections, recovery of lost data from BigQuery, and safe deletions',
          'Built 3 Google Cloud Functions with Cloud Scheduler and managed GCP infrastructure with Terraform'
        ],
        projects: [
          {
            name: 'Real-Time 3D Location Platform (ZLP)',
            period: 'Feb 2025 – Present',
            description:
              'IoT location intelligence on AWS: NestJS microservices, Kinesis streaming, Terraform, observability, and unit tests for geofencing services.'
          },
          {
            name: 'Special Education SaaS Platform (IEP)',
            period: 'Jul 2025 – Dec 2025',
            description:
              'Multi-tenant NestJS + Prisma + PostgreSQL SaaS replacing an untested legacy system. Redesigned therapy sessions with Strategy + Observer patterns (~1,200 → ~400 LOC; a new session type in ~1 hour), participant-centric billing with 5 rate criteria, IEP mandates/goals/authorization periods as a state machine, and secure OTP auth (argon2, rate limiting, Redis).'
          },
          {
            name: 'Enterprise Productivity Monitoring Platform',
            period: 'Nov 2023 – Feb 2025',
            description:
              'Maintained a full ecosystem (web app, API, Flutter mobile app, backoffice, and async workers), consistently meeting 40+ story points per sprint and stabilizing the bug backlog.'
          }
        ],
        technologies: [
          'NestJS',
          'TypeScript',
          'PostgreSQL',
          'Prisma',
          'Redis',
          'AWS',
          'Terraform',
          'Docker',
          'Prometheus',
          'Grafana',
          'Metabase',
          'GitHub Actions',
          'MongoDB',
          'GCP',
          'Angular'
        ]
      },
      {
        company: 'Lanubetv S.A.',
        position: 'Senior Technical Consultant (Contract)',
        location: 'Guayaquil, Ecuador',
        workMode: 'remote',
        period: 'January 2019 – March 2026',
        description:
          'Video transcoding platform that receives commercials, converts them to channel-specific formats with FFmpeg, and delivers them to media outlets. Full-time until mid-2021, then part-time.',
        achievements: [
          'Migrated the transcoding pipeline to parallel serverless Go functions, achieving up to 42x faster conversion (60–80 min → 1m55s per batch of channels)',
          'Cut storage costs 10x by migrating to DigitalOcean Spaces',
          'Decommissioned a manually operated Windows server and right-sized servers to demand',
          'Built the corporate website (lanubetv.net) with Vue and Vuetify and upgraded it from Vue 2 to Vue 3'
        ],
        projects: [],
        technologies: [
          'Node.js',
          'Go',
          'FFmpeg',
          'Vue.js',
          'Quasar',
          'Vuetify',
          'Docker',
          'GitHub Actions',
          'Vitest',
          'MongoDB',
          'DigitalOcean'
        ]
      },
      {
        company: 'Nextgen S.A.',
        position: 'Technical Lead (Contract)',
        location: 'Guayaquil, Ecuador',
        workMode: 'hybrid',
        period: 'July 2021 – March 2024',
        description:
          'Grew from mid-senior developer to technical lead, owning architecture decisions across 4 concurrent projects.',
        achievements: [
          'Led a team of 5 developers + 1 QA for 1+ year: sprints, mentoring, and deliverable reviews',
          'Reduced development cycle times by 20% through process and communication improvements',
          'Designed a serverless architecture with DynamoDB capable of processing 1M+ records per request',
          'Secured retention of a key client by leading critical bug resolution'
        ],
        projects: [
          {
            name: 'Senscloud',
            period: '2021 – 2024',
            description:
              'Technical leadership of the team and delivery of new client features.'
          },
          {
            name: 'NextTrace',
            period: '2023',
            description:
              'Serverless architecture with DynamoDB for 1M+ records per request.'
          },
          {
            name: 'Xtrim',
            period: 'Sep – Oct 2023',
            description:
              'Joined in the final stretch, introduced Jira to replace Excel, and optimized queries with database indexes.'
          },
          {
            name: 'Nextsign',
            period: '2024',
            description:
              'Technical lead for post-Phase 1 critical bug resolution.'
          }
        ],
        technologies: [
          'Node.js',
          'Angular',
          'React',
          'MongoDB',
          'PostgreSQL',
          'DynamoDB',
          'Docker',
          'AWS'
        ]
      }
    ]
  },
  projects: {
    title: 'Selected Projects',
    description:
      'A selection of projects where I worked on migrations, automation, optimization, and backend system evolution.',
    CTA: 'Need help with backend, automation, or system optimization?',
    viewProject: 'View Project',
    showMore: 'Show more',
    showLess: 'Show less',
    visibilityPublic: 'Public',
    visibilityPrivate: 'Private',
    items: [
      {
        id: 'nextgen-timbres',
        title: 'Fiscal Stamps Platform (NextGen)',
        description:
          'A serverless system for fiscal stamp printing, where I contributed during the initial stage with Node.js, DynamoDB, and cloud services.',
        technologies: ['Serverless', 'Node.js', 'DynamoDB'],
        isPublic: false
      },
      {
        id: 'nextgen-firma',
        title: 'Electronic Signature Platform (NextGen)',
        description:
          'An electronic signature platform where I supported maintenance, bug fixing, and the delivery of new backend features.',
        technologies: ['Node.js', 'Vue.js'],
        isPublic: false
      },
      {
        id: 'adaptcv',
        personal: true,
        title: 'AdaptCV',
        description:
          'A production web platform to generate professional CVs with multiple templates, bilingual support (ES/EN), and AI-powered automatic translation. Built as a full-stack Turborepo monorepo with automated CI/CD.',
        projectUrl: 'https://adaptcv-frontend.vercel.app/',
        githubRepos: [
          {
            name: 'AdaptCV Frontend',
            url: 'https://github.com/carlosgarcia-cagm/adaptcv-frontend'
          },
          {
            name: 'AdaptCV Backend',
            url: 'https://github.com/carlosgarcia-cagm/adaptcv-backend'
          }
        ],
        technologies: [
          'NestJS',
          'Nuxt 3',
          'MongoDB',
          'Docker',
          'GitHub Actions',
          'TypeScript'
        ],
        isPublic: true
      },
      {
        id: 'real-estate-analyzer',
        personal: true,
        title: 'Real Estate Price Analyzer',
        description:
          'A web scraping tool that collects real estate listings and automatically estimates market value from land characteristics, to evaluate whether a property is priced reasonably.',
        technologies: [
          'TypeScript',
          'Playwright',
          'Node.js',
          'Firebase',
          'Google Sheets API'
        ],
        isPublic: false
      },
      {
        id: 'la-nube-tv',
        title: 'La Nube TV',
        description:
          'A website for a commercial distribution company that shows information about the company and its services. Originally built with Vue 2 and Vuetify, later migrated to Vue 3 and Vuetify.',
        projectUrl: 'https://lanubetv.net/',
        technologies: ['Vue 3', 'Vuetify'],
        isPublic: false
      }
    ]
  },
  education: {
    title: 'Education',
    items: [
      {
        institution: 'ESPOL — Escuela Superior Politécnica del Litoral',
        degree: 'Telecommunications Engineering',
        note: 'Not finished: 1 final course and thesis validation pending.'
      }
    ]
  },
  languages: {
    title: 'Languages',
    items: [
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'Intermediate (B2)' }
    ]
  },
  cv: {
    title: 'Harvard-format CV',
    description:
      "Carlos García's CV in Harvard format, ready to view, print or download as PDF.",
    view: 'View CV',
    download: 'Download PDF',
    print: 'Print',
    back: 'Back to site',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    zoomLevel: 'Zoom level',
    fitWidth: 'Fit to width',
    actualSize: 'Actual size',
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    projects: 'Personal Projects',
    skills: 'Technical Skills & Languages',
    technologies: 'Technologies'
  },
  chat: {
    open: 'Ask my CV',
    title: 'Ask my CV',
    close: 'Close chat',
    disclaimer:
      'AI assistant that answers with the information in this CV. Questions are processed by DeepSeek. It can make mistakes.',
    greeting: "Hi! Ask me about Carlos's experience, projects or skills.",
    suggestions: [
      'What experience does he have with AWS?',
      'What is his biggest achievement?',
      'Has he led teams?'
    ],
    placeholder: 'Type your question…',
    send: 'Send',
    typing: 'Typing…',
    errors: {
      rateLimited:
        'You have asked many questions in a row. Please try again in a few minutes.',
      unavailable:
        'The assistant is not available right now. You can reach me by email or LinkedIn.',
      generic: 'I could not answer. Please try again.'
    }
  },
  footer: {
    telegram: 'Contact on Telegram',
    whatsapp: 'Contact on WhatsApp',
    email: 'Send an email',
    linkedin: 'LinkedIn profile',
    github: 'GitHub profile',
    copyright: 'All rights reserved'
  }
} satisfies TranslationKeys
