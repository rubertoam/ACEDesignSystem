import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceStatusPillDotClass,
  aceStatusPillLabelClass,
  aceStatusPillShellClass,
  aceStatusPillVariantTokens,
  type AceStatusPillVariant,
} from './statusPillFieldStyles'

export type AceStatusPillProps = {
  children: ReactNode
  variant?: AceStatusPillVariant
  /** Leading status dot (on by default; matches Review Assigned screening table). */
  showDot?: boolean
  className?: string
}

export function AceStatusPill({
  children,
  variant = 'purple',
  showDot = true,
  className,
}: AceStatusPillProps) {
  const tokens = aceStatusPillVariantTokens[variant]

  return (
    <span
      className={cn(aceStatusPillShellClass(), className)}
      style={
        {
          '--ace-status-pill-border': tokens.border,
          '--ace-status-pill-surface': tokens.surface,
          '--ace-status-pill-dot': tokens.dot,
          '--ace-status-pill-label': tokens.label,
        } as CSSProperties
      }
    >
      {showDot ? <span className={aceStatusPillDotClass} aria-hidden /> : null}
      <span className={aceStatusPillLabelClass}>{children}</span>
    </span>
  )
}
