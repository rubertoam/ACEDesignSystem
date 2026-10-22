import { cn } from '../../../lib/cn'

/** Figma Sliders (2505:47) — 10px track, 4px pill handle (8px hover), 4px corner radius. */
export const sliderRootClass =
  'group/slider relative flex h-9 w-full touch-none select-none items-center outline-none'

export const sliderTrackClass = cn(
  'relative h-[var(--slider-track-height)] w-full grow overflow-visible rounded-[var(--slider-radius)]',
  'border-[0.5px] border-solid border-[var(--slider-track-border)] bg-[var(--slider-track-inactive)]',
  'group-data-[disabled]/slider:border-[var(--slider-track-border-disabled)] group-data-[disabled]/slider:bg-[var(--slider-track-inactive-disabled)]',
)

/** Tick row inset so end dots are not clipped by track corners (Figma pl/pr 4px). */
export const sliderTickRowClass =
  'pointer-events-none absolute inset-y-0 flex items-center justify-between'

export const sliderRangeClass = cn(
  'absolute h-full rounded-l-[var(--slider-radius)] bg-[var(--slider-range)]',
  'group-data-[disabled]/slider:bg-[var(--slider-range-disabled)]',
)

/** Outer thumb target — wider hit area for hover/tooltip (Figma handle is 4px inside). */
export const sliderThumbOuterClass = cn(
  'group/thumb relative flex h-[var(--slider-handle-height)] w-3 shrink-0 cursor-pointer items-center justify-center',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--slider-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--slider-ring-offset)]',
  'disabled:pointer-events-none',
)

/** Inner pill — default 4px, 8px on hover/focus. */
export const sliderThumbInnerClass = cn(
  'block h-full w-[var(--slider-handle-width)] rounded-full bg-[var(--slider-handle)] transition-[width] duration-200 ease-out',
  'group-hover/thumb:w-[var(--slider-handle-width-hover)] group-focus-visible/thumb:w-[var(--slider-handle-width-hover)]',
  'group-data-[disabled]/slider:bg-[var(--slider-handle-disabled)]',
)

export const sliderTooltipVisibleClass =
  'opacity-0 transition-opacity duration-150 group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100'

export const sliderCenteredRangeClass = cn(
  'pointer-events-none absolute top-0 h-full bg-[var(--slider-range)]',
  'group-data-[disabled]/slider:bg-[var(--slider-range-disabled)]',
)

export const sliderTickClass = {
  active: 'bg-[var(--slider-tick-on-range)]',
  inactive: 'bg-[var(--slider-tick-on-track)]',
} as const

export const sliderTooltipClass = cn(
  'pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-10 flex -translate-x-1/2 items-center justify-center',
  'size-[var(--slider-tooltip-size)] shrink-0 rounded-full bg-[var(--slider-tooltip-bg)]',
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[0.625rem] leading-none tracking-[0.0125rem] text-[var(--slider-tooltip-text)]',
)
