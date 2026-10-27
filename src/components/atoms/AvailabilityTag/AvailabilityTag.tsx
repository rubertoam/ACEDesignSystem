import { Badge } from '../Badge/Badge'
import type { BadgeVariant } from '../Badge/badgeFieldStyles'
import {
  LAB_AVAILABILITY_LABELS,
  type LabAvailabilityStatus,
} from '../../../lib/labAvailability'

/** Map lab availability to ACE Badge color variants. */
const statusVariant: Record<LabAvailabilityStatus, BadgeVariant> = {
  available: 'green',
  'in-progress': 'orange',
  planned: 'purple',
}

export type AvailabilityTagProps = {
  status: LabAvailabilityStatus
  /** @deprecated Badge tags use a single size from the design system. */
  size?: 'sm' | 'md'
  className?: string
}

/** Lab availability chip - ACE Badge tag (not a separate visual system). */
export function AvailabilityTag({ status, className }: AvailabilityTagProps) {
  const label = LAB_AVAILABILITY_LABELS[status]
  return (
    <Badge
      appearance="tag"
      variant={statusVariant[status]}
      className={className}
      title={`Product availability: ${label}`}
    >
      {label}
    </Badge>
  )
}
