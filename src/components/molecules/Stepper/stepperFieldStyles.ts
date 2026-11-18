import { cn } from '../../../lib/cn'

export const stepperShellClass = cn(
  'inline-flex items-center rounded-[var(--radius-sm)]',
  'border border-solid border-[var(--color-border-default)] bg-[var(--color-surface-primary)]',
)

export const stepperValueClass = cn(
  '[font:var(--type-body-semi-bold)] [letter-spacing:var(--type-body-semi-bold-tracking)]',
  'min-w-[1.75rem] text-center tabular-nums text-[var(--color-text-primary)]',
)

export const stepperButtonClass = cn(
  'inline-flex items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--color-action-primary)] transition-colors',
  'hover:bg-[var(--color-bg-brand-hover)]',
  'disabled:pointer-events-none disabled:opacity-40',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
)
