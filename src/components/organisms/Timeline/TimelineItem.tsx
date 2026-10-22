import { useId, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../../molecules/Accordion/MaterialSymbol'
import {
  timelineBodyClass,
  timelineBodyPanelClass,
  timelineIconClass,
  timelineIconShellClass,
  timelineIconShellClassBase,
  timelineItemRowClass,
  timelineItemContentClass,
  timelineItemActionsClass,
  timelineItemHeaderButtonClass,
  timelineItemSeparatorClass,
  timelineItemSubtitleClass,
  timelineItemTitleRowClass,
  timelineToggleClass,
  timelineToggleIconClass,
  timelineItemShellClass,
  type TimelineItemSurface,
  type TimelineVariant,
} from './timelineFieldStyles'

const VARIANT_ICON_NAMES: Record<TimelineVariant, string> = {
  'system-action': 'apartment',
  escalation: 'arrow_circle_up',
  pending: 'schedule',
  blocked: 'stop_circle',
  safe: 'check_circle',
}

export type TimelineItemData = {
  id: string
  variant: TimelineVariant
  label: string
  timestamp: string
  processName?: string
  body?: ReactNode
}

export type TimelineItemProps = {
  variant: TimelineVariant
  label: string
  timestamp: string
  processName?: string
  body?: ReactNode
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  /** Static preview surface for the lab breakdown. */
  surface?: TimelineItemSurface
  /** Enables hover highlight backgrounds (default true). */
  interactive?: boolean
  className?: string
}

function TimelineStatusIcon({
  variant,
  interactive,
}: {
  variant: TimelineVariant
  interactive: boolean
}) {
  return (
    <span
      className={cn(
        timelineIconShellClassBase,
        timelineIconShellClass[variant],
        interactive
          ? cn(
              'size-[var(--timeline-icon-size)] group-hover/timeline-item:size-[var(--timeline-icon-size-hover)]',
            )
          : 'size-[var(--timeline-icon-size)]',
      )}
    >
      <MaterialSymbol
        name={VARIANT_ICON_NAMES[variant]}
        className={cn(
          timelineIconClass,
          'transition-[font-size]',
          interactive
            ? cn(
                'text-[length:var(--timeline-icon-glyph-size)] group-hover/timeline-item:text-[length:var(--timeline-icon-glyph-size-hover)]',
              )
            : 'text-[length:var(--timeline-icon-glyph-size)]',
        )}
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
      <div className={timelineItemTitleRowClass}>
        <span className="shrink-0">{label}</span>
        <span className={timelineItemSeparatorClass} aria-hidden>
          |
        </span>
        <span className="shrink-0">{timestamp}</span>
      </div>
      <p className={timelineItemSubtitleClass}>{processName}</p>
    </div>
  )
}

function TimelineToggleHint({ expanded }: { expanded: boolean }) {
  return (
    <span className={cn(timelineToggleClass, 'pointer-events-none')}>
      {expanded ? 'Show less' : 'Show more'}
      <MaterialSymbol
        name="keyboard_arrow_down"
        size="sm"
        className={cn(timelineToggleIconClass, expanded ? 'rotate-180' : 'rotate-0')}
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
        timelineBodyPanelClass,
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={timelineBodyClass}>{children}</div>
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
  variant: TimelineVariant
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
      <div className={timelineItemContentClass}>
        <TimelineHeading label={label} timestamp={timestamp} processName={processName} />
      </div>
      {showToggle ? (
        <div className={timelineItemActionsClass}>
          <TimelineToggleHint expanded={isExpanded} />
        </div>
      ) : null}
    </>
  )
}

export function TimelineItem({
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
}: TimelineItemProps) {
  const panelId = useId()
  const isExpanded = expanded || surface === 'expanded'
  const showBody = body != null
  const showToggle = Boolean(onExpandedChange) || surface != null || showBody
  const isExpandable = Boolean(onExpandedChange) && showBody
  const previewSurface: TimelineItemSurface =
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
        timelineItemShellClass({
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
          className={timelineItemHeaderButtonClass}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => onExpandedChange?.(!isExpanded)}
        >
          {row}
        </button>
      ) : (
        <div className={timelineItemRowClass}>{row}</div>
      )}

      {showBody ? (
        <TimelineBodyPanel id={panelId} open={isExpanded}>
          {body}
        </TimelineBodyPanel>
      ) : null}
    </article>
  )
}
