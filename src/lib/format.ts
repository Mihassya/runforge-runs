const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

// Дата показывается в часовом поясе пользователя
export function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return 'Unknown date'
  }
  return dateTimeFormatter.format(date)
}

// 48 → «48s», 754 → «12m 34s», 4980 → «1h 23m»; null, если длительность неизвестна
export function formatDuration(totalSeconds?: number): string | null {
  if (totalSeconds === undefined || !Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return null
  }

  const seconds = Math.round(totalSeconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const restSeconds = seconds % 60

  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${restSeconds}s`
  return `${restSeconds}s`
}
