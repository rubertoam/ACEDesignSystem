import { AceStatusPill } from '../components/atoms/AceStatusPill/AceStatusPill'
import type { AceStatusPillVariant } from '../components/atoms/AceStatusPill/statusPillFieldStyles'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const VARIANTS: {
  value: AceStatusPillVariant
  label: string
  accentToken: string
  surfaceToken: string
  borderToken: string
}[] = [
  { value: 'purple', label: 'Purple', accentToken: 'Primary 400', surfaceToken: 'Primary 50', borderToken: 'Primary tint' },
  { value: 'orange', label: 'Orange', accentToken: 'Warning 500', surfaceToken: 'Warning 50', borderToken: 'Warning tint' },
  { value: 'green', label: 'Green', accentToken: 'Success 500', surfaceToken: 'Success 50', borderToken: 'Success tint' },
  { value: 'gray', label: 'Gray', accentToken: 'Neutral 700', surfaceToken: 'Neutral 50', borderToken: 'Neutral 400' },
  { value: 'blue', label: 'Blue', accentToken: 'Primary 500', surfaceToken: 'Primary 50', borderToken: 'Primary 200' },
  { value: 'yellow', label: 'Yellow', accentToken: 'Notice 500', surfaceToken: 'Notice 50', borderToken: 'Notice 200' },
  { value: 'pink', label: 'Pink', accentToken: 'Secondary Violet 400', surfaceToken: 'Secondary Violet 50', borderToken: 'Secondary Violet 200' },
  { value: 'teal', label: 'Teal', accentToken: 'Secondary FinScan Teal 500', surfaceToken: 'Secondary FinScan Teal 50', borderToken: 'Secondary FinScan Teal 200' },
  { value: 'red', label: 'Red', accentToken: 'Error 500', surfaceToken: 'Error 50', borderToken: 'Error tint' },
]

export function BadgesLab() {
  return (
    <ComponentLabPage
      title="Status pills"
      description="Compact status labels with a leading dot, matching the Review Assigned screening results table. Each variant uses a tinted border, 50-shade fill, saturated dot, and caption label — same pattern as New and Escalate in the prototype."
      examples={
        <div className={cn('space-y-4', labExampleSectionClass)}>
          <p className={labSectionLabelClass}>All variants</p>
          <div className="flex flex-wrap items-center gap-4">
            {VARIANTS.map(({ value, label }) => (
              <AceStatusPill key={value} variant={value}>
                {label}
              </AceStatusPill>
            ))}
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Pass label text as <code className="text-[var(--screening-text-primary)]">children</code>. Choose a color
            with <code className="text-[var(--screening-text-primary)]">variant</code>.
          </p>
          <ComponentLabCode>{`import { AceStatusPill } from '../components/atoms/AceStatusPill/AceStatusPill'

<AceStatusPill variant="purple">New</AceStatusPill>
<AceStatusPill variant="orange">Escalated</AceStatusPill>
<AceStatusPill variant="green">Complete</AceStatusPill>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use status pills for short, non-interactive row or field status labels. Keep copy concise — Caption
              Semi-Bold, matching the Review Assigned screening table.
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Variants</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              {VARIANTS.map(({ label, accentToken, surfaceToken, borderToken }) => (
                <li key={label}>
                  <strong className="text-[var(--screening-text-primary)]">{label}</strong> — {borderToken} border,{' '}
                  {surfaceToken} fill, {accentToken} dot and label
                </li>
              ))}
            </ul>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              The leading dot is decorative (<code className="text-[var(--screening-text-primary)]">aria-hidden</code>
              ). Status meaning should be conveyed by the visible label text.
            </p>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Layout — <code className="text-[var(--color-text-primary)]">--ace-status-pill-gap</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-status-pill-py</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-status-pill-pl</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-status-pill-pr</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-status-pill-dot-size</code>
          </li>
          <li>
            Type — Caption Semi-Bold (
            <code className="text-[var(--color-text-primary)]">--ace-type-caption-semi-bold</code>)
          </li>
          <li>
            Accent and surface colors are mapped per variant in{' '}
            <code className="text-[var(--color-text-primary)]">aceStatusPillVariantTokens</code>
          </li>
        </ul>
      }
    />
  )
}
