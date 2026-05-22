import { cn } from '../../../lib/cn'

type MaterialSymbolProps = {
  name: string
  className?: string
  /** Figma action icons are 12px */
  size?: 'sm' | 'md'
}

const sizeClass = {
  sm: 'text-[12px] leading-none',
  md: 'text-base leading-none',
} as const

/** Google Material Symbols Outlined (loaded in index.html). */
export function MaterialSymbol({ name, className, size = 'sm' }: MaterialSymbolProps) {
  return (
    <span
      className={cn(
        'material-symbols-outlined inline-flex shrink-0 select-none text-[var(--ace-accordion-icon)]',
        sizeClass[size],
        className,
      )}
      aria-hidden
    >
      {name}
    </span>
  )
}
