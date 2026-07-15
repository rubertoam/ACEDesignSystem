import { cn } from '../../../lib/cn'

export type AceCheckboxSize = 'sm' | 'md' | 'lg'

/**
 * ACE Checkbox surface — Figma Checkboxes 317:1492
 * Regular: coal-grey 1px border · Hover: purple 1px + Primary/50 fill ·
 * Active: primary fill with white inset square (no checkmark) · Disabled: Neutral/100
 */
export const aceCheckboxSurfaceClass = cn(
  'box-border rounded-[var(--radius-checkbox)] border border-solid',
  'border-[var(--screening-checkbox-border)] bg-[var(--screening-checkbox-inner-bg)]',
  'text-[var(--screening-checkbox-check)]',
  'transition-[border-color,background-color,color,box-shadow] duration-150 ease-out',
  /* Hover (unchecked) — 1px purple border + light purple fill */
  'enabled:data-[state=unchecked]:hover:border-[var(--screening-checkbox-border-hover)]',
  'enabled:data-[state=unchecked]:hover:bg-[var(--screening-checkbox-bg-hover)]',
  /* Checked / indeterminate — filled square + white inset ring */
  'data-[state=checked]:border-[var(--screening-checkbox-checked-border)] data-[state=checked]:bg-[var(--screening-checkbox-checked-bg)]',
  'data-[state=checked]:shadow-[inset_0_0_0_1.5px_var(--screening-checkbox-checked-inset)]',
  'data-[state=indeterminate]:border-[var(--screening-checkbox-checked-border)] data-[state=indeterminate]:bg-[var(--screening-checkbox-checked-bg)]',
  'data-[state=indeterminate]:shadow-[inset_0_0_0_1.5px_var(--screening-checkbox-checked-inset)]',
  /* Focus */
  'outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface)]',
  /* Disabled */
  'disabled:cursor-not-allowed',
  'disabled:border-[var(--screening-checkbox-disabled-border)] disabled:bg-[var(--screening-checkbox-disabled-bg)]',
  'disabled:data-[state=checked]:border-[var(--screening-checkbox-disabled-checked-bg)] disabled:data-[state=checked]:bg-[var(--screening-checkbox-disabled-checked-bg)]',
  'disabled:data-[state=checked]:shadow-[inset_0_0_0_1.5px_var(--screening-checkbox-checked-inset)]',
  'disabled:data-[state=checked]:text-[var(--screening-checkbox-disabled-check)]',
  'disabled:data-[state=indeterminate]:border-[var(--screening-checkbox-disabled-checked-bg)] disabled:data-[state=indeterminate]:bg-[var(--screening-checkbox-disabled-checked-bg)]',
  'disabled:data-[state=indeterminate]:shadow-[inset_0_0_0_1.5px_var(--screening-checkbox-checked-inset)]',
  'disabled:data-[state=indeterminate]:text-[var(--screening-checkbox-disabled-check)]',
)

export const aceCheckboxSizeClass: Record<AceCheckboxSize, string> = {
  sm: 'size-4 shrink-0',
  md: 'size-5 shrink-0',
  lg: 'size-6 shrink-0',
}

/** Indeterminate bar only — selected state uses the filled square + inset, not a glyph. */
export const aceCheckboxIconSizeClass: Record<AceCheckboxSize, string> = {
  sm: 'h-0.5 w-2',
  md: 'h-0.5 w-2.5',
  lg: 'h-[3px] w-3',
}

export function aceCheckboxClass(size: AceCheckboxSize = 'sm'): string {
  return cn(aceCheckboxSurfaceClass, aceCheckboxSizeClass[size])
}
