import { useId } from 'react'
import { cn } from '../../../lib/cn'
import { TabCardHeaderIcons } from './TabCardHeaderIcons'
import { tabButtonId } from './Tabs'

/** Figma Cards/Tab: title = Paragraph/P1/Bold (14). */
const titleClass =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]'
/** Figma Cards/Tab: subtitle + description = Caption/Regular (12). */
const captionClass =
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]'

export type TabCardItem = {
  id: string
  title: string
  description: string
  /** Optional meta line (e.g. next run, last created). */
  subtitle?: string
  disabled?: boolean
}

export type TabCardsProps = {
  items: TabCardItem[]
  value: string
  onValueChange: (value: string) => void
  idPrefix?: string
  'aria-label'?: string
  className?: string
}

export function TabCards({
  items,
  value,
  onValueChange,
  idPrefix: idPrefixProp,
  'aria-label': ariaLabel,
  className,
}: TabCardsProps) {
  const generatedId = useId()
  const baseId = idPrefixProp ?? generatedId

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn('flex flex-wrap gap-[var(--tab-card-gap)]', className)}
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
              'flex w-full max-w-[var(--tab-card-max-width)] flex-col items-stretch rounded-[var(--tab-card-radius)]',
              'border border-solid p-[var(--tab-card-padding)] text-left outline-none transition-[background-color,border-color,box-shadow] duration-200 ease-out',
              'focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              selected
                ? 'border-[var(--tab-card-border-active)] bg-[var(--screening-primary-soft-bg)] shadow-none'
                : cn(
                    'border-[var(--tab-card-border-default)] bg-[var(--tab-card-surface-default)]',
                    'hover:border-[var(--tab-card-border-default)] hover:bg-[var(--screening-primary-soft-bg)] hover:shadow-[var(--ace-drop-shadow-xl)]',
                  ),
            )}
          >
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <p className={cn('m-0 whitespace-nowrap text-[var(--tab-card-title-color)]', titleClass)}>
                  {item.title}
                </p>
                <TabCardHeaderIcons className="text-[var(--tab-card-icon-primary)]" />
              </div>
              {item.subtitle ? (
                <p className={cn('m-0 text-[var(--tab-card-subtitle-color)]', captionClass)}>
                  {item.subtitle}
                </p>
              ) : null}
              <p
                className={cn(
                  'm-0 max-w-full text-[var(--tab-card-description-color)]',
                  captionClass,
                )}
              >
                {item.description}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
