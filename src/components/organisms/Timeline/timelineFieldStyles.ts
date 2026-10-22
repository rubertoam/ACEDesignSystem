import { cn } from '../../../lib/cn'

export type TimelineVariant =
  | 'system-action'
  | 'escalation'
  | 'pending'
  | 'blocked'
  | 'safe'

export type TimelineSort = 'past-to-present' | 'present-to-past'

export type TimelineItemSurface = 'default' | 'highlight' | 'expanded'

const titleClass =
  '[font:var(--ace-type-paragraph-p2-regular)] [letter-spacing:var(--ace-type-paragraph-p2-regular-tracking)] text-[var(--timeline-title)]'

const subtitleClass =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--timeline-subtitle)]'

export const timelineShellClass = cn(
  'flex w-full min-w-0 flex-col gap-[var(--timeline-section-gap)]',
  'rounded-[var(--timeline-radius)] border border-solid border-[var(--timeline-border)]',
  'bg-[var(--timeline-surface)] p-[var(--timeline-padding)]',
)

export const timelineHeaderClass = 'flex w-full items-center justify-between gap-4'

export const timelineSortTriggerClass =
  'w-[var(--timeline-sort-width)] shrink-0 [font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]'

export const timelineExpandAllClass = cn(
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'rounded-[var(--timeline-radius)] text-[var(--timeline-link)]',
  'transition-colors hover:text-[var(--timeline-link-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const timelineListClass = 'flex w-full min-w-0 flex-col gap-[var(--timeline-item-gap)]'

export const timelineItemRowClass = cn(
  'flex w-full min-w-0 items-start gap-[var(--timeline-item-gap)]',
)

export const timelineItemHeaderButtonClass = cn(
  timelineItemRowClass,
  'cursor-pointer border-0 bg-transparent p-0 text-left outline-none',
  'rounded-[var(--radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const timelineItemContentClass = 'min-w-0 flex-1'

export const timelineItemActionsClass = 'ml-auto shrink-0'

export const timelineItemTitleRowClass = cn(
  titleClass,
  'flex min-w-0 flex-wrap items-center gap-2',
)

export const timelineItemSeparatorClass = 'text-[var(--timeline-separator)]'

export const timelineItemSubtitleClass = cn(subtitleClass, 'm-0')

export const timelineToggleClass = cn(
  subtitleClass,
  'inline-flex shrink-0 items-center gap-3 text-[var(--timeline-link)]',
  'rounded-[var(--radius-sm)] transition-colors hover:text-[var(--timeline-link-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const timelineToggleIconClass = cn(
  'size-3 shrink-0 transition-transform',
  'duration-[var(--accordion-duration)] [transition-timing-function:var(--accordion-ease)]',
)

export const timelineMotionDuration = 'duration-[var(--accordion-duration)]'
export const timelineMotionEase = '[transition-timing-function:var(--accordion-ease)]'

export const timelineBodyPanelClass = cn(
  'grid overflow-hidden transition-[grid-template-rows]',
  timelineMotionDuration,
  timelineMotionEase,
)

export const timelineBodyClass = cn(
  subtitleClass,
  'flex min-h-[6.5rem] w-full items-center justify-center rounded-[var(--timeline-radius)]',
  'border border-solid border-[var(--timeline-border)] bg-[var(--timeline-body-bg)]',
)

export const timelineIconClass = cn(
  'shrink-0 text-[var(--timeline-icon-glyph)] transition-[width,height]',
  timelineMotionDuration,
  timelineMotionEase,
)

export const timelineIconShellClassBase = cn(
  'inline-flex shrink-0 items-center justify-center rounded-full transition-[width,height]',
  timelineMotionDuration,
  timelineMotionEase,
)

export const timelineIconShellClass: Record<TimelineVariant, string> = {
  'system-action': 'bg-[var(--timeline-icon-system)]',
  escalation: 'bg-[var(--timeline-icon-escalation)]',
  pending: 'bg-[var(--timeline-icon-pending)]',
  blocked: 'bg-[var(--timeline-icon-blocked)]',
  safe: 'bg-[var(--timeline-icon-safe)]',
}

export const timelineHighlightClass: Record<TimelineVariant, string> = {
  'system-action': 'bg-[var(--timeline-highlight-system)]',
  escalation: 'bg-[var(--timeline-highlight-escalation)]',
  pending: 'bg-[var(--timeline-highlight-pending)]',
  blocked: 'bg-[var(--timeline-highlight-blocked)]',
  safe: 'bg-[var(--timeline-highlight-safe)]',
}

export const timelineHoverClass: Record<TimelineVariant, string> = {
  'system-action': 'hover:bg-[var(--timeline-highlight-system)]',
  escalation: 'hover:bg-[var(--timeline-highlight-escalation)]',
  pending: 'hover:bg-[var(--timeline-highlight-pending)]',
  blocked: 'hover:bg-[var(--timeline-highlight-blocked)]',
  safe: 'hover:bg-[var(--timeline-highlight-safe)]',
}

export function timelineItemShellClass({
  variant,
  surface = 'default',
  interactive,
  open,
}: {
  variant: TimelineVariant
  surface?: TimelineItemSurface
  interactive?: boolean
  open: boolean
}) {
  const isHighlight = surface === 'highlight' && !open

  return cn(
    'flex w-full min-w-0 flex-col gap-[var(--timeline-item-gap)] overflow-hidden rounded-[var(--timeline-radius)]',
    'border border-solid p-[var(--timeline-item-padding)] transition-[background-color,border-color]',
    interactive && 'group/timeline-item',
    timelineMotionDuration,
    timelineMotionEase,
    open
      ? 'border-[var(--timeline-border)] bg-[var(--timeline-expanded-bg)]'
      : cn(
          'border-transparent',
          isHighlight
            ? timelineHighlightClass[variant]
            : interactive
              ? timelineHoverClass[variant]
              : undefined,
        ),
  )
}
