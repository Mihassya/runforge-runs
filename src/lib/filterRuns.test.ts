import { describe, expect, it } from 'vitest'
import { testRuns } from '../test/fixtures'
import { countRunsByStatus, filterRuns } from './filterRuns'

function names(runs: { name: string }[]) {
  return runs.map((run) => run.name)
}

describe('filterRuns', () => {
  it('returns all runs for the "all" status and an empty query', () => {
    expect(filterRuns(testRuns, { status: 'all', query: '' })).toHaveLength(5)
  })

  it('combines the status filter with the search query', () => {
    const result = filterRuns(testRuns, { status: 'failed', query: 'web-platform' })
    expect(names(result)).toEqual(['Lint fixes'])
  })

  it('ignores case and surrounding spaces in the query', () => {
    const result = filterRuns(testRuns, { status: 'all', query: '  AUTH  ' })
    expect(names(result)).toEqual(['Auth refactor'])
  })
})

describe('countRunsByStatus', () => {
  it('counts runs for every status', () => {
    expect(countRunsByStatus(testRuns)).toEqual({
      all: 5,
      queued: 1,
      running: 1,
      succeeded: 1,
      failed: 2,
    })
  })
})
