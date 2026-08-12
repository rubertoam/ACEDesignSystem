import { cn } from '../../../lib/cn'

/** Shared chrome — rounded corners and border (same pattern as AceTaskBar, without shadow). */
const aceSubHeaderChromeClass = cn(
  'rounded-[var(--ace-sub-header-radius)] border border-solid border-[var(--ace-sub-header-border)]',
)

/** Full-page sub-header shell. */
export const aceSubHeaderFullShellClass = cn(
  'flex w-full shrink-0 items-center justify-between',
  aceSubHeaderChromeClass,
  'bg-[var(--ace-sub-header-bg)]',
  'px-[var(--ace-sub-header-px)]',
  'min-h-[var(--ace-sub-header-height)]',
)

/** Split-screen sub-header shell. */
export const aceSubHeaderSplitShellClass = cn(
  'flex w-full shrink-0 items-center justify-between',
  aceSubHeaderChromeClass,
  'bg-[var(--ace-sub-header-bg)]',
  'px-[var(--ace-sub-header-px)] py-[var(--ace-sub-header-py)]',
  'h-[var(--ace-sub-header-height)]',
)

/** Extra start padding when drill-down back control is shown. */
export const aceSubHeaderDrilldownPaddingClass = 'pl-[var(--ace-sub-header-drilldown-pl)]'

export const aceSubHeaderHeadlineClass = cn(
  'm-0 whitespace-nowrap text-[var(--screening-text-primary)]',
  '[font:var(--ace-type-heading-h6-small-regular)]',
  '[letter-spacing:var(--ace-type-heading-h6-small-regular-tracking)]',
)

export const aceSubHeaderBackClass = cn(
  'inline-flex shrink-0 cursor-pointer items-center gap-3 border-0 bg-transparent p-0',
  'text-[var(--ace-sub-header-back)]',
  '[font:var(--ace-type-heading-h6-small-semi-bold)]',
  '[letter-spacing:var(--ace-type-heading-h6-small-semi-bold-tracking)]',
  'transition-opacity hover:opacity-80',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2',
)

export const aceSubHeaderStatClass = cn(
  'm-0 whitespace-nowrap text-[var(--screening-text-primary)]',
  '[font:var(--ace-type-heading-h6-small-regular)]',
  '[letter-spacing:var(--ace-type-heading-h6-small-regular-tracking)]',
)

export const aceSubHeaderStatSeparatorClass =
  'h-8 w-px shrink-0 bg-[var(--ace-sub-header-stat-separator)]'

export const aceSubHeaderPaginationLabelClass = cn(
  'm-0 whitespace-nowrap text-[var(--screening-text-primary)]',
  '[font:var(--ace-type-heading-h6-small-regular)]',
  '[letter-spacing:var(--ace-type-heading-h6-small-regular-tracking)]',
)

/** Transparent icon action — chrome-less sub-header icons. */
export const aceSubHeaderIconButtonClass = cn(
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0',
  'text-[var(--screening-text-primary)]',
  'transition-opacity hover:opacity-70',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-40',
)

export const aceSubHeaderPaginationNavClass = cn(
  aceSubHeaderIconButtonClass,
  'size-4 text-[var(--screening-text-primary)]',
)
