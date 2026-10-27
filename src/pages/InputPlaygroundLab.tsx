import { useState } from 'react'
import { Input, type InputIcon, type InputSize, type InputVisualState } from '../components/atoms/Input'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { cn } from '../lib/cn'
import { LabControlField, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'


import { inputLabQa } from './labTabDocs'
const SIZES: InputSize[] = ['sm', 'md', 'lg']
const VISUAL_STATES: InputVisualState[] = ['default', 'focus', 'error', 'disabled']

const SIZE_OPTIONS: { value: InputSize; label: string }[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

const ICON_OPTIONS: { value: InputIcon; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
]

function StateMatrix({ icon }: { icon: InputIcon }) {
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
                    <Input
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

function InputsChangelog() {
  return (
    <div className="space-y-8">
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">20 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with ACE Design System v.3 Figma Inputs (
            <code className="text-[var(--color-text-primary)]">408:1976</code>) and semantic color/typography tokens.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Rewired input borders, fills, text, and icons from hard-coded hex / screening aliases to semantic{' '}
            <code className="text-[var(--color-text-primary)]">--color-*</code> tokens (
            <code className="text-[var(--color-text-primary)]">border/default</code>,{' '}
            <code className="text-[var(--color-text-primary)]">border/brand</code>,{' '}
            <code className="text-[var(--color-text-primary)]">border/focus</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/brand-hover</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/error</code>,{' '}
            <code className="text-[var(--color-text-primary)]">border/error</code>,{' '}
            <code className="text-[var(--color-text-primary)]">bg/disabled-subtle</code>,{' '}
            <code className="text-[var(--color-text-primary)]">text/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">icon/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">surface/primary</code>).
          </li>
          <li>
            Corrected focus chrome: 1px inner{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-brand</code> + lavender{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code> fill + 2px outer ring{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-focus</code> (was inverted / outdated
            neutrals).
          </li>
          <li>
            Removed Figma-absent <code className="text-[var(--color-text-primary)]">active</code> visual state from{' '}
            <code className="text-[var(--color-text-primary)]">InputVisualState</code>; matrix now matches Default /
            Focus / Error / Disabled.
          </li>
          <li>
            Label and error helper use{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>; field value /
            placeholder use <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code>{' '}
            (Body/Regular 14px) at all sizes - size only changes height (36 / 44 / 52px).
          </li>
          <li>
            Dark theme input overrides removed; colors follow{' '}
            <code className="text-[var(--color-text-primary)]">color-tokens.css</code> semantic dark mappings.
          </li>
          <li>
            Added this Changelog tab documenting the Inputs update.
          </li>
          <li>
            Usage tab updated to record the semantic color and type tokens used per state (default, focus, error,
            disabled).
          </li>
        </ul>
      </article>
    </div>
  )
}

export function InputPlaygroundLab() {
  const [fieldSize, setFieldSize] = useState<InputSize>('md')
  const [icon, setIcon] = useState<InputIcon>('none')
  const [showLabel, setShowLabel] = useState(true)
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabSelect label="Size" value={fieldSize} onChange={setFieldSize} options={SIZE_OPTIONS} />
        <LabSelect label="Icon" value={icon} onChange={setIcon} options={ICON_OPTIONS} />
        <LabControlField label="Label" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle size="sm" checked={showLabel} onCheckedChange={setShowLabel} aria-label="Label" />
          </div>
        </LabControlField>
        <LabControlField label="Error" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle size="sm" checked={error} onCheckedChange={setError} aria-label="Error" />
          </div>
        </LabControlField>
        <LabControlField label="Disabled" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle size="sm" checked={disabled} onCheckedChange={setDisabled} aria-label="Disabled" />
          </div>
        </LabControlField>
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="max-w-md">
          <Input
            fieldSize={fieldSize}
            icon={icon}
            label={showLabel ? 'Label' : undefined}
            error={error}
            disabled={disabled}
            placeholder="Placeholder"
            defaultValue=""
          />
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={inputLabQa}
      title="Input fields"
      description="ACE Design System v.3 text inputs (Figma 408:1976): sm/md/lg heights (36/44/52px); default, focus (brand border + lavender fill + focus ring), error, and disabled. Optional search icon left or right. Colors and type wired to semantic --color-* and --ace-type-* tokens."
      examplesToolbar={toolbar}
      examples={
        <section className="space-y-5">
          <div className={cn('w-full min-w-0', labUsageSectionClass)}>
            <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
            <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
              Rows match Figma states (Default, Focus, Error, Disabled); columns are sizes. Each cell uses a frozen{' '}
              <code className="text-[var(--color-text-primary)]">visualState</code> (not focusable).
            </p>
          </div>
          <div className="flex flex-col gap-12">
            {(['none', 'left', 'right'] as const).map((ic) => (
              <StateMatrix key={ic} icon={ic} />
            ))}
          </div>
        </section>
      }
      code={
        <ComponentLabCode>{`import { Input } from '../components/atoms/Input'

<Input
  fieldSize="md"
  label="Email"
  placeholder="you@example.com"
  error={!valid}
  errorMessage="Enter a valid email"
/>`}</ComponentLabCode>
      }
      usage={
        <div className={cn('max-w-3xl space-y-4', labUsageSectionClass)}>
          <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
            Use <code className="text-[var(--color-text-primary)]">Input</code> for product forms. Pass{' '}
            <code className="text-[var(--color-text-primary)]">error</code> /{' '}
            <code className="text-[var(--color-text-primary)]">errorMessage</code> for validation;{' '}
            <code className="text-[var(--color-text-primary)]">icon</code> for optional search affordance. Reserve{' '}
            <code className="text-[var(--color-text-primary)]">visualState</code> for spec screenshots or QA grids -
            it freezes the shell and disables interaction.
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Default: <code className="text-[var(--color-text-primary)]">--screening-input-border</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-default</code>; surface{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>; placeholder{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-placeholder</code>; icon{' '}
            <code className="text-[var(--color-text-primary)]">--color-icon-primary</code>.
          </li>
          <li>
            Focus: <code className="text-[var(--color-text-primary)]">--color-border-brand</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code>, ring{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-focus</code>.
          </li>
          <li>
            Error: <code className="text-[var(--color-text-primary)]">--color-bg-error</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-error</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-status-error</code>.
          </li>
          <li>
            Disabled: <code className="text-[var(--color-text-primary)]">--color-bg-disabled-subtle</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-disabled-subtle</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-disabled</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-icon-disabled</code>.
          </li>
          <li>
            Type: <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>; field{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code>. Heights{' '}
            <code className="text-[var(--color-text-primary)]">--input-height-*</code> (36 / 44 / 52).
          </li>
        </ul>
      }

      changelog={<InputsChangelog />}
    />
  )
}
