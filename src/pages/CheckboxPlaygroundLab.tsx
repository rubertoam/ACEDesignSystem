import { useState } from 'react'
import type { CheckedState } from '@radix-ui/react-checkbox'
import { Checkbox } from '../components/atoms/Checkbox/Checkbox'
import {
  aceCheckboxLabelClass,
  aceCheckboxLabelDisabledClass,
  type AceCheckboxSize,
} from '../components/atoms/Checkbox/checkboxFieldStyles'
import { LabRadioGroup } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
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
          'border-[var(--screening-checkbox-border-hover)] bg-[var(--screening-checkbox-bg-hover)] shadow-none',
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
      <span className={cn(aceCheckboxLabelClass[size], disabled && aceCheckboxLabelDisabledClass)}>
        Checkbox
      </span>
    </div>
  )
}

function CheckboxesChangelog() {
  return (
    <div className="space-y-8">
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">20 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with ACE Design System v.3 Figma Checkboxes (
            <code className="text-[var(--color-text-primary)]">317:1492</code> / component set{' '}
            <code className="text-[var(--color-text-primary)]">322:1747</code>) and semantic color/typography tokens.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Rewired checkbox borders, fills, inset, and label colors from hard-coded hex / coal-grey aliases to
            semantic <code className="text-[var(--color-text-primary)]">--color-*</code> tokens (
            <code className="text-[var(--color-text-primary)]">border/brand</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/brand-hover</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/brand</code>,{' '}
            <code className="text-[var(--color-text-primary)]">surface/primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">border/disabled</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/disabled</code>,{' '}
            <code className="text-[var(--color-text-primary)]">text/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">icon/inverse</code>).
          </li>
          <li>
            Regular state now uses brand border (
            <code className="text-[var(--color-text-primary)]">--color-border-brand</code>) instead of Coal Grey;
            hover keeps brand border with{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code> fill.
          </li>
          <li>
            Active / Disabled-Selected remain a filled square with a white inset ring (not a checkmark), matching
            the Checkbox component set.
          </li>
          <li>
            Label type: Caption/Regular (
            <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>) at Small; Body
            / Regular (
            <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code>) at Medium and
            Large. Box sizes 16 / 20 / 24; Large stroke 1.5px and radius{' '}
            <code className="text-[var(--color-text-primary)]">--radius-sm</code>.
          </li>
          <li>
            Dark theme checkbox hex overrides removed; colors follow{' '}
            <code className="text-[var(--color-text-primary)]">color-tokens.css</code> semantic dark mappings.
          </li>
          <li>Added this Changelog tab documenting the Checkboxes update.</li>
          <li>
            Usage tab updated to list the semantic color and type tokens used per state (regular, hover, active,
            disabled, disabled selected).
          </li>
        </ul>
      </article>
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
      description="ACE Design System v.3 checkboxes (Figma 317:1492 / set 322:1747): with or without text; small / medium / large (16 / 20 / 24); regular (brand border), hover (lavender fill), active (brand fill + white inset), disabled, disabled selected. Colors and type wired to semantic --color-* and --ace-type-* tokens."
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
                <span className={aceCheckboxLabelClass[size]}>Unchecked</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox size={size} checked={b} onCheckedChange={(v) => setB(v === true)} />
                <span className={aceCheckboxLabelClass[size]}>Checked</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox size={size} checked={c} onCheckedChange={setC} />
                <span className={aceCheckboxLabelClass[size]}>Indeterminate</span>
              </label>
            </div>
            <p className="mt-4 m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Hover an unchecked box for the brand border and lavender fill. Selected uses a filled square with a
              white inset ring (not a checkmark). Use the size control above.
            </p>
          </div>

          <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
            <div className={cn('max-w-3xl', labUsageSectionClass)}>
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Matches the Figma matrix (Regular, Hover, Active, Disabled, Disabled selected). Hover freezes brand
                hover chrome; Active is checked. Use the interactive row for live hover.
              </p>
            </div>
            <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                    <th className="min-w-[12rem] px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                      Variant
                    </th>
                    {COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
                      >
                        {col.label}
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
import { aceCheckboxLabelClass } from '../components/atoms/Checkbox/checkboxFieldStyles'

<label className="flex items-center gap-2">
  <Checkbox size="md" checked={on} onCheckedChange={(v) => setOn(v === true)} />
  <span className={aceCheckboxLabelClass.md}>Checkbox</span>
</label>`}</ComponentLabCode>
      }
      usage={
        <div className={cn('max-w-3xl space-y-4', labUsageSectionClass)}>
          <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
            Import <code className="text-[var(--color-text-primary)]">Checkbox</code> from the atoms folder. Pass{' '}
            <code className="text-[var(--color-text-primary)]">size</code> (<code className="text-[var(--color-text-primary)]">sm</code>{' '}
            | <code className="text-[var(--color-text-primary)]">md</code> |{' '}
            <code className="text-[var(--color-text-primary)]">lg</code>) for hit area; pair with{' '}
            <code className="text-[var(--color-text-primary)]">aceCheckboxLabelClass</code> for “with text” variants.
            Selected appearance is a brand fill with a white inset ring — not a checkmark glyph.
          </p>
          <div className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--color-text-primary)]">Tokens in use</h4>
            <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Regular</strong> — fill{' '}
                <code className="text-[var(--color-text-primary)]">colors/surface/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>; border{' '}
                <code className="text-[var(--color-text-primary)]">colors/border/brand</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-border-brand</code>; label{' '}
                <code className="text-[var(--color-text-primary)]">colors/text/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-text-primary</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Hover</strong> — fill{' '}
                <code className="text-[var(--color-text-primary)]">colors/bg/brand-hover</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code>; border{' '}
                <code className="text-[var(--color-text-primary)]">--color-border-brand</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Active</strong> — fill{' '}
                <code className="text-[var(--color-text-primary)]">colors/bg/brand</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-bg-brand</code>; border{' '}
                <code className="text-[var(--color-text-primary)]">--color-border-brand</code>; inset{' '}
                <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>; indeterminate bar{' '}
                <code className="text-[var(--color-text-primary)]">colors/icon/inverse</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-icon-inverse</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Disabled</strong> — border{' '}
                <code className="text-[var(--color-text-primary)]">colors/border/disabled</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-border-disabled</code>; transparent fill;
                label <code className="text-[var(--color-text-primary)]">colors/text/disabled</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-text-disabled</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Disabled selected</strong> — fill{' '}
                <code className="text-[var(--color-text-primary)]">colors/bg/disabled</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-bg-disabled</code>; inset{' '}
                <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Focus</strong> — ring{' '}
                <code className="text-[var(--color-text-primary)]">colors/border/focus</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-border-focus</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Type</strong> — Small label{' '}
                <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>; Medium / Large{' '}
                <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code>. Box sizes
                16 / 20 / 24 via <code className="text-[var(--color-text-primary)]">size</code>.
              </li>
            </ul>
          </div>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Regular: <code className="text-[var(--color-text-primary)]">--screening-checkbox-inner-bg</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>;{' '}
            <code className="text-[var(--color-text-primary)]">--screening-checkbox-border</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-brand</code>; label{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-primary</code>.
          </li>
          <li>
            Hover: <code className="text-[var(--color-text-primary)]">--screening-checkbox-bg-hover</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code>; border{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-brand</code>.
          </li>
          <li>
            Active: <code className="text-[var(--color-text-primary)]">--screening-checkbox-checked-bg</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand</code>; inset{' '}
            <code className="text-[var(--color-text-primary)]">--screening-checkbox-checked-inset</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>; bar{' '}
            <code className="text-[var(--color-text-primary)]">--color-icon-inverse</code>.
          </li>
          <li>
            Disabled: <code className="text-[var(--color-text-primary)]">--screening-checkbox-disabled-border</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-disabled</code>; selected fill{' '}
            <code className="text-[var(--color-text-primary)]">--screening-checkbox-disabled-checked-bg</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-disabled</code>; label{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-disabled</code>.
          </li>
          <li>
            Focus: <code className="text-[var(--color-text-primary)]">--color-border-focus</code>. Radius{' '}
            <code className="text-[var(--color-text-primary)]">--radius-checkbox</code> (sm/md) /{' '}
            <code className="text-[var(--color-text-primary)]">--radius-sm</code> (lg).
          </li>
          <li>
            Type: <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code> (sm);{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code> (md/lg).
          </li>
        </ul>
      }
      changelog={<CheckboxesChangelog />}
    />
  )
}
