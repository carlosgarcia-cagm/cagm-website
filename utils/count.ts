/** Splits a metric like "42x" or "7+" into the number to count up to and its suffix. */
export function parseCount(value: string): { target: number; suffix: string } | null {
  const match = /^(\d+)(\D*)$/.exec(value.trim())
  if (!match) return null
  return { target: Number(match[1]), suffix: match[2] ?? '' }
}

export function formatCount(current: number, suffix: string): string {
  return `${current}${suffix}`
}
