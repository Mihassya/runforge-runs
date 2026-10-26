import type { Run } from '../../types/run'
import { RunListItem } from './RunListItem'
import styles from './RunsList.module.css'

type RunsListProps = {
  runs: Run[]
  getRunSearch: (runId: string) => string
}

export function RunsList({ runs, getRunSearch }: RunsListProps) {
  return (
    <div className={styles.list}>
      {/* Заголовки колонок видны только в табличном режиме */}
      <div className={styles.head} aria-hidden="true">
        <span>Run</span>
        <span>Repository</span>
        <span>Status</span>
        <span>Created</span>
        <span className={styles.alignEnd}>Duration</span>
      </div>
      <ul className={styles.rows} aria-label="Runs">
        {runs.map((run) => (
          <li key={run.id}>
            <RunListItem run={run} search={getRunSearch(run.id)} />
          </li>
        ))}
      </ul>
    </div>
  )
}
