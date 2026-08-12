import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceTaskBarActionsClass,
  aceTaskBarLeadingClass,
  aceTaskBarShellClass,
} from './taskBarFieldStyles'

export type AceTaskBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * Optional leading content (e.g. selection count, deselect control).
   * Renders on the start side; actions stay end-aligned.
   */
  leading?: ReactNode
  /** Trailing action cluster (typically `AceButton`s). */
  children?: ReactNode
  /** Accessible name for the bar. Default `Task bar`. */
  'aria-label'?: string
}

/**
 * Bottom action bar for app shells — Review Assigned task bar chrome.
 * Place under main content; pass actions as children.
 */
export function AceTaskBar({
  leading,
  children,
  className,
  'aria-label': ariaLabel = 'Task bar',
  ...rest
}: AceTaskBarProps) {
  return (
    <div
      {...rest}
      role="toolbar"
      aria-label={ariaLabel}
      className={cn(aceTaskBarShellClass, className)}
    >
      {leading != null ? <div className={aceTaskBarLeadingClass}>{leading}</div> : null}
      {children != null ? <div className={aceTaskBarActionsClass}>{children}</div> : null}
    </div>
  )
}
