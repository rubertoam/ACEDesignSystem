import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceBadgeDismissButtonClass,
  aceBadgeDismissIconClass,
  aceBadgeVariantClass,
  type AceBadgeVariant,
} from './badgeFieldStyles'

export type AceBadgeProps = {
  children: ReactNode
  variant?: AceBadgeVariant
  /** Called when the dismiss control is activated (dismissible variant only). */
  onDismiss?: () => void
  dismissLabel?: string
  className?: string
}

export function AceBadge({
  children,
  variant = 'active',
  onDismiss,
  dismissLabel = 'Remove badge',
  className,
}: AceBadgeProps) {
  if (variant === 'dismissible') {
    return (
      <span className={cn(aceBadgeVariantClass.dismissible, className)}>
        <span className="min-w-0 truncate">{children}</span>
        <button
          type="button"
          className={aceBadgeDismissButtonClass}
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <X className={aceBadgeDismissIconClass} strokeWidth={2} aria-hidden />
        </button>
      </span>
    )
  }

  return (
    <span className={cn(aceBadgeVariantClass[variant], className)}>
      <span className="min-w-0 truncate">{children}</span>
    </span>
  )
}
