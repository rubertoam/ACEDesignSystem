import { useId, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
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

const VARIANT_ICON_NAMES: Record<AceTimelineVariant, string> = {
  'system-action': 'apartment',
  escalation: 'arrow_circle_up',
  pending: 'schedule',
  blocked: 'stop_circle',
  safe: 'check_circle',
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
      <MaterialSymbol
        name={VARIANT_ICON_NAMES[variant]}
        className={cn(
          aceTimelineIconClass,
          'transition-[font-size]',
          interactive
            ? cn(
                'text-[length:var(--ace-timeline-icon-glyph-size)] group-hover/timeline-item:text-[length:var(--ace-timeline-icon-glyph-size-hover)]',
              )
            : 'text-[length:var(--ace-timeline-icon-glyph-size)]',
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
      <MaterialSymbol
        name="keyboard_arrow_down"
        size="sm"
        className={cn(aceTimelineToggleIconClass, expanded ? 'rotate-180' : 'rotate-0')}
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
