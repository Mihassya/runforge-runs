// Добавляет проверки для DOM: toBeInTheDocument(), toHaveAttribute() и другие
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// После каждого теста убираем отрисованные компоненты, чтобы тесты не влияли друг на друга
afterEach(() => {
  cleanup()
})

// jsdom не реализует методы <dialog>, поэтому добавляем упрощённые версии:
// открытие и закрытие меняют атрибут open, как в браузере
HTMLDialogElement.prototype.showModal = function showModal() {
  this.open = true
}

HTMLDialogElement.prototype.close = function close() {
  this.open = false
  this.dispatchEvent(new Event('close'))
}
