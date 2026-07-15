import { cn } from '../lib/cn'
import { labExampleSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

type ShadowRow = {
  title: string
  spec: string
  cssVar: string
}

const SHADOW_ROWS: ShadowRow[] = [
  { title: 'Shadow (None)', spec: 'Blur: 0, Y: 0, A: 0%', cssVar: '--ace-drop-shadow-none' },
  { title: 'Shadow (XS)', spec: 'Blur: 8, Y: 4, A: 10%', cssVar: '--ace-drop-shadow-xs' },
  { title: 'Shadow (SM)', spec: 'Blur: 12, Y: 6, A: 10%', cssVar: '--ace-drop-shadow-sm' },
  { title: 'Shadow (MD)', spec: 'Blur: 16, Y: 8, A: 10%', cssVar: '--ace-drop-shadow-md' },
  { title: 'Shadow (LG)', spec: 'Blur: 20, Y: 10, A: 10%', cssVar: '--ace-drop-shadow-lg' },
  { title: 'Shadow (XL)', spec: 'Blur: 24, Y: 12, A: 10%', cssVar: '--ace-drop-shadow-xl' },
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
      title="Drop shadows"
      description="ACE elevation tokens for single-layer drop shadows (Figma Drop Shadows). Add via box-shadow using the --ace-drop-shadow-* variables in variables.css. Use the lab Theme control (top bar) for light vs dark surfaces."
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
      code={
        <ComponentLabCode>{`.elevated-card {
  box-shadow: var(--ace-drop-shadow-md);
  border-radius: var(--radius-lg);
}`}</ComponentLabCode>
      }
      usage={
        <div className="space-y-4">
          <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
            Apply the token as <code className="text-[var(--color-text-primary)]">box-shadow</code> (or map it in Tailwind with arbitrary{' '}
            <code className="text-[var(--color-text-primary)]">shadow-[var(--ace-drop-shadow-md)]</code>). Use larger steps for higher elevation;{' '}
            <code className="text-[var(--color-text-primary)]">none</code> removes shadow.
          </p>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            The dialog modal uses <code className="text-[var(--color-text-primary)]">--dialog-modal-shadow</code>, which resolves to{' '}
            <code className="text-[var(--color-text-primary)]">var(--ace-drop-shadow-xl)</code>.
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-none</code> through{' '}
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xl</code> - defined in{' '}
            <code className="text-[var(--color-text-primary)]">src/styles/variables.css</code>; dark theme bumps alpha for legibility on dark surfaces.
          </li>
          <li>
            Lab shell <code className="text-[var(--color-text-primary)]">--shadow-sm</code> is separate (lighter chrome); prefer ACE drop-shadow tokens for product elevation.
          </li>
        </ul>
      }
    />
  )
}
