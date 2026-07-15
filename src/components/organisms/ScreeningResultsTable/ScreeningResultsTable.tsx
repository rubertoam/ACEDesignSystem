import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { AceBadge } from '../../atoms/AceBadge/AceBadge'
import { AceInputField } from '../../atoms/AceInputField'
import {
  AceTooltip,
  AceTooltipContent,
  AceTooltipIconWrap,
  AceTooltipTrigger,
} from '../../atoms/AceTooltip/AceTooltip'
import { AceFilterToggleChip } from '../../molecules/AceFiltering'
import { AceAccordion } from '../../molecules/AceAccordion/AceAccordion'
import { AceAccordionReviewProgress } from '../../molecules/AceAccordion/AceAccordionReviewProgress'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { TablePagination } from '../../molecules/TablePagination'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import {
  DEFAULT_SCREENING_COLUMN_ORDER,
  DEFAULT_VISIBLE_SCREENING_COLUMNS,
  SCREENING_COLUMN_DEFINITIONS,
  type ScreeningColumnKey,
} from './screeningTableColumns'
import { ScreeningColumnsMenu } from './ScreeningColumnsMenu'
import { ScreeningRowActionsMenu } from './ScreeningRowActionsMenu'
import {
  screeningStatusFilterLabelClass,
  screeningToolbarIconButtonClass,
} from './screeningTableToolbar'
import {
  screeningTableHeaderCellClass,
  screeningTableHeaderLabelClass,
  screeningTableHeaderRowClass,
  screeningTableHeaderSortButtonClass,
  screeningTableHeaderSortIconActiveClass,
  screeningTableHeaderSortIconIdleClass,
} from './screeningTableHeader'
import {
  applyManualRowOrder,
  ColumnResizeGuide,
  ColumnResizeHandle,
  DemoFeatureHeaderCells,
  DropdownCell,
  EditableCell,
  reorderIds,
  RowDragHandle,
  StepperCell,
  useColumnResize,
  usePointerRowReorder,
  columnWidthStyle,
  screeningTableRowDraggingClass,
  screeningTableRowDragPeerClass,
  screeningTableRowDropLineClass,
  type DemoDropdownValue,
} from './screeningTableDemoFeatures'
import type { SortKey } from './screeningTableTypes'
import {
  MOCK_ROWS,
  parseAgeForSort,
  scoreIsHighRisk,
  screeningDisabledRowClass,
  showMatchAgeStaleIndicator,
  tileSoftStyle,
  type ScreeningResultRow,
  type ScreeningRowStatus,
} from './screeningTypes'

export type { ScreeningResultRow, ScreeningRowStatus }
export { getScreeningRowsForCase, MOCK_ROWS } from './screeningTypes'

/** Maps ACE typography tokens (`typography-tokens.css`) to `font` + `letter-spacing`. */
function aceTypography(token: string) {
  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`
}

const ACE = {
  sectionTitle: '--ace-type-heading-h6-small-semi-bold',
  meta: '--ace-type-paragraph-p1-regular',
  filterLabel: '--ace-type-paragraph-p1-semi-bold',
  chip: '--ace-type-paragraph-p1-semi-bold',
  keyCode: '--ace-type-footer-semi-bold',
  cell: '--ace-type-paragraph-p1-regular',
  cellEmphasis: '--ace-type-paragraph-p1-semi-bold',
  emptyState: '--ace-type-paragraph-p1-regular',
  link: '--ace-type-paragraph-p1-semi-bold',
  detail: '--ace-type-paragraph-p1-regular',
  score: '--ace-type-paragraph-p1-semi-bold',
} as const

type SortDir = 'asc' | 'desc'

const checkboxPadWrapClass =
  'inline-flex items-center justify-center rounded p-[var(--space-1)] transition-opacity duration-200 ease-out'

/** Same hit box as medium checkbox pad wrap so expand chevron aligns with the checkbox. */
const expandChevronButtonClass =
  'inline-flex size-7 shrink-0 items-center justify-center rounded text-[var(--screening-text-primary)] transition-colors duration-200 ease-out hover:bg-[var(--screening-surface-hover)]'

const easeAccordion = '[transition-timing-function:var(--screening-ease-accordion)]'
const durationAccordion = 'duration-[var(--screening-duration-accordion)]'

export type ScreeningResultsTableVisibilityControls = {
  /** Collapsible accordion container around the table */
  showAccordionHeader: boolean
  /** “Filter by” label and status chips */
  showQuickFilters: boolean
  /** Columns visibility menu (toolbar icon left of search) */
  showColumnMenu: boolean
  /** Show / hide review history toggle (toolbar icon left of search) */
  showHistoryToggle: boolean
  /** Search field in the filter toolbar */
  showRowSearch: boolean
  /** Row and header selection checkboxes */
  showCheckboxes: boolean
  /** Expand / collapse chevrons (header and rows); expansion is disabled when off */
  showExpandChevrons: boolean
  /** Footer: result range, rows-per-page, and paging controls */
  showPagination: boolean
  /** Last three rows use disabled (reviewed) styling when on */
  showDisabledRows: boolean
  /** Demo: editable input cells column */
  showEditableCells: boolean
  /** Demo: drag handles to reorder rows */
  showDraggableRows: boolean
  /** Demo: dropdown select column */
  showDropdownColumn: boolean
  /** Demo: numeric stepper column */
  showStepperColumn: boolean
}

export const DEFAULT_SCREENING_TABLE_VISIBILITY_CONTROLS: ScreeningResultsTableVisibilityControls = {
  showAccordionHeader: false,
  showQuickFilters: true,
  showColumnMenu: true,
  showHistoryToggle: true,
  showRowSearch: true,
  showCheckboxes: true,
  showExpandChevrons: true,
  showPagination: false,
  showDisabledRows: true,
  showEditableCells: false,
  showDraggableRows: false,
  showDropdownColumn: false,
  showStepperColumn: false,
}

interface ScreeningResultsTableProps {
  rows?: ScreeningResultRow[]
  title?: string
  className?: string
  selectedIds?: Set<string>
  onSelectedIdsChange?: Dispatch<SetStateAction<Set<string>>>
  /** Toggle which regions of the table are visible for different embed contexts */
  visibilityControls?: Partial<ScreeningResultsTableVisibilityControls>
  /** When on, hovering a column header shows a drag handle to resize width */
  columnResizing?: boolean
}

export function ScreeningResultsTable({
  rows = MOCK_ROWS,
  title = 'Data Table',
  className,
  selectedIds: selectedIdsProp,
  onSelectedIdsChange,
  visibilityControls: visibilityControlsProp,
  columnResizing = false,
}: ScreeningResultsTableProps) {
  const visibilityControls = { ...DEFAULT_SCREENING_TABLE_VISIBILITY_CONTROLS, ...visibilityControlsProp }
  const hasControlColumn = visibilityControls.showExpandChevrons || visibilityControls.showCheckboxes
  const demoFeatureColumnCount =
    (visibilityControls.showEditableCells ? 1 : 0) +
    (visibilityControls.showDropdownColumn ? 1 : 0) +
    (visibilityControls.showStepperColumn ? 1 : 0)
  const tableCaptionId = useId()
  const [statusFilters, setStatusFilters] = useState<Set<ScreeningRowStatus>>(() => new Set())
  const [showReviewHistory, setShowReviewHistory] = useState(true)
  const [visibleColumns, setVisibleColumns] = useState<Set<ScreeningColumnKey>>(
    () => new Set(DEFAULT_VISIBLE_SCREENING_COLUMNS),
  )
  const [columnOrder, setColumnOrder] = useState<ScreeningColumnKey[]>(
    () => [...DEFAULT_SCREENING_COLUMN_ORDER],
  )
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(() => new Set())
  const isSelectionControlled = selectedIdsProp !== undefined && onSelectedIdsChange !== undefined
  const selectedIds = isSelectionControlled ? selectedIdsProp : internalSelectedIds
  const setSelectedIds = useCallback(
    (action: SetStateAction<Set<string>>) => {
      if (isSelectionControlled) {
        onSelectedIdsChange!(action)
      } else {
        setInternalSelectedIds(action)
      }
    },
    [isSelectionControlled, onSelectedIdsChange],
  )
  const [sectionCollapsed, setSectionCollapsed] = useState(false)
  const [rowSearchQuery, setRowSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [manualRowOrder, setManualRowOrder] = useState<string[] | null>(null)
  const [editableValues, setEditableValues] = useState<Record<string, string>>({})
  const [dropdownValues, setDropdownValues] = useState<Record<string, DemoDropdownValue>>({})
  const [stepperValues, setStepperValues] = useState<Record<string, number>>({})
  const { columnWidths, startResize, resizeGuideLeft, showGuideForColumn, hideGuideIfIdle } =
    useColumnResize(columnResizing)

  const statusChips = useMemo(() => {
    const set = new Set<ScreeningRowStatus>()
    rows.forEach((r) => set.add(r.status))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [rows])

  const columnMenuOptions = useMemo(
    () =>
      columnOrder.map((key) => {
        const column = SCREENING_COLUMN_DEFINITIONS.find((definition) => definition.key === key)
        return { key, label: column?.label ?? key }
      }),
    [columnOrder],
  )

  const visibleColumnsInOrder = useMemo(
    () => columnMenuOptions.filter((column) => visibleColumns.has(column.key)),
    [columnMenuOptions, visibleColumns],
  )

  const fullColSpan =
    visibleColumnsInOrder.length +
    (hasControlColumn ? 1 : 0) +
    (visibilityControls.showDraggableRows ? 1 : 0) +
    demoFeatureColumnCount +
    1

  const hasReviewHistory = useMemo(() => rows.some((row) => row.status !== 'New'), [rows])
  const historyToggleDisabled = !hasReviewHistory

  const historyFilteredRows = useMemo(() => {
    if (showReviewHistory) return rows
    return rows.filter((row) => row.status === 'New')
  }, [rows, showReviewHistory])

  const filteredRows = useMemo(() => {
    let list =
      statusFilters.size === 0
        ? historyFilteredRows
        : historyFilteredRows.filter((r) => statusFilters.has(r.status))
    const q = rowSearchQuery.trim().toLowerCase()
    if (q === '') return list
    return list.filter((r) => {
      const hay = [
        r.name,
        r.dob,
        r.matchAgeLabel,
        String(r.matchScore),
        r.matchTiles.join(''),
        r.status,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [historyFilteredRows, statusFilters, rowSearchQuery])

  const sortedRows = useMemo(() => {
    const list = [...filteredRows]
    if (!sortKey) return list
    const dir = sortDir === 'asc' ? 1 : -1
    list.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'name':
          cmp = a.name.localeCompare(b.name)
          break
        case 'dob':
          cmp = a.dob.localeCompare(b.dob)
          break
        case 'matchAge':
          cmp = parseAgeForSort(a.matchAgeLabel) - parseAgeForSort(b.matchAgeLabel)
          break
        case 'matchScore':
          cmp = a.matchScore - b.matchScore
          break
        case 'matchString':
          cmp = a.matchTiles.join('').localeCompare(b.matchTiles.join(''))
          break
        case 'status':
          cmp = a.status.localeCompare(b.status)
          break
        default:
          break
      }
      return cmp * dir
    })
    return applyManualRowOrder(list, visibilityControls.showDraggableRows ? manualRowOrder : null)
  }, [filteredRows, sortKey, sortDir, manualRowOrder, visibilityControls.showDraggableRows])

  const sortedRowsRef = useRef(sortedRows)
  sortedRowsRef.current = sortedRows

  const handleRowReorder = useCallback((fromId: string, toId: string, position: 'before' | 'after') => {
    setManualRowOrder((prev) => {
      const base = prev ?? sortedRowsRef.current.map((item) => item.id)
      return reorderIds(base, fromId, toId, position)
    })
  }, [])

  const { draggedRowId, rowDropIndicator, beginDrag } = usePointerRowReorder({
    enabled: visibilityControls.showDraggableRows,
    onReorder: handleRowReorder,
  })

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  useEffect(() => {
    if (!visibilityControls.showDraggableRows) {
      setManualRowOrder(null)
    }
  }, [visibilityControls.showDraggableRows])

  useEffect(() => {
    setManualRowOrder(null)
  }, [sortKey, sortDir, rowSearchQuery, statusFilters, showReviewHistory])

  const paginatedRows = useMemo(() => {
    if (!visibilityControls.showPagination) return sortedRows
    const start = (page - 1) * pageSize
    return sortedRows.slice(start, start + pageSize)
  }, [visibilityControls.showPagination, sortedRows, page, pageSize])

  const selectionRowsSignature = useMemo(
    () => sortedRows.map((r) => `${r.id}:${r.status}`).join(','),
    [sortedRows],
  )

  useEffect(() => {
    const allow = new Set(sortedRows.map((r) => r.id))
    const allowSelectable = new Set(
      sortedRows
        .filter((r) => r.status === 'New' || (!visibilityControls.showDisabledRows && r.status === 'Escalated'))
        .map((r) => r.id),
    )
    setSelectedIds((prev) => {
      const next = new Set<string>()
      prev.forEach((id) => {
        if (allowSelectable.has(id)) next.add(id)
      })
      return next
    })
    setExpandedIds((prev) => {
      const next = new Set<string>()
      prev.forEach((id) => {
        if (allow.has(id)) next.add(id)
      })
      return next
    })
  }, [selectionRowsSignature, setSelectedIds, sortedRows, visibilityControls.showDisabledRows])

  useEffect(() => {
    if (!visibilityControls.showCheckboxes) setSelectedIds(new Set())
  }, [visibilityControls.showCheckboxes, setSelectedIds])

  useEffect(() => {
    if (!visibilityControls.showExpandChevrons) setExpandedIds(new Set())
  }, [visibilityControls.showExpandChevrons])

  useEffect(() => {
    if (!visibilityControls.showRowSearch) setRowSearchQuery('')
  }, [visibilityControls.showRowSearch])

  useEffect(() => {
    setPage(1)
  }, [rowSearchQuery, statusFilters, showReviewHistory])

  useEffect(() => {
    if (!visibilityControls.showQuickFilters) setStatusFilters(new Set())
  }, [visibilityControls.showQuickFilters])

  const reviewedCount = useMemo(() => rows.filter((r) => r.status === 'Escalated').length, [rows])
  const totalCount = rows.length

  const selectionMode = visibilityControls.showCheckboxes && selectedIds.size > 0

  const allVisibleExpanded =
    visibilityControls.showExpandChevrons &&
    sortedRows.length > 0 &&
    sortedRows.every((r) => expandedIds.has(r.id))

  const actionableRows = useMemo(
    () =>
      sortedRows.filter(
        (r) => r.status === 'New' || (!visibilityControls.showDisabledRows && r.status === 'Escalated'),
      ),
    [sortedRows, visibilityControls.showDisabledRows],
  )

  const allVisibleSelected =
    actionableRows.length > 0 && actionableRows.every((r) => selectedIds.has(r.id))
  const someVisibleSelected = actionableRows.some((r) => selectedIds.has(r.id))

  const toggleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
      return
    }
    if (sortDir === 'asc') {
      setSortDir('desc')
      return
    }
    setSortKey(null)
    setSortDir('asc')
  }

  const toggleExpanded = useCallback(
    (id: string) => {
      if (!visibilityControls.showExpandChevrons) return
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    },
    [visibilityControls.showExpandChevrons],
  )

  const toggleExpandAll = () => {
    if (!visibilityControls.showExpandChevrons) return
    if (allVisibleExpanded) {
      setExpandedIds(new Set())
      return
    }
    setExpandedIds(new Set(sortedRows.map((r) => r.id)))
  }

  const onHeaderSelectAllChange = (value: boolean | 'indeterminate') => {
    if (!visibilityControls.showCheckboxes || actionableRows.length === 0) return
    if (value === true) {
      setSelectedIds(new Set(actionableRows.map((r) => r.id)))
      return
    }
    if (value === false) {
      setSelectedIds(new Set())
    }
  }

  const toggleRowSelect = (id: string, checked: boolean) => {
    if (!visibilityControls.showCheckboxes) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const headerCheckboxState: boolean | 'indeterminate' =
    someVisibleSelected && !allVisibleSelected ? 'indeterminate' : allVisibleSelected

  const showToolbar =
    visibilityControls.showQuickFilters ||
    visibilityControls.showColumnMenu ||
    visibilityControls.showHistoryToggle ||
    visibilityControls.showRowSearch

  const toolbarTrailing = visibilityControls.showColumnMenu || visibilityControls.showHistoryToggle || visibilityControls.showRowSearch
  const escalatedCasesVisible = showReviewHistory
  const historyTooltipLabel = escalatedCasesVisible ? 'Hide' : 'Show'

  const mainPanel = (
    <>
    <div className="flex max-h-[var(--screening-body-max-height)] min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {showToolbar ? (
        <div className="shrink-0 border-b border-[var(--screening-border-strong)] bg-[var(--screening-surface)] px-[var(--space-4)] py-[var(--space-3)]">
          <div
            className={cn(
              'flex flex-wrap items-center gap-x-[var(--space-3)] gap-y-[var(--space-2)]',
              !visibilityControls.showQuickFilters && toolbarTrailing && 'justify-end',
            )}
          >
            {visibilityControls.showQuickFilters ? (
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                <span className={screeningStatusFilterLabelClass}>Filter by</span>
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  {statusChips.map((st) => {
                    const active = statusFilters.has(st)
                    return (
                      <AceFilterToggleChip
                        key={st}
                        label={st}
                        pressed={active}
                        onClick={() =>
                          setStatusFilters((prev) => {
                            const next = new Set(prev)
                            if (next.has(st)) next.delete(st)
                            else next.add(st)
                            return next
                          })
                        }
                      />
                    )
                  })}
                </div>
              </div>
            ) : null}
            {toolbarTrailing ? (
              <div
                className={cn(
                  'flex max-w-full min-w-0 shrink-0 flex-nowrap items-center gap-[var(--space-3)]',
                  visibilityControls.showQuickFilters && 'ms-auto',
                )}
              >
                {visibilityControls.showColumnMenu ? (
                  <ScreeningColumnsMenu
                    visibleColumns={visibleColumns}
                    onVisibleColumnsChange={setVisibleColumns}
                    columnOrder={columnOrder}
                    onColumnOrderChange={setColumnOrder}
                  />
                ) : null}
                {visibilityControls.showHistoryToggle ? (
                  <AceTooltip>
                    {historyToggleDisabled ? (
                      <AceTooltipTrigger asChild>
                        <AceTooltipIconWrap>
                          <button
                            type="button"
                            disabled
                            aria-expanded={showReviewHistory}
                            aria-label="There is no history to show"
                            className={cn(
                              screeningToolbarIconButtonClass,
                              'cursor-not-allowed opacity-60',
                            )}
                          >
                            <MaterialSymbol name="visibility" size="md" weight={300} />
                          </button>
                        </AceTooltipIconWrap>
                      </AceTooltipTrigger>
                    ) : (
                      <AceTooltipTrigger asChild>
                        <button
                          type="button"
                          aria-expanded={showReviewHistory}
                          aria-label={historyTooltipLabel}
                          onClick={() => setShowReviewHistory((open) => !open)}
                          className={screeningToolbarIconButtonClass}
                        >
                          {showReviewHistory ? (
                            <MaterialSymbol name="visibility_off" size="md" weight={300} />
                          ) : (
                            <MaterialSymbol name="visibility" size="md" weight={300} />
                          )}
                        </button>
                      </AceTooltipTrigger>
                    )}
                    <AceTooltipContent side="top" hideArrow variant="screening-toolbar">
                      {historyToggleDisabled ? 'There is no history to show.' : historyTooltipLabel}
                    </AceTooltipContent>
                  </AceTooltip>
                ) : null}
                {visibilityControls.showRowSearch ? (
                  <div className="w-[12rem] min-w-[min(100%,12.5rem)] max-w-[16rem] shrink-0">
                    <AceInputField
                      fieldSize="sm"
                      icon="left"
                      type="search"
                      value={rowSearchQuery}
                      onChange={(e) => setRowSearchQuery(e.target.value)}
                      onClear={() => setRowSearchQuery('')}
                      placeholder="Search"
                      autoComplete="off"
                      spellCheck={false}
                      aria-label="Search rows by visible columns"
                      className="w-full bg-[var(--screening-surface)]"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto scroll-smooth">
              <div className="relative w-full min-w-[var(--screening-table-min-width)]">
              <table
                className="w-full min-w-[var(--screening-table-min-width)] border-collapse text-left"
                aria-labelledby={tableCaptionId}
              >
                <caption id={tableCaptionId} className="sr-only">
                  {title}, {sortedRows.length} {sortedRows.length === 1 ? 'row' : 'rows'}
                  {statusFilters.size > 0
                    ? `, filtered by ${[...statusFilters].sort((a, b) => a.localeCompare(b)).join(', ')}`
                    : ''}
                  {rowSearchQuery.trim() !== '' ? `, search "${rowSearchQuery.trim()}"` : ''}
                </caption>
                <thead className="sticky top-0 z-[1] border-b border-[var(--screening-border-strong)] bg-[var(--screening-surface-muted)] shadow-[var(--screening-shadow-thead)]">
                  <tr className={screeningTableHeaderRowClass}>
                    {visibilityControls.showDraggableRows ? (
                      <th scope="col" className="w-8 px-[var(--space-1)] py-0 align-middle">
                        <span className="sr-only">Reorder</span>
                      </th>
                    ) : null}
                    {hasControlColumn ? (
                      <th scope="col" className="w-12 px-[var(--space-2)] py-[var(--space-1)] align-middle">
                        <div className="flex items-center gap-[var(--space-1)]">
                          {visibilityControls.showExpandChevrons ? (
                            <button
                              type="button"
                              className={cn(
                                expandChevronButtonClass,
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
                              )}
                              aria-label={allVisibleExpanded ? 'Collapse all rows' : 'Expand all rows'}
                              onClick={toggleExpandAll}
                            >
                              <span
                                className={cn(
                                  'inline-flex items-center justify-center transition-transform',
                                  durationAccordion,
                                  easeAccordion,
                                  allVisibleExpanded ? 'rotate-0' : '-rotate-90',
                                )}
                                aria-hidden
                              >
                                <MaterialSymbol name="keyboard_arrow_down" size="md" className={aceChevronIconClass} />
                              </span>
                            </button>
                          ) : null}
                          {visibilityControls.showCheckboxes ? (
                            <span className={cn(checkboxPadWrapClass, 'opacity-100')}>
                              <Checkbox
                                size="md"
                                checked={headerCheckboxState}
                                disabled={actionableRows.length === 0}
                                onCheckedChange={onHeaderSelectAllChange}
                                aria-label={
                                  actionableRows.length === 0
                                    ? 'No selectable results'
                                    : allVisibleSelected
                                      ? 'Deselect all results'
                                      : 'Select all results'
                                }
                              />
                            </span>
                          ) : null}
                        </div>
                        <span className="sr-only">
                          {visibilityControls.showExpandChevrons && visibilityControls.showCheckboxes
                            ? 'Expand and select'
                            : visibilityControls.showExpandChevrons
                              ? 'Expand rows'
                              : 'Select rows'}
                        </span>
                      </th>
                    ) : null}
                    {visibleColumnsInOrder.map((column) => (
                      <th
                        key={column.key}
                        scope="col"
                        className={cn(
                          screeningTableHeaderCellClass,
                          'group/th relative',
                          columnResizing && 'select-none',
                        )}
                        style={columnWidthStyle(columnWidths[column.key])}
                        aria-sort={sortKey === column.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                        onMouseEnter={
                          columnResizing
                            ? (event) => showGuideForColumn(event.currentTarget)
                            : undefined
                        }
                        onMouseLeave={columnResizing ? () => hideGuideIfIdle() : undefined}
                      >
                        <button
                          type="button"
                          onClick={() => toggleSort(column.key)}
                          className={screeningTableHeaderSortButtonClass}
                        >
                          <span className={screeningTableHeaderLabelClass}>{column.label}</span>
                          {sortKey === column.key ? (
                            sortDir === 'asc' ? (
                              <MaterialSymbol
                                name="arrow_upward"
                                size="sm"
                                weight={400}
                                className={screeningTableHeaderSortIconActiveClass}
                              />
                            ) : (
                              <MaterialSymbol
                                name="arrow_downward"
                                size="sm"
                                weight={400}
                                className={screeningTableHeaderSortIconActiveClass}
                              />
                            )
                          ) : (
                            <MaterialSymbol
                              name="swap_vert"
                              size="sm"
                              weight={400}
                              className={screeningTableHeaderSortIconIdleClass}
                            />
                          )}
                        </button>
                        <ColumnResizeHandle
                          columnKey={column.key}
                          label={column.label}
                          enabled={columnResizing}
                          onResizeStart={startResize}
                        />
                      </th>
                    ))}
                    <DemoFeatureHeaderCells
                      showEditableCells={visibilityControls.showEditableCells}
                      showDropdownColumn={visibilityControls.showDropdownColumn}
                      showStepperColumn={visibilityControls.showStepperColumn}
                      columnWidths={columnWidths}
                      columnResizing={columnResizing}
                      onResizeStart={startResize}
                      onGuideShow={showGuideForColumn}
                      onGuideHide={hideGuideIfIdle}
                    />
                    <th scope="col" className="w-10 p-0 pr-[var(--space-3)] align-middle" aria-hidden />
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.length === 0 ? (
                    <tr>
                      <td colSpan={fullColSpan} className="px-[var(--space-6)] py-16 text-center">
                        <p
                          className={cn(
                            aceTypography(ACE.emptyState),
                            'm-0 mb-[var(--space-3)] text-[var(--screening-text-secondary)]',
                          )}
                        >
                          {rows.length === 0
                            ? 'No screening results to display.'
                            : !showReviewHistory && hasReviewHistory && historyFilteredRows.length === 0
                              ? 'All screening results have been reviewed. Show review history to see completed items.'
                              : statusFilters.size > 0 && rowSearchQuery.trim() !== ''
                              ? 'No results match the current filters.'
                              : statusFilters.size > 0
                                ? 'No results match the current filter.'
                                : rowSearchQuery.trim() !== ''
                                  ? 'No results match your search.'
                                  : 'No results to display.'}
                        </p>
                        {(statusFilters.size > 0 || rowSearchQuery.trim() !== '') && rows.length > 0 ? (
                          <button
                            type="button"
                            className={cn(
                              aceTypography(ACE.link),
                              'rounded px-[var(--space-1)] text-[var(--screening-primary)] underline decoration-[color-mix(in_srgb,var(--screening-primary)_40%,transparent)] underline-offset-2 transition-colors duration-200 ease-out hover:decoration-[var(--screening-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
                            )}
                            onClick={() => {
                              setStatusFilters(new Set())
                              setRowSearchQuery('')
                            }}
                          >
                            {statusFilters.size > 0 && rowSearchQuery.trim() !== ''
                              ? 'Clear filters'
                              : statusFilters.size > 0
                                ? 'Clear filter'
                                : 'Clear search'}
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ) : null}
                  {paginatedRows.map((row) => {
                    const expanded = expandedIds.has(row.id)
                    const selected = selectedIds.has(row.id)
                    const rowDone = visibilityControls.showDisabledRows && row.status === 'Escalated'
                    const statusLabel = rowDone ? row.status : 'New'
                    const rowControlsVisible = expanded || selectionMode
                    return (
                      <Fragment key={row.id}>
                        {visibilityControls.showDraggableRows &&
                        rowDropIndicator?.targetId === row.id &&
                        rowDropIndicator.position === 'before' ? (
                          <tr aria-hidden className="pointer-events-none h-0">
                            <td colSpan={fullColSpan} className="p-0">
                              <div className={screeningTableRowDropLineClass} />
                            </td>
                          </tr>
                        ) : null}
                        <tr
                          data-screening-row-id={row.id}
                          aria-selected={visibilityControls.showCheckboxes && selected && !rowDone}
                          className={cn(
                            'group/row relative border-b border-[var(--screening-border-row)]',
                            rowDone && screeningDisabledRowClass,
                            !rowDone &&
                              draggedRowId !== row.id &&
                              'bg-[var(--screening-surface)] hover:bg-[var(--screening-surface-row-muted)] hover:shadow-[var(--screening-shadow-row-accent)]',
                            selected && !rowDone && draggedRowId !== row.id && 'bg-[var(--screening-surface-selected)]',
                            draggedRowId === row.id && screeningTableRowDraggingClass,
                            draggedRowId != null &&
                              draggedRowId !== row.id &&
                              screeningTableRowDragPeerClass,
                          )}
                        >
                          {visibilityControls.showDraggableRows ? (
                            <td className="w-8 px-[var(--space-1)] py-[var(--space-3)] align-middle">
                              <div className="flex items-center justify-center">
                                <RowDragHandle
                                  onPointerDragStart={(event) => beginDrag(row.id, event)}
                                />
                              </div>
                            </td>
                          ) : null}
                          {hasControlColumn ? (
                          <td className="w-12 px-[var(--space-2)] py-[var(--space-3)] align-middle">
                            <div className="flex items-center gap-[var(--space-1)]">
                              {visibilityControls.showExpandChevrons ? (
                                <button
                                  type="button"
                                  aria-expanded={expanded}
                                  aria-label={expanded ? 'Collapse row' : 'Expand row'}
                                  onClick={() => toggleExpanded(row.id)}
                                  className={cn(
                                    expandChevronButtonClass,
                                    expanded || rowControlsVisible
                                      ? 'pointer-events-auto opacity-100'
                                      : 'pointer-events-none opacity-0 group-hover/row:pointer-events-auto group-hover/row:opacity-100',
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'inline-flex items-center justify-center transition-transform',
                                      durationAccordion,
                                      easeAccordion,
                                      expanded ? 'rotate-0' : '-rotate-90',
                                    )}
                                    aria-hidden
                                  >
                                    <MaterialSymbol name="keyboard_arrow_down" size="md" className={aceChevronIconClass} />
                                  </span>
                                </button>
                              ) : null}
                              {visibilityControls.showCheckboxes ? (
                                <span
                                  className={cn(
                                    checkboxPadWrapClass,
                                    rowDone && 'cursor-default hover:bg-[var(--screening-surface-row-muted)]',
                                    rowControlsVisible ? 'opacity-100' : 'opacity-0 group-hover/row:opacity-100',
                                  )}
                                >
                                  <Checkbox
                                    size="md"
                                    checked={selected}
                                    disabled={rowDone}
                                    onCheckedChange={(v) => {
                                      if (!rowDone) toggleRowSelect(row.id, v === true)
                                    }}
                                    aria-label={rowDone ? `${row.name} (resolved, not selectable)` : `Select ${row.name}`}
                                  />
                                </span>
                              ) : null}
                            </div>
                          </td>
                          ) : null}
                          {visibleColumnsInOrder.map((column) => {
                            switch (column.key) {
                              case 'status':
                                return (
                                  <td
                                    key={column.key}
                                    className="whitespace-nowrap px-[var(--space-3)] py-[var(--space-3)]"
                                    style={columnWidthStyle(columnWidths[column.key])}
                                  >
                                    {statusLabel === 'New' ? (
                                      <AceBadge appearance="pill" variant="purple">
                                        New
                                      </AceBadge>
                                    ) : (
                                      <AceBadge appearance="pill" variant="orange">
                                        Escalate
                                      </AceBadge>
                                    )}
                                  </td>
                                )
                              case 'name':
                                return (
                                  <td
                                    key={column.key}
                                    className={cn(
                                      aceTypography(ACE.cell),
                                      'px-[var(--space-3)] py-[var(--space-3)] text-[var(--screening-text-primary)]',
                                    )}
                                    style={columnWidthStyle(columnWidths[column.key])}
                                  >
                                    {row.name}
                                  </td>
                                )
                              case 'dob':
                                return (
                                  <td
                                    key={column.key}
                                    className={cn(
                                      aceTypography(ACE.cell),
                                      'whitespace-nowrap px-[var(--space-3)] py-[var(--space-3)] text-[var(--screening-text-secondary)]',
                                    )}
                                    style={columnWidthStyle(columnWidths[column.key])}
                                  >
                                    {row.dob}
                                  </td>
                                )
                              case 'matchAge':
                                return (
                                  <td
                                    key={column.key}
                                    className="whitespace-nowrap px-[var(--space-3)] py-[var(--space-3)]"
                                    style={columnWidthStyle(columnWidths[column.key])}
                                  >
                                    <span
                                      className={cn(
                                        aceTypography(ACE.cell),
                                        'inline-flex items-center gap-[var(--space-2)] text-[var(--screening-text-secondary)]',
                                      )}
                                    >
                                      {showMatchAgeStaleIndicator(row.matchAgeTone) ? (
                                        <span
                                          className="size-2 shrink-0 rounded-full bg-[var(--screening-age-stale)]"
                                          aria-hidden
                                        />
                                      ) : null}
                                      {row.matchAgeLabel}
                                    </span>
                                  </td>
                                )
                              case 'matchScore':
                                return (
                                  <td
                                    key={column.key}
                                    className={cn(
                                      aceTypography(ACE.score),
                                      'px-[var(--space-3)] py-[var(--space-3)] tabular-nums transition-colors duration-200 ease-out',
                                      rowDone
                                        ? 'text-[var(--screening-text-muted)]'
                                        : scoreIsHighRisk(row.matchScore)
                                          ? 'text-[var(--screening-score-high)]'
                                          : 'text-[var(--screening-text-primary)]',
                                    )}
                                    style={columnWidthStyle(columnWidths[column.key])}
                                  >
                                    {row.matchScore}
                                  </td>
                                )
                              case 'matchString':
                                return (
                                  <td
                                    key={column.key}
                                    className="px-[var(--space-3)] py-[var(--space-3)]"
                                    style={columnWidthStyle(columnWidths[column.key])}
                                  >
                                    <div className="flex items-center gap-[var(--space-1)]">
                                      {row.matchTiles.map((t, i) => {
                                        const s = tileSoftStyle(t)
                                        return (
                                          <span
                                            key={`${row.id}-t-${i}`}
                                            title={t}
                                            className={cn(
                                              aceTypography(ACE.keyCode),
                                              'inline-flex h-[var(--space-6)] min-w-[var(--space-6)] items-center justify-center rounded border border-solid px-[var(--space-1)] leading-none transition-transform duration-200 ease-out',
                                              !rowDone && 'hover:scale-[1.03]',
                                            )}
                                            style={{
                                              backgroundColor: s.bg,
                                              color: s.fg,
                                              borderColor: s.border,
                                            }}
                                          >
                                            {t}
                                          </span>
                                        )
                                      })}
                                    </div>
                                  </td>
                                )
                              default:
                                return null
                            }
                          })}
                          {visibilityControls.showEditableCells ? (
                            <EditableCell
                              value={editableValues[row.id] ?? ''}
                              disabled={rowDone}
                              width={columnWidths.editable}
                              onChange={(value) =>
                                setEditableValues((prev) => ({ ...prev, [row.id]: value }))
                              }
                            />
                          ) : null}
                          {visibilityControls.showDropdownColumn ? (
                            <DropdownCell
                              value={dropdownValues[row.id] ?? 'pending'}
                              disabled={rowDone}
                              width={columnWidths.dropdown}
                              onChange={(value) =>
                                setDropdownValues((prev) => ({ ...prev, [row.id]: value }))
                              }
                            />
                          ) : null}
                          {visibilityControls.showStepperColumn ? (
                            <StepperCell
                              value={stepperValues[row.id] ?? 1}
                              disabled={rowDone}
                              width={columnWidths.stepper}
                              onChange={(value) =>
                                setStepperValues((prev) => ({ ...prev, [row.id]: value }))
                              }
                            />
                          ) : null}
                          <td className="h-px w-10 py-0 pl-0 pr-[var(--space-3)] align-middle">
                            <div className="flex h-full min-h-10 w-full items-center justify-center">
                              <ScreeningRowActionsMenu rowName={row.name} />
                            </div>
                          </td>
                        </tr>
                        {visibilityControls.showDraggableRows &&
                        rowDropIndicator?.targetId === row.id &&
                        rowDropIndicator.position === 'after' ? (
                          <tr aria-hidden className="pointer-events-none h-0">
                            <td colSpan={fullColSpan} className="p-0">
                              <div className={screeningTableRowDropLineClass} />
                            </td>
                          </tr>
                        ) : null}
                        {visibilityControls.showExpandChevrons ? (
                        <tr className="border-b border-[var(--screening-border-row)] border-t-0">
                          <td colSpan={fullColSpan} className="p-0 align-top">
                            <div
                              className={cn(
                                'grid overflow-hidden transition-[grid-template-rows]',
                                durationAccordion,
                                easeAccordion,
                                expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                              )}
                            >
                              <div className="min-h-0 overflow-hidden">
                                <div className="bg-[var(--screening-surface-expanded)] px-[var(--space-4)] py-[var(--space-3)]">
                                  <p
                                    className={cn(
                                      aceTypography(ACE.detail),
                                      'm-0 text-[var(--screening-text-secondary)] not-italic',
                                    )}
                                  >
                                    Expanded match detail for{' '}
                                    <span
                                      className={cn(
                                        aceTypography(ACE.cellEmphasis),
                                        'text-[var(--screening-text-primary)]',
                                      )}
                                    >
                                      {row.name}
                                    </span>{' '}
                                    (prototype placeholder).
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        ) : null}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
              <ColumnResizeGuide left={resizeGuideLeft} />
              </div>
            </div>
            {visibilityControls.showPagination ? (
              <div className="shrink-0 border-t border-[var(--screening-border-strong)] bg-[var(--screening-surface-muted)] px-[var(--space-4)] py-[var(--space-3)]">
                <TablePagination
                  totalItems={sortedRows.length}
                  page={page}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  onPageSizeChange={(n) => {
                    setPageSize(n)
                    setPage(1)
                  }}
                />
              </div>
            ) : null}
          </div>
    </>
  )

  const tableHeaderTrailing = (
    <AceAccordionReviewProgress reviewed={reviewedCount} total={totalCount} />
  )

  const flatShellClass = cn(
    'flex w-full shrink-0 flex-col overflow-hidden rounded border border-[var(--screening-border-strong)] bg-[var(--screening-surface)] shadow-[var(--screening-shadow-card)] transition-shadow duration-200 ease-out hover:shadow-[var(--screening-shadow-card-hover)]',
    className,
  )

  if (visibilityControls.showAccordionHeader) {
    return (
      <AceAccordion
        className={cn(
          'border-[var(--screening-border-strong)] transition-shadow duration-200 ease-out hover:shadow-[var(--screening-shadow-card-hover)]',
          className,
        )}
        surface="white"
        dropShadow
        showTag={false}
        showAddIcon={false}
        showDeleteIcon={false}
        showEditIcon={false}
        showMoreIcon={false}
        open={!sectionCollapsed}
        onOpenChange={(next) => setSectionCollapsed(!next)}
        title={title}
        titleClassName={cn(
          aceTypography(ACE.sectionTitle),
          'leading-[1.5] text-[var(--screening-text-primary)]',
        )}
        headerTrailing={tableHeaderTrailing}
        contentPadding={false}
      >
        {mainPanel}
      </AceAccordion>
    )
  }

  return <div className={flatShellClass}>{mainPanel}</div>
}
