import { cn } from '../../../lib/cn'

/** Frozen appearance for documentation grids (no hover/active transitions). */
export type AceDescriptiveButtonPreviewState = 'default' | 'hover' | 'active' | 'disabled'

export const ACE_DESCRIPTIVE_BUTTON_PREVIEW_STATES: AceDescriptiveButtonPreviewState[] = [
  'default',
  'hover',
  'active',
  'disabled',
]

const shellBase = cn(
  'inline-flex w-[var(--ace-descriptive-button-width)] items-start text-left',
  'gap-[var(--ace-descriptive-button-gap)] rounded-[var(--ace-descriptive-button-radius)]',
  'border border-solid p-[var(--ace-descriptive-button-padding)]',
  'font-[family-name:var(--font-ace-noto)] outline-none',
  'focus-visible:ring-2 focus-visible:ring-[var(--ace-descriptive-button-focus-ring)]',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]',
)

const interactive = cn(
  shellBase,
  'cursor-pointer transition-colors',
  'border-[var(--ace-descriptive-button-border)] bg-[var(--ace-descriptive-button-bg)]',
  'text-[var(--ace-descriptive-button-text)]',
  'hover:border-[var(--ace-descriptive-button-hover-border)] hover:bg-[var(--ace-descriptive-button-hover-bg)]',
  'active:border-[var(--ace-descriptive-button-active-border)] active:bg-[var(--ace-descriptive-button-active-bg)]',
  'disabled:cursor-not-allowed disabled:border-[var(--ace-descriptive-button-disabled-border)]',
  'disabled:bg-[var(--ace-descriptive-button-disabled-bg)] disabled:text-[var(--ace-descriptive-button-disabled-text)]',
)

const locked: Record<AceDescriptiveButtonPreviewState, string> = {
  default: cn(
    shellBase,
    'border-[var(--ace-descriptive-button-border)] bg-[var(--ace-descriptive-button-bg)]',
    'text-[var(--ace-descriptive-button-text)]',
  ),
  hover: cn(
    shellBase,
    'border-[var(--ace-descriptive-button-hover-border)] bg-[var(--ace-descriptive-button-hover-bg)]',
    'text-[var(--ace-descriptive-button-text)]',
  ),
  active: cn(
    shellBase,
    'border-[var(--ace-descriptive-button-active-border)] bg-[var(--ace-descriptive-button-active-bg)]',
    'text-[var(--ace-descriptive-button-text)]',
  ),
  disabled: cn(
    shellBase,
    'cursor-not-allowed border-[var(--ace-descriptive-button-disabled-border)]',
    'bg-[var(--ace-descriptive-button-disabled-bg)] text-[var(--ace-descriptive-button-disabled-text)]',
  ),
}

export function aceDescriptiveButtonClass(
  previewState?: AceDescriptiveButtonPreviewState,
): string {
  return previewState ? locked[previewState] : interactive
}

export const aceDescriptiveButtonIconWrapClass = cn(
  'relative shrink-0 overflow-clip',
  'h-[var(--ace-descriptive-button-icon-h)] w-[var(--ace-descriptive-button-icon-w)]',
)

export const aceDescriptiveButtonIconClass = 'block size-full max-w-none'

export const aceDescriptiveButtonTextClass = cn(
  'flex min-w-0 flex-1 flex-col items-start justify-center',
  'gap-[var(--ace-descriptive-button-text-gap)] leading-[1.65]',
)

export const aceDescriptiveButtonTitleClass = cn(
  'm-0 w-full [font:var(--ace-type-caption-semi-bold)]',
  '[letter-spacing:var(--ace-type-caption-semi-bold-tracking)]',
)

export const aceDescriptiveButtonDescriptionClass = cn(
  'm-0 w-full [font:var(--ace-type-footer-regular)]',
  '[letter-spacing:var(--ace-type-footer-regular-tracking)]',
)
