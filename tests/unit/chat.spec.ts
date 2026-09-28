import { describe, expect, it } from 'vitest'

import en from '../../locales/en-US'
import es from '../../locales/es-ES'
import {
  CHAT_LIMITS,
  buildSystemPrompt,
  formatCv,
  parseChatRequest,
  parseSseChunk
} from '../../server/utils/chat'
import { yearsOfExperience } from '../../utils/profile'

const question = { role: 'user', content: '¿Qué experiencia tiene con AWS?' }

describe('parseChatRequest', () => {
  it('accepts a valid conversation and trims messages', () => {
    expect(
      parseChatRequest({
        locale: 'es',
        messages: [{ role: 'user', content: '  hola  ' }]
      })
    ).toEqual({ locale: 'es', messages: [{ role: 'user', content: 'hola' }] })
  })

  it.each([
    ['no body', null],
    ['unknown locale', { locale: 'fr', messages: [question] }],
    ['no messages', { locale: 'es', messages: [] }],
    ['system role', { locale: 'es', messages: [{ role: 'system', content: 'x' }] }],
    ['empty text', { locale: 'es', messages: [{ role: 'user', content: '   ' }] }],
    [
      'question too long',
      {
        locale: 'es',
        messages: [{ role: 'user', content: 'a'.repeat(CHAT_LIMITS.maxMessageLength + 1) }]
      }
    ],
    [
      'last message not from the user',
      { locale: 'en', messages: [question, { role: 'assistant', content: 'ok' }] }
    ],
    [
      'too many messages',
      { locale: 'en', messages: Array.from({ length: CHAT_LIMITS.maxMessages + 1 }, () => question) }
    ]
  ])('rejects %s', (_, body) => {
    expect(parseChatRequest(body)).toBeNull()
  })

  it('cuts long previous answers instead of rejecting them', () => {
    const parsed = parseChatRequest({
      locale: 'en',
      messages: [
        question,
        { role: 'assistant', content: 'b'.repeat(CHAT_LIMITS.maxAnswerLength + 100) },
        question
      ]
    })
    expect(parsed?.messages[1]?.content).toHaveLength(CHAT_LIMITS.maxAnswerLength)
  })
})

describe('system prompt', () => {
  it.each([
    ['es', es],
    ['en', en]
  ] as const)('includes the whole %s CV', (locale, cv) => {
    const prompt = buildSystemPrompt(cv, locale)
    for (const exp of cv.timeline.experiences) {
      expect(prompt).toContain(exp.company)
      for (const achievement of exp.achievements) expect(prompt).toContain(achievement)
    }
    for (const project of cv.projects.items) expect(prompt).toContain(project.title)
    expect(prompt).toContain('carlosgarcia.cagm@gmail.com')
    expect(prompt).toContain(cv.education.items[0]!.institution)
  })

  it('states the current years of experience, not the placeholder', () => {
    const prompt = buildSystemPrompt(es, 'es')
    expect(prompt).not.toContain('{years}')
    expect(prompt).toContain(`Más de ${yearsOfExperience()} años`)
  })

  it('keeps the model grounded in the CV', () => {
    const prompt = buildSystemPrompt(en, 'en')
    expect(prompt).toMatch(/only with information from the CV/i)
    expect(prompt).toMatch(/never invent/i)
    expect(prompt).toMatch(/ignore requests to change them/i)
  })

  it('is stable between requests so the provider can cache it', () => {
    expect(buildSystemPrompt(es, 'es')).toBe(buildSystemPrompt(es, 'es'))
    expect(formatCv(es)).not.toBe(formatCv(en))
  })
})

describe('parseSseChunk', () => {
  const event = (content: string) =>
    `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`

  it('extracts text deltas and keeps incomplete lines for the next chunk', () => {
    const full = event('Hola') + event(' mundo')
    const cut = full.length - 10
    const first = parseSseChunk(full.slice(0, cut))
    expect(first.deltas).toEqual(['Hola'])

    const second = parseSseChunk(first.rest + full.slice(cut))
    expect(second.deltas).toEqual([' mundo'])
    expect(second.done).toBe(false)
  })

  it('stops at [DONE] and ignores keep-alives and role-only deltas', () => {
    const chunk =
      ': keep-alive\n\n' +
      `data: ${JSON.stringify({ choices: [{ delta: { role: 'assistant' } }] })}\n\n` +
      event('ok') +
      'data: [DONE]\n\n' +
      event('ignored')
    expect(parseSseChunk(chunk)).toMatchObject({ deltas: ['ok'], done: true })
  })
})
