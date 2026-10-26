import { RunDetailsDrawer } from '../components/run-details/RunDetailsDrawer'
import { RunsList } from '../components/runs/RunsList'
import { RunsToolbar } from '../components/runs/RunsToolbar'
import { EmptyState } from '../components/states/EmptyState'
import { ErrorState } from '../components/states/ErrorState'
import { RunsSkeleton } from '../components/states/RunsSkeleton'
import { useRuns } from '../hooks/useRuns'
import { useRunsSearchParams } from '../hooks/useRunsSearchParams'
import { countRunsByStatus, filterRuns } from '../lib/filterRuns'
import { sortRuns } from '../lib/sortRuns'
import styles from './RunsPage.module.css'

export function RunsPage() {
  const { state, retry } = useRuns()
  const {
    status,
    query,
    sort,
    selectedRunId,
    setStatus,
    setQuery,
    setSort,
    resetFilters,
    getRunSearch,
    closeRun,
  } = useRunsSearchParams()

  const isLoaded = state.status === 'success'
  const allRuns = isLoaded ? state.runs : []
  // Счётчики на кнопках статусов учитывают поисковый запрос
  const statusCounts = countRunsByStatus(filterRuns(allRuns, { status: 'all', query }))
  const visibleRuns = sortRuns(filterRuns(allRuns, { status, query }), sort)
  const selectedRun = allRuns.find((run) => run.id === selectedRunId)

  function renderContent() {
    if (state.status === 'loading') {
      return <RunsSkeleton />
    }
    if (state.status === 'error') {
      return <ErrorState message={state.message} onRetry={retry} />
    }
    if (allRuns.length === 0) {
      return <EmptyState />
    }
    if (visibleRuns.length === 0) {
      return <EmptyState onReset={resetFilters} />
    }
    return <RunsList runs={visibleRuns} getRunSearch={getRunSearch} />
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Project / web-platform</p>
        <h1 className={styles.title}>Runs</h1>
        <p className={styles.description}>
          Every AI agent run across your repositories. Filter by status, search, and open
          a run to inspect its logs and result.
        </p>
      </header>

      <RunsToolbar
        query={query}
        status={status}
        sort={sort}
        statusCounts={isLoaded ? statusCounts : undefined}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onSortChange={setSort}
      />

      <section className={styles.panel} aria-labelledby="recent-runs-title">
        <div className={styles.panelHeader}>
          <h2 id="recent-runs-title" className={styles.panelTitle}>
            Recent runs
          </h2>
          {isLoaded && (
            <p className={styles.summary} aria-live="polite">
              Showing {visibleRuns.length} of {allRuns.length}
            </p>
          )}
        </div>
        {renderContent()}
      </section>

      <RunDetailsDrawer
        isOpen={isLoaded && selectedRunId !== null}
        runId={selectedRunId}
        run={selectedRun}
        onClose={closeRun}
      />
    </div>
  )
}
