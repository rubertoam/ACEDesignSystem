import { cn } from '../../../lib/cn'

export type ToggleSize = 'sm' | 'md'
export type ToggleVariant = 'standard' | 'icon'

/** Display labels for lab controls (md is the larger product size). */
export const TOGGLE_SIZE_LABELS: Record<ToggleSize, string> = {
  sm: 'Small',
  md: 'Large',
}

/**
 * Track + interaction — Figma Toggle set 5283:2831 (doc 117:1265).
 * Off: bg/secondary · Hover: bg/brand-hover · On: bg/brand ·
 * Inactive off: bg/disabled-subtle · Inactive on: bg/brand-subtle.
 * Motion in toggle.css.
 */
export const aceToggleTrackClass = cn(
  'ace-toggle-track group relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-0 p-[var(--toggle-track-padding)] outline-none',
  'disabled:cursor-not-allowed',
  'data-[state=unchecked]:bg-[var(--toggle-track-off)] data-[state=checked]:bg-[var(--toggle-track-on)]',
  'disabled:data-[state=unchecked]:bg-[var(--toggle-track-disabled-off)] disabled:data-[state=checked]:bg-[var(--toggle-track-disabled-on)]',
  'enabled:data-[state=unchecked]:hover:bg-[var(--toggle-track-off-hover)] enabled:data-[state=checked]:hover:bg-[var(--toggle-track-on-hover)]',
  'focus-visible:ring-2 focus-visible:ring-[var(--toggle-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--toggle-ring-offset)]',
)

/** Shared track dimensions (standard + icon use the same shell). Small 36×20 / Large 44×24. */
const aceToggleRootSize: Record<ToggleSize, string> = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
}

const thumbShadow = 'shadow-[0_1px_2px_rgb(35_38_44_/0.12)]'

/** Shared thumb pill — identical for standard and icon variants. */
const aceToggleThumbClassBase: Record<ToggleSize, string> = {
  sm: cn(
    'ace-toggle-thumb pointer-events-none z-[1] block h-3 w-3 shrink-0 rounded-full bg-[var(--toggle-thumb)] group-disabled:bg-[var(--toggle-thumb-disabled)]',
    thumbShadow,
  ),
  md: cn(
    'ace-toggle-thumb pointer-events-none z-[1] block h-4 w-4 shrink-0 rounded-full bg-[var(--toggle-thumb)] group-disabled:bg-[var(--toggle-thumb-disabled)]',
    thumbShadow,
  ),
}

/** Thumb travel = track inner width − thumb (--toggle-track-padding). */
const aceToggleThumbTranslate: Record<ToggleSize, string> = {
  sm: 'translate-x-0 data-[state=checked]:translate-x-4',
  md: 'translate-x-0 data-[state=checked]:translate-x-5',
}

export const aceToggleIconGlyphMotion = 'ace-toggle-icon-glyph'

/** Icon glyph box — sized to sit in the track half beside the thumb (not Material Symbol metrics). */
export const aceToggleIconCheckClass: Record<ToggleSize, string> = {
  sm: 'size-[6px] shrink-0 text-[var(--toggle-icon-glyph-on)]',
  md: 'size-2 shrink-0 text-[var(--toggle-icon-glyph-on)]',
}

export const aceToggleIconXClass: Record<ToggleSize, string> = {
  sm: 'size-[6px] shrink-0 text-[var(--toggle-icon-glyph-off)]',
  md: 'size-2 shrink-0 text-[var(--toggle-icon-glyph-off)]',
}

/** Label beside toggle — Caption/Regular (Figma) for Small and Large. */
export const aceToggleLabelClass =
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)] text-[var(--color-text-primary)]'

export const aceToggleLabelDisabledClass = 'text-[var(--color-text-disabled)]'

export function aceToggleClass(size: ToggleSize = 'md', _variant: ToggleVariant = 'standard'): string {
  return cn(aceToggleTrackClass, aceToggleRootSize[size])
}

export function aceToggleThumbClass(size: ToggleSize = 'md', _variant: ToggleVariant = 'standard'): string {
  return cn(aceToggleThumbClassBase[size], aceToggleThumbTranslate[size])
}
