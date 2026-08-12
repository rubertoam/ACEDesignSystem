import { cn } from '../../../lib/cn'
import {
  aceScrollableListItemClass,
  aceScrollableListItemDescriptionClass,
  aceScrollableListItemFocusRingClass,
  aceScrollableListItemLabelClass,
  aceScrollableListItemSelectedClass,
  aceScrollableListNotoVar,
} from './scrollableListFieldStyles'
import {
  AceScrollableListItemIcon,
  type AceScrollableListIconKind,
} from './scrollableListIcons'

export type AceScrollableListItemRowProps = {
  /** Primary row label. */
  title: string
  icon?: AceScrollableListIconKind
  /** Secondary line (e.g. record id). Shown before count when both are on. */
  subtext?: string
  /** Numeric count shown as `{count} results` on the secondary line. */
  count?: number
  /** Suffix after the count number. Default `results`. */
  countSuffix?: string
  showIcon?: boolean
  showTitle?: boolean
  showSubtext?: boolean
  showCount?: boolean
  selected?: boolean
  /** Focus ring when the list shell is focused and this row is selected. */
  showFocusRing?: boolean
  onSelect?: () => void
  className?: string
  role?: 'option' | 'button'
  'aria-selected'?: boolean
}

export function formatScrollableListItemSecondary({
  subtext,
  count,
  countSuffix = 'results',
  showSubtext = true,
  showCount = true,
}: {
  subtext?: string
  count?: number
  countSuffix?: string
  showSubtext?: boolean
  showCount?: boolean
}): string | null {
  const parts: string[] = []
  if (showSubtext && subtext) parts.push(subtext)
  if (showCount && typeof count === 'number') parts.push(`${count} ${countSuffix}`)
  return parts.length > 0 ? parts.join(' · ') : null
}

/** Selectable row: icon, title, subtext, and count as independent pieces. */
export function AceScrollableListItemRow({
  title,
  icon,
  subtext,
  count,
  countSuffix = 'results',
  showIcon = true,
  showTitle = true,
  showSubtext = true,
  showCount = true,
  selected = false,
  showFocusRing = false,
  onSelect,
  className,
  role = 'option',
  'aria-selected': ariaSelected,
}: AceScrollableListItemRowProps) {
  const secondary = formatScrollableListItemSecondary({
    subtext,
    count,
    countSuffix,
    showSubtext,
    showCount,
  })
  const showIconSlot = showIcon && icon != null
  const interactive = role === 'button'

  return (
    <div
      role={role}
      tabIndex={interactive ? 0 : undefined}
      aria-selected={role === 'option' ? (ariaSelected ?? selected) : undefined}
      onClick={onSelect}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect?.()
              }
            }
          : undefined
      }
      className={cn(
        aceScrollableListItemClass,
        selected && aceScrollableListItemSelectedClass,
        className,
      )}
    >
      {selected && showFocusRing ? (
        <span className={aceScrollableListItemFocusRingClass} aria-hidden />
      ) : null}
      <span className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
        {showIconSlot ? <AceScrollableListItemIcon kind={icon} /> : null}
        <span className="flex min-w-0 flex-1 flex-col">
          {showTitle ? (
            <span className={aceScrollableListItemLabelClass} style={aceScrollableListNotoVar}>
              {title}
            </span>
          ) : null}
          {secondary ? (
            <span className={aceScrollableListItemDescriptionClass} style={aceScrollableListNotoVar}>
              {secondary}
            </span>
          ) : null}
        </span>
      </span>
    </div>
  )
}
