import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { aceChevronIconClass } from '../../lib/aceChevron'
import { cn } from '../../lib/cn'
import { MaterialSymbol } from '../molecules/AceAccordion/MaterialSymbol'

export type AceButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type AceButtonPalette = 'purple' | 'blue'
export type AceButtonSize = 'sm' | 'md' | 'lg'
export type AceButtonIcon = 'none' | 'left' | 'right'
/** Frozen appearance for documentation grids (no hover/active transitions). */
export type AceButtonPreviewState = 'default' | 'hover' | 'active' | 'disabled'

const sizeLayout: Record<AceButtonSize, { root: string; iconWrap: string }> = {
  sm: {
    root: 'px-[var(--ace-button-px-sm)] py-[var(--ace-button-py-sm)] gap-[var(--ace-button-gap-sm)] text-xs',
    iconWrap: aceChevronIconClass,
  },
  md: {
    root: 'px-[var(--ace-button-px-md)] py-[var(--ace-button-py-md)] gap-[var(--ace-button-gap-md)] text-sm',
    iconWrap: aceChevronIconClass,
  },
  lg: {
    root: 'px-[var(--ace-button-px-lg)] py-[var(--ace-button-py-lg)] gap-[var(--ace-button-gap-lg)] text-base',
    iconWrap: aceChevronIconClass,
  },
}

const focusRing =
  'rounded-[var(--ace-button-radius)] font-[family-name:var(--font-screening)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ace-button-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]'

const baseFlex =
  'inline-flex cursor-pointer items-center justify-center border border-solid font-bold leading-[1.65] transition-colors disabled:cursor-not-allowed'

function Chevron({ className }: { className?: string }) {
  return <MaterialSymbol name="keyboard_arrow_down" size="md" className={cn('text-current', className)} />
}

function interactivePrimary(palette: AceButtonPalette): string {
  const bg =
    palette === 'purple'
      ? 'bg-[var(--ace-button-purple-500)] hover:bg-[var(--ace-button-purple-700)] active:bg-[var(--ace-button-purple-400)]'
      : 'bg-[var(--ace-button-blue-500)] hover:bg-[var(--ace-button-blue-700)] active:bg-[var(--ace-button-blue-400)]'
  return cn(baseFlex, focusRing, 'border-transparent text-[var(--ace-button-on-solid)]', bg, disabledPrimary)
}

function interactiveSecondary(palette: AceButtonPalette): string {
  const line =
    palette === 'purple'
      ? 'border-[var(--ace-button-purple-500)] text-[var(--ace-button-purple-500)]'
      : 'border-[var(--ace-button-blue-500)] text-[var(--ace-button-blue-500)]'
  const hoverBg =
    palette === 'purple'
      ? 'hover:bg-[var(--ace-button-purple-700)]'
      : 'hover:bg-[var(--ace-button-blue-700)]'
  const activeBg =
    palette === 'purple'
      ? 'active:bg-[var(--ace-button-purple-400)]'
      : 'active:bg-[var(--ace-button-blue-400)]'
  return cn(
    baseFlex,
    focusRing,
    'bg-[var(--color-surface)]',
    line,
    'hover:border-transparent hover:text-[var(--ace-button-on-solid)]',
    hoverBg,
    'active:border-[var(--ace-button-on-solid)] active:text-[var(--ace-button-on-solid)]',
    activeBg,
    disabledSecondary,
  )
}

function interactiveTertiary(palette: AceButtonPalette): string {
  const text =
    palette === 'purple' ? 'text-[var(--ace-button-purple-500)]' : 'text-[var(--ace-button-blue-500)]'
  const hoverBg =
    palette === 'purple'
      ? 'hover:bg-[var(--ace-button-purple-700)]'
      : 'hover:bg-[var(--ace-button-blue-700)]'
  const activeBg =
    palette === 'purple'
      ? 'active:bg-[var(--ace-button-purple-400)]'
      : 'active:bg-[var(--ace-button-blue-400)]'
  return cn(
    baseFlex,
    focusRing,
    'border-transparent bg-transparent',
    text,
    'hover:text-[var(--ace-button-on-solid)]',
    hoverBg,
    'active:text-[var(--ace-button-on-solid)]',
    activeBg,
    disabledTertiary,
  )
}

const disabledPrimary =
  'disabled:bg-[var(--ace-button-disabled-primary-bg)] disabled:text-[var(--ace-button-disabled-primary-text)]'
const disabledSecondary =
  'disabled:border-[var(--ace-button-neutral-600)] disabled:bg-[var(--color-surface)] disabled:text-[var(--ace-button-neutral-600)]'
const disabledTertiary =
  'disabled:bg-[var(--color-surface)] disabled:text-[var(--ace-button-neutral-500)]'

function lockedPrimary(palette: AceButtonPalette, state: AceButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(
      baseFlex,
      focusRing,
      'border-transparent bg-[var(--ace-button-disabled-primary-bg)] text-[var(--ace-button-disabled-primary-text)]',
    )
  }
  if (palette === 'purple') {
    if (state === 'default') {
      return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-purple-500)] text-[var(--ace-button-on-solid)]')
    }
    if (state === 'hover') {
      return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-purple-700)] text-[var(--ace-button-on-solid)]')
    }
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-purple-400)] text-[var(--ace-button-on-solid)]')
  }
  if (state === 'default') {
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-blue-500)] text-[var(--ace-button-on-solid)]')
  }
  if (state === 'hover') {
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-blue-700)] text-[var(--ace-button-on-solid)]')
  }
  return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-blue-400)] text-[var(--ace-button-on-solid)]')
}

function lockedSecondary(palette: AceButtonPalette, state: AceButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(
      baseFlex,
      focusRing,
      'bg-[var(--color-surface)] border-[var(--ace-button-neutral-600)] text-[var(--ace-button-neutral-600)]',
    )
  }
  if (palette === 'purple') {
    if (state === 'default') {
      return cn(
        baseFlex,
        focusRing,
        'bg-[var(--color-surface)] border-[var(--ace-button-purple-500)] text-[var(--ace-button-purple-500)]',
      )
    }
    if (state === 'hover') {
      return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-purple-700)] text-[var(--ace-button-on-solid)]')
    }
    return cn(
      baseFlex,
      focusRing,
      'border-[var(--ace-button-on-solid)] bg-[var(--ace-button-purple-400)] text-[var(--ace-button-on-solid)]',
    )
  }
  if (state === 'default') {
    return cn(
      baseFlex,
      focusRing,
      'bg-[var(--color-surface)] border-[var(--ace-button-blue-500)] text-[var(--ace-button-blue-500)]',
    )
  }
  if (state === 'hover') {
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-blue-700)] text-[var(--ace-button-on-solid)]')
  }
  return cn(
    baseFlex,
    focusRing,
    'border-[var(--ace-button-on-solid)] bg-[var(--ace-button-blue-400)] text-[var(--ace-button-on-solid)]',
  )
}

function lockedTertiary(palette: AceButtonPalette, state: AceButtonPreviewState): string {
  if (state === 'disabled') {
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--color-surface)] text-[var(--ace-button-neutral-500)]')
  }
  if (palette === 'purple') {
    if (state === 'default') {
      return cn(baseFlex, focusRing, 'border-transparent bg-[var(--color-surface)] text-[var(--ace-button-purple-500)]')
    }
    if (state === 'hover') {
      return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-purple-700)] text-[var(--ace-button-on-solid)]')
    }
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-purple-400)] text-[var(--ace-button-on-solid)]')
  }
  if (state === 'default') {
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--color-surface)] text-[var(--ace-button-blue-500)]')
  }
  if (state === 'hover') {
    return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-blue-700)] text-[var(--ace-button-on-solid)]')
  }
  return cn(baseFlex, focusRing, 'border-transparent bg-[var(--ace-button-blue-400)] text-[var(--ace-button-on-solid)]')
}

function rootClassName(
  variant: AceButtonVariant,
  palette: AceButtonPalette,
  previewState: AceButtonPreviewState | undefined,
  disabled: boolean | undefined,
): string {
  const locked = previewState != null || disabled
  const state: AceButtonPreviewState = disabled ? 'disabled' : previewState ?? 'default'

  if (!locked) {
    if (variant === 'primary') return interactivePrimary(palette)
    if (variant === 'secondary') return interactiveSecondary(palette)
    return interactiveTertiary(palette)
  }

  if (variant === 'primary') return lockedPrimary(palette, state)
  if (variant === 'secondary') return lockedSecondary(palette, state)
  return lockedTertiary(palette, state)
}

export type AceButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
  variant?: AceButtonVariant
  palette?: AceButtonPalette
  size?: AceButtonSize
  icon?: AceButtonIcon
  previewState?: AceButtonPreviewState
  disabled?: boolean
  children?: ReactNode
}

export const AceButton = forwardRef<HTMLButtonElement, AceButtonProps>(function AceButton(
  {
    variant = 'primary',
    palette = 'purple',
    size = 'md',
    icon = 'none',
    previewState,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const rootClass = cn(
    rootClassName(variant, palette, previewState, disabled),
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
      {...rest}
    >
      {showLeft ? <span className={cn(sizeLayout[size].iconWrap, 'scale-x-[-1]')}>{icn}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
      {showRight ? <span className={sizeLayout[size].iconWrap}>{icn}</span> : null}
    </button>
  )
})
