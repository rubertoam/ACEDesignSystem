import { cn } from '../../../lib/cn'

/** Matches Review Assigned CaseList Noto axes. */
export const scrollableListNotoVar = {
  fontVariationSettings: "'CTGR' 0, 'wdth' 100",
} as const

export const scrollableListShellClass = cn(
  'flex h-full min-h-0 flex-col overflow-hidden outline-none',
  'rounded-[var(--radius-sm)] border border-solid border-[var(--scrollable-list-border)]',
  'bg-[var(--scrollable-list-surface)] shadow-[var(--ace-drop-shadow-xs)]',
  'transition-[width] duration-200 ease-out',
)

export const scrollableListShellExpandedClass = 'w-64 max-w-full lg:w-72'
export const scrollableListShellMinimizedClass = 'w-10'

export const scrollableListHeaderClass =
  'flex shrink-0 items-center justify-between gap-2 px-3 pb-3 pt-5'

/** List title — Paragraph P1 Bold. */
export const scrollableListTitleClass = cn(
  'm-0 min-w-0 truncate',
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'text-[var(--scrollable-list-title)]',
)

export const scrollableListControlsClass =
  'flex shrink-0 flex-col gap-2.5 bg-[var(--scrollable-list-surface)] px-3 py-2.5'

export const scrollableListScrollClass = 'flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto'

export const scrollableListSectionHeaderClass = cn(
  'sticky top-0 z-30 flex w-full items-center gap-2 border-b border-solid',
  'border-[var(--scrollable-list-border)] bg-[var(--scrollable-list-surface)] px-4 py-2.5',
)

/** Section title — Caption SemiBold. */
export const scrollableListSectionTitleClass = cn(
  '[font:var(--ace-type-caption-semi-bold)] [letter-spacing:var(--ace-type-caption-semi-bold-tracking)]',
  'text-[var(--color-text-secondary)]',
)

export const scrollableListItemsClass = 'm-0 flex list-none flex-col p-0'

export const scrollableListItemClass = cn(
  'group relative w-full cursor-pointer border-0 px-4 pb-2.5 pt-1 text-left',
  'bg-transparent text-[var(--scrollable-list-item-text)]',
  'transition-colors duration-[var(--ace-motion-duration-fast)]',
  '[transition-timing-function:var(--ace-motion-ease-standard)]',
  'motion-reduce:transition-none',
  'hover:bg-[var(--scrollable-list-item-hover-bg)]',
  'focus-visible:outline-none',
)

export const scrollableListItemSelectedClass =
  'bg-[var(--scrollable-list-item-selected-bg)] hover:bg-[var(--scrollable-list-item-selected-bg)]'

export const scrollableListItemFocusRingClass =
  'pointer-events-none absolute inset-0 z-20 border-[0.5px] border-solid border-[var(--screening-primary)]'

/** Primary row label — Paragraph P1 Regular. */
export const scrollableListItemLabelClass = cn(
  'm-0 w-full truncate',
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]',
  'text-[var(--scrollable-list-item-text)]',
)

/** Secondary row line — Footer Regular. */
export const scrollableListItemDescriptionClass = cn(
  'm-0 w-full truncate',
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[var(--scrollable-list-item-text)]',
)

export const scrollableListMinimizedClass =
  'flex h-full min-h-0 flex-col items-center gap-3 px-1 pb-3 pt-3'

/** Minimized vertical title — Caption Bold. */
export const scrollableListMinimizedTitleClass = cn(
  'max-h-full truncate',
  '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]',
  'text-[var(--color-text-secondary)]',
)
