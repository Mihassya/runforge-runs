import type { StatusFilter as StatusFilterValue } from '../../lib/filterRuns'
import type { SortOrder } from '../../lib/sortRuns'
import { SearchInput } from './SearchInput'
import { SortSelect } from './SortSelect'
import { StatusFilter } from './StatusFilter'
import styles from './RunsToolbar.module.css'

type RunsToolbarProps = {
  query: string
  status: StatusFilterValue
  sort: SortOrder
  statusCounts?: Record<StatusFilterValue, number>
  onQueryChange: (value: string) => void
  onStatusChange: (value: StatusFilterValue) => void
  onSortChange: (value: SortOrder) => void
}

export function RunsToolbar({
  query,
  status,
  sort,
  statusCounts,
  onQueryChange,
  onStatusChange,
  onSortChange,
}: RunsToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.row}>
        <SearchInput value={query} onChange={onQueryChange} />
        <SortSelect value={sort} onChange={onSortChange} />
      </div>
      <StatusFilter value={status} counts={statusCounts} onChange={onStatusChange} />
    </div>
  )
}
