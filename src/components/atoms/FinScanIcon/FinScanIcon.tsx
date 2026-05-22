import { cn } from '../../../lib/cn'
import { FinScanHashMark } from './FinScanHashMark'
import { FinScanWordmark } from './FinScanWordmark'

export type FinScanIconVariant = 'lockup' | 'mark' | 'wordmark'

export type FinScanIconProps = {
  /** lockup = hash mark + wordmark (site header default) */
  variant?: FinScanIconVariant
  /** Height in px; width scales from Figma aspect ratios (24×24 mark, 118×24 wordmark). Default 24. */
  size?: number
  className?: string
  /** Accessible name when the icon is meaningful (e.g. link home). Omit when decorative inside a labeled control. */
  'aria-label'?: string
}

const MARK_ASPECT = 1
const WORDMARK_ASPECT = 118 / 24

export function FinScanIcon({
  variant = 'lockup',
  size = 24,
  className,
  'aria-label': ariaLabel,
}: FinScanIconProps) {
  const markHeight = size
  const markWidth = size * MARK_ASPECT
  const wordmarkHeight = size
  const wordmarkWidth = size * WORDMARK_ASPECT

  const decorative = ariaLabel == null

  if (variant === 'mark') {
    return (
      <FinScanHashMark
        width={markWidth}
        height={markHeight}
        className={className}
        aria-hidden={decorative}
        aria-label={decorative ? undefined : ariaLabel}
        role={decorative ? undefined : 'img'}
      />
    )
  }

  if (variant === 'wordmark') {
    return (
      <FinScanWordmark
        width={wordmarkWidth}
        height={wordmarkHeight}
        className={className}
        aria-hidden={decorative}
        aria-label={decorative ? undefined : ariaLabel}
        role={decorative ? undefined : 'img'}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-[var(--ace-finscan-icon-gap)]',
        className,
      )}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : ariaLabel}
      role={decorative ? undefined : 'img'}
    >
      <FinScanHashMark width={markWidth} height={markHeight} />
      <FinScanWordmark width={wordmarkWidth} height={wordmarkHeight} />
    </span>
  )
}
