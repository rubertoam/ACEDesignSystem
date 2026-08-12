import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { AceInputField } from '../../atoms/AceInputField'
import {
  AceTooltip,
  AceTooltipContent,
  AceTooltipProvider,
  AceTooltipTrigger,
} from '../../atoms/AceTooltip/AceTooltip'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import {
  AceDropdownMenu,
  type AceDropdownMenuEntry,
} from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { cn } from '../../../lib/cn'
import { sidebarIconButtonClass } from '../AceSidebar/sidebarRowActions'
import { AceScrollableListBody } from './AceScrollableListBody'
import { AceScrollableListItemRow } from './AceScrollableListItemRow'
import {
  aceScrollableListControlLabelClass,
  aceScrollableListControlsClass,
  aceScrollableListHeaderClass,
  aceScrollableListMinimizedClass,
  aceScrollableListMinimizedTitleClass,
  aceScrollableListNotoVar,
  aceScrollableListShellClass,
  aceScrollableListShellExpandedClass,
  aceScrollableListShellMinimizedClass,
  aceScrollableListTitleClass,
} from './scrollableListFieldStyles'
import { type AceScrollableListIconKind } from './scrollableListIcons'

export type { AceScrollableListIconKind }

export type AceScrollableListFilterOption = {
  value: string
  label: string
  selectedLabel?: string
}

export type AceScrollableListFilterGroup = {
  label: string
  items: AceScrollableListFilterOption[]
}

export type AceScrollableListSortOption = {
  value: string
  label: string
}

export type AceScrollableListItem = {
  id: string
  label: string
  /**
   * Secondary line under the title (e.g. `ID-1001`).
   * Prefer this over embedding the count in the string — use `count` for the results piece.
   */
  subtext?: string
  /** @deprecated Use `subtext` (+ optional `count`). Still honored when `subtext` is omitted. */
  description?: string
  icon?: AceScrollableListIconKind
  /** Filter values this item matches (e.g. record type). */
  filterValues?: string[]
  /** Numeric count shown as `{count} results` when the count piece is on. */
  count?: number
  selected?: boolean
  onSelect?: () => void
}

export type AceScrollableListProps = {
  title: string
  /** Sticky section label above the rows. Default `Items`. */
  sectionTitle?: string
  items: AceScrollableListItem[]
  selectedId?: string
  onSelectedIdChange?: (id: string) => void
  /** Show the Filter by control. Default true. */
  showFilter?: boolean
  /** Show the Sort by control. Default true. */
  showSort?: boolean
  /** Show the search field. Default false. Renders under Filter/Sort when those are on. */
  showSearch?: boolean
  searchQuery?: string
  onSearchQueryChange?: (query: string) => void
  searchPlaceholder?: string
  filterGroups?: AceScrollableListFilterGroup[]
  selectedFilters?: ReadonlySet<string>
  onSelectedFiltersChange?: (filters: ReadonlySet<string>) => void
  sortOptions?: AceScrollableListSortOption[]
  sort?: string
  onSortChange?: (value: string) => void
  minimized?: boolean
  defaultMinimized?: boolean
  onMinimizedChange?: (minimized: boolean) => void
  className?: string
  'aria-label'?: string
}

/** Generic filter groups for lab / examples (not product-specific). */
export const DEMO_SCROLLABLE_LIST_FILTER_GROUPS: AceScrollableListFilterGroup[] = [
  {
    label: 'Record Type',
    items: [
      { value: 'individual', label: 'Individual', selectedLabel: 'Individual' },
      { value: 'organization', label: 'Organization', selectedLabel: 'Organization' },
    ],
  },
  {
    label: 'Category',
    items: [
      { value: 'category-a', label: 'Category A', selectedLabel: 'Category A' },
      { value: 'category-b', label: 'Category B', selectedLabel: 'Category B' },
      { value: 'category-c', label: 'Category C', selectedLabel: 'Category C' },
    ],
  },
]

export const DEMO_SCROLLABLE_LIST_SORT_OPTIONS: AceScrollableListSortOption[] = [
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' },
  { value: 'count-asc', label: 'Count: Low to High' },
  { value: 'count-desc', label: 'Count: High to Low' },
]

export const DEMO_SCROLLABLE_LIST_ITEMS: AceScrollableListItem[] = [
  {
    id: 'item-1',
    label: 'List Item 1',
    subtext: 'ID-1001',
    icon: 'person',
    count: 38,
    filterValues: ['individual', 'category-a'],
  },
  {
    id: 'item-2',
    label: 'List Item 2',
    subtext: 'ID-1002',
    icon: 'person',
    count: 47,
    filterValues: ['individual', 'category-b'],
  },
  {
    id: 'item-3',
    label: 'List Item 3',
    subtext: 'ID-1003',
    icon: 'person',
    count: 50,
    filterValues: ['individual', 'category-a'],
  },
  {
    id: 'item-4',
    label: 'List Item 4',
    subtext: 'ID-1004',
    icon: 'person',
    count: 16,
    filterValues: ['individual', 'category-c'],
  },
  {
    id: 'item-5',
    label: 'List Item 5',
    subtext: 'ID-1005',
    icon: 'person',
    count: 22,
    filterValues: ['individual', 'category-b'],
  },
  {
    id: 'item-6',
    label: 'List Item 6',
    subtext: 'ID-1006',
    icon: 'person',
    count: 31,
    filterValues: ['individual', 'category-a'],
  },
  {
    id: 'item-7',
    label: 'List Item 7',
    subtext: 'ID-1007',
    icon: 'person',
    count: 8,
    filterValues: ['individual', 'category-c'],
  },
  {
    id: 'item-8',
    label: 'List Item 8',
    subtext: 'ID-1008',
    icon: 'person',
    count: 41,
    filterValues: ['individual', 'category-a'],
  },
  {
    id: 'item-9',
    label: 'List Item 9',
    subtext: 'ID-1009',
    icon: 'person',
    count: 19,
    filterValues: ['individual', 'category-b'],
  },
  {
    id: 'item-10',
    label: 'List Item 10',
    subtext: 'ID-1010',
    icon: 'person',
    count: 27,
    filterValues: ['individual', 'category-c'],
  },
  {
    id: 'item-11',
    label: 'Organization 1',
    subtext: 'ID-2001',
    icon: 'organization',
    count: 11,
    filterValues: ['organization', 'category-b'],
  },
  {
    id: 'item-12',
    label: 'Organization 2',
    subtext: 'ID-2002',
    icon: 'organization',
    count: 9,
    filterValues: ['organization', 'category-c'],
  },
  {
    id: 'item-13',
    label: 'Organization 3',
    subtext: 'ID-2003',
    icon: 'organization',
    count: 14,
    filterValues: ['organization', 'category-a'],
  },
  {
    id: 'item-14',
    label: 'Organization 4',
    subtext: 'ID-2004',
    icon: 'organization',
    count: 6,
    filterValues: ['organization', 'category-b'],
  },
  {
    id: 'item-15',
    label: 'Organization 5',
    subtext: 'ID-2005',
    icon: 'organization',
    count: 23,
    filterValues: ['organization', 'category-c'],
  },
  {
    id: 'item-16',
    label: 'Organization 6',
    subtext: 'ID-2006',
    icon: 'organization',
    count: 17,
    filterValues: ['organization', 'category-a'],
  },
  {
    id: 'item-17',
    label: 'List Item 11',
    subtext: 'ID-1011',
    icon: 'person',
    count: 33,
    filterValues: ['individual', 'category-a'],
  },
  {
    id: 'item-18',
    label: 'List Item 12',
    subtext: 'ID-1012',
    icon: 'person',
    count: 12,
    filterValues: ['individual', 'category-b'],
  },
]

function filterTriggerLabel(
  groups: AceScrollableListFilterGroup[],
  selected: ReadonlySet<string>,
): string {
  if (selected.size === 0) return 'All'
  if (selected.size === 1) {
    const value = [...selected][0]
    for (const group of groups) {
      const match = group.items.find((item) => item.value === value)
      if (match) return match.selectedLabel ?? match.label
    }
    return value
  }
  return `${selected.size} selected`
}

function itemCount(item: AceScrollableListItem): number {
  if (typeof item.count === 'number') return item.count
  const secondary = item.subtext ?? item.description
  const match = secondary?.match(/(\d+)\s+results?/i)
  return match ? Number(match[1]) : 0
}

function itemSubtext(item: AceScrollableListItem): string | undefined {
  return item.subtext ?? item.description
}

function sortItems(items: AceScrollableListItem[], sort: string): AceScrollableListItem[] {
  const next = [...items]
  next.sort((a, b) => {
    switch (sort) {
      case 'name-desc':
        return b.label.localeCompare(a.label)
      case 'count-asc':
        return itemCount(a) - itemCount(b)
      case 'count-desc':
        return itemCount(b) - itemCount(a)
      case 'name-asc':
      default:
        return a.label.localeCompare(b.label)
    }
  })
  return next
}

function itemMatchesFilters(item: AceScrollableListItem, filters: ReadonlySet<string>): boolean {
  if (filters.size === 0) return true
  const values = item.filterValues ?? []
  return values.some((value) => filters.has(value))
}

function itemMatchesSearch(item: AceScrollableListItem, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const secondary = itemSubtext(item)
  return (
    item.label.toLowerCase().includes(q) ||
    (secondary?.toLowerCase().includes(q) ?? false)
  )
}

export function AceScrollableList({
  title,
  sectionTitle = 'Items',
  items,
  selectedId,
  onSelectedIdChange,
  showFilter = true,
  showSort = true,
  showSearch = false,
  searchQuery: searchQueryProp,
  onSearchQueryChange,
  searchPlaceholder = 'Search',
  filterGroups = DEMO_SCROLLABLE_LIST_FILTER_GROUPS,
  selectedFilters: selectedFiltersProp,
  onSelectedFiltersChange,
  sortOptions = DEMO_SCROLLABLE_LIST_SORT_OPTIONS,
  sort: sortProp,
  onSortChange,
  minimized: minimizedProp,
  defaultMinimized = false,
  onMinimizedChange,
  className,
  'aria-label': ariaLabel,
}: AceScrollableListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [minimizedInternal, setMinimizedInternal] = useState(defaultMinimized)
  const [filtersInternal, setFiltersInternal] = useState<ReadonlySet<string>>(() => new Set())
  const [sortInternal, setSortInternal] = useState(sortOptions[0]?.value ?? 'name-asc')
  const [searchInternal, setSearchInternal] = useState('')
  const titleId = useId()

  const minimized = minimizedProp ?? minimizedInternal
  const selectedFilters = showFilter ? (selectedFiltersProp ?? filtersInternal) : new Set<string>()
  const sort = showSort ? (sortProp ?? sortInternal) : 'name-asc'
  const searchQuery = showSearch ? (searchQueryProp ?? searchInternal) : ''

  const setMinimized = (next: boolean) => {
    if (minimizedProp == null) setMinimizedInternal(next)
    onMinimizedChange?.(next)
  }

  const setSelectedFilters = useCallback(
    (next: ReadonlySet<string>) => {
      if (selectedFiltersProp == null) setFiltersInternal(next)
      onSelectedFiltersChange?.(next)
    },
    [onSelectedFiltersChange, selectedFiltersProp],
  )

  const setSort = (next: string) => {
    if (sortProp == null) setSortInternal(next)
    onSortChange?.(next)
  }

  const setSearchQuery = (next: string) => {
    if (searchQueryProp == null) setSearchInternal(next)
    onSearchQueryChange?.(next)
  }

  const visibleItems = useMemo(() => {
    const filtered = items.filter(
      (item) => itemMatchesFilters(item, selectedFilters) && itemMatchesSearch(item, searchQuery),
    )
    return showSort ? sortItems(filtered, sort) : filtered
  }, [items, selectedFilters, searchQuery, sort, showSort])

  const showFilterSortRow = showFilter || showSort
  const showControls = showFilterSortRow || showSearch

  const resolvedSelectedId =
    selectedId ?? items.find((item) => item.selected)?.id ?? visibleItems[0]?.id

  useEffect(() => {
    if (!resolvedSelectedId) return
    if (visibleItems.some((item) => item.id === resolvedSelectedId)) return
    if (visibleItems[0]) onSelectedIdChange?.(visibleItems[0].id)
  }, [visibleItems, resolvedSelectedId, onSelectedIdChange])

  useEffect(() => {
    const listElement = listRef.current
    if (!listElement || minimized) return

    const selectByOffset = (offset: number) => {
      const pos = visibleItems.findIndex((item) => item.id === resolvedSelectedId)
      if (pos < 0) return
      const nextPos = pos + offset
      if (nextPos < 0 || nextPos >= visibleItems.length) return
      const next = visibleItems[nextPos]
      next.onSelect?.()
      onSelectedIdChange?.(next.id)
      window.requestAnimationFrame(() => {
        listElement
          .querySelector<HTMLElement>(`[data-scrollable-list-item-id="${CSS.escape(next.id)}"]`)
          ?.scrollIntoView({ block: 'nearest' })
      })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || document.activeElement !== listElement) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        selectByOffset(1)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        selectByOffset(-1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        const first = visibleItems[0]
        if (!first) return
        first.onSelect?.()
        onSelectedIdChange?.(first.id)
      } else if (e.key === 'End') {
        e.preventDefault()
        const last = visibleItems[visibleItems.length - 1]
        if (!last) return
        last.onSelect?.()
        onSelectedIdChange?.(last.id)
      }
    }

    listElement.addEventListener('keydown', handleKeyDown)
    return () => listElement.removeEventListener('keydown', handleKeyDown)
  }, [isFocused, minimized, visibleItems, resolvedSelectedId, onSelectedIdChange])

  const setFilterChecked = useCallback(
    (value: string, checked: boolean) => {
      const next = new Set(selectedFilters)
      if (checked) next.add(value)
      else next.delete(value)
      setSelectedFilters(next)
    },
    [selectedFilters, setSelectedFilters],
  )

  const filterMenuItems = useMemo((): AceDropdownMenuEntry[] => {
    const entries: AceDropdownMenuEntry[] = []
    for (const group of filterGroups) {
      entries.push({ type: 'label', label: group.label })
      for (const item of group.items) {
        entries.push({
          type: 'checkbox',
          label: item.label,
          checked: selectedFilters.has(item.value),
          style: 'assignment',
          onCheckedChange: (checked) => setFilterChecked(item.value, checked),
        })
      }
    }
    return entries
  }, [filterGroups, selectedFilters, setFilterChecked])

  const sortMenuItems = useMemo(
    (): AceDropdownMenuEntry[] => [
      {
        type: 'radioGroup',
        value: sort,
        onValueChange: setSort,
        options: sortOptions.map((option) => ({
          value: option.value,
          label: option.label,
        })),
      },
    ],
    [sort, sortOptions],
  )

  return (
    <AceTooltipProvider>
      <div
        ref={listRef}
        tabIndex={0}
        aria-label={ariaLabel ?? title}
        aria-labelledby={titleId}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          aceScrollableListShellClass,
          minimized ? aceScrollableListShellMinimizedClass : aceScrollableListShellExpandedClass,
          className,
        )}
      >
        {minimized ? (
          <div className={aceScrollableListMinimizedClass}>
            <AceTooltip>
              <AceTooltipTrigger asChild>
                <button
                  type="button"
                  aria-expanded={false}
                  aria-label={`Expand ${title}`}
                  className={sidebarIconButtonClass}
                  onClick={() => setMinimized(false)}
                >
                  <MaterialSymbol name="keyboard_arrow_right" size="md" className="text-current" />
                </button>
              </AceTooltipTrigger>
              <AceTooltipContent side="right" variant="screening-toolbar" hideArrow>
                Expand
              </AceTooltipContent>
            </AceTooltip>
            <span
              id={titleId}
              className={aceScrollableListMinimizedTitleClass}
              style={{
                ...aceScrollableListNotoVar,
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
              title={title}
            >
              {title}
            </span>
          </div>
        ) : (
          <>
            <div className={aceScrollableListHeaderClass}>
              <p id={titleId} className={aceScrollableListTitleClass} style={aceScrollableListNotoVar}>
                {title}
              </p>
              <AceTooltip>
                <AceTooltipTrigger asChild>
                  <button
                    type="button"
                    aria-expanded={true}
                    aria-label={`Minimize ${title}`}
                    className={cn(sidebarIconButtonClass, 'shrink-0')}
                    onClick={() => setMinimized(true)}
                  >
                    <MaterialSymbol name="keyboard_arrow_left" size="md" className="text-current" />
                  </button>
                </AceTooltipTrigger>
                <AceTooltipContent side="top" variant="screening-toolbar" hideArrow>
                  Collapse
                </AceTooltipContent>
              </AceTooltip>
            </div>

            {showControls ? (
              <div className={aceScrollableListControlsClass}>
                {showFilterSortRow ? (
                  <div className="flex items-end gap-2">
                    {showFilter ? (
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <span className={aceScrollableListControlLabelClass} style={aceScrollableListNotoVar}>
                          Filter by
                        </span>
                        <AceDropdownMenu
                          triggerLabel={filterTriggerLabel(filterGroups, selectedFilters)}
                          triggerMode="field"
                          size="sm"
                          panelWidth="wide"
                          align="start"
                          className="!w-full !max-w-full font-normal"
                          items={filterMenuItems}
                        />
                      </div>
                    ) : null}
                    {showSort ? (
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <span className={aceScrollableListControlLabelClass} style={aceScrollableListNotoVar}>
                          Sort by
                        </span>
                        <AceDropdownMenu
                          triggerLabel={
                            sortOptions.find((option) => option.value === sort)?.label ?? 'Sort'
                          }
                          triggerMode="field"
                          size="sm"
                          panelWidth="wide"
                          align="start"
                          className="!w-full !max-w-full font-normal"
                          items={sortMenuItems}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {showSearch ? (
                  <AceInputField
                    type="search"
                    icon="left"
                    fieldSize="sm"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClear={() => setSearchQuery('')}
                    aria-label={searchPlaceholder}
                  />
                ) : null}
              </div>
            ) : null}

            <AceScrollableListBody sectionTitle={sectionTitle} itemCount={visibleItems.length}>
              {visibleItems.map((item) => {
                const selected = item.id === resolvedSelectedId
                return (
                  <li key={item.id} role="none" data-scrollable-list-item-id={item.id}>
                    <AceScrollableListItemRow
                      title={item.label}
                      icon={item.icon}
                      subtext={itemSubtext(item)}
                      count={item.count}
                      selected={selected}
                      showFocusRing={selected && isFocused}
                      onSelect={() => {
                        item.onSelect?.()
                        onSelectedIdChange?.(item.id)
                        listRef.current?.focus()
                      }}
                    />
                  </li>
                )
              })}
            </AceScrollableListBody>
          </>
        )}
      </div>
    </AceTooltipProvider>
  )
}
