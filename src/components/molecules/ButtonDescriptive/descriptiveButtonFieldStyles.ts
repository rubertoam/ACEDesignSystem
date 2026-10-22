import { cn } from '../../../lib/cn'

/** Frozen appearance for documentation grids (no hover/active transitions). */
export type ButtonDescriptivePreviewState = 'default' | 'hover' | 'active' | 'disabled'

export const BUTTON_DESCRIPTIVE_PREVIEW_STATES: ButtonDescriptivePreviewState[] = [
  'default',
  'hover',
  'active',
  'disabled',
]

const shellBase = cn(
  'inline-flex w-[var(--button-descriptive-width)] items-start text-left',
  'gap-[var(--button-descriptive-gap)] rounded-[var(--button-descriptive-radius)]',
  'border border-solid p-[var(--button-descriptive-padding)]',
  'font-[family-name:var(--font-ace-noto)] outline-none',
  'focus-visible:ring-2 focus-visible:ring-[var(--button-descriptive-focus-ring)]',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)]',
)

const interactive = cn(
  shellBase,
  'cursor-pointer transition-colors',
  'border-[var(--button-descriptive-border)] bg-[var(--button-descriptive-bg)]',
  'text-[var(--button-descriptive-text)]',
  'hover:border-[var(--button-descriptive-hover-border)] hover:bg-[var(--button-descriptive-hover-bg)]',
  'active:border-[var(--button-descriptive-active-border)] active:bg-[var(--button-descriptive-active-bg)]',
  'disabled:cursor-not-allowed disabled:border-[var(--button-descriptive-disabled-border)]',
  'disabled:bg-[var(--button-descriptive-disabled-bg)] disabled:text-[var(--button-descriptive-disabled-text)]',
)

const locked: Record<ButtonDescriptivePreviewState, string> = {
  default: cn(
    shellBase,
    'border-[var(--button-descriptive-border)] bg-[var(--button-descriptive-bg)]',
    'text-[var(--button-descriptive-text)]',
  ),
  hover: cn(
    shellBase,
    'border-[var(--button-descriptive-hover-border)] bg-[var(--button-descriptive-hover-bg)]',
    'text-[var(--button-descriptive-text)]',
  ),
  active: cn(
    shellBase,
    'border-[var(--button-descriptive-active-border)] bg-[var(--button-descriptive-active-bg)]',
    'text-[var(--button-descriptive-text)]',
  ),
  disabled: cn(
    shellBase,
    'cursor-not-allowed border-[var(--button-descriptive-disabled-border)]',
    'bg-[var(--button-descriptive-disabled-bg)] text-[var(--button-descriptive-disabled-text)]',
  ),
}

export function buttonDescriptiveClass(
  previewState?: ButtonDescriptivePreviewState,
): string {
  return previewState ? locked[previewState] : interactive
}

export const buttonDescriptiveIconWrapClass = cn(
  'relative shrink-0 overflow-clip',
  'h-[var(--button-descriptive-icon-h)] w-[var(--button-descriptive-icon-w)]',
)

export const buttonDescriptiveIconClass = 'block size-full max-w-none'

export const buttonDescriptiveTextClass = cn(
  'flex min-w-0 flex-1 flex-col items-start justify-center',
  'gap-[var(--button-descriptive-text-gap)]',
)

export const buttonDescriptiveTitleClass = cn(
  'm-0 w-full [font:var(--ace-type-caption-bold)]',
  '[letter-spacing:var(--ace-type-caption-bold-tracking)]',
)

export const buttonDescriptiveDescriptionClass = cn(
  'm-0 w-full [font:var(--ace-type-footer-regular)]',
  '[letter-spacing:var(--ace-type-footer-regular-tracking)]',
)
