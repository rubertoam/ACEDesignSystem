import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { Button } from '../Button'
import { ProgressSpinner } from './ProgressSpinner'
import {
  progressIndicatorContentClass,
  progressIndicatorLabelClass,
  progressIndicatorLabelToneClass,
  progressIndicatorShellClass,
  progressIndicatorShellToneClass,
  progressIndicatorShellTypeClass,
  progressSpinnerToneClass,
  type ProgressIndicatorTone,
  type ProgressIndicatorType,
} from './progressIndicatorFieldStyles'

export type ProgressIndicatorProps = {
  /** Status copy under the spinner (e.g. “Progress”). */
  label?: ReactNode
  /** `brand` = solid purple (Dark Blue). `surface` = white + brand border. */
  tone?: ProgressIndicatorTone
  /** `action` includes a Cancel control under the label. */
  type?: ProgressIndicatorType
  cancelLabel?: string
  onCancel?: () => void
  className?: string
}

export function ProgressIndicator({
  label = 'Progress',
  tone = 'brand',
  type = 'no-action',
  cancelLabel = 'Cancel',
  onCancel,
  className,
}: ProgressIndicatorProps) {
  const showAction = type === 'action'
  const spinner = (
    <ProgressSpinner className={progressSpinnerToneClass[tone]} />
  )
  const status = (
    <p className={cn(progressIndicatorLabelClass, progressIndicatorLabelToneClass[tone])}>
      {label}
    </p>
  )

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        progressIndicatorShellClass,
        progressIndicatorShellToneClass[tone],
        progressIndicatorShellTypeClass[type],
        className,
      )}
    >
      {showAction ? (
        <div className={progressIndicatorContentClass}>
          {spinner}
          {status}
          <Button type="button" variant="secondary" size="md" onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      ) : (
        <>
          {spinner}
          {status}
        </>
      )}
    </div>
  )
}
