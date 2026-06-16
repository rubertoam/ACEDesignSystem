import { AceTimeline, DEMO_TIMELINE_ITEMS } from '../components/organisms/AceTimeline/AceTimeline'
import { AceTimelineItem } from '../components/organisms/AceTimeline/AceTimelineItem'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const BREAKDOWN_VARIANT = DEMO_TIMELINE_ITEMS[0]

export function TimelineLab() {
  return (
    <ComponentLabPage
      title="Timeline"
      description="Chronological event history for match and transaction workflows (Figma Timeline 4622:1645). Five status variants, sort control, expand-all, and per-item detail panels."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            <div className="w-full max-w-[52rem] min-w-0">
              <AceTimeline items={DEMO_TIMELINE_ITEMS} />
            </div>
          </div>

          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Component breakdown</p>
            <div className="flex w-full max-w-[52rem] flex-col gap-8">
              <div className="space-y-2">
                <p className="m-0 text-xs font-semibold text-[var(--screening-text-muted)]">Default</p>
                <AceTimelineItem
                  variant={BREAKDOWN_VARIANT.variant}
                  label={BREAKDOWN_VARIANT.label}
                  timestamp={BREAKDOWN_VARIANT.timestamp}
                  surface="default"
                  interactive={false}
                />
              </div>
              <div className="space-y-2">
                <p className="m-0 text-xs font-semibold text-[var(--screening-text-muted)]">Highlight</p>
                <AceTimelineItem
                  variant={BREAKDOWN_VARIANT.variant}
                  label={BREAKDOWN_VARIANT.label}
                  timestamp={BREAKDOWN_VARIANT.timestamp}
                  surface="highlight"
                  interactive={false}
                />
              </div>
              <div className="space-y-2">
                <p className="m-0 text-xs font-semibold text-[var(--screening-text-muted)]">Expanded</p>
                <AceTimelineItem
                  variant={BREAKDOWN_VARIANT.variant}
                  label={BREAKDOWN_VARIANT.label}
                  timestamp={BREAKDOWN_VARIANT.timestamp}
                  surface="expanded"
                  interactive={false}
                />
              </div>
            </div>
          </div>

          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>All status variants</p>
            <div className="flex w-full max-w-[52rem] flex-col gap-4">
              {DEMO_TIMELINE_ITEMS.map((item) => (
                <AceTimelineItem
                  key={item.id}
                  variant={item.variant}
                  label={item.label}
                  timestamp={item.timestamp}
                  interactive={false}
                  surface="highlight"
                />
              ))}
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Pass an array of items to <code className="text-[var(--screening-text-primary)]">AceTimeline</code>, or
            render <code className="text-[var(--screening-text-primary)]">AceTimelineItem</code> directly for custom
            layouts.
          </p>
          <ComponentLabCode>{`import {
  AceTimeline,
  DEMO_TIMELINE_ITEMS,
} from '../components/organisms/AceTimeline/AceTimeline'

<AceTimeline items={DEMO_TIMELINE_ITEMS} />

<AceTimelineItem
  variant="escalation"
  label="[Escalation]"
  timestamp="03-15-2026 14:22:10"
  processName="By Process Name"
  expanded
  onExpandedChange={setOpen}
  body={<p>Match detail content</p>}
/>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use the timeline for auditable histories where users scan status, timestamp, and process metadata, then
              expand rows for supporting detail. Each row expands when the full hoverable header is clicked; status
              icons grow subtly (10%) on hover.
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Variants</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">System action</strong> — automated process
                events
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Escalation</strong> — elevated review
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Pending</strong> — awaiting action
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Blocked</strong> — stopped / failed path
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Safe</strong> — cleared / successful outcome
              </li>
            </ul>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Shell — <code className="text-[var(--color-text-primary)]">--ace-timeline-border</code>, padding, item gap
          </li>
          <li>
            Typography — P2 title row, P1 subtitle, caption sort control
          </li>
          <li>
            Variants — icon and highlight tokens per status (
            <code className="text-[var(--color-text-primary)]">--ace-timeline-icon-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-timeline-highlight-*</code>)
          </li>
          <li>
            Motion — expand/collapse uses accordion tokens (
            <code className="text-[var(--color-text-primary)]">--ace-accordion-duration</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-accordion-ease</code>)
          </li>
        </ul>
      }
    />
  )
}
