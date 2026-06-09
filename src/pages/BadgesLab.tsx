import { useState } from 'react'
import { AceBadge } from '../components/atoms/AceBadge/AceBadge'
import type { AceBadgeVariant } from '../components/atoms/AceBadge/badgeFieldStyles'
import { LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const VARIANTS: { value: AceBadgeVariant; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'dismissible', label: 'Dismissible' },
]

const DEMO_LABEL = '[Placeholder Text]'

export function BadgesLab() {
  const [variant, setVariant] = useState<AceBadgeVariant>('active')
  const [visible, setVisible] = useState(true)

  const toolbar = (
    <LabSelect
      label="Variant"
      value={variant}
      onChange={(v) => {
        setVariant(v as AceBadgeVariant)
        setVisible(true)
      }}
      options={VARIANTS.map(({ value, label }) => ({ value, label }))}
    />
  )

  return (
    <ComponentLabPage
      title="Badges"
      description="Compact pill labels for status, filters, and metadata (Figma Tags 2347:669). Active uses FinScan Primary 400; inactive uses Primary 200 at 60% opacity; dismissible adds a trailing close control."
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-8">
          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            {variant === 'dismissible' ? (
              visible ? (
                <AceBadge variant="dismissible" onDismiss={() => setVisible(false)}>
                  {DEMO_LABEL}
                </AceBadge>
              ) : (
                <button
                  type="button"
                  className="text-sm text-[var(--screening-primary)] underline-offset-2 hover:underline"
                  onClick={() => setVisible(true)}
                >
                  Show badge again
                </button>
              )
            ) : (
              <AceBadge variant={variant}>{DEMO_LABEL}</AceBadge>
            )}
          </div>

          <div className={cn('space-y-4', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>All variants</p>
            <div className="flex flex-wrap items-center gap-4">
              <AceBadge variant="active">{DEMO_LABEL}</AceBadge>
              <AceBadge variant="inactive">{DEMO_LABEL}</AceBadge>
              <AceBadge variant="dismissible" onDismiss={() => undefined}>
                {DEMO_LABEL}
              </AceBadge>
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Pass label text as <code className="text-[var(--screening-text-primary)]">children</code>. Use{' '}
            <code className="text-[var(--screening-text-primary)]">onDismiss</code> with the dismissible variant.
          </p>
          <ComponentLabCode>{`import { AceBadge } from '../components/atoms/AceBadge/AceBadge'

<AceBadge variant="active">Active Jobs</AceBadge>
<AceBadge variant="inactive">Archived</AceBadge>
<AceBadge variant="dismissible" onDismiss={() => remove(id)}>
  Filter: Open
</AceBadge>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use badges for short, non-interactive labels (active / inactive) or removable filters and chips
              (dismissible). Keep copy concise — Footer Regular at 10px per the Figma spec.
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Variants</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">Active</strong> — Primary 400 fill, white
                label
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Inactive</strong> — Primary 200 fill at 60%
                opacity
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Dismissible</strong> — active styling plus
                close icon (8px gap)
              </li>
            </ul>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Dismissible badges expose an icon button with <code className="text-[var(--screening-text-primary)]">aria-label</code>{' '}
              (default “Remove badge”). Customize via <code className="text-[var(--screening-text-primary)]">dismissLabel</code>.
            </p>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-badge-active-bg</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-badge-inactive-bg</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-badge-text</code>
          </li>
          <li>
            Layout — <code className="text-[var(--color-text-primary)]">--ace-badge-px</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-badge-py</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-badge-gap</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-badge-radius</code>
          </li>
          <li>
            Type — Footer Regular (<code className="text-[var(--color-text-primary)]">--ace-type-footer-regular</code>)
          </li>
        </ul>
      }
    />
  )
}
