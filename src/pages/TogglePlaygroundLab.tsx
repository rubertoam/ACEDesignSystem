import { useId, useState } from 'react'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import {
  ACE_TOGGLE_SIZE_LABELS,
  aceToggleLabelClass,
  aceToggleLabelDisabledClass,
  type AceToggleSize,
  type AceToggleVariant,
} from '../components/atoms/Toggle/toggleFieldStyles'
import { cn } from '../lib/cn'
import { LabRadioGroup, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
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
      <span className={cn(aceToggleLabelClass, disabled && aceToggleLabelDisabledClass)}>Label</span>
    </div>
  )
}

function DescriptivePattern({ size }: { size: AceToggleSize }) {
  const [on, setOn] = useState(false)
  const toggleId = useId()
  return (
    <div className="flex max-w-sm flex-wrap gap-6 rounded-[var(--radius-sm)] border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-3 sm:flex-nowrap">
      <div className="flex shrink-0 flex-col items-center gap-3 pt-1">
        <Toggle size={size} checked={on} onCheckedChange={setOn} id={toggleId} />
        <label
          htmlFor={toggleId}
          className="cursor-pointer whitespace-nowrap text-[var(--color-text-brand)] [font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]"
        >
          {on ? 'YES' : 'NO'}
        </label>
      </div>
      <div className="min-w-0 flex-1 space-y-2 text-[var(--color-text-primary)]">
        <p className="m-0 text-xs font-bold leading-normal">Descriptive Toggle Component</p>
        <p className="m-0 text-[10px] leading-normal tracking-[0.02em] text-[var(--color-text-primary)]">
          Contextual text block describing to the user what this toggle is supposed to do.
        </p>
      </div>
    </div>
  )
}

function TogglesChangelog() {
  return (
    <div className="space-y-8">
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">20 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with ACE Design System v.3 Figma Toggles (
            <code className="text-[var(--color-text-primary)]">117:1265</code> / component set{' '}
            <code className="text-[var(--color-text-primary)]">5283:2831</code>, Descriptive{' '}
            <code className="text-[var(--color-text-primary)]">4081:1009</code>) and semantic color/typography tokens.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Rewired toggle track, thumb, icon glyph, and focus colors from hard-coded hex / coal-grey aliases to
            semantic <code className="text-[var(--color-text-primary)]">--color-*</code> tokens (
            <code className="text-[var(--color-text-primary)]">bg/secondary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/brand-hover</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/brand</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/disabled-subtle</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/brand-subtle</code>,{' '}
            <code className="text-[var(--color-text-primary)]">surface/primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">icon/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">border/focus</code>).
          </li>
          <li>
            Hover (unselected) now uses lavender brand-hover fill (
            <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code>) instead of Neutral gray
            <code className="text-[var(--color-text-primary)]"> #dfe2e8</code>.
          </li>
          <li>
            Labels use Caption/Regular (
            <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>) for Small and Large;
            Descriptive YES/NO uses <code className="text-[var(--color-text-primary)]">colors/text/brand</code>.
          </li>
          <li>
            Dark theme toggle hex overrides removed; colors follow{' '}
            <code className="text-[var(--color-text-primary)]">color-tokens.css</code> semantic dark mappings.
          </li>
          <li>Added this Changelog tab documenting the Toggles update.</li>
          <li>
            Usage tab updated to list the semantic color and type tokens used per state (active unselected, hover,
            active selected, inactive unselected, inactive selected).
          </li>
        </ul>
      </article>
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
      description="ACE Design System v.3 toggles (Figma 117:1265 / set 5283:2831): Standard or Icon; Small / Large (36×20 / 44×24); with or without label; Active unselected, Hover, Active selected, Inactive unselected, Inactive selected; Descriptive Toggle pattern (4081:1009). Colors and type wired to semantic --color-* and --ace-type-* tokens."
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
                <span className={aceToggleLabelClass}>{checked ? 'On' : 'Off'}</span>
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
            <div className={cn('max-w-3xl', labUsageSectionClass)}>
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Matches the Figma state matrix: active vs inactive (disabled) × off vs on, plus hover (unselected
                track with brand-hover fill). All variants share the same track padding (
                <code className="text-[var(--color-text-primary)]">--ace-toggle-track-padding</code>, 4px). Icon rows
                add a white check and dark X in the track with a white thumb. Sizes: Small (
                <code className="text-[var(--color-text-primary)]">sm</code>) and Large (
                <code className="text-[var(--color-text-primary)]">md</code>) only.
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
import { aceToggleLabelClass } from '../components/atoms/Toggle/toggleFieldStyles'

<label className="flex cursor-pointer items-center gap-2" htmlFor="notifications">
  <Toggle size="md" checked={on} onCheckedChange={setOn} id="notifications" />
  <span className={aceToggleLabelClass}>Notifications</span>
</label>`}</ComponentLabCode>
      }
      usage={
        <div className={cn('max-w-3xl space-y-4', labUsageSectionClass)}>
          <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
            Import <code className="text-[var(--color-text-primary)]">Toggle</code> from the atoms folder. It wraps
            Radix <code className="text-[var(--color-text-primary)]">Switch</code> with{' '}
            <code className="text-[var(--color-text-primary)]">checked</code> /{' '}
            <code className="text-[var(--color-text-primary)]">onCheckedChange</code> (boolean). Pass{' '}
            <code className="text-[var(--color-text-primary)]">size</code> (
            <code className="text-[var(--color-text-primary)]">sm</code> |{' '}
            <code className="text-[var(--color-text-primary)]">md</code>) and optional{' '}
            <code className="text-[var(--color-text-primary)]">variant=&quot;icon&quot;</code>. Pair with{' '}
            <code className="text-[var(--color-text-primary)]">aceToggleLabelClass</code> for “with text” variants.
          </p>
          <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
            <strong className="font-medium text-[var(--color-text-primary)]">Standard</strong>: toggle beside a label.
            <strong className="font-medium text-[var(--color-text-primary)]"> Icon</strong>: white check on brand when
            on, dark X on secondary track when off.
            <strong className="font-medium text-[var(--color-text-primary)]"> Descriptive</strong>: YES/NO under the
            control plus a supporting text block (Figma <code className="text-[var(--color-text-primary)]">4081:1009</code>
            ).
          </p>
          <div className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--color-text-primary)]">Tokens in use</h4>
            <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Active &amp; unselected</strong> —
                track <code className="text-[var(--color-text-primary)]">colors/bg/secondary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-bg-secondary</code>; thumb{' '}
                <code className="text-[var(--color-text-primary)]">colors/surface/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>; label{' '}
                <code className="text-[var(--color-text-primary)]">colors/text/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-text-primary</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Hover</strong> — track{' '}
                <code className="text-[var(--color-text-primary)]">colors/bg/brand-hover</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Active &amp; selected</strong> — track{' '}
                <code className="text-[var(--color-text-primary)]">colors/bg/brand</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-bg-brand</code>; selected hover{' '}
                <code className="text-[var(--color-text-primary)]">colors/action/primary-hover</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-action-primary-hover</code>; icon check{' '}
                <code className="text-[var(--color-text-primary)]">colors/icon/inverse</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-icon-inverse</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Inactive &amp; unselected</strong> —
                track <code className="text-[var(--color-text-primary)]">colors/bg/disabled-subtle</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-bg-disabled-subtle</code>; label{' '}
                <code className="text-[var(--color-text-primary)]">colors/text/disabled</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-text-disabled</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Inactive &amp; selected</strong> — track{' '}
                <code className="text-[var(--color-text-primary)]">colors/bg/brand-subtle</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-bg-brand-subtle</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Icon (off)</strong> — X glyph{' '}
                <code className="text-[var(--color-text-primary)]">colors/icon/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-icon-primary</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Focus</strong> — ring{' '}
                <code className="text-[var(--color-text-primary)]">colors/border/focus</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-border-focus</code>; offset{' '}
                <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Descriptive</strong> — border{' '}
                <code className="text-[var(--color-text-primary)]">colors/border/default</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-border-default</code>; YES/NO{' '}
                <code className="text-[var(--color-text-primary)]">colors/text/brand</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-text-brand</code>; surface{' '}
                <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Type</strong> — Caption/Regular{' '}
                <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code> for labels
                (Small and Large). Track sizes 36×20 / 44×24 via <code className="text-[var(--color-text-primary)]">size</code>.
              </li>
            </ul>
          </div>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Off: <code className="text-[var(--color-text-primary)]">--ace-toggle-track-off</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-secondary</code>; thumb{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-thumb</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>; label{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-primary</code>.
          </li>
          <li>
            Hover: <code className="text-[var(--color-text-primary)]">--ace-toggle-track-off-hover</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code>.
          </li>
          <li>
            On: <code className="text-[var(--color-text-primary)]">--ace-toggle-track-on</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand</code>; on-hover{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-track-on-hover</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-primary-hover</code>; check{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-icon-glyph-on</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-icon-inverse</code>.
          </li>
          <li>
            Inactive: <code className="text-[var(--color-text-primary)]">--ace-toggle-track-disabled-off</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-disabled-subtle</code>;{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-track-disabled-on</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand-subtle</code>; label{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-disabled</code>.
          </li>
          <li>
            Icon off: <code className="text-[var(--color-text-primary)]">--ace-toggle-icon-glyph-off</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-icon-primary</code>. Focus:{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-focus-ring</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-focus</code>.
          </li>
          <li>
            Descriptive: <code className="text-[var(--color-text-primary)]">--color-border-default</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-brand</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>.
          </li>
          <li>
            Type: <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>. Padding{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-track-padding</code>.
          </li>
        </ul>
      }
      changelog={<TogglesChangelog />}
    />
  )
}
