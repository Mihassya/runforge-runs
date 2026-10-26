import { useEffect, useRef, useState } from 'react'
import { SearchIcon } from '../ui/icons'
import styles from './SearchInput.module.css'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Поле держит своё значение: React Router обновляет URL через transition,
  // и поле, привязанное к URL напрямую, сбрасывает курсор в конец строки.
  const [inputValue, setInputValue] = useState(value)
  const [previousValue, setPreviousValue] = useState(value)

  // Запрос в URL изменился снаружи (например, «Reset filters») — показываем его в поле
  if (value !== previousValue) {
    setPreviousValue(value)
    setInputValue(value)
  }

  // Клавиша «/» переводит фокус в поиск, как на GitHub
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key !== '/' ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        isTypingTarget(event.target)
      ) {
        return
      }
      event.preventDefault()
      inputRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={styles.field}>
      <label htmlFor="runs-search" className="visually-hidden">
        Search runs
      </label>
      <SearchIcon className={styles.icon} />
      <input
        ref={inputRef}
        id="runs-search"
        className={styles.input}
        type="search"
        placeholder="Search by name or repository"
        autoComplete="off"
        spellCheck={false}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
          onChange(event.target.value)
        }}
      />
      <kbd className={styles.hint} aria-hidden="true">
        /
      </kbd>
    </div>
  )
}
