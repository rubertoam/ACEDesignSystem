import { cn } from '../../../lib/cn'

export const stepperShellClass = cn(
  'inline-flex items-center rounded-[var(--radius-sm)]',
  'border border-solid border-[var(--screening-input-border)] bg-[var(--screening-surface)]',
)

export const stepperValueClass = cn(
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]',
  'min-w-[1.75rem] text-center tabular-nums text-[var(--screening-text-primary)]',
)

export const stepperButtonClass = cn(
  'inline-flex items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--screening-primary)] transition-colors',
  'hover:bg-[var(--screening-primary-soft-bg)]',
  'disabled:pointer-events-none disabled:opacity-40',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
)
