import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { AceDropdownMenu, type AceDropdownMenuEntry } from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { AceInputField } from '../../atoms/AceInputField'
import { AceStepper } from '../../molecules/AceStepper'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { cn } from '../../../lib/cn'
import type { ScreeningColumnKey } from './screeningTableColumns'

export const SCREENING_ROW_DRAG_MIME = 'text/screening-row-id'

export type DemoFeatureColumnKey = 'editable' | 'dropdown' | 'stepper'
export type ResizableColumnKey = ScreeningColumnKey | DemoFeatureColumnKey

export const DEMO_DROPDOWN_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'in-review', label: 'In review' },
] as const

export type DemoDropdownValue = (typeof DEMO_DROPDOWN_OPTIONS)[number]['value']

/** Hit target only — the full-column guide draws the visible line. */
export const screeningTableResizeHandleClass = cn(
  'absolute inset-y-0 -right-1 z-20 w-2 cursor-col-resize touch-none',
  'opacity-0 transition-opacity duration-150 ease-out',
  'group-hover/th:opacity-100 focus-visible:opacity-100',
  'focus-visible:outline-none',
)

/** Full-height resize guide — Primary / 200. */
export const screeningTableResizeGuideClass = cn(
  'pointer-events-none absolute top-0 bottom-0 z-30 w-0.5',
  'bg-[var(--screening-primary-200)]',
)

export function columnWidthStyle(width: number | undefined): CSSProperties | undefined {
  if (width == null) return undefined
  return { width, minWidth: width, maxWidth: width }
}

function guideLeftForColumn(columnEl: HTMLElement): number | null {
  const table = columnEl.closest('table')
  if (!table) return null
  const tableRect = table.getBoundingClientRect()
  const colRect = columnEl.getBoundingClientRect()
  return Math.round(colRect.right - tableRect.left)
}

export function useColumnResize(enabled: boolean) {
  const [columnWidths, setColumnWidths] = useState<Partial<Record<ResizableColumnKey, number>>>({})
  const [resizeGuideLeft, setResizeGuideLeft] = useState<number | null>(null)
  const sessionRef = useRef<{
    key: ResizableColumnKey
    startX: number
    startWidth: number
  } | null>(null)
  const activeColumnElRef = useRef<HTMLElement | null>(null)

  const showGuideForColumn = useCallback((columnEl: HTMLElement | null) => {
    if (!columnEl) {
      setResizeGuideLeft(null)
      return
    }
    activeColumnElRef.current = columnEl
    setResizeGuideLeft(guideLeftForColumn(columnEl))
  }, [])

  const hideGuideIfIdle = useCallback(() => {
    if (sessionRef.current) return
    activeColumnElRef.current = null
    setResizeGuideLeft(null)
  }, [])

  useEffect(() => {
    if (!enabled) {
      sessionRef.current = null
      activeColumnElRef.current = null
      setResizeGuideLeft(null)
      return
    }

    const onMove = (event: MouseEvent) => {
      const session = sessionRef.current
      if (!session) return
      const next = Math.max(72, Math.round(session.startWidth + (event.clientX - session.startX)))
      setColumnWidths((prev) => ({ ...prev, [session.key]: next }))
      window.requestAnimationFrame(() => {
        if (activeColumnElRef.current) {
          setResizeGuideLeft(guideLeftForColumn(activeColumnElRef.current))
        }
      })
    }

    const onUp = () => {
      if (!sessionRef.current) return
      sessionRef.current = null
      document.body.style.removeProperty('cursor')
      document.body.style.removeProperty('user-select')
      // Keep guide if still hovering the handle; clear will happen on mouse leave.
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      sessionRef.current = null
      document.body.style.removeProperty('cursor')
      document.body.style.removeProperty('user-select')
    }
  }, [enabled])

  const startResize = useCallback(
    (key: ResizableColumnKey, event: ReactMouseEvent<HTMLElement>, columnEl: HTMLElement | null) => {
      if (!enabled || !columnEl) return
      event.preventDefault()
      event.stopPropagation()
      activeColumnElRef.current = columnEl
      sessionRef.current = {
        key,
        startX: event.clientX,
        startWidth: columnEl.getBoundingClientRect().width,
      }
      setResizeGuideLeft(guideLeftForColumn(columnEl))
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    },
    [enabled],
  )

  return {
    columnWidths,
    startResize,
    resizeGuideLeft,
    showGuideForColumn,
    hideGuideIfIdle,
  }
}

export function ColumnResizeGuide({ left }: { left: number | null }) {
  if (left == null) return null
  return <div className={screeningTableResizeGuideClass} style={{ left }} aria-hidden />
}

export function ColumnResizeHandle({
  columnKey,
  label,
  enabled,
  onResizeStart,
}: {
  columnKey: ResizableColumnKey
  label: string
  enabled: boolean
  onResizeStart: (
    key: ResizableColumnKey,
    event: ReactMouseEvent<HTMLElement>,
    columnEl: HTMLElement | null,
  ) => void
}) {
  if (!enabled) return null
  return (
    <button
      type="button"
      aria-label={`Resize ${label} column`}
      className={screeningTableResizeHandleClass}
      onMouseDown={(event) => {
        const th = event.currentTarget.parentElement
        onResizeStart(columnKey, event, th)
      }}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    />
  )
}

const demoHeaderLabelClass = cn(
  '[font:var(--ace-type-label-bold)] [letter-spacing:var(--ace-type-label-bold-tracking)]',
  'inline-flex items-center leading-none uppercase tracking-wide',
  'text-[var(--screening-text-muted)] text-[length:var(--screening-table-header-font-size)]',
)

export function DemoFeatureHeaderCell({
  columnKey,
  label,
  width,
  columnResizing,
  onResizeStart,
  onGuideShow,
  onGuideHide,
}: {
  columnKey: DemoFeatureColumnKey
  label: string
  width?: number
  columnResizing: boolean
  onResizeStart: (
    key: ResizableColumnKey,
    event: ReactMouseEvent<HTMLElement>,
    columnEl: HTMLElement | null,
  ) => void
  onGuideShow?: (columnEl: HTMLElement) => void
  onGuideHide?: () => void
}) {
  return (
    <th
      scope="col"
      className={cn(
        'group/th relative h-8 px-[var(--space-3)] py-0 align-middle',
        columnResizing && 'select-none',
      )}
      style={columnWidthStyle(width)}
      onMouseEnter={
        columnResizing
          ? (event) => onGuideShow?.(event.currentTarget)
          : undefined
      }
      onMouseLeave={columnResizing ? () => onGuideHide?.() : undefined}
    >
      <span className={demoHeaderLabelClass}>{label}</span>
      <ColumnResizeHandle
        columnKey={columnKey}
        label={label}
        enabled={columnResizing}
        onResizeStart={onResizeStart}
      />
    </th>
  )
}

export function EditableCell({
  value,
  disabled,
  onChange,
  width,
}: {
  value: string
  disabled?: boolean
  onChange: (value: string) => void
  width?: number
}) {
  return (
    <td className="px-[var(--space-3)] py-[var(--space-2)] align-middle" style={columnWidthStyle(width)}>
      <AceInputField
        fieldSize="md"
        value={value}
        disabled={disabled}
        placeholder="Enter value"
        aria-label="Editable cell"
        onChange={(event) => onChange(event.target.value)}
        className="w-full min-w-0"
      />
    </td>
  )
}

export function DropdownCell({
  value,
  disabled,
  onChange,
  width,
}: {
  value: DemoDropdownValue
  disabled?: boolean
  onChange: (value: DemoDropdownValue) => void
  width?: number
}) {
  const items: AceDropdownMenuEntry[] = DEMO_DROPDOWN_OPTIONS.map((option) => ({
    type: 'item',
    label: option.label,
    selected: option.value === value,
    onSelect: () => onChange(option.value),
  }))
  const label = DEMO_DROPDOWN_OPTIONS.find((option) => option.value === value)?.label ?? 'Select'

  return (
    <td className="px-[var(--space-3)] py-[var(--space-2)] align-middle" style={columnWidthStyle(width)}>
      <AceDropdownMenu
        triggerLabel={label}
        triggerMode="field"
        size="md"
        align="start"
        panelWidth="wide"
        disabled={disabled}
        items={items}
      />
    </td>
  )
}

export function StepperCell({
  value,
  disabled,
  min = 0,
  max = 99,
  onChange,
  width,
}: {
  value: number
  disabled?: boolean
  min?: number
  max?: number
  onChange: (value: number) => void
  width?: number
}) {
  return (
    <td className="px-[var(--space-3)] py-[var(--space-2)] align-middle" style={columnWidthStyle(width)}>
      <AceStepper
        variant="horizontal"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onValueChange={onChange}
        aria-label="Count"
      />
    </td>
  )
}

export function RowDragHandle({
  disabled,
  onPointerDragStart,
}: {
  disabled?: boolean
  onPointerDragStart: (event: ReactPointerEvent<HTMLElement>) => void
}) {
  return (
    <span
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Reorder row"
      aria-disabled={disabled || undefined}
      className={cn(
        'inline-flex size-5 shrink-0 items-center justify-center rounded',
        'text-[var(--screening-icon-muted)]',
        disabled
          ? 'cursor-default opacity-40'
          : 'cursor-grab active:cursor-grabbing hover:text-[var(--screening-text-primary)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
      )}
      onPointerDown={(event) => {
        if (disabled) return
        if (event.button !== 0) return
        event.preventDefault()
        event.stopPropagation()
        onPointerDragStart(event)
      }}
      onKeyDown={(event) => {
        if (disabled) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
        }
      }}
    >
      <MaterialSymbol name="drag_handle" size="sm" weight={300} className="leading-none" />
    </span>
  )
}

export function reorderIds(
  order: string[],
  fromId: string,
  toId: string,
  position: 'before' | 'after' = 'before',
): string[] {
  if (fromId === toId) return order
  const next = order.filter((id) => id !== fromId)
  let insertIndex = next.indexOf(toId)
  if (insertIndex === -1) return order
  if (position === 'after') insertIndex += 1
  next.splice(insertIndex, 0, fromId)
  return next
}

export type RowDropIndicator = {
  targetId: string
  position: 'before' | 'after'
} | null

/** Matches columns-menu drag: faded + slight scale, stays in place (no lift ghost). */
export const screeningTableRowDraggingClass = cn(
  'z-10 scale-[0.99] opacity-55',
  'transition-[opacity,transform]',
  'duration-[140ms]',
  '[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]',
)

export const screeningTableRowDragPeerClass = cn(
  'opacity-95',
  'transition-[opacity,transform]',
  'duration-[140ms]',
  '[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]',
)

export const screeningTableRowDropLineClass = cn(
  'pointer-events-none relative mx-2 h-0.5 rounded-full',
  'bg-[var(--screening-pill-new-border)]',
  'shadow-[0_0_10px_color-mix(in_srgb,var(--screening-primary)_20%,transparent)]',
  'origin-center scale-x-100 opacity-100',
  'transition-[opacity,transform]',
  'duration-[140ms]',
  '[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]',
)

export function usePointerRowReorder({
  enabled,
  onReorder,
}: {
  enabled: boolean
  onReorder: (fromId: string, toId: string, position: 'before' | 'after') => void
}) {
  const [draggedRowId, setDraggedRowId] = useState<string | null>(null)
  const [rowDropIndicator, setRowDropIndicator] = useState<RowDropIndicator>(null)
  const dropIndicatorRef = useRef<RowDropIndicator>(null)
  const draggedRowIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      draggedRowIdRef.current = null
      dropIndicatorRef.current = null
      setDraggedRowId(null)
      setRowDropIndicator(null)
    }
  }, [enabled])

  const beginDrag = useCallback(
    (rowId: string, event: ReactPointerEvent<HTMLElement>) => {
      if (!enabled) return
      event.preventDefault()
      draggedRowIdRef.current = rowId
      dropIndicatorRef.current = null
      setDraggedRowId(rowId)
      setRowDropIndicator(null)
    },
    [enabled],
  )

  useEffect(() => {
    if (!draggedRowId) return

    const onMove = (event: PointerEvent) => {
      const stack = document.elementsFromPoint(event.clientX, event.clientY)
      const targetRow = stack
        .map((node) => (node instanceof Element ? node.closest('tr[data-screening-row-id]') : null))
        .find((node): node is HTMLElement => node instanceof HTMLElement)

      if (!targetRow) return

      const targetId = targetRow.dataset.screeningRowId
      if (!targetId || targetId === draggedRowIdRef.current) return

      const rect = targetRow.getBoundingClientRect()
      const position = event.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
      const next: RowDropIndicator = { targetId, position }
      // Keep ref in sync immediately — pointerup can fire before React effects flush.
      dropIndicatorRef.current = next
      setRowDropIndicator((prev) =>
        prev?.targetId === next.targetId && prev.position === next.position ? prev : next,
      )
    }

    const onUp = () => {
      const fromId = draggedRowIdRef.current
      const indicator = dropIndicatorRef.current
      if (fromId && indicator && indicator.targetId !== fromId) {
        onReorder(fromId, indicator.targetId, indicator.position)
      }
      draggedRowIdRef.current = null
      dropIndicatorRef.current = null
      setDraggedRowId(null)
      setRowDropIndicator(null)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.body.style.removeProperty('user-select')
      document.body.style.removeProperty('cursor')
    }
  }, [draggedRowId, onReorder])

  return {
    draggedRowId,
    rowDropIndicator,
    beginDrag,
  }
}

export function applyManualRowOrder<T extends { id: string }>(
  rows: T[],
  manualOrder: string[] | null,
): T[] {
  if (!manualOrder || manualOrder.length === 0) return rows
  const byId = new Map(rows.map((row) => [row.id, row]))
  const ordered: T[] = []
  for (const id of manualOrder) {
    const row = byId.get(id)
    if (row) {
      ordered.push(row)
      byId.delete(id)
    }
  }
  for (const row of rows) {
    if (byId.has(row.id)) ordered.push(row)
  }
  return ordered
}

export function DemoFeatureHeaderCells({
  showEditableCells,
  showDropdownColumn,
  showStepperColumn,
  columnWidths,
  columnResizing,
  onResizeStart,
  onGuideShow,
  onGuideHide,
}: {
  showEditableCells: boolean
  showDropdownColumn: boolean
  showStepperColumn: boolean
  columnWidths: Partial<Record<ResizableColumnKey, number>>
  columnResizing: boolean
  onResizeStart: (
    key: ResizableColumnKey,
    event: ReactMouseEvent<HTMLElement>,
    columnEl: HTMLElement | null,
  ) => void
  onGuideShow?: (columnEl: HTMLElement) => void
  onGuideHide?: () => void
}): ReactNode {
  return (
    <>
      {showEditableCells ? (
        <DemoFeatureHeaderCell
          columnKey="editable"
          label="Notes"
          width={columnWidths.editable}
          columnResizing={columnResizing}
          onResizeStart={onResizeStart}
          onGuideShow={onGuideShow}
          onGuideHide={onGuideHide}
        />
      ) : null}
      {showDropdownColumn ? (
        <DemoFeatureHeaderCell
          columnKey="dropdown"
          label="Decision"
          width={columnWidths.dropdown}
          columnResizing={columnResizing}
          onResizeStart={onResizeStart}
          onGuideShow={onGuideShow}
          onGuideHide={onGuideHide}
        />
      ) : null}
      {showStepperColumn ? (
        <DemoFeatureHeaderCell
          columnKey="stepper"
          label="Count"
          width={columnWidths.stepper}
          columnResizing={columnResizing}
          onResizeStart={onResizeStart}
          onGuideShow={onGuideShow}
          onGuideHide={onGuideHide}
        />
      ) : null}
    </>
  )
}
