import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../Accordion/MaterialSymbol'
import {
  DESCRIPTIVE_BUTTON_ICON,
  DESCRIPTIVE_BUTTON_ICON_DISABLED,
} from './descriptiveButtonAssets'
import {
  buttonDescriptiveClass,
  buttonDescriptiveDescriptionClass,
  buttonDescriptiveIconClass,
  buttonDescriptiveIconWrapClass,
  buttonDescriptiveTextClass,
  buttonDescriptiveTitleClass,
  type ButtonDescriptivePreviewState,
} from './descriptiveButtonFieldStyles'

export type ButtonDescriptiveProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Primary label - Caption Bold (Figma ButtonDescriptive). */
  title: string
  /** Supporting copy - Footer Regular (Figma ButtonDescriptive). */
  description: string
  /**
   * Material Symbols ligature from Iconography (e.g. `file_export`).
   * Prefer this over `iconSrc` when a catalog glyph exists.
   */
  iconName?: string
  /** Optional custom icon URL; defaults to the Figma report/export glyph. */
  iconSrc?: string
  /** Frozen appearance for documentation grids (no hover/active transitions). */
  previewState?: ButtonDescriptivePreviewState
}

/**
 * Contextual action tile - Figma ButtonDescriptive 4118:682.
 * One variant with default / hover / clicked / disabled states.
 */
export const ButtonDescriptive = forwardRef<HTMLButtonElement, ButtonDescriptiveProps>(
  function ButtonDescriptive(
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
        className={cn(buttonDescriptiveClass(previewState), className)}
        {...props}
      >
        <span
          className={cn(
            buttonDescriptiveIconWrapClass,
            iconName && 'flex items-center justify-center',
          )}
          aria-hidden
        >
          {iconName ? (
            <MaterialSymbol
              name={iconName}
              size="lg"
              className={cn(
                'text-[var(--color-icon-brand)]',
                isDisabled && 'text-[var(--button-descriptive-disabled-text)]',
              )}
            />
          ) : (
            <img
              src={resolvedIcon}
              alt=""
              width={20}
              height={27}
              className={buttonDescriptiveIconClass}
            />
          )}
        </span>
        <span className={buttonDescriptiveTextClass}>
          <span className={buttonDescriptiveTitleClass}>{title}</span>
          <span className={buttonDescriptiveDescriptionClass}>{description}</span>
        </span>
      </button>
    )
  },
)
