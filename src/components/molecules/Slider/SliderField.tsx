import { useId } from 'react'
import { cn } from '../../../lib/cn'
import { Slider, type SliderProps } from './Slider'

const labelClass =
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)] text-[var(--color-text-primary)]'

export type SliderFieldProps = SliderProps & {
  label?: string
  showValue?: boolean
  formatValue?: (value: number) => string
  fieldClassName?: string
}

function valueLabel(value: SliderProps['value'], fallback: number): string {
  if (value === undefined) return String(Math.round(fallback))
  if (Array.isArray(value)) return `${Math.round(value[0])} - ${Math.round(value[1])}`
  return String(Math.round(value))
}

export function SliderField({
  label = 'Label',
  showValue = false,
  formatValue = (v) => String(Math.round(v)),
  fieldClassName,
  value,
  defaultValue = 50,
  id: idProp,
  className,
  ...sliderProps
}: SliderFieldProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const display =
    value !== undefined
      ? Array.isArray(value)
        ? `${formatValue(value[0])} - ${formatValue(value[1])}`
        : formatValue(value)
      : valueLabel(defaultValue, typeof defaultValue === 'number' ? defaultValue : defaultValue[0])

  return (
    <div className={cn('flex w-full max-w-[21rem] flex-col gap-2', fieldClassName)}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className={cn('m-0', labelClass)}>
          {label}
        </label>
        {showValue ? (
          <span className="shrink-0 tabular-nums [font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--color-text-muted)]">{display}</span>
        ) : null}
      </div>
      <Slider id={id} value={value} defaultValue={defaultValue} className={className} {...sliderProps} />
    </div>
  )
}
