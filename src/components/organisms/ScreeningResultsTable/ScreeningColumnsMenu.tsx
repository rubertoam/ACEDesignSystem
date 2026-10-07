import { useCallback, useMemo, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Toggle } from '../../atoms/Toggle/Toggle'
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
  screeningColumnMenuLabelClass,
  screeningColumnMenuRowClass,
} from './screeningTableColumnMenu'
import { screeningToolbarIconButtonClass } from './screeningTableToolbar'

export type ScreeningColumnsMenuProps = {
  visibleColumns?: Set<ScreeningColumnKey>
  onVisibleColumnsChange?: (next: Set<ScreeningColumnKey>) => void
  /** Display order only — reorder happens on table headers, not in this menu. */
  columnOrder?: ScreeningColumnKey[]
  className?: string
}

export function ScreeningColumnsMenu({
  visibleColumns: visibleColumnsProp,
  onVisibleColumnsChange,
  columnOrder: columnOrderProp,
  className,
}: ScreeningColumnsMenuProps) {
  const [internalVisible, setInternalVisible] = useState(
    () => new Set(DEFAULT_VISIBLE_SCREENING_COLUMNS),
  )

  const visibleColumns = visibleColumnsProp ?? internalVisible
  const columnOrder = columnOrderProp ?? DEFAULT_SCREENING_COLUMN_ORDER

  const setVisibleColumns = useCallback(
    (action: Set<ScreeningColumnKey> | ((prev: Set<ScreeningColumnKey>) => Set<ScreeningColumnKey>)) => {
      const prev = visibleColumnsProp ?? internalVisible
      const next = typeof action === 'function' ? action(prev) : action
      if (onVisibleColumnsChange) onVisibleColumnsChange(next)
      else setInternalVisible(next)
    },
    [internalVisible, onVisibleColumnsChange, visibleColumnsProp],
  )

  const columnMenuOptions = useMemo(
    () =>
      columnOrder.map((key) => {
        const column = SCREENING_COLUMN_DEFINITIONS.find((definition) => definition.key === key)
        return { key, label: column?.label ?? key }
      }),
    [columnOrder],
  )

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

  return (
    <DropdownMenu.Root modal={false}>
      <AceTooltip>
        <AceTooltipTrigger asChild>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label="Edit Columns"
              className={cn(screeningToolbarIconButtonClass, className)}
            >
              <MaterialSymbol name="view_list" size="md" weight={300} />
            </button>
          </DropdownMenu.Trigger>
        </AceTooltipTrigger>
        <AceTooltipContent side="top" hideArrow variant="screening-toolbar">
          Edit Columns
        </AceTooltipContent>
      </AceTooltip>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          collisionPadding={8}
          className={cn(aceDropdownMenuPanelClass, 'min-w-[15rem] p-1')}
        >
          <DropdownMenu.Label className={screeningColumnMenuLabelClass}>Columns</DropdownMenu.Label>
          {columnMenuOptions.map((column) => {
            const checked = visibleColumns.has(column.key)
            const disabled = checked && visibleColumns.size <= 1
            return (
              <DropdownMenu.Item
                key={column.key}
                disabled={disabled}
                aria-label={column.label}
                className={screeningColumnMenuRowClass}
                onSelect={(event) => {
                  event.preventDefault()
                  if (!disabled) toggleColumnVisibility(column.key, !checked)
                }}
              >
                <Toggle
                  size="sm"
                  checked={checked}
                  disabled={disabled}
                  tabIndex={-1}
                  className="pointer-events-none self-center"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate self-center text-left">{column.label}</span>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
