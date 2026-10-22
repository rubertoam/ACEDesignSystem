import { cn } from '../../../lib/cn'

export type ProgressIndicatorTone = 'brand' | 'surface'
export type ProgressIndicatorType = 'no-action' | 'action'

export const progressSpinnerClass = cn(
  'block h-[var(--progress-spinner-height)] w-[var(--progress-spinner-width)] shrink-0',
  'origin-center animate-[spin_var(--progress-spinner-duration)_linear_infinite]',
)

export const progressIndicatorShellClass = cn(
  'flex w-[var(--progress-indicator-width)] max-w-full flex-col items-center justify-center overflow-hidden',
  'rounded-[var(--progress-indicator-radius)]',
)

export const progressIndicatorShellToneClass: Record<ProgressIndicatorTone, string> = {
  brand: 'bg-[var(--progress-indicator-bg-brand)]',
  surface:
    'border border-solid border-[var(--progress-indicator-border)] bg-[var(--progress-indicator-bg-surface)]',
}

export const progressIndicatorShellTypeClass: Record<ProgressIndicatorType, string> = {
  'no-action':
    'min-h-[var(--progress-indicator-min-height)] gap-[var(--progress-indicator-gap)]',
  action: 'gap-0 p-[var(--progress-indicator-padding)]',
}

export const progressIndicatorContentClass = cn(
  'flex w-full flex-col items-center justify-center',
  'gap-[var(--progress-indicator-action-gap)]',
)

export const progressIndicatorLabelClass = cn(
  'm-0 text-center',
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
)

export const progressIndicatorLabelToneClass: Record<ProgressIndicatorTone, string> = {
  brand: 'text-[var(--progress-indicator-text-on-brand)]',
  surface: 'text-[var(--progress-indicator-text-on-surface)]',
}

export const progressSpinnerToneClass: Record<ProgressIndicatorTone, string> = {
  brand: 'text-[var(--progress-indicator-spinner-on-brand)]',
  surface: 'text-[var(--progress-indicator-spinner-on-surface)]',
}
