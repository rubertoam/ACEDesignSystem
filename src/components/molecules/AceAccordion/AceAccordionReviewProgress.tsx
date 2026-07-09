import { cn } from '../../../lib/cn'

export type AceAccordionReviewProgressProps = {
  reviewed: number
  total: number
  className?: string
  /** Prevents accordion toggle when interacting with the progress cluster. */
  stopPropagation?: boolean
}

export function AceAccordionReviewProgress({
  reviewed,
  total,
  className,
  stopPropagation = true,
}: AceAccordionReviewProgressProps) {
  const progress = total === 0 ? 0 : (reviewed / total) * 100

  return (
    <div
      className={cn('flex shrink-0 items-center gap-[var(--space-3)]', className)}
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      onKeyDown={stopPropagation ? (e) => e.stopPropagation() : undefined}
    >
      <span
        className={cn(
          'hidden whitespace-nowrap text-[var(--screening-text-secondary)] sm:inline',
          '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]',
        )}
      >
        {reviewed} of {total} Reviewed
      </span>
      <div
        className="h-[var(--screening-progress-height)] w-[var(--screening-progress-width)] overflow-hidden rounded-full border border-[var(--screening-border-soft)] bg-[var(--screening-progress-track)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={reviewed}
        aria-label={`Review progress: ${reviewed} of ${total} reviewed`}
      >
        <div
          className="h-full rounded-full bg-[var(--screening-progress-fill)] transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
