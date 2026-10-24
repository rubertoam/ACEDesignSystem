import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { labUsageSectionClass } from '../lib/labExampleSection'

const titleClass =
  'm-0 text-sm font-semibold text-[var(--screening-text-primary)]'

const muted = 'text-[var(--screening-text-muted)]'

/** Wrapper for a full QA tab body. */
export function LabQaChecklist({
  intro,
  children,
}: {
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="space-y-8">
      {intro ? (
        <p className={cn('m-0 text-sm leading-relaxed', muted)}>{intro}</p>
      ) : (
        <p className={cn('m-0 text-sm leading-relaxed', muted)}>
          Walk the Examples toolbar and canvases in this lab. Check each item against the variants and states listed —
          fail the task if a listed combination is missing, incorrect, or inaccessible.
        </p>
      )}
      {children}
    </div>
  )
}

export function LabQaSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className={labUsageSectionClass}>
      <h4 className={titleClass}>{title}</h4>
      {children}
    </section>
  )
}

/** Bullet list of tester tasks (behavioral, not “looks good”). */
export function LabQaItems({ items }: { items: string[] }) {
  return (
    <ul className={cn('m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed', muted)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export type LabQaVariantRow = {
  /** Variant / prop / mode under test */
  variant: string
  /** What the tester must exercise */
  cover: string
  /** Pass criteria */
  pass: string
}

/** Variant matrix so testers hit the right control at the right time. */
export function LabQaVariantTable({ rows }: { rows: LabQaVariantRow[] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-md)] border border-solid border-[var(--screening-border-soft)]">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead className="bg-[var(--screening-surface-muted)]">
          <tr>
            {['Variant / mode', 'Cover', 'Pass when'].map((label) => (
              <th
                key={label}
                className="border-b border-[var(--screening-border-soft)] px-3 py-2 font-semibold text-[var(--screening-text-primary)]"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.variant} className="border-b border-[var(--screening-border-soft)] last:border-b-0">
              <td className="px-3 py-2 align-top font-medium text-[var(--screening-text-primary)]">{row.variant}</td>
              <td className={cn('px-3 py-2 align-top', muted)}>{row.cover}</td>
              <td className={cn('px-3 py-2 align-top', muted)}>{row.pass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Shared Usage section shell matching existing labs. */
export function LabUsageSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className={labUsageSectionClass}>
      <h4 className={titleClass}>{title}</h4>
      <div className={cn('space-y-2 text-sm leading-relaxed', muted)}>{children}</div>
    </section>
  )
}
