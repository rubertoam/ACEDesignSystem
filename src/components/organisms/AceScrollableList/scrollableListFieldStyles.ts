import { cn } from '../../../lib/cn'

/** Matches Review Assigned CaseList Noto axes. */
export const aceScrollableListNotoVar = {
  fontVariationSettings: "'CTGR' 0, 'wdth' 100",
} as const

export const aceScrollableListShellClass = cn(
  'flex h-full min-h-0 flex-col overflow-hidden outline-none',
  'rounded-[var(--radius-sm)] border border-solid border-[var(--ace-scrollable-list-border)]',
  'bg-[var(--ace-scrollable-list-surface)] shadow-[var(--ace-drop-shadow-xs)]',
  'transition-[width] duration-200 ease-out',
)

export const aceScrollableListShellExpandedClass = 'w-64 max-w-full lg:w-72'
export const aceScrollableListShellMinimizedClass = 'w-10'

export const aceScrollableListHeaderClass =
  'flex shrink-0 items-center justify-between gap-2 px-3 pb-3 pt-5'

/** List title — Noto Bold 14 / 1.65 (prototype CaseList header). */
export const aceScrollableListTitleClass = cn(
  'm-0 min-w-0 truncate font-[family-name:var(--font-ace-noto)] text-[14px] font-bold leading-[1.65]',
  'text-[var(--ace-scrollable-list-title)]',
)

export const aceScrollableListControlsClass =
  'flex shrink-0 flex-col gap-2.5 bg-[var(--ace-scrollable-list-surface)] px-3 py-2.5'

/** Filter / Sort field labels — Noto SemiBold 13 (prototype CaseList). */
export const aceScrollableListControlLabelClass = cn(
  'font-[family-name:var(--font-ace-noto)] text-[13px] font-semibold',
  'text-[var(--ace-scrollable-list-item-text)]',
)

export const aceScrollableListScrollClass = 'flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto'

export const aceScrollableListSectionHeaderClass = cn(
  'sticky top-0 z-30 flex w-full items-center gap-2 border-b border-solid',
  'border-[var(--ace-scrollable-list-border)] bg-[var(--ace-scrollable-list-surface)] px-4 py-2.5',
)

/** Section title — Noto SemiBold 13 / Neutral 600 (prototype CaseListSection). */
export const aceScrollableListSectionTitleClass = cn(
  'font-[family-name:var(--font-ace-noto)] text-[13px] font-semibold',
  'text-[var(--screening-text-secondary)]',
)

export const aceScrollableListItemsClass = 'm-0 flex list-none flex-col p-0'

export const aceScrollableListItemClass = cn(
  'group relative w-full cursor-pointer border-0 px-4 pb-2.5 pt-1 text-left',
  'bg-transparent text-[var(--ace-scrollable-list-item-text)]',
  'transition-colors duration-[var(--ace-motion-duration-fast)]',
  '[transition-timing-function:var(--ace-motion-ease-standard)]',
  'motion-reduce:transition-none',
  'hover:bg-[var(--ace-scrollable-list-item-hover-bg)]',
  'focus-visible:outline-none',
)

export const aceScrollableListItemSelectedClass =
  'bg-[var(--ace-scrollable-list-item-selected-bg)] hover:bg-[var(--ace-scrollable-list-item-selected-bg)]'

export const aceScrollableListItemFocusRingClass =
  'pointer-events-none absolute inset-0 z-20 border-[0.5px] border-solid border-[var(--screening-primary)]'

/** Primary row label — Noto Regular 14 / 1.65. */
export const aceScrollableListItemLabelClass = cn(
  'm-0 w-full truncate font-[family-name:var(--font-ace-noto)] text-[14px] font-normal leading-[1.65]',
  'text-[var(--ace-scrollable-list-item-text)]',
)

/** Secondary row line — Noto Regular 10 / 1.65 / 0.2px tracking (Footer). */
export const aceScrollableListItemDescriptionClass = cn(
  'm-0 w-full truncate font-[family-name:var(--font-ace-noto)] text-[10px] font-normal leading-[1.65] tracking-[0.2px]',
  'text-[var(--ace-scrollable-list-item-text)]',
)

export const aceScrollableListMinimizedClass =
  'flex h-full min-h-0 flex-col items-center gap-3 px-1 pb-3 pt-3'

/** Minimized vertical title — Noto Bold 12 / leading-none / 0.02em. */
export const aceScrollableListMinimizedTitleClass = cn(
  'max-h-full truncate font-[family-name:var(--font-ace-noto)] text-[12px] font-bold leading-none tracking-[0.02em]',
  'text-[var(--screening-text-secondary)]',
)
