import type { Run } from '../../types/run'
import styles from './RunResult.module.css'

// Текст на случай, когда результата нет
const MISSING_RESULT_TEXT: Record<Run['status'], string> = {
  queued: 'The run has not started yet.',
  running: 'The result will appear when the run finishes.',
  succeeded: 'This run finished without a result summary.',
  failed: 'This run failed without a result summary. Check the logs below.',
}

export function RunResult({ run }: { run: Run }) {
  return (
    <section className={styles.section} aria-labelledby="run-result-title">
      <h3 id="run-result-title" className={styles.title}>
        Result
      </h3>
      {run.result ? (
        <p className={styles.result} data-status={run.status}>
          {run.result}
        </p>
      ) : (
        <p className={styles.empty}>{MISSING_RESULT_TEXT[run.status]}</p>
      )}
    </section>
  )
}
