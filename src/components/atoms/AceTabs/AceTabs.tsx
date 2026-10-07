import { useId, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'

const tabLabelActive =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]'
const tabLabelInactive =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

export type AceTabItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}

export type AceTabsOrientation = 'horizontal' | 'vertical'

export type AceTabsProps = {
  items: AceTabItem[]
  value: string
  onValueChange: (value: string) => void
  /** Prefix for tab button ids (for aria-labelledby on panels). */
  idPrefix?: string
  /** Horizontal underline (default) or vertical leading bar (Figma Tabs 5196:82). */
  orientation?: AceTabsOrientation
  'aria-label'?: string
  className?: string
}

export function aceTabButtonId(prefix: string, tabId: string) {
  return `${prefix}-tab-${tabId}`
}

export function AceTabs({
  items,
  value,
  onValueChange,
  idPrefix: idPrefixProp,
  orientation = 'horizontal',
  'aria-label': ariaLabel,
  className,
}: AceTabsProps) {
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
          ? 'flex flex-col items-start gap-[var(--ace-tabs-gap)]'
          : 'flex flex-wrap items-center gap-[var(--ace-tabs-gap)]',
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
            id={aceTabButtonId(baseId, item.id)}
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
                    'flex items-center gap-[var(--ace-tabs-vertical-gap)]',
                    !selected && 'px-[var(--ace-tabs-vertical-inactive-px)]',
                  )
                : 'flex flex-col items-center justify-center',
            )}
          >
            {isVertical ? (
              <>
                {selected ? (
                  <span
                    className="h-[var(--ace-tabs-vertical-indicator-height)] w-[var(--ace-tabs-vertical-indicator-width)] shrink-0 rounded-t-[var(--ace-tabs-indicator-radius)] bg-[var(--ace-tabs-indicator-bg)]"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={cn(
                    'whitespace-nowrap text-sm leading-[1.65]',
                    selected ? tabLabelActive : tabLabelInactive,
                    selected
                      ? 'text-[var(--ace-tabs-text-active)]'
                      : 'text-[var(--ace-tabs-text-inactive)] hover:text-[var(--screening-text-primary)]',
                  )}
                >
                  {item.label}
                </span>
              </>
            ) : (
              <>
                <span
                  className={cn(
                    'whitespace-nowrap text-sm leading-[1.65]',
                    selected ? tabLabelActive : tabLabelInactive,
                    selected
                      ? 'text-[var(--ace-tabs-text-active)]'
                      : 'text-[var(--ace-tabs-text-inactive)] hover:text-[var(--screening-text-primary)]',
                  )}
                >
                  {item.label}
                </span>
                {selected ? (
                  <span
                    className="mt-0 h-[var(--ace-tabs-indicator-height)] w-full rounded-t-[var(--ace-tabs-indicator-radius)] bg-[var(--ace-tabs-indicator-bg)]"
                    aria-hidden
                  />
                ) : (
                  <span className="mt-0 h-[var(--ace-tabs-indicator-height)] w-full" aria-hidden />
                )}
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
