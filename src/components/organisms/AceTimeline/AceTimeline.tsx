import { useMemo, useState } from 'react'
import {
  AceDropdownMenu,
  type AceDropdownMenuEntry,
} from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { cn } from '../../../lib/cn'
import { AceTimelineItem, type AceTimelineItemData } from './AceTimelineItem'
import {
  aceTimelineExpandAllClass,
  aceTimelineHeaderClass,
  aceTimelineListClass,
  aceTimelineShellClass,
  aceTimelineSortTriggerClass,
  type AceTimelineSort,
} from './timelineFieldStyles'

export type AceTimelineProps = {
  items: AceTimelineItemData[]
  sort?: AceTimelineSort
  onSortChange?: (sort: AceTimelineSort) => void
  expandedIds?: string[]
  onExpandedIdsChange?: (ids: string[]) => void
  className?: string
}

const SORT_LABELS: Record<AceTimelineSort, string> = {
  'past-to-present': 'Sort by: Past to Present',
  'present-to-past': 'Sort by: Present to Past',
}

const SORT_OPTIONS: AceTimelineSort[] = ['past-to-present', 'present-to-past']

function sortItems(items: AceTimelineItemData[], sort: AceTimelineSort) {
  if (sort === 'past-to-present') return items
  return [...items].reverse()
}

export function AceTimeline({
  items,
  sort: sortProp,
  onSortChange,
  expandedIds: expandedIdsProp,
  onExpandedIdsChange,
  className,
}: AceTimelineProps) {
  const [sortInternal, setSortInternal] = useState<AceTimelineSort>('past-to-present')
  const [expandedInternal, setExpandedInternal] = useState<string[]>([])
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null)

  const sort = sortProp ?? sortInternal
  const expandedIds = expandedIdsProp ?? expandedInternal

  const setExpandedIds = (ids: string[]) => {
    if (expandedIdsProp == null) setExpandedInternal(ids)
    onExpandedIdsChange?.(ids)
  }

  const setSort = (next: AceTimelineSort) => {
    if (sortProp == null) setSortInternal(next)
    onSortChange?.(next)
  }

  const sortMenuItems = useMemo<AceDropdownMenuEntry[]>(
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
      className={cn(aceTimelineShellClass, className)}
      aria-label="Timeline"
    >
      <div className={aceTimelineHeaderClass}>
        <AceDropdownMenu
          triggerLabel={SORT_LABELS[sort]}
          triggerMode="field"
          size="sm"
          panelWidth="wide"
          align="start"
          items={sortMenuItems}
          portalContainer={portalHost}
          className={aceTimelineSortTriggerClass}
        />
        <button type="button" className={aceTimelineExpandAllClass} onClick={toggleExpandAll}>
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className={aceTimelineListClass}>
        {sortedItems.map((item) => (
          <AceTimelineItem
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

export const DEMO_TIMELINE_ITEMS: AceTimelineItemData[] = [
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

export type { AceTimelineItemData } from './AceTimelineItem'
export type { AceTimelineSort, AceTimelineVariant, AceTimelineItemSurface } from './timelineFieldStyles'
