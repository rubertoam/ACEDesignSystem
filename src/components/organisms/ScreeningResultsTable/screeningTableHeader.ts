import { cn } from '../../../lib/cn'

function aceTypography(token: string) {
  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`
}

/** Review Assigned `ExpandableFinScanTable` column header label. */
export const screeningTableHeaderLabelClass = cn(
  aceTypography('--ace-type-label-bold'),
  'inline-flex items-center leading-none uppercase tracking-wide',
  'text-[var(--screening-text-muted)] text-[length:var(--screening-table-header-font-size)]',
)

/** Sortable column header control — fills the header cell so label + icon share one vertical center. */
export const screeningTableHeaderSortButtonClass = cn(
  '-mx-[var(--space-1)] inline-flex h-full min-h-8 cursor-pointer items-center gap-1 rounded px-[var(--space-1)]',
  'text-[var(--screening-text-primary)] transition-colors duration-200 ease-out',
  'hover:bg-[var(--screening-surface-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

/** Material Symbol sort affordance — shared optical size for idle + active glyphs. */
export const screeningTableHeaderSortIconActiveClass = cn(
  'inline-flex size-3.5 shrink-0 items-center justify-center',
  '!text-[14px] leading-none text-[var(--screening-primary)]',
  'transition-colors duration-200 ease-out',
)

export const screeningTableHeaderSortIconIdleClass = cn(
  'inline-flex size-3.5 shrink-0 items-center justify-center',
  '!text-[14px] leading-none text-[var(--screening-icon-muted)]',
  'transition-colors duration-200 ease-out',
)

export const screeningTableHeaderRowClass = 'h-8'

export const screeningTableHeaderCellClass = 'h-8 px-[var(--space-3)] py-0 align-middle'
