import { useState } from 'react'
import type { CheckedState } from '@radix-ui/react-checkbox'
import { Checkbox } from '../components/atoms/Checkbox/Checkbox'
import type { AceCheckboxSize } from '../components/atoms/Checkbox/checkboxFieldStyles'
import { LabRadioGroup } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'

type PreviewCol = 'regular' | 'hover' | 'active' | 'disabled' | 'disabled_selected'

const COLUMNS: { key: PreviewCol; label: string }[] = [
  { key: 'regular', label: 'Regular' },
  { key: 'hover', label: 'Hover' },
  { key: 'active', label: 'Active' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'disabled_selected', label: 'Disabled selected' },
]

const SECTIONS: { title: string; withLabel: boolean; size: AceCheckboxSize }[] = [
  { title: 'With text / Small', withLabel: true, size: 'sm' },
  { title: 'Without text / Small', withLabel: false, size: 'sm' },
  { title: 'With text / Medium', withLabel: true, size: 'md' },
  { title: 'Without text / Medium', withLabel: false, size: 'md' },
  { title: 'With text / Large', withLabel: true, size: 'lg' },
  { title: 'Without text / Large', withLabel: false, size: 'lg' },
]

const labelClass: Record<AceCheckboxSize, string> = {
  sm: 'text-sm text-[var(--screening-text-primary)] font-[family-name:var(--font-screening)]',
  md: 'text-sm text-[var(--screening-text-primary)] font-[family-name:var(--font-screening)] font-medium',
  lg: 'text-base text-[var(--screening-text-primary)] font-[family-name:var(--font-screening)] font-medium',
}

function PreviewCell({
  col,
  size,
  withLabel,
}: {
  col: PreviewCol
  size: AceCheckboxSize
  withLabel: boolean
}) {
  const checked = col === 'active' || col === 'disabled_selected'
  const disabled = col === 'disabled' || col === 'disabled_selected'
  const hoverVisual = col === 'hover'

  const box = (
    <Checkbox
      size={size}
      checked={checked}
      disabled={disabled}
      tabIndex={-1}
      className={cn(
        'pointer-events-none select-none',
        hoverVisual &&
          'border-[var(--screening-primary)] ring-2 ring-[var(--screening-primary-ring)] ring-offset-0',
      )}
      aria-label={`${col} ${size}${withLabel ? ' with label' : ''}`}
    />
  )

  if (!withLabel) {
    return <div className="flex justify-center">{box}</div>
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {box}
      <span className={labelClass[size]}>Label</span>
    </div>
  )
}

export function CheckboxPlaygroundLab() {
  const [size, setSize] = useState<AceCheckboxSize>('md')
  const [a, setA] = useState(false)
  const [b, setB] = useState(true)
  const [c, setC] = useState<CheckedState>('indeterminate')

  const sizes: AceCheckboxSize[] = ['sm', 'md', 'lg']

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      <LabRadioGroup label="Size" value={size} onChange={setSize} options={sizes.map((s) => ({ value: s, label: s }))} />
    </div>
  )

  return (
    <ComponentLabPage
      title="Checkboxes"
      description="ACE Design System v.3 checkboxes: with or without label, small / medium / large hit targets, and states (regular, hover, active/checked, disabled, disabled selected). Built on Radix Checkbox with screening color tokens."
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-12">
          <div
            className={cn(
              'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8',
              labExampleSectionClass,
            )}
          >
            <p className={labSectionLabelClass}>Interactive</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox size={size} checked={a} onCheckedChange={(v) => setA(v === true)} />
                <span className={labelClass[size]}>Unchecked</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox size={size} checked={b} onCheckedChange={(v) => setB(v === true)} />
                <span className={labelClass[size]}>Checked</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox size={size} checked={c} onCheckedChange={setC} />
                <span className={labelClass[size]}>Indeterminate</span>
              </label>
            </div>
            <p className="mt-4 m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Hover an unchecked box to see the focus ring treatment. Use the size control above.
            </p>
          </div>

          <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
            <div className="max-w-3xl space-y-2">
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Matches the Figma matrix. The Hover column uses a forced border + ring on an unchecked control; use the
                interactive row to feel real hover.
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
                          <PreviewCell col={col.key} size={section.size} withLabel={section.withLabel} />
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
        <ComponentLabCode>{`import { Checkbox } from '../components/atoms/Checkbox/Checkbox'

<label className="flex items-center gap-2">
  <Checkbox size="sm" checked={on} onCheckedChange={(v) => setOn(v === true)} />
  <span>Label</span>
</label>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
          Import <code className="text-[var(--color-text-primary)]">Checkbox</code> from the atoms folder. Pass{' '}
          <code className="text-[var(--color-text-primary)]">size</code> for hit area; pair with a visible{' '}
          <code className="text-[var(--color-text-primary)]">label</code> for “with text” variants.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">aceCheckboxClass()</code> in{' '}
            <code className="text-[var(--color-text-primary)]">checkboxFieldStyles.ts</code> — combines surface + size;
            used by the atom by default.
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--screening-checkbox-border</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-checkbox-disabled-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-primary-ring</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--radius-checkbox</code>.
          </li>
        </ul>
      }
    />
  )
}
