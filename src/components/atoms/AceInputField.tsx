import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { MaterialSymbol } from '../molecules/AceAccordion/MaterialSymbol'

export type AceInputFieldSize = 'sm' | 'md' | 'lg'
export type AceInputFieldIcon = 'none' | 'left' | 'right'
/** Frozen shell for documentation matrices (mirrors Figma default / active / focus / error / disabled). */
export type AceInputVisualState = 'default' | 'active' | 'focus' | 'error' | 'disabled'

const shellSize: Record<AceInputFieldSize, string> = {
  sm: 'h-[var(--ace-input-height-sm)] gap-[var(--screening-input-gap)] px-[var(--screening-input-px)] text-[length:var(--ace-input-font-sm)] leading-[var(--ace-input-leading-sm)]',
  md: 'h-[var(--ace-input-height-md)] gap-[var(--screening-input-gap)] px-[var(--screening-input-px)] text-[length:var(--ace-input-font-md)] leading-[var(--ace-input-leading-md)]',
  lg: 'h-[var(--ace-input-height-lg)] gap-[var(--screening-input-gap)] px-[var(--screening-input-px)] text-[length:var(--ace-input-font-lg)] leading-[var(--ace-input-leading-lg)]',
}

const labelClass: Record<AceInputFieldSize, string> = {
  sm: 'text-xs font-semibold',
  md: 'text-sm font-semibold',
  lg: 'text-sm font-semibold',
}

const iconClass: Record<AceInputFieldSize, string> = {
  sm: 'shrink-0 text-[var(--screening-text-primary)]',
  md: 'shrink-0 text-[var(--screening-text-primary)]',
  lg: 'shrink-0 text-[1.125rem] text-[var(--screening-text-primary)]',
}

/** Matches table toolbar / row-action icons: 16px, secondary → primary on hover. */
const clearButtonClass = cn(
  'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--screening-text-secondary)] transition-colors duration-150 ease-out',
  'hover:text-[var(--screening-text-primary)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

function shellFromVisual(
  visual: AceInputVisualState,
): { shell: string; ring?: boolean } {
  switch (visual) {
    case 'default':
      return {
        shell: cn(
          'border-[var(--screening-input-border)] bg-[var(--color-surface)]',
        ),
      }
    case 'active':
      return {
        shell: cn(
          'border-[var(--screening-input-border-focus)] bg-[var(--color-surface)]',
        ),
      }
    case 'focus':
      return {
        shell: cn(
          'border-[var(--screening-input-border-focus)] bg-[var(--screening-input-bg-focus)]',
        ),
        ring: true,
      }
    case 'error':
      return {
        shell: cn('border-[var(--ace-input-error-border)] bg-[var(--ace-input-error-bg)]'),
      }
    case 'disabled':
      return {
        shell: cn(
          'border-[var(--ace-input-disabled-border)] bg-[var(--ace-input-disabled-bg)]',
        ),
      }
  }
}

export type AceInputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  fieldSize?: AceInputFieldSize
  icon?: AceInputFieldIcon
  label?: ReactNode
  error?: boolean
  errorMessage?: string
  visualState?: AceInputVisualState
  /** When set, shows a clear (X) control while the field has a value. */
  onClear?: () => void
}

export const AceInputField = forwardRef<HTMLInputElement, AceInputFieldProps>(function AceInputField(
  {
    fieldSize = 'md',
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
  const genId = useId()
  const inputId = idProp ?? genId
  const errId = `${inputId}-error`

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
  let ring = false

  if (locked && visualState) {
    const v = shellFromVisual(visualState)
    shell = v.shell
    ring = v.ring ?? false
  } else if (nativeDisabled) {
    shell = shellFromVisual('disabled').shell
  } else if (error) {
    shell = shellFromVisual('error').shell
  } else {
    shell = cn(
      'border-[var(--screening-input-border)] bg-[var(--color-surface)]',
      'focus-within:border-[var(--screening-input-border-focus)] focus-within:bg-[var(--screening-input-bg-focus)] focus-within:shadow-[0_0_0_2px_var(--screening-input-focus-ring)]',
    )
  }

  const shellWrap = cn(
    'flex min-w-0 items-center overflow-hidden rounded-[var(--screening-input-radius)] border border-solid font-[family-name:var(--font-ace-inter)] font-normal transition-[background-color,border-color,box-shadow] duration-150 ease-out',
    shellSize[fieldSize],
    shell,
    ring ? 'shadow-[0_0_0_2px_var(--screening-input-focus-ring)]' : null,
    locked ? 'pointer-events-none select-none' : null,
    className,
  )

  const inputClass = cn(
    'min-w-0 flex-1 border-0 bg-transparent p-0 outline-none',
    'text-[var(--screening-text-primary)] placeholder:text-[var(--screening-input-placeholder)]',
    nativeDisabled ? 'cursor-not-allowed text-[var(--ace-input-disabled-text)] placeholder:text-[var(--ace-input-disabled-text)]' : null,
    type === 'search'
      ? '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none'
      : null,
  )

  const showLeft = icon === 'left'
  const showRight = icon === 'right' && !showClear
  const icn = <MaterialSymbol name="search" size="md" className={iconClass[fieldSize]} />

  return (
    <div className="flex w-full max-w-full min-w-0 flex-col gap-1.5">
      {label != null ? (
        <label htmlFor={inputId} className={cn('text-[var(--screening-text-primary)]', labelClass[fieldSize])}>
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
        <p id={errId} className="m-0 text-[length:var(--ace-input-font-sm)] leading-[var(--ace-input-leading-sm)] text-[var(--ace-input-error-message)]">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
})
