import { cn } from './cn'

/** Lab preview panels — use tokens so light/dark theme applies globally. */
export const labPanelClass = cn(
  'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]',
)

export const labSegmentedGroupClass = cn(
  'flex flex-wrap gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1',
)

export const labTableSurfaceClass = 'bg-[var(--color-surface)]'
