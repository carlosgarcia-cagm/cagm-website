import { describe, expect, it } from 'vitest'

import { formatCount, parseCount } from '../../utils/count'

describe('parseCount', () => {
  it.each([
    ['7+', { target: 7, suffix: '+' }],
    ['42x', { target: 42, suffix: 'x' }],
    ['6', { target: 6, suffix: '' }]
  ])('splits %s into number and suffix', (value, expected) => {
    expect(parseCount(value)).toEqual(expected)
  })

  it('leaves values without a leading number alone', () => {
    expect(parseCount('N/A')).toBeNull()
    expect(parseCount('1.5x')).toBeNull()
  })

  it('formats intermediate values with the suffix', () => {
    expect(formatCount(21, 'x')).toBe('21x')
  })
})
