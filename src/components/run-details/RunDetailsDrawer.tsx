import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from 'react'
import type { Run } from '../../types/run'
import { Button } from '../ui/Button'
import { CloseIcon } from '../ui/icons'
import { RunLogs } from './RunLogs'
import { RunMeta } from './RunMeta'
import { RunResult } from './RunResult'
import styles from './RunDetailsDrawer.module.css'

type RunDetailsDrawerProps = {
  isOpen: boolean
  runId: string | null
  // undefined, если запуска с таким id нет (например, ссылка устарела)
  run?: Run
  onClose: () => void
}

/**
 * Drawer построен на нативном <dialog>: showModal() сам удерживает фокус внутри
 * и возвращает его на строку списка после закрытия.
 * Источник правды — параметр ?run= в URL: кнопки только меняют URL.
 */
export function RunDetailsDrawer({ isOpen, runId, run, onClose }: RunDetailsDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Открытие и закрытие управляются из URL (?run=...)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Esc: вместо нативного закрытия меняем URL, а эффект выше закроет диалог.
  // Если браузер не даёт отменить закрытие, сработает handleNativeClose.
  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    if (!event.nativeEvent.cancelable) return
    event.preventDefault()
    onClose()
  }

  // Диалог закрылся сам, а URL ещё указывает на запуск — синхронизируем URL
  function handleNativeClose() {
    if (isOpen) onClose()
  }

  // Клик по затемнённому фону попадает в сам <dialog>, а не в панель внутри него
  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.drawer}
      aria-labelledby="run-details-title"
      onCancel={handleCancel}
      onClose={handleNativeClose}
      onClick={handleDialogClick}
    >
      {isOpen && (
        <div className={styles.panel}>
          <header className={styles.header}>
            <div className={styles.heading}>
              <p className={styles.eyebrow}>Run details</p>
              <h2 id="run-details-title" className={styles.title}>
                {run ? run.name : 'Run not found'}
              </h2>
            </div>
            <Button variant="secondary" onClick={onClose}>
              <CloseIcon />
              Close
            </Button>
          </header>

          <div className={styles.body}>
            {run ? (
              <>
                <RunMeta run={run} />
                <RunResult run={run} />
                <RunLogs logs={run.logs} />
              </>
            ) : (
              <p className={styles.notFound}>
                There is no run with id <code>{runId}</code>. It may have been removed, or
                the link is incorrect.
              </p>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
