// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  css: ['@fontsource-variable/inter', '~/assets/css/main.css'],

  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/eslint'
  ],

  nitro: {
    prerender: {
      routes: ['/', '/es', '/cv', '/es/cv', '/llms.txt'],
      crawlLinks: false,
      failOnError: false
    }
  },
  icon: {
    // bundle the icons used so they render without calling the Iconify API
    serverBundle: false,
    clientBundle: {
      icons: [
        'heroicons:computer-desktop',
        'heroicons:circle-stack',
        'heroicons:server-stack',
        'heroicons:arrow-path',
        'heroicons:chart-bar',
        'heroicons:cog-6-tooth',
        'simple-icons:linkedin',
        'simple-icons:github',
        'simple-icons:whatsapp',
        'simple-icons:telegram',
        'material-symbols:mail-outline',
        'material-symbols:download',
        'material-symbols:menu',
        'material-symbols:close',
        'heroicons:map-pin',
        'heroicons:beaker',
        'heroicons:arrow-top-right-on-square',
        'heroicons:chevron-down',
        'heroicons:chat-bubble-left-right',
        'heroicons:paper-airplane',
        'heroicons:x-mark',
        'heroicons:document-text',
        'heroicons:arrow-left',
        'heroicons:printer',
        'heroicons:magnifying-glass-plus',
        'heroicons:magnifying-glass-minus',
        'heroicons:arrows-pointing-in',
        'heroicons:arrows-pointing-out',
        'heroicons:sun',
        'heroicons:moon'
      ]
    }
  },
  i18n: {
    baseUrl: 'https://cagm-website.vercel.app',
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en-US.ts' },
      { code: 'es', name: 'Español', language: 'es-ES', file: 'es-ES.ts' }
    ],
    // English at /, Spanish at /es; every visitor starts in English
    defaultLocale: 'en',
    langDir: 'locales/',
    restructureDir: './',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  },
  routeRules: {
    // English used to live under /en: keep old links working
    '/en': { redirect: { to: '/', statusCode: 301 } },
    '/en/**': { redirect: { to: '/**', statusCode: 301 } }
  }
})
