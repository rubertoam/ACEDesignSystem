import { useState } from 'react'
import { AceStepper, type AceStepperVariant } from '../components/molecules/AceStepper'
import { LabCheckbox, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { labComponentContainerClass } from '../lib/labChrome'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'

const VARIANTS: { value: AceStepperVariant; label: string }[] = [
  { value: 'horizontal', label: 'Horizontal Stepper' },
  { value: 'vertical', label: 'Vertical Stepper' },
]

export function SteppersLab() {
  const [variant, setVariant] = useState<AceStepperVariant>('horizontal')
  const [value, setValue] = useState(5)
  const [disabled, setDisabled] = useState(false)

  return (
    <ComponentLabPage
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
                <AceStepper
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
                  <AceStepper variant="horizontal" value={value} onValueChange={setValue} disabled={disabled} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-[var(--screening-text-muted)]">Vertical</span>
                  <AceStepper variant="vertical" value={value} onValueChange={setValue} disabled={disabled} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      code={
        <ComponentLabCode>{`import { AceStepper } from '../components/molecules/AceStepper'

<AceStepper
  variant="horizontal"
  value={5}
  onValueChange={setValue}
/>

<AceStepper
  variant="vertical"
  value={5}
  onValueChange={setValue}
/>`}</ComponentLabCode>
      }
      usage={
        <ul className="m-0 list-disc space-y-1 ps-5 text-sm text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">variant=&quot;horizontal&quot;</code>: minus / plus
            controls flanking the value
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">variant=&quot;vertical&quot;</code>: chevrons above and
            below the value
          </li>
          <li>
            Bound with <code className="text-[var(--color-text-primary)]">value</code> /{' '}
            <code className="text-[var(--color-text-primary)]">onValueChange</code>; optional{' '}
            <code className="text-[var(--color-text-primary)]">min</code>,{' '}
            <code className="text-[var(--color-text-primary)]">max</code>, and{' '}
            <code className="text-[var(--color-text-primary)]">step</code>
          </li>
        </ul>
      }
    />
  )
}
