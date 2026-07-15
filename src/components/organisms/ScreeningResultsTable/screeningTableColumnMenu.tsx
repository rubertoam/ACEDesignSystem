import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Toggle } from '../../atoms/Toggle/Toggle'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
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

/** Shared with table row reorder so drag feedback matches column toggles. */
export const screeningReorderDragMotionClass = screeningColumnDragMotionClass

export const screeningColumnDropLineClass = cn(
  'pointer-events-none absolute inset-x-2 z-20 h-0.5 rounded-full',
  'bg-[var(--screening-pill-new-border)]',
  'shadow-[0_0_10px_color-mix(in_srgb,var(--screening-primary)_20%,transparent)]',
  'origin-center transition-[opacity,transform]',
  screeningColumnDragMotionClass,
)

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

type ScreeningColumnReorderMenuItemProps = {
  columnKey: ScreeningColumnKey
  label: string
  checked: boolean
  disabled?: boolean
  draggedColumnKey: ScreeningColumnKey | null
  dropIndicator: ColumnDropIndicator
  onCheckedChange: (checked: boolean) => void
  onReorder: (fromKey: ScreeningColumnKey, toKey: ScreeningColumnKey, position: 'before' | 'after') => void
  onDropIndicatorChange: (indicator: ColumnDropIndicator) => void
  onDraggedColumnKeyChange: (key: ScreeningColumnKey | null) => void
  onItemRef: (key: ScreeningColumnKey, node: HTMLElement | null) => void
}

export function ScreeningColumnReorderMenuItem({
  columnKey,
  label,
  checked,
  disabled,
  draggedColumnKey,
  dropIndicator,
  onCheckedChange,
  onReorder,
  onDropIndicatorChange,
  onDraggedColumnKeyChange,
  onItemRef,
}: ScreeningColumnReorderMenuItemProps) {
  const isDragging = draggedColumnKey === columnKey
  const isDragSessionActive = draggedColumnKey !== null

  return (
    <DropdownMenu.Item
      ref={(node) => onItemRef(columnKey, node)}
      data-slot="dropdown-menu-toggle-item"
      disabled={disabled}
      aria-label={label}
      className={cn(
        screeningColumnMenuRowClass,
        'group/column-row relative',
        isDragSessionActive && cn('transition-[opacity,transform]', screeningColumnDragMotionClass),
        isDragging && 'z-10 scale-[0.99] opacity-55',
        !isDragging && isDragSessionActive && 'opacity-95',
      )}
      onSelect={(event) => {
        event.preventDefault()
        if (!disabled) onCheckedChange(!checked)
      }}
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
        if (draggedColumnKey === columnKey) return
        const rect = event.currentTarget.getBoundingClientRect()
        const position = event.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
        onDropIndicatorChange({ targetKey: columnKey, position })
      }}
      onDrop={(event) => {
        event.preventDefault()
        event.stopPropagation()
        const fromKey = event.dataTransfer.getData(SCREENING_COLUMN_DRAG_MIME) as ScreeningColumnKey
        if (!fromKey || fromKey === columnKey) {
          onDropIndicatorChange(null)
          onDraggedColumnKeyChange(null)
          return
        }
        const rect = event.currentTarget.getBoundingClientRect()
        const position = event.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
        onReorder(fromKey, columnKey, dropIndicator?.position ?? position)
        onDropIndicatorChange(null)
        onDraggedColumnKeyChange(null)
      }}
    >
      <button
        type="button"
        draggable
        aria-label={`Reorder ${label}`}
        className={cn(
          'inline-flex h-5 w-5 shrink-0 items-center justify-center self-center rounded text-[var(--screening-icon-muted)]',
          'cursor-grab opacity-0 active:cursor-grabbing',
          'transition-opacity',
          screeningColumnDragMotionClass,
          'group-hover/column-row:opacity-100 focus-visible:opacity-100',
          isDragging && 'opacity-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
        )}
        onDragStart={(event) => {
          event.dataTransfer.setData(SCREENING_COLUMN_DRAG_MIME, columnKey)
          event.dataTransfer.effectAllowed = 'move'
          event.stopPropagation()
          onDraggedColumnKeyChange(columnKey)
        }}
        onDragEnd={() => {
          window.requestAnimationFrame(() => {
            onDropIndicatorChange(null)
            onDraggedColumnKeyChange(null)
          })
        }}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <MaterialSymbol name="drag_handle" size="sm" weight={300} className="leading-none" />
      </button>
      <Toggle
        size="sm"
        checked={checked}
        disabled={disabled}
        tabIndex={-1}
        className="pointer-events-none self-center"
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate self-center text-left">{label}</span>
    </DropdownMenu.Item>
  )
}
