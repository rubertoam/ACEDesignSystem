import { cn } from '../../../lib/cn'
import type { ScreeningColumnKey } from './screeningTableColumns'

export const SCREENING_COLUMN_DRAG_MIME = 'text/screening-column-key'

export const screeningColumnMenuLabelClass = cn(
  '[font:var(--ace-type-label-bold)] [letter-spacing:var(--ace-type-label-bold-tracking)]',
  'px-[var(--space-3)] py-[var(--space-2)] text-[var(--screening-text-muted)]',
)

export const screeningColumnMenuRowClass = cn(
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]',
  'flex w-full cursor-pointer select-none items-center gap-2 px-[var(--space-3)] py-[var(--space-2)] text-[var(--screening-text-primary)] outline-none',
  'data-[highlighted]:bg-[var(--screening-surface-hover)]',
)

const screeningColumnDragMotionClass = cn(
  'duration-[140ms]',
  '[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]',
)

/** Shared with table row reorder so drag feedback matches column handles. */
export const screeningReorderDragMotionClass = screeningColumnDragMotionClass

export function reorderScreeningColumnKeys(
  order: ScreeningColumnKey[],
  fromKey: ScreeningColumnKey,
  toKey: ScreeningColumnKey,
  position: 'before' | 'after',
): ScreeningColumnKey[] {
  if (fromKey === toKey) return order
  const next = order.filter((key) => key !== fromKey)
  let insertIndex = next.indexOf(toKey)
  if (insertIndex === -1) return order
  if (position === 'after') insertIndex += 1
  next.splice(insertIndex, 0, fromKey)
  return next
}

export type ColumnDropIndicator = {
  targetKey: ScreeningColumnKey
  position: 'before' | 'after'
} | null
