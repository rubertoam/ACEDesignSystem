import { cn } from '../../../lib/cn'
import { LANDING_PAGE_CARD_ICONS } from './landingPageCardAssets'

const motionEase = '[transition-timing-function:var(--ace-motion-ease-standard)]'

/** Compact header glyphs (~16px) with a 24px hit target — Figma Icons strip (4212:1131). */
const iconButtonClass = cn(
  'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--ace-landing-page-card-icon-color)]',
  'transition-colors duration-[var(--ace-motion-duration-fast)]',
  motionEase,
  'hover:bg-[var(--color-bg-secondary)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)]',
)

const ICONS = [
  { id: 'lock', label: 'Lock', src: LANDING_PAGE_CARD_ICONS.headerLock, className: 'h-4 w-3' },
  { id: 'refresh', label: 'Refresh', src: LANDING_PAGE_CARD_ICONS.headerRefresh, className: 'size-4' },
  { id: 'visibility', label: 'Visibility', src: LANDING_PAGE_CARD_ICONS.headerVisibility, className: 'h-2.5 w-3.5' },
  {
    id: 'more',
    label: 'More options',
    src: LANDING_PAGE_CARD_ICONS.headerMoreHorizontal,
    className: 'h-1 w-4',
  },
] as const

export type LandingPageCardHeaderActionId = (typeof ICONS)[number]['id']

export type LandingPageCardHeaderActionsProps = {
  onActionClick?: (actionId: LandingPageCardHeaderActionId) => void
  className?: string
}

export function LandingPageCardHeaderActions({
  onActionClick,
  className,
}: LandingPageCardHeaderActionsProps) {
  return (
    <div className={cn('flex shrink-0 items-center gap-0.5', className)} aria-label="Card actions">
      {ICONS.map(({ id, label, src, className: iconClass }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          className={iconButtonClass}
          onClick={() => onActionClick?.(id)}
        >
          <img src={src} alt="" className={cn('block max-h-4 max-w-4 object-contain', iconClass)} width={16} height={16} />
        </button>
      ))}
    </div>
  )
}
