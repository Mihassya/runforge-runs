import { Link } from 'react-router'
import { RUN_LINK_STATE } from '../../hooks/useRunsSearchParams'
import { formatDateTime, formatDuration } from '../../lib/format'
import type { Run } from '../../types/run'
import { BranchIcon } from '../ui/icons'
import { RunStatusBadge } from './RunStatusBadge'
import styles from './RunListItem.module.css'

type RunListItemProps = {
  run: Run
  search: string
}

export function RunListItem({ run, search }: RunListItemProps) {
  const duration = formatDuration(run.durationSeconds)

  // Строка — ссылка: открывается с клавиатуры, а детали получают свой URL
  return (
    <Link to={{ search }} state={RUN_LINK_STATE} className={styles.row}>
      <span className={styles.run}>
        <span className={styles.name}>{run.name}</span>
        <span className={styles.id}>{run.id}</span>
      </span>

      <span className={styles.source}>
        <span className={styles.repository}>{run.repository}</span>
        <span className={styles.branch}>
          <BranchIcon width={12} height={12} />
          {run.branch}
        </span>
      </span>

      <span className={styles.status}>
        <RunStatusBadge status={run.status} />
      </span>

      <span className={styles.created}>
        <span className={styles.label}>Created </span>
        <time dateTime={run.createdAt}>{formatDateTime(run.createdAt)}</time>
      </span>

      <span className={styles.duration}>
        <span className={styles.label}>Duration </span>
        {duration ?? (
          <span className={styles.unknown}>
            <span aria-hidden="true">—</span>
            <span className="visually-hidden">not available yet</span>
          </span>
        )}
      </span>
    </Link>
  )
}
