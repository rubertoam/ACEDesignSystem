import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceBadgeStatusDotClass,
  aceBadgeStatusLabelClass,
  aceBadgeStatusShellClass,
  aceBadgeTagLabelClass,
  aceBadgeTagShellClass,
  aceBadgeVariantTokens,
  aceBadgeWarningIconClass,
  type AceBadgeAppearance,
  type AceBadgeVariant,
} from './badgeFieldStyles'

export type AceBadgeProps = {
  children: ReactNode
  /**
   * `pill` — rounded status pill with leading dot (screening table).
   * `tag` — squared meta tag (client profile accordion); same color variants as pills.
   */
  appearance?: AceBadgeAppearance
  variant?: AceBadgeVariant
  /** Leading status dot. Defaults to on for `pill`, off for `tag`. */
  showDot?: boolean
  /** Optional leading “!” warning icon (e.g. overdue). Off by default. */
  showWarningIcon?: boolean
  className?: string
}

function OverdueWarningIcon() {
  return (
    <span className={aceBadgeWarningIconClass} aria-hidden>
      !
    </span>
  )
}

export function AceBadge({
  children,
  appearance = 'pill',
  variant = 'purple',
  showDot,
  showWarningIcon = false,
  className,
}: AceBadgeProps) {
  const isTag = appearance === 'tag'
  // `status` kept as a deprecated alias for `pill`
  const tokens = aceBadgeVariantTokens[variant]
  const resolvedShowDot = showDot ?? !isTag

  if (isTag) {
    return (
      <span
        className={cn(aceBadgeTagShellClass, className)}
        style={
          {
            '--ace-badge-tag-border': tokens.border,
            '--ace-badge-tag-surface': tokens.surface,
            '--ace-badge-tag-label': tokens.label,
          } as CSSProperties
        }
      >
        {showWarningIcon ? <OverdueWarningIcon /> : null}
        <span className={aceBadgeTagLabelClass}>{children}</span>
      </span>
    )
  }

  return (
    <span
      className={cn(aceBadgeStatusShellClass, className)}
      style={
        {
          '--ace-status-pill-border': tokens.border,
          '--ace-status-pill-surface': tokens.surface,
          '--ace-status-pill-dot': tokens.dot,
          '--ace-status-pill-label': tokens.label,
        } as CSSProperties
      }
    >
      {resolvedShowDot ? <span className={aceBadgeStatusDotClass} aria-hidden /> : null}
      <span className={aceBadgeStatusLabelClass}>{children}</span>
    </span>
  )
}

/** @deprecated Use `AceBadge`. */
export const AceStatusPill = AceBadge
/** @deprecated Use `AceBadgeProps`. */
export type AceStatusPillProps = AceBadgeProps
