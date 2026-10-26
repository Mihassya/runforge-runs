import type { Run } from '../types/run'
import { mockRuns } from './mockRuns'

// Задержка, чтобы состояние загрузки было видно
const RESPONSE_DELAY_MS = 900

// Ошибку можно увидеть, открыв приложение с ?fail=1:
// первый запрос завершится ошибкой, а «Retry» загрузит данные.
let shouldFailNextRequest =
  new URLSearchParams(window.location.search).get('fail') === '1'

export function fetchRuns(signal?: AbortSignal): Promise<Run[]> {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      if (shouldFailNextRequest) {
        shouldFailNextRequest = false
        reject(new Error('The runs service is not responding.'))
        return
      }
      // Копия, чтобы компоненты не могли случайно изменить mock-данные
      resolve(structuredClone(mockRuns))
    }, RESPONSE_DELAY_MS)

    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timerId)
        reject(signal.reason)
      },
      { once: true },
    )
  })
}
