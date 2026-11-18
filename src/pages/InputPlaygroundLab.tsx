import { useState } from 'react'
import {
  Input,
  type InputFieldTypography,
  type InputIcon,
  type InputVisualState,
} from '../components/atoms/Input'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { cn } from '../lib/cn'
import { LabControlField, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

import { inputLabQa } from './labTabDocs'

const VISUAL_STATES: { state: InputVisualState; label: string }[] = [
  { state: 'default', label: 'Input / Default' },
  { state: 'focus', label: 'Input / Focused' },
  { state: 'error', label: 'Input / Error' },
  { state: 'disabled', label: 'Input / Disabled' },
]

const ICON_OPTIONS: { value: InputIcon; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
]

/** Typography options — Figma semantic body tokens only; selected token drives field height. */
const FIELD_TYPOGRAPHY_OPTIONS: { value: InputFieldTypography; label: string }[] = [
  {
    value: 'body-secondary',
    label: 'Body secondary · typography/body/body-secondary',
  },
  {
    value: 'body-main',
    label: 'Body main · typography/body/body-main',
  },
]

function StateReference() {
  return (
    <div className={cn('min-w-0', labExampleSectionClass)}>
      <div className="overflow-x-auto">
        <div className="flex min-w-[48rem] items-start justify-between gap-8">
          {VISUAL_STATES.map(({ state, label }) => (
            <div key={state} className="flex w-[16rem] shrink-0 flex-col gap-3">
              <p className="m-0 [font:var(--type-body-bold)] [letter-spacing:var(--type-body-bold-tracking)] text-[var(--color-text-primary)]">
                {label}
              </p>
              <Input
                visualState={state}
                label="Input Label"
                defaultValue="[Sample text]"
                aria-label={label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InputsChangelog() {
  return (
    <div className="space-y-8">
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">17 November 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with simplified Figma Input Fields (
            <code className="text-[var(--color-text-primary)]">6003:1009</code> / component set{' '}
            <code className="text-[var(--color-text-primary)]">6004:2722</code>).
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Field height hugs the field typography token (default{' '}
            <code className="text-[var(--color-text-primary)]">typography/body/body-main</code>) +{' '}
            <code className="text-[var(--color-text-primary)]">spacing/8</code> padding (removed fixed sm/md/lg
            heights). Playground{' '}
            <code className="text-[var(--color-text-primary)]">fieldTypography</code> swaps body-secondary /
            body-main to demo that relationship.
          </li>
          <li>
            Static reference matches Figma: Default / Focused / Error / Disabled only (body-main baseline). Icon
            left/right is a playground toggle, not a matrix row.
          </li>
          <li>
            Focused fill uses{' '}
            <code className="text-[var(--color-text-primary)]">colors/input/focused</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-input-focused</code> (light{' '}
            <code className="text-[var(--color-text-primary)]">color/primary/50</code>, dark{' '}
            <code className="text-[var(--color-text-primary)]">color/primary/800</code>) instead of{' '}
            <code className="text-[var(--color-text-primary)]">colors/bg/brand-hover</code>.
          </li>
          <li>
            Error helper uses{' '}
            <code className="text-[var(--color-text-primary)]">colors/text/error message</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-error-message</code> and{' '}
            <code className="text-[var(--color-text-primary)]">typography/ui/footnote</code>.
          </li>
          <li>
            Stack gap label → field → message uses{' '}
            <code className="text-[var(--color-text-primary)]">spacing/8</code>.
          </li>
        </ul>
      </article>
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">20 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with ACE Design System v.3 Figma Input Fields and semantic color/typography tokens.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Rewired input borders, fills, text, and icons to semantic{' '}
            <code className="text-[var(--color-text-primary)]">--color-*</code> tokens.
          </li>
          <li>
            Focus chrome: <code className="text-[var(--color-text-primary)]">--color-border-focus</code> +{' '}
            <code className="text-[var(--color-text-primary)]">--color-bg-brand-hover</code> (later moved to{' '}
            <code className="text-[var(--color-text-primary)]">--color-input-focused</code>).
          </li>
        </ul>
      </article>
    </div>
  )
}

export function InputPlaygroundLab() {
  const [icon, setIcon] = useState<InputIcon>('none')
  const [fieldTypography, setFieldTypography] = useState<InputFieldTypography>('body-main')
  const [showLabel, setShowLabel] = useState(true)
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabSelect
          label="Field typography (drives size)"
          value={fieldTypography}
          onChange={setFieldTypography}
          options={FIELD_TYPOGRAPHY_OPTIONS}
        />
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
            fieldTypography={fieldTypography}
            icon={icon}
            label={showLabel ? 'Input Label' : undefined}
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
      description="ACE Design System v.3 text inputs (Figma Input Fields): the typography token on the field value drives input size (type + spacing/8 padding; default body-main). Default, Focused, Error, and Disabled. Optional search icon is a toggleable layer."
      examplesToolbar={toolbar}
      examples={
        <section className="space-y-5">
          <div className={cn('w-full min-w-0', labUsageSectionClass)}>
            <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
            <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
              Matches Figma states (Default, Focused, Error, Disabled) at the body-main baseline. Each field uses a
              frozen <code className="text-[var(--color-text-primary)]">visualState</code> (not focusable). Change
              field size via the Field typography control in the playground above — the typography token drives
              height.
            </p>
          </div>
          <StateReference />
        </section>
      }
      code={
        <ComponentLabCode>{`import { Input } from '../components/atoms/Input'

<Input
  label="Email"
  placeholder="you@example.com"
  fieldTypography="body-main"
  error={!valid}
  errorMessage="Enter a valid email"
/>`}</ComponentLabCode>
      }
      usage={
        <div className={cn('max-w-3xl space-y-4', labUsageSectionClass)}>
          <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
            Use <code className="text-[var(--color-text-primary)]">Input</code> for product forms. The typography
            token on the field value drives input size: height hugs{' '}
            <code className="text-[var(--color-text-primary)]">fieldTypography</code> (default{' '}
            <code className="text-[var(--color-text-primary)]">typography/body/body-main</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--type-body-regular</code>) plus{' '}
            <code className="text-[var(--color-text-primary)]">spacing/8</code> padding — not fixed sm/md/lg
            heights. Focused fill binds to{' '}
            <code className="text-[var(--color-text-primary)]">colors/input/focused</code> (
            <code className="text-[var(--color-text-primary)]">--color-input-focused</code>) with stroke{' '}
            <code className="text-[var(--color-text-primary)]">colors/border/focus</code>. Pass{' '}
            <code className="text-[var(--color-text-primary)]">error</code> /{' '}
            <code className="text-[var(--color-text-primary)]">errorMessage</code> for validation;{' '}
            <code className="text-[var(--color-text-primary)]">icon</code> toggles an optional search layer. Reserve{' '}
            <code className="text-[var(--color-text-primary)]">visualState</code> for spec screenshots or QA grids.
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Default: <code className="text-[var(--color-text-primary)]">--color-border-default</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>; value{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-primary</code>; placeholder{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-placeholder</code>.
          </li>
          <li>
            Focus: <code className="text-[var(--color-text-primary)]">--color-border-focus</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-input-focused</code> (
            <code className="text-[var(--color-text-primary)]">colors/input/focused</code>).
          </li>
          <li>
            Geometry: the typography token drives field size — hug height from{' '}
            <code className="text-[var(--color-text-primary)]">fieldTypography</code> (default{' '}
            <code className="text-[var(--color-text-primary)]">--type-body-regular</code> /
            body-main; also body-secondary →{' '}
            <code className="text-[var(--color-text-primary)]">--type-caption-regular</code>) +{' '}
            <code className="text-[var(--color-text-primary)]">--spacing-8</code>; radius{' '}
            <code className="text-[var(--color-text-primary)]">--radius-sm</code>.
          </li>
          <li>
            Error: <code className="text-[var(--color-text-primary)]">--color-bg-error</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-error</code>; helper{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-error-message</code> +{' '}
            <code className="text-[var(--color-text-primary)]">--type-footnote-regular</code>.
          </li>
          <li>
            Disabled: <code className="text-[var(--color-text-primary)]">--color-bg-disabled-subtle</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-disabled-subtle</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-disabled</code>.
          </li>
          <li>
            Label: <code className="text-[var(--color-text-primary)]">--type-caption-regular</code>{' '}
            (body-secondary). Stack gap: <code className="text-[var(--color-text-primary)]">--spacing-8</code>.
          </li>
        </ul>
      }
      changelog={<InputsChangelog />}
    />
  )
}
