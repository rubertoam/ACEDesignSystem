import { cn } from '../../../lib/cn'

/** Responsive sub-header shell - fills its parent width. */
export const subHeaderShellClass = cn(
  'flex w-full shrink-0 items-center justify-between',
  'rounded-[var(--sub-header-radius)] border border-solid border-[var(--sub-header-border)]',
  'bg-[var(--sub-header-bg)]',
  'px-[var(--sub-header-px)] py-[var(--sub-header-py)]',
  'min-h-[var(--sub-header-height)]',
)

/** @deprecated Use `subHeaderShellClass`. */
export const subHeaderFullShellClass = subHeaderShellClass

/** @deprecated Use `subHeaderShellClass`. */
export const subHeaderSplitShellClass = subHeaderShellClass

/** Extra start padding when drill-down back control is shown. */
export const subHeaderDrilldownPaddingClass = 'pl-[var(--sub-header-drilldown-pl)]'

export const subHeaderHeadlineClass = cn(
  'm-0 whitespace-nowrap text-[var(--screening-text-primary)]',
  '[font:var(--ace-type-heading-h6-small-regular)]',
  '[letter-spacing:var(--ace-type-heading-h6-small-regular-tracking)]',
)

export const subHeaderBackClass = cn(
  'inline-flex shrink-0 cursor-pointer items-center gap-3 border-0 bg-transparent p-0',
  'text-[var(--sub-header-back)]',
  '[font:var(--ace-type-heading-h6-small-semi-bold)]',
  '[letter-spacing:var(--ace-type-heading-h6-small-semi-bold-tracking)]',
  'transition-opacity hover:opacity-80',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2',
)

export const subHeaderStatClass = cn(
  'm-0 whitespace-nowrap text-[var(--screening-text-primary)]',
  '[font:var(--ace-type-heading-h6-small-regular)]',
  '[letter-spacing:var(--ace-type-heading-h6-small-regular-tracking)]',
)

export const subHeaderStatSeparatorClass =
  'h-8 w-px shrink-0 bg-[var(--sub-header-stat-separator)]'

export const subHeaderPaginationLabelClass = cn(
  'm-0 whitespace-nowrap text-[var(--screening-text-primary)]',
  '[font:var(--ace-type-heading-h6-small-regular)]',
  '[letter-spacing:var(--ace-type-heading-h6-small-regular-tracking)]',
)

/** Transparent icon action - chrome-less sub-header icons. */
export const subHeaderIconButtonClass = cn(
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0',
  'text-[var(--screening-text-primary)]',
  'transition-opacity hover:opacity-70',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-40',
)

export const subHeaderPaginationNavClass = cn(
  subHeaderIconButtonClass,
  'size-4 text-[var(--screening-text-primary)]',
)
