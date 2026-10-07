import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { AceButton } from '../AceButton'
import { AceProgressSpinner } from './AceProgressSpinner'
import {
  aceProgressIndicatorContentClass,
  aceProgressIndicatorLabelClass,
  aceProgressIndicatorLabelToneClass,
  aceProgressIndicatorShellClass,
  aceProgressIndicatorShellToneClass,
  aceProgressIndicatorShellTypeClass,
  aceProgressSpinnerToneClass,
  type AceProgressIndicatorTone,
  type AceProgressIndicatorType,
} from './progressIndicatorFieldStyles'

export type AceProgressIndicatorProps = {
  /** Status copy under the spinner (e.g. “Progress”). */
  label?: ReactNode
  /** `brand` = solid purple (Dark Blue). `surface` = white + brand border. */
  tone?: AceProgressIndicatorTone
  /** `action` includes a Cancel control under the label. */
  type?: AceProgressIndicatorType
  cancelLabel?: string
  onCancel?: () => void
  className?: string
}

export function AceProgressIndicator({
  label = 'Progress',
  tone = 'brand',
  type = 'no-action',
  cancelLabel = 'Cancel',
  onCancel,
  className,
}: AceProgressIndicatorProps) {
  const showAction = type === 'action'
  const spinner = (
    <AceProgressSpinner className={aceProgressSpinnerToneClass[tone]} />
  )
  const status = (
    <p className={cn(aceProgressIndicatorLabelClass, aceProgressIndicatorLabelToneClass[tone])}>
      {label}
    </p>
  )

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        aceProgressIndicatorShellClass,
        aceProgressIndicatorShellToneClass[tone],
        aceProgressIndicatorShellTypeClass[type],
        className,
      )}
    >
      {showAction ? (
        <div className={aceProgressIndicatorContentClass}>
          {spinner}
          {status}
          <AceButton type="button" variant="secondary" size="md" onClick={onCancel}>
            {cancelLabel}
          </AceButton>
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
