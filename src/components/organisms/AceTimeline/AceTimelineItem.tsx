import {
  Ban,
  Building2,
  Check,
  ChevronDown,
  Clock,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceTimelineBodyClass,
  aceTimelineIconClass,
  aceTimelineIconShellClass,
  aceTimelineItemRowClass,
  aceTimelineItemContentClass,
  aceTimelineItemActionsClass,
  aceTimelineItemSeparatorClass,
  aceTimelineItemSubtitleClass,
  aceTimelineItemTitleRowClass,
  aceTimelineToggleClass,
  aceTimelineToggleIconClass,
  aceTimelineItemShellClass,
  type AceTimelineItemSurface,
  type AceTimelineVariant,
} from './timelineFieldStyles'

const VARIANT_ICONS: Record<AceTimelineVariant, LucideIcon> = {
  'system-action': Building2,
  escalation: TrendingUp,
  pending: Clock,
  blocked: Ban,
  safe: Check,
}

export type AceTimelineItemData = {
  id: string
  variant: AceTimelineVariant
  label: string
  timestamp: string
  processName?: string
  body?: ReactNode
}

export type AceTimelineItemProps = {
  variant: AceTimelineVariant
  label: string
  timestamp: string
  processName?: string
  body?: ReactNode
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  /** Static preview surface for the lab breakdown. */
  surface?: AceTimelineItemSurface
  /** Enables hover highlight backgrounds (default true). */
  interactive?: boolean
  className?: string
}

function TimelineStatusIcon({ variant }: { variant: AceTimelineVariant }) {
  const Icon = VARIANT_ICONS[variant]

  return (
    <span
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full',
        aceTimelineIconShellClass[variant],
      )}
    >
      <Icon className={aceTimelineIconClass} strokeWidth={2} aria-hidden />
    </span>
  )
}

function TimelineHeading({
  label,
  timestamp,
  processName = 'By Process Name',
}: {
  label: string
  timestamp: string
  processName?: string
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div className={aceTimelineItemTitleRowClass}>
        <span className="shrink-0">{label}</span>
        <span className={aceTimelineItemSeparatorClass} aria-hidden>
          |
        </span>
        <span className="shrink-0">{timestamp}</span>
      </div>
      <p className={aceTimelineItemSubtitleClass}>{processName}</p>
    </div>
  )
}

function TimelineToggle({
  expanded,
  onClick,
}: {
  expanded: boolean
  onClick?: () => void
}) {
  return (
    <button type="button" className={aceTimelineToggleClass} onClick={onClick}>
      {expanded ? 'Show less' : 'Show more'}
      <ChevronDown
        className={cn(aceTimelineToggleIconClass, expanded && 'rotate-180')}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  )
}

export function AceTimelineItem({
  variant,
  label,
  timestamp,
  processName,
  body = 'Body content',
  expanded = false,
  onExpandedChange,
  surface,
  interactive = true,
  className,
}: AceTimelineItemProps) {
  const isExpanded = expanded || surface === 'expanded'
  const showToggle = Boolean(onExpandedChange) || surface != null || body != null

  const row = (
    <div className={aceTimelineItemRowClass}>
      <TimelineStatusIcon variant={variant} />
      <div className={aceTimelineItemContentClass}>
        <TimelineHeading label={label} timestamp={timestamp} processName={processName} />
      </div>
      {showToggle ? (
        <div className={aceTimelineItemActionsClass}>
          <TimelineToggle
            expanded={isExpanded}
            onClick={onExpandedChange ? () => onExpandedChange(!isExpanded) : undefined}
          />
        </div>
      ) : null}
    </div>
  )

  if (isExpanded) {
    return (
      <article
        className={cn(
          aceTimelineItemShellClass({ variant, surface: 'expanded', interactive }),
          className,
        )}
      >
        {row}
        <div className={aceTimelineBodyClass}>{body}</div>
      </article>
    )
  }

  return (
    <article
      className={cn(
        aceTimelineItemShellClass({
          variant,
          surface: surface === 'highlight' ? 'highlight' : 'default',
          interactive: interactive && surface !== 'highlight',
        }),
        className,
      )}
    >
      {row}
    </article>
  )
}
