import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from '../App'

/**
 * Отрисовывает приложение как в браузере, но с адресом в памяти вместо настоящего URL.
 * Возвращает user — «пользователя», который кликает и печатает как живой человек.
 */
export function renderApp(initialUrl = '/') {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <App />
    </MemoryRouter>,
  )
  return { user }
}

// Строки списка запусков (каждая строка — ссылка)
export function getRunRows() {
  const list = screen.getByRole('list', { name: 'Runs' })
  return within(list).getAllByRole('link')
}
