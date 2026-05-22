import { useId, useState } from 'react'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import {
  ACE_TOGGLE_SIZE_LABELS,
  type AceToggleSize,
  type AceToggleVariant,
} from '../components/atoms/Toggle/toggleFieldStyles'
import { cn } from '../lib/cn'
import { LabRadioGroup, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

/** Column keys align with Figma state titles. */
type PreviewCol = 'active_off' | 'hover' | 'active_on' | 'inactive_off' | 'inactive_on'

const COLUMNS: { key: PreviewCol; label: string }[] = [
  { key: 'active_off', label: 'Active & unselected' },
  { key: 'hover', label: 'Hover' },
  { key: 'active_on', label: 'Active & selected' },
  { key: 'inactive_off', label: 'Inactive & unselected' },
  { key: 'inactive_on', label: 'Inactive & selected' },
]

const SECTIONS: { title: string; withLabel: boolean; size: AceToggleSize; variant?: AceToggleVariant }[] = [
  { title: 'Standard / With text / Small', withLabel: true, size: 'sm' },
  { title: 'Standard / Without text / Small', withLabel: false, size: 'sm' },
  { title: 'Standard / With text / Large', withLabel: true, size: 'md' },
  { title: 'Standard / Without text / Large', withLabel: false, size: 'md' },
  { title: 'Icon / Small', withLabel: false, size: 'sm', variant: 'icon' },
  { title: 'Icon / Large', withLabel: false, size: 'md', variant: 'icon' },
]

const labelClass: Record<AceToggleSize, string> = {
  sm: 'text-sm text-[var(--screening-text-primary)] font-[family-name:var(--font-screening)]',
  md: 'text-sm text-[var(--screening-text-primary)] font-[family-name:var(--font-screening)] font-medium',
}

function PreviewCell({
  col,
  size,
  withLabel,
  variant = 'standard',
}: {
  col: PreviewCol
  size: AceToggleSize
  withLabel: boolean
  variant?: AceToggleVariant
}) {
  const isHover = col === 'hover'
  const checked = isHover ? false : col === 'active_on' || col === 'inactive_on'
  const disabled = isHover ? false : col === 'inactive_off' || col === 'inactive_on'

  const control = (
    <Toggle
      key={`${col}-${size}-${withLabel}-${variant}`}
      size={size}
      variant={variant}
      defaultChecked={checked}
      disabled={disabled}
      tabIndex={-1}
      className={cn(
        'pointer-events-none select-none',
        isHover && '!bg-[var(--ace-toggle-track-off-hover)]',
      )}
      aria-label={`${col} ${size}${withLabel ? ' with label' : ''}${variant === 'icon' ? ' icon' : ''}`}
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

type ToggleLabVariant = 'standard' | 'descriptive' | 'icon'

export function TogglePlaygroundLab() {
  const [variant, setVariant] = useState<ToggleLabVariant>('standard')
  const [size, setSize] = useState<AceToggleSize>('md')
  const [checked, setChecked] = useState(false)
  const toggleId = useId()

  const sizes: AceToggleSize[] = ['sm', 'md']

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      <LabSelect
        label="Variant"
        value={variant}
        onChange={(v) => setVariant(v as ToggleLabVariant)}
        options={[
          { value: 'standard', label: 'Standard' },
          { value: 'icon', label: 'Icon' },
          { value: 'descriptive', label: 'Descriptive Toggle' },
        ]}
      />
      <LabRadioGroup
        label="Size"
        value={size}
        onChange={setSize}
        options={sizes.map((s) => ({ value: s, label: ACE_TOGGLE_SIZE_LABELS[s] }))}
      />
    </div>
  )

  return (
    <ComponentLabPage
      title="Toggles"
      description="ACE Design System v.3 toggles: binary switch with active/inactive (disabled) tracks, white or icon thumb, and optional descriptive layout. Built on Radix Switch with --ace-toggle-* tokens."
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
            {variant === 'standard' ? (
              <label className="inline-flex cursor-pointer items-center gap-2" htmlFor={toggleId}>
                <Toggle size={size} checked={checked} onCheckedChange={setChecked} id={toggleId} />
                <span className={labelClass[size]}>{checked ? 'On' : 'Off'}</span>
              </label>
            ) : variant === 'icon' ? (
              <Toggle
                size={size}
                variant="icon"
                checked={checked}
                onCheckedChange={setChecked}
                aria-label={checked ? 'On' : 'Off'}
              />
            ) : (
              <DescriptivePattern size={size} />
            )}
          </div>

          <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
            <div className="max-w-3xl space-y-2">
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Matches the Figma state matrix: active vs inactive (disabled) × off vs on, plus hover (unselected track).
                All variants share the same track padding (
                <code className="text-[var(--screening-text-primary)]">--ace-toggle-track-padding</code>, 4px) and
                neutral 200 / purple track tokens; Icon rows add a white check and dark X in the track with a white thumb.
                Sizes: Small (<code className="text-[var(--screening-text-primary)]">sm</code>) and Large (
                <code className="text-[var(--screening-text-primary)]">md</code>) only.
              </p>
            </div>
            <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
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
                            variant={section.variant}
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
        <ComponentLabCode>{`import { Toggle } from '../components/atoms/Toggle/Toggle'

<label className="flex cursor-pointer items-center gap-2" htmlFor="notifications">
  <Toggle size="md" checked={on} onCheckedChange={setOn} id="notifications" />
  <span className="text-sm text-[var(--screening-text-primary)]">Notifications</span>
</label>`}</ComponentLabCode>
      }
      usage={
        <div className="space-y-3 text-[var(--color-text-muted)]">
          <p className="m-0 leading-relaxed">
            Import <code className="text-[var(--color-text-primary)]">Toggle</code> from the atoms folder. It wraps Radix{' '}
            <code className="text-[var(--color-text-primary)]">Switch</code> with <code className="text-[var(--color-text-primary)]">checked</code> /{' '}
            <code className="text-[var(--color-text-primary)]">onCheckedChange</code> (boolean).
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Standard</strong> — toggle beside a single label that reflects the current state (e.g. Off / On).
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Icon</strong> — same tracks and white thumb as standard; white check on purple when on, dark X on neutral 200 when off (no adjacent Off/On label). Sizes: Small and Large only.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Descriptive Toggle</strong> — switch with YES / NO under the control and a supporting text block (Figma descriptive pattern).
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Track padding</strong> —{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-toggle-track-padding</code> (4px) on every variant;
            sizes above are tuned for that inset.
          </p>
        </div>
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
            <code className="text-[var(--color-text-primary)]">--ace-toggle-track-padding</code>, icon glyphs{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-icon-glyph-off</code> /{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-icon-glyph-on</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-focus-ring</code>.
          </li>
        </ul>
      }
    />
  )
}
