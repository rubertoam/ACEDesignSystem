import { useState } from 'react'
import {
  AceDescriptiveButton,
  ACE_DESCRIPTIVE_BUTTON_PREVIEW_STATES,
  type AceDescriptiveButtonPreviewState,
} from '../components/molecules/AceDescriptiveButton'
import { LabCheckbox } from '../lib/labControls'
import { labComponentContainerClass, labPanelClass, labTableSurfaceClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'

const DEMO_TITLE = '[Report Name]'
const DEMO_DESCRIPTION = 'This is the report description.'

const STATE_LABELS: Record<AceDescriptiveButtonPreviewState, string> = {
  default: 'Default',
  hover: 'Hover',
  active: 'Clicked',
  disabled: 'Disabled',
}

export function DescriptiveButtonsLab() {
  const [disabled, setDisabled] = useState(false)

  return (
    <ComponentLabPage
      title="Descriptive buttons"
      description="This button type is used to provide short, contextual descriptions for our users. There is one variant and the states differ slightly from our usual button. See the components below for each state."
      examplesToolbar={
        <div className="flex flex-wrap items-end gap-6">
          <LabCheckbox label="Disabled" checked={disabled} onCheckedChange={setDisabled} />
        </div>
      }
      examples={
        <div className="flex w-full flex-col gap-8">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            <div className={labComponentContainerClass}>
              <div className="flex min-h-24 items-center justify-center p-6">
                <AceDescriptiveButton
                  title={DEMO_TITLE}
                  description={DEMO_DESCRIPTION}
                  disabled={disabled}
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
                        {STATE_LABELS[state]}
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
      }
      code={
        <ComponentLabCode>{`import { AceDescriptiveButton } from '../components/molecules/AceDescriptiveButton'

<AceDescriptiveButton
  title="[Report Name]"
  description="This is the report description."
  onClick={() => { /* open report */ }}
/>

{/* Documentation-only frozen states */}
<AceDescriptiveButton
  title="[Report Name]"
  description="This is the report description."
  previewState="hover"
/>`}</ComponentLabCode>
      }
      usage={
        <div className={cn('max-w-3xl space-y-3', labUsageSectionClass)}>
          <ul className="m-0 list-disc space-y-1 ps-5 text-sm text-[var(--color-text-muted)]">
            <li>
              Use for secondary actions that need a short title plus supporting context (e.g. opening a
              named report).
            </li>
            <li>
              One visual variant — states are Default, Hover, Clicked (active), and Disabled. Hover uses
              Primary/50; Clicked uses Primary/100 with a Primary/400 border.
            </li>
            <li>
              Prefer <code className="text-[var(--color-text-primary)]">AceButton</code> for standard
              CTA actions without descriptive copy.
            </li>
            <li>
              Tokens live under <code className="text-[var(--color-text-primary)]">--ace-descriptive-button-*</code>{' '}
              in <code className="text-[var(--color-text-primary)]">variables.css</code>.
            </li>
          </ul>
        </div>
      }
    />
  )
}
