import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { aceChevronIconClass } from '../../lib/aceChevron'
import { cn } from '../../lib/cn'
import { MaterialSymbol } from '../molecules/AceAccordion/MaterialSymbol'

export type AceButtonVariant = 'primary' | 'secondary' | 'tertiary'
/** Action token family for default / hover / pressed fills. Disabled always uses disabled-button. */
export type AceButtonActionTone = 'primary' | 'secondary' | 'success' | 'error' | 'warning'
export type AceButtonSize = 'sm' | 'md' | 'lg'
export type AceButtonIcon = 'none' | 'left' | 'right'
/** Frozen appearance for documentation grids (no hover/active transitions). */
export type AceButtonPreviewState = 'default' | 'hover' | 'active' | 'disabled'

const ACTION_TONE_FILL: Record<
  AceButtonActionTone,
  { fill: string; hover: string; pressed: string }
> = {
  primary: {
    fill: 'var(--color-action-primary)',
    hover: 'var(--color-action-primary-hover)',
    pressed: 'var(--color-action-primary-pressed)',
  },
  secondary: {
    fill: 'var(--color-action-secondary)',
    hover: 'var(--color-action-secondary-hover)',
    pressed: 'var(--color-action-secondary-pressed)',
  },
  success: {
    fill: 'var(--color-action-success)',
    hover: 'var(--color-action-success-hover)',
    pressed: 'var(--color-action-success-pressed)',
  },
  error: {
    fill: 'var(--color-action-error)',
    hover: 'var(--color-action-error-hover)',
    pressed: 'var(--color-action-error-pressed)',
  },
  warning: {
    fill: 'var(--color-action-warning)',
    hover: 'var(--color-action-warning-hover)',
    pressed: 'var(--color-action-warning-pressed)',
  },
}

function actionToneStyle(tone: AceButtonActionTone): CSSProperties {
  const t = ACTION_TONE_FILL[tone]
  return {
    '--ace-button-fill': t.fill,
    '--ace-button-fill-hover': t.hover,
    '--ace-button-fill-pressed': t.pressed,
  } as CSSProperties
}

const sizeLayout: Record<AceButtonSize, { root: string; iconWrap: string }> = {
  sm: {
    root: cn(
      'px-[var(--ace-button-px-sm)] py-[var(--ace-button-py-sm)] gap-[var(--ace-button-gap-sm)]',
      '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]',
    ),
    iconWrap: aceChevronIconClass,
  },
  md: {
    root: cn(
      'px-[var(--ace-button-px-md)] py-[var(--ace-button-py-md)] gap-[var(--ace-button-gap-md)]',
      '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
    ),
    iconWrap: aceChevronIconClass,
  },
  lg: {
    root: cn(
      'px-[var(--ace-button-px-lg)] py-[var(--ace-button-py-lg)] gap-[var(--ace-button-gap-lg)]',
      '[font:var(--ace-type-paragraph-p2-bold)] [letter-spacing:var(--ace-type-paragraph-p2-bold-tracking)]',
    ),
    iconWrap: aceChevronIconClass,
  },
}

const focusRing =
  'rounded-[var(--ace-button-radius)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ace-button-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)]'

const baseFlex =
  'inline-flex cursor-pointer items-center justify-center border border-solid leading-[1.65] transition-colors disabled:cursor-not-allowed'

const interactivePrimary = cn(
  baseFlex,
  focusRing,
  'border-transparent text-[var(--ace-button-on-solid)]',
  'bg-[var(--ace-button-fill)] hover:bg-[var(--ace-button-fill-hover)] active:bg-[var(--ace-button-fill-pressed)]',
  'disabled:bg-[var(--ace-button-disabled-primary-bg)] disabled:text-[var(--ace-button-disabled-primary-text)]',
)

const interactiveSecondary = cn(
  baseFlex,
  focusRing,
  'bg-[var(--color-surface-primary)] border-[var(--ace-button-fill)] text-[var(--ace-button-fill)]',
  'hover:border-transparent hover:text-[var(--ace-button-on-solid)] hover:bg-[var(--ace-button-fill-hover)]',
  'active:border-[var(--ace-button-on-solid)] active:text-[var(--ace-button-on-solid)] active:bg-[var(--ace-button-fill-pressed)]',
  'disabled:border-[var(--ace-button-neutral-600)] disabled:bg-[var(--color-surface-primary)] disabled:text-[var(--ace-button-neutral-600)]',
)

const interactiveTertiary = cn(
  baseFlex,
  focusRing,
  'border-transparent bg-transparent text-[var(--ace-button-fill)]',
  'hover:text-[var(--ace-button-on-solid)] hover:bg-[var(--ace-button-fill-hover)]',
  'active:text-[var(--ace-button-on-solid)] active:bg-[var(--ace-button-fill-pressed)]',
  'disabled:bg-[var(--color-surface-primary)] disabled:text-[var(--ace-button-neutral-500)]',
)

function lockedPrimary(state: AceButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--ace-button-disabled-primary-bg)] text-[var(--ace-button-disabled-primary-text)]',
    )
  }
  if (state === 'default') {
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-fill)] text-[var(--ace-button-on-solid)]')
  }
  if (state === 'hover') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--ace-button-fill-hover)] text-[var(--ace-button-on-solid)]',
    )
  }
  return cn(
    baseFlex,
    focusRing,
    'border-transparent bg-[var(--ace-button-fill-pressed)] text-[var(--ace-button-on-solid)]',
  )
}

function lockedSecondary(state: AceButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(
      baseFlex,
      focusRing,
      'bg-[var(--color-surface-primary)] border-[var(--ace-button-neutral-600)] text-[var(--ace-button-neutral-600)]',
    )
  }
  if (state === 'default') {
    return cn(
      baseFlex,
      focusRing,
      'bg-[var(--color-surface-primary)] border-[var(--ace-button-fill)] text-[var(--ace-button-fill)]',
    )
  }
  if (state === 'hover') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--ace-button-fill-hover)] text-[var(--ace-button-on-solid)]',
    )
  }
  return cn(
    baseFlex,
    focusRing,
    'border-[var(--ace-button-on-solid)] bg-[var(--ace-button-fill-pressed)] text-[var(--ace-button-on-solid)]',
  )
}

function lockedTertiary(state: AceButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--color-surface-primary)] text-[var(--ace-button-neutral-500)]',
    )
  }
  if (state === 'default') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--color-surface-primary)] text-[var(--ace-button-fill)]',
    )
  }
  if (state === 'hover') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--ace-button-fill-hover)] text-[var(--ace-button-on-solid)]',
    )
  }
  return cn(
    baseFlex,
    focusRing,
    'border-transparent bg-[var(--ace-button-fill-pressed)] text-[var(--ace-button-on-solid)]',
  )
}

function rootClassName(
  variant: AceButtonVariant,
  previewState: AceButtonPreviewState | undefined,
  disabled: boolean | undefined,
): string {
  const locked = previewState != null || disabled
  const state: AceButtonPreviewState = disabled ? 'disabled' : previewState ?? 'default'

  if (!locked) {
    if (variant === 'primary') return interactivePrimary
    if (variant === 'secondary') return interactiveSecondary
    return interactiveTertiary
  }

  if (variant === 'primary') return lockedPrimary(state)
  if (variant === 'secondary') return lockedSecondary(state)
  return lockedTertiary(state)
}

export type AceButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
  variant?: AceButtonVariant
  /** Swaps `--ace-button-fill*` to the matching `--color-action-{tone}*` tokens. */
  actionTone?: AceButtonActionTone
  size?: AceButtonSize
  icon?: AceButtonIcon
  previewState?: AceButtonPreviewState
  disabled?: boolean
  children?: ReactNode
}

function Chevron({ className }: { className?: string }) {
  return <MaterialSymbol name="keyboard_arrow_down" size="md" className={cn('text-current', className)} />
}

export const AceButton = forwardRef<HTMLButtonElement, AceButtonProps>(function AceButton(
  {
    variant = 'primary',
    actionTone = 'primary',
    size = 'md',
    icon = 'none',
    previewState,
    disabled,
    className,
    children,
    type = 'button',
    style,
    ...rest
  },
  ref,
) {
  const rootClass = cn(
    rootClassName(variant, previewState, disabled),
    sizeLayout[size].root,
    previewState != null ? 'pointer-events-none select-none' : null,
    className,
  )

  const showLeft = icon === 'left'
  const showRight = icon === 'right'
  const icn = <Chevron />

  return (
    <button
      ref={ref}
      type={type}
      disabled={!!disabled && previewState == null}
      tabIndex={previewState != null ? -1 : undefined}
      className={rootClass}
      style={{ ...actionToneStyle(actionTone), ...style }}
      {...rest}
    >
      {showLeft ? <span className={cn(sizeLayout[size].iconWrap, 'scale-x-[-1]')}>{icn}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
      {showRight ? <span className={sizeLayout[size].iconWrap}>{icn}</span> : null}
    </button>
  )
})
