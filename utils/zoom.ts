/** Zoom levels offered by the document viewer's +/- buttons. */
export const ZOOM_STEPS = [0.25, 0.33, 0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2] as const

export const MIN_ZOOM = ZOOM_STEPS[0]
export const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1]

/**
 * Scale that makes a document of `documentWidth` fit `availableWidth`,
 * never enlarging it beyond its real size.
 */
export function fitZoom(availableWidth: number, documentWidth: number): number {
  if (availableWidth <= 0 || documentWidth <= 0) return 1
  return Math.min(1, Math.max(MIN_ZOOM, availableWidth / documentWidth))
}

/** Next zoom step from `current` (which may be an in-between fit value). */
export function stepZoom(current: number, direction: 'in' | 'out'): number {
  const epsilon = 0.001
  if (direction === 'in') {
    return ZOOM_STEPS.find((step) => step > current + epsilon) ?? MAX_ZOOM
  }
  return [...ZOOM_STEPS].reverse().find((step) => step < current - epsilon) ?? MIN_ZOOM
}
