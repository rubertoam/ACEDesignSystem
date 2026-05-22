import { cn } from '../../../lib/cn'
import {
  LAB_AVAILABILITY_LABELS,
  type LabAvailabilityStatus,
} from '../../../lib/labAvailability'

const statusSurfaceClass: Record<LabAvailabilityStatus, string> = {
  available:
    'border-[var(--ace-availability-available-border)] bg-[var(--ace-availability-available-bg)] text-[var(--ace-availability-available-text)]',
  'in-progress':
    'border-[var(--ace-availability-in-progress-border)] bg-[var(--ace-availability-in-progress-bg)] text-[var(--ace-availability-in-progress-text)]',
  planned:
    'border-[var(--ace-availability-planned-border)] bg-[var(--ace-availability-planned-bg)] text-[var(--ace-availability-planned-text)]',
}

const sizeClass = {
  sm: 'px-2 py-0.5 text-[0.625rem] leading-[1.2]',
  md: 'px-2.5 py-0.5 text-xs leading-[1.3]',
} as const

export type AceAvailabilityTagProps = {
  status: LabAvailabilityStatus
  size?: keyof typeof sizeClass
  className?: string
}

export function AceAvailabilityTag({ status, size = 'md', className }: AceAvailabilityTagProps) {
  const label = LAB_AVAILABILITY_LABELS[status]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border border-solid font-semibold whitespace-nowrap',
        '[font-family:var(--font-screening)]',
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
