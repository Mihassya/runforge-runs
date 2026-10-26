import { useCallback, useEffect, useState } from 'react'
import { fetchRuns } from '../api/runsApi'
import type { Run } from '../types/run'

export type RunsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; runs: Run[] }

export function useRuns() {
  const [state, setState] = useState<RunsState>({ status: 'loading' })
  // Увеличивается при «Retry» и перезапускает эффект загрузки
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchRuns(controller.signal)
      .then((runs) => setState({ status: 'success', runs }))
      .catch((error: unknown) => {
        // Запрос отменён при размонтировании — это не ошибка
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error.',
        })
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }, [])

  return { state, retry }
}
