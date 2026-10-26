import type { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router'
import {
  FolderIcon,
  LayersIcon,
  MonitorIcon,
  PlayIcon,
  ServerIcon,
  SettingsIcon,
} from '../ui/icons'
import styles from './Sidebar.module.css'

type NavItem = {
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

// Разделы из макета; в тестовом реализована только страница Runs
const UPCOMING_SECTIONS: NavItem[] = [
  { label: 'Projects', icon: FolderIcon },
  { label: 'Devboxes', icon: ServerIcon },
  { label: 'Previews', icon: MonitorIcon },
  { label: 'Snapshots', icon: LayersIcon },
  { label: 'Settings', icon: SettingsIcon },
]

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          &gt;_
        </span>
        <span className={styles.brandText}>
          <span className={styles.brandName}>Runforge</span>
          <span className={styles.brandCaption}>control plane</span>
        </span>
      </div>

      <div className={styles.project}>
        <span className={styles.projectLabel}>Project</span>
        <span className={styles.projectName}>web-platform</span>
      </div>

      <nav className={styles.nav} aria-label="Workspace">
        <span className={styles.navLabel}>Workspace</span>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navItem} aria-current="page">
              <PlayIcon />
              Runs
            </Link>
          </li>
          {UPCOMING_SECTIONS.map(({ label, icon: SectionIcon }) => (
            <li key={label}>
              <span className={styles.navItemDisabled} aria-disabled="true">
                <SectionIcon />
                {label}
                <span className={styles.soon}>soon</span>
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
