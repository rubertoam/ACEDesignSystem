import { cn } from '../../../lib/cn'

export type AceCheckboxSize = 'sm' | 'md' | 'lg'

/** ACE / data table checkbox surface (Figma Checkboxes 317:1492; screening tokens). */
export const aceCheckboxSurfaceClass =
  'rounded-[var(--radius-checkbox)] border border-[var(--screening-checkbox-border)] bg-[var(--screening-checkbox-inner-bg)] text-[var(--screening-text-on-primary)] transition-all duration-200 ease-out data-[state=checked]:bg-[var(--screening-primary)] data-[state=checked]:border-[var(--screening-checkbox-border)] data-[state=indeterminate]:bg-[var(--screening-primary)] data-[state=indeterminate]:border-[var(--screening-checkbox-border)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] data-[state=unchecked]:enabled:hover:border-[var(--screening-primary)] data-[state=unchecked]:enabled:hover:ring-2 data-[state=unchecked]:enabled:hover:ring-[var(--screening-primary-ring)] disabled:cursor-not-allowed disabled:opacity-100 disabled:border-[var(--screening-checkbox-disabled-border)] disabled:data-[state=checked]:bg-[var(--screening-checkbox-disabled-checked-bg)] disabled:data-[state=checked]:border-[var(--screening-checkbox-disabled-border)] disabled:data-[state=indeterminate]:bg-[var(--screening-checkbox-disabled-checked-bg)] disabled:data-[state=indeterminate]:border-[var(--screening-checkbox-disabled-border)]'

export const aceCheckboxSizeClass: Record<AceCheckboxSize, string> = {
  sm: 'h-4 w-4 shrink-0',
  md: 'h-5 w-5 shrink-0',
  lg: 'h-6 w-6 shrink-0',
}

export function aceCheckboxClass(size: AceCheckboxSize = 'sm'): string {
  return cn(aceCheckboxSurfaceClass, aceCheckboxSizeClass[size])
}
