import type { Run, RunStatus } from '../types/run'

export type StatusFilter = RunStatus | 'all'

type RunsFilters = {
  status: StatusFilter
  query: string
}

export function filterRuns(runs: Run[], { status, query }: RunsFilters): Run[] {
  const normalizedQuery = query.trim().toLowerCase()

  return runs.filter((run) => {
    if (status !== 'all' && run.status !== status) {
      return false
    }
    if (!normalizedQuery) {
      return true
    }
    return (
      run.name.toLowerCase().includes(normalizedQuery) ||
      run.repository.toLowerCase().includes(normalizedQuery)
    )
  })
}

export function countRunsByStatus(runs: Run[]): Record<StatusFilter, number> {
  const counts = { all: runs.length, queued: 0, running: 0, succeeded: 0, failed: 0 }
  for (const run of runs) {
    counts[run.status] += 1
  }
  return counts
}
