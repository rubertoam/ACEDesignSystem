import { useState } from 'react'
import { ProgressIndicator } from '../components/atoms/ProgressIndicator'
import { AccordionReviewProgress } from '../components/molecules/Accordion/AccordionReviewProgress'
import { LabCheckbox } from '../lib/labControls'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabPage } from './ComponentLabPage'
import { progressLabCode, progressLabQa, progressLabUsage } from './labTabDocs'
export function ProgressIndicatorsLab() {
  const [filled, setFilled] = useState(false)
  const tone = filled ? 'brand' : 'surface'

  return (
    <ComponentLabPage
      qa={progressLabQa}
      title="Progress Indicators"
      description="Table review progress and processing overlays - determinate bar for data tables, indeterminate spinner cards for long-running actions (Figma Progress Indicators 414:4109)."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Table / review progress</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-wrap items-center gap-6">
                <AccordionReviewProgress reviewed={0} total={12} />
                <AccordionReviewProgress reviewed={5} total={12} />
                <AccordionReviewProgress reviewed={12} total={12} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <LabCheckbox label="Filled" checked={filled} onCheckedChange={setFilled} />
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Processing - No Action</p>
            <div className={labComponentContainerClass}>
              <ProgressIndicator tone={tone} type="no-action" label="Progress" />
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Processing - Action</p>
            <div className={labComponentContainerClass}>
              <ProgressIndicator
                tone={tone}
                type="action"
                label="Progress"
                onCancel={() => undefined}
              />
            </div>
          </div>
        </div>
      }
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
