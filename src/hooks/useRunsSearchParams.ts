import { useLocation, useNavigate, useSearchParams } from 'react-router'
import type { StatusFilter } from '../lib/filterRuns'
import { isRunStatus } from '../lib/runStatus'
import { isSortOrder, type SortOrder } from '../lib/sortRuns'

// Помечает переход, открывший детали из списка, чтобы закрытие работало как «назад»
type RunLinkState = { openedFromList: true }

export const RUN_LINK_STATE: RunLinkState = { openedFromList: true }

/**
 * Фильтр, поиск, сортировка и открытый запуск хранятся в параметрах URL:
 * ?status=failed&q=auth&sort=oldest&run=run_29ad
 */
export function useRunsSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const statusParam = searchParams.get('status')
  const sortParam = searchParams.get('sort')

  const status: StatusFilter = isRunStatus(statusParam) ? statusParam : 'all'
  const query = searchParams.get('q') ?? ''
  const sort: SortOrder = isSortOrder(sortParam) ? sortParam : 'newest'
  const selectedRunId = searchParams.get('run')

  // Пустое значение удаляет параметр, чтобы URL оставался коротким.
  // replace: смена фильтра не создаёт новую запись в истории браузера.
  function updateParams(changes: Record<string, string | null>) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        for (const [key, value] of Object.entries(changes)) {
          if (value) {
            next.set(key, value)
          } else {
            next.delete(key)
          }
        }
        return next
      },
      { replace: true },
    )
  }

  function getRunSearch(runId: string): string {
    const next = new URLSearchParams(searchParams)
    next.set('run', runId)
    return `?${next.toString()}`
  }

  function closeRun() {
    const state = location.state as RunLinkState | null
    if (state?.openedFromList) {
      // Детали открыты из списка: возвращаемся на запись истории со списком
      navigate(-1)
    } else {
      // Детали открыты по прямой ссылке: истории для возврата нет
      updateParams({ run: null })
    }
  }

  return {
    status,
    query,
    sort,
    selectedRunId,
    setStatus: (value: StatusFilter) =>
      updateParams({ status: value === 'all' ? null : value }),
    setQuery: (value: string) => updateParams({ q: value }),
    setSort: (value: SortOrder) =>
      updateParams({ sort: value === 'newest' ? null : value }),
    resetFilters: () => updateParams({ status: null, q: null }),
    getRunSearch,
    closeRun,
  }
}
