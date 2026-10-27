import { describe, expect, it } from 'vitest'
import { formatDateTime, formatDuration } from './format'

describe('formatDuration', () => {
  it.each([
    [48, '48s'],
    [754, '12m 34s'],
    [4980, '1h 23m'],
  ])('formats %i seconds as "%s"', (seconds, expected) => {
    expect(formatDuration(seconds)).toBe(expected)
  })

  it('returns null when the duration is unknown', () => {
    expect(formatDuration(undefined)).toBeNull()
    expect(formatDuration(-5)).toBeNull()
  })
})

describe('formatDateTime', () => {
  it('formats a valid ISO date', () => {
    // Время зависит от часового пояса компьютера, поэтому проверяем только дату
    expect(formatDateTime('2026-10-15T12:00:00Z')).toContain('Oct 15, 2026')
  })

  it('does not crash on an invalid date', () => {
    expect(formatDateTime('not a date')).toBe('Unknown date')
  })
})
