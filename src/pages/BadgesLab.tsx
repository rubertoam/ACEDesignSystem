import { AceBadge } from '../components/atoms/AceBadge/AceBadge'
import type { AceBadgeVariant } from '../components/atoms/AceBadge/badgeFieldStyles'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const VARIANTS: {
  value: AceBadgeVariant
  label: string
}[] = [
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'green', label: 'Green' },
  { value: 'gray', label: 'Gray' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'pink', label: 'Pink' },
  { value: 'teal', label: 'Teal' },
  { value: 'red', label: 'Red' },
]

export function BadgesLab() {
  return (
    <ComponentLabPage
      title="Badges"
      description="Pills for screening table rows and tags for client profile accordion headers - both from the Review Assigned prototype, sharing the same color variants."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Pills</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-wrap items-center gap-4">
                {VARIANTS.map(({ value, label }) => (
                  <AceBadge key={value} appearance="pill" variant={value}>
                    {label}
                  </AceBadge>
                ))}
              </div>
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Tags</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-wrap items-center gap-4">
                {VARIANTS.map(({ value, label }) => (
                  <AceBadge key={value} appearance="tag" variant={value}>
                    {label}
                  </AceBadge>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Use <code className="text-[var(--screening-text-primary)]">appearance=&quot;pill&quot;</code> or{' '}
            <code className="text-[var(--screening-text-primary)]">appearance=&quot;tag&quot;</code>. Both share the same{' '}
            <code className="text-[var(--screening-text-primary)]">variant</code> colors. Pass label text as{' '}
            <code className="text-[var(--screening-text-primary)]">children</code>.
          </p>
          <ComponentLabCode>{`import { AceBadge } from '../components/atoms/AceBadge/AceBadge'

<AceBadge appearance="pill" variant="purple">Purple</AceBadge>
<AceBadge appearance="pill" variant="orange">Orange</AceBadge>

<AceBadge appearance="tag" variant="purple">Purple</AceBadge>
<AceBadge appearance="tag" variant="gray">Gray</AceBadge>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              <strong className="text-[var(--screening-text-primary)]">Pills</strong>: short row or field status
              labels with a leading color dot (screening results table).{' '}
              <strong className="text-[var(--screening-text-primary)]">Tags</strong>: compact meta chips in headers
              (client ID, country, DOB), same palette, squared corners, no dot.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Variants</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">purple</strong>: Purple · New
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">orange</strong>: Orange · Escalate
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">green</strong>: Green · Safe
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">gray</strong>: Gray · False Positive
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">blue</strong>: Blue · Research
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">yellow</strong>: Yellow · Flag
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">pink</strong>: Pink · Route
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">teal</strong>: Teal · Research
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">red</strong>: Red · Remediate
              </li>
            </ul>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Leading dots are decorative (
              <code className="text-[var(--screening-text-primary)]">aria-hidden</code>). Meaning should come from the
              visible label text.
            </p>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Pill layout - <code className="text-[var(--color-text-primary)]">--ace-status-pill-*</code>
          </li>
          <li>
            Tag layout - <code className="text-[var(--color-text-primary)]">--ace-badge-tag-*</code> (radius, padding);
            colors reuse the pill variant tokens
          </li>
          <li>
            Tag type - Caption Regular (
            <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>)
          </li>
        </ul>
      }
    />
  )
}
