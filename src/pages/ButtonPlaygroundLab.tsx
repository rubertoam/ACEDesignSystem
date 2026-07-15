import { useState } from 'react'
import {
  AceButton,
  type AceButtonIcon,
  type AceButtonPalette,
  type AceButtonPreviewState,
  type AceButtonSize,
  type AceButtonVariant,
} from '../components/atoms/AceButton'
import { labPanelClass, labTableSurfaceClass } from '../lib/labChrome'
import { LabCheckbox, LabRadioGroup } from '../lib/labControls'
import { labExampleSectionClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'

const VARIANTS: AceButtonVariant[] = ['primary', 'secondary', 'tertiary']
const PALETTES: AceButtonPalette[] = ['purple', 'blue']
const SIZES: AceButtonSize[] = ['sm', 'md', 'lg']
const PREVIEW_STATES: AceButtonPreviewState[] = ['default', 'hover', 'active', 'disabled']

function StateMatrix({ variant, palette }: { variant: AceButtonVariant; palette: AceButtonPalette }) {
  const label = palette === 'purple' ? 'FinScan (purple)' : 'Innovative Blue'
  return (
    <div className={cn('min-w-0', labExampleSectionClass)}>
      <p className="m-0 text-sm font-semibold capitalize tracking-tight text-[var(--color-text-primary)]">
        <span className="text-[var(--color-text-muted)]">{variant}</span>
        <span className="mx-2 text-[var(--color-border)]" aria-hidden>
          ·
        </span>
        {label}
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
                  {st}
                </td>
                {SIZES.map((sz) => (
                  <td key={sz} className="px-4 py-4 align-middle">
                    <AceButton
                      variant={variant}
                      palette={palette}
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

export function ButtonPlaygroundLab() {
  const [variant, setVariant] = useState<AceButtonVariant>('primary')
  const [palette, setPalette] = useState<AceButtonPalette>('purple')
  const [size, setSize] = useState<AceButtonSize>('md')
  const [icon, setIcon] = useState<AceButtonIcon>('none')
  const [disabled, setDisabled] = useState(false)

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
      <LabRadioGroup
        label="Type"
        value={variant}
        onChange={setVariant}
        options={VARIANTS.map((v) => ({ value: v, label: v }))}
      />
      <LabRadioGroup
        label="Color"
        value={palette}
        onChange={setPalette}
        options={[
          { value: 'purple', label: 'FinScan' },
          { value: 'blue', label: 'Innovative' },
        ]}
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
      <LabCheckbox label="Disabled" checked={disabled} onCheckedChange={setDisabled} className="min-h-[2.5rem] px-1 py-2" />
    </div>
  )

  return (
    <ComponentLabPage
      title="Button playground"
      description="ACE Design System v.3 buttons: FinScan Primary (purple) and Innovative Blue, with primary, secondary, and tertiary styles, three sizes, and default / hover / active / disabled states. Tokens are --ace-button-* in variables.css."
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-12">
          <div className={cn(labPanelClass, 'p-6 sm:p-8')}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="shrink-0">
                <AceButton variant={variant} palette={palette} size={size} icon={icon} disabled={disabled}>
                  {variant === 'primary'
                    ? 'Primary Button'
                    : variant === 'secondary'
                      ? 'Secondary Button'
                      : 'Tertiary Button'}
                </AceButton>
              </div>
              <p className="m-0 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                Use the controls in the toolbar above. Hover and press this button for interactive states; enable
                Disabled to see the inactive style.
              </p>
            </div>
          </div>

          <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
            <div className={cn('max-w-3xl', labUsageSectionClass)}>
              <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference (icon right)</h4>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Matches the Figma matrix: default, hover, active (clicked), and disabled for each size. Preview cells
                are not focusable.
              </p>
            </div>
            <div className="flex flex-col gap-12">
              {VARIANTS.map((v) => (
                <div key={v} className="space-y-10">
                  {PALETTES.map((p) => (
                    <StateMatrix key={`${v}-${p}`} variant={v} palette={p} />
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      }
      code={
        <ComponentLabCode>{`import { AceButton } from '../components/atoms/AceButton'

<AceButton variant="primary" palette="purple" size="md" icon="right">
  Save
</AceButton>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
          Import <code className="text-[var(--color-text-primary)]">AceButton</code> for product UI. Use{' '}
          <code className="text-[var(--color-text-primary)]">previewState</code> only for documentation or design QA
          grids; omit it for real buttons so hover, active, and focus rings work.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-button-purple-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-button-blue-*</code> - default / hover / active fills
            and outlines.
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-button-neutral-*</code> - disabled secondary/tertiary
            text and borders; primary disabled surface.
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-button-px-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-button-py-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-button-gap-*</code> - padding and icon gap by size
            (small / medium / large from Figma).
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-button-radius</code> - matches dialog modal button
            radius (<code className="text-[var(--color-text-primary)]">--dialog-modal-btn-radius</code>, 4px).
          </li>
          <li>
            Typography uses <code className="text-[var(--color-text-primary)]">--font-screening</code> (Noto Sans) with
            bold weights; sizes map to Figma caption (sm), P1 (md), and P2 (lg).
          </li>
        </ul>
      }
    />
  )
}
