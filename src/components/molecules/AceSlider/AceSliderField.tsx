import { useId } from 'react'
import { cn } from '../../../lib/cn'
import { AceSlider, type AceSliderProps } from './AceSlider'

const labelClass =
  'text-sm font-medium leading-[1.65] text-[var(--screening-text-primary)]'

export type AceSliderFieldProps = AceSliderProps & {
  label?: string
  showValue?: boolean
  formatValue?: (value: number) => string
  fieldClassName?: string
}

function valueLabel(value: AceSliderProps['value'], fallback: number): string {
  if (value === undefined) return String(Math.round(fallback))
  if (Array.isArray(value)) return `${Math.round(value[0])} – ${Math.round(value[1])}`
  return String(Math.round(value))
}

export function AceSliderField({
  label = 'Label',
  showValue = false,
  formatValue = (v) => String(Math.round(v)),
  fieldClassName,
  value,
  defaultValue = 50,
  id: idProp,
  className,
  ...sliderProps
}: AceSliderFieldProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const display =
    value !== undefined
      ? Array.isArray(value)
        ? `${formatValue(value[0])} – ${formatValue(value[1])}`
        : formatValue(value)
      : valueLabel(defaultValue, typeof defaultValue === 'number' ? defaultValue : defaultValue[0])

  return (
    <div className={cn('flex w-full max-w-[21rem] flex-col gap-2', fieldClassName)}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className={cn('m-0', labelClass)}>
          {label}
        </label>
        {showValue ? (
          <span className="shrink-0 text-sm tabular-nums text-[var(--screening-text-muted)]">{display}</span>
        ) : null}
      </div>
      <AceSlider id={id} value={value} defaultValue={defaultValue} className={className} {...sliderProps} />
    </div>
  )
}
