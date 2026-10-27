import { useId, useState } from 'react'
import { Slider, type SliderVariant } from '../components/molecules/Slider'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { cn } from '../lib/cn'
import { LabControlField, LabSelect } from '../lib/labControls'
import { labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabPage } from './ComponentLabPage'
import { sliderLabCode, sliderLabQa, sliderLabUsage } from './labTabDocs'

const VARIANTS: { key: SliderVariant; label: string; defaultValue: number | [number, number] }[] = [
  { key: 'continuous', label: 'Continuous', defaultValue: 50 },
  { key: 'discrete', label: 'Discrete', defaultValue: 50 },
  { key: 'ranged', label: 'Ranged', defaultValue: [25, 75] },
  { key: 'centered', label: 'Centered', defaultValue: -17 },
]

const STATE_COLUMNS = [
  { key: 'default' as const, label: 'Default' },
  { key: 'hover' as const, label: 'Hover' },
]

const DEFAULT_SHOW_COUNTER: Record<SliderVariant, boolean> = {
  continuous: false,
  discrete: false,
  ranged: false,
  centered: true,
}

function StaticReferencePreview({
  variant,
  state,
}: {
  variant: SliderVariant
  state: 'default' | 'hover'
}) {
  const config = VARIANTS.find((v) => v.key === variant)!
  const previewId = useId()

  return (
    <div className="pointer-events-none w-full max-w-[21rem] min-w-[16rem] select-none">
      <Slider
        id={previewId}
        variant={variant}
        defaultValue={config.defaultValue}
        handleVisualState={state}
        showTooltip={false}
        tabIndex={-1}
        className="w-full"
        aria-label={`${config.label} slider, ${state} state (static reference)`}
      />
    </div>
  )
}

export function SlidersLab() {
  const [variant, setVariant] = useState<SliderVariant>('continuous')
  const [showCounterByVariant, setShowCounterByVariant] =
    useState<Record<SliderVariant, boolean>>(DEFAULT_SHOW_COUNTER)
  const [value, setValue] = useState(50)
  const [rangeValue, setRangeValue] = useState<[number, number]>([25, 75])
  const [centeredValue, setCenteredValue] = useState(-17)

  const showCounter = showCounterByVariant[variant]

  const setShowCounterForVariant = (checked: boolean) => {
    setShowCounterByVariant((prev) => ({ ...prev, [variant]: checked }))
  }

  const interactiveSlider =
    variant === 'ranged' ? (
      <Slider
        key="ranged"
        variant="ranged"
        value={rangeValue}
        onValueChange={(v) => {
          if (Array.isArray(v)) setRangeValue(v)
        }}
        showTooltip={showCounter}
        className="max-w-[21rem]"
      />
    ) : variant === 'centered' ? (
      <Slider
        key="centered"
        variant="centered"
        value={centeredValue}
        onValueChange={(v) => {
          if (typeof v === 'number') setCenteredValue(v)
        }}
        showTooltip={showCounter}
        className="max-w-[21rem]"
      />
    ) : (
      <Slider
        key={variant}
        variant={variant}
        value={value}
        onValueChange={(v) => {
          if (typeof v === 'number') setValue(v)
        }}
        showTooltip={showCounter}
        className="max-w-[21rem]"
      />
    )

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabSelect
          label="Variant"
          value={variant}
          onChange={setVariant}
          options={VARIANTS.map((v) => ({ value: v.key, label: v.label }))}
        />
        <LabControlField label="Show counter" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle
              size="sm"
              checked={showCounter}
              onCheckedChange={setShowCounterForVariant}
              aria-label="Show counter"
            />
          </div>
        </LabControlField>
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="flex justify-start">{interactiveSlider}</div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={sliderLabQa}
      title="Sliders"
      description="ACE Design System v.3 sliders: Continuous, Discrete, Ranged, and Centered variants with Default and Hover handle states (Figma 2505:47). Built on Radix Slider."
      examplesToolbar={toolbar}
      examples={
        <section className="space-y-5">
          <div className={cn('w-full min-w-0', labUsageSectionClass)}>
            <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
            <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
              Frozen Default and Hover handle states for each variant. Use the controls above for live interaction.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            {VARIANTS.map(({ key, label }) => (
              <div key={key} className="space-y-3">
                <p className="m-0 text-sm font-semibold text-[var(--color-text-primary)]">{label}</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[24rem] border-collapse text-center text-xs">
                    <thead>
                      <tr>
                        <th className="w-24 p-2 text-left font-medium text-[var(--screening-text-muted)]" scope="col" />
                        {STATE_COLUMNS.map((col) => (
                          <th
                            key={col.key}
                            className="p-2 font-medium text-[var(--screening-text-muted)]"
                            scope="col"
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 text-left text-[var(--screening-text-muted)]">Slider</td>
                        {STATE_COLUMNS.map((col) => (
                          <td key={col.key} className="p-6 align-middle">
                            <div className="flex justify-center">
                              <StaticReferencePreview variant={key} state={col.key} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      }
      code={sliderLabCode}
      usage={sliderLabUsage}
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--screening-text-muted)]">
          <li>
            Inactive track: <code className="text-[var(--screening-text-primary)]">--slider-track-inactive</code>{' '}
            → <code className="text-[var(--screening-text-primary)]">colors/bg/brand-hover</code> →{' '}
            <code className="text-[var(--screening-text-primary)]">--color-bg-brand-hover</code>; range / handle{' '}
            <code className="text-[var(--screening-text-primary)]">--slider-range</code> →{' '}
            <code className="text-[var(--screening-text-primary)]">colors/action/primary</code> →{' '}
            <code className="text-[var(--screening-text-primary)]">--color-action-primary</code>.
          </li>
          <li>
            Discrete ticks: <code className="text-[var(--screening-text-primary)]">--slider-tick-on-range</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--slider-tick-on-track</code>.
          </li>
          <li>
            Value counter: <code className="text-[var(--screening-text-primary)]">showTooltip</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--slider-tooltip-bg</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--slider-tooltip-text</code>.
          </li>
        </ul>
      }
    />
  )
}
