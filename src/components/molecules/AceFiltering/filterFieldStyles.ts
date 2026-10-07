import { cn } from '../../../lib/cn'

/** Caption/Regular — Figma Secondary / FilterChip trigger text. */
const filterType = cn(
  'font-normal [font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
)

/** Default = surface; open / hover = brand fill + inverse text (Secondary Active / FilterChip Selected). */
export const aceFilterTriggerClass = cn(
  filterType,
  'inline-flex shrink-0 cursor-pointer items-center gap-[var(--ace-filter-gap)] rounded-[var(--ace-filter-radius)] px-[var(--ace-filter-px)] py-[var(--ace-filter-py)]',
  'border border-solid border-[var(--ace-filter-trigger-border)] bg-[var(--ace-filter-trigger-bg)] text-[var(--ace-filter-trigger-text)]',
  'outline-none transition-colors duration-150 ease-out',
  'hover:border-transparent hover:bg-[var(--ace-filter-trigger-active-bg)] hover:text-[var(--ace-filter-trigger-active-text)]',
  'data-[state=open]:border-transparent data-[state=open]:bg-[var(--ace-filter-trigger-active-bg)] data-[state=open]:text-[var(--ace-filter-trigger-active-text)]',
  'focus-visible:ring-2 focus-visible:ring-[var(--ace-dropdown-trigger-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)]',
  'disabled:pointer-events-none disabled:opacity-50',
)

/** Toggle chip — same shell as filter trigger; pressed = brand fill (no chevron / clear). */
export const aceFilterToggleChipClass = aceFilterTriggerClass

export const aceFilterToggleChipPressedClass = cn(
  'border-transparent bg-[var(--ace-filter-trigger-active-bg)] text-[var(--ace-filter-trigger-active-text)]',
  'hover:border-transparent hover:bg-[var(--ace-filter-trigger-active-bg)] hover:text-[var(--ace-filter-trigger-active-text)]',
)

/** Shade 0 resting; brand fill + inverse text/icons on hover / selected (FilterChip). */
export const aceFilterChipClass = cn(
  'group',
  filterType,
  'inline-flex max-w-full shrink-0 items-center gap-[var(--ace-filter-gap)] overflow-hidden rounded-[var(--ace-filter-radius)] px-[var(--ace-filter-px)] py-[var(--ace-filter-py)]',
  'border border-solid border-[var(--ace-filter-chip-border)] bg-[var(--ace-filter-chip-bg)] text-[var(--ace-filter-chip-text)]',
  'transition-colors duration-150 ease-out',
  'hover:border-transparent hover:bg-[var(--ace-filter-chip-selected-bg)] hover:text-[var(--ace-filter-chip-selected-text)]',
)

export const aceFilterChipLabelClass = 'min-w-0 truncate'

export const aceFilterChipOpenButtonClass = cn(
  'inline-flex min-w-0 cursor-pointer items-center gap-[var(--ace-filter-gap)] border-0 bg-transparent p-0 text-inherit outline-none',
  'focus-visible:rounded-[var(--radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--ace-dropdown-trigger-focus-ring)] focus-visible:ring-offset-1',
)

export const aceFilterChipClearButtonClass = cn(
  'inline-flex size-2.5 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none',
  'focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[var(--ace-dropdown-trigger-focus-ring)] focus-visible:ring-offset-1',
)

export const aceFilterChipChevronClass =
  'h-2.5 w-2 shrink-0 fill-[var(--ace-filter-chip-icon)] transition-colors duration-150 ease-out group-hover:fill-[var(--ace-filter-chip-selected-icon)]'

export const aceFilterChipClearIconClass =
  'size-2.5 shrink-0 fill-[var(--ace-filter-chip-clear)] transition-colors duration-150 ease-out group-hover:fill-[var(--ace-filter-chip-selected-icon)]'

export const aceFilterHeaderTitleClass = cn(
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'shrink-0 pr-[var(--ace-filter-gap)] py-[var(--ace-filter-py)] text-[var(--ace-filter-header-title)]',
)

export const aceFilterHeaderShellClass = 'flex w-full min-w-0 flex-col gap-[var(--ace-filter-gap)]'

export const aceFilterHeaderRowClass =
  'flex w-full min-w-0 flex-wrap items-center justify-between gap-x-[var(--ace-filter-header-gap)] gap-y-2'

export const aceFilterHeaderActionsClass =
  'flex min-w-0 flex-wrap items-center gap-[var(--ace-filter-header-gap)] py-[var(--ace-filter-gap)]'

export const aceFilterHeaderChipsClass =
  'flex min-w-0 flex-wrap items-start gap-[var(--ace-filter-header-gap)]'

export const aceFilterHeaderSearchClass =
  'w-[var(--ace-filter-search-width)] min-w-[min(100%,10rem)] max-w-full shrink-0'
