import { useState } from 'react'
import { AceInputField, type AceInputFieldIcon, type AceInputFieldSize, type AceInputVisualState } from '../components/atoms/AceInputField'
import { cn } from '../lib/cn'
import { LabCheckbox, LabControlField, LabRadioGroup } from '../lib/labControls'
import { labExampleSectionClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const SIZES: AceInputFieldSize[] = ['sm', 'md', 'lg']
const VISUAL_STATES: AceInputVisualState[] = ['default', 'active', 'focus', 'error', 'disabled']

function StateMatrix({ icon }: { icon: AceInputFieldIcon }) {
  const iconLabel = icon === 'none' ? 'No icon' : icon === 'left' ? 'Icon left' : 'Icon right'
  return (
    <div className={cn('min-w-0', labExampleSectionClass)}>
      <p className="m-0 text-sm font-semibold text-[var(--color-text-primary)]">{iconLabel}</p>
      <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <th className="w-[8rem] px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                State
              </th>
              {SIZES.map((s) => (
                <th
                  key={s}
                  className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
            {VISUAL_STATES.map((st) => (
              <tr key={st}>
                <td className="whitespace-nowrap px-4 py-4 font-medium capitalize text-[var(--color-text-primary)]">{st}</td>
                {SIZES.map((sz) => (
                  <td key={sz} className="max-w-[14rem] px-4 py-4 align-top">
                    <AceInputField
                      fieldSize={sz}
                      icon={icon}
                      visualState={st}
                      placeholder="Placeholder"
                      label="Label"
                      aria-label={`${st} ${sz} ${icon}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function InputPlaygroundLab() {
  const [fieldSize, setFieldSize] = useState<AceInputFieldSize>('md')
  const [icon, setIcon] = useState<AceInputFieldIcon>('none')
  const [showLabel, setShowLabel] = useState(true)
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
      <LabRadioGroup
        label="Size"
        value={fieldSize}
        onChange={setFieldSize}
        options={SIZES.map((s) => ({ value: s, label: s }))}
      />
      <LabRadioGroup
        label="Icon"
        value={icon}
        onChange={setIcon}
        options={[
          { value: 'none', label: 'None' },
          { value: 'left', label: 'Left' },
          { value: 'right', label: 'Right' },
        ]}
      />
      <LabControlField label="Options" className="sm:col-span-2 lg:col-span-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <LabCheckbox label="Label" checked={showLabel} onCheckedChange={setShowLabel} />
          <LabCheckbox label="Error" checked={error} onCheckedChange={setError} />
          <LabCheckbox label="Disabled" checked={disabled} onCheckedChange={setDisabled} />
        </div>
      </LabControlField>
    </div>
  )

  return (
    <ComponentLabPage
      title="Input fields"
      description="ACE Design System v.3 text inputs: small, medium, and large heights; default, active (filled border), focus (lavender fill + ring), error (pink surface + message), and disabled. Icons optional (search). Tokens reuse screening input variables plus --ace-input-* in variables.css."
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-12">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
            <div className="max-w-md">
              <AceInputField
                fieldSize={fieldSize}
                icon={icon}
                label={showLabel ? 'Label' : undefined}
                error={error}
                disabled={disabled}
                placeholder="Placeholder"
                defaultValue=""
              />
              <p className="mt-4 m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Toggle options above. Tab into the field for focus styles; enable Error for validation layout.
              </p>
            </div>
          </div>

          <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
            <div className={cn('max-w-3xl', labUsageSectionClass)}>
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Rows match Figma states; columns are sizes. Each cell uses a frozen{' '}
                <code className="text-[var(--color-text-primary)]">visualState</code> (not focusable).
              </p>
            </div>
            <div className="flex flex-col gap-12">
              {(['none', 'left', 'right'] as const).map((ic) => (
                <StateMatrix key={ic} icon={ic} />
              ))}
            </div>
          </section>
        </div>
      }
      code={
        <ComponentLabCode>{`import { AceInputField } from '../components/atoms/AceInputField'

<AceInputField
  fieldSize="md"
  label="Email"
  placeholder="you@example.com"
  error={!valid}
  errorMessage="Enter a valid email"
/>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
          Use <code className="text-[var(--color-text-primary)]">AceInputField</code> for product forms. Pass{' '}
          <code className="text-[var(--color-text-primary)]">visualState</code> only for spec screenshots or QA grids.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--screening-input-border</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-input-border-focus</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-input-bg-focus</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-input-focus-ring</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-input-placeholder</code> - outline, active/focus
            border, focus fill, 2px ring, placeholder (shared with data table search).
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-input-height-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-input-font-*</code> - 36 / 44 / 52px heights and Inter
            text sizes from Figma.
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-input-error-*</code> - error surface, border, and
            helper text color (<code className="text-[var(--color-text-primary)]">#FDF4F6</code> /{' '}
            <code className="text-[var(--color-text-primary)]">#DC264B</code> / <code className="text-[var(--color-text-primary)]">#EF4444</code>).
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-input-disabled-*</code> - disabled field and text
            colors from Figma.
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--font-ace-inter</code> - input value and placeholder face.
          </li>
        </ul>
      }
    />
  )
}
