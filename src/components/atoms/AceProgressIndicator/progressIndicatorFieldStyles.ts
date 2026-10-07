import { cn } from '../../../lib/cn'

export type AceProgressIndicatorTone = 'brand' | 'surface'
export type AceProgressIndicatorType = 'no-action' | 'action'

export const aceProgressSpinnerClass = cn(
  'block h-[var(--ace-progress-spinner-height)] w-[var(--ace-progress-spinner-width)] shrink-0',
  'origin-center animate-[spin_var(--ace-progress-spinner-duration)_linear_infinite]',
)

export const aceProgressIndicatorShellClass = cn(
  'flex w-[var(--ace-progress-indicator-width)] max-w-full flex-col items-center justify-center overflow-hidden',
  'rounded-[var(--ace-progress-indicator-radius)]',
)

export const aceProgressIndicatorShellToneClass: Record<AceProgressIndicatorTone, string> = {
  brand: 'bg-[var(--ace-progress-indicator-bg-brand)]',
  surface:
    'border border-solid border-[var(--ace-progress-indicator-border)] bg-[var(--ace-progress-indicator-bg-surface)]',
}

export const aceProgressIndicatorShellTypeClass: Record<AceProgressIndicatorType, string> = {
  'no-action':
    'min-h-[var(--ace-progress-indicator-min-height)] gap-[var(--ace-progress-indicator-gap)]',
  action: 'gap-0 p-[var(--ace-progress-indicator-padding)]',
}

export const aceProgressIndicatorContentClass = cn(
  'flex w-full flex-col items-center justify-center',
  'gap-[var(--ace-progress-indicator-action-gap)]',
)

export const aceProgressIndicatorLabelClass = cn(
  'm-0 text-center font-[family-name:var(--font-screening)] text-sm font-bold leading-none',
)

export const aceProgressIndicatorLabelToneClass: Record<AceProgressIndicatorTone, string> = {
  brand: 'text-[var(--ace-progress-indicator-text-on-brand)]',
  surface: 'text-[var(--ace-progress-indicator-text-on-surface)]',
}

export const aceProgressSpinnerToneClass: Record<AceProgressIndicatorTone, string> = {
  brand: 'text-[var(--ace-progress-indicator-spinner-on-brand)]',
  surface: 'text-[var(--ace-progress-indicator-spinner-on-surface)]',
}
