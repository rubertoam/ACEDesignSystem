import type { CSSProperties } from 'react'
import { cn } from '../../../lib/cn'

export type MaterialSymbolSize = 'sm' | 'md' | 'lg' | 'xl'

type MaterialSymbolProps = {
  name: string
  className?: string
  /**
   * Figma `icon/size/*` → `--icon-size-*`
   * sm 12 · md 16 (default) · lg 20 · xl 24
   */
  size?: MaterialSymbolSize
  /** Material Symbols FILL axis — selected favorites, lock, download, etc. */
  filled?: boolean
  /** Variable font weight (default 400). Use 300 for denser toolbar glyphs. */
  weight?: 300 | 400 | 500 | 600 | 700
  style?: CSSProperties
  title?: string
}

/** CSS size from Figma Component tokens (icon/size/*). */
const sizeVar: Record<MaterialSymbolSize, string> = {
  sm: 'var(--icon-size-sm)',
  md: 'var(--icon-size-md)',
  lg: 'var(--icon-size-lg)',
  xl: 'var(--icon-size-xl)',
}

/** Optical size axis — match token pixel sizes for cleaner outlines. */
const sizeOpsz: Record<MaterialSymbolSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
}

/**
 * Google Material Symbols Outlined (loaded in index.html).
 * Color inherits via currentColor.
 *
 * Size and flex centering MUST be inline — Google Fonts ships `font-size: 24px`
 * and a non-flex `display` on `.material-symbols-outlined`, which beats Tailwind
 * utilities and makes glyphs look off-center in smaller icon slots.
 */
export function MaterialSymbol({
  name,
  className,
  size = 'md',
  filled = false,
  weight = 400,
  style,
  title,
}: MaterialSymbolProps) {
  const dim = sizeVar[size]

  return (
    <span
      className={cn(
        'material-symbols-outlined shrink-0 select-none text-current',
        className,
      )}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: dim,
        width: dim,
        height: dim,
        lineHeight: 1,
        overflow: 'hidden',
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${sizeOpsz[size]}`,
        ...style,
      }}
      aria-hidden={title ? undefined : true}
      title={title}
    >
      {name}
    </span>
  )
}
