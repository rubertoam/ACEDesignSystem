import { useState } from 'react'
import {
  Button,
  type ButtonActionTone,
  type ButtonIcon,
  type ButtonPreviewState,
  type ButtonTypography,
  type ButtonVariant,
} from '../components/atoms/Button'
import {
  ButtonDescriptive,
  BUTTON_DESCRIPTIVE_PREVIEW_STATES,
  type ButtonDescriptivePreviewState,
} from '../components/molecules/ButtonDescriptive'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { labPanelClass, labTableSurfaceClass } from '../lib/labChrome'
import { LabControlField, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

import { buttonLabQa } from './labTabDocs'
import { cn } from '../lib/cn'

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary']
const ACTION_TONES: ButtonActionTone[] = ['primary', 'secondary', 'success', 'error', 'warning', 'warning2']
const PREVIEW_STATES: { state: ButtonPreviewState; label: string }[] = [
  { state: 'default', label: 'Default' },
  { state: 'hover', label: 'Hover' },
  { state: 'active', label: 'Pressed' },
  { state: 'disabled', label: 'Disabled' },
]

const ACTION_TONE_LABELS: Record<ButtonActionTone, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  warning2: 'Warning 2',
}

const VARIANT_LABELS: Record<ButtonVariant, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Tertiary',
}

const DEMO_TITLE = '[Report Name]'
const DEMO_DESCRIPTION = 'This is the report description.'

const DESCRIPTIVE_STATE_LABELS: Record<ButtonDescriptivePreviewState, string> = {
  default: 'Default',
  hover: 'Hover',
  active: 'Clicked',
  disabled: 'Disabled',
}

const ICON_OPTIONS: { value: ButtonIcon; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
]

/** Typography options — Figma semantic body tokens; selected token drives button height. */
const BUTTON_TYPOGRAPHY_OPTIONS: { value: ButtonTypography; label: string }[] = [
  {
    value: 'body-secondary',
    label: 'Body secondary · typography/body/body-secondary',
  },
  {
    value: 'body-main',
    label: 'Body main · typography/body/body-main',
  },
]

function StateReference({ actionTone }: { actionTone: ButtonActionTone }) {
  return (
    <div className={cn('min-w-0', labExampleSectionClass)}>
      <div className="overflow-x-auto">
        <div className="flex min-w-[40rem] flex-col gap-6">
          <div className="grid grid-cols-[7.5rem_repeat(3,minmax(0,1fr))] items-end gap-x-6 gap-y-2">
            <div aria-hidden />
            {VARIANTS.map((v) => (
              <p
                key={v}
                className="m-0 [font:var(--type-body-bold)] [letter-spacing:var(--type-body-bold-tracking)] text-[var(--color-text-primary)]"
              >
                {VARIANT_LABELS[v]}
              </p>
            ))}
          </div>
          {PREVIEW_STATES.map(({ state, label }) => (
            <div
              key={state}
              className="grid grid-cols-[7.5rem_repeat(3,minmax(0,1fr))] items-center gap-x-6 gap-y-2"
            >
              <p className="m-0 [font:var(--type-body-bold)] [letter-spacing:var(--type-body-bold-tracking)] text-[var(--color-text-primary)]">
                {label}
              </p>
              {VARIANTS.map((v) => (
                <div key={`${v}-${state}`} className="flex items-center">
                  <Button
                    variant={v}
                    actionTone={actionTone}
                    previewState={state}
                    buttonTypography="body-main"
                  >
                    {VARIANT_LABELS[v]} Button
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ButtonsChangelog() {
  return (
    <div className="space-y-8">
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">17 November 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with simplified Figma Buttons (
            <code className="text-[var(--color-text-primary)]">5996:605</code> / component set{' '}
            <code className="text-[var(--color-text-primary)]">5998:27889</code>).
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Button height hugs the label typography token (default{' '}
            <code className="text-[var(--color-text-primary)]">typography/body/body-main</code> →{' '}
            <code className="text-[var(--color-text-primary)]">Body/Semi Bold</code>) +{' '}
            <code className="text-[var(--color-text-primary)]">spacing/8</code> vertical /{' '}
            <code className="text-[var(--color-text-primary)]">spacing/12</code> horizontal padding (removed fixed
            sm/md/lg heights). Playground{' '}
            <code className="text-[var(--color-text-primary)]">buttonTypography</code> swaps body-secondary /
            body-main to demo that relationship.
          </li>
          <li>
            Static reference matches Figma: Variant (Primary / Secondary / Tertiary) × State (Default / Hover /
            Pressed / Disabled) only — no size or icon-position matrices. Icon left/right is a playground toggle.
          </li>
          <li>
            Pressed fill uses{' '}
            <code className="text-[var(--color-text-primary)]">colors/action/primary - pressed - subtle</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-primary-pressed-subtle</code>; disabled
            uses <code className="text-[var(--color-text-primary)]">colors/action/disabled</code> with{' '}
            <code className="text-[var(--color-text-primary)]">colors/text/button label</code> (all variants solid).
          </li>
          <li>
            Secondary/tertiary default labels use{' '}
            <code className="text-[var(--color-text-primary)]">colors/text/button label - alt</code>;{' '}
            <code className="text-[var(--color-text-primary)]">size</code> prop kept as a deprecated no-op shim.
          </li>
        </ul>
      </article>
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">22 October 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Figma-aligned naming - <code className="text-[var(--color-text-primary)]">AceButton</code> →{' '}
            <code className="text-[var(--color-text-primary)]">Button</code>,{' '}
            <code className="text-[var(--color-text-primary)]">AceDescriptiveButton</code> →{' '}
            <code className="text-[var(--color-text-primary)]">ButtonDescriptive</code>.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Primary exports and CSS vars use Figma names (
            <code className="text-[var(--color-text-primary)]">Button</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--button-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--button-descriptive-*</code>).
          </li>
          <li>
            Temporary compat: <code className="text-[var(--color-text-primary)]">AceButton</code> /{' '}
            <code className="text-[var(--color-text-primary)]">AceDescriptiveButton</code> re-exports and{' '}
            <code className="text-[var(--color-text-primary)]">--button-*</code> aliases still resolve.
          </li>
        </ul>
      </article>
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">20 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Action token swap for button color - removed Innovative Blue palette.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Added <code className="text-[var(--color-text-primary)]">actionTone</code> which remaps{' '}
            <code className="text-[var(--color-text-primary)]">--button-fill*</code> to the matching{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-{'{tone}'}*</code> tokens.
          </li>
        </ul>
      </article>
    </div>
  )
}

export function ButtonPlaygroundLab() {
  const [variant, setVariant] = useState<ButtonVariant>('primary')
  const [actionTone, setActionTone] = useState<ButtonActionTone>('primary')
  const [buttonTypography, setButtonTypography] = useState<ButtonTypography>('body-main')
  const [icon, setIcon] = useState<ButtonIcon>('none')
  const [disabled, setDisabled] = useState(false)
  const [descriptiveDisabled, setDescriptiveDisabled] = useState(false)

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabSelect
          label="Type"
          value={variant}
          onChange={setVariant}
          options={VARIANTS.map((v) => ({
            value: v,
            label: VARIANT_LABELS[v],
          }))}
        />
        <LabSelect
          label="Action token"
          value={actionTone}
          onChange={(v) => setActionTone(v as ButtonActionTone)}
          options={ACTION_TONES.map((t) => ({ value: t, label: ACTION_TONE_LABELS[t] }))}
        />
        <LabSelect
          label="Label typography (drives size)"
          value={buttonTypography}
          onChange={setButtonTypography}
          options={BUTTON_TYPOGRAPHY_OPTIONS}
        />
        <LabSelect label="Icon" value={icon} onChange={setIcon} options={ICON_OPTIONS} />
        <LabControlField label="Disable" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle size="sm" checked={disabled} onCheckedChange={setDisabled} aria-label="Disable" />
          </div>
        </LabControlField>
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="shrink-0">
          <Button
            variant={variant}
            actionTone={actionTone}
            buttonTypography={buttonTypography}
            icon={icon}
            disabled={disabled}
          >
            {variant === 'primary'
              ? 'Primary Button'
              : variant === 'secondary'
                ? 'Secondary Button'
                : 'Tertiary Button'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
          <LabControlField label="Disable" className="shrink-0">
            <div className="flex min-h-9 items-center">
              <Toggle
                size="sm"
                checked={descriptiveDisabled}
                onCheckedChange={setDescriptiveDisabled}
                aria-label="Disable descriptive button"
              />
            </div>
          </LabControlField>
        </div>
        <div className="flex min-h-24 items-center justify-start">
          <ButtonDescriptive
            title={DEMO_TITLE}
            description={DEMO_DESCRIPTION}
            disabled={descriptiveDisabled}
          />
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={buttonLabQa}
      title="Buttons"
      description="ACE Design System v.3 buttons (Figma Buttons): the typography token on the label drives button size (type + spacing/8 · spacing/12 padding; default body-main / Body Semi Bold). Primary, secondary, and tertiary; default, hover, pressed, and disabled. Optional icon is a toggleable layer. Descriptive tiles remain on this page."
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-12">
          <section className="space-y-5">
            <div className={cn('w-full min-w-0', labUsageSectionClass)}>
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
              <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
                Matches the Figma matrix under the selected action token family: Primary / Secondary / Tertiary ×
                Default / Hover / Pressed / Disabled at the body-main baseline. Preview cells use a frozen{' '}
                <code className="text-[var(--color-text-primary)]">previewState</code> (not focusable). Change size
                via the Label typography control in the playground above — the typography token drives height. Icon
                left/right is a playground toggle, not a matrix column.
              </p>
            </div>
            <StateReference actionTone={actionTone} />
          </section>

          <section className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Descriptive buttons (Figma ButtonDescriptive)</p>
            <div className={cn('overflow-x-auto', labPanelClass)}>
              <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
                <thead>
                  <tr className={cn('border-b border-[var(--color-border)]', labTableSurfaceClass)}>
                    <th className="w-[7.5rem] px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                      State
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                      Preview
                    </th>
                  </tr>
                </thead>
                <tbody className={cn('divide-y divide-[var(--color-border)]', labTableSurfaceClass)}>
                  {BUTTON_DESCRIPTIVE_PREVIEW_STATES.map((state) => (
                    <tr key={state}>
                      <td className="whitespace-nowrap px-4 py-4 font-medium text-[var(--color-text-primary)]">
                        {DESCRIPTIVE_STATE_LABELS[state]}
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <ButtonDescriptive
                          title={DEMO_TITLE}
                          description={DEMO_DESCRIPTION}
                          previewState={state}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      }
      code={
        <div className="space-y-6">
          <ComponentLabCode>{`import { Button } from '../components/atoms/Button'

<Button variant="primary" actionTone="primary" buttonTypography="body-main" icon="right">
  Save
</Button>

{/* Success / destructive / etc. via action token family */}
<Button variant="primary" actionTone="success">
  Confirm
</Button>`}</ComponentLabCode>
          <ComponentLabCode>{`import { ButtonDescriptive } from '../components/molecules/ButtonDescriptive'

<ButtonDescriptive
  title="[Report Name]"
  description="This is the report description."
  onClick={() => { /* open report */ }}
/>`}</ComponentLabCode>
        </div>
      }
      usage={
        <div className={cn('max-w-3xl space-y-6', labUsageSectionClass)}>
          <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
            Import <code className="text-[var(--color-text-primary)]">Button</code> for product UI. The typography
            token on the label drives button size: height hugs{' '}
            <code className="text-[var(--color-text-primary)]">buttonTypography</code> (default{' '}
            <code className="text-[var(--color-text-primary)]">typography/body/body-main</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--type-body-semi-bold</code>) plus{' '}
            <code className="text-[var(--color-text-primary)]">spacing/8</code> /{' '}
            <code className="text-[var(--color-text-primary)]">spacing/12</code> padding — not fixed sm/md/lg
            heights. Keep <code className="text-[var(--color-text-primary)]">variant</code> for fill style and{' '}
            <code className="text-[var(--color-text-primary)]">actionTone</code> to swap the Action token family.
            Toggle <code className="text-[var(--color-text-primary)]">icon</code> for an optional left/right layer.
            Reserve <code className="text-[var(--color-text-primary)]">previewState</code> for documentation grids.
          </p>
          <ul className="m-0 list-disc space-y-1 ps-5 text-sm text-[var(--color-text-muted)]">
            <li>
              Use <code className="text-[var(--color-text-primary)]">ButtonDescriptive</code> for secondary actions
              that need a short title plus supporting context (e.g. opening a named report).
            </li>
            <li>Descriptive states are Default, Hover, Clicked (active), and Disabled.</li>
            <li>
              Prefer <code className="text-[var(--color-text-primary)]">Button</code> for standard CTA actions without
              descriptive copy.
            </li>
          </ul>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--button-fill</code> /{' '}
            <code className="text-[var(--color-text-primary)]">-hover</code> /{' '}
            <code className="text-[var(--color-text-primary)]">-pressed</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-{'{tone}'}*</code> via{' '}
            <code className="text-[var(--color-text-primary)]">actionTone</code> (primary pressed →{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-primary-pressed-subtle</code>).
          </li>
          <li>
            Disabled: <code className="text-[var(--color-text-primary)]">--color-action-disabled</code> fill +{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-button-label</code> (all variants).
          </li>
          <li>
            Labels: <code className="text-[var(--color-text-primary)]">--color-text-button-label</code> on solid fills;{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-button-label-alt</code> on secondary /
            tertiary default. Surface →{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>.
          </li>
          <li>
            Geometry: typography drives size — hug from{' '}
            <code className="text-[var(--color-text-primary)]">buttonTypography</code> (default{' '}
            <code className="text-[var(--color-text-primary)]">--type-body-semi-bold</code> / body-main; also
            body-secondary → <code className="text-[var(--color-text-primary)]">--type-caption-semi-bold</code>) +{' '}
            <code className="text-[var(--color-text-primary)]">--spacing-8</code> py /{' '}
            <code className="text-[var(--color-text-primary)]">--spacing-12</code> px / gap; radius{' '}
            <code className="text-[var(--color-text-primary)]">--radius-component-button</code>.
          </li>
          <li>
            Descriptive: <code className="text-[var(--color-text-primary)]">--button-descriptive-*</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-primary-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-neutral-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-primary</code>.
          </li>
        </ul>
      }

      changelog={<ButtonsChangelog />}
    />
  )
}
