import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'
import { aceFilterTriggerClass } from './filterFieldStyles'

/** Figma Secondary dropdown chevron (8×5 filled). */
function FilterTriggerChevron({ className }: { className?: string }) {
  return (
    <svg
      className={cn('size-[0.5rem] shrink-0', className)}
      viewBox="0 0 8 5"
      fill="currentColor"
      aria-hidden
    >
      <path d="M0.94 0.53L4 3.583L7.06 0.53L8 1.47L4 5.47L0 1.47L0.94 0.53Z" />
    </svg>
  )
}

export type AceFilterTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label: string
  showChevron?: boolean
}

export const AceFilterTrigger = forwardRef<HTMLButtonElement, AceFilterTriggerProps>(
  function AceFilterTrigger(
    { label, showChevron = true, className, type = 'button', ...rest },
    ref,
  ) {
    return (
      <button ref={ref} type={type} className={cn(aceFilterTriggerClass, className)} {...rest}>
        <span className="whitespace-nowrap">{label}</span>
        {showChevron ? <FilterTriggerChevron /> : null}
      </button>
    )
  },
)
