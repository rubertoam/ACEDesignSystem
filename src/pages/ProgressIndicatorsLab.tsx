import { useState } from 'react'
import { AceProgressIndicator } from '../components/atoms/AceProgressIndicator'
import { AceAccordionReviewProgress } from '../components/molecules/AceAccordion/AceAccordionReviewProgress'
import { LabCheckbox } from '../lib/labControls'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

export function ProgressIndicatorsLab() {
  const [filled, setFilled] = useState(false)
  const tone = filled ? 'brand' : 'surface'

  return (
    <ComponentLabPage
      title="Progress Indicators"
      description="Table review progress and processing overlays - determinate bar for data tables, indeterminate spinner cards for long-running actions (Figma Progress Indicators 414:4109)."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Table / review progress</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-wrap items-center gap-6">
                <AceAccordionReviewProgress reviewed={0} total={12} />
                <AceAccordionReviewProgress reviewed={5} total={12} />
                <AceAccordionReviewProgress reviewed={12} total={12} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <LabCheckbox label="Filled" checked={filled} onCheckedChange={setFilled} />
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Processing - No Action</p>
            <div className={labComponentContainerClass}>
              <AceProgressIndicator tone={tone} type="no-action" label="Progress" />
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Processing - Action</p>
            <div className={labComponentContainerClass}>
              <AceProgressIndicator
                tone={tone}
                type="action"
                label="Progress"
                onCancel={() => undefined}
              />
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Use <code className="text-[var(--screening-text-primary)]">AceAccordionReviewProgress</code> for
            determinate table review counts. Use{' '}
            <code className="text-[var(--screening-text-primary)]">AceProgressIndicator</code> for indeterminate
            processing cards. Default{' '}
            <code className="text-[var(--screening-text-primary)]">tone=&quot;surface&quot;</code> (outlined). Set{' '}
            <code className="text-[var(--screening-text-primary)]">tone=&quot;brand&quot;</code> for the filled purple
            treatment. <code className="text-[var(--screening-text-primary)]">type</code> is{' '}
            <code className="text-[var(--screening-text-primary)]">no-action</code> or{' '}
            <code className="text-[var(--screening-text-primary)]">action</code> (Cancel via{' '}
            <code className="text-[var(--screening-text-primary)]">onCancel</code>).
          </p>
          <ComponentLabCode>{`import { AceProgressIndicator } from '../components/atoms/AceProgressIndicator'
import { AceAccordionReviewProgress } from '../components/molecules/AceAccordion/AceAccordionReviewProgress'

<AceAccordionReviewProgress reviewed={5} total={12} />

{/* Outlined (default) */}
<AceProgressIndicator tone="surface" type="no-action" label="Progress" />

{/* Filled */}
<AceProgressIndicator tone="brand" type="no-action" label="Progress" />

<AceProgressIndicator
  tone="brand"
  type="action"
  label="Progress"
  onCancel={() => { /* abort */ }}
/>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              <strong className="text-[var(--screening-text-primary)]">Table / review progress</strong>: show how many
              rows are reviewed in screening results or accordion headers.{' '}
              <strong className="text-[var(--screening-text-primary)]">Processing</strong>: block or overlay while a
              copy, export, or similar job runs. Prefer{' '}
              <strong className="text-[var(--screening-text-primary)]">Action</strong> when the user can cancel.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Variants</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">Filled off</strong> (
                <code className="text-[var(--screening-text-primary)]">tone=&quot;surface&quot;</code>): white surface,
                brand border, brand spinner and label.
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Filled on</strong> (
                <code className="text-[var(--screening-text-primary)]">tone=&quot;brand&quot;</code>): solid FinScan
                Primary fill, light spinner and label.
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">type=&quot;no-action&quot;</strong>: spinner +
                status only.
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">type=&quot;action&quot;</strong>: adds secondary
                Cancel button.
              </li>
            </ul>
          </section>
        </>
      }
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
            <code className="text-[var(--screening-text-primary)]">--ace-progress-indicator-*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-progress-spinner-*</code>
          </li>
        </ul>
      }
    />
  )
}
