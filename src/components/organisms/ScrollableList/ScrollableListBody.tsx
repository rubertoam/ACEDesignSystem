import type { ReactNode } from 'react'
import { Badge } from '../../atoms/Badge/Badge'
import { cn } from '../../../lib/cn'
import {
  scrollableListItemsClass,
  scrollableListNotoVar,
  scrollableListScrollClass,
  scrollableListSectionHeaderClass,
  scrollableListSectionTitleClass,
} from './scrollableListFieldStyles'

export type ScrollableListBodyProps = {
  /** Sticky section label above the rows. Default `Items`. */
  sectionTitle?: string
  /** Count shown in the sticky section badge. */
  itemCount?: number
  showSectionCount?: boolean
  children: ReactNode
  className?: string
  listClassName?: string
  'aria-label'?: string
}

/** Scroll body: sticky section header + list item container. */
export function ScrollableListBody({
  sectionTitle = 'Items',
  itemCount,
  showSectionCount = true,
  children,
  className,
  listClassName,
  'aria-label': ariaLabel,
}: ScrollableListBodyProps) {
  return (
    <div className={cn(scrollableListScrollClass, className)}>
      <div className={scrollableListSectionHeaderClass}>
        <span className={scrollableListSectionTitleClass} style={scrollableListNotoVar}>
          {sectionTitle}
        </span>
        {showSectionCount && typeof itemCount === 'number' ? (
          <Badge appearance="tag" variant="gray" className="ms-auto">
            {itemCount}
          </Badge>
        ) : null}
      </div>
      <ul
        className={cn(scrollableListItemsClass, listClassName)}
        role="listbox"
        aria-label={ariaLabel ?? sectionTitle}
      >
        {children}
      </ul>
    </div>
  )
}
