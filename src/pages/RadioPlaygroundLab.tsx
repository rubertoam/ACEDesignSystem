import { useState } from 'react'
import { RadioGroup, RadioItem } from '../components/atoms/Radio/RadioGroup'
import {
  aceRadioFieldClass,
  aceRadioFieldInteractiveClass,
  type AceRadioFieldState,
  type AceRadioSize,
} from '../components/atoms/Radio/radioFieldStyles'
import { LabRadioGroup } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'

const FIGMA_URL =
  'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=331-1755&m=dev'

type PreviewCol = 'regular' | 'hover' | 'active' | 'disabled' | 'disabled_selected'

const COLUMNS: { key: PreviewCol; label: string }[] = [
  { key: 'regular', label: 'Regular' },
  { key: 'hover', label: 'Hover' },
  { key: 'active', label: 'Active' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'disabled_selected', label: 'Disabled selected' },
]

type SectionRow = { title: string; withLabel: boolean; size: AceRadioSize; field?: boolean }

const SECTIONS: SectionRow[] = [
  { title: 'With text / Small', withLabel: true, size: 'sm' },
  { title: 'Without text / Small', withLabel: false, size: 'sm' },
  { title: 'With text / Medium', withLabel: true, size: 'md' },
  { title: 'Without text / Medium', withLabel: false, size: 'md' },
  { title: 'With text / Large', withLabel: true, size: 'lg' },
  { title: 'Without text / Large', withLabel: false, size: 'lg' },
  { title: 'With background / Medium', withLabel: true, size: 'md', field: true },
]

const labelClass: Record<AceRadioSize, string> = {
  sm: 'text-sm text-[var(--screening-text-primary)] font-[family-name:var(--font-screening)]',
  md: 'text-sm text-[var(--screening-text-primary)] font-[family-name:var(--font-screening)] font-medium',
  lg: 'text-base text-[var(--screening-text-primary)] font-[family-name:var(--font-screening)] font-medium',
}

function fieldStateFromColumn(col: PreviewCol): AceRadioFieldState {
  if (col === 'regular') return 'default'
  if (col === 'hover') return 'hover'
  if (col === 'active') return 'active'
  return 'disabled'
}

function PreviewCell({
  col,
  size,
  withLabel,
  field,
}: {
  col: PreviewCol
  size: AceRadioSize
  withLabel: boolean
  field?: boolean
}) {
  const checked = col === 'active' || col === 'disabled_selected'
  const disabled = col === 'disabled' || col === 'disabled_selected'
  const hoverVisual = col === 'hover' && !disabled

  const groupValue = checked ? 'preview' : ''

  const fauxHoverClass =
    hoverVisual ? '[&>span:first-child]:border-[var(--ace-radio-border-hover)] [&>span:first-child]:bg-[var(--ace-radio-surface-hover)]' : undefined

  const control = (
    <RadioGroup
      value={groupValue}
      onValueChange={() => {}}
      className={cn('inline-flex max-w-full', field ? 'justify-start' : 'justify-center')}
    >
      <RadioItem
        value="preview"
        size={size}
        disabled={disabled}
        tabIndex={-1}
        className={cn('pointer-events-none select-none', fauxHoverClass)}
        aria-label={`${col} ${size}${withLabel ? ' with label' : ''}${field ? ' field' : ''}`}
      >
        {withLabel ? (
          <span
            className={cn(
              'min-w-0 truncate',
              labelClass[size],
              disabled && 'text-[var(--ace-radio-label-disabled)]',
            )}
          >
            Label
          </span>
        ) : null}
      </RadioItem>
    </RadioGroup>
  )

  if (field) {
    return (
      <div className="flex w-full justify-start">
        <div className={aceRadioFieldClass(fieldStateFromColumn(col))}>{control}</div>
      </div>
    )
  }

  return <div className="flex justify-center">{control}</div>
}

export function RadioPlaygroundLab() {
  const [size, setSize] = useState<AceRadioSize>('md')
  const [value, setValue] = useState('a')
  const [fieldChecked, setFieldChecked] = useState(false)
  const sizes: AceRadioSize[] = ['sm', 'md', 'lg']

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      <LabRadioGroup label="Size" value={size} onChange={setSize} options={sizes.map((s) => ({ value: s, label: s }))} />
    </div>
  )

  return (
    <ComponentLabPage
      title="Radio buttons"
      description="ACE Design System v.3 radio controls: small / medium / large circles, states (regular, hover, active, disabled, disabled selected), and optional field wrapper. Built on Radix Radio Group with --ace-radio-* tokens."
      figmaUrl={FIGMA_URL}
      figmaLinkLabel="Radio Buttons in Figma"
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-12">
          <div
            className={cn(
              'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8',
              labExampleSectionClass,
            )}
          >
            <p className={labSectionLabelClass}>Interactive — plain</p>
            <RadioGroup
              value={value}
              onValueChange={setValue}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6"
              aria-label="Example radio group"
            >
              <RadioItem value="a" size={size} id="radio-lab-a">
                <span className={labelClass[size]}>Option A</span>
              </RadioItem>
              <RadioItem value="b" size={size} id="radio-lab-b">
                <span className={labelClass[size]}>Option B</span>
              </RadioItem>
              <RadioItem value="c" size={size} id="radio-lab-c">
                <span className={labelClass[size]}>Option C</span>
              </RadioItem>
            </RadioGroup>
            <p className="mt-4 m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Use arrow keys inside the group; hover an unchecked option for the filled hover ring. Size follows the control above.
            </p>
          </div>

          <div
            className={cn(
              'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8',
              labExampleSectionClass,
            )}
          >
            <p className={labSectionLabelClass}>Interactive — with background</p>
            <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
              One radio + label inside <code className="text-[var(--color-text-primary)]">aceRadioFieldInteractiveClass()</code>. Hover fills the field with Primary/50 (#EFEEF9); selected state adds the purple border (Figma With background).
            </p>
            <div className="flex justify-start">
              <div className={aceRadioFieldInteractiveClass({ checked: fieldChecked })}>
              <RadioGroup
                value={fieldChecked ? 'field-on' : ''}
                onValueChange={(v) => {
                  if (v === 'field-on') {
                    setFieldChecked(true)
                  }
                }}
                className="inline-flex"
                aria-label="Single radio in field"
              >
                <RadioItem value="field-on" size={size} id="radio-lab-field-single">
                  <span className={labelClass[size]}>Radio Button</span>
                </RadioItem>
              </RadioGroup>
            </div>
            </div>
            {!fieldChecked ? (
              <p className="mt-3 m-0 text-xs text-[var(--color-text-muted)]">
                Select the radio to apply the active field border (Figma “With background” / Active).
              </p>
            ) : null}
          </div>

          <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
            <div className="max-w-3xl space-y-2">
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Matches the Figma matrix. Hover uses a faux fill on the circle; use the interactive group for real hover.
              </p>
            </div>
            <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                    <th className="min-w-[12rem] px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                      Variant
                    </th>
                    {COLUMNS.map((c) => (
                      <th
                        key={c.key}
                        className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
                  {SECTIONS.map((section) => (
                    <tr key={section.title}>
                      <td className="px-4 py-4 font-medium text-[var(--color-text-primary)]">{section.title}</td>
                      {COLUMNS.map((col) => (
                        <td key={col.key} className="px-4 py-4 align-middle">
                          <PreviewCell
                            col={col.key}
                            size={section.size}
                            withLabel={section.withLabel}
                            field={section.field}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      }
      code={
        <ComponentLabCode>{`import { RadioGroup, RadioItem } from '../components/atoms/Radio/RadioGroup'

<RadioGroup value={v} onValueChange={setV}>
  <RadioItem value="a" size="md">Option A</RadioItem>
  <RadioItem value="b" size="md">Option B</RadioItem>
</RadioGroup>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
          Import <code className="text-[var(--color-text-primary)]">RadioGroup</code> and{' '}
          <code className="text-[var(--color-text-primary)]">RadioItem</code>. Set <code className="text-[var(--color-text-primary)]">value</code> /{' '}
          <code className="text-[var(--color-text-primary)]">onValueChange</code> on the group; each item needs a unique{' '}
          <code className="text-[var(--color-text-primary)]">value</code> string. Optional label text goes as children of the item.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">aceRadioControlClass()</code>,{' '}
            <code className="text-[var(--color-text-primary)]">aceRadioIndicatorClass()</code>,{' '}
            <code className="text-[var(--color-text-primary)]">aceRadioFieldClass()</code> in{' '}
            <code className="text-[var(--color-text-primary)]">radioFieldStyles.ts</code>.
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-radio-border-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-radio-indicator-*</code>, field tokens{' '}
            <code className="text-[var(--color-text-primary)]">--ace-radio-field-*</code>.
          </li>
        </ul>
      }
    />
  )
}
