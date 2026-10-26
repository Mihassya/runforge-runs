import styles from './RunLogs.module.css'

export function RunLogs({ logs }: { logs: string[] }) {
  return (
    <section className={styles.section} aria-labelledby="run-logs-title">
      <h3 id="run-logs-title" className={styles.title}>
        Logs <span className={styles.count}>{logs.length}</span>
      </h3>
      {logs.length > 0 ? (
        <ol className={styles.logs}>
          {logs.map((line, index) => (
            // Строки лога не меняются местами, поэтому индекс подходит как key
            <li key={index} className={styles.line}>
              {line}
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.empty}>No logs yet.</p>
      )}
    </section>
  )
}
