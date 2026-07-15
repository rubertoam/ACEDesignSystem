import type { HTMLAttributes } from 'react'
import { MaterialSymbol } from '../AceAccordion/MaterialSymbol'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import {
  aceStepperButtonClass,
  aceStepperShellClass,
  aceStepperValueClass,
} from './stepperFieldStyles'

export type AceStepperVariant = 'horizontal' | 'vertical'

export type AceStepperProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value: number
  onValueChange: (value: number) => void
  /** Horizontal: − / + · Vertical: chevrons above / below. */
  variant?: AceStepperVariant
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  /** Accessible name for the stepper group. */
  'aria-label'?: string
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Numeric stepper — Horizontal (minus / plus) or Vertical (chevrons above / below).
 */
export function AceStepper({
  value,
  onValueChange,
  variant = 'horizontal',
  min = 0,
  max = 99,
  step = 1,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Stepper',
  ...rest
}: AceStepperProps) {
  const canDecrease = !disabled && value > min
  const canIncrease = !disabled && value < max
  const decrease = () => onValueChange(clamp(value - step, min, max))
  const increase = () => onValueChange(clamp(value + step, min, max))

  const isVertical = variant === 'vertical'

  return (
    <div
      {...rest}
      role="group"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cn(
        aceStepperShellClass,
        isVertical
          ? 'h-auto w-[var(--ace-input-height-md)] flex-col gap-0.5 px-0.5 py-0.5'
          : 'h-[var(--ace-input-height-md)] flex-row gap-0.5 px-1',
        disabled && 'opacity-50',
        className,
      )}
    >
      {isVertical ? (
        <button
          type="button"
          aria-label="Increase value"
          disabled={!canIncrease}
          onClick={increase}
          className={cn(aceStepperButtonClass, 'size-6')}
        >
          <MaterialSymbol name="keyboard_arrow_up" size="sm" className={aceChevronIconClass} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Decrease value"
          disabled={!canDecrease}
          onClick={decrease}
          className={cn(aceStepperButtonClass, 'size-6')}
        >
          <MaterialSymbol name="remove" size="sm" weight={300} className="leading-none" />
        </button>
      )}

      <span className={aceStepperValueClass} aria-live="polite">
        {value}
      </span>

      {isVertical ? (
        <button
          type="button"
          aria-label="Decrease value"
          disabled={!canDecrease}
          onClick={decrease}
          className={cn(aceStepperButtonClass, 'size-6')}
        >
          <MaterialSymbol name="keyboard_arrow_down" size="sm" className={aceChevronIconClass} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Increase value"
          disabled={!canIncrease}
          onClick={increase}
          className={cn(aceStepperButtonClass, 'size-6')}
        >
          <MaterialSymbol name="add" size="sm" weight={300} className="leading-none" />
        </button>
      )}
    </div>
  )
}
