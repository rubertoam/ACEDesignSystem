import { cn } from '../../../lib/cn'

export type AceCheckboxSize = 'sm' | 'md' | 'lg'

/**
 * ACE Checkbox surface — Figma Checkbox set 322:1747 (doc page 317:1492).
 * Regular: surface fill + brand border · Hover: brand-hover fill + brand border ·
 * Active: brand fill with white inset ring (no checkmark) · Disabled: border/disabled ·
 * Disabled-Selected: bg/disabled + white inset.
 */
export const aceCheckboxSurfaceClass = cn(
  'box-border border border-solid',
  'border-[var(--screening-checkbox-border)] bg-[var(--screening-checkbox-inner-bg)]',
  'text-[var(--screening-checkbox-check)]',
  'transition-[border-color,background-color,color,box-shadow] duration-150 ease-out',
  /* Hover (unchecked) — brand border + brand-hover fill */
  'enabled:data-[state=unchecked]:hover:border-[var(--screening-checkbox-border-hover)]',
  'enabled:data-[state=unchecked]:hover:bg-[var(--screening-checkbox-bg-hover)]',
  /* Checked / indeterminate — filled square + white inset ring */
  'data-[state=checked]:border-[var(--screening-checkbox-checked-border)] data-[state=checked]:bg-[var(--screening-checkbox-checked-bg)]',
  'data-[state=checked]:shadow-[inset_0_0_0_1.5px_var(--screening-checkbox-checked-inset)]',
  'data-[state=indeterminate]:border-[var(--screening-checkbox-checked-border)] data-[state=indeterminate]:bg-[var(--screening-checkbox-checked-bg)]',
  'data-[state=indeterminate]:shadow-[inset_0_0_0_1.5px_var(--screening-checkbox-checked-inset)]',
  /* Focus */
  'outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface-primary)]',
  /* Disabled unchecked — transparent fill, disabled border */
  'disabled:cursor-not-allowed',
  'disabled:border-[var(--screening-checkbox-disabled-border)] disabled:bg-transparent',
  /* Disabled selected / indeterminate */
  'disabled:data-[state=checked]:border-[var(--screening-checkbox-disabled-checked-bg)] disabled:data-[state=checked]:bg-[var(--screening-checkbox-disabled-checked-bg)]',
  'disabled:data-[state=checked]:shadow-[inset_0_0_0_1.5px_var(--screening-checkbox-checked-inset)]',
  'disabled:data-[state=checked]:text-[var(--screening-checkbox-disabled-check)]',
  'disabled:data-[state=indeterminate]:border-[var(--screening-checkbox-disabled-checked-bg)] disabled:data-[state=indeterminate]:bg-[var(--screening-checkbox-disabled-checked-bg)]',
  'disabled:data-[state=indeterminate]:shadow-[inset_0_0_0_1.5px_var(--screening-checkbox-checked-inset)]',
  'disabled:data-[state=indeterminate]:text-[var(--screening-checkbox-disabled-check)]',
)

/** Box sizes — Figma Small 16 / Medium 20 / Large 24; Large uses 1.5px stroke + 4px radius. */
export const aceCheckboxSizeClass: Record<AceCheckboxSize, string> = {
  sm: 'size-4 shrink-0 rounded-[var(--radius-checkbox)] border',
  md: 'size-5 shrink-0 rounded-[var(--radius-checkbox)] border',
  lg: 'size-6 shrink-0 rounded-[var(--radius-sm)] border-[1.5px]',
}

/** Indeterminate bar only — selected state uses the filled square + inset, not a glyph. */
export const aceCheckboxIconSizeClass: Record<AceCheckboxSize, string> = {
  sm: 'h-0.5 w-2',
  md: 'h-0.5 w-2.5',
  lg: 'h-[3px] w-3',
}

/** Label next to checkbox — Caption 12 (sm) / Body 14 (md, lg). */
export const aceCheckboxLabelClass: Record<AceCheckboxSize, string> = {
  sm: '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)] text-[var(--color-text-primary)]',
  md: '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--color-text-primary)]',
  lg: '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--color-text-primary)]',
}

export const aceCheckboxLabelDisabledClass = 'text-[var(--color-text-disabled)]'

export function aceCheckboxClass(size: AceCheckboxSize = 'sm'): string {
  return cn(aceCheckboxSurfaceClass, aceCheckboxSizeClass[size])
}
