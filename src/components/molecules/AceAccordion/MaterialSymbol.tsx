import type { CSSProperties } from 'react'
import { cn } from '../../../lib/cn'

export type MaterialSymbolSize = 'sm' | 'md' | 'lg' | 'xl'

type MaterialSymbolProps = {
  name: string
  className?: string
  /** sm 16px · md 24px (default UI) · lg 28px · xl 32px */
  size?: MaterialSymbolSize
  /** Material Symbols FILL axis — selected favorites, lock, download, etc. */
  filled?: boolean
  /** Variable font weight (default 400). Use 300 for denser toolbar glyphs. */
  weight?: 300 | 400 | 500 | 600 | 700
  style?: CSSProperties
  title?: string
}

const sizePx: Record<MaterialSymbolSize, number> = {
  sm: 16,
  md: 24,
  lg: 28,
  xl: 32,
}

/** Optical size should track rendered px for cleaner outlines at small UI sizes. */
const sizeOpsz: Record<MaterialSymbolSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
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
  const px = sizePx[size]

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
        fontSize: px,
        width: px,
        height: px,
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
