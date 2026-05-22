import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef, useMemo, useState } from 'react'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceSliderCenteredRangeClass,
  aceSliderRangeClass,
  aceSliderRootClass,
  aceSliderThumbInnerClass,
  aceSliderThumbOuterClass,
  aceSliderTickClass,
  aceSliderTickRowClass,
  aceSliderTooltipClass,
  aceSliderTooltipVisibleClass,
  aceSliderTrackClass,
} from './sliderFieldStyles'

/** Snap centered slider to 0 when the thumb is near the center dot (Figma 2505:47). */
const CENTER_SNAP_THRESHOLD = 8

function snapCenteredValue(value: number): number {
  return Math.abs(value) <= CENTER_SNAP_THRESHOLD ? 0 : value
}

export type AceSliderVariant = 'continuous' | 'discrete' | 'ranged' | 'centered'

export type AceSliderValue = number | [number, number]

export type AceSliderProps = Omit<
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange'
> & {
  variant?: AceSliderVariant
  value?: AceSliderValue
  defaultValue?: AceSliderValue
  onValueChange?: (value: AceSliderValue) => void
  /** Steps for discrete variant (default 10 → 0,10,…,100). */
  discreteSteps?: number
  /** Show value counter bubble on handle hover/focus. */
  showTooltip?: boolean
  formatTooltip?: (value: number) => string
  /** Lab/static: force default vs hover handle width and tooltip without interaction. */
  handleVisualState?: 'default' | 'hover'
}

function valueKey(v: AceSliderValue | undefined): string | undefined {
  if (v === undefined) return undefined
  return Array.isArray(v) ? `${v[0]}:${v[1]}` : String(v)
}

function toRadixValues(value: AceSliderValue): number[] {
  return Array.isArray(value) ? [...value] : [value]
}

function fromRadixValues(vals: number[], variant: AceSliderVariant): AceSliderValue {
  if (variant === 'ranged') return [vals[0] ?? 0, vals[1] ?? 100] as [number, number]
  return vals[0] ?? 0
}

function SliderTickDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'size-1 shrink-0 rounded-full',
        active ? aceSliderTickClass.active : aceSliderTickClass.inactive,
      )}
    />
  )
}

function DiscreteTicks({
  min,
  max,
  step,
  fillValue,
}: {
  min: number
  max: number
  step: number
  fillValue: number
}) {
  const ticks = useMemo(() => {
    if (step <= 0 || max <= min) return []
    const list: number[] = []
    for (let v = min; v <= max; v += step) {
      list.push(v)
      if (list.length > 50) break
    }
    return list
  }, [min, max, step])

  if (ticks.length === 0) return null

  return (
    <div
      className={aceSliderTickRowClass}
      style={{
        left: 'var(--ace-slider-tick-inset)',
        right: 'var(--ace-slider-tick-inset)',
      }}
    >
      {ticks.map((v) => (
        <SliderTickDot key={v} active={v <= fillValue} />
      ))}
    </div>
  )
}

function CenteredTicks({ min, max, value }: { min: number; max: number; value: number }) {
  const fillLo = Math.min(0, value)
  const fillHi = Math.max(0, value)
  const tickValues = [min, 0, max]

  return (
    <div
      className={aceSliderTickRowClass}
      style={{
        left: 'var(--ace-slider-tick-inset)',
        right: 'var(--ace-slider-tick-inset)',
      }}
    >
      {tickValues.map((v) => (
        <SliderTickDot key={v} active={v >= fillLo && v <= fillHi} />
      ))}
    </div>
  )
}

function CenteredFill({ min, max, value }: { min: number; max: number; value: number }) {
  const span = max - min || 1
  const valuePct = ((value - min) / span) * 100
  const centerPct = ((0 - min) / span) * 100
  const left = Math.min(valuePct, centerPct)
  const width = Math.abs(valuePct - centerPct)

  return (
    <div
      aria-hidden
      className={aceSliderCenteredRangeClass}
      style={{ left: `${left}%`, width: `${width}%` }}
    />
  )
}

export const AceSlider = forwardRef<ComponentRef<typeof SliderPrimitive.Root>, AceSliderProps>(
  (
    {
      className,
      variant = 'continuous',
      value,
      defaultValue,
      onValueChange,
      min: minProp,
      max: maxProp,
      step: stepProp,
      discreteSteps = 10,
      showTooltip,
      formatTooltip = (v) => String(Math.round(v)),
      handleVisualState,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isRanged = variant === 'ranged'
    const isCentered = variant === 'centered'
    const isDiscrete = variant === 'discrete'

    const min = minProp ?? (isCentered ? -100 : 0)
    const max = maxProp ?? 100

    const resolvedDefault: AceSliderValue =
      defaultValue ??
      (isRanged ? [25, 75] : isCentered ? -17 : 50)

    const rawStep = stepProp ?? (isDiscrete ? (max - min) / discreteSteps : 1)
    const step = rawStep > 0 ? rawStep : 1

    const isControlled = value !== undefined

    const radixValue = useMemo(
      () => (isControlled ? toRadixValues(value) : undefined),
      [isControlled, valueKey(value)],
    )

    const radixDefault = useMemo(
      () => (!isControlled ? toRadixValues(resolvedDefault) : undefined),
      [isControlled, valueKey(resolvedDefault)],
    )

    const [internalValues, setInternalValues] = useState<number[]>(() => toRadixValues(resolvedDefault))

    const currentValues = radixValue ?? internalValues
    const primaryValue = currentValues[0] ?? min
    const discreteFill = isRanged ? (currentValues[1] ?? max) : primaryValue

    const showValueTooltip = showTooltip === true
    const isHoverVisual = handleVisualState === 'hover'
    const thumbInnerVisualClass = isHoverVisual
      ? '!w-[var(--ace-slider-handle-width-hover)]'
      : undefined

    const renderThumb = (ariaLabel: string, value: number) => (
      <SliderPrimitive.Thumb className={aceSliderThumbOuterClass} aria-label={ariaLabel}>
        <span className={cn(aceSliderThumbInnerClass, thumbInnerVisualClass)} aria-hidden />
        {showValueTooltip ? (
          <span className={cn(aceSliderTooltipClass, aceSliderTooltipVisibleClass)} role="tooltip">
            {formatTooltip(value)}
          </span>
        ) : null}
      </SliderPrimitive.Thumb>
    )

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(aceSliderRootClass, className)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={radixValue}
        defaultValue={radixDefault}
        onValueChange={(vals) => {
          const nextVals = isCentered
            ? [snapCenteredValue(vals[0] ?? 0)]
            : vals
          if (!isControlled) setInternalValues(nextVals)
          onValueChange?.(fromRadixValues(nextVals, variant))
        }}
        onValueCommit={(vals) => {
          if (!isCentered) return
          const nextVals = [snapCenteredValue(vals[0] ?? 0)]
          if (!isControlled) setInternalValues(nextVals)
          onValueChange?.(fromRadixValues(nextVals, variant))
        }}
        {...props}
      >
        <SliderPrimitive.Track className={aceSliderTrackClass}>
          {isCentered ? (
            <>
              <SliderPrimitive.Range className="sr-only !h-0 !min-h-0 opacity-0" aria-hidden />
              <CenteredFill min={min} max={max} value={primaryValue} />
            </>
          ) : (
            <SliderPrimitive.Range className={aceSliderRangeClass} />
          )}
          {isDiscrete ? (
            <DiscreteTicks min={min} max={max} step={step} fillValue={discreteFill} />
          ) : null}
          {isCentered ? <CenteredTicks min={min} max={max} value={primaryValue} /> : null}
        </SliderPrimitive.Track>
        {renderThumb(isRanged ? 'Minimum' : 'Slider', currentValues[0] ?? min)}
        {isRanged ? renderThumb('Maximum', currentValues[1] ?? max) : null}
      </SliderPrimitive.Root>
    )
  },
)
AceSlider.displayName = SliderPrimitive.Root.displayName
