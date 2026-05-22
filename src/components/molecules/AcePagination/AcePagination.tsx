import { useMemo, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AceDropdownMenu, type AceDropdownMenuEntry } from '../AceDropdownMenu/AceDropdownMenu'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'

const metaText =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--screening-text-primary)]'

export type AcePaginationProps = {
  totalItems: number
  page: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  /** Portal target so the page-size menu inherits `data-theme` from an ancestor. */
  portalContainer?: HTMLElement | null
  className?: string
}

export function rangeLabel(page: number, pageSize: number, total: number): string {
  if (total === 0) return `0 - 0 of 0`
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  return `${start} - ${end} of ${total}`
}

/** Page numbers with ellipses for table footer (Review Assigned / ACE pattern). */
export function visiblePageItems(page: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const set = new Set<number>()
  set.add(1)
  set.add(totalPages)
  for (let i = page - 1; i <= page + 1; i++) {
    if (i >= 1 && i <= totalPages) set.add(i)
  }
  const sorted = [...set].sort((a, b) => a - b)
  const out: (number | 'ellipsis')[] = []
  let prev = 0
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push('ellipsis')
    out.push(p)
    prev = p
  }
  return out
}

export function AcePagination({
  totalItems,
  page,
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  portalContainer: portalContainerProp,
  className,
}: AcePaginationProps) {
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null)
  const portalContainer = portalContainerProp ?? portalHost

  const pageSizeMenuItems = useMemo<AceDropdownMenuEntry[]>(
    () => [
      {
        type: 'radioGroup',
        value: String(pageSize),
        onValueChange: (value) => onPageSizeChange?.(Number(value)),
        options: pageSizeOptions.map((n) => ({
          value: String(n),
          label: String(n),
        })),
      },
    ],
    [pageSize, pageSizeOptions, onPageSizeChange],
  )

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const pageSafe = Math.min(Math.max(1, page), totalPages)
  const items = visiblePageItems(pageSafe, totalPages)
  const canPrev = pageSafe > 1
  const canNext = pageSafe < totalPages

  const pageBtn = (p: number) => {
    const active = p === pageSafe
    return (
      <button
        key={p}
        type="button"
        aria-label={`Page ${p}`}
        aria-current={active ? 'page' : undefined}
        onClick={() => onPageChange(p)}
        className={cn(
          'inline-flex size-[var(--screening-pagination-btn-size)] shrink-0 items-center justify-center rounded-[var(--screening-pagination-btn-radius)] border border-solid text-sm font-semibold leading-5 transition-colors',
          active
            ? 'border-[var(--screening-primary)] bg-[var(--screening-primary)] text-[var(--screening-text-on-primary)]'
            : 'border-[var(--screening-primary)] bg-[var(--screening-surface)] text-[var(--screening-text-primary)] hover:bg-[var(--screening-surface-hover)]',
        )}
      >
        {p}
      </button>
    )
  }

  return (
    <div
      ref={setPortalHost}
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        metaText,
        className,
      )}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <span className="shrink-0 whitespace-nowrap">{rangeLabel(pageSafe, pageSize, totalItems)}</span>
        {onPageSizeChange ? (
          <div className="flex shrink-0 items-center gap-2">
            <span className="whitespace-nowrap">Show</span>
            <AceDropdownMenu
              triggerLabel={String(pageSize)}
              triggerMode="field"
              size="sm"
              align="start"
              panelWidth="compact"
              items={pageSizeMenuItems}
              portalContainer={portalContainer}
              className="w-auto min-w-[4.375rem] max-w-[5.5rem] shrink-0"
            />
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-[var(--screening-pagination-gap)]">
        <IconNavButton label="Previous page" disabled={!canPrev} onClick={() => onPageChange(pageSafe - 1)}>
          <ChevronLeft className={aceChevronIconClass} strokeWidth={2} />
        </IconNavButton>
        {items.map((item, i) =>
          item === 'ellipsis' ? (
            <span
              key={`e-${i}`}
              className="inline-flex min-w-[1.75rem] items-center justify-center px-1 text-base leading-6 text-[var(--screening-text-primary)]"
              aria-hidden
            >
              …
            </span>
          ) : (
            pageBtn(item)
          ),
        )}
        <IconNavButton label="Next page" disabled={!canNext} onClick={() => onPageChange(pageSafe + 1)}>
          <ChevronRight className={aceChevronIconClass} strokeWidth={2} />
        </IconNavButton>
      </div>
    </div>
  )
}

function IconNavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex size-[var(--screening-pagination-btn-size)] shrink-0 items-center justify-center rounded-[var(--screening-pagination-btn-radius)] border border-solid border-[var(--screening-primary)] bg-[var(--screening-surface)] text-[var(--screening-text-primary)] transition-colors',
        'hover:bg-[var(--screening-surface-hover)] disabled:cursor-not-allowed disabled:opacity-50',
      )}
    >
      {children}
    </button>
  )
}

/** @deprecated Use AcePagination */
export const TablePagination = AcePagination
export type TablePaginationProps = AcePaginationProps
