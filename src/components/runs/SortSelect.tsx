import { SORT_OPTIONS, isSortOrder, type SortOrder } from '../../lib/sortRuns'
import styles from './SortSelect.module.css'

type SortSelectProps = {
  value: SortOrder
  onChange: (value: SortOrder) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className={styles.field}>
      <label htmlFor="runs-sort" className={styles.label}>
        Sort
      </label>
      <select
        id="runs-sort"
        className={styles.select}
        value={value}
        onChange={(event) => {
          if (isSortOrder(event.target.value)) {
            onChange(event.target.value)
          }
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
