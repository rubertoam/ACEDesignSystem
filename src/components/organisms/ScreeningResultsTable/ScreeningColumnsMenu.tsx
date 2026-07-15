import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  AceTooltip,
  AceTooltipContent,
  AceTooltipTrigger,
} from '../../atoms/AceTooltip/AceTooltip'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { aceDropdownMenuPanelClass } from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { cn } from '../../../lib/cn'
import {
  DEFAULT_SCREENING_COLUMN_ORDER,
  DEFAULT_VISIBLE_SCREENING_COLUMNS,
  SCREENING_COLUMN_DEFINITIONS,
  type ScreeningColumnKey,
} from './screeningTableColumns'
import {
  type ColumnDropIndicator,
  ScreeningColumnReorderMenuItem,
  reorderScreeningColumnKeys,
  screeningColumnDropLineClass,
  screeningColumnMenuLabelClass,
} from './screeningTableColumnMenu'
import { screeningToolbarIconButtonClass } from './screeningTableToolbar'

export type ScreeningColumnsMenuProps = {
  visibleColumns?: Set<ScreeningColumnKey>
  onVisibleColumnsChange?: (next: Set<ScreeningColumnKey>) => void
  columnOrder?: ScreeningColumnKey[]
  onColumnOrderChange?: (next: ScreeningColumnKey[]) => void
  className?: string
}

export function ScreeningColumnsMenu({
  visibleColumns: visibleColumnsProp,
  onVisibleColumnsChange,
  columnOrder: columnOrderProp,
  onColumnOrderChange,
  className,
}: ScreeningColumnsMenuProps) {
  const [internalVisible, setInternalVisible] = useState(
    () => new Set(DEFAULT_VISIBLE_SCREENING_COLUMNS),
  )
  const [internalOrder, setInternalOrder] = useState<ScreeningColumnKey[]>(
    () => [...DEFAULT_SCREENING_COLUMN_ORDER],
  )

  const visibleColumns = visibleColumnsProp ?? internalVisible
  const columnOrder = columnOrderProp ?? internalOrder

  const setVisibleColumns = useCallback(
    (action: Set<ScreeningColumnKey> | ((prev: Set<ScreeningColumnKey>) => Set<ScreeningColumnKey>)) => {
      const prev = visibleColumnsProp ?? internalVisible
      const next = typeof action === 'function' ? action(prev) : action
      if (onVisibleColumnsChange) onVisibleColumnsChange(next)
      else setInternalVisible(next)
    },
    [internalVisible, onVisibleColumnsChange, visibleColumnsProp],
  )

  const setColumnOrder = useCallback(
    (
      action: ScreeningColumnKey[] | ((prev: ScreeningColumnKey[]) => ScreeningColumnKey[]),
    ) => {
      const prev = columnOrderProp ?? internalOrder
      const next = typeof action === 'function' ? action(prev) : action
      if (onColumnOrderChange) onColumnOrderChange(next)
      else setInternalOrder(next)
    },
    [columnOrderProp, internalOrder, onColumnOrderChange],
  )

  const [columnDropIndicator, setColumnDropIndicator] = useState<ColumnDropIndicator>(null)
  const [draggedColumnKey, setDraggedColumnKey] = useState<ScreeningColumnKey | null>(null)
  const [columnDropLineTop, setColumnDropLineTop] = useState<number | null>(null)
  const columnListRef = useRef<HTMLDivElement>(null)
  const columnItemRefs = useRef(new Map<ScreeningColumnKey, HTMLElement>())
  const draggedColumnKeyRef = useRef<ScreeningColumnKey | null>(null)

  const columnMenuOptions = useMemo(
    () =>
      columnOrder.map((key) => {
        const column = SCREENING_COLUMN_DEFINITIONS.find((definition) => definition.key === key)
        return { key, label: column?.label ?? key }
      }),
    [columnOrder],
  )

  const registerColumnMenuItemRef = useCallback((key: ScreeningColumnKey, node: HTMLElement | null) => {
    if (node) columnItemRefs.current.set(key, node)
    else columnItemRefs.current.delete(key)
  }, [])

  const handleDraggedColumnKeyChange = useCallback((key: ScreeningColumnKey | null) => {
    draggedColumnKeyRef.current = key
    setDraggedColumnKey(key)
  }, [])

  useLayoutEffect(() => {
    if (!columnDropIndicator || !draggedColumnKey || !columnListRef.current) {
      setColumnDropLineTop(null)
      return
    }
    const item = columnItemRefs.current.get(columnDropIndicator.targetKey)
    if (!item) {
      setColumnDropLineTop(null)
      return
    }
    const listTop = columnListRef.current.getBoundingClientRect().top
    const itemRect = item.getBoundingClientRect()
    const relativeTop = itemRect.top - listTop
    setColumnDropLineTop(
      columnDropIndicator.position === 'before' ? relativeTop : relativeTop + itemRect.height,
    )
  }, [columnDropIndicator, draggedColumnKey, columnMenuOptions])

  const toggleColumnVisibility = useCallback(
    (key: ScreeningColumnKey, visible: boolean) => {
      setVisibleColumns((prev) => {
        const next = new Set(prev)
        if (visible) {
          next.add(key)
          return next
        }
        if (next.size <= 1) return prev
        next.delete(key)
        return next
      })
    },
    [setVisibleColumns],
  )

  const reorderColumns = useCallback(
    (fromKey: ScreeningColumnKey, toKey: ScreeningColumnKey, position: 'before' | 'after') => {
      setColumnOrder((prev) => reorderScreeningColumnKeys(prev, fromKey, toKey, position))
    },
    [setColumnOrder],
  )

  return (
    <DropdownMenu.Root
      modal={false}
      onOpenChange={(open) => {
        if (!open) {
          setColumnDropIndicator(null)
          handleDraggedColumnKeyChange(null)
          setColumnDropLineTop(null)
        }
      }}
    >
      <AceTooltip>
        <AceTooltipTrigger asChild>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label="Show or hide columns"
              className={cn(screeningToolbarIconButtonClass, className)}
            >
              <MaterialSymbol name="view_list" size="md" weight={300} />
            </button>
          </DropdownMenu.Trigger>
        </AceTooltipTrigger>
        <AceTooltipContent side="top" hideArrow variant="screening-toolbar">
          Columns
        </AceTooltipContent>
      </AceTooltip>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          collisionPadding={8}
          className={cn(aceDropdownMenuPanelClass, 'min-w-[15rem] p-1')}
          onPointerDownOutside={(event) => {
            if (draggedColumnKeyRef.current) event.preventDefault()
          }}
          onInteractOutside={(event) => {
            if (draggedColumnKeyRef.current) event.preventDefault()
          }}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setColumnDropIndicator(null)
              setColumnDropLineTop(null)
            }
          }}
        >
          <DropdownMenu.Label className={screeningColumnMenuLabelClass}>Columns</DropdownMenu.Label>
          <div
            ref={columnListRef}
            className="relative"
            onDragOver={(event) => event.preventDefault()}
          >
            {columnDropLineTop !== null ? (
              <span
                aria-hidden
                className={cn(
                  screeningColumnDropLineClass,
                  draggedColumnKey ? 'scale-x-100 opacity-100' : 'scale-x-[0.98] opacity-0',
                )}
                style={{ top: columnDropLineTop }}
              />
            ) : null}
            {columnMenuOptions.map((column) => (
              <ScreeningColumnReorderMenuItem
                key={column.key}
                columnKey={column.key}
                label={column.label}
                checked={visibleColumns.has(column.key)}
                disabled={visibleColumns.has(column.key) && visibleColumns.size <= 1}
                draggedColumnKey={draggedColumnKey}
                dropIndicator={columnDropIndicator}
                onCheckedChange={(checked) => toggleColumnVisibility(column.key, checked)}
                onReorder={reorderColumns}
                onDropIndicatorChange={setColumnDropIndicator}
                onDraggedColumnKeyChange={handleDraggedColumnKeyChange}
                onItemRef={registerColumnMenuItemRef}
              />
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
