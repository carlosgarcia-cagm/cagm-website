import en from '../../../locales/en-US'
import es from '../../../locales/es-ES'
import { buildHarvardCv } from '../../../utils/harvard-cv'
import { renderHarvardPdf, type HarvardFonts } from '../../utils/harvard-pdf'

// matches cvDownloadPath() in utils/profile.ts
const FILE_PATTERN = /^carlos-garcia-cv-(es|en)\.pdf$/
const CV = { es, en } as const

let fontsPromise: Promise<HarvardFonts> | undefined
// the CV only changes on deploy, so each instance renders each language once
const cache = new Map<'es' | 'en', Promise<Buffer>>()

function loadFonts(): Promise<HarvardFonts> {
  const storage = useStorage('assets:server')
  const read = async (name: string) => {
    const raw = await storage.getItemRaw(`fonts/Tinos-${name}.ttf`)
    if (!raw) throw new Error(`Missing font ${name}`)
    return Buffer.from(raw as Uint8Array)
  }
  return Promise.all([read('Regular'), read('Bold'), read('Italic'), read('BoldItalic')]).then(
    ([regular, bold, italic, boldItalic]) => ({ regular, bold, italic, boldItalic })
  )
}

function generate(locale: 'es' | 'en') {
  let pdf = cache.get(locale)
  if (!pdf) {
    fontsPromise ??= loadFonts()
    const cv = CV[locale]
    pdf = fontsPromise.then((fonts) =>
      renderHarvardPdf(buildHarvardCv(cv), fonts, {
        title: `${cv.cv.title} — Carlos García`,
        lang: locale === 'es' ? 'es-ES' : 'en-US'
      })
    )
    pdf.catch(() => cache.delete(locale))
    cache.set(locale, pdf)
  }
  return pdf
}

export default defineEventHandler(async (event) => {
  const match = FILE_PATTERN.exec(getRouterParam(event, 'file') ?? '')
  if (!match) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  const locale = match[1] as 'es' | 'en'
  const pdf = await generate(locale)

  setResponseHeaders(event, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="Carlos-Garcia-CV-${locale.toUpperCase()}.pdf"`,
    'Cache-Control': 'public, max-age=3600, s-maxage=86400'
  })
  return pdf
})
