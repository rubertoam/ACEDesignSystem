import { cn } from '../../../lib/cn'

/** Review Assigned page header shell — sits under AceSiteHeader. */
export const acePageHeaderShellClass = cn(
  'flex w-full shrink-0 items-center',
  'border border-solid border-[var(--ace-page-header-border)]',
  'bg-[var(--ace-page-header-bg)]',
  'px-[var(--ace-page-header-px)] py-[var(--ace-page-header-py)]',
)

export const acePageHeaderLeadingClass = 'flex min-w-0 items-center gap-5'

export const acePageHeaderTitleClass = cn(
  'm-0 text-base text-[var(--ace-neutral-800)]',
  '[font:var(--ace-type-heading-h6-bold)]',
  '[letter-spacing:var(--ace-type-heading-h6-bold-tracking)]',
)
