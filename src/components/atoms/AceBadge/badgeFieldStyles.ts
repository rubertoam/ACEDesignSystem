import { cn } from '../../../lib/cn'

export type AceBadgeVariant = 'active' | 'inactive' | 'dismissible'

const labelClass =
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]'

const shellClass = cn(
  'inline-flex w-fit max-w-full shrink-0 self-start items-center rounded-[var(--ace-badge-radius)]',
  'px-[var(--ace-badge-px)] py-[var(--ace-badge-py)]',
  labelClass,
  'leading-[1.65] whitespace-nowrap text-[var(--ace-badge-text)]',
)

export const aceBadgeVariantClass: Record<AceBadgeVariant, string> = {
  active: cn(shellClass, 'bg-[var(--ace-badge-active-bg)]'),
  inactive: cn(shellClass, 'bg-[var(--ace-badge-inactive-bg)] opacity-[var(--ace-badge-inactive-opacity)]'),
  dismissible: cn(shellClass, 'gap-[var(--ace-badge-gap)] bg-[var(--ace-badge-active-bg)]'),
}

export const aceBadgeDismissButtonClass = cn(
  'inline-flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--ace-badge-text)]',
  'transition-colors hover:bg-[var(--ace-badge-dismiss-hover-bg)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceBadgeDismissIconClass = 'size-2.5 shrink-0'
