import { describe, expect, it } from 'vitest'

import { MAX_ZOOM, MIN_ZOOM, fitZoom, stepZoom } from '../../utils/zoom'

describe('fitZoom', () => {
  it('shrinks the page to the available width', () => {
    expect(fitZoom(397, 794)).toBeCloseTo(0.5)
  })

  it('never enlarges beyond the real size', () => {
    expect(fitZoom(1200, 794)).toBe(1)
  })

  it('keeps a readable minimum and handles unmeasured sizes', () => {
    expect(fitZoom(50, 794)).toBe(MIN_ZOOM)
    expect(fitZoom(0, 794)).toBe(1)
  })
})

describe('stepZoom', () => {
  it('moves to the next step from an in-between fit value', () => {
    expect(stepZoom(0.48, 'in')).toBe(0.5)
    expect(stepZoom(0.48, 'out')).toBe(0.33)
  })

  it('moves between exact steps', () => {
    expect(stepZoom(1, 'in')).toBe(1.1)
    expect(stepZoom(1, 'out')).toBe(0.9)
  })

  it('stays within the limits', () => {
    expect(stepZoom(MAX_ZOOM, 'in')).toBe(MAX_ZOOM)
    expect(stepZoom(MIN_ZOOM, 'out')).toBe(MIN_ZOOM)
  })
})
