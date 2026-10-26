import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  return <button type={type} className={classNames} {...props} />
}
