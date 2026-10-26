import { STATUS_DESCRIPTIONS, STATUS_LABELS } from '../../lib/runStatus'
import type { RunStatus } from '../../types/run'
import styles from './RunStatusBadge.module.css'

// Статус различается не только цветом: у бейджа всегда есть текстовая подпись
export function RunStatusBadge({ status }: { status: RunStatus }) {
  return (
    <span
      className={styles.badge}
      data-status={status}
      title={STATUS_DESCRIPTIONS[status]}
    >
      <span className={styles.dot} aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  )
}
