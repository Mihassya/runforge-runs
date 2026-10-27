import { screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchRuns } from '../api/runsApi'
import { testRuns } from '../test/fixtures'
import { getRunRows, renderApp } from '../test/renderApp'

// Подменяем mock-сервис: в тестах данные приходят сразу и из testRuns
vi.mock('../api/runsApi', () => ({ fetchRuns: vi.fn() }))

beforeEach(() => {
  vi.mocked(fetchRuns).mockReset()
  vi.mocked(fetchRuns).mockResolvedValue(testRuns)
})

describe('Runs page', () => {
  // Тесты из задания: фильтрация, поиск, открытие деталей

  it('filters runs by status', async () => {
    const { user } = renderApp()
    await screen.findByRole('list', { name: 'Runs' })
    expect(getRunRows()).toHaveLength(5)

    const failedFilter = screen.getByRole('button', { name: /^Failed/ })
    await user.click(failedFilter)

    expect(failedFilter).toHaveAttribute('aria-pressed', 'true')
    const rows = getRunRows()
    expect(rows).toHaveLength(2)
    for (const row of rows) {
      expect(within(row).getByText('Failed')).toBeInTheDocument()
    }
  })

  it('searches by run name or repository and works together with the status filter', async () => {
    const { user } = renderApp()
    await screen.findByRole('list', { name: 'Runs' })
    const search = screen.getByRole('searchbox', { name: 'Search runs' })

    // По репозиторию
    await user.type(search, 'api-service')
    expect(getRunRows()).toHaveLength(2)
    expect(screen.getByRole('link', { name: /Update dependencies/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Migrate orders API/ })).toBeInTheDocument()

    // По названию, без учёта регистра
    await user.clear(search)
    await user.type(search, 'CHECKOUT')
    expect(getRunRows()).toHaveLength(1)
    expect(screen.getByRole('link', { name: /Fix checkout tests/ })).toBeInTheDocument()

    // Поиск вместе с фильтром: web-platform + Failed
    await user.clear(search)
    await user.type(search, 'web-platform')
    await user.click(screen.getByRole('button', { name: /^Failed/ }))
    expect(getRunRows()).toHaveLength(1)
    expect(screen.getByRole('link', { name: /Lint fixes/ })).toBeInTheDocument()
  })

  it('opens run details with logs and result, then returns to the list', async () => {
    const { user } = renderApp()

    await user.click(await screen.findByRole('link', { name: /Migrate orders API/ }))

    const dialog = screen.getByRole('dialog', { name: 'Migrate orders API' })
    expect(within(dialog).getByText('Build failed: 3 type errors.')).toBeInTheDocument()
    expect(within(dialog).getByText('tsc --noEmit')).toBeInTheDocument()
    expect(within(dialog).getByText('feat/orders-v2')).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Close' }))

    expect(dialog).not.toHaveAttribute('open')
    expect(
      screen.queryByRole('heading', { name: 'Migrate orders API' }),
    ).not.toBeInTheDocument()
    expect(getRunRows()).toHaveLength(5)
  })

  // Дополнительные проверки состояний

  it('shows a loading state while runs are being fetched', () => {
    // Promise, который никогда не завершится: страница остаётся в загрузке
    vi.mocked(fetchRuns).mockReturnValue(new Promise(() => {}))
    renderApp()

    expect(screen.getByRole('status')).toHaveTextContent('Loading runs…')
  })

  it('shows an error with a retry button and loads runs after retry', async () => {
    vi.mocked(fetchRuns).mockRejectedValueOnce(new Error('Service is down.'))
    const { user } = renderApp()

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent("Couldn't load runs")
    expect(alert).toHaveTextContent('Service is down.')

    await user.click(within(alert).getByRole('button', { name: 'Retry' }))

    expect(await screen.findByRole('list', { name: 'Runs' })).toBeInTheDocument()
    expect(fetchRuns).toHaveBeenCalledTimes(2)
  })

  it('shows an empty state and resets the filters', async () => {
    const { user } = renderApp()
    await screen.findByRole('list', { name: 'Runs' })
    const search = screen.getByRole('searchbox', { name: 'Search runs' })

    await user.type(search, 'no such run')
    expect(screen.getByText('No runs match your filters')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Reset filters' }))

    expect(getRunRows()).toHaveLength(5)
    expect(search).toHaveValue('')
  })

  it('restores the status filter and the open run from the URL', async () => {
    renderApp('/?status=failed&run=run_2')

    const dialog = await screen.findByRole('dialog', { name: 'Fix checkout tests' })
    expect(dialog).toHaveAttribute('open')
    expect(screen.getByRole('button', { name: /^Failed/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
