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
/** Action token family for default / hover / pressed fills. Disabled always uses colors/action/disabled. */
export type ButtonActionTone = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'warning2'
/** @deprecated Size is typography-driven (label typography + spacing/8 · spacing/12). Kept for API compatibility. */
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonIcon = 'none' | 'left' | 'right'
/** Frozen appearance for documentation grids (no hover/active transitions). */
export type ButtonPreviewState = 'default' | 'hover' | 'active' | 'disabled'

/**
 * Typography token applied to the button label.
 * Drives button height (hug = type line-height + spacing/8 vertical padding).
 * Default matches Figma Buttons: Body/Semi Bold → typography/body/body-main.
 */
export type ButtonTypography = 'body-secondary' | 'body-main'

const ACTION_TONE_FILL: Record<
  ButtonActionTone,
  { fill: string; hover: string; pressed: string }
> = {
  primary: {
    fill: 'var(--color-action-primary)',
    hover: 'var(--color-action-primary-hover)',
    pressed: 'var(--color-action-primary-pressed-subtle)',
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
  warning2: {
    fill: 'var(--color-action-warning-2)',
    hover: 'var(--color-action-warning-2-hover)',
    pressed: 'var(--color-action-warning-2-pressed)',
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

/** Body/Semi Bold — typography/body/body-main (Figma baseline) */
const typeClassByTypography: Record<ButtonTypography, string> = {
  'body-secondary':
    '[font:var(--type-caption-semi-bold)] [letter-spacing:var(--type-caption-semi-bold-tracking)]',
  'body-main':
    '[font:var(--type-body-semi-bold)] [letter-spacing:var(--type-body-semi-bold-tracking)]',
}

/**
 * Figma Button: hug height from label typography + spacing/8 py / spacing/12 px
 * (no fixed sm/md/lg heights). Gap spacing/8; radius/component/button.
 */
const layoutClass = cn(
  'gap-[var(--button-gap)] px-[var(--button-px)] py-[var(--button-py)]',
)

const focusRing =
  'rounded-[var(--button-radius)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-primary)]'

const baseFlex =
  'inline-flex cursor-pointer items-center justify-center border border-solid transition-colors disabled:cursor-not-allowed'

const disabledSolid = cn(
  'border-transparent bg-[var(--button-disabled-primary-bg)] text-[var(--button-disabled-primary-text)]',
)

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
  'bg-[var(--color-surface-primary)] border-[var(--button-fill)] text-[var(--button-label-alt)]',
  'hover:border-transparent hover:text-[var(--button-on-solid)] hover:bg-[var(--button-fill-hover)]',
  'active:border-transparent active:text-[var(--button-on-solid)] active:bg-[var(--button-fill-pressed)]',
  'disabled:border-transparent disabled:bg-[var(--button-disabled-primary-bg)] disabled:text-[var(--button-disabled-primary-text)]',
)

const interactiveTertiary = cn(
  baseFlex,
  focusRing,
  'border-transparent bg-[var(--color-surface-primary)] text-[var(--button-label-alt)]',
  'hover:text-[var(--button-on-solid)] hover:bg-[var(--button-fill-hover)]',
  'active:text-[var(--button-on-solid)] active:bg-[var(--button-fill-pressed)]',
  'disabled:bg-[var(--button-disabled-primary-bg)] disabled:text-[var(--button-disabled-primary-text)]',
)

function lockedPrimary(state: ButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(baseFlex, focusRing, disabledSolid)
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
    return cn(baseFlex, focusRing, disabledSolid)
  }
  if (state === 'default') {
    return cn(
      baseFlex,
      focusRing,
      'bg-[var(--color-surface-primary)] border-[var(--button-fill)] text-[var(--button-label-alt)]',
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

function lockedTertiary(state: ButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(baseFlex, focusRing, disabledSolid)
  }
  if (state === 'default') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--color-surface-primary)] text-[var(--button-label-alt)]',
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
  /** @deprecated Ignored — height hugs `buttonTypography` + spacing/8. */
  size?: ButtonSize
  /**
   * Typography token for the label.
   * Drives button height together with spacing/8 padding. Default: body-main (Figma baseline).
   */
  buttonTypography?: ButtonTypography
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
    size: _size = 'md',
    buttonTypography = 'body-main',
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
  void _size
  const rootClass = cn(
    rootClassName(variant, previewState, disabled),
    layoutClass,
    typeClassByTypography[buttonTypography],
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
      {showLeft ? <span className={cn(aceChevronIconClass, 'scale-x-[-1]')}>{icn}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
      {showRight ? <span className={aceChevronIconClass}>{icn}</span> : null}
    </button>
  )
})
