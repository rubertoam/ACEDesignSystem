import { useId, useState } from 'react'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import type { AceToggleSize } from '../components/atoms/Toggle/toggleFieldStyles'
import { cn } from '../lib/cn'
import { LabRadioGroup } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const FIGMA_URL =
  'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=117-1265&m=dev'

/** Column keys align with Figma state titles. */
type PreviewCol = 'active_off' | 'active_on' | 'inactive_off' | 'inactive_on'

const COLUMNS: { key: PreviewCol; label: string }[] = [
  { key: 'active_off', label: 'Active & unselected' },
  { key: 'active_on', label: 'Active & selected' },
  { key: 'inactive_off', label: 'Inactive & unselected' },
  { key: 'inactive_on', label: 'Inactive & selected' },
]

const SECTIONS: { title: string; withLabel: boolean; size: AceToggleSize }[] = [
  { title: 'With text / Small', withLabel: true, size: 'sm' },
  { title: 'Without text / Small', withLabel: false, size: 'sm' },
  { title: 'With text / Medium', withLabel: true, size: 'md' },
  { title: 'Without text / Medium', withLabel: false, size: 'md' },
  { title: 'With text / Large', withLabel: true, size: 'lg' },
  { title: 'Without text / Large', withLabel: false, size: 'lg' },
]

const labelClass: Record<AceToggleSize, string> = {
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
  size: AceToggleSize
  withLabel: boolean
}) {
  const checked = col === 'active_on' || col === 'inactive_on'
  const disabled = col === 'inactive_off' || col === 'inactive_on'

  const control = (
    <Toggle
      key={`${col}-${size}-${withLabel}`}
      size={size}
      defaultChecked={checked}
      disabled={disabled}
      tabIndex={-1}
      className="pointer-events-none select-none"
      aria-label={`${col} ${size}${withLabel ? ' with label' : ''}`}
    />
  )

  if (!withLabel) {
    return <div className="flex justify-center">{control}</div>
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {control}
      <span className={labelClass[size]}>Label</span>
    </div>
  )
}

function DescriptivePattern({ size }: { size: AceToggleSize }) {
  const [on, setOn] = useState(false)
  const toggleId = useId()
  return (
    <div className="flex max-w-sm flex-wrap gap-6 rounded-[var(--radius-sm)] border border-[var(--screening-border-strong)] bg-[var(--color-surface)] p-3 sm:flex-nowrap">
      <div className="flex shrink-0 flex-col items-center gap-3 pt-1">
        <Toggle size={size} checked={on} onCheckedChange={setOn} id={toggleId} />
        <label
          htmlFor={toggleId}
          className="cursor-pointer text-xs leading-[1.65] font-normal whitespace-nowrap text-[var(--ace-toggle-track-on)]"
        >
          {on ? 'YES' : 'NO'}
        </label>
      </div>
      <div className="min-w-0 flex-1 space-y-2 leading-[1.65] text-[var(--screening-text-primary)]">
        <p className="m-0 text-xs font-semibold">Descriptive Toggle Component</p>
        <p className="m-0 text-[10px] tracking-[0.02em] text-[var(--screening-text-secondary)]">
          Contextual text block describing to the user what this toggle is supposed to do.
        </p>
      </div>
    </div>
  )
}

export function TogglePlaygroundLab() {
  const [size, setSize] = useState<AceToggleSize>('md')
  const [a, setA] = useState(false)
  const [b, setB] = useState(true)
  const offId = useId()
  const onId = useId()

  const sizes: AceToggleSize[] = ['sm', 'md', 'lg']

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      <LabRadioGroup label="Size" value={size} onChange={setSize} options={sizes.map((s) => ({ value: s, label: s }))} />
    </div>
  )

  return (
    <ComponentLabPage
      title="Toggles"
      description="ACE Design System v.3 toggles: binary switch with active/inactive (disabled) tracks, white thumb, and optional descriptive layout. Built on Radix Switch with --ace-toggle-* tokens."
      figmaUrl={FIGMA_URL}
      figmaLinkLabel="Toggles in Figma"
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
            <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:gap-10">
              <label className="flex cursor-pointer items-center gap-2" htmlFor={offId}>
                <Toggle size={size} checked={a} onCheckedChange={setA} id={offId} />
                <span className={labelClass[size]}>Off</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2" htmlFor={onId}>
                <Toggle size={size} checked={b} onCheckedChange={setB} id={onId} />
                <span className={labelClass[size]}>On</span>
              </label>
              <div className="min-w-0 space-y-2">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Descriptive pattern
                </p>
                <DescriptivePattern size={size} />
              </div>
            </div>
            <p className="mt-4 m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Hover enabled tracks for a slightly stronger fill. Focus the switch with the keyboard to see the ring.
            </p>
          </div>

          <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
            <div className="max-w-3xl space-y-2">
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Matches the Figma state row: active vs inactive (disabled) × off vs on.
              </p>
            </div>
            <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
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
        <ComponentLabCode>{`import { Toggle } from '../components/atoms/Toggle/Toggle'

<label className="flex cursor-pointer items-center gap-2" htmlFor="notifications">
  <Toggle size="md" checked={on} onCheckedChange={setOn} id="notifications" />
  <span className="text-sm text-[var(--screening-text-primary)]">Notifications</span>
</label>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
          Import <code className="text-[var(--color-text-primary)]">Toggle</code> from the atoms folder. It wraps Radix{' '}
          <code className="text-[var(--color-text-primary)]">Switch</code> with <code className="text-[var(--color-text-primary)]">checked</code> /{' '}
          <code className="text-[var(--color-text-primary)]">onCheckedChange</code> (boolean). Pair with a visible label for accessibility.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">aceToggleClass()</code> /{' '}
            <code className="text-[var(--color-text-primary)]">aceToggleThumbClass()</code> in{' '}
            <code className="text-[var(--color-text-primary)]">toggleFieldStyles.ts</code> — used by the atom.
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-toggle-track-off</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-track-on</code>, hover variants, disabled tracks,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-thumb</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-focus-ring</code>.
          </li>
        </ul>
      }
    />
  )
}
