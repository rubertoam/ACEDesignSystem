import { useId, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'

const tabLabelActive =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]'
const tabLabelInactive =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

export type TabItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}

export type TabsOrientation = 'horizontal' | 'vertical'

export type TabsProps = {
  items: TabItem[]
  value: string
  onValueChange: (value: string) => void
  /** Prefix for tab button ids (for aria-labelledby on panels). */
  idPrefix?: string
  /** Horizontal underline (default) or vertical leading bar (Figma Tabs 5196:82). */
  orientation?: TabsOrientation
  'aria-label'?: string
  className?: string
}

export function tabButtonId(prefix: string, tabId: string) {
  return `${prefix}-tab-${tabId}`
}

export function Tabs({
  items,
  value,
  onValueChange,
  idPrefix: idPrefixProp,
  orientation = 'horizontal',
  'aria-label': ariaLabel,
  className,
}: TabsProps) {
  const generatedId = useId()
  const baseId = idPrefixProp ?? generatedId
  const isVertical = orientation === 'vertical'

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      className={cn(
        isVertical
          ? 'flex flex-col items-start gap-[var(--tabs-gap)]'
          : 'flex flex-wrap items-center gap-[var(--tabs-gap)]',
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={tabButtonId(baseId, item.id)}
            aria-selected={selected}
            aria-controls={`${baseId}-panel-${item.id}`}
            disabled={item.disabled}
            onClick={() => onValueChange(item.id)}
            className={cn(
              'border-0 bg-transparent p-0 outline-none transition-colors',
              'focus-visible:rounded-[var(--radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isVertical
                ? cn(
                    'flex items-center gap-[var(--tabs-vertical-gap)]',
                    !selected && 'px-[var(--tabs-vertical-inactive-px)]',
                  )
                : 'flex flex-col items-center justify-center',
            )}
          >
            {isVertical ? (
              <>
                {selected ? (
                  <span
                    className="h-[var(--tabs-vertical-indicator-height)] w-[var(--tabs-vertical-indicator-width)] shrink-0 rounded-t-[var(--tabs-indicator-radius)] bg-[var(--tabs-indicator-bg)]"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={cn(
                    'whitespace-nowrap',
                    selected ? tabLabelActive : tabLabelInactive,
                    selected
                      ? 'text-[var(--tabs-text-active)]'
                      : 'text-[var(--tabs-text-inactive)] hover:text-[var(--screening-text-primary)]',
                  )}
                >
                  {item.label}
                </span>
              </>
            ) : (
              <>
                <span
                  className={cn(
                    'whitespace-nowrap',
                    selected ? tabLabelActive : tabLabelInactive,
                    selected
                      ? 'text-[var(--tabs-text-active)]'
                      : 'text-[var(--tabs-text-inactive)] hover:text-[var(--screening-text-primary)]',
                  )}
                >
                  {item.label}
                </span>
                {selected ? (
                  <span
                    className="mt-0 h-[var(--tabs-indicator-height)] w-full rounded-t-[var(--tabs-indicator-radius)] bg-[var(--tabs-indicator-bg)]"
                    aria-hidden
                  />
                ) : (
                  <span className="mt-0 h-[var(--tabs-indicator-height)] w-full" aria-hidden />
                )}
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
