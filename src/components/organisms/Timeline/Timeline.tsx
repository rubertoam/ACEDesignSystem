import { useMemo, useState } from 'react'
import {
  DropdownMenu,
  type DropdownMenuEntry,
} from '../../molecules/DropdownMenu/DropdownMenu'
import { cn } from '../../../lib/cn'
import { TimelineItem, type TimelineItemData } from './TimelineItem'
import {
  timelineExpandAllClass,
  timelineHeaderClass,
  timelineListClass,
  timelineShellClass,
  timelineSortTriggerClass,
  type TimelineSort,
} from './timelineFieldStyles'

export type TimelineProps = {
  items: TimelineItemData[]
  sort?: TimelineSort
  onSortChange?: (sort: TimelineSort) => void
  expandedIds?: string[]
  onExpandedIdsChange?: (ids: string[]) => void
  className?: string
}

const SORT_LABELS: Record<TimelineSort, string> = {
  'past-to-present': 'Sort by: Past to Present',
  'present-to-past': 'Sort by: Present to Past',
}

const SORT_OPTIONS: TimelineSort[] = ['past-to-present', 'present-to-past']

function sortItems(items: TimelineItemData[], sort: TimelineSort) {
  if (sort === 'past-to-present') return items
  return [...items].reverse()
}

export function Timeline({
  items,
  sort: sortProp,
  onSortChange,
  expandedIds: expandedIdsProp,
  onExpandedIdsChange,
  className,
}: TimelineProps) {
  const [sortInternal, setSortInternal] = useState<TimelineSort>('past-to-present')
  const [expandedInternal, setExpandedInternal] = useState<string[]>([])
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null)

  const sort = sortProp ?? sortInternal
  const expandedIds = expandedIdsProp ?? expandedInternal

  const setExpandedIds = (ids: string[]) => {
    if (expandedIdsProp == null) setExpandedInternal(ids)
    onExpandedIdsChange?.(ids)
  }

  const setSort = (next: TimelineSort) => {
    if (sortProp == null) setSortInternal(next)
    onSortChange?.(next)
  }

  const sortMenuItems = useMemo<DropdownMenuEntry[]>(
    () =>
      SORT_OPTIONS.map((value) => ({
        type: 'item',
        label: SORT_LABELS[value],
        highlighted: sort === value,
        onSelect: () => setSort(value),
      })),
    [sort],
  )

  const sortedItems = useMemo(() => sortItems(items, sort), [items, sort])
  const allExpanded = sortedItems.length > 0 && sortedItems.every((item) => expandedIds.includes(item.id))

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedIds([])
      return
    }
    setExpandedIds(sortedItems.map((item) => item.id))
  }

  const toggleItem = (id: string, open: boolean) => {
    setExpandedIds(
      open ? [...new Set([...expandedIds, id])] : expandedIds.filter((entry) => entry !== id),
    )
  }

  return (
    <section
      ref={setPortalHost}
      className={cn(timelineShellClass, className)}
      aria-label="Timeline"
    >
      <div className={timelineHeaderClass}>
        <DropdownMenu
          triggerLabel={SORT_LABELS[sort]}
          triggerMode="field"
          size="sm"
          panelWidth="wide"
          align="start"
          items={sortMenuItems}
          portalContainer={portalHost}
          className={timelineSortTriggerClass}
        />
        <button type="button" className={timelineExpandAllClass} onClick={toggleExpandAll}>
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className={timelineListClass}>
        {sortedItems.map((item) => (
          <TimelineItem
            key={item.id}
            variant={item.variant}
            label={item.label}
            timestamp={item.timestamp}
            processName={item.processName}
            body={item.body}
            expanded={expandedIds.includes(item.id)}
            onExpandedChange={(open) => toggleItem(item.id, open)}
          />
        ))}
      </div>
    </section>
  )
}

export const DEMO_TIMELINE_ITEMS: TimelineItemData[] = [
  {
    id: 'system-action',
    variant: 'system-action',
    label: '[System Action]',
    timestamp: 'MM-DD-YYYY HH:MM:SS',
  },
  {
    id: 'escalation',
    variant: 'escalation',
    label: '[Escalation]',
    timestamp: 'MM-DD-YYYY HH:MM:SS',
  },
  {
    id: 'pending',
    variant: 'pending',
    label: '[Pending]',
    timestamp: 'MM-DD-YYYY HH:MM:SS',
  },
  {
    id: 'blocked',
    variant: 'blocked',
    label: '[Blocked]',
    timestamp: 'MM-DD-YYYY HH:MM:SS',
  },
  {
    id: 'safe',
    variant: 'safe',
    label: '[Safe]',
    timestamp: 'MM-DD-YYYY HH:MM:SS',
  },
]

export type { TimelineItemData } from './TimelineItem'
export type { TimelineSort, TimelineVariant, TimelineItemSurface } from './timelineFieldStyles'
