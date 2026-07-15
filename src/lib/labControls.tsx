import { useId, useMemo, type ReactNode } from 'react'
import { AceInputField } from '../components/atoms/AceInputField'
import { Checkbox } from '../components/atoms/Checkbox/Checkbox'
import { RadioGroup, RadioItem } from '../components/atoms/Radio/RadioGroup'
import type { AceRadioSize } from '../components/atoms/Radio/radioFieldStyles'
import {
  AceDropdownMenu,
  type AceButtonSize,
  type AceDropdownMenuEntry,
} from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import { cn } from './cn'

/** Matches ACE field labels above controls (e.g. Data Table “Context”). */
export const labControlLegendClass = cn(
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'text-[var(--screening-text-primary)]',
)

export function LabControlField({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <fieldset className={cn('min-w-0 border-0 p-0', className)}>
      {/* Legend margin is unreliable in fieldsets — space the control group instead. */}
      <legend className={cn(labControlLegendClass, 'p-0')}>{label}</legend>
      <div className="mt-[var(--ace-section-label-gap)]">{children}</div>
    </fieldset>
  )
}

const labSegmentedEase =
  'ease-[var(--ace-motion-ease-standard)] motion-reduce:transition-none motion-reduce:duration-0'
const labSegmentedDuration = 'duration-[var(--ace-motion-duration-medium)]'

/** Segmented control with sliding selection pill (lab theme toggle and similar). */
export function LabSegmentedToggle<T extends string>({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  value,
  onChange,
  options,
  className,
}: {
  'aria-label'?: string
  'aria-labelledby'?: string
  value: T
  onChange: (value: T) => void
  options: readonly { value: T; label: string }[]
  className?: string
}) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value),
  )
  const segmentCount = options.length
  const inset = 'var(--ace-lab-segmented-padding)'
  const segmentWidth = `calc((100% - (${inset} * 2)) / ${segmentCount})`

  return (
    <div className={cn('overflow-visible', className)}>
      <div
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          'relative inline-grid w-fit max-w-full overflow-visible rounded-[var(--radius-md)] border border-solid border-[var(--ace-lab-segmented-track-border)] bg-[var(--ace-lab-segmented-track-bg)]',
          'p-[var(--ace-lab-segmented-padding)]',
        )}
        style={{ gridTemplateColumns: `repeat(${segmentCount}, minmax(0, 1fr))` }}
      >
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute z-0 rounded-[var(--radius-sm)] bg-[var(--ace-lab-segmented-indicator-bg)] shadow-[var(--ace-lab-segmented-indicator-shadow)]',
            'transition-transform will-change-transform',
            labSegmentedDuration,
            labSegmentedEase,
          )}
          style={{
            top: inset,
            bottom: inset,
            left: inset,
            width: segmentWidth,
            transform: `translate3d(calc(${selectedIndex} * 100%), 0, 0)`,
          }}
        />
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt.value)}
              className={cn(
                'relative z-[1] rounded-[var(--radius-sm)] px-3 py-1.5 text-xs transition-colors',
                labSegmentedDuration,
                labSegmentedEase,
                selected
                  ? 'font-semibold text-[var(--screening-text-primary)]'
                  : 'font-normal text-[var(--screening-text-muted)] hover:text-[var(--screening-text-primary)]',
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function LabCheckbox({
  label,
  checked,
  onCheckedChange,
  className,
  size = 'md',
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const id = useId()
  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--color-text-primary)]',
        className,
      )}
    >
      <Checkbox
        id={id}
        size={size}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
      />
      <span>{label}</span>
    </label>
  )
}

/** Single-choice control using ACE radio buttons (replaces native radios and segmented button groups). */
const labRadioLabelClass: Record<AceRadioSize, string> = {
  sm: 'text-xs font-medium capitalize text-[var(--color-text-primary)]',
  md: 'text-sm font-medium capitalize text-[var(--color-text-primary)]',
  lg: 'text-base font-medium capitalize text-[var(--color-text-primary)]',
}

export function LabRadioGroup<T extends string>({
  label,
  value,
  onChange,
  options,
  className,
  size = 'sm',
}: {
  label: string
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string }[]
  className?: string
  size?: AceRadioSize
}) {
  const baseId = useId()
  return (
    <LabControlField label={label} className={className}>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as T)}
        className="flex flex-wrap gap-x-6 gap-y-3"
        aria-label={label}
      >
        {options.map((opt) => (
          <RadioItem key={opt.value} value={opt.value} id={`${baseId}-${opt.value}`} size={size}>
            <span className={labRadioLabelClass[size]}>{opt.label}</span>
          </RadioItem>
        ))}
      </RadioGroup>
    </LabControlField>
  )
}

/** Single-choice control using ACE dropdown menu (replaces native &lt;select&gt;). */
export function LabSelect<T extends string>({
  label,
  value,
  onChange,
  options,
  className,
  size = 'md',
  panelWidth = 'default',
  disabled,
}: {
  label: string
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string }[]
  className?: string
  size?: AceButtonSize
  panelWidth?: 'default' | 'compact' | 'wide'
  disabled?: boolean
}) {
  const selectedLabel = options.find((o) => o.value === value)?.label ?? 'Select'

  const items: AceDropdownMenuEntry[] = useMemo(
    () => [
      {
        type: 'radioGroup',
        value,
        onValueChange: (v) => onChange(v as T),
        options: options.map((o) => ({ value: o.value, label: o.label })),
      },
    ],
    [value, onChange, options],
  )

  return (
    <fieldset className={cn('min-w-0 border-0 p-0', className)} disabled={disabled}>
      <legend className={cn(labControlLegendClass, 'mb-[var(--ace-section-label-gap)] block w-full')}>
        {label}
      </legend>
      <AceDropdownMenu
        triggerLabel={selectedLabel}
        triggerMode="field"
        size={size}
        items={items}
        align="start"
        panelWidth={panelWidth}
        disabled={disabled}
        className="!w-full !max-w-full"
      />
    </fieldset>
  )
}

export function LabTextInput({
  label,
  value,
  onChange,
  className,
  fieldSize = 'sm',
  inputClassName,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
  fieldSize?: 'sm' | 'md' | 'lg'
  inputClassName?: string
}) {
  return (
    <div className={className}>
      <AceInputField
        label={label}
        fieldSize={fieldSize}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClassName}
      />
    </div>
  )
}
