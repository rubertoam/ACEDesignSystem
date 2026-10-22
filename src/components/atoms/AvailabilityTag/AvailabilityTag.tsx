import { cn } from '../../../lib/cn'
import {
  LAB_AVAILABILITY_LABELS,
  type LabAvailabilityStatus,
} from '../../../lib/labAvailability'

const statusSurfaceClass: Record<LabAvailabilityStatus, string> = {
  available:
    'border-[var(--availability-tag-available-border)] bg-[var(--availability-tag-available-bg)] text-[var(--availability-tag-available-text)]',
  'in-progress':
    'border-[var(--availability-tag-in-progress-border)] bg-[var(--availability-tag-in-progress-bg)] text-[var(--availability-tag-in-progress-text)]',
  planned:
    'border-[var(--availability-tag-planned-border)] bg-[var(--availability-tag-planned-bg)] text-[var(--availability-tag-planned-text)]',
}

const sizeClass = {
  sm: cn(
    'px-[var(--spacing-component-padding-padding-sm)] py-[var(--spacing-component-padding-padding-xs)]',
    '[font:var(--ace-type-footer-semi-bold)] [letter-spacing:var(--ace-type-footer-semi-bold-tracking)]',
  ),
  md: cn(
    'px-[var(--spacing-component-padding-padding-sm)] py-[var(--spacing-component-padding-padding-xs)]',
    '[font:var(--ace-type-caption-semi-bold)] [letter-spacing:var(--ace-type-caption-semi-bold-tracking)]',
  ),
} as const

export type AvailabilityTagProps = {
  status: LabAvailabilityStatus
  size?: keyof typeof sizeClass
  className?: string
}

export function AvailabilityTag({ status, size = 'md', className }: AvailabilityTagProps) {
  const label = LAB_AVAILABILITY_LABELS[status]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-[var(--radius-component-badge)] border border-solid whitespace-nowrap',
        statusSurfaceClass[status],
        sizeClass[size],
        className,
      )}
      title={`Product availability: ${label}`}
    >
      {label}
    </span>
  )
}
