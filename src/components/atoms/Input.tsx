import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { MaterialSymbol } from '../molecules/Accordion/MaterialSymbol'

/** @deprecated Size is typography-driven (field typography + spacing/8). Kept for API compatibility. */
export type InputSize = 'sm' | 'md' | 'lg'
export type InputIcon = 'none' | 'left' | 'right'
/** Frozen shell for documentation matrices (mirrors Figma default / focus / error / disabled). */
export type InputVisualState = 'default' | 'focus' | 'error' | 'disabled'

/**
 * Typography token applied to the field value/placeholder.
 * This token drives field height (hug = type line-height + spacing/8 padding).
 * Default matches Figma Input Fields: typography/body/body-main.
 */
export type InputFieldTypography = 'body-secondary' | 'body-main'

/**
 * Figma Input Field: hug height from field typography + spacing/8 padding
 * (no fixed sm/md/lg heights). Default type is body-main.
 */
const shellClass = cn(
  'gap-[var(--screening-input-gap)] px-[var(--screening-input-px)] py-[var(--screening-input-px)]',
)

/** Caption/Regular — typography/body/body-secondary */
const labelClass =
  '[font:var(--type-caption-regular)] [letter-spacing:var(--type-caption-regular-tracking)] text-[var(--color-text-primary)]'

/** Value/placeholder type — selected token drives field size with padding */
const fieldTypeClassByTypography: Record<InputFieldTypography, string> = {
  'body-secondary':
    '[font:var(--type-caption-regular)] [letter-spacing:var(--type-caption-regular-tracking)]',
  'body-main':
    '[font:var(--type-body-regular)] [letter-spacing:var(--type-body-regular-tracking)]',
}

/** Footnote/Regular — typography/ui/footnote */
const errorMessageClass =
  '[font:var(--type-footnote-regular)] [letter-spacing:var(--type-footnote-regular-tracking)] text-[var(--input-error-message)]'

const iconClass =
  'shrink-0 text-[length:1.25rem] leading-none text-[var(--input-icon)]'

/** Matches table toolbar / row-action icons: 16px, secondary → primary on hover. */
const clearButtonClass = cn(
  'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--color-text-secondary)] transition-colors duration-150 ease-out',
  'hover:text-[var(--color-text-primary)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)]',
)

function shellFromVisual(visual: InputVisualState): string {
  switch (visual) {
    case 'default':
      return cn(
        'border-[var(--screening-input-border)] bg-[var(--color-surface-primary)]',
      )
    case 'focus':
      return cn(
        'border-[var(--screening-input-border-focus)] bg-[var(--screening-input-bg-focus)]',
      )
    case 'error':
      return cn('border-[var(--input-error-border)] bg-[var(--input-error-bg)]')
    case 'disabled':
      return cn(
        'border-[var(--input-disabled-border)] bg-[var(--input-disabled-bg)]',
      )
  }
}

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** @deprecated Ignored — field height hugs `fieldTypography` + spacing/8. */
  fieldSize?: InputSize
  /**
   * Typography token for value/placeholder text.
   * Drives field height together with spacing/8 padding. Default: body-main (Figma baseline).
   */
  fieldTypography?: InputFieldTypography
  icon?: InputIcon
  label?: ReactNode
  error?: boolean
  errorMessage?: string
  visualState?: InputVisualState
  /** When set, shows a clear (X) control while the field has a value. */
  onClear?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    fieldSize: _fieldSize = 'md',
    fieldTypography = 'body-main',
    icon = 'none',
    label,
    error = false,
    errorMessage = 'Error Message',
    visualState,
    onClear,
    disabled,
    className,
    id: idProp,
    value,
    defaultValue,
    type,
    ...rest
  },
  ref,
) {
  void _fieldSize
  const genId = useId()
  const inputId = idProp ?? genId
  const errId = `${inputId}-error`
  const fieldTypeClass = fieldTypeClassByTypography[fieldTypography]

  const locked = visualState != null
  const showError = (error && !locked) || visualState === 'error'
  const nativeDisabled = !!disabled || visualState === 'disabled'
  const readOnly = locked && visualState !== 'disabled'

  const hasValue =
    value != null
      ? String(value).length > 0
      : defaultValue != null
        ? String(defaultValue).length > 0
        : false
  const showClear = onClear != null && hasValue && !nativeDisabled && !locked

  let shell: string

  if (locked && visualState) {
    shell = shellFromVisual(visualState)
  } else if (nativeDisabled) {
    shell = shellFromVisual('disabled')
  } else if (error) {
    shell = shellFromVisual('error')
  } else {
    shell = cn(
      'border-[var(--screening-input-border)] bg-[var(--color-surface-primary)]',
      'focus-within:border-[var(--screening-input-border-focus)] focus-within:bg-[var(--screening-input-bg-focus)]',
    )
  }

  const shellWrap = cn(
    'flex min-w-0 items-center overflow-hidden rounded-[var(--screening-input-radius)] border border-solid transition-[background-color,border-color] duration-150 ease-out',
    shellClass,
    shell,
    locked ? 'pointer-events-none select-none' : null,
    className,
  )

  const inputClass = cn(
    'min-w-0 flex-1 border-0 bg-transparent p-0 outline-none',
    fieldTypeClass,
    'text-[var(--input-value,var(--color-text-primary))] placeholder:text-[var(--screening-input-placeholder)]',
    nativeDisabled
      ? 'cursor-not-allowed text-[var(--input-disabled-text)] placeholder:text-[var(--input-disabled-text)]'
      : null,
    type === 'search'
      ? '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none'
      : null,
  )

  const showLeft = icon === 'left'
  const showRight = icon === 'right' && !showClear
  const icn = (
    <MaterialSymbol
      name="search"
      size="md"
      className={cn(iconClass, nativeDisabled ? 'text-[var(--input-icon-disabled)]' : null)}
    />
  )

  return (
    <div className="flex w-full max-w-full min-w-0 flex-col gap-[var(--input-label-gap)]">
      {label != null ? (
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
      ) : null}
      <div className={shellWrap}>
        {showLeft ? icn : null}
        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={nativeDisabled}
          readOnly={readOnly}
          tabIndex={locked ? -1 : undefined}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errId : undefined}
          className={inputClass}
          value={value}
          defaultValue={defaultValue}
          {...rest}
        />
        {showClear ? (
          <button
            type="button"
            aria-label="Clear search"
            className={clearButtonClass}
            onClick={onClear}
          >
            <MaterialSymbol name="close" size="md" />
          </button>
        ) : null}
        {showRight ? icn : null}
      </div>
      {showError ? (
        <p id={errId} className={cn('m-0', errorMessageClass)}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
})
