import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { aceChevronIconClass } from '../../lib/aceChevron'
import { cn } from '../../lib/cn'
import { MaterialSymbol } from '../molecules/Accordion/MaterialSymbol'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
/** Action token family for default / hover / pressed fills. Disabled always uses disabled-button. */
export type ButtonActionTone = 'primary' | 'secondary' | 'success' | 'error' | 'warning'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonIcon = 'none' | 'left' | 'right'
/** Frozen appearance for documentation grids (no hover/active transitions). */
export type ButtonPreviewState = 'default' | 'hover' | 'active' | 'disabled'

const ACTION_TONE_FILL: Record<
  ButtonActionTone,
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

function actionToneStyle(tone: ButtonActionTone): CSSProperties {
  const t = ACTION_TONE_FILL[tone]
  return {
    '--button-fill': t.fill,
    '--button-fill-hover': t.hover,
    '--button-fill-pressed': t.pressed,
  } as CSSProperties
}

const sizeLayout: Record<ButtonSize, { root: string; iconWrap: string }> = {
  sm: {
    root: cn(
      'px-[var(--button-px-sm)] py-[var(--button-py-sm)] gap-[var(--button-gap-sm)]',
      '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]',
    ),
    iconWrap: aceChevronIconClass,
  },
  md: {
    root: cn(
      'px-[var(--button-px-md)] py-[var(--button-py-md)] gap-[var(--button-gap-md)]',
      '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
    ),
    iconWrap: aceChevronIconClass,
  },
  lg: {
    root: cn(
      'px-[var(--button-px-lg)] py-[var(--button-py-lg)] gap-[var(--button-gap-lg)]',
      '[font:var(--ace-type-paragraph-p2-bold)] [letter-spacing:var(--ace-type-paragraph-p2-bold-tracking)]',
    ),
    iconWrap: aceChevronIconClass,
  },
}

const focusRing =
  'rounded-[var(--button-radius)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)]'

const baseFlex =
  'inline-flex cursor-pointer items-center justify-center border border-solid transition-colors disabled:cursor-not-allowed'

const interactivePrimary = cn(
  baseFlex,
  focusRing,
  'border-transparent text-[var(--button-on-solid)]',
  'bg-[var(--button-fill)] hover:bg-[var(--button-fill-hover)] active:bg-[var(--button-fill-pressed)]',
  'disabled:bg-[var(--button-disabled-primary-bg)] disabled:text-[var(--button-disabled-primary-text)]',
)

const interactiveSecondary = cn(
  baseFlex,
  focusRing,
  'bg-[var(--color-surface-primary)] border-[var(--button-fill)] text-[var(--button-fill)]',
  'hover:border-transparent hover:text-[var(--button-on-solid)] hover:bg-[var(--button-fill-hover)]',
  'active:border-[var(--button-on-solid)] active:text-[var(--button-on-solid)] active:bg-[var(--button-fill-pressed)]',
  'disabled:border-[var(--button-neutral-600)] disabled:bg-[var(--color-surface-primary)] disabled:text-[var(--button-neutral-600)]',
)

const interactiveTertiary = cn(
  baseFlex,
  focusRing,
  'border-transparent bg-transparent text-[var(--button-fill)]',
  'hover:text-[var(--button-on-solid)] hover:bg-[var(--button-fill-hover)]',
  'active:text-[var(--button-on-solid)] active:bg-[var(--button-fill-pressed)]',
  'disabled:bg-[var(--color-surface-primary)] disabled:text-[var(--button-neutral-500)]',
)

function lockedPrimary(state: ButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--button-disabled-primary-bg)] text-[var(--button-disabled-primary-text)]',
    )
  }
  if (state === 'default') {
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--button-fill)] text-[var(--button-on-solid)]')
  }
  if (state === 'hover') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--button-fill-hover)] text-[var(--button-on-solid)]',
    )
  }
  return cn(
    baseFlex,
    focusRing,
    'border-transparent bg-[var(--button-fill-pressed)] text-[var(--button-on-solid)]',
  )
}

function lockedSecondary(state: ButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(
      baseFlex,
      focusRing,
      'bg-[var(--color-surface-primary)] border-[var(--button-neutral-600)] text-[var(--button-neutral-600)]',
    )
  }
  if (state === 'default') {
    return cn(
      baseFlex,
      focusRing,
      'bg-[var(--color-surface-primary)] border-[var(--button-fill)] text-[var(--button-fill)]',
    )
  }
  if (state === 'hover') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--button-fill-hover)] text-[var(--button-on-solid)]',
    )
  }
  return cn(
    baseFlex,
    focusRing,
    'border-[var(--button-on-solid)] bg-[var(--button-fill-pressed)] text-[var(--button-on-solid)]',
  )
}

function lockedTertiary(state: ButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--color-surface-primary)] text-[var(--button-neutral-500)]',
    )
  }
  if (state === 'default') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--color-surface-primary)] text-[var(--button-fill)]',
    )
  }
  if (state === 'hover') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--button-fill-hover)] text-[var(--button-on-solid)]',
    )
  }
  return cn(
    baseFlex,
    focusRing,
    'border-transparent bg-[var(--button-fill-pressed)] text-[var(--button-on-solid)]',
  )
}

function rootClassName(
  variant: ButtonVariant,
  previewState: ButtonPreviewState | undefined,
  disabled: boolean | undefined,
): string {
  const locked = previewState != null || disabled
  const state: ButtonPreviewState = disabled ? 'disabled' : previewState ?? 'default'

  if (!locked) {
    if (variant === 'primary') return interactivePrimary
    if (variant === 'secondary') return interactiveSecondary
    return interactiveTertiary
  }

  if (variant === 'primary') return lockedPrimary(state)
  if (variant === 'secondary') return lockedSecondary(state)
  return lockedTertiary(state)
}

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
  variant?: ButtonVariant
  /** Swaps `--button-fill*` to the matching `--color-action-{tone}*` tokens. */
  actionTone?: ButtonActionTone
  size?: ButtonSize
  icon?: ButtonIcon
  previewState?: ButtonPreviewState
  disabled?: boolean
  children?: ReactNode
}

function Chevron({ className }: { className?: string }) {
  return <MaterialSymbol name="keyboard_arrow_down" size="md" className={cn('text-current', className)} />
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
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
