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
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Search,
} from 'lucide-react'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { AceAccordion } from '../../molecules/AceAccordion/AceAccordion'
import { TablePagination } from '../../molecules/TablePagination'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import {
  MOCK_ROWS,
  MATCH_KEY_ITEMS,
  ageDotClass,
  parseAgeForSort,
  scoreIsHighRisk,
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
  matchKeyHeading: '--ace-type-paragraph-p1-semi-bold',
  keyLegend: '--ace-type-caption-regular',
  keyCode: '--ace-type-footer-semi-bold',
  columnHeader: '--ace-type-label-bold',
  cell: '--ace-type-paragraph-p1-regular',
  cellEmphasis: '--ace-type-paragraph-p1-semi-bold',
  emptyState: '--ace-type-paragraph-p1-regular',
  link: '--ace-type-paragraph-p1-semi-bold',
  detail: '--ace-type-paragraph-p1-regular',
  pill: '--ace-type-caption-semi-bold',
  score: '--ace-type-paragraph-p1-semi-bold',
} as const

export const screeningNewPillSurfaceClass =
  'border border-[var(--screening-pill-new-border)] bg-[var(--screening-pill-new-surface)] transition-colors duration-200 ease-out'

export const screeningNewPillLabelClass = cn(
  aceTypography(ACE.pill),
  'text-[var(--screening-pill-new-label)]',
)

type SortKey = 'name' | 'dob' | 'matchAge' | 'matchScore' | 'matchString' | 'status'
type SortDir = 'asc' | 'desc'

const checkboxPadWrapClass =
  'inline-flex items-center justify-center rounded p-[var(--space-1)] transition-opacity duration-200 ease-out'

const easeAccordion = '[transition-timing-function:var(--screening-ease-accordion)]'
const durationAccordion = 'duration-[var(--screening-duration-accordion)]'

export type ScreeningResultsTableChrome = {
  /** Collapsible section header with title and progress */
  showAccordionHeader: boolean
  /** “Filter by” label and status chips */
  showQuickFilters: boolean
  /** Match-string key toggle, label, and legend */
  showMatchStringKey: boolean
  /** Search field in the filter toolbar */
  showRowSearch: boolean
  /** Row and header selection checkboxes */
  showCheckboxes: boolean
  /** Expand / collapse chevrons (header and rows); expansion is disabled when off */
  showExpandChevrons: boolean
  /** Footer: result range, rows-per-page, and paging controls */
  showPagination: boolean
}

export const DEFAULT_SCREENING_TABLE_CHROME: ScreeningResultsTableChrome = {
  showAccordionHeader: true,
  showQuickFilters: true,
  showMatchStringKey: true,
  showRowSearch: true,
  showCheckboxes: true,
  showExpandChevrons: true,
  showPagination: false,
}

interface ScreeningResultsTableProps {
  rows?: ScreeningResultRow[]
  title?: string
  className?: string
  selectedIds?: Set<string>
  onSelectedIdsChange?: Dispatch<SetStateAction<Set<string>>>
  /** Toggle regions of the organism for different embed contexts */
  chrome?: Partial<ScreeningResultsTableChrome>
}

export function ScreeningResultsTable({
  rows = MOCK_ROWS,
  title = 'Data Table',
  className,
  selectedIds: selectedIdsProp,
  onSelectedIdsChange,
  chrome: chromeProp,
}: ScreeningResultsTableProps) {
  const chrome = { ...DEFAULT_SCREENING_TABLE_CHROME, ...chromeProp }
  const hasControlColumn = chrome.showExpandChevrons || chrome.showCheckboxes
  const fullColSpan = 6 + (hasControlColumn ? 1 : 0)
  const tableCaptionId = useId()
  const [statusFilters, setStatusFilters] = useState<Set<ScreeningRowStatus>>(() => new Set())
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
  const [matchKeyOpen, setMatchKeyOpen] = useState(false)
  const [rowSearchQuery, setRowSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const statusChips = useMemo(() => {
    const set = new Set<ScreeningRowStatus>()
    rows.forEach((r) => set.add(r.status))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [rows])

  const filteredRows = useMemo(() => {
    let list = statusFilters.size === 0 ? rows : rows.filter((r) => statusFilters.has(r.status))
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
  }, [rows, statusFilters, rowSearchQuery])

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
    return list
  }, [filteredRows, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  const paginatedRows = useMemo(() => {
    if (!chrome.showPagination) return sortedRows
    const start = (page - 1) * pageSize
    return sortedRows.slice(start, start + pageSize)
  }, [chrome.showPagination, sortedRows, page, pageSize])

  const selectionRowsSignature = useMemo(
    () => sortedRows.map((r) => `${r.id}:${r.status}`).join(','),
    [sortedRows],
  )

  useEffect(() => {
    const allow = new Set(sortedRows.map((r) => r.id))
    const allowNew = new Set(sortedRows.filter((r) => r.status === 'New').map((r) => r.id))
    setSelectedIds((prev) => {
      const next = new Set<string>()
      prev.forEach((id) => {
        if (allowNew.has(id)) next.add(id)
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
  }, [selectionRowsSignature, setSelectedIds, sortedRows])

  useEffect(() => {
    if (!chrome.showCheckboxes) setSelectedIds(new Set())
  }, [chrome.showCheckboxes, setSelectedIds])

  useEffect(() => {
    if (!chrome.showExpandChevrons) setExpandedIds(new Set())
  }, [chrome.showExpandChevrons])

  useEffect(() => {
    if (!chrome.showRowSearch) setRowSearchQuery('')
  }, [chrome.showRowSearch])

  useEffect(() => {
    setPage(1)
  }, [rowSearchQuery, statusFilters])

  useEffect(() => {
    if (!chrome.showQuickFilters) setStatusFilters(new Set())
  }, [chrome.showQuickFilters])

  const selectedRef = useRef(selectedIds)
  const filterRef = useRef(statusFilters)
  const rowSearchRef = useRef(rowSearchQuery)
  selectedRef.current = selectedIds
  filterRef.current = statusFilters
  rowSearchRef.current = rowSearchQuery

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (selectedRef.current.size > 0) {
        e.preventDefault()
        setSelectedIds(new Set())
        return
      }
      if (filterRef.current.size > 0) {
        e.preventDefault()
        setStatusFilters(new Set())
        return
      }
      if (rowSearchRef.current.trim().length > 0) {
        e.preventDefault()
        setRowSearchQuery('')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [setSelectedIds])

  const reviewedCount = useMemo(() => rows.filter((r) => r.status === 'Escalated').length, [rows])
  const totalCount = rows.length
  const progress = totalCount === 0 ? 0 : (reviewedCount / totalCount) * 100

  const selectionMode = chrome.showCheckboxes && selectedIds.size > 0

  const allVisibleExpanded =
    chrome.showExpandChevrons &&
    sortedRows.length > 0 &&
    sortedRows.every((r) => expandedIds.has(r.id))

  const actionableRows = useMemo(() => sortedRows.filter((r) => r.status === 'New'), [sortedRows])

  const allVisibleSelected =
    actionableRows.length > 0 && actionableRows.every((r) => selectedIds.has(r.id))
  const someVisibleSelected = actionableRows.some((r) => selectedIds.has(r.id))

  const toggleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
      return
    }
    setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
  }

  const toggleExpanded = useCallback(
    (id: string) => {
      if (!chrome.showExpandChevrons) return
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    },
    [chrome.showExpandChevrons],
  )

  const toggleExpandAll = () => {
    if (!chrome.showExpandChevrons) return
    if (allVisibleExpanded) {
      setExpandedIds(new Set())
      return
    }
    setExpandedIds(new Set(sortedRows.map((r) => r.id)))
  }

  const onHeaderSelectAllChange = (value: boolean | 'indeterminate') => {
    if (!chrome.showCheckboxes || actionableRows.length === 0) return
    if (value === true) {
      setSelectedIds(new Set(actionableRows.map((r) => r.id)))
      return
    }
    if (value === false) {
      setSelectedIds(new Set())
    }
  }

  const toggleRowSelect = (id: string, checked: boolean) => {
    if (!chrome.showCheckboxes) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const headerCheckboxState: boolean | 'indeterminate' =
    someVisibleSelected && !allVisibleSelected ? 'indeterminate' : allVisibleSelected

  const showToolbar = chrome.showQuickFilters || chrome.showMatchStringKey || chrome.showRowSearch

  const mainPanel = (
    <div className="flex max-h-[var(--screening-body-max-height)] min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {showToolbar ? (
        <div className="shrink-0 border-b border-[var(--screening-border-strong)] bg-[var(--screening-surface-muted)] px-[var(--space-4)] py-[var(--space-3)]">
          <div
            className={cn(
              'flex flex-wrap items-center gap-x-[var(--space-3)] gap-y-[var(--space-2)]',
              !chrome.showQuickFilters && (chrome.showMatchStringKey || chrome.showRowSearch) && 'justify-end',
            )}
          >
            {chrome.showQuickFilters ? (
              <>
                <span
                  className={cn(
                    aceTypography(ACE.filterLabel),
                    'shrink-0 text-[var(--screening-text-primary)]',
                  )}
                >
                  Filter by
                </span>
                <div className="flex min-w-0 flex-wrap items-center gap-[var(--space-2)]">
                  {statusChips.map((st) => {
                    const active = statusFilters.has(st)
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() =>
                          setStatusFilters((prev) => {
                            const next = new Set(prev)
                            if (next.has(st)) next.delete(st)
                            else next.add(st)
                            return next
                          })
                        }
                        className={cn(
                          aceTypography(ACE.chip),
                          'cursor-pointer rounded-[var(--radius-sm)] border px-[var(--space-3)] py-[var(--space-2)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
                          active
                            ? 'border-[var(--screening-chip-active-border)] bg-[var(--screening-primary-soft-bg)] text-[var(--screening-chip-active-text)] hover:border-[var(--screening-primary-hover-border)] hover:bg-[var(--screening-primary-soft-bg-hover)]'
                            : 'border-[var(--screening-chip-inactive-border)] bg-[var(--screening-chip-inactive-bg)] text-[var(--screening-text-primary)] hover:border-[var(--screening-chip-inactive-hover-border)] hover:bg-[var(--screening-chip-inactive-hover-bg)]',
                        )}
                      >
                        {st}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : null}
            {chrome.showMatchStringKey || chrome.showRowSearch ? (
              <div
                className={cn(
                  'flex max-w-full min-w-0 flex-wrap items-center gap-[var(--space-2)]',
                  chrome.showQuickFilters && 'ms-auto',
                )}
              >
                {chrome.showMatchStringKey ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={matchKeyOpen}
                      aria-label={matchKeyOpen ? 'Hide match string key' : 'Show match string key'}
                      onClick={() => setMatchKeyOpen((o) => !o)}
                      className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-[var(--screening-border-strong)] bg-[var(--screening-chip-inactive-bg)] text-[var(--screening-text-secondary)] transition-colors duration-200 ease-out hover:border-[var(--screening-chip-inactive-hover-border)] hover:bg-[var(--screening-surface-hover)] hover:text-[var(--screening-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]"
                    >
                      {matchKeyOpen ? <EyeOff className="size-4" strokeWidth={2} aria-hidden /> : <Eye className="size-4" strokeWidth={2} aria-hidden />}
                    </button>
                    <span
                      className={cn(
                        aceTypography(ACE.matchKeyHeading),
                        'shrink-0 text-[var(--screening-text-primary)]',
                      )}
                    >
                      Match string key
                    </span>
                  </>
                ) : null}
                {chrome.showRowSearch ? (
                  <div
                    className={cn(
                      'flex h-[var(--screening-input-height-sm)] min-w-[min(100%,12.5rem)] max-w-[16rem] shrink-0 items-center gap-[var(--screening-input-gap)] rounded-[var(--screening-input-radius)] border border-solid border-[var(--screening-input-border)] bg-[var(--screening-surface)] px-[var(--screening-input-px)] transition-[background-color,border-color,box-shadow] duration-150 ease-out',
                      'focus-within:border-[var(--screening-input-border-focus)] focus-within:bg-[var(--screening-input-bg-focus)] focus-within:shadow-[0_0_0_2px_var(--screening-input-focus-ring)]',
                    )}
                  >
                    <Search
                      className="size-4 shrink-0 text-[var(--screening-text-primary)]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <input
                      type="search"
                      value={rowSearchQuery}
                      onChange={(e) => setRowSearchQuery(e.target.value)}
                      placeholder="Search"
                      autoComplete="off"
                      spellCheck={false}
                      aria-label="Search rows by visible columns"
                      className={cn(
                        aceTypography(ACE.cell),
                        'min-w-0 flex-1 border-0 bg-transparent p-0 text-[var(--screening-text-primary)] outline-none placeholder:text-[var(--screening-input-placeholder)]',
                      )}
                    />
                  </div>
                ) : null}
                {chrome.showMatchStringKey && matchKeyOpen ? (
                  <div className="flex max-w-full flex-wrap items-center gap-x-[var(--space-3)] gap-y-[var(--space-1)]">
                    {MATCH_KEY_ITEMS.map((item) => (
                      <span
                        key={item.code}
                        className={cn(
                          aceTypography(ACE.keyLegend),
                          'inline-flex items-center gap-[var(--space-2)] text-[var(--screening-text-secondary)]',
                        )}
                      >
                        <span
                          className={cn(
                            aceTypography(ACE.keyCode),
                            'inline-flex h-[var(--space-6)] min-w-[var(--space-6)] items-center justify-center rounded border border-solid px-[var(--space-1)] leading-none',
                          )}
                          style={{
                            backgroundColor: item.bg,
                            color: item.fg,
                            borderColor: item.border,
                          }}
                        >
                          {item.code}
                        </span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto scroll-smooth">
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
                  <tr className="h-8">
                    {hasControlColumn ? (
                      <th scope="col" className="w-12 px-[var(--space-2)] py-[var(--space-1)] align-middle">
                        <div className="flex items-center gap-[var(--space-1)]">
                          {chrome.showExpandChevrons ? (
                            <button
                              type="button"
                              className="rounded p-[var(--space-1)] text-[var(--screening-text-primary)] transition-colors duration-200 ease-out hover:bg-[var(--screening-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]"
                              aria-label={allVisibleExpanded ? 'Collapse all rows' : 'Expand all rows'}
                              onClick={toggleExpandAll}
                            >
                              {allVisibleExpanded ? (
                                <ChevronDown className={cn(aceChevronIconClass, durationAccordion, easeAccordion, 'transition-transform')} />
                              ) : (
                                <ChevronRight className={cn(aceChevronIconClass, durationAccordion, easeAccordion, 'transition-transform')} />
                              )}
                            </button>
                          ) : null}
                          {chrome.showCheckboxes ? (
                            <span className={cn(checkboxPadWrapClass, 'opacity-100')}>
                              <Checkbox
                                size="sm"
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
                          {chrome.showExpandChevrons && chrome.showCheckboxes
                            ? 'Expand and select'
                            : chrome.showExpandChevrons
                              ? 'Expand rows'
                              : 'Select rows'}
                        </span>
                      </th>
                    ) : null}
                    {(
                      [
                        ['status', 'Status'],
                        ['name', 'Name'],
                        ['dob', 'Date of Birth'],
                        ['matchAge', 'Match Age'],
                        ['matchScore', 'Match Score'],
                        ['matchString', 'Match String'],
                      ] as const
                    ).map(([key, label]) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-[var(--space-3)] py-[var(--space-1)] align-middle"
                        aria-sort={sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                      >
                        <button
                          type="button"
                          onClick={() => toggleSort(key)}
                          className="-mx-[var(--space-1)] inline-flex items-center gap-[var(--space-2)] rounded px-[var(--space-1)] py-[var(--space-1)] text-[var(--screening-text-primary)] transition-colors duration-200 ease-out hover:bg-[var(--screening-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]"
                        >
                          <span
                            className={cn(
                              aceTypography(ACE.columnHeader),
                              'uppercase text-[var(--screening-text-muted)]',
                            )}
                          >
                            {label}
                          </span>
                          {sortKey === key ? (
                            sortDir === 'asc' ? (
                              <ArrowUp className="size-4 shrink-0 text-[var(--screening-primary)] transition-transform duration-200 ease-out" strokeWidth={2} />
                            ) : (
                              <ArrowDown className="size-4 shrink-0 text-[var(--screening-primary)] transition-transform duration-200 ease-out" strokeWidth={2} />
                            )
                          ) : (
                            <ArrowDownUp className="size-4 shrink-0 text-[var(--screening-icon-muted)] transition-colors duration-200 ease-out" strokeWidth={2} />
                          )}
                        </button>
                      </th>
                    ))}
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
                    const rowDone = row.status === 'Escalated'
                    const rowChromeControls = expanded || selectionMode
                    return (
                      <Fragment key={row.id}>
                        <tr
                          aria-selected={chrome.showCheckboxes && selected && !rowDone}
                          className={cn(
                            'group/row border-b border-[var(--screening-border-row)] transition-[background-color,box-shadow] duration-200 ease-out',
                            rowDone && 'bg-[var(--screening-surface-row-muted)] text-[var(--screening-text-muted)] italic',
                            !rowDone &&
                              'bg-[var(--screening-surface)] hover:bg-[var(--screening-surface-row-muted)] hover:shadow-[var(--screening-shadow-row-accent)]',
                            selected && !rowDone && 'bg-[var(--screening-surface-selected)]',
                          )}
                        >
                          {hasControlColumn ? (
                          <td className="w-12 px-[var(--space-2)] py-[var(--space-3)] align-middle not-italic">
                            <div className="flex items-center gap-[var(--space-1)]">
                              {chrome.showExpandChevrons ? (
                                <button
                                  type="button"
                                  aria-expanded={expanded}
                                  aria-label={expanded ? 'Collapse row' : 'Expand row'}
                                  onClick={() => toggleExpanded(row.id)}
                                  className={cn(
                                    'rounded p-[var(--space-1)] text-[var(--screening-text-primary)] transition-colors duration-200 ease-out hover:bg-[var(--screening-surface-hover)]',
                                    expanded || rowChromeControls
                                      ? 'pointer-events-auto opacity-100'
                                      : 'pointer-events-none opacity-0 group-hover/row:pointer-events-auto group-hover/row:opacity-100',
                                  )}
                                >
                                  {expanded ? (
                                    <ChevronDown className={cn(aceChevronIconClass, durationAccordion, easeAccordion, 'transition-transform')} />
                                  ) : (
                                    <ChevronRight className={cn(aceChevronIconClass, durationAccordion, easeAccordion, 'transition-transform')} />
                                  )}
                                </button>
                              ) : null}
                              {chrome.showCheckboxes ? (
                                <span
                                  className={cn(
                                    checkboxPadWrapClass,
                                    rowDone && 'cursor-default hover:bg-[var(--screening-surface-row-muted)]',
                                    rowChromeControls ? 'opacity-100' : 'opacity-0 group-hover/row:opacity-100',
                                  )}
                                >
                                  <Checkbox
                                    size="sm"
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
                          <td className="whitespace-nowrap px-[var(--space-3)] py-[var(--space-3)] not-italic">
                            {row.status === 'New' ? (
                              <span
                                className={cn(
                                  'inline-flex items-center gap-[var(--space-2)] rounded-full py-[var(--space-1)] pl-[var(--space-2)] pr-[var(--space-3)]',
                                  screeningNewPillSurfaceClass,
                                )}
                              >
                                <span className="size-2 shrink-0 rounded-full bg-[var(--screening-pill-new-dot)]" />
                                <span className={screeningNewPillLabelClass}>New</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-[var(--space-2)] rounded-full border border-[var(--screening-pill-escalated-border)] bg-[var(--screening-pill-escalated-surface)] py-[var(--space-1)] pl-[var(--space-2)] pr-[var(--space-3)] transition-colors duration-200 ease-out">
                                <span className="size-2 rounded-full bg-[var(--screening-pill-escalated-dot)]" />
                                <span
                                  className={cn(
                                    aceTypography(ACE.pill),
                                    'text-[var(--screening-pill-escalated-label)]',
                                  )}
                                >
                                  Escalated
                                </span>
                              </span>
                            )}
                          </td>
                          <td
                            className={cn(
                              aceTypography(ACE.cell),
                              'px-[var(--space-3)] py-[var(--space-3)] text-[var(--screening-text-primary)]',
                            )}
                          >
                            {row.name}
                          </td>
                          <td
                            className={cn(
                              aceTypography(ACE.cell),
                              'whitespace-nowrap px-[var(--space-3)] py-[var(--space-3)] text-[var(--screening-text-secondary)]',
                            )}
                          >
                            {row.dob}
                          </td>
                          <td className="whitespace-nowrap px-[var(--space-3)] py-[var(--space-3)]">
                            <span
                              className={cn(
                                aceTypography(ACE.cell),
                                'inline-flex items-center gap-[var(--space-2)] text-[var(--screening-text-secondary)]',
                              )}
                            >
                              <span className={cn('size-2 shrink-0 rounded-full', ageDotClass(row.matchAgeTone))} />
                              {row.matchAgeLabel}
                            </span>
                          </td>
                          <td
                            className={cn(
                              aceTypography(ACE.score),
                              'px-[var(--space-3)] py-[var(--space-3)] tabular-nums transition-colors duration-200 ease-out',
                              rowDone
                                ? 'text-[var(--screening-text-muted)]'
                                : scoreIsHighRisk(row.matchScore)
                                  ? 'text-[var(--screening-score-high)]'
                                  : 'text-[var(--screening-text-primary)]',
                            )}
                          >
                            {row.matchScore}
                          </td>
                          <td className="px-[var(--space-3)] py-[var(--space-3)]">
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
                        </tr>
                        {chrome.showExpandChevrons ? (
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
            </div>
            {chrome.showPagination ? (
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
  )

  const tableHeaderTrailing = (
    <div
      className="flex shrink-0 items-center gap-[var(--space-3)]"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <span
        className={cn(
          aceTypography(ACE.meta),
          'hidden whitespace-nowrap text-[var(--screening-text-secondary)] sm:inline',
        )}
      >
        {reviewedCount} of {totalCount} Reviewed
      </span>
      <div
        className="h-[var(--screening-progress-height)] w-[var(--screening-progress-width)] overflow-hidden rounded-full border border-[var(--screening-border-soft)] bg-[var(--screening-progress-track)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalCount}
        aria-valuenow={reviewedCount}
        aria-label={`Review progress: ${reviewedCount} of ${totalCount} reviewed`}
      >
        <div
          className="h-full rounded-full bg-[var(--screening-progress-fill)] transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )

  const flatShellClass = cn(
    'flex w-full shrink-0 flex-col overflow-hidden rounded border border-[var(--screening-border-strong)] bg-[var(--screening-surface)] shadow-[var(--screening-shadow-card)] transition-shadow duration-200 ease-out hover:shadow-[var(--screening-shadow-card-hover)]',
    className,
  )

  if (chrome.showAccordionHeader) {
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
