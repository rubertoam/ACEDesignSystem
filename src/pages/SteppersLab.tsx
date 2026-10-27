import { useState } from 'react'
import { Stepper, type StepperVariant } from '../components/molecules/Stepper'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { LabControlField, LabSelect } from '../lib/labControls'
import { labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabPage } from './ComponentLabPage'
import { stepperLabCode, stepperLabQa, stepperLabUsage } from './labTabDocs'
import { cn } from '../lib/cn'

const VARIANTS: { value: StepperVariant; label: string }[] = [
  { value: 'horizontal', label: 'Horizontal Stepper' },
  { value: 'vertical', label: 'Vertical Stepper' },
]

const STATIC_VALUE = 5

export function SteppersLab() {
  const [variant, setVariant] = useState<StepperVariant>('horizontal')
  const [value, setValue] = useState(5)
  const [disabled, setDisabled] = useState(false)

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabSelect label="Variant" value={variant} onChange={setVariant} options={VARIANTS} />
        <LabControlField label="Disabled" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle size="sm" checked={disabled} onCheckedChange={setDisabled} aria-label="Disabled" />
          </div>
        </LabControlField>
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="flex justify-start">
          <Stepper
            variant={variant}
            value={value}
            onValueChange={setValue}
            disabled={disabled}
            aria-label={variant === 'horizontal' ? 'Horizontal stepper' : 'Vertical stepper'}
          />
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={stepperLabQa}
      title="Steppers"
      description="Numeric steppers for adjusting values. Horizontal uses minus and plus; Vertical uses chevrons above and below the value."
      examplesToolbar={toolbar}
      examples={
        <section className="space-y-5">
          <div className={cn('w-full min-w-0', labUsageSectionClass)}>
            <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
            <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
              Both variants frozen at {STATIC_VALUE}. Use the controls above for live interaction.
            </p>
          </div>
          <div className="flex flex-wrap items-end justify-start gap-10">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-[var(--screening-text-muted)]">Horizontal</span>
              <Stepper
                variant="horizontal"
                value={STATIC_VALUE}
                onValueChange={() => {}}
                className="pointer-events-none select-none"
                aria-label="Horizontal stepper (static reference)"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-[var(--screening-text-muted)]">Vertical</span>
              <Stepper
                variant="vertical"
                value={STATIC_VALUE}
                onValueChange={() => {}}
                className="pointer-events-none select-none"
                aria-label="Vertical stepper (static reference)"
              />
            </div>
          </div>
        </section>
      }
      code={stepperLabCode}
      usage={stepperLabUsage}
    />
  )
}
