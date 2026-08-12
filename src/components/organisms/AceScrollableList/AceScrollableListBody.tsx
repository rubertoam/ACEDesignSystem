import type { ReactNode } from 'react'
import { AceBadge } from '../../atoms/AceBadge/AceBadge'
import { cn } from '../../../lib/cn'
import {
  aceScrollableListItemsClass,
  aceScrollableListNotoVar,
  aceScrollableListScrollClass,
  aceScrollableListSectionHeaderClass,
  aceScrollableListSectionTitleClass,
} from './scrollableListFieldStyles'

export type AceScrollableListBodyProps = {
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
export function AceScrollableListBody({
  sectionTitle = 'Items',
  itemCount,
  showSectionCount = true,
  children,
  className,
  listClassName,
  'aria-label': ariaLabel,
}: AceScrollableListBodyProps) {
  return (
    <div className={cn(aceScrollableListScrollClass, className)}>
      <div className={aceScrollableListSectionHeaderClass}>
        <span className={aceScrollableListSectionTitleClass} style={aceScrollableListNotoVar}>
          {sectionTitle}
        </span>
        {showSectionCount && typeof itemCount === 'number' ? (
          <AceBadge appearance="tag" variant="gray" className="ms-auto">
            {itemCount}
          </AceBadge>
        ) : null}
      </div>
      <ul
        className={cn(aceScrollableListItemsClass, listClassName)}
        role="listbox"
        aria-label={ariaLabel ?? sectionTitle}
      >
        {children}
      </ul>
    </div>
  )
}
