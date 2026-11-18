import { cn } from '../lib/cn'
import { labExampleSectionClass } from '../lib/labExampleSection'
import { ComponentLabPage } from './ComponentLabPage'
import { dropShadowsLabCode, dropShadowsLabQa, dropShadowsLabUsage } from './labTabDocs'
type ShadowRow = {
  title: string
  spec: string
  cssVar: string
}

const SHADOW_ROWS: ShadowRow[] = [
  { title: 'Shadow (None)', spec: 'Blur: 0, Y: 0, A: 0%', cssVar: '--shadow-none' },
  { title: 'Shadow (XS)', spec: 'Blur: 8, Y: 4, A: 10%', cssVar: '--shadow-xs' },
  { title: 'Shadow (SM)', spec: 'Blur: 12, Y: 6, A: 10%', cssVar: '--shadow-sm' },
  { title: 'Shadow (MD)', spec: 'Blur: 16, Y: 8, A: 10%', cssVar: '--shadow-md' },
  { title: 'Shadow (LG)', spec: 'Blur: 20, Y: 10, A: 10%', cssVar: '--shadow-lg' },
  { title: 'Shadow (XL)', spec: 'Blur: 24, Y: 12, A: 10%', cssVar: '--shadow-xl' },
]

function ShadowDemoCard({ cssVar }: { cssVar: string }) {
  const v = `var(${cssVar})`
  return (
    <div
      className="min-h-[12rem] w-full min-w-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]"
      style={{ boxShadow: v }}
    />
  )
}

export function DropShadowsLab() {
  return (
    <ComponentLabPage
      qa={dropShadowsLabQa}
      title="Shadows"
      description="Figma Shadow (XS…XL) elevation tokens for single-layer drop shadows. Add via box-shadow using the --shadow-* variables in variables.css. Use the lab Theme control (top bar) for light vs dark surfaces."
      examples={
        <div className="space-y-8">
          {SHADOW_ROWS.map((row) => (
            <div
              key={row.cssVar}
              className={cn(
                'flex flex-col border-b border-[var(--color-border)] pb-8 last:border-0 last:pb-0 lg:flex-row lg:items-stretch lg:gap-8',
                labExampleSectionClass,
              )}
            >
              <div className="w-full shrink-0 space-y-2.5 lg:max-w-[20rem]">
                <h4 className="m-0 text-xl font-bold tracking-tight text-[var(--color-text-primary)]">{row.title}</h4>
                <p className="m-0 text-xs leading-snug text-[var(--color-text-muted)]">{row.spec}</p>
                <code className="block break-all text-[11px] text-[var(--color-text-muted)]">{row.cssVar}</code>
              </div>
              <div className="min-w-0 flex-1">
                <ShadowDemoCard cssVar={row.cssVar} />
              </div>
            </div>
          ))}
        </div>
      }
      code={dropShadowsLabCode}
      usage={dropShadowsLabUsage}
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--shadow-none</code> through{' '}
            <code className="text-[var(--color-text-primary)]">--shadow-xl</code> - defined in{' '}
            <code className="text-[var(--color-text-primary)]">src/styles/variables.css</code>; dark theme bumps alpha for legibility on dark surfaces.
          </li>
          <li>
            Lab shell <code className="text-[var(--color-text-primary)]">--lab-shadow-sm</code> is separate (lighter chrome); prefer Figma <code className="text-[var(--color-text-primary)]">--shadow-*</code> tokens for product elevation.
          </li>
        </ul>
      }
    />
  )
}
