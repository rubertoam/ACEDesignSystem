import { useState } from 'react'
import { ProgressIndicator } from '../components/atoms/ProgressIndicator'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { aceToggleLabelClass } from '../components/atoms/Toggle/toggleFieldStyles'
import { AccordionReviewProgress } from '../components/molecules/Accordion/AccordionReviewProgress'
import { LabControlField } from '../lib/labControls'
import { labSectionLabelClass } from '../lib/labExampleSection'
import { ComponentLabPage } from './ComponentLabPage'
import { progressLabCode, progressLabQa, progressLabUsage } from './labTabDocs'

export function ProgressIndicatorsLab() {
  const [filled, setFilled] = useState(false)
  const tone = filled ? 'brand' : 'surface'

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabControlField label="Filled" className="shrink-0">
          <div className="flex min-h-9 items-center gap-2">
            <Toggle size="sm" checked={filled} onCheckedChange={setFilled} aria-label="Filled" />
            <span className={aceToggleLabelClass}>{filled ? 'On' : 'Off'}</span>
          </div>
        </LabControlField>
      </div>

      <div className="flex flex-col gap-8 border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="flex flex-col gap-3">
          <p className={labSectionLabelClass}>Table / review progress</p>
          <div className="flex flex-wrap items-center justify-start gap-6">
            <AccordionReviewProgress reviewed={0} total={12} />
            <AccordionReviewProgress reviewed={5} total={12} />
            <AccordionReviewProgress reviewed={12} total={12} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className={labSectionLabelClass}>Processing - No Action</p>
          <div className="flex justify-start">
            <ProgressIndicator tone={tone} type="no-action" label="Progress" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className={labSectionLabelClass}>Processing - Action</p>
          <div className="flex justify-start">
            <ProgressIndicator tone={tone} type="action" label="Progress" onCancel={() => undefined} />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={progressLabQa}
      title="Progress Indicators"
      description="Table review progress and processing overlays - determinate bar for data tables, indeterminate spinner cards for long-running actions (Figma Progress Indicators 414:4109)."
      examplesCanvas={false}
      examplesToolbar={toolbar}
      code={progressLabCode}
      usage={progressLabUsage}
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--screening-text-muted)]">
          <li>
            Table bar:{' '}
            <code className="text-[var(--screening-text-primary)]">--screening-progress-track</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--screening-progress-fill</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--screening-progress-width</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--screening-progress-height</code>
          </li>
          <li>
            Processing:{' '}
            <code className="text-[var(--screening-text-primary)]">--progress-indicator-*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--progress-spinner-*</code>
          </li>
        </ul>
      }
    />
  )
}
