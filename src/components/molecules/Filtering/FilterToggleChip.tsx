import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'
import { filterToggleChipClass, filterToggleChipPressedClass } from './filterFieldStyles'

export type FilterToggleChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label: string
  /** When true, chip stays in the Neutral/700 on state. */
  pressed?: boolean
}

/** Filter chip as an on/off toggle - same styling as FilterTrigger, no chevron or clear. */
export const FilterToggleChip = forwardRef<HTMLButtonElement, FilterToggleChipProps>(
  function FilterToggleChip(
    { label, pressed = false, className, type = 'button', onClick, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={pressed}
        className={cn(filterToggleChipClass, pressed && filterToggleChipPressedClass, className)}
        onClick={onClick}
        {...rest}
      >
        <span className="whitespace-nowrap">{label}</span>
      </button>
    )
  },
)
