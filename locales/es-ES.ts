export default {
  website: {
    title: 'Carlos García | Ingeniero Senior Backend / Platform Engineer',
    description:
      'Portafolio profesional de Carlos García, Ingeniero Senior Backend / Platform Engineer especializado en Node.js, TypeScript, NestJS, infraestructura cloud (AWS, GCP), CI/CD y observabilidad.',
    keywords:
      'portafolio, ingeniero backend senior, platform engineer, node.js, typescript, nestjs, backend, automatización, infraestructura, observabilidad, ci/cd, terraform, aws, gcp, digitalocean, docker, postgresql, mongodb'
  },
  nav: {
    skills: 'Habilidades',
    experience: 'Experiencia',
    projects: 'Proyectos',
    education: 'Educación',
    cv: 'CV',
    contact: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    switchLanguage: 'View in English',
    mainNavigation: 'Navegación principal',
    skipToContent: 'Saltar al contenido',
    toggleTheme: 'Cambiar modo oscuro'
  },
  home: {
    title: 'Ingeniero Senior Backend / Platform Engineer',
    description:
      'Más de {years} años como consultor independiente construyendo sistemas en producción para medios, IoT y productividad empresarial con Node.js, TypeScript y NestJS. Diseño infraestructura en AWS y GCP con Terraform, CI/CD y observabilidad, con resultados comprobados: costos reducidos 10x y mejoras de rendimiento de hasta 42x en producción.',
    viewProjects: 'Ver proyectos',
    contactMe: 'Contáctame',
    metrics: [
      { value: '{years}+', label: 'años de experiencia' },
      { value: '42x', label: 'conversión de video más rápida' },
      { value: '10x', label: 'menor costo de almacenamiento' },
      { value: '6', label: 'personas lideradas' }
    ]
  },
  skills: {
    title: 'Habilidades técnicas',
    legend: { primary: '3+ años', secondary: '1–3 años' },
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
        title: 'Bases de datos',
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
        title: 'Cloud e infraestructura',
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
        title: 'CI/CD y testing',
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
        title: 'Observabilidad y herramientas',
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
    title: 'Experiencia profesional',
    workModes: { remote: 'Remoto', onsite: 'Presencial', hybrid: 'Híbrido' },
    achievementsLabel: 'Logros principales',
    projectsLabel: 'Proyectos',
    experiences: [
      {
        company: 'Roi Studio',
        current: true,
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
          'Rediseñé los módulos centrales de un SaaS multi-tenant de educación especial (sesiones, facturación, IEP, autenticación OTP) con NestJS, Prisma y PostgreSQL, y contribuí a una cobertura de tests unitarios y e2e con Jest de ~76%',
          'Implementé SSO con Azure AD + WorkOS para autenticación federada empresarial',
          'Ejecuté operaciones críticas de datos en producción sobre una base MongoDB con más de 200k usuarios activos y 1 TB+ de datos: correcciones masivas, recuperación de información perdida desde BigQuery y eliminaciones seguras',
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
              'SaaS multi-tenant con NestJS + Prisma + PostgreSQL que reemplazó un sistema heredado sin tests. Rediseñé las sesiones terapéuticas con Strategy + Observer (~1.200 → ~400 LOC; un nuevo tipo de sesión en ~1 hora), la facturación por participante con 5 criterios de rateo, los IEP (mandatos, metas y periodos de autorización) como máquina de estados y la autenticación OTP segura (argon2, rate limiting, Redis).'
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
          'Desarrollé el sitio web corporativo (lanubetv.net) con Vue y Vuetify, y lo actualicé de Vue 2 a Vue 3'
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
    showMore: 'Ver más',
    showLess: 'Ver menos',
    visibilityPublic: 'Público',
    visibilityPrivate: 'Privado',
    items: [
      {
        id: 'nextgen-timbres',
        title: 'Plataforma de timbres fiscales (NextGen)',
        description:
          'Un sistema serverless para la impresión de timbres fiscales, donde participé en la etapa inicial con Node.js, DynamoDB y servicios cloud.',
        technologies: ['Serverless', 'Node.js', 'DynamoDB'],
        isPublic: false
      },
      {
        id: 'nextgen-firma',
        title: 'Plataforma de firma electrónica (NextGen)',
        description:
          'Una plataforma de firma electrónica donde apoyé en mantenimiento, resolución de bugs y entrega de nuevas funcionalidades backend.',
        technologies: ['Node.js', 'Vue.js'],
        isPublic: false
      },
      {
        id: 'adaptcv',
        personal: true,
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
        title: 'Analizador de precios inmobiliarios',
        description:
          'Herramienta de web scraping que recolecta datos de propiedades inmobiliarias y estima automáticamente el valor de mercado según las características del terreno, para evaluar si una propiedad tiene un precio aceptable de compra.',
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
          'Un sitio web para una empresa de distribución de comerciales, que muestra información sobre la empresa y sus servicios. Originalmente hecho con Vue 2 y Vuetify, migrado a Vue 3 y Vuetify.',
        projectUrl: 'https://lanubetv.net/',
        technologies: ['Vue 3', 'Vuetify'],
        isPublic: false
      }
    ]
  },
  education: {
    title: 'Educación',
    items: [
      {
        institution: 'ESPOL — Escuela Superior Politécnica del Litoral',
        degree: 'Ingeniería en Telecomunicaciones',
        note: 'No finalizada: pendiente 1 materia final y validación de tesis.'
      }
    ]
  },
  languages: {
    title: 'Idiomas',
    items: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'Intermedio (B2)' }
    ]
  },
  cv: {
    title: 'CV en formato Harvard',
    description:
      'CV de Carlos García en formato Harvard, listo para ver, imprimir o descargar en PDF.',
    view: 'Ver CV',
    download: 'Descargar PDF',
    print: 'Imprimir',
    back: 'Volver al sitio',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    zoomLevel: 'Nivel de zoom',
    fitWidth: 'Ajustar al ancho',
    actualSize: 'Tamaño original',
    summary: 'Resumen',
    experience: 'Experiencia',
    education: 'Educación',
    projects: 'Proyectos personales',
    skills: 'Habilidades técnicas e idiomas',
    technologies: 'Tecnologías'
  },
  chat: {
    open: 'Pregúntale a mi CV',
    title: 'Pregúntale a mi CV',
    close: 'Cerrar chat',
    disclaimer:
      'Asistente con IA que responde con la información de este CV. Las preguntas se procesan con DeepSeek. Puede cometer errores.',
    greeting:
      '¡Hola! Pregúntame sobre la experiencia, los proyectos o las habilidades de Carlos.',
    suggestions: [
      '¿Qué experiencia tiene con AWS?',
      '¿Cuál ha sido su mayor logro?',
      '¿Ha liderado equipos?'
    ],
    placeholder: 'Escribe tu pregunta…',
    send: 'Enviar',
    typing: 'Escribiendo…',
    errors: {
      rateLimited:
        'Has hecho muchas preguntas seguidas. Intenta de nuevo en unos minutos.',
      unavailable:
        'El asistente no está disponible ahora. Puedes escribirme por correo o LinkedIn.',
      generic: 'No pude responder. Intenta de nuevo.'
    }
  },
  footer: {
    telegram: 'Contactar por Telegram',
    whatsapp: 'Contactar por WhatsApp',
    email: 'Enviar un correo',
    linkedin: 'Perfil de LinkedIn',
    github: 'Perfil de GitHub',
    copyright: 'Todos los derechos reservados'
  }
} satisfies TranslationKeys
