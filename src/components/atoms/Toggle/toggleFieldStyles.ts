import { cn } from '../../../lib/cn'

export type AceToggleSize = 'sm' | 'md'
export type AceToggleVariant = 'standard' | 'icon'

/** Display labels for lab controls (md is the larger product size). */
export const ACE_TOGGLE_SIZE_LABELS: Record<AceToggleSize, string> = {
  sm: 'Small',
  md: 'Large',
}

/** Track + interaction (Figma Toggles 117:1265; --ace-toggle-* tokens). Motion in toggle.css. */
export const aceToggleTrackClass = cn(
  'ace-toggle-track group relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-0 p-[var(--ace-toggle-track-padding)] outline-none',
  'disabled:cursor-not-allowed',
  'data-[state=unchecked]:bg-[var(--ace-toggle-track-off)] data-[state=checked]:bg-[var(--ace-toggle-track-on)]',
  'disabled:data-[state=unchecked]:bg-[var(--ace-toggle-track-disabled-off)] disabled:data-[state=checked]:bg-[var(--ace-toggle-track-disabled-on)]',
  'enabled:data-[state=unchecked]:hover:bg-[var(--ace-toggle-track-off-hover)] enabled:data-[state=checked]:hover:bg-[var(--ace-toggle-track-on-hover)]',
  'focus-visible:ring-2 focus-visible:ring-[var(--ace-toggle-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ace-toggle-ring-offset)]',
)

/** Shared track dimensions (standard + icon use the same shell). */
const aceToggleRootSize: Record<AceToggleSize, string> = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
}

const thumbShadow = 'shadow-[0_1px_2px_rgb(35_38_44_/0.12)]'

/** Shared thumb pill — identical for standard and icon variants. */
const aceToggleThumbClassBase: Record<AceToggleSize, string> = {
  sm: cn(
    'ace-toggle-thumb pointer-events-none z-[1] block h-3 w-3 shrink-0 rounded-full bg-[var(--ace-toggle-thumb)] group-disabled:bg-[var(--ace-toggle-thumb-disabled)]',
    thumbShadow,
  ),
  md: cn(
    'ace-toggle-thumb pointer-events-none z-[1] block h-4 w-4 shrink-0 rounded-full bg-[var(--ace-toggle-thumb)] group-disabled:bg-[var(--ace-toggle-thumb-disabled)]',
    thumbShadow,
  ),
}

/** Thumb travel = track inner width − thumb (--ace-toggle-track-padding). */
const aceToggleThumbTranslate: Record<AceToggleSize, string> = {
  sm: 'translate-x-0 data-[state=checked]:translate-x-4',
  md: 'translate-x-0 data-[state=checked]:translate-x-5',
}

export const aceToggleIconGlyphMotion = 'ace-toggle-icon-glyph'

/** Icon glyph box — sized to sit in the track half beside the thumb (not Material Symbol metrics). */
export const aceToggleIconCheckClass: Record<AceToggleSize, string> = {
  sm: 'size-[6px] shrink-0 text-[var(--ace-toggle-icon-glyph-on)]',
  md: 'size-2 shrink-0 text-[var(--ace-toggle-icon-glyph-on)]',
}

export const aceToggleIconXClass: Record<AceToggleSize, string> = {
  sm: 'size-[6px] shrink-0 text-[var(--ace-toggle-icon-glyph-off)]',
  md: 'size-2 shrink-0 text-[var(--ace-toggle-icon-glyph-off)]',
}

export function aceToggleClass(size: AceToggleSize = 'md', _variant: AceToggleVariant = 'standard'): string {
  return cn(aceToggleTrackClass, aceToggleRootSize[size])
}

export function aceToggleThumbClass(size: AceToggleSize = 'md', _variant: AceToggleVariant = 'standard'): string {
  return cn(aceToggleThumbClassBase[size], aceToggleThumbTranslate[size])
}
