import { cn } from '../../../lib/cn'

/** Review Assigned task bar shell - surface, border, XS drop shadow. */
export const taskBarShellClass = cn(
  'flex shrink-0 items-center justify-end gap-4',
  'rounded-[var(--radius-sm)] border border-solid border-[var(--task-bar-border)]',
  'bg-[var(--task-bar-surface)] px-[var(--task-bar-px)] py-[var(--task-bar-py)]',
  'shadow-[var(--task-bar-shadow)]',
)

export const taskBarLeadingClass = 'flex min-w-0 items-center justify-end gap-3'

export const taskBarActionsClass = 'flex shrink-0 items-center gap-3'
