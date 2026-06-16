import { cn } from '../../../lib/cn'

export type AceTimelineVariant =
  | 'system-action'
  | 'escalation'
  | 'pending'
  | 'blocked'
  | 'safe'

export type AceTimelineSort = 'past-to-present' | 'present-to-past'

export type AceTimelineItemSurface = 'default' | 'highlight' | 'expanded'

const titleClass =
  '[font:var(--ace-type-paragraph-p2-regular)] [letter-spacing:var(--ace-type-paragraph-p2-regular-tracking)] text-[var(--ace-timeline-title)]'

const subtitleClass =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--ace-timeline-subtitle)]'

export const aceTimelineShellClass = cn(
  'flex w-full min-w-0 flex-col gap-[var(--ace-timeline-section-gap)]',
  'rounded-[var(--ace-timeline-radius)] border border-solid border-[var(--ace-timeline-border)]',
  'bg-[var(--ace-timeline-surface)] p-[var(--ace-timeline-padding)]',
)

export const aceTimelineHeaderClass = 'flex w-full items-center justify-between gap-4'

export const aceTimelineSortTriggerClass =
  'w-[var(--ace-timeline-sort-width)] shrink-0 [font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]'

export const aceTimelineExpandAllClass = cn(
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'rounded-[var(--ace-timeline-radius)] text-[var(--ace-timeline-link)]',
  'transition-colors hover:text-[var(--ace-timeline-link-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceTimelineListClass = 'flex w-full min-w-0 flex-col gap-[var(--ace-timeline-item-gap)]'

export const aceTimelineItemRowClass = cn(
  'flex w-full min-w-0 items-start gap-[var(--ace-timeline-item-gap)]',
)

export const aceTimelineItemHeaderButtonClass = cn(
  aceTimelineItemRowClass,
  'cursor-pointer border-0 bg-transparent p-0 text-left outline-none',
  'rounded-[var(--radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceTimelineItemContentClass = 'min-w-0 flex-1'

export const aceTimelineItemActionsClass = 'ml-auto shrink-0'

export const aceTimelineItemTitleRowClass = cn(
  titleClass,
  'flex min-w-0 flex-wrap items-center gap-2',
)

export const aceTimelineItemSeparatorClass = 'text-[var(--ace-timeline-separator)]'

export const aceTimelineItemSubtitleClass = cn(subtitleClass, 'm-0')

export const aceTimelineToggleClass = cn(
  subtitleClass,
  'inline-flex shrink-0 items-center gap-3 text-[var(--ace-timeline-link)]',
  'rounded-[var(--radius-sm)] transition-colors hover:text-[var(--ace-timeline-link-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export const aceTimelineToggleIconClass = cn(
  'size-3 shrink-0 transition-transform',
  'duration-[var(--ace-accordion-duration)] [transition-timing-function:var(--ace-accordion-ease)]',
)

export const aceTimelineMotionDuration = 'duration-[var(--ace-accordion-duration)]'
export const aceTimelineMotionEase = '[transition-timing-function:var(--ace-accordion-ease)]'

export const aceTimelineBodyPanelClass = cn(
  'grid overflow-hidden transition-[grid-template-rows]',
  aceTimelineMotionDuration,
  aceTimelineMotionEase,
)

export const aceTimelineBodyClass = cn(
  subtitleClass,
  'flex min-h-[6.5rem] w-full items-center justify-center rounded-[var(--ace-timeline-radius)]',
  'border border-solid border-[var(--ace-timeline-border)] bg-[var(--ace-timeline-body-bg)]',
)

export const aceTimelineIconClass = cn(
  'shrink-0 text-[var(--ace-timeline-icon-glyph)] transition-[width,height]',
  aceTimelineMotionDuration,
  aceTimelineMotionEase,
)

export const aceTimelineIconShellClassBase = cn(
  'inline-flex shrink-0 items-center justify-center rounded-full transition-[width,height]',
  aceTimelineMotionDuration,
  aceTimelineMotionEase,
)

export const aceTimelineIconShellClass: Record<AceTimelineVariant, string> = {
  'system-action': 'bg-[var(--ace-timeline-icon-system)]',
  escalation: 'bg-[var(--ace-timeline-icon-escalation)]',
  pending: 'bg-[var(--ace-timeline-icon-pending)]',
  blocked: 'bg-[var(--ace-timeline-icon-blocked)]',
  safe: 'bg-[var(--ace-timeline-icon-safe)]',
}

export const aceTimelineHighlightClass: Record<AceTimelineVariant, string> = {
  'system-action': 'bg-[var(--ace-timeline-highlight-system)]',
  escalation: 'bg-[var(--ace-timeline-highlight-escalation)]',
  pending: 'bg-[var(--ace-timeline-highlight-pending)]',
  blocked: 'bg-[var(--ace-timeline-highlight-blocked)]',
  safe: 'bg-[var(--ace-timeline-highlight-safe)]',
}

export const aceTimelineHoverClass: Record<AceTimelineVariant, string> = {
  'system-action': 'hover:bg-[var(--ace-timeline-highlight-system)]',
  escalation: 'hover:bg-[var(--ace-timeline-highlight-escalation)]',
  pending: 'hover:bg-[var(--ace-timeline-highlight-pending)]',
  blocked: 'hover:bg-[var(--ace-timeline-highlight-blocked)]',
  safe: 'hover:bg-[var(--ace-timeline-highlight-safe)]',
}

export function aceTimelineItemShellClass({
  variant,
  surface = 'default',
  interactive,
  open,
}: {
  variant: AceTimelineVariant
  surface?: AceTimelineItemSurface
  interactive?: boolean
  open: boolean
}) {
  const isHighlight = surface === 'highlight' && !open

  return cn(
    'flex w-full min-w-0 flex-col gap-[var(--ace-timeline-item-gap)] overflow-hidden rounded-[var(--ace-timeline-radius)]',
    'border border-solid p-[var(--ace-timeline-item-padding)] transition-[background-color,border-color]',
    interactive && 'group/timeline-item',
    aceTimelineMotionDuration,
    aceTimelineMotionEase,
    open
      ? 'border-[var(--ace-timeline-border)] bg-[var(--ace-timeline-expanded-bg)]'
      : cn(
          'border-transparent',
          isHighlight
            ? aceTimelineHighlightClass[variant]
            : interactive
              ? aceTimelineHoverClass[variant]
              : undefined,
        ),
  )
}
