import { describe, expect, it } from 'vitest'
import { testRuns } from '../test/fixtures'
import { sortRuns } from './sortRuns'

function ids(runs: { id: string }[]) {
  return runs.map((run) => run.id)
}

describe('sortRuns', () => {
  it('sorts by creation date, newest first', () => {
    expect(ids(sortRuns(testRuns, 'newest'))).toEqual([
      'run_3',
      'run_1',
      'run_2',
      'run_4',
      'run_5',
    ])
  })

  it('puts runs without a duration last when sorting by duration', () => {
    expect(ids(sortRuns(testRuns, 'longest'))).toEqual([
      'run_4',
      'run_2',
      'run_5',
      'run_3',
      'run_1',
    ])
    expect(ids(sortRuns(testRuns, 'shortest'))).toEqual([
      'run_5',
      'run_2',
      'run_4',
      'run_3',
      'run_1',
    ])
  })

  it('does not change the original array', () => {
    const original = ids(testRuns)
    sortRuns(testRuns, 'oldest')
    expect(ids(testRuns)).toEqual(original)
  })
})
