import { formatDateTime, formatDuration } from '../../lib/format'
import { STATUS_DESCRIPTIONS } from '../../lib/runStatus'
import type { Run } from '../../types/run'
import { RunStatusBadge } from '../runs/RunStatusBadge'
import styles from './RunMeta.module.css'

function getDurationText(run: Run): string {
  const duration = formatDuration(run.durationSeconds)
  if (duration) return duration
  if (run.status === 'queued') return 'Not started yet'
  if (run.status === 'running') return 'Still running'
  return 'Unknown'
}

export function RunMeta({ run }: { run: Run }) {
  return (
    <dl className={styles.meta}>
      <div className={styles.item}>
        <dt>Status</dt>
        <dd className={styles.status}>
          <RunStatusBadge status={run.status} />
          <span className={styles.muted}>{STATUS_DESCRIPTIONS[run.status]}</span>
        </dd>
      </div>
      <div className={styles.item}>
        <dt>Run ID</dt>
        <dd className={styles.mono}>{run.id}</dd>
      </div>
      <div className={styles.item}>
        <dt>Repository</dt>
        <dd>{run.repository}</dd>
      </div>
      <div className={styles.item}>
        <dt>Branch</dt>
        <dd className={styles.mono}>{run.branch}</dd>
      </div>
      <div className={styles.item}>
        <dt>Created</dt>
        <dd>
          <time dateTime={run.createdAt}>{formatDateTime(run.createdAt)}</time>
        </dd>
      </div>
      <div className={styles.item}>
        <dt>Duration</dt>
        <dd>{getDurationText(run)}</dd>
      </div>
    </dl>
  )
}
