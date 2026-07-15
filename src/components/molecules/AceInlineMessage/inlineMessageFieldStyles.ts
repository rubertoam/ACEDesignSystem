import { cn } from '../../../lib/cn'

export type AceInlineMessageTone = 'error' | 'success' | 'info' | 'warning'

export const ACE_INLINE_MESSAGE_TONES: AceInlineMessageTone[] = [
  'error',
  'success',
  'info',
  'warning',
]

/** Shell — Figma Inline Messages 4481:275 */
export const aceInlineMessageShellClass = cn(
  'flex w-full max-w-full items-center',
  'gap-[var(--ace-inline-message-gap)] rounded-[var(--ace-inline-message-radius)]',
  'border border-solid px-[var(--ace-inline-message-px)] py-[var(--ace-inline-message-py)]',
)

export const aceInlineMessageTextClass = cn(
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'min-w-0 text-[var(--ace-inline-message-text)]',
)

export const aceInlineMessageToneClass: Record<AceInlineMessageTone, string> = {
  error: cn(
    'border-[var(--ace-inline-message-error-border)] bg-[var(--ace-inline-message-error-bg)]',
  ),
  success: cn(
    'border-[var(--ace-inline-message-success-border)] bg-[var(--ace-inline-message-success-bg)]',
  ),
  info: cn(
    'border-[var(--ace-inline-message-info-border)] bg-[var(--ace-inline-message-info-bg)]',
  ),
  warning: cn(
    'border-[var(--ace-inline-message-warning-border)] bg-[var(--ace-inline-message-warning-bg)]',
  ),
}

/** Same Material Symbols as toast / Iconography catalog (#16–19). */
export const aceInlineMessageIconName: Record<AceInlineMessageTone, string> = {
  error: 'error',
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
}

export const aceInlineMessageIconClass: Record<AceInlineMessageTone, string> = {
  error: 'text-[var(--ace-inline-message-error-icon)]',
  success: 'text-[var(--ace-inline-message-success-icon)]',
  info: 'text-[var(--ace-inline-message-info-icon)]',
  warning: 'text-[var(--ace-inline-message-warning-icon)]',
}

export function aceInlineMessageClass(tone: AceInlineMessageTone = 'info'): string {
  return cn(aceInlineMessageShellClass, aceInlineMessageToneClass[tone])
}
