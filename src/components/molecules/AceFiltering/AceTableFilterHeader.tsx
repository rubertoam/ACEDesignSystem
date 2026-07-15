import type { ReactNode } from 'react'
import { AceInputField } from '../../atoms/AceInputField'
import { cn } from '../../../lib/cn'
import {
  aceFilterHeaderActionsClass,
  aceFilterHeaderChipsClass,
  aceFilterHeaderRowClass,
  aceFilterHeaderSearchClass,
  aceFilterHeaderShellClass,
  aceFilterHeaderTitleClass,
} from './filterFieldStyles'

export type AceTableFilterHeaderProps = {
  title: string
  /** Left-side dropdown triggers (Client Centric, Filters, …). */
  actions?: ReactNode
  /** Right-aligned controls next to search (e.g. columns menu). */
  trailing?: ReactNode
  /** Applied filter chips row — omit or pass null to hide (Headers / Table / Default). */
  chips?: ReactNode
  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearchClear?: () => void
  searchPlaceholder?: string
  searchAriaLabel?: string
  className?: string
}

export function AceTableFilterHeader({
  title,
  actions,
  trailing,
  chips,
  searchValue = '',
  onSearchChange,
  onSearchClear,
  searchPlaceholder = 'Search',
  searchAriaLabel = 'Search',
  className,
}: AceTableFilterHeaderProps) {
  return (
    <div className={cn(aceFilterHeaderShellClass, className)}>
      <div className={aceFilterHeaderRowClass}>
        <div className={aceFilterHeaderActionsClass}>
          <span className={aceFilterHeaderTitleClass}>{title}</span>
          {actions}
        </div>
        <div className="flex shrink-0 items-center gap-[var(--ace-filter-header-gap)]">
          {trailing}
          <div className={aceFilterHeaderSearchClass}>
            <AceInputField
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
      {chips != null ? <div className={aceFilterHeaderChipsClass}>{chips}</div> : null}
    </div>
  )
}
