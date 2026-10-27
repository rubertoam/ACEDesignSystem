import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  taskBarActionsClass,
  taskBarLeadingClass,
  taskBarShellClass,
} from './taskBarFieldStyles'

export type TaskBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * Optional leading content (e.g. selection count, deselect control).
   * Renders immediately before the action cluster; both stay end-aligned.
   */
  leading?: ReactNode
  /** Trailing action cluster (typically `Button`s). */
  children?: ReactNode
  /** Accessible name for the bar. Default `Task bar`. */
  'aria-label'?: string
}

/**
 * Bottom action bar for app shells - Review Assigned task bar chrome.
 * Place under main content; pass actions as children.
 */
export function TaskBar({
  leading,
  children,
  className,
  'aria-label': ariaLabel = 'Task bar',
  ...rest
}: TaskBarProps) {
  return (
    <div
      {...rest}
      role="toolbar"
      aria-label={ariaLabel}
      className={cn(taskBarShellClass, className)}
    >
      {leading != null ? <div className={taskBarLeadingClass}>{leading}</div> : null}
      {children != null ? <div className={taskBarActionsClass}>{children}</div> : null}
    </div>
  )
}
