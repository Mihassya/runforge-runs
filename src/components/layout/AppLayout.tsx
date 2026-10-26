import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import styles from './AppLayout.module.css'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
