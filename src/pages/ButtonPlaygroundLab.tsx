import { useState } from 'react'
import {
  AceButton,
  type AceButtonActionTone,
  type AceButtonIcon,
  type AceButtonPreviewState,
  type AceButtonSize,
  type AceButtonVariant,
} from '../components/atoms/AceButton'
import {
  AceDescriptiveButton,
  ACE_DESCRIPTIVE_BUTTON_PREVIEW_STATES,
  type AceDescriptiveButtonPreviewState,
} from '../components/molecules/AceDescriptiveButton'
import { labComponentContainerClass, labPanelClass, labTableSurfaceClass } from '../lib/labChrome'
import { LabCheckbox, LabRadioGroup, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'

const VARIANTS: AceButtonVariant[] = ['primary', 'secondary', 'tertiary']
const ACTION_TONES: AceButtonActionTone[] = ['primary', 'secondary', 'success', 'error', 'warning']
const SIZES: AceButtonSize[] = ['sm', 'md', 'lg']
const PREVIEW_STATES: AceButtonPreviewState[] = ['default', 'hover', 'active', 'disabled']

const ACTION_TONE_LABELS: Record<AceButtonActionTone, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
}

const DEMO_TITLE = '[Report Name]'
const DEMO_DESCRIPTION = 'This is the report description.'

const DESCRIPTIVE_STATE_LABELS: Record<AceDescriptiveButtonPreviewState, string> = {
  default: 'Default',
  hover: 'Hover',
  active: 'Clicked',
  disabled: 'Disabled',
}

type ButtonsLabView = 'standard' | 'descriptive'

function StateMatrix({ variant, actionTone }: { variant: AceButtonVariant; actionTone: AceButtonActionTone }) {
  return (
    <div className={cn('min-w-0', labExampleSectionClass)}>
      <p className="m-0 text-sm font-semibold capitalize tracking-tight text-[var(--color-text-primary)]">
        <span className="text-[var(--color-text-muted)]">{variant}</span>
        <span className="mx-2 text-[var(--color-border)]" aria-hidden>
          ·
        </span>
        Action · {ACTION_TONE_LABELS[actionTone]}
      </p>
      <div className={cn('overflow-x-auto', labPanelClass)}>
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className={cn('border-b border-[var(--color-border)]', labTableSurfaceClass)}>
              <th className="w-[7.5rem] px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
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
          <tbody className={cn('divide-y divide-[var(--color-border)]', labTableSurfaceClass)}>
            {PREVIEW_STATES.map((st) => (
              <tr key={st}>
                <td className="whitespace-nowrap px-4 py-4 font-medium capitalize text-[var(--color-text-primary)]">
                  {st === 'active' ? 'pressed' : st}
                </td>
                {SIZES.map((sz) => (
                  <td key={sz} className="px-4 py-4 align-middle">
                    <AceButton
                      variant={variant}
                      actionTone={actionTone}
                      size={sz}
                      icon="right"
                      previewState={st}
                      className="max-w-full"
                    >
                      {variant === 'primary' ? 'Primary' : variant === 'secondary' ? 'Secondary' : 'Tertiary'}
                    </AceButton>
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

function ButtonsChangelog() {
  return (
    <div className="space-y-8">
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">20 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Action token swap for button color — removed Innovative Blue palette.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Removed FinScan / Innovative Blue <code className="text-[var(--color-text-primary)]">palette</code> prop
            and <code className="text-[var(--color-text-primary)]">--ace-button-blue-fill*</code> variables.
          </li>
          <li>
            Added <code className="text-[var(--color-text-primary)]">actionTone</code> (
            <code className="text-[var(--color-text-primary)]">primary</code> |{' '}
            <code className="text-[var(--color-text-primary)]">secondary</code> |{' '}
            <code className="text-[var(--color-text-primary)]">success</code> |{' '}
            <code className="text-[var(--color-text-primary)]">error</code> |{' '}
            <code className="text-[var(--color-text-primary)]">warning</code>) which remaps{' '}
            <code className="text-[var(--color-text-primary)]">--ace-button-fill*</code> to the matching{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-{'{tone}'}*</code> tokens for default,
            hover, and pressed.
          </li>
          <li>
            Disabled primary fill always uses{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-disabled-button</code> (not selectable
            via the action tone control).
          </li>
          <li>
            Lab Color control replaced with an Action token dropdown; static matrices show all three variants under
            the selected family.
          </li>
          <li>
            Usage tab updated to list the Action / disabled / surface / type tokens actually consumed by{' '}
            <code className="text-[var(--color-text-primary)]">AceButton</code> (and Descriptive tokens on the
            Descriptive view).
          </li>
        </ul>
      </article>

      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">20 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with ACE Design System v.3 Figma Buttons (<code className="text-[var(--color-text-primary)]">2067:191</code>)
            and ButtonDescriptive (<code className="text-[var(--color-text-primary)]">4118:682</code>).
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Removed the standalone Descriptive Buttons lab page and route; demos now live on this Buttons page under
            the Descriptive view.
          </li>
          <li>
            Rewired button fills to Figma action tokens via{' '}
            <code className="text-[var(--color-text-primary)]">--ace-button-fill*</code>, resolving to{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-primary*</code> by default.
          </li>
          <li>
            Corrected state mapping: default is primary-400 (#523eb9), hover primary-600 (#312570), pressed
            primary-700 (#261c55) — previously inverted relative to the Figma Buttons matrix.
          </li>
          <li>
            Disabled primary uses <code className="text-[var(--color-text-primary)]">--color-action-disabled-button</code>{' '}
            fill and <code className="text-[var(--color-text-primary)]">--color-text-secondary</code> label.
          </li>
          <li>
            Label typography now uses{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-caption-bold</code> (sm),{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-bold</code> (md), and{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p2-bold</code> (lg).
          </li>
          <li>
            Brand scale aliases (<code className="text-[var(--color-text-primary)]">--ace-button-purple-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-button-blue-*</code>, neutrals) now reference{' '}
            <code className="text-[var(--color-text-primary)]">--color-*</code> primitives instead of hard-coded hex.
          </li>
          <li>
            Descriptive button states aligned to Figma: hover primary-100 + primary-400 border; clicked primary-300
            (no border); disabled neutral-100 / neutral-600; title Caption Bold.
          </li>
          <li>
            Added this Changelog tab on ComponentLabPage for documenting component evolution going forward.
          </li>
        </ul>
      </article>
    </div>
  )
}

export function ButtonPlaygroundLab() {
  const [view, setView] = useState<ButtonsLabView>('standard')
  const [variant, setVariant] = useState<AceButtonVariant>('primary')
  const [actionTone, setActionTone] = useState<AceButtonActionTone>('primary')
  const [size, setSize] = useState<AceButtonSize>('md')
  const [icon, setIcon] = useState<AceButtonIcon>('none')
  const [disabled, setDisabled] = useState(false)
  const [descriptiveDisabled, setDescriptiveDisabled] = useState(false)

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-6">
      <LabSelect
        label="View"
        value={view}
        onChange={(v) => setView(v as ButtonsLabView)}
        options={[
          { value: 'standard', label: 'Standard' },
          { value: 'descriptive', label: 'Descriptive' },
        ]}
      />
      {view === 'standard' ? (
        <>
          <LabRadioGroup
            label="Type"
            value={variant}
            onChange={setVariant}
            options={VARIANTS.map((v) => ({ value: v, label: v }))}
          />
          <LabSelect
            label="Action token"
            value={actionTone}
            onChange={(v) => setActionTone(v as AceButtonActionTone)}
            options={ACTION_TONES.map((t) => ({ value: t, label: ACTION_TONE_LABELS[t] }))}
          />
          <LabRadioGroup
            label="Size"
            value={size}
            onChange={setSize}
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
          <LabCheckbox
            label="Disabled"
            checked={disabled}
            onCheckedChange={setDisabled}
            className="min-h-[2.5rem] px-1 py-2"
          />
        </>
      ) : (
        <LabCheckbox
          label="Disabled"
          checked={descriptiveDisabled}
          onCheckedChange={setDescriptiveDisabled}
          className="min-h-[2.5rem] px-1 py-2"
        />
      )}
    </div>
  )

  return (
    <ComponentLabPage
      title="Buttons"
      description="ACE Design System v.3 buttons from Figma Buttons (2067:191): primary, secondary, and tertiary fill styles; small / medium / large; default, hover, pressed, and disabled. Color for interactive states comes from Action token families (primary, secondary, success, error, warning) via actionTone. Descriptive buttons (ButtonDescriptive 4118:682) are included on this page."
      examplesToolbar={toolbar}
      examples={
        view === 'standard' ? (
          <div className="space-y-12">
            <div className={cn(labPanelClass, 'p-6 sm:p-8')}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                <div className="shrink-0">
                  <AceButton
                    variant={variant}
                    actionTone={actionTone}
                    size={size}
                    icon={icon}
                    disabled={disabled}
                  >
                    {variant === 'primary'
                      ? 'Primary Button'
                      : variant === 'secondary'
                        ? 'Secondary Button'
                        : 'Tertiary Button'}
                  </AceButton>
                </div>
                <p className="m-0 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Use the controls in the toolbar above. The Action token dropdown swaps the color family for
                  default, hover, and pressed. Disabled always uses{' '}
                  <code className="text-[var(--color-text-primary)]">--color-action-disabled-button</code>.
                </p>
              </div>
            </div>

            <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
              <div className={cn('max-w-3xl', labUsageSectionClass)}>
                <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">
                  Static reference (icon right)
                </h4>
                <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Matches the Figma matrix for each variant under the selected action token family: default, hover,
                  pressed, and disabled (disabled is not affected by the action token). Preview cells are not
                  focusable.
                </p>
              </div>
              <div className="flex flex-col gap-12">
                {VARIANTS.map((v) => (
                  <StateMatrix key={v} variant={v} actionTone={actionTone} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-8">
            <div className={cn('w-full', labExampleSectionClass)}>
              <p className={labSectionLabelClass}>Interactive</p>
              <div className={labComponentContainerClass}>
                <div className="flex min-h-24 items-center justify-center p-6">
                  <AceDescriptiveButton
                    title={DEMO_TITLE}
                    description={DEMO_DESCRIPTION}
                    disabled={descriptiveDisabled}
                  />
                </div>
              </div>
            </div>

            <div className={cn('w-full', labExampleSectionClass)}>
              <p className={labSectionLabelClass}>States (Figma ButtonDescriptive)</p>
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
                    {ACE_DESCRIPTIVE_BUTTON_PREVIEW_STATES.map((state) => (
                      <tr key={state}>
                        <td className="whitespace-nowrap px-4 py-4 font-medium text-[var(--color-text-primary)]">
                          {DESCRIPTIVE_STATE_LABELS[state]}
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <AceDescriptiveButton
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
            </div>
          </div>
        )
      }
      code={
        view === 'standard' ? (
          <ComponentLabCode>{`import { AceButton } from '../components/atoms/AceButton'

<AceButton variant="primary" actionTone="primary" size="md" icon="right">
  Save
</AceButton>

{/* Success / destructive / etc. via action token family */}
<AceButton variant="primary" actionTone="success">
  Confirm
</AceButton>`}</ComponentLabCode>
        ) : (
          <ComponentLabCode>{`import { AceDescriptiveButton } from '../components/molecules/AceDescriptiveButton'

<AceDescriptiveButton
  title="[Report Name]"
  description="This is the report description."
  onClick={() => { /* open report */ }}
/>`}</ComponentLabCode>
        )
      }
      usage={
        view === 'standard' ? (
          <div className={cn('max-w-3xl space-y-4', labUsageSectionClass)}>
            <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
              Import <code className="text-[var(--color-text-primary)]">AceButton</code> for product UI. Keep{' '}
              <code className="text-[var(--color-text-primary)]">variant</code> for fill style (primary / secondary /
              tertiary) and use <code className="text-[var(--color-text-primary)]">actionTone</code> to swap the Action
              token family for default, hover, and pressed. Use{' '}
              <code className="text-[var(--color-text-primary)]">previewState</code> only for documentation grids.
            </p>
            <div className="space-y-2">
              <h4 className="m-0 text-sm font-semibold text-[var(--color-text-primary)]">Tokens in use</h4>
              <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <li>
                  <strong className="font-medium text-[var(--color-text-primary)]">Action (via actionTone)</strong> —
                  default / hover / pressed map to{' '}
                  <code className="text-[var(--color-text-primary)]">colors/action/{'{tone}'}</code> →{' '}
                  <code className="text-[var(--color-text-primary)]">--color-action-primary</code>,{' '}
                  <code className="text-[var(--color-text-primary)]">--color-action-primary-hover</code>,{' '}
                  <code className="text-[var(--color-text-primary)]">--color-action-primary-pressed</code> (and the same
                  pattern for <code className="text-[var(--color-text-primary)]">secondary</code>,{' '}
                  <code className="text-[var(--color-text-primary)]">success</code>,{' '}
                  <code className="text-[var(--color-text-primary)]">error</code>,{' '}
                  <code className="text-[var(--color-text-primary)]">warning</code>). Applied through{' '}
                  <code className="text-[var(--color-text-primary)]">--ace-button-fill*</code>.
                </li>
                <li>
                  <strong className="font-medium text-[var(--color-text-primary)]">Disabled</strong> — always{' '}
                  <code className="text-[var(--color-text-primary)]">colors/action/disabled-button</code> →{' '}
                  <code className="text-[var(--color-text-primary)]">--color-action-disabled-button</code> (
                  <code className="text-[var(--color-text-primary)]">--ace-button-disabled-primary-bg</code>); label{' '}
                  <code className="text-[var(--color-text-primary)]">--color-text-secondary</code>. Not selectable via
                  actionTone.
                </li>
                <li>
                  <strong className="font-medium text-[var(--color-text-primary)]">On-solid / surface</strong> —{' '}
                  <code className="text-[var(--color-text-primary)]">--color-text-inverse</code>,{' '}
                  <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>.
                </li>
                <li>
                  <strong className="font-medium text-[var(--color-text-primary)]">Type</strong> — sm{' '}
                  <code className="text-[var(--color-text-primary)]">--ace-type-caption-bold</code>; md{' '}
                  <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-bold</code>; lg{' '}
                  <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p2-bold</code>.
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={cn('max-w-3xl space-y-4', labUsageSectionClass)}>
            <ul className="m-0 list-disc space-y-1 ps-5 text-sm text-[var(--color-text-muted)]">
              <li>
                Use for secondary actions that need a short title plus supporting context (e.g. opening a named
                report).
              </li>
              <li>
                One visual variant — states are Default, Hover, Clicked (active), and Disabled.
              </li>
              <li>
                Prefer <code className="text-[var(--color-text-primary)]">AceButton</code> for standard CTA actions
                without descriptive copy.
              </li>
            </ul>
            <div className="space-y-2">
              <h4 className="m-0 text-sm font-semibold text-[var(--color-text-primary)]">Tokens in use</h4>
              <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <li>
                  Surface / border: <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>,{' '}
                  <code className="text-[var(--color-text-primary)]">--color-neutral-400</code> (default border).
                </li>
                <li>
                  Hover: <code className="text-[var(--color-text-primary)]">--color-primary-100</code> fill,{' '}
                  <code className="text-[var(--color-text-primary)]">--color-primary-400</code> border.
                </li>
                <li>
                  Pressed: <code className="text-[var(--color-text-primary)]">--color-primary-300</code> fill.
                </li>
                <li>
                  Disabled: <code className="text-[var(--color-text-primary)]">--color-neutral-100</code> /{' '}
                  <code className="text-[var(--color-text-primary)]">--color-neutral-600</code>; text{' '}
                  <code className="text-[var(--color-text-primary)]">--color-text-primary</code> / disabled{' '}
                  <code className="text-[var(--color-text-primary)]">--color-neutral-600</code>.
                </li>
              </ul>
            </div>
          </div>
        )
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-button-fill</code> /{' '}
            <code className="text-[var(--color-text-primary)]">-hover</code> /{' '}
            <code className="text-[var(--color-text-primary)]">-pressed</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-{'{tone}'}*</code> via{' '}
            <code className="text-[var(--color-text-primary)]">actionTone</code> (primary, secondary, success, error,
            warning).
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-button-disabled-primary-bg</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-disabled-button</code>; disabled text →{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-secondary</code>.
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-button-on-solid</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-inverse</code>; secondary/tertiary surface →{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>.
          </li>
          <li>
            Type: <code className="text-[var(--color-text-primary)]">--ace-type-caption-bold</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-bold</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p2-bold</code>.
          </li>
          <li>
            Layout: <code className="text-[var(--color-text-primary)]">--ace-button-px-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-button-py-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-button-gap-*</code>.
          </li>
          <li>
            Descriptive: <code className="text-[var(--color-text-primary)]">--ace-descriptive-button-*</code> →{' '}
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
