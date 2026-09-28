import en from '../../../locales/en-US'
import es from '../../../locales/es-ES'
import { buildHarvardCv } from '../../../utils/harvard-cv'

// The Vue side receives the locale files precompiled by @nuxtjs/i18n, so the
// CV page gets the Harvard model from here, built from the raw files.
const CV = { es, en } as const

export default defineEventHandler((event) => {
  const locale = getRouterParam(event, 'locale')
  if (locale !== 'es' && locale !== 'en') {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return buildHarvardCv(CV[locale])
})
