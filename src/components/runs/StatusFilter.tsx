import type { StatusFilter as StatusFilterValue } from '../../lib/filterRuns'
import { RUN_STATUSES, STATUS_LABELS } from '../../lib/runStatus'
import styles from './StatusFilter.module.css'

const FILTER_OPTIONS: StatusFilterValue[] = ['all', ...RUN_STATUSES]

type StatusFilterProps = {
  value: StatusFilterValue
  // Количество запусков для каждого варианта; нет, пока данные загружаются
  counts?: Record<StatusFilterValue, number>
  onChange: (value: StatusFilterValue) => void
}

export function StatusFilter({ value, counts, onChange }: StatusFilterProps) {
  return (
    <div className={styles.group} role="group" aria-label="Filter by status">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.option}
          data-status={option}
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option !== 'all' && <span className={styles.dot} aria-hidden="true" />}
          {option === 'all' ? 'All' : STATUS_LABELS[option]}
          {counts && <span className={styles.count}>{counts[option]}</span>}
        </button>
      ))}
    </div>
  )
}
