import type { ReactNode } from 'react'
import styles from './StateMessage.module.css'

type StateMessageProps = {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  tone?: 'neutral' | 'danger'
  role?: 'alert' | 'status'
}

// Общая разметка для пустого результата и ошибки
export function StateMessage({
  icon,
  title,
  description,
  action,
  tone = 'neutral',
  role = 'status',
}: StateMessageProps) {
  return (
    <div className={styles.message} data-tone={tone} role={role}>
      <span className={styles.icon}>{icon}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
