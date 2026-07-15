import { useCallback, useId, useMemo, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AceBadge } from '../../atoms/AceBadge/AceBadge'
import { AceAccordion } from '../../molecules/AceAccordion/AceAccordion'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import {
  AceDropdownMenu,
  aceDropdownMenuPanelClass,
} from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { TablePagination } from '../../molecules/TablePagination'
import { cn } from '../../../lib/cn'
import {
  screeningTableHeaderCellClass,
  screeningTableHeaderLabelClass,
  screeningTableHeaderRowClass,
  screeningTableHeaderSortButtonClass,
  screeningTableHeaderSortIconActiveClass,
  screeningTableHeaderSortIconIdleClass,
} from './screeningTableHeader'
import {
  DEFAULT_USER_LIST_COLUMN_ORDER,
  USER_LIST_COLUMN_DEFINITIONS,
  type UserListColumnKey,
} from './userListTableColumns'
import { MOCK_USER_LIST_ROWS, type UserListRow } from './userListTypes'

function aceTypography(token: string) {
  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`
}

const ACE = {
  sectionTitle: '--ace-type-heading-h6-small-semi-bold',
  cell: '--ace-type-paragraph-p1-regular',
  emptyState: '--ace-type-paragraph-p1-regular',
} as const

type SortDir = 'asc' | 'desc'

const actionButtonClass = cn(
  'inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--screening-text-primary)]',
  'transition-colors duration-150 ease-out',
  'hover:bg-[var(--screening-surface-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

const menuItemClass = cn(
  aceTypography(ACE.cell),
  'relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)] px-3 py-1.5 text-[var(--screening-text-primary)] outline-none',
  'data-[highlighted]:bg-[var(--screening-surface-hover)]',
)

export type UserListTableProps = {
  rows?: UserListRow[]
  title?: string
  className?: string
}

function compareUserListValues(a: UserListRow, b: UserListRow, key: UserListColumnKey): number {
  switch (key) {
    case 'displayName':
      return a.displayName.localeCompare(b.displayName)
    case 'userName':
      return a.userName.localeCompare(b.userName)
    case 'status':
      return a.status.localeCompare(b.status)
    case 'lastLogin':
      return a.lastLogin.localeCompare(b.lastLogin)
    case 'groupCount':
      return a.groupCount - b.groupCount
    case 'applicationCount':
      return a.applicationCount - b.applicationCount
    default:
      return 0
  }
}

export function UserListTable({
  rows = MOCK_USER_LIST_ROWS,
  title = 'User List',
  className,
}: UserListTableProps) {
  const tableCaptionId = useId()
  const [sectionCollapsed, setSectionCollapsed] = useState(false)
  const [rowSearchQuery, setRowSearchQuery] = useState('')
  const [sortKey, setSortKey] = useState<UserListColumnKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const toggleSort = useCallback((key: UserListColumnKey) => {
    setSortKey((current) => {
      if (current === key) {
        setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))
        return current
      }
      setSortDir('asc')
      return key
    })
  }, [])

  const filteredRows = useMemo(() => {
    const q = rowSearchQuery.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((row) => {
      const haystack = [
        row.displayName,
        row.userName,
        row.status,
        row.lastLogin,
        String(row.groupCount),
        String(row.applicationCount),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [rows, rowSearchQuery])

  const sortedRows = useMemo(() => {
    if (!sortKey || sortKey === 'actions') return filteredRows
    const next = [...filteredRows]
    next.sort((a, b) => {
      const cmp = compareUserListValues(a, b, sortKey)
      return sortDir === 'asc' ? cmp : -cmp
    })
    return next
  }, [filteredRows, sortKey, sortDir])

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize
    return sortedRows.slice(start, start + pageSize)
  }, [sortedRows, page, pageSize])

  const columns = DEFAULT_USER_LIST_COLUMN_ORDER.map(
    (key) => USER_LIST_COLUMN_DEFINITIONS.find((column) => column.key === key)!,
  )

  const mainPanel = (
    <div className="flex max-h-[var(--screening-body-max-height)] min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-[var(--screening-border-strong)] bg-[var(--screening-surface)] px-[var(--space-4)] py-[var(--space-3)]">
        <div className="flex flex-wrap items-center justify-between gap-x-[var(--space-3)] gap-y-[var(--space-2)]">
          <AceDropdownMenu
            triggerLabel="Filters"
            triggerMode="field"
            size="sm"
            showChevron
            align="start"
            items={[
              { type: 'item', label: 'All users', selected: true },
              { type: 'item', label: 'Active' },
              { type: 'item', label: 'Inactive' },
            ]}
          />
          <div
            className={cn(
              'flex h-[var(--screening-input-height-sm)] w-[12rem] min-w-[min(100%,12.5rem)] max-w-[16rem] shrink-0 items-center gap-[var(--screening-input-gap)] rounded-[var(--screening-input-radius)] border border-solid border-[var(--screening-input-border)] bg-[var(--screening-surface)] px-[var(--screening-input-px)] transition-[background-color,border-color,box-shadow] duration-150 ease-out',
              'focus-within:border-[var(--screening-input-border-focus)] focus-within:bg-[var(--screening-input-bg-focus)] focus-within:shadow-[0_0_0_2px_var(--screening-input-focus-ring)]',
            )}
          >
            <MaterialSymbol
              name="search"
              size="md"
              className="shrink-0 text-[var(--screening-text-primary)]"
            />
            <input
              type="search"
              value={rowSearchQuery}
              onChange={(event) => {
                setRowSearchQuery(event.target.value)
                setPage(1)
              }}
              placeholder="Search Table"
              aria-label="Search table"
              className={cn(
                aceTypography(ACE.cell),
                'min-w-0 flex-1 border-0 bg-transparent p-0 text-[var(--screening-text-primary)] outline-none placeholder:text-[var(--screening-text-muted)]',
              )}
            />
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[var(--screening-table-min-width)] border-collapse text-left" aria-labelledby={tableCaptionId}>
          <caption id={tableCaptionId} className="sr-only">
            {title}, {sortedRows.length} {sortedRows.length === 1 ? 'row' : 'rows'}
          </caption>
          <thead className="sticky top-0 z-10 bg-[var(--screening-surface-muted)]">
            <tr className={cn(screeningTableHeaderRowClass, 'border-b border-[var(--screening-border-strong)]')}>
              {columns.map((column) => {
                const sortable = column.sortable !== false && column.key !== 'actions'
                const active = sortKey === column.key
                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn(
                      screeningTableHeaderCellClass,
                      column.key === 'actions' && 'w-12 text-right',
                    )}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        className={screeningTableHeaderSortButtonClass}
                        onClick={() => toggleSort(column.key)}
                      >
                        <span className={screeningTableHeaderLabelClass}>{column.label}</span>
                        {active ? (
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
                    ) : column.label ? (
                      <span className={screeningTableHeaderLabelClass}>{column.label}</span>
                    ) : (
                      <span className="sr-only">Actions</span>
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={cn(
                    aceTypography(ACE.emptyState),
                    'px-[var(--space-4)] py-[var(--space-8)] text-center text-[var(--screening-text-muted)]',
                  )}
                >
                  No users match your search.
                </td>
              </tr>
            ) : (
              paginatedRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[var(--screening-border-row)] bg-[var(--screening-surface)] transition-colors duration-150 ease-out hover:bg-[var(--screening-surface-hover)]"
                >
                  {columns.map((column) => {
                    switch (column.key) {
                      case 'displayName':
                        return (
                          <td
                            key={column.key}
                            className={cn(
                              aceTypography(ACE.cell),
                              'px-[var(--space-3)] py-[var(--space-3)] text-[var(--screening-text-primary)]',
                            )}
                          >
                            {row.displayName}
                          </td>
                        )
                      case 'userName':
                        return (
                          <td
                            key={column.key}
                            className={cn(
                              aceTypography(ACE.cell),
                              'px-[var(--space-3)] py-[var(--space-3)] text-[var(--screening-text-primary)]',
                            )}
                          >
                            {row.userName}
                          </td>
                        )
                      case 'status':
                        return (
                          <td
                            key={column.key}
                            className="whitespace-nowrap px-[var(--space-3)] py-[var(--space-3)]"
                          >
                            <AceBadge
                              appearance="pill"
                              variant={row.status === 'Active' ? 'green' : 'gray'}
                            >
                              {row.status}
                            </AceBadge>
                          </td>
                        )
                      case 'lastLogin':
                        return (
                          <td
                            key={column.key}
                            className={cn(
                              aceTypography(ACE.cell),
                              'whitespace-nowrap px-[var(--space-3)] py-[var(--space-3)] text-[var(--screening-text-secondary)]',
                            )}
                          >
                            {row.lastLogin}
                          </td>
                        )
                      case 'groupCount':
                        return (
                          <td
                            key={column.key}
                            className={cn(
                              aceTypography(ACE.cell),
                              'px-[var(--space-3)] py-[var(--space-3)] tabular-nums text-[var(--screening-text-primary)]',
                            )}
                          >
                            {row.groupCount}
                          </td>
                        )
                      case 'applicationCount':
                        return (
                          <td
                            key={column.key}
                            className={cn(
                              aceTypography(ACE.cell),
                              'px-[var(--space-3)] py-[var(--space-3)] tabular-nums text-[var(--screening-text-primary)]',
                            )}
                          >
                            {row.applicationCount}
                          </td>
                        )
                      case 'actions':
                        return (
                          <td key={column.key} className="px-[var(--space-2)] py-[var(--space-2)] text-right">
                            <DropdownMenu.Root modal={false}>
                              <DropdownMenu.Trigger asChild>
                                <button
                                  type="button"
                                  className={actionButtonClass}
                                  aria-label={`Actions for ${row.displayName}`}
                                >
                                  <MaterialSymbol name="more_horiz" size="md" weight={300} />
                                </button>
                              </DropdownMenu.Trigger>
                              <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                  align="end"
                                  sideOffset={4}
                                  className={cn(aceDropdownMenuPanelClass, 'min-w-[9rem] p-1')}
                                >
                                  <DropdownMenu.Item className={menuItemClass}>Edit</DropdownMenu.Item>
                                  <DropdownMenu.Item className={menuItemClass}>View</DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    className={cn(menuItemClass, 'text-[var(--ace-error-500)]')}
                                  >
                                    Delete
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                          </td>
                        )
                      default:
                        return null
                    }
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
    </div>
  )

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
      contentPadding={false}
    >
      {mainPanel}
    </AceAccordion>
  )
}
