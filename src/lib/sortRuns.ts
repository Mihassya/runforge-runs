import type { Run } from '../types/run'

export type SortOrder = 'newest' | 'oldest' | 'longest' | 'shortest'

export const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'longest', label: 'Longest duration' },
  { value: 'shortest', label: 'Shortest duration' },
]

export function isSortOrder(value: string | null): value is SortOrder {
  return SORT_OPTIONS.some((option) => option.value === value)
}

function compareByDate(a: Run, b: Run): number {
  return Date.parse(b.createdAt) - Date.parse(a.createdAt)
}

export function sortRuns(runs: Run[], order: SortOrder): Run[] {
  const sorted = [...runs]

  if (order === 'newest') {
    return sorted.sort(compareByDate)
  }
  if (order === 'oldest') {
    return sorted.sort((a, b) => compareByDate(b, a))
  }

  // Запуски без длительности (в очереди или ещё идут) всегда в конце списка
  return sorted.sort((a, b) => {
    if (a.durationSeconds === undefined && b.durationSeconds === undefined) {
      return compareByDate(a, b)
    }
    if (a.durationSeconds === undefined) return 1
    if (b.durationSeconds === undefined) return -1

    return order === 'longest'
      ? b.durationSeconds - a.durationSeconds
      : a.durationSeconds - b.durationSeconds
  })
}
