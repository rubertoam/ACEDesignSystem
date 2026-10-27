import { cn } from '../../../lib/cn'

/** Review Assigned page header shell - sits under SiteHeader. */
export const pageHeaderShellClass = cn(
  'flex w-full shrink-0 items-center',
  'border border-solid border-[var(--page-header-border)]',
  'bg-[var(--page-header-bg)]',
  'px-[var(--page-header-px)] py-[var(--page-header-py)]',
)

export const pageHeaderLeadingClass = 'flex min-w-0 items-center gap-5'

export const pageHeaderTitleClass = cn(
  'm-0 text-[var(--color-text-primary)]',
  '[font:var(--ace-type-heading-h6-bold)]',
  '[letter-spacing:var(--ace-type-heading-h6-bold-tracking)]',
)
