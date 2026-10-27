import type { ReactNode } from 'react'
import { Input } from '../../atoms/Input'
import { cn } from '../../../lib/cn'
import {
  filterHeaderActionsClass,
  filterHeaderChipsClass,
  filterHeaderRowClass,
  filterHeaderSearchClass,
  filterHeaderShellClass,
  filterHeaderTitleClass,
} from './filterFieldStyles'

export type TableFilterHeaderProps = {
  /** Omit or pass empty string to hide the title. */
  title?: string
  /** Left-side dropdown triggers (Client Centric, Filters, …). */
  actions?: ReactNode
  /** Right-aligned controls next to search (e.g. columns menu). */
  trailing?: ReactNode
  /** Applied filter chips row - omit or pass null to hide (Headers / Table / Default). */
  chips?: ReactNode
  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearchClear?: () => void
  searchPlaceholder?: string
  searchAriaLabel?: string
  className?: string
}

export function TableFilterHeader({
  title = '',
  actions,
  trailing,
  chips,
  searchValue = '',
  onSearchChange,
  onSearchClear,
  searchPlaceholder = 'Search',
  searchAriaLabel = 'Search',
  className,
}: TableFilterHeaderProps) {
  return (
    <div className={cn(filterHeaderShellClass, className)}>
      <div className={filterHeaderRowClass}>
        <div className={filterHeaderActionsClass}>
          {title ? <span className={filterHeaderTitleClass}>{title}</span> : null}
          {actions}
        </div>
        <div className="flex shrink-0 items-center gap-[var(--filter-header-gap)]">
          {trailing}
          <div className={filterHeaderSearchClass}>
            <Input
              fieldSize="sm"
              icon="left"
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onClear={onSearchClear}
              placeholder={searchPlaceholder}
              autoComplete="off"
              spellCheck={false}
              aria-label={searchAriaLabel}
              className="w-full bg-[var(--screening-surface)]"
            />
          </div>
        </div>
      </div>
      {chips != null ? <div className={filterHeaderChipsClass}>{chips}</div> : null}
    </div>
  )
}
