import { cn } from '../../../lib/cn'

const labelClass =
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]'

/** Review Assigned / tw-animate-css enter-exit (same as FinScan ui/tooltip). */
export const aceTooltipMotionClass = cn(
  'animate-in fade-in-0 zoom-in-95',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  'origin-[var(--radix-tooltip-content-transform-origin)]',
)

export const aceTooltipContentClass = cn(
  'z-50 w-fit max-w-[min(100vw-2rem,20rem)] text-balance rounded-[var(--ace-tooltip-radius)] border border-solid',
  'border-[var(--ace-tooltip-border)] bg-[var(--ace-tooltip-surface)] px-[var(--ace-tooltip-px)] py-[var(--ace-tooltip-py)]',
  'text-[var(--ace-tooltip-text)] shadow-[var(--ace-tooltip-shadow)]',
  labelClass,
  aceTooltipMotionClass,
)

/** Review Assigned screening toolbar — bordered surface, caption regular, xs shadow. */
export const aceScreeningToolbarTooltipContentClass = cn(
  'z-[300] w-fit max-w-[min(100vw-2rem,20rem)] text-balance rounded-[var(--radius-md)] border border-solid px-3 py-1.5',
  labelClass,
  'border-[var(--screening-border-strong)] bg-[var(--screening-surface)] text-[var(--screening-text-primary)] shadow-[var(--ace-drop-shadow-xs)]',
  aceTooltipMotionClass,
)

export const aceTooltipArrowClass =
  'fill-[var(--ace-tooltip-surface)] text-[var(--ace-tooltip-surface)]'
