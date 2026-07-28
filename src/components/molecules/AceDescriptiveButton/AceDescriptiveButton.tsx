import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../AceAccordion/MaterialSymbol'
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
  /**
   * Material Symbols ligature from Iconography (e.g. `file_export`).
   * Prefer this over `iconSrc` when a catalog glyph exists.
   */
  iconName?: string
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
      iconName,
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
        <span
          className={cn(
            aceDescriptiveButtonIconWrapClass,
            iconName && 'flex items-center justify-center',
          )}
          aria-hidden
        >
          {iconName ? (
            <MaterialSymbol
              name={iconName}
              size="lg"
              className={cn(
                'text-[var(--screening-primary)]',
                isDisabled && 'text-[var(--ace-descriptive-button-disabled-text)]',
              )}
            />
          ) : (
            <img
              src={resolvedIcon}
              alt=""
              width={20}
              height={27}
              className={aceDescriptiveButtonIconClass}
            />
          )}
        </span>
        <span className={aceDescriptiveButtonTextClass}>
          <span className={aceDescriptiveButtonTitleClass}>{title}</span>
          <span className={aceDescriptiveButtonDescriptionClass}>{description}</span>
        </span>
      </button>
    )
  },
)
