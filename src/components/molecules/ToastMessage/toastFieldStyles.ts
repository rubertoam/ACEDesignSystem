import { cn } from '../../../lib/cn'

export type ToastMessageTone = 'success' | 'info' | 'warning' | 'error'

export type ToastMessageLayout =
  | 'default'
  | 'action'
  | 'double-action'
  | 'multi-line'
  | 'multi-line-action'
  | 'multi-line-double-action'

const bodyClass =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--toast-message-text)]'

export const toastMessageShellClass = cn(
  'flex w-full max-w-[var(--toast-message-width)] flex-col',
  'rounded-[var(--toast-message-radius)] border border-solid border-[var(--toast-message-border)]',
  'bg-[var(--toast-message-bg)] px-[var(--toast-message-px)] py-[var(--toast-message-py)]',
  'shadow-[var(--toast-message-shadow)]',
)

export const toastMessageTopRowClass = 'flex w-full items-center justify-between gap-3'

export const toastMessageMessageRowClass = cn(
  'flex min-w-0 flex-1 items-center gap-[var(--toast-message-gap)]',
)

export const toastMessageTitleClass = cn(
  bodyClass,
  'm-0',
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]',
)

export const toastMessageBodyClass = cn(bodyClass, 'm-0 min-w-0 leading-[1.4]')

export const toastMessageIndentedBodyClass = cn(
  toastMessageBodyClass,
  'pl-[var(--toast-message-body-indent)]',
)

export const toastMessageActionRowClass = 'flex w-full items-center justify-end'

export const toastMessageDoubleActionRowClass = cn(
  toastMessageActionRowClass,
  'gap-[var(--toast-message-action-gap)]',
)

export const toastMessageActionLinkClass = cn(
  bodyClass,
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'rounded-[var(--radius-sm)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

/** Default (purple) action — success / info. Warning & error use tone-specific classes. */
export const toastMessageActionLinkToneClass: Record<ToastMessageTone, string> = {
  success:
    'text-[var(--toast-message-action-text)] transition-colors hover:text-[var(--toast-message-action-text-hover)]',
  info: 'text-[var(--toast-message-action-text)] transition-colors hover:text-[var(--toast-message-action-text-hover)]',
  warning:
    'text-[var(--toast-message-icon-warning)] transition-colors hover:text-[var(--ace-warning-600)]',
  error:
    'text-[var(--toast-message-icon-error)] transition-colors hover:text-[var(--dialog-modal-danger)]',
}

export const toastMessageConfirmButtonClass = cn(
  bodyClass,
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'rounded-[var(--toast-message-confirm-radius)] bg-[var(--toast-message-confirm-bg)] px-[var(--toast-message-confirm-px)] py-[var(--toast-message-confirm-py)] text-[var(--toast-message-confirm-text)]',
  'transition-colors hover:bg-[var(--toast-message-confirm-bg-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const toastMessageDismissButtonClass = cn(
  'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--toast-message-dismiss-icon)]',
  'transition-[background-color,box-shadow,color]',
  'duration-[var(--ace-motion-duration-medium)]',
  '[transition-timing-function:var(--ace-motion-ease-standard)]',
  'motion-reduce:transition-none motion-reduce:duration-0',
  /* Iconography “No border stroke” — toast sits on white; hover = surface-hover + 1px ring */
  'hover:bg-[var(--screening-surface-hover)] hover:shadow-[0_0_0_1px_var(--screening-border-strong)] hover:text-[var(--toast-message-dismiss-icon-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const toastMessageDismissIconClass = 'shrink-0 text-current'

export const toastMessageProgressTrackClass = cn(
  'h-[var(--toast-message-progress-height)] w-full shrink-0',
)

export const toastMessageProgressFillClass = cn(
  'h-full w-full origin-left',
  'motion-reduce:transition-none',
)

export const toastMessageProgressTrackToneClass: Record<ToastMessageTone, string> = {
  success: 'bg-[var(--ace-success-50)]',
  info: 'bg-[var(--ace-neutral-50)]',
  warning: 'bg-[var(--ace-warning-100)]',
  error: 'bg-[var(--ace-error-50)]',
}

export const toastMessageProgressFillToneClass: Record<ToastMessageTone, string> = {
  success: 'bg-[var(--ace-success-500)]',
  info: 'bg-[var(--button-purple-500)]',
  warning: 'bg-[var(--ace-warning-300)]',
  error: 'bg-[var(--toast-message-icon-error)]',
}

export const toastMessageIconShellClass: Record<ToastMessageTone, string> = {
  success: 'bg-[var(--toast-message-icon-success)] text-[var(--toast-message-icon-glyph)]',
  info: 'bg-[var(--toast-message-icon-info)] text-[var(--toast-message-icon-glyph)]',
  warning: 'bg-[var(--toast-message-icon-warning)] text-[var(--toast-message-icon-glyph)]',
  error: 'bg-[var(--toast-message-icon-error)] text-[var(--toast-message-icon-glyph)]',
}
