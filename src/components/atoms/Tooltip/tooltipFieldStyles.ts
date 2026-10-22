import { cn } from '../../../lib/cn'

/** Caption Regular — Figma typography/ui/caption. */
const labelClass = cn(
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
)

/** Review Assigned / tw-animate-css enter-exit (same as FinScan ui/tooltip). */
export const tooltipMotionClass = cn(
  'animate-in fade-in-0 zoom-in-95',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  'origin-[var(--radix-tooltip-content-transform-origin)]',
)

export const tooltipContentClass = cn(
  'z-50 w-fit max-w-[min(100vw-2rem,20rem)] text-balance rounded-[var(--tooltip-radius)] border border-solid',
  'border-[var(--tooltip-border)] bg-[var(--tooltip-surface)] px-[var(--tooltip-px)] py-[var(--tooltip-py)]',
  'text-[var(--tooltip-text)] shadow-[var(--tooltip-shadow)]',
  labelClass,
  tooltipMotionClass,
)

/** Review Assigned screening toolbar — bordered surface, typography/ui/caption, xs shadow. */
export const aceScreeningToolbarTooltipContentClass = cn(
  'z-[300] w-fit max-w-[min(100vw-2rem,20rem)] text-balance rounded-[var(--radius-md)] border border-solid px-3 py-1.5',
  labelClass,
  'border-[var(--screening-border-strong)] bg-[var(--screening-surface)] text-[var(--color-text-primary)] shadow-[var(--ace-drop-shadow-xs)]',
  tooltipMotionClass,
)

export const tooltipArrowClass =
  'fill-[var(--tooltip-surface)] text-[var(--tooltip-surface)]'
