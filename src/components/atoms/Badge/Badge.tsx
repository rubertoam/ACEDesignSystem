import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  badgeStatusDotClass,
  badgeStatusLabelClass,
  badgeStatusShellClass,
  badgeTagLabelClass,
  badgeTagShellClass,
  badgeVariantTokens,
  badgeWarningIconClass,
  type BadgeAppearance,
  type BadgeVariant,
} from './badgeFieldStyles'

export type BadgeProps = {
  children: ReactNode
  /**
   * `pill` - rounded status pill with leading dot (screening table).
   * `tag` - squared meta tag (client profile accordion); same color variants as pills.
   */
  appearance?: BadgeAppearance
  variant?: BadgeVariant
  /** Leading status dot. Defaults to on for `pill`, off for `tag`. */
  showDot?: boolean
  /** Optional leading “!” warning icon (e.g. overdue). Off by default. */
  showWarningIcon?: boolean
  /**
   * Optional leading content before the label (e.g. record-type icon).
   * Uses the same shell gap as `showWarningIcon`. Ignored when `showWarningIcon` is on.
   */
  leading?: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'className' | 'color'>

function OverdueWarningIcon() {
  return (
    <span className={badgeWarningIconClass} aria-hidden>
      !
    </span>
  )
}

export function Badge({
  children,
  appearance = 'pill',
  variant = 'purple',
  showDot,
  showWarningIcon = false,
  leading,
  className,
  style,
  ...rest
}: BadgeProps) {
  const isTag = appearance === 'tag'
  // `status` kept as a deprecated alias for `pill`
  const tokens = badgeVariantTokens[variant]
  const resolvedShowDot = showDot ?? !isTag
  const leadingContent = showWarningIcon ? <OverdueWarningIcon /> : leading

  if (isTag) {
    return (
      <span
        {...rest}
        className={cn(badgeTagShellClass, className)}
        style={
          {
            '--badge-tag-border': tokens.border,
            '--badge-tag-surface': tokens.surface,
            '--badge-tag-label': tokens.label,
            ...style,
          } as CSSProperties
        }
      >
        {leadingContent}
        <span className={badgeTagLabelClass}>{children}</span>
      </span>
    )
  }

  return (
    <span
      {...rest}
      className={cn(badgeStatusShellClass, className)}
      style={
        {
          '--badge-border': tokens.border,
          '--badge-surface': tokens.surface,
          '--badge-dot': tokens.dot,
          '--badge-label': tokens.label,
          ...style,
        } as CSSProperties
      }
    >
      {resolvedShowDot ? <span className={badgeStatusDotClass} aria-hidden /> : null}
      <span className={badgeStatusLabelClass}>{children}</span>
    </span>
  )
}
