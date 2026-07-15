import type { CSSProperties } from 'react'
import { cn } from '../../../lib/cn'

export type MaterialSymbolSize = 'sm' | 'md' | 'lg' | 'xl'

type MaterialSymbolProps = {
  name: string
  className?: string
  /** sm 12px · md 16px (default UI) · lg 20px · xl 24px */
  size?: MaterialSymbolSize
  /** Material Symbols FILL axis — selected favorites, lock, download, etc. */
  filled?: boolean
  /** Variable font weight (default 400). Use 300 for denser toolbar glyphs. */
  weight?: 300 | 400 | 500 | 600 | 700
  style?: CSSProperties
  title?: string
}

const sizeClass: Record<MaterialSymbolSize, string> = {
  sm: 'text-[12px] leading-none',
  md: 'text-[16px] leading-none',
  lg: 'text-[20px] leading-none',
  xl: 'text-[24px] leading-none',
}

/** Optical size should track rendered px for cleaner outlines at small UI sizes. */
const sizeOpsz: Record<MaterialSymbolSize, number> = {
  sm: 20,
  md: 20,
  lg: 20,
  xl: 24,
}

/** Google Material Symbols Outlined (loaded in index.html). Color inherits via currentColor. */
export function MaterialSymbol({
  name,
  className,
  size = 'md',
  filled = false,
  weight = 400,
  style,
  title,
}: MaterialSymbolProps) {
  return (
    <span
      className={cn(
        'material-symbols-outlined inline-flex shrink-0 select-none items-center justify-center text-current',
        sizeClass[size],
        className,
      )}
      style={{
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
