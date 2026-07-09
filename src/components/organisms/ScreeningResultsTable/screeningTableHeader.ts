import { cn } from '../../../lib/cn'

function aceTypography(token: string) {
  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`
}

/** Review Assigned `ExpandableFinScanTable` column header label. */
export const screeningTableHeaderLabelClass = cn(
  aceTypography('--ace-type-label-bold'),
  'uppercase tracking-wide text-[var(--screening-text-muted)] text-[length:var(--screening-table-header-font-size)]',
)

/** Sortable column header control — matches prototype hover, focus, and icon colors. */
export const screeningTableHeaderSortButtonClass = cn(
  '-mx-[var(--space-1)] inline-flex cursor-pointer items-center gap-1.5 rounded px-[var(--space-1)] py-0.5',
  'text-[var(--screening-text-primary)] transition-colors duration-200 ease-out',
  'hover:bg-[var(--screening-surface-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const screeningTableHeaderSortIconActiveClass =
  'size-4 shrink-0 text-[var(--screening-primary)] transition-transform duration-200 ease-out'

export const screeningTableHeaderSortIconIdleClass =
  'size-4 shrink-0 text-[var(--screening-icon-muted)] transition-colors duration-200 ease-out'

export const screeningTableHeaderRowClass = 'h-8'

export const screeningTableHeaderCellClass = 'px-[var(--space-3)] py-[var(--space-1)] align-middle'
