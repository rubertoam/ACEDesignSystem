import {
  Ban,
  Building2,
  Check,
  ChevronDown,
  Clock,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { useId, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceTimelineBodyClass,
  aceTimelineBodyPanelClass,
  aceTimelineIconClass,
  aceTimelineIconShellClass,
  aceTimelineIconShellClassBase,
  aceTimelineItemRowClass,
  aceTimelineItemContentClass,
  aceTimelineItemActionsClass,
  aceTimelineItemHeaderButtonClass,
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

function TimelineStatusIcon({
  variant,
  interactive,
}: {
  variant: AceTimelineVariant
  interactive: boolean
}) {
  const Icon = VARIANT_ICONS[variant]

  return (
    <span
      className={cn(
        aceTimelineIconShellClassBase,
        aceTimelineIconShellClass[variant],
        interactive
          ? cn(
              'size-[var(--ace-timeline-icon-size)] group-hover/timeline-item:size-[var(--ace-timeline-icon-size-hover)]',
            )
          : 'size-[var(--ace-timeline-icon-size)]',
      )}
    >
      <Icon
        className={cn(
          aceTimelineIconClass,
          interactive
            ? cn(
                'size-[var(--ace-timeline-icon-glyph-size)] group-hover/timeline-item:size-[var(--ace-timeline-icon-glyph-size-hover)]',
              )
            : 'size-[var(--ace-timeline-icon-glyph-size)]',
        )}
        strokeWidth={2}
        aria-hidden
      />
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

function TimelineToggleHint({ expanded }: { expanded: boolean }) {
  return (
    <span className={cn(aceTimelineToggleClass, 'pointer-events-none')}>
      {expanded ? 'Show less' : 'Show more'}
      <ChevronDown
        className={cn(aceTimelineToggleIconClass, expanded ? 'rotate-180' : 'rotate-0')}
        strokeWidth={2}
        aria-hidden
      />
    </span>
  )
}

function TimelineBodyPanel({
  id,
  open,
  children,
}: {
  id: string
  open: boolean
  children: ReactNode
}) {
  return (
    <div
      id={id}
      role="region"
      aria-hidden={!open}
      className={cn(
        aceTimelineBodyPanelClass,
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={aceTimelineBodyClass}>{children}</div>
      </div>
    </div>
  )
}

function TimelineItemRow({
  variant,
  label,
  timestamp,
  processName,
  interactive,
  showToggle,
  isExpanded,
}: {
  variant: AceTimelineVariant
  label: string
  timestamp: string
  processName?: string
  interactive: boolean
  showToggle: boolean
  isExpanded: boolean
}) {
  return (
    <>
      <TimelineStatusIcon variant={variant} interactive={interactive} />
      <div className={aceTimelineItemContentClass}>
        <TimelineHeading label={label} timestamp={timestamp} processName={processName} />
      </div>
      {showToggle ? (
        <div className={aceTimelineItemActionsClass}>
          <TimelineToggleHint expanded={isExpanded} />
        </div>
      ) : null}
    </>
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
  const panelId = useId()
  const isExpanded = expanded || surface === 'expanded'
  const showBody = body != null
  const showToggle = Boolean(onExpandedChange) || surface != null || showBody
  const isExpandable = Boolean(onExpandedChange) && showBody
  const previewSurface: AceTimelineItemSurface =
    surface === 'highlight' ? 'highlight' : 'default'

  const row = (
    <TimelineItemRow
      variant={variant}
      label={label}
      timestamp={timestamp}
      processName={processName}
      interactive={interactive}
      showToggle={showToggle}
      isExpanded={isExpanded}
    />
  )

  return (
    <article
      className={cn(
        aceTimelineItemShellClass({
          variant,
          surface: previewSurface,
          interactive: interactive && surface !== 'highlight',
          open: isExpanded,
        }),
        className,
      )}
    >
      {isExpandable ? (
        <button
          type="button"
          className={aceTimelineItemHeaderButtonClass}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => onExpandedChange?.(!isExpanded)}
        >
          {row}
        </button>
      ) : (
        <div className={aceTimelineItemRowClass}>{row}</div>
      )}

      {showBody ? (
        <TimelineBodyPanel id={panelId} open={isExpanded}>
          {body}
        </TimelineBodyPanel>
      ) : null}
    </article>
  )
}
