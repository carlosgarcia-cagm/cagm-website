const profile: TranslationKeys['profile'] = {
  name: 'Name',
  title: 'CV Settings',
  namePlaceholder: 'CV Title',
  personalInfo: {
    contactInfo: 'Contact Information',
    title: 'Information',
    fullname: 'Full Name',
    areaProfession: 'Area of Profession',
    areaProfessionPlaceholder: 'Select an area of profession',
    professionPlaceholder: 'Select a profession',
    profession: 'Profession',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    country: 'Country',
    builder: 'Builder',
    aboutMe: 'About Me',
    uploadPhoto: 'Upload Photo'
  },
  aboutMe: {
    title: 'About Me',
    summary: 'Summary',
    slogan: 'Slogan',
    logo: 'Logo',
    uploadLogo: 'Upload Logo'
  },
  experience: {
    title: 'Experience',
    jobTitle: 'Job Title',
    company: 'Company',
    position: 'Position',
    description: 'Description'
  },
  education: {
    title: 'Education',
    fieldOfStudy: 'Field of Study',
    degree: 'Degree',
    degreePlaceholder: 'Select a degree',
    institution: 'Institution',
    startDate: 'Start Date',
    endDate: 'End Date',
    secondary: 'Secondary',
    highSchool: 'High School',
    technical: 'Technical',
    undergraduate: 'Undergraduate',
    graduate: 'Graduate',
    masters: 'Masters',
    doctorate: 'Doctorate'
  },
  skills: {
    title: 'Technical Skills',
    skill: 'Skill',
    less1year: 'Less than 1 year',
    '1to3years': '1 to 3 years',
    '3to5years': '3 to 5 years',
    '5to10years': '5 to 10 years',
    '10plusyears': '10+ years',
    job: 'Job',
    yearsOfExperience: 'Years of Experience',
    placeholderSkill: 'Select a skill',
    categories: [
      {
        id: 'backend',
        title: 'Backend',
        gradient: 'from-orange-500 to-orange-600',
        icon:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>',
        skills: [
          { name: 'Node.js', level: 'green' },
          { name: 'TypeScript', level: 'green' },
          { name: 'NestJS', level: 'green' }
        ]
      },
      {
        id: 'databases',
        title: 'Databases',
        gradient: 'from-green-500 to-green-600',
        icon:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>',
        skills: [
          { name: 'MongoDB', level: 'green' },
          { name: 'PostgreSQL', level: 'blue' },
          { name: 'MySQL', level: 'blue' },
          { name: 'Redis', level: 'blue' },
          { name: 'Prisma', level: 'blue' }
        ]
      },
      {
        id: 'infra',
        title: 'Cloud & Infrastructure',
        gradient: 'from-purple-500 to-purple-600',
        icon:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"></path>',
        skills: [
          { name: 'GCP', level: 'green' },
          { name: 'DigitalOcean', level: 'green' },
          { name: 'Docker', level: 'green' },
          { name: 'Terraform', level: 'blue' },
          { name: 'AWS', level: 'blue' }
        ]
      },
      {
        id: 'cicd',
        title: 'CI/CD & Testing',
        gradient: 'from-pink-500 to-pink-600',
        icon:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>',
        skills: [
          { name: 'GitHub Actions', level: 'green' },
          { name: 'Vitest', level: 'green' },
          { name: 'Jest', level: 'blue' }
        ]
      },
      {
        id: 'observability',
        title: 'Observability & Tools',
        gradient: 'from-indigo-500 to-indigo-600',
        icon:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>',
        skills: [
          { name: 'FFmpeg', level: 'green' },
          { name: 'Grafana', level: 'blue' },
          { name: 'Prometheus', level: 'blue' }
        ]
      },
      {
        id: 'frontend',
        title: 'Frontend',
        gradient: 'from-blue-500 to-blue-600',
        icon:
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>',
        skills: [
          { name: 'Angular', level: 'green' },
          { name: 'Vue.js / Nuxt 3', level: 'green' }
        ]
      }
    ]
  },
  languages: {
    title: 'Languages',
    language: 'Language',
    level: 'Level',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    native: 'Native',
    placeholderLanguage: 'Select a language'
  },
  timeline: {
    title: 'Professional Experience',
    description:
      'A career path focused on backend, automation, and cloud operations.',
    workModes: {
      remote: 'Remote',
      onsite: 'On-site',
      hybrid: 'Hybrid'
    },
    achievementsLabel: 'Main achievements',
    projectsLabel: 'Projects',
    experiences: [
      {
        company: 'Roi Studio',
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
          'Implemented SSO with Azure AD + WorkOS for federated enterprise authentication',
          'Operated a high-scale MongoDB database (200k+ active users, 1 TB+ of data), using BigQuery to detect and recover inconsistent data',
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
              'Backend development for a SaaS platform for special education.'
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
          'Migrated ~90% of the legacy PHP platform to NestJS + Prisma + MySQL with Screaming Architecture, unit/integration/e2e testing, CI/CD, and Docker'
        ],
        projects: [],
        technologies: [
          'Node.js',
          'Go',
          'NestJS',
          'FFmpeg',
          'Vue.js',
          'Quasar',
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
    visibilityPublic: 'Public',
    visibilityPrivate: 'Private',
    items: [
      {
        id: 'la-nube-tv-migration',
        title: 'La Nube TV Platform Migration',
        description:
          'Migration of ~90% of the La Nube TV legacy PHP platform to NestJS, Prisma, and MySQL with Screaming Architecture, unit/integration/e2e testing, CI/CD, and Docker, plus a Vue 3 + Quasar frontend.',
        projectUrl: 'https://app2.lanubetv.net/',
        technologies: ['NestJS', 'Prisma', 'MySQL', 'Vue 3', 'Quasar', 'Docker'],
        isPublic: false
      },
      {
        id: 'nextgen-timbres',
        title: 'Fiscal Stamps Platform (NextGen)',
        description:
          'A serverless system for fiscal stamp printing, where I contributed during the initial stage with Node.js, DynamoDB, and cloud services.',
        projectUrl: 'https://app.nextrace.ec/login',
        technologies: ['Serverless', 'Node.js', 'DynamoDB'],
        isPublic: false
      },
      {
        id: 'nextgen-firma',
        title: 'Electronic Signature Platform (NextGen)',
        description:
          'An electronic signature platform where I supported maintenance, bug fixing, and the delivery of new backend features.',
        projectUrl: 'https://app.nextsign.ec/login',
        technologies: ['Node.js', 'Vue.js'],
        isPublic: false
      },
      {
        id: 'adaptcv',
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
        technologies: ['NestJS', 'Nuxt 3', 'MongoDB', 'Docker', 'GitHub Actions', 'TypeScript'],
        isPublic: true
      },
      {
        id: 'real-estate-analyzer',
        title: 'Real Estate Price Analyzer',
        description:
          'A web scraping tool that collects real estate listings and automatically estimates market value from land characteristics, to evaluate whether a property is priced reasonably.',
        technologies: ['TypeScript', 'Playwright', 'Node.js', 'Firebase', 'Google Sheets API'],
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
      },
      {
        id: 'wedding-website',
        title: 'Wedding Website',
        description:
          'A simple personal website created for my wedding that shows the date, location, and a photo gallery. It uses Vue.js, Quasar, and Firebase.',
        projectUrl: 'https://kenya-carlos-wedding.vercel.app/',
        technologies: ['Vue.js', 'Quasar', 'Firebase'],
        isPublic: false
      }
    ]
  }
} as TranslationKeys['profile']

const builder: TranslationKeys['builder'] = {
  title: 'Builder',
  name: 'Name',
  status: 'Status',
  description: 'Description',
  template: 'Template',
  id: 'ID',
  sections: 'Sections',
  selectTemplate: 'Select Template'
}

const baseEntity: TranslationKeys['baseEntity'] = {
  createdAt: 'Created',
  updatedAt: 'Updated',
  createdBy: 'Created by',
  updatedBy: 'Updated by',
  deletedAt: 'Deleted'
}

const generatePDF: TranslationKeys['generatePDF'] = {
  generatingPdfForTemplate: 'Generating PDF for template'
}

const footer: TranslationKeys['footer'] = {
  telegramTooltip: 'Contact on Telegram',
  whatsappTooltip: 'Contact on WhatsApp',
  emailTooltip: 'Send an email',
  copyright: 'All rights reserved'
}

export default defineI18nLocale(async () => {
  return {
    home: {
      title: 'Senior Backend / Platform Engineer',
      description:
        'Senior Backend / Platform Engineer with 7+ years as an independent contractor, building production systems across media, IoT, and enterprise productivity with Node.js, TypeScript, and NestJS. I design AWS and GCP infrastructure with Terraform, CI/CD, and observability, with a proven record of 10x cost reductions and up to 42x performance improvements in production.',
      viewProjects: 'View Projects',
      downloadCV: 'Download CV',
      skillsTitle: 'Technical Skills',
      timelineTitle: 'Professional Experience',
      projectsTitle: 'Selected Projects',
      projectsDescription:
        'A selection of projects where I worked on migrations, automation, optimization, and backend system evolution.',
      projectsCTA: 'Need help with backend, automation, or system optimization?',
      contactMe: 'Contact Me'
    },
    generatePDF: generatePDF,
    website: {
      description:
        'Professional portfolio of Carlos García, Senior Backend / Platform Engineer specialized in Node.js, TypeScript, NestJS, cloud infrastructure (AWS, GCP), CI/CD, and observability.',
      title: 'Carlos García | Senior Backend / Platform Engineer',
      keywords:
        'portfolio, senior backend engineer, platform engineer, node.js, typescript, nestjs, backend, automation, infrastructure, observability, ci/cd, terraform, aws, gcp, digitalocean, docker, postgresql, mongodb',
      welcome: 'Welcome to'
    },
    actions: {
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      options: 'Options',
      upload: 'Upload',
      uploadImage: 'Upload Image',
      saveImage: 'Save Image',
      back: 'Back',
      continue: 'Continue',
      next: 'Next',
      previous: 'Previous',
      finish: 'Finish',
      register: 'Register',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      forgotPassword: 'Forgot Password?',
      publish: 'Publish',
      preview: 'Preview',
      settings: 'Settings',
      print: 'Print',
      download: 'Download',
      exportPdf: 'Download PDF',
      downloadPdf: 'Download PDF',
      exportCSV: 'Download CSV',
      translate: 'Translate'
    },
    common: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      testimonials: 'Testimonials',
      blog: 'Blog',
      portfolio: 'Portfolio',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      email: 'Email',
      noData: 'No data available',
      startDate: 'Start Date',
      endDate: 'End Date',
      current: 'Current'
    },
    login: {
      email: 'email',
      password: 'password',
      title: 'Login',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      loginAccount: 'Login to your account',
      loginEnterDetails: 'Enter your details to login',
      forgotPassword: 'Forgot Password?',
      keepMeLoggedIn: 'Keep me logged in',
      rememberMe: 'Remember Me',
      signUp: 'Sign Up',
      signIn: 'Sign In',
      dontHaveAccount: "Don't have an account?",
      signInWithGoogle: 'Sign In with Google'
    },
    registration: {
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signUp: 'Sign Up'
    },
    routes: {
      home: 'Home',
      builder: 'Builder',
      preview: 'Preview',
      templates: 'Templates',
      settings: 'Settings',
      profile: 'Profile',
      dashboard: 'Dashboard',
      logout: 'Logout'
    },
    baseEntity: baseEntity,
    builder: builder,
    profile: profile,
    footer: footer
  } as TranslationKeys
})
