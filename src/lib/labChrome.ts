import { cn } from './cn'

/** Lab preview panels — use tokens so light/dark theme applies globally. */
export const labPanelClass = cn(
  'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]',
)

/** White organism preview shell — border stroke + XS drop shadow (Cards, Timeline, Attachments, etc.). */
export const labComponentContainerClass = cn(
  'flex w-full min-w-0 flex-col gap-[var(--ace-section-label-gap)] rounded-[var(--radius-lg)]',
  'border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)]',
  'p-4 shadow-[var(--ace-drop-shadow-xs)] sm:p-5',
)

export const labSegmentedGroupClass = cn(
  'flex flex-wrap gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1',
)

export const labTableSurfaceClass = 'bg-[var(--color-surface)]'
