import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'

function aceTypography(token: string) {
  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`
}

const columnHeaderClass = cn(
  aceTypography('--ace-type-label-bold'),
  'uppercase text-[var(--screening-text-muted)]',
)

const cellTextClass = cn(
  aceTypography('--ace-type-paragraph-p1-regular'),
  'text-[var(--screening-text-primary)]',
)

export type AceTableColumn = {
  key: string
  header: string
}

export type AceTableProps = {
  columns: AceTableColumn[]
  /** Cell values may be plain text or custom nodes (e.g. status pills). */
  rows: Record<string, ReactNode>[]
  /** Accessible table name (visually hidden). */
  caption?: string
  className?: string
}

function isPlainTextCell(value: ReactNode): value is string | number {
  return typeof value === 'string' || typeof value === 'number'
}

export function AceTable({ columns, rows, caption, className }: AceTableProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-subtle)]',
        className,
      )}
    >
      <table className="w-full border-collapse text-left">
        {caption ? (
          <caption className="sr-only">{caption}</caption>
        ) : null}
        <thead className="border-b border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface-muted)]">
          <tr className="h-8">
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-[var(--space-3)] py-[var(--space-1)] align-middle">
                <span className={columnHeaderClass}>{col.header}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-solid border-[var(--screening-border-row)] bg-[var(--screening-surface)] last:border-b-0"
            >
              {columns.map((col) => {
                const value = row[col.key]
                return (
                  <td key={col.key} className="px-[var(--space-3)] py-[var(--space-3)] align-middle">
                    {isPlainTextCell(value) ? <span className={cellTextClass}>{value}</span> : (value ?? null)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
