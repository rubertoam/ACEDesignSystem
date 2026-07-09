import { cn } from '../../../lib/cn'

const labelClass =
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]'

export const aceTooltipContentClass = cn(
  'z-50 w-fit max-w-[min(100vw-2rem,20rem)] text-balance rounded-[var(--ace-tooltip-radius)] border border-solid',
  'border-[var(--ace-tooltip-border)] bg-[var(--ace-tooltip-surface)] px-[var(--ace-tooltip-px)] py-[var(--ace-tooltip-py)]',
  'text-[var(--ace-tooltip-text)] shadow-[var(--ace-tooltip-shadow)]',
  labelClass,
)

/** Review Assigned screening toolbar — bordered surface, caption regular, xs shadow. */
export const aceScreeningToolbarTooltipContentClass = cn(
  'z-[300] w-fit max-w-[min(100vw-2rem,20rem)] text-balance rounded-[var(--radius-md)] border border-solid px-3 py-1.5',
  labelClass,
  'border-[var(--screening-border-strong)] bg-[var(--screening-surface)] text-[var(--screening-text-primary)] shadow-[var(--ace-drop-shadow-xs)]',
)

export const aceTooltipArrowClass =
  'fill-[var(--ace-tooltip-surface)] text-[var(--ace-tooltip-surface)]'
