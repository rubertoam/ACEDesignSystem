import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'
import {
  DESCRIPTIVE_BUTTON_ICON,
  DESCRIPTIVE_BUTTON_ICON_DISABLED,
} from './descriptiveButtonAssets'
import {
  aceDescriptiveButtonClass,
  aceDescriptiveButtonDescriptionClass,
  aceDescriptiveButtonIconClass,
  aceDescriptiveButtonIconWrapClass,
  aceDescriptiveButtonTextClass,
  aceDescriptiveButtonTitleClass,
  type AceDescriptiveButtonPreviewState,
} from './descriptiveButtonFieldStyles'

export type AceDescriptiveButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Primary label — Caption Semi Bold (Figma). */
  title: string
  /** Supporting copy — Footer Regular (Figma). */
  description: string
  /** Optional custom icon URL; defaults to the Figma report/export glyph. */
  iconSrc?: string
  /** Frozen appearance for documentation grids (no hover/active transitions). */
  previewState?: AceDescriptiveButtonPreviewState
}

/**
 * Contextual action tile — Figma ButtonDescriptive 4118:682.
 * One variant with default / hover / clicked / disabled states.
 */
export const AceDescriptiveButton = forwardRef<HTMLButtonElement, AceDescriptiveButtonProps>(
  function AceDescriptiveButton(
    {
      title,
      description,
      iconSrc,
      previewState,
      disabled,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const isDisabled = Boolean(disabled) || previewState === 'disabled'
    const resolvedIcon =
      iconSrc ?? (isDisabled ? DESCRIPTIVE_BUTTON_ICON_DISABLED : DESCRIPTIVE_BUTTON_ICON)

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(aceDescriptiveButtonClass(previewState), className)}
        {...props}
      >
        <span className={aceDescriptiveButtonIconWrapClass} aria-hidden>
          <img
            src={resolvedIcon}
            alt=""
            width={20}
            height={27}
            className={aceDescriptiveButtonIconClass}
          />
        </span>
        <span className={aceDescriptiveButtonTextClass}>
          <span className={aceDescriptiveButtonTitleClass}>{title}</span>
          <span className={aceDescriptiveButtonDescriptionClass}>{description}</span>
        </span>
      </button>
    )
  },
)
