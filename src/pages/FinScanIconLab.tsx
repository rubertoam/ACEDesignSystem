import { useState } from 'react'
import { FinScanIcon, type FinScanIconVariant } from '../components/atoms/FinScanIcon/FinScanIcon'
import { LabSelect } from '../lib/labControls'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const VARIANTS: { id: FinScanIconVariant; label: string; description: string }[] = [
  { id: 'lockup', label: 'Lockup', description: 'Hash mark + wordmark (site header)' },
  { id: 'mark', label: 'Hash mark', description: 'Icon only, 24×24' },
  { id: 'wordmark', label: 'Wordmark', description: 'FinScan® logotype, 118×24 at 24px height' },
]

const SIZES = [16, 24, 32, 48]

export function FinScanIconLab() {
  const [variant, setVariant] = useState<FinScanIconVariant>('lockup')
  const [size, setSize] = useState(24)

  return (
    <ComponentLabPage
      title="FinScan Logo"
      description="Official FinScan brand lockup from ACE Design System — hash mark dot grid and wordmark with registered trademark."
      examplesToolbar={
        <div className="flex flex-wrap items-end gap-6">
          <LabSelect
            label="Variant"
            value={variant}
            onChange={(v) => setVariant(v as FinScanIconVariant)}
            options={VARIANTS.map((v) => ({ value: v.id, label: v.label }))}
          />
          <LabSelect
            label="Size (px)"
            value={String(size)}
            onChange={(v) => setSize(Number(v))}
            options={SIZES.map((s) => ({ value: String(s), label: String(s) }))}
          />
        </div>
      }
      examples={
        <div className="flex flex-col gap-6 rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] p-8">
          <FinScanIcon variant={variant} size={size} aria-label="FinScan" />
          <p className="m-0 text-xs text-[var(--screening-text-muted)]">
            {VARIANTS.find((v) => v.id === variant)?.description}
          </p>
          <div className="flex flex-wrap gap-8 border-t border-solid border-[var(--screening-border-subtle)] pt-6">
            {VARIANTS.map((v) => (
              <div key={v.id} className="flex flex-col items-start gap-2">
                <span className="text-xs font-medium text-[var(--screening-text-muted)]">{v.label}</span>
                <FinScanIcon variant={v.id} size={24} aria-label={`FinScan ${v.label}`} />
              </div>
            ))}
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            SVG sources also live in <code className="text-[var(--screening-text-primary)]">public/brand/</code> for
            static export; React components use CSS tokens for fills.
          </p>
          <ComponentLabCode>{`import { FinScanIcon } from '../components/atoms/FinScanIcon/FinScanIcon'

<FinScanIcon variant="lockup" size={24} aria-label="FinScan" />
<FinScanIcon variant="mark" size={24} />
<FinScanIcon variant="wordmark" size={24} />`}</ComponentLabCode>
        </>
      }
      usage={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--screening-text-muted)]">
          <li>
            Use <code className="text-[var(--screening-text-primary)]">variant="lockup"</code> in{' '}
            <code className="text-[var(--screening-text-primary)]">AceSiteHeader</code> (default 24px height).
          </li>
          <li>
            Hash mark rows map to{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-finscan-mark-green</code>, blue, magenta, and
            primary.
          </li>
          <li>
            Wordmark fill: <code className="text-[var(--screening-text-primary)]">--ace-finscan-wordmark-fill</code>{' '}
            (#3D2E8A).
          </li>
          <li>Lockup gap: <code className="text-[var(--screening-text-primary)]">--ace-finscan-icon-gap</code> (12px).</li>
        </ul>
      }
      variables={
        <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-finscan-icon-gap</code>
          </li>
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-finscan-mark-green</code>
          </li>
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-finscan-mark-blue</code>
          </li>
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-finscan-mark-magenta</code>
          </li>
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-finscan-mark-primary</code>
          </li>
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-finscan-wordmark-fill</code>
          </li>
        </ul>
      }
    />
  )
}
