const profile: TranslationKeys['profile'] = {
  name: 'Nombre',
  title: 'Configuración del currículum',
  namePlaceholder: 'Título del currículum',
  personalInfo: {
    contactInfo: 'Información de contacto',
    title: 'Información',
    fullname: 'Nombre completo',
    areaProfession: 'Área de profesión',
    areaProfessionPlaceholder: 'Selecciona un área de profesión',
    professionPlaceholder: 'Selecciona una profesión',
    profession: 'Profesión',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    address: 'Dirección',
    city: 'Ciudad',
    country: 'País',
    builder: 'Rellena la información',
    aboutMe: 'Acerca de mí',
    uploadPhoto: 'Subir foto'
  },
  aboutMe: {
    title: 'Acerca de mí',
    summary: 'Resumen',
    slogan: 'Eslogan',
    logo: 'Logo',
    uploadLogo: 'Subir logo'
  },
  experience: {
    title: 'Experiencia',
    jobTitle: 'Título del trabajo',
    company: 'Compañía',
    position: 'Posición',
    description: 'Descripción'
  },
  education: {
    title: 'Educación',
    fieldOfStudy: 'Campo de estudio',
    degree: 'Título',
    degreePlaceholder: 'Selecciona un título',
    institution: 'Institución',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de finalización',
    secondary: 'Secundaria',
    highSchool: 'Escuela secundaria',
    technical: 'Técnica',
    undergraduate: 'Licenciatura',
    graduate: 'Posgrado',
    masters: 'Maestría',
    doctorate: 'Doctorado'
  },
  skills: {
    title: 'Habilidades técnicas',
    skill: 'Habilidad',
    less1year: 'Menos de 1 año',
    '1to3years': '1 a 3 años',
    '3to5years': '3 a 5 años',
    '5to10years': '5 a 10 años',
    '10plusyears': 'Más de 10 años',
    job: 'Trabajo',
    yearsOfExperience: 'Años de experiencia',
    placeholderSkill: 'Selecciona una habilidad',
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
        title: 'Bases de datos',
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
        title: 'Cloud e infraestructura',
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
        title: 'CI/CD y testing',
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
        title: 'Observabilidad y herramientas',
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
    title: 'Idiomas',
    language: 'Idioma',
    level: 'Nivel',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    native: 'Nativo',
    placeholderLanguage: 'Selecciona un idioma'
  },
  timeline: {
    title: 'Experiencia profesional',
    description:
      'Una trayectoria enfocada en backend, automatización y operaciones en la nube.',
    workModes: {
      remote: 'Remoto',
      onsite: 'Presencial',
      hybrid: 'Híbrido'
    },
    achievementsLabel: 'Logros principales',
    projectsLabel: 'Proyectos',
    experiences: [
      {
        company: 'Roi Studio',
        position: 'Ingeniero Senior Backend / Platform Engineer (Contrato)',
        location: 'Guayaquil, Ecuador',
        workMode: 'remote',
        period: 'Noviembre 2023 – Presente',
        description:
          'Contrato internacional construyendo y operando sistemas en producción para localización IoT en tiempo real, SaaS de educación especial y productividad empresarial.',
        achievements: [
          'Implementé observabilidad end-to-end (métricas → alertas → dashboards) con Prometheus, Grafana y Alertmanager sobre microservicios en ECS',
          'Construí entornos sandbox por PR bajo demanda en EC2 con Docker y CI/CD en GitHub Actions',
          'Configuré Metabase desde cero en ECS con configuración automatizada y versionada, y políticas de backup y retención S3 → Glacier',
          'Implementé SSO con Azure AD + WorkOS para autenticación federada empresarial',
          'Operé una base MongoDB de alta escala (200k+ usuarios activos, 1 TB+ de datos), usando BigQuery para detectar y recuperar datos inconsistentes',
          'Desarrollé 3 Google Cloud Functions con Cloud Scheduler y gestioné infraestructura GCP con Terraform'
        ],
        projects: [
          {
            name: 'Plataforma de Rastreo 3D en Tiempo Real (ZLP)',
            period: 'Feb 2025 – Presente',
            description:
              'Inteligencia de ubicación IoT sobre AWS: microservicios NestJS, streaming con Kinesis, Terraform, observabilidad y unit tests de servicios de geofencing.'
          },
          {
            name: 'Plataforma SaaS de Educación Especial (IEP)',
            period: 'Jul 2025 – Dic 2025',
            description:
              'Desarrollo backend para una plataforma SaaS de educación especial.'
          },
          {
            name: 'Plataforma de Monitoreo y Productividad Empresarial',
            period: 'Nov 2023 – Feb 2025',
            description:
              'Mantenimiento de un ecosistema completo (web app, API, app móvil Flutter, backoffice y workers), cumpliendo 40+ puntos de historia por sprint y estabilizando el backlog de bugs.'
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
        position: 'Consultor Técnico Senior (Contrato)',
        location: 'Guayaquil, Ecuador',
        workMode: 'remote',
        period: 'Enero 2019 – Marzo 2026',
        description:
          'Plataforma de transcoding que recibe comerciales, los convierte a formatos específicos por canal con FFmpeg y los entrega a medios. Dedicación completa hasta mediados de 2021 y luego parcial.',
        achievements: [
          'Migré el pipeline de transcoding a funciones serverless en Go con procesamiento paralelo, logrando hasta 42x menos tiempo de conversión (60–80 min → 1m55s por lote de canales)',
          'Reduje 10x los costos de almacenamiento migrando a DigitalOcean Spaces',
          'Eliminé un servidor Windows operado manualmente y ajusté el tamaño de los servidores a la demanda',
          'Migré ~90% de la plataforma PHP legacy a NestJS + Prisma + MySQL con Screaming Architecture, testing unit/integration/e2e, CI/CD y Docker'
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
        position: 'Líder Técnico (Contrato)',
        location: 'Guayaquil, Ecuador',
        workMode: 'hybrid',
        period: 'Julio 2021 – Marzo 2024',
        description:
          'Crecí de desarrollador semi-senior a líder técnico, asumiendo decisiones de arquitectura en 4 proyectos concurrentes.',
        achievements: [
          'Lideré un equipo de 5 desarrolladores + 1 QA durante más de 1 año: sprints, mentoría y revisión de entregables',
          'Reduje 20% los tiempos de desarrollo mejorando procesos y comunicación del equipo',
          'Diseñé una arquitectura serverless con DynamoDB capaz de procesar más de 1M de registros por petición',
          'Aseguré la retención de un cliente clave liderando la resolución de errores críticos'
        ],
        projects: [
          {
            name: 'Senscloud',
            period: '2021 – 2024',
            description:
              'Liderazgo técnico del equipo y desarrollo de nuevas funcionalidades para clientes.'
          },
          {
            name: 'NextTrace',
            period: '2023',
            description:
              'Arquitectura serverless con DynamoDB para más de 1M de registros por petición.'
          },
          {
            name: 'Xtrim',
            period: 'Sep – Oct 2023',
            description:
              'Me incorporé en la etapa final, introduje Jira en reemplazo de Excel y optimicé consultas con índices.'
          },
          {
            name: 'Nextsign',
            period: '2024',
            description:
              'Liderazgo técnico en la resolución de errores críticos post-Fase 1.'
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
    title: 'Proyectos seleccionados',
    description:
      'Una selección de proyectos donde he trabajado en migraciones, automatización, optimización y evolución de sistemas backend.',
    CTA: '¿Necesitas apoyo en backend, automatización u optimización de sistemas?',
    viewProject: 'Ver proyecto',
    visibilityPublic: 'Público',
    visibilityPrivate: 'Privado',
    items: [
      {
        id: 'la-nube-tv-migration',
        title: 'Migración de plataforma La Nube TV',
        description:
          'Migración de ~90% de la plataforma PHP legacy de La Nube TV a NestJS, Prisma y MySQL con Screaming Architecture, testing unit/integration/e2e, CI/CD y Docker, con frontend en Vue 3 + Quasar.',
        projectUrl: 'https://app2.lanubetv.net/',
        technologies: ['NestJS', 'Prisma', 'MySQL', 'Vue 3', 'Quasar', 'Docker'],
        isPublic: false
      },
      {
        id: 'nextgen-timbres',
        title: 'Plataforma de timbres fiscales (NextGen)',
        description:
          'Un sistema serverless para la impresión de timbres fiscales, donde participé en la etapa inicial con Node.js, DynamoDB y servicios cloud.',
        projectUrl: 'https://app.nextrace.ec/login',
        technologies: ['Serverless', 'Node.js', 'DynamoDB'],
        isPublic: false
      },
      {
        id: 'nextgen-firma',
        title: 'Plataforma de firma electrónica (NextGen)',
        description:
          'Una plataforma de firma electrónica donde apoyé en mantenimiento, resolución de bugs y entrega de nuevas funcionalidades backend.',
        projectUrl: 'https://app.nextsign.ec/login',
        technologies: ['Node.js', 'Vue.js'],
        isPublic: false
      },
      {
        id: 'adaptcv',
        title: 'AdaptCV',
        description:
          'Plataforma web en producción para generar CVs profesionales con múltiples plantillas, soporte bilingüe (ES/EN) y traducción automática con IA. Desarrollada como monorepo full-stack (Turborepo) con CI/CD automatizado.',
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
        title: 'Analizador de precios inmobiliarios',
        description:
          'Herramienta de web scraping que recolecta datos de propiedades inmobiliarias y estima automáticamente el valor de mercado según las características del terreno, para evaluar si una propiedad tiene un precio aceptable de compra.',
        technologies: ['TypeScript', 'Playwright', 'Node.js', 'Firebase', 'Google Sheets API'],
        isPublic: false
      },
      {
        id: 'la-nube-tv',
        title: 'La Nube TV',
        description:
          'Un sitio web para una empresa de distribución de comerciales, que muestra información sobre la empresa y sus servicios. Originalmente hecho con Vue 2 y Vuetify, migrado a Vue 3 y Vuetify.',
        projectUrl: 'https://lanubetv.net/',
        technologies: ['Vue 3', 'Vuetify'],
        isPublic: false
      },
      {
        id: 'wedding-website',
        title: 'Sitio web de boda',
        description:
          'Un sitio web personal sencillo creado para mi boda, que muestra información sobre la fecha, el lugar y una galería de fotos. Utiliza Vue.js, Quasar y Firebase.',
        projectUrl: 'https://kenya-carlos-wedding.vercel.app/',
        technologies: ['Vue.js', 'Quasar', 'Firebase'],
        isPublic: false
      }
    ]
  }
} as TranslationKeys['profile']

const builder: TranslationKeys['builder'] = {
  title: 'Constructor',
  name: 'Nombre',
  status: 'Estado',
  description: 'Descripción',
  template: 'Plantilla',
  id: 'ID',
  sections: 'Secciones',
  selectTemplate: 'Selecciona una plantilla'
}

const baseEntity: TranslationKeys['baseEntity'] = {
  createdAt: 'Creado',
  updatedAt: 'Actualizado',
  createdBy: 'Creado por',
  updatedBy: 'Actualizado por',
  deletedAt: 'Eliminado'
}

const actions: TranslationKeys['actions'] = {
  add: 'Agregar',
  edit: 'Editar',
  delete: 'Eliminar',
  save: 'Guardar',
  cancel: 'Cancelar',
  submit: 'Enviar',
  options: 'Opciones',
  upload: 'Subir',
  uploadImage: 'Subir imagen',
  saveImage: 'Guardar imagen',
  back: 'Volver',
  next: 'Siguiente',
  previous: 'Anterior',
  continue: 'Continuar',
  finish: 'Finalizar',
  register: 'Registrar',
  signIn: 'Iniciar sesión',
  signOut: 'Cerrar sesión',
  forgotPassword: '¿Olvidé mi contraseña?',
  publish: 'Publicar',
  preview: 'Visualizar',
  settings: 'Configuraciones',
  signUp: 'Registrarse',
  print: 'Imprimir',
  download: 'Descargar',
  exportPdf: 'Exportar PDF',
  downloadPdf: 'Descargar PDF',
  exportCSV: 'Exportar CSV',
  translate: 'Traducir'
}

const generatePDF: TranslationKeys['generatePDF'] = {
  generatingPdfForTemplate: 'Generando PDF para la plantilla'
}

const footer: TranslationKeys['footer'] = {
  telegramTooltip: 'Contactar por Telegram',
  whatsappTooltip: 'Contactar por WhatsApp',
  emailTooltip: 'Enviar email',
  copyright: 'Todos los derechos reservados'
}

export default defineI18nLocale(async () => {
  return {
    home: {
      title: 'Ingeniero Senior Backend / Platform Engineer',
      description:
        'Más de 7 años como consultor independiente construyendo sistemas en producción para medios, IoT y productividad empresarial con Node.js, TypeScript y NestJS. Diseño infraestructura en AWS y GCP con Terraform, CI/CD y observabilidad, con resultados comprobados: costos reducidos 10x y mejoras de rendimiento de hasta 42x en producción.',
      viewProjects: 'Ver Proyectos',
      downloadCV: 'Descargar CV',
      skillsTitle: 'Habilidades Técnicas',
      timelineTitle: 'Experiencia Profesional',
      projectsTitle: 'Proyectos seleccionados',
      projectsDescription:
        'Una selección de proyectos donde he trabajado en migraciones, automatización, optimización y evolución de sistemas backend.',
      projectsCTA: '¿Necesitas apoyo en backend, automatización u optimización de sistemas?',
      contactMe: 'Contáctame'
    },
    generatePDF: generatePDF,
    website: {
      title: 'Carlos García | Ingeniero Senior Backend / Platform Engineer',
      description:
        'Portafolio profesional de Carlos García, Ingeniero Senior Backend / Platform Engineer especializado en Node.js, TypeScript, NestJS, infraestructura cloud (AWS, GCP), CI/CD y observabilidad.',
      keywords:
        'portafolio, ingeniero backend senior, platform engineer, node.js, typescript, nestjs, backend, automatización, infraestructura, observabilidad, ci/cd, terraform, aws, gcp, digitalocean, docker, postgresql, mongodb',
      welcome: 'Bienvenido a'
    },
    actions: actions,
    common: {
      home: 'Inicio',
      about: 'Acerca de',
      services: 'Servicios',
      contact: 'Contacto',
      testimonials: 'Testimonios',
      blog: 'Blog',
      portfolio: 'Portafolio',
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos de servicio',
      email: 'Correo electrónico',
      noData: 'No hay datos disponibles',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha de finalización',
      current: 'Presente'
    },
    login: {
      password: 'contraseña',
      email: 'correo electrónico',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      passwordPlaceholder: 'Ingresa tu contraseña',
      title: 'Iniciar sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      rememberMe: 'Recuérdame',
      signUp: 'Regístrate',
      signIn: 'Iniciar sesión',
      dontHaveAccount: '¿No tienes una cuenta?',
      signInWithGoogle: 'Iniciar sesión con Google',
      keepMeLoggedIn: 'Mantenerme conectado',
      loginAccount: 'Inicia sesión en tu cuenta',
      loginEnterDetails: 'Ingresa tus datos para iniciar sesión'
    },
    registration: {
      username: 'Nombre de usuario',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      signUp: 'Regístrate'
    },
    routes: {
      home: 'Inicio',
      builder: 'Constructor',
      preview: 'Vista previa',
      templates: 'Plantillas',
      settings: 'Configuraciones',
      profile: 'Perfil',
      dashboard: 'Tablero',
      logout: 'Cerrar sesión'
    },
    baseEntity: baseEntity,
    builder: builder,
    profile: profile,
    footer: footer
  } as TranslationKeys
})
