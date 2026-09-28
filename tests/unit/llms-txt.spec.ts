import { describe, expect, it } from 'vitest'

import { buildLlmsTxt } from '../../server/utils/llms-txt'
import { yearsOfExperience } from '../../utils/profile'

describe('llms.txt', () => {
  const text = buildLlmsTxt()

  it('follows the llms.txt layout: one H1, a summary quote and link sections', () => {
    expect(text.match(/^# /gm)).toHaveLength(1)
    expect(text).toMatch(/^> .+/m)
    expect(text).toContain('## Documents')
    expect(text).toMatch(/- \[Harvard CV, English \(PDF\)\]\(https:\/\/cagm-website\.vercel\.app\/cv\/carlos-garcia-cv-en\.pdf\)/)
  })

  it('includes the CV with filled-in years of experience', () => {
    expect(text).toContain(`${yearsOfExperience()}+ years`)
    expect(text).not.toContain('{years}')
    expect(text).toContain('### Professional Experience')
  })
})
