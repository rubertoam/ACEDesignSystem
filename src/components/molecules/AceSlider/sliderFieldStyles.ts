import { cn } from '../../../lib/cn'

/** Figma Sliders (2505:47) — 10px track, 4px pill handle (8px hover), 4px corner radius. */
export const aceSliderRootClass =
  'group/slider relative flex h-9 w-full touch-none select-none items-center outline-none'

export const aceSliderTrackClass = cn(
  'relative h-[var(--ace-slider-track-height)] w-full grow overflow-visible rounded-[var(--ace-slider-radius)]',
  'border-[0.5px] border-solid border-[var(--ace-slider-track-border)] bg-[var(--ace-slider-track-inactive)]',
  'group-data-[disabled]/slider:border-[var(--ace-slider-track-border-disabled)] group-data-[disabled]/slider:bg-[var(--ace-slider-track-inactive-disabled)]',
)

/** Tick row inset so end dots are not clipped by track corners (Figma pl/pr 4px). */
export const aceSliderTickRowClass =
  'pointer-events-none absolute inset-y-0 flex items-center justify-between'

export const aceSliderRangeClass = cn(
  'absolute h-full rounded-l-[var(--ace-slider-radius)] bg-[var(--ace-slider-range)]',
  'group-data-[disabled]/slider:bg-[var(--ace-slider-range-disabled)]',
)

/** Outer thumb target — wider hit area for hover/tooltip (Figma handle is 4px inside). */
export const aceSliderThumbOuterClass = cn(
  'group/thumb relative flex h-[var(--ace-slider-handle-height)] w-3 shrink-0 cursor-pointer items-center justify-center',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ace-slider-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ace-slider-ring-offset)]',
  'disabled:pointer-events-none',
)

/** Inner pill — default 4px, 8px on hover/focus. */
export const aceSliderThumbInnerClass = cn(
  'block h-full w-[var(--ace-slider-handle-width)] rounded-full bg-[var(--ace-slider-handle)] transition-[width] duration-200 ease-out',
  'group-hover/thumb:w-[var(--ace-slider-handle-width-hover)] group-focus-visible/thumb:w-[var(--ace-slider-handle-width-hover)]',
  'group-data-[disabled]/slider:bg-[var(--ace-slider-handle-disabled)]',
)

export const aceSliderTooltipVisibleClass =
  'opacity-0 transition-opacity duration-150 group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100'

export const aceSliderCenteredRangeClass = cn(
  'pointer-events-none absolute top-0 h-full bg-[var(--ace-slider-range)]',
  'group-data-[disabled]/slider:bg-[var(--ace-slider-range-disabled)]',
)

export const aceSliderTickClass = {
  active: 'bg-[var(--ace-slider-tick-on-range)]',
  inactive: 'bg-[var(--ace-slider-tick-on-track)]',
} as const

export const aceSliderTooltipClass = cn(
  'pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-10 flex -translate-x-1/2 items-center justify-center',
  'size-[var(--ace-slider-tooltip-size)] shrink-0 rounded-full bg-[var(--ace-slider-tooltip-bg)]',
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[0.625rem] leading-none tracking-[0.0125rem] text-[var(--ace-slider-tooltip-text)]',
)
