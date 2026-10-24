import { useState } from 'react'
import { Stepper, type StepperVariant } from '../components/molecules/Stepper'
import { LabCheckbox, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { labComponentContainerClass } from '../lib/labChrome'
import { ComponentLabPage } from './ComponentLabPage'
import { stepperLabCode, stepperLabQa, stepperLabUsage } from './labTabDocs'
import { cn } from '../lib/cn'

const VARIANTS: { value: StepperVariant; label: string }[] = [
  { value: 'horizontal', label: 'Horizontal Stepper' },
  { value: 'vertical', label: 'Vertical Stepper' },
]

export function SteppersLab() {
  const [variant, setVariant] = useState<StepperVariant>('horizontal')
  const [value, setValue] = useState(5)
  const [disabled, setDisabled] = useState(false)

  return (
    <ComponentLabPage
      qa={stepperLabQa}
      title="Steppers"
      description="Numeric steppers for adjusting values. Horizontal uses minus and plus; Vertical uses chevrons above and below the value."
      examplesToolbar={
        <div className="flex flex-wrap items-end gap-6">
          <LabSelect
            label="Variant"
            value={variant}
            onChange={setVariant}
            options={VARIANTS}
          />
          <LabCheckbox label="Disabled" checked={disabled} onCheckedChange={setDisabled} />
        </div>
      }
      examples={
        <div className="flex w-full flex-col gap-8">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>
              {variant === 'horizontal' ? 'Horizontal Stepper' : 'Vertical Stepper'}
            </p>
            <div className={labComponentContainerClass}>
              <div className="flex min-h-24 items-center justify-center p-6">
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

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Both variants</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-wrap items-end justify-center gap-10 p-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-[var(--screening-text-muted)]">Horizontal</span>
                  <Stepper variant="horizontal" value={value} onValueChange={setValue} disabled={disabled} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-[var(--screening-text-muted)]">Vertical</span>
                  <Stepper variant="vertical" value={value} onValueChange={setValue} disabled={disabled} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      code={stepperLabCode}
      usage={stepperLabUsage}
    />
  )
}
