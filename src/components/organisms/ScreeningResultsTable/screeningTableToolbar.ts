import { cn } from '../../../lib/cn'

/**
 * Iconography “Border stroke” (Figma Iconography · Border).
 * Rest: colors/icon/inverse + colors/border/default + colors/icon/primary.
 * Hover: same border; fill colors/icon/hover. Disabled: action/disabled-button + border/disabled-subtle.
 */
export const screeningToolbarIconButtonClass = cn(
  'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-solid',
  'border-[var(--icon-button-border)] bg-[var(--icon-button-surface)] text-[var(--icon-button-icon)]',
  'transition-colors duration-200 ease-out',
  'hover:border-[var(--icon-button-border)] hover:bg-[var(--icon-button-hover-bg)] hover:text-[var(--icon-button-icon)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
  'disabled:cursor-not-allowed disabled:border-[var(--icon-button-disabled-border)] disabled:bg-[var(--icon-button-disabled-bg)] disabled:text-[var(--icon-button-icon-disabled)] disabled:opacity-100',
)

/** Review Assigned row actions - same chrome as toolbar icons; visible on row hover / open / focus. */
export const screeningRowActionsMenuTriggerClass = cn(
  screeningToolbarIconButtonClass,
  'opacity-0 pointer-events-none group-hover/row:pointer-events-auto group-hover/row:opacity-100',
  'data-[state=open]:pointer-events-auto data-[state=open]:opacity-100',
  'data-[state=open]:border-[var(--icon-button-border)] data-[state=open]:bg-[var(--icon-button-hover-bg)] data-[state=open]:text-[var(--icon-button-icon)]',
  'focus-visible:pointer-events-auto focus-visible:opacity-100',
)

export const screeningRowActionsMenuIconClass = 'text-current'

/** Review Assigned screening table - “Filter by” label. */
export const screeningStatusFilterLabelClass = cn(
  'shrink-0',
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]',
  'text-[var(--color-text-primary)]',
)

/** Review Assigned screening table - status filter chip base. */
export const screeningStatusFilterChipClass = cn(
  'inline-flex w-fit shrink-0 cursor-pointer whitespace-nowrap rounded-[4px] border border-solid px-3.5 py-1.5 transition-all duration-200 ease-out',
  '[font:var(--ace-type-caption-semi-bold)] [letter-spacing:var(--ace-type-caption-semi-bold-tracking)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(82_62_185/0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const screeningStatusFilterChipActiveClass = cn(
  'border-[var(--screening-chip-active-border)] bg-[var(--screening-primary-soft-bg)] text-[var(--screening-chip-active-text)]',
  'hover:border-[var(--screening-primary-hover-border)] hover:bg-[var(--screening-primary-soft-bg-hover)]',
)

export const screeningStatusFilterChipInactiveClass = cn(
  'border-[var(--screening-chip-inactive-border)] bg-[var(--screening-chip-inactive-bg)] text-[var(--screening-text-primary)]',
  'hover:border-[var(--screening-chip-inactive-hover-border)] hover:bg-[var(--screening-chip-inactive-hover-bg)]',
)
