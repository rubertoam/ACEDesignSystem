import { cn } from '../../../lib/cn'

/** Figma Dropdown chevron (8×5 filled) — Primary / Secondary triggers. */
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

/** Caption/Regular — Figma Dropdown trigger + field label. */
export const aceDropdownTriggerType = cn(
  'font-normal [font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
)

export const aceDropdownFieldLabelClass = cn(
  aceDropdownTriggerType,
  'm-0 text-[var(--ace-dropdown-trigger-label)]',
)

/** Primary field trigger (default / open = LabelActive). */
export const aceDropdownFieldTriggerClass = cn(
  aceDropdownTriggerType,
  'inline-flex w-[var(--ace-dropdown-trigger-width)] max-w-[var(--ace-dropdown-trigger-width)] shrink-0 items-center justify-between gap-[var(--space-2)]',
  'rounded-[var(--ace-dropdown-trigger-radius)] border border-solid border-[var(--ace-dropdown-trigger-border)]',
  'bg-[var(--ace-dropdown-trigger-bg)] px-[var(--ace-dropdown-trigger-px)] py-[var(--ace-dropdown-trigger-py)]',
  'text-[var(--ace-dropdown-trigger-text)] outline-none transition-colors duration-150 ease-out',
  'hover:bg-[var(--ace-dropdown-trigger-active-bg)]',
  'focus-visible:border-[var(--ace-dropdown-trigger-active-border)] focus-visible:bg-[var(--ace-dropdown-trigger-active-bg)]',
  'focus-visible:shadow-[0_0_0_2px_var(--ace-dropdown-trigger-focus-ring)]',
  'data-[state=open]:border-[var(--ace-dropdown-trigger-active-border)] data-[state=open]:bg-[var(--ace-dropdown-trigger-active-bg)]',
  'disabled:pointer-events-none disabled:opacity-50',
)

export const aceDropdownFieldChevronClass = 'shrink-0 text-[var(--ace-dropdown-trigger-icon)]'
