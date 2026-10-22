import { cn } from '../../../lib/cn'

export type InlineMessageTone = 'error' | 'success' | 'info' | 'warning'

export const INLINE_MESSAGE_TONES: InlineMessageTone[] = [
  'error',
  'success',
  'info',
  'warning',
]

/** Shell — Figma Inline Messages 4481:275 */
export const inlineMessageShellClass = cn(
  'flex w-full max-w-full items-center',
  'gap-[var(--inline-message-gap)] rounded-[var(--inline-message-radius)]',
  'border border-solid px-[var(--inline-message-px)] py-[var(--inline-message-py)]',
)

export const inlineMessageTextClass = cn(
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'min-w-0 text-[var(--inline-message-text)]',
)

export const inlineMessageToneClass: Record<InlineMessageTone, string> = {
  error: cn(
    'border-[var(--inline-message-error-border)] bg-[var(--inline-message-error-bg)]',
  ),
  success: cn(
    'border-[var(--inline-message-success-border)] bg-[var(--inline-message-success-bg)]',
  ),
  info: cn(
    'border-[var(--inline-message-info-border)] bg-[var(--inline-message-info-bg)]',
  ),
  warning: cn(
    'border-[var(--inline-message-warning-border)] bg-[var(--inline-message-warning-bg)]',
  ),
}

/** Same Material Symbols as toast / Iconography catalog (#16–19). */
export const inlineMessageIconName: Record<InlineMessageTone, string> = {
  error: 'error',
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
}

export const inlineMessageIconClass: Record<InlineMessageTone, string> = {
  error: 'text-[var(--inline-message-error-icon)]',
  success: 'text-[var(--inline-message-success-icon)]',
  info: 'text-[var(--inline-message-info-icon)]',
  warning: 'text-[var(--inline-message-warning-icon)]',
}

export function inlineMessageClass(tone: InlineMessageTone = 'info'): string {
  return cn(inlineMessageShellClass, inlineMessageToneClass[tone])
}
