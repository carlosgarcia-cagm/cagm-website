import PDFDocument from 'pdfkit'

import type { HarvardContact, HarvardCv, HarvardEntry } from '../../utils/harvard-cv'

export interface HarvardFonts {
  regular: Buffer
  bold: Buffer
  italic: Buffer
  boldItalic: Buffer
}

interface RenderMeta {
  title: string
  lang: string
}

const BASE = {
  margin: 42,
  name: 20,
  headline: 10.5,
  contact: 9,
  section: 10.5,
  body: 10
} as const
const INK = '#000000'
const MUTED = '#333333'
const CONTACT_SEPARATOR = ' | '

/**
 * Renders the Harvard CV model as a text-based (selectable, ATS-friendly) PDF
 * at a readable size; long content continues on another page.
 */
export async function renderHarvardPdf(
  cv: HarvardCv,
  fonts: HarvardFonts,
  meta: RenderMeta
): Promise<Buffer> {
  return (await renderAtScale(cv, fonts, meta, 1)).pdf
}

function renderAtScale(
  cv: HarvardCv,
  fonts: HarvardFonts,
  meta: RenderMeta,
  scale: number
): Promise<{ pdf: Buffer; pages: number }> {
  const margin = BASE.margin * scale
  const size = {
    name: BASE.name * scale,
    headline: BASE.headline * scale,
    contact: BASE.contact * scale,
    section: BASE.section * scale,
    body: BASE.body * scale
  }
  const gap = (points: number) => points * scale

  const doc = new PDFDocument({
    size: 'A4',
    margin,
    // null skips pdfkit's built-in Helvetica, which it would read from disk
    font: null as unknown as string,
    lang: meta.lang,
    displayTitle: true,
    info: { Title: meta.title, Author: cv.name, Subject: cv.headline }
  })
  doc.registerFont('Serif', fonts.regular)
  doc.registerFont('Serif-Bold', fonts.bold)
  doc.registerFont('Serif-Italic', fonts.italic)
  doc.registerFont('Serif-BoldItalic', fonts.boldItalic)

  let pages = 1
  doc.on('pageAdded', () => pages++)

  const chunks: Buffer[] = []
  doc.on('data', (chunk: Buffer) => chunks.push(chunk))
  const finished = new Promise<{ pdf: Buffer; pages: number }>((resolve, reject) => {
    doc.on('end', () => resolve({ pdf: Buffer.concat(chunks), pages }))
    doc.on('error', reject)
  })

  const left = margin
  const width = doc.page.width - 2 * margin
  const ensureSpace = (height: number) => {
    if (doc.y + gap(height) > doc.page.height - margin) doc.addPage()
  }

  /**
   * Left and right aligned text on the same line. The left part is written
   * first so text extraction (ATS) reads "Company … Location" in order.
   */
  function row(
    leftText: string,
    rightText: string | undefined,
    leftFont: string,
    rightFont: string,
    fontSize: number
  ) {
    const y = doc.y
    doc.font(rightFont).fontSize(fontSize)
    const rightWidth = rightText ? doc.widthOfString(rightText) : 0

    doc.font(leftFont).fontSize(fontSize).fillColor(INK)
    doc.text(leftText, left, y, { width: width - rightWidth - (rightText ? gap(12) : 0) })
    const afterLeft = doc.y

    if (rightText) {
      doc.font(rightFont).fontSize(fontSize)
      doc.text(rightText, left + width - rightWidth, y, { lineBreak: false })
    }
    doc.x = left
    doc.y = afterLeft
  }

  /** Centered contact items, wrapped between items (never inside a link). */
  function contactLines(items: HarvardContact[]) {
    doc.font('Serif').fontSize(size.contact).fillColor(INK)
    const sepWidth = doc.widthOfString(CONTACT_SEPARATOR)

    const lines: HarvardContact[][] = [[]]
    let lineWidth = 0
    for (const item of items) {
      const itemWidth = doc.widthOfString(item.text)
      const current = lines.at(-1)!
      const extra = current.length ? sepWidth + itemWidth : itemWidth
      if (current.length && lineWidth + extra > width) {
        lines.push([item])
        lineWidth = itemWidth
      } else {
        current.push(item)
        lineWidth += extra
      }
    }

    for (const line of lines) {
      const lineText = line.map((item) => item.text).join(CONTACT_SEPARATOR)
      const y = doc.y
      let x = left + (width - doc.widthOfString(lineText)) / 2
      line.forEach((item, index) => {
        if (index) {
          doc.text(CONTACT_SEPARATOR, x, y, { lineBreak: false })
          x += sepWidth
        }
        const itemWidth = doc.widthOfString(item.text)
        doc.text(item.text, x, y, { lineBreak: false })
        if (item.href) doc.link(x, y, itemWidth, size.contact + 2, item.href)
        x += itemWidth
      })
      doc.x = left
      doc.y = y + size.contact + gap(3)
    }
  }

  function entry(item: HarvardEntry) {
    // keep an entry's heading together with its first lines
    ensureSpace(45)

    row(item.title, item.titleRight, 'Serif-Bold', 'Serif', size.body + 0.5)
    if (item.subtitle || item.subtitleRight) {
      row(item.subtitle ?? '', item.subtitleRight, 'Serif-Italic', 'Serif-Italic', size.body)
    }
    if (item.summary) {
      doc.font('Serif').fontSize(size.body).fillColor(MUTED)
      doc.text(item.summary, left, doc.y + gap(1), { width })
      doc.fillColor(INK)
    }
    for (const bullet of item.bullets) {
      const y = doc.y + gap(0.5)
      doc.font('Serif').fontSize(size.body)
      doc.text('•', left + gap(6), y, { lineBreak: false })
      doc.text(bullet, left + gap(16), y, { width: width - gap(16) })
    }
    doc.y += gap(4)
  }

  // Header: name, headline and contact, centered
  doc.font('Serif-Bold').fontSize(size.name).text(cv.name, left, margin, { width, align: 'center' })
  doc.font('Serif-Italic').fontSize(size.headline).text(cv.headline, { width, align: 'center' })
  doc.y += gap(3)
  contactLines(cv.contact)

  for (const section of cv.sections) {
    // a section title never stays alone at the bottom of a page
    ensureSpace(section.entries.length ? 80 : 50)
    doc.y += gap(6)
    doc.font('Serif-Bold').fontSize(size.section).fillColor(INK)
    doc.text(section.title.toUpperCase(), left, doc.y, { width, characterSpacing: 0.6 })
    const ruleY = doc.y + gap(0.5)
    doc.moveTo(left, ruleY).lineTo(left + width, ruleY).lineWidth(0.7).stroke(INK)
    doc.y = ruleY + gap(4)

    if (section.paragraph) {
      doc.font('Serif').fontSize(size.body).fillColor(INK)
      doc.text(section.paragraph, left, doc.y, { width })
    }

    for (const item of section.entries) entry(item)

    for (const line of section.lines) {
      doc.font('Serif-Bold').fontSize(size.body)
      doc.text(`${line.label}: `, left, doc.y, { width, continued: true })
      doc.font('Serif').text(line.text)
    }
  }

  doc.end()
  return finished
}
