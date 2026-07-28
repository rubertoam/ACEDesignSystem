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

export const aceToastTopRowClass = 'flex w-full items-center justify-between gap-3'

export const aceToastMessageRowClass = cn(
  'flex min-w-0 flex-1 items-center gap-[var(--ace-toast-gap)]',
)

export const aceToastTitleClass = cn(
  bodyClass,
  'm-0',
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]',
)

export const aceToastBodyClass = cn(bodyClass, 'm-0 min-w-0 leading-[1.4]')

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
  'rounded-[var(--radius-sm)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

/** Default (purple) action — success / info. Warning & error use tone-specific classes. */
export const aceToastActionLinkToneClass: Record<AceToastTone, string> = {
  success:
    'text-[var(--ace-toast-action-text)] transition-colors hover:text-[var(--ace-toast-action-text-hover)]',
  info: 'text-[var(--ace-toast-action-text)] transition-colors hover:text-[var(--ace-toast-action-text-hover)]',
  warning:
    'text-[var(--ace-toast-icon-warning)] transition-colors hover:text-[var(--ace-warning-600)]',
  error:
    'text-[var(--ace-toast-icon-error)] transition-colors hover:text-[var(--dialog-modal-danger)]',
}

export const aceToastConfirmButtonClass = cn(
  bodyClass,
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'rounded-[var(--ace-toast-confirm-radius)] bg-[var(--ace-toast-confirm-bg)] px-[var(--ace-toast-confirm-px)] py-[var(--ace-toast-confirm-py)] text-[var(--ace-toast-confirm-text)]',
  'transition-colors hover:bg-[var(--ace-toast-confirm-bg-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceToastDismissButtonClass = cn(
  'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--ace-toast-dismiss-icon)]',
  'transition-[background-color,box-shadow,color]',
  'duration-[var(--ace-motion-duration-medium)]',
  '[transition-timing-function:var(--ace-motion-ease-standard)]',
  'motion-reduce:transition-none motion-reduce:duration-0',
  /* Iconography “No border stroke” — toast sits on white; hover = surface-hover + 1px ring */
  'hover:bg-[var(--screening-surface-hover)] hover:shadow-[0_0_0_1px_var(--screening-border-strong)] hover:text-[var(--ace-toast-dismiss-icon-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceToastDismissIconClass = 'shrink-0 text-current'

export const aceToastProgressTrackClass = cn(
  'h-[var(--ace-toast-progress-height)] w-full shrink-0',
)

export const aceToastProgressFillClass = cn(
  'h-full w-full origin-left',
  'motion-reduce:transition-none',
)

export const aceToastProgressTrackToneClass: Record<AceToastTone, string> = {
  success: 'bg-[var(--ace-success-50)]',
  info: 'bg-[var(--ace-neutral-50)]',
  warning: 'bg-[var(--ace-warning-100)]',
  error: 'bg-[var(--ace-error-50)]',
}

export const aceToastProgressFillToneClass: Record<AceToastTone, string> = {
  success: 'bg-[var(--ace-success-500)]',
  info: 'bg-[var(--ace-button-purple-500)]',
  warning: 'bg-[var(--ace-warning-300)]',
  error: 'bg-[var(--ace-toast-icon-error)]',
}

export const aceToastIconShellClass: Record<AceToastTone, string> = {
  success: 'bg-[var(--ace-toast-icon-success)] text-[var(--ace-toast-icon-glyph)]',
  info: 'bg-[var(--ace-toast-icon-info)] text-[var(--ace-toast-icon-glyph)]',
  warning: 'bg-[var(--ace-toast-icon-warning)] text-[var(--ace-toast-icon-glyph)]',
  error: 'bg-[var(--ace-toast-icon-error)] text-[var(--ace-toast-icon-glyph)]',
}
