import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'
import { aceFilterToggleChipClass, aceFilterToggleChipPressedClass } from './filterFieldStyles'

export type AceFilterToggleChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label: string
  /** When true, chip stays in the Neutral/700 on state. */
  pressed?: boolean
}

/** Filter chip as an on/off toggle — same styling as AceFilterTrigger, no chevron or clear. */
export const AceFilterToggleChip = forwardRef<HTMLButtonElement, AceFilterToggleChipProps>(
  function AceFilterToggleChip(
    { label, pressed = false, className, type = 'button', onClick, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={pressed}
        className={cn(aceFilterToggleChipClass, pressed && aceFilterToggleChipPressedClass, className)}
        onClick={onClick}
        {...rest}
      >
        <span className="whitespace-nowrap">{label}</span>
      </button>
    )
  },
)
