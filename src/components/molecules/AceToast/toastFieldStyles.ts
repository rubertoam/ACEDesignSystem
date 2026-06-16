import { cn } from '../../../lib/cn'

export type AceToastTone = 'success' | 'info' | 'warning' | 'error'

export type AceToastLayout =
  | 'default'
  | 'action'
  | 'double-action'
  | 'multi-line'
  | 'multi-line-action'
  | 'multi-line-double-action'

const bodyClass =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--ace-toast-text)]'

export const aceToastShellClass = cn(
  'flex w-full max-w-[var(--ace-toast-width)] flex-col',
  'rounded-[var(--ace-toast-radius)] border border-solid border-[var(--ace-toast-border)]',
  'bg-[var(--ace-toast-bg)] px-[var(--ace-toast-px)] py-[var(--ace-toast-py)]',
  'shadow-[var(--ace-toast-shadow)]',
)

export const aceToastTopRowClass = 'flex w-full items-start justify-between gap-3'

export const aceToastMessageRowClass = cn(
  'flex min-w-0 flex-1 items-start gap-[var(--ace-toast-gap)]',
)

export const aceToastTitleClass = cn(
  bodyClass,
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]',
)

export const aceToastBodyClass = cn(bodyClass, 'm-0 min-w-0 leading-[1.65]')

export const aceToastIndentedBodyClass = cn(
  aceToastBodyClass,
  'pl-[var(--ace-toast-body-indent)]',
)

export const aceToastActionRowClass = 'flex w-full items-center justify-end'

export const aceToastDoubleActionRowClass = cn(
  aceToastActionRowClass,
  'gap-[var(--ace-toast-action-gap)]',
)

export const aceToastActionLinkClass = cn(
  bodyClass,
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'rounded-[var(--radius-sm)] text-[var(--ace-toast-action-text)]',
  'transition-colors hover:text-[var(--ace-toast-action-text-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceToastConfirmButtonClass = cn(
  bodyClass,
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'rounded-[var(--ace-toast-confirm-radius)] bg-[var(--ace-toast-confirm-bg)] px-[var(--ace-toast-confirm-px)] py-[var(--ace-toast-confirm-py)] text-[var(--ace-toast-confirm-text)]',
  'transition-colors hover:bg-[var(--ace-toast-confirm-bg-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceToastDismissButtonClass = cn(
  'inline-flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--ace-toast-dismiss-icon)]',
  'transition-colors hover:text-[var(--ace-toast-dismiss-icon-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceToastDismissIconClass = 'size-2 shrink-0'

export const aceToastIconShellClass: Record<AceToastTone, string> = {
  success: 'bg-[var(--ace-toast-icon-success)] text-[var(--ace-toast-icon-glyph)]',
  info: 'bg-[var(--ace-toast-icon-info)] text-[var(--ace-toast-icon-glyph)]',
  warning: 'bg-[var(--ace-toast-icon-warning)] text-[var(--ace-toast-icon-glyph)]',
  error: 'bg-[var(--ace-toast-icon-error)] text-[var(--ace-toast-icon-glyph)]',
}
