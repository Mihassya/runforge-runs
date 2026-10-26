import styles from './RunsSkeleton.module.css'

const SKELETON_ROWS = 6

export function RunsSkeleton() {
  return (
    <div className={styles.skeleton} role="status">
      <span className="visually-hidden">Loading runs…</span>
      <ul aria-hidden="true">
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <li key={index} className={styles.row}>
            <span className={styles.block}>
              <span className={styles.line} style={{ width: '70%' }} />
              <span className={styles.lineSmall} style={{ width: '40%' }} />
            </span>
            <span className={styles.block}>
              <span className={styles.line} style={{ width: '60%' }} />
              <span className={styles.lineSmall} style={{ width: '80%' }} />
            </span>
            <span className={styles.pill} />
            <span className={styles.line} style={{ width: '80%' }} />
          </li>
        ))}
      </ul>
    </div>
  )
}
