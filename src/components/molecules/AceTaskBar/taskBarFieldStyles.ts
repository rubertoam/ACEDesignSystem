import { cn } from '../../../lib/cn'

/** Review Assigned task bar shell — surface, border, XS drop shadow. */
export const aceTaskBarShellClass = cn(
  'flex shrink-0 items-center justify-end gap-4',
  'rounded-[var(--radius-sm)] border border-solid border-[var(--ace-task-bar-border)]',
  'bg-[var(--ace-task-bar-surface)] px-[var(--ace-task-bar-px)] py-[var(--ace-task-bar-py)]',
  'shadow-[var(--ace-task-bar-shadow)]',
)

export const aceTaskBarLeadingClass = 'me-auto flex min-w-0 items-center gap-3'

export const aceTaskBarActionsClass = 'flex shrink-0 items-center gap-3'
