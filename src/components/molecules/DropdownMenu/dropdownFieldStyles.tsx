import { cn } from '../../../lib/cn'

/** Figma Dropdown chevron (8×5 filled) - Primary / Secondary triggers. */
export function AceDropdownChevron({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-[5px] w-2 shrink-0', className)}
      viewBox="0 0 8 5"
      fill="currentColor"
      aria-hidden
    >
      <path d="M0.94 0.53L4 3.583L7.06 0.53L8 1.47L4 5.47L0 1.47L0.94 0.53Z" />
    </svg>
  )
}

/**
 * Caption/Regular · typography/body/body-secondary (12).
 * Figma Dropdown / Primary “Dropdown Label” + field label above the control.
 */
export const aceDropdownTriggerType = cn(
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
)

export const aceDropdownFieldLabelClass = cn(
  aceDropdownTriggerType,
  'm-0 text-[var(--dropdown-menu-trigger-label)]',
)

/** Primary field trigger (default / open = LabelActive). */
export const aceDropdownFieldTriggerClass = cn(
  aceDropdownTriggerType,
  'inline-flex w-[var(--dropdown-menu-trigger-width)] max-w-[var(--dropdown-menu-trigger-width)] shrink-0 items-center justify-between gap-[var(--space-2)]',
  'rounded-[var(--dropdown-menu-trigger-radius)] border border-solid border-[var(--dropdown-menu-trigger-border)]',
  'bg-[var(--dropdown-menu-trigger-bg)] px-[var(--dropdown-menu-trigger-px)] py-[var(--dropdown-menu-trigger-py)]',
  'text-[var(--dropdown-menu-trigger-text)] outline-none transition-colors duration-150 ease-out',
  'hover:bg-[var(--dropdown-menu-trigger-active-bg)]',
  'focus-visible:border-[var(--dropdown-menu-trigger-active-border)] focus-visible:bg-[var(--dropdown-menu-trigger-active-bg)]',
  'focus-visible:shadow-[0_0_0_2px_var(--dropdown-menu-trigger-focus-ring)]',
  'data-[state=open]:border-[var(--dropdown-menu-trigger-active-border)] data-[state=open]:bg-[var(--dropdown-menu-trigger-active-bg)]',
  'disabled:pointer-events-none disabled:opacity-50',
)

export const aceDropdownFieldChevronClass = 'shrink-0 text-[var(--dropdown-menu-trigger-icon)]'
