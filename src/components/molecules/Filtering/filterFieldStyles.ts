import { cn } from '../../../lib/cn'

/** Caption/Regular — Figma Secondary / FilterChip trigger text. */
const filterType = cn(
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
)

/** Default = surface; open / hover = brand fill + inverse text (Secondary Active / FilterChip Selected). */
export const filterTriggerClass = cn(
  filterType,
  'inline-flex shrink-0 cursor-pointer items-center gap-[var(--filter-gap)] rounded-[var(--filter-radius)] px-[var(--filter-px)] py-[var(--filter-py)]',
  'border border-solid border-[var(--filter-trigger-border)] bg-[var(--filter-trigger-bg)] text-[var(--filter-trigger-text)]',
  'outline-none transition-colors duration-150 ease-out',
  'hover:border-transparent hover:bg-[var(--filter-trigger-active-bg)] hover:text-[var(--filter-trigger-active-text)]',
  'data-[state=open]:border-transparent data-[state=open]:bg-[var(--filter-trigger-active-bg)] data-[state=open]:text-[var(--filter-trigger-active-text)]',
  'focus-visible:ring-2 focus-visible:ring-[var(--dropdown-menu-trigger-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)]',
  'disabled:pointer-events-none disabled:opacity-50',
)

/** Toggle chip — same shell as filter trigger; pressed = brand fill (no chevron / clear). */
export const filterToggleChipClass = filterTriggerClass

export const filterToggleChipPressedClass = cn(
  'border-transparent bg-[var(--filter-trigger-active-bg)] text-[var(--filter-trigger-active-text)]',
  'hover:border-transparent hover:bg-[var(--filter-trigger-active-bg)] hover:text-[var(--filter-trigger-active-text)]',
)

/** Shade 0 resting; brand fill + inverse text/icons on hover / selected (FilterChip). */
export const filterChipClass = cn(
  'group',
  filterType,
  'inline-flex max-w-full shrink-0 items-center gap-[var(--filter-gap)] overflow-hidden rounded-[var(--filter-radius)] px-[var(--filter-px)] py-[var(--filter-py)]',
  'border border-solid border-[var(--filter-chip-border)] bg-[var(--filter-chip-bg)] text-[var(--filter-chip-text)]',
  'transition-colors duration-150 ease-out',
  'hover:border-transparent hover:bg-[var(--filter-chip-selected-bg)] hover:text-[var(--filter-chip-selected-text)]',
)

export const filterChipLabelClass = 'min-w-0 truncate'

export const filterChipOpenButtonClass = cn(
  'inline-flex min-w-0 cursor-pointer items-center gap-[var(--filter-gap)] border-0 bg-transparent p-0 text-inherit outline-none',
  'focus-visible:rounded-[var(--radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--dropdown-menu-trigger-focus-ring)] focus-visible:ring-offset-1',
)

export const filterChipClearButtonClass = cn(
  'inline-flex size-2.5 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none',
  'focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[var(--dropdown-menu-trigger-focus-ring)] focus-visible:ring-offset-1',
)

export const filterChipChevronClass =
  'h-2.5 w-2 shrink-0 fill-[var(--filter-chip-icon)] transition-colors duration-150 ease-out group-hover:fill-[var(--filter-chip-selected-icon)]'

export const filterChipClearIconClass =
  'size-2.5 shrink-0 fill-[var(--filter-chip-clear)] transition-colors duration-150 ease-out group-hover:fill-[var(--filter-chip-selected-icon)]'

export const filterHeaderTitleClass = cn(
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'shrink-0 pr-[var(--filter-gap)] py-[var(--filter-py)] text-[var(--filter-header-title)]',
)

export const filterHeaderShellClass = 'flex w-full min-w-0 flex-col gap-[var(--filter-gap)]'

export const filterHeaderRowClass =
  'flex w-full min-w-0 flex-wrap items-center justify-between gap-x-[var(--filter-header-gap)] gap-y-2'

export const filterHeaderActionsClass =
  'flex min-w-0 flex-wrap items-center gap-[var(--filter-header-gap)] py-[var(--filter-gap)]'

export const filterHeaderChipsClass =
  'flex min-w-0 flex-wrap items-start gap-[var(--filter-header-gap)]'

export const filterHeaderSearchClass =
  'w-[var(--filter-search-width)] min-w-[min(100%,10rem)] max-w-full shrink-0'
