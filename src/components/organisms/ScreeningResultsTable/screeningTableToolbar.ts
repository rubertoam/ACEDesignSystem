import { cn } from '../../../lib/cn'

export const screeningToolbarIconButtonClass = cn(
  'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] text-[var(--screening-text-secondary)] transition-colors duration-200 ease-out',
  'hover:border-[var(--screening-chip-inactive-hover-border)] hover:bg-[var(--screening-surface-hover)] hover:text-[var(--screening-text-primary)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
  'disabled:cursor-not-allowed disabled:border-[var(--screening-border-strong)] disabled:bg-[var(--screening-surface-muted)] disabled:text-[var(--screening-icon-muted)] disabled:opacity-60',
)

/** Review Assigned screening table — “Filter by” label. */
export const screeningStatusFilterLabelClass = cn(
  'shrink-0 text-[14px] font-normal [font-family:var(--font-screening)] text-[var(--screening-text-primary)]',
)

/** Review Assigned screening table — status filter chip base. */
export const screeningStatusFilterChipClass = cn(
  'inline-flex w-fit shrink-0 cursor-pointer whitespace-nowrap rounded-[4px] border border-solid px-3.5 py-1.5 text-[13px] font-semibold [font-family:var(--font-screening)] transition-all duration-200 ease-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(82_62_185/0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const screeningStatusFilterChipActiveClass = cn(
  'border-[var(--screening-chip-active-border)] bg-[var(--screening-primary-soft-bg)] text-[var(--screening-chip-active-text)]',
  'hover:border-[var(--screening-primary-hover-border)] hover:bg-[var(--screening-primary-soft-bg-hover)]',
)

export const screeningStatusFilterChipInactiveClass = cn(
  'border-[var(--screening-chip-inactive-border)] bg-[var(--screening-chip-inactive-bg)] text-[var(--screening-text-primary)]',
  'hover:border-[var(--screening-chip-inactive-hover-border)] hover:bg-[var(--screening-chip-inactive-hover-bg)]',
)
