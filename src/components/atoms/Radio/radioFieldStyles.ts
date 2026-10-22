import { cn } from '../../../lib/cn'

export type RadioSize = 'sm' | 'md' | 'lg'

/** Row trigger: focus ring wraps control + label (Figma Radio Buttons 331:1755). */
export const aceRadioItemRootClass =
  'group inline-flex max-w-full cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-0 bg-transparent p-0 text-left outline-none transition-colors duration-200 ease-out ' +
  'focus-visible:ring-2 focus-visible:ring-[var(--radio-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--radio-focus-offset)] ' +
  'disabled:cursor-not-allowed'

const aceRadioControlSize: Record<RadioSize, string> = {
  sm: 'h-3 w-3 shrink-0',
  md: 'h-4 w-4 shrink-0',
  lg: 'h-5 w-5 shrink-0',
}

const aceRadioIndicatorSize: Record<RadioSize, string> = {
  sm: 'size-1.5 shrink-0',
  md: 'size-2 shrink-0',
  lg: 'size-[0.625rem] shrink-0',
}

/** Circular control (inner span inside the item button). */
export function aceRadioControlClass(size: RadioSize = 'md'): string {
  return cn(
    'relative box-border shrink-0 rounded-full border border-solid bg-[var(--radio-bg-inner)] p-0 leading-[0] transition-colors duration-200 ease-out',
    aceRadioControlSize[size],
    'border-[var(--radio-border-default)]',
    'group-data-[state=unchecked]:group-hover:border-[var(--radio-border-hover)] group-data-[state=unchecked]:group-hover:bg-[var(--radio-surface-hover)]',
    'group-disabled:group-hover:border-[var(--radio-border-disabled)] group-disabled:group-hover:bg-[var(--radio-bg-inner)]',
    'group-data-[state=checked]:border-[var(--radio-border-selected)]',
    'group-disabled:border-[var(--radio-border-disabled)]',
  )
}

export function aceRadioIndicatorClass(size: RadioSize = 'md'): string {
  return cn(
    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--radio-indicator-selected)]',
    aceRadioIndicatorSize[size],
    'data-[disabled]:bg-[var(--radio-indicator-disabled)]',
  )
}

export type RadioFieldState = 'default' | 'hover' | 'active' | 'disabled'

const aceRadioFieldShell =
  'inline-flex w-fit max-w-full min-w-0 items-center rounded-[var(--radius-md)] p-3'

/** Static field shell for documentation matrices (Figma Radio Buttons 331:1755 — With background). */
export function aceRadioFieldClass(state: RadioFieldState): string {
  switch (state) {
    case 'default':
      return cn(
        aceRadioFieldShell,
        'border border-[var(--radio-field-border)] bg-[var(--radio-field-bg)]',
      )
    case 'hover':
      return cn(aceRadioFieldShell, 'border border-transparent bg-[var(--radio-field-bg-hover)]')
    case 'active':
      return cn(
        aceRadioFieldShell,
        'border border-[var(--radio-field-border-active)] bg-[var(--radio-field-bg-active)]',
      )
    case 'disabled':
      return cn(aceRadioFieldShell, 'border border-transparent bg-[var(--radio-field-bg-disabled)]')
    default:
      return ''
  }
}

/** Live field wrapper — applies hover/active shells to match Figma status reference. */
export function aceRadioFieldInteractiveClass(options: {
  checked?: boolean
  disabled?: boolean
}): string {
  const { checked = false, disabled = false } = options
  if (disabled) return aceRadioFieldClass('disabled')
  if (checked) return aceRadioFieldClass('active')
  return cn(
    aceRadioFieldClass('default'),
    'transition-[border-color,background-color] duration-200 ease-out',
    'hover:border-transparent hover:bg-[var(--radio-field-bg-hover)]',
  )
}
