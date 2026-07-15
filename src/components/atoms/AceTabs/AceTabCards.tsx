import { useId } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { aceTabButtonId } from './AceTabs'

const titleClass =
  '[font:var(--ace-type-heading-h5-small-bold)] [letter-spacing:var(--ace-type-heading-h5-small-bold-tracking)]'
const subtitleClass =
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]'
const descriptionClass = '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]'

function TabCardHeaderIcon() {
  return (
    <MaterialSymbol
      name="vital_signs"
      size="md"
      className="shrink-0 text-[var(--ace-tab-card-icon-primary)]"
    />
  )
}

export type AceTabCardItem = {
  id: string
  title: string
  description: string
  /** Optional meta line (e.g. next run, last created). */
  subtitle?: string
  disabled?: boolean
}

export type AceTabCardsProps = {
  items: AceTabCardItem[]
  value: string
  onValueChange: (value: string) => void
  idPrefix?: string
  'aria-label'?: string
  className?: string
}

export function AceTabCards({
  items,
  value,
  onValueChange,
  idPrefix: idPrefixProp,
  'aria-label': ariaLabel,
  className,
}: AceTabCardsProps) {
  const generatedId = useId()
  const baseId = idPrefixProp ?? generatedId

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn('flex flex-wrap gap-[var(--ace-tab-card-gap)]', className)}
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
              'flex w-full max-w-[var(--ace-tab-card-max-width)] flex-col items-stretch rounded-[var(--ace-tab-card-radius)]',
              'border border-solid p-[var(--ace-tab-card-padding)] text-left outline-none transition-[background-color,border-color,box-shadow] duration-200 ease-out',
              'focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              selected
                ? 'border-[var(--ace-tab-card-border-active)] bg-[var(--screening-primary-soft-bg)]'
                : cn(
                    'border-[var(--ace-tab-card-border-default)] bg-[var(--ace-tab-card-surface-default)]',
                    'hover:border-transparent hover:bg-[var(--screening-primary-soft-bg)] hover:shadow-[var(--ace-drop-shadow-xs)]',
                  ),
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center justify-between gap-3">
                <p className={cn('m-0 whitespace-nowrap leading-[1.65] text-[var(--ace-tab-card-title-color)]', titleClass)}>
                  {item.title}
                </p>
                <TabCardHeaderIcon />
              </div>
              {item.subtitle ? (
                <p className={cn('m-0 leading-[1.65] text-[var(--ace-tab-card-subtitle-color)]', subtitleClass)}>
                  {item.subtitle}
                </p>
              ) : null}
              <p
                className={cn(
                  'm-0 max-w-full leading-[1.65] text-[var(--ace-tab-card-description-color)]',
                  descriptionClass,
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
