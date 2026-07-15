import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceFilterChipClass,
  aceFilterChipClearButtonClass,
  aceFilterChipClearIconClass,
  aceFilterChipChevronClass,
  aceFilterChipLabelClass,
  aceFilterChipOpenButtonClass,
} from './filterFieldStyles'

function FilterChipChevron() {
  return (
    <svg className={aceFilterChipChevronClass} viewBox="0 0 8 8" aria-hidden>
      <path d="M0.94 2.53L4 5.583L7.06 2.53L8 3.47L4 7.47L0 3.47L0.94 2.53Z" />
    </svg>
  )
}

/** Figma filter clear control — filled circle with cutout X (10px). */
function FilterChipClearIcon() {
  return (
    <svg className={aceFilterChipClearIconClass} viewBox="0 0 10 10" aria-hidden>
      <path d="M5 0C2.235 0 0 2.235 0 5C0 7.765 2.235 10 5 10C7.765 10 10 7.765 10 5C10 2.235 7.765 0 5 0ZM7.5 6.795L6.795 7.5L5 5.705L3.205 7.5L2.5 6.795L4.295 5L2.5 3.205L3.205 2.5L5 4.295L6.795 2.5L7.5 3.205L5.705 5L7.5 6.795Z" />
    </svg>
  )
}

export type AceFilterChipProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  label: string
  onOpen?: () => void
  onClear?: () => void
  clearLabel?: string
  openLabel?: string
  showChevron?: boolean
  /** When false, the clear control is hidden. */
  clearable?: boolean
}

export const AceFilterChip = forwardRef<HTMLDivElement, AceFilterChipProps>(function AceFilterChip(
  {
    label,
    onOpen,
    onClear,
    clearLabel = 'Clear filter',
    openLabel,
    showChevron = true,
    clearable = true,
    className,
    ...rest
  },
  ref,
) {
  return (
    <div ref={ref} className={cn(aceFilterChipClass, className)} {...rest}>
      <button
        type="button"
        className={aceFilterChipOpenButtonClass}
        aria-label={openLabel ?? label}
        onClick={onOpen}
      >
        <span className={aceFilterChipLabelClass}>{label}</span>
        {showChevron ? <FilterChipChevron /> : null}
      </button>
      {clearable && onClear ? (
        <button
          type="button"
          className={aceFilterChipClearButtonClass}
          aria-label={clearLabel}
          onClick={(e) => {
            e.stopPropagation()
            onClear()
          }}
        >
          <FilterChipClearIcon />
        </button>
      ) : null}
    </div>
  )
})
