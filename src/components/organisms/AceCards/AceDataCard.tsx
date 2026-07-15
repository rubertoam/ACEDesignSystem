import { useState } from 'react'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { AceTable } from '../../molecules/AceTable/AceTable'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { cn } from '../../../lib/cn'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import {
  aceExpandPanelDurationClass,
  aceExpandPanelEaseClass,
  aceExpandPanelGridClass,
} from '../../../lib/aceExpandPanel'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'
const p1Bold =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]'
const caption =
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]'

const durationAccordion = aceExpandPanelDurationClass
const easeAccordion = aceExpandPanelEaseClass

const iconButtonClass = cn(
  'inline-flex size-[2.125rem] shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'transition-colors duration-[var(--ace-motion-duration-fast)]',
  '[transition-timing-function:var(--ace-motion-ease-standard)]',
  'hover:bg-[var(--ace-site-header-nav-hover)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
)

const DATA_TABLE_COLUMNS = [
  { key: 'col1', header: 'Header' },
  { key: 'col2', header: 'Header' },
  { key: 'col3', header: 'Header' },
] as const

const DATA_TABLE_ROWS = [
  { col1: 'Data Label', col2: 'Data Point', col3: 'Data Point' },
  { col1: 'Data Label', col2: 'Data Point', col3: 'Data Point' },
  { col1: 'Data Label', col2: 'Data Point', col3: 'Data Point' },
]

export type AceDataCardDataPoint = {
  label: string
  value: string
}

export type AceDataCardProps = {
  heading?: string
  enterData?: string
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  leftColumn?: AceDataCardDataPoint[]
  rightColumn?: AceDataCardDataPoint[]
  insightTitle?: string
  insightBody?: string
  inlineLinkLabel?: string
  showCheckbox?: boolean
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  checkboxDisabled?: boolean
  showStatusIndicator?: boolean
  showHeadingInfo?: boolean
  showEnterData?: boolean
  showHeaderActions?: boolean
  showDataTable?: boolean
  showInfoBlock?: boolean
  showInlineLink?: boolean
  elevateOnHover?: boolean
  className?: string
}

const DEFAULT_LEFT: AceDataCardDataPoint[] = [
  { label: 'Data Point', value: 'Data' },
  { label: 'Data Point', value: 'Data' },
  { label: 'Data Point', value: 'Data' },
]

const DEFAULT_RIGHT: AceDataCardDataPoint[] = [
  { label: 'Data Point', value: 'Data' },
  { label: 'Data Point', value: 'Data' },
  { label: 'Data Point', value: 'Data' },
]

function DataPointLine({ label, value }: AceDataCardDataPoint) {
  return (
    <p className={cn('m-0 whitespace-nowrap text-sm leading-[1.65]', p1)}>
      <span className="text-[var(--ace-data-card-row-muted)]">{label}</span>
      <span className="text-[var(--ace-neutral-800)]"> · </span>
      <span className="text-[var(--ace-neutral-800)]">{value}</span>
    </p>
  )
}

function HeaderIconButton({
  label,
  name,
  className,
  onClick,
}: {
  label: string
  name: string
  className?: string
  onClick?: () => void
}) {
  return (
    <button type="button" aria-label={label} className={iconButtonClass} onClick={onClick}>
      <MaterialSymbol name={name} size="md" className={className} />
    </button>
  )
}

export function AceDataCard({
  heading = '[Heading]',
  enterData = '[Enter Data]',
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  leftColumn = DEFAULT_LEFT,
  rightColumn = DEFAULT_RIGHT,
  insightTitle = '[Insert Heading Title]',
  insightBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  inlineLinkLabel = '[Insert Link]',
  showCheckbox = true,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  checkboxDisabled = false,
  showStatusIndicator = true,
  showHeadingInfo = true,
  showEnterData = true,
  showHeaderActions = true,
  showDataTable = true,
  showInfoBlock = true,
  showInlineLink = true,
  elevateOnHover = true,
  className,
}: AceDataCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isExpandedControlled = expandedProp !== undefined
  const expanded = isExpandedControlled ? expandedProp : internalExpanded

  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isCheckedControlled = checkedProp !== undefined
  const checked = isCheckedControlled ? checkedProp : internalChecked

  const setExpanded = (next: boolean) => {
    if (!isExpandedControlled) setInternalExpanded(next)
    onExpandedChange?.(next)
  }

  const handleCheckboxChange = (value: boolean | 'indeterminate') => {
    const next = value === true
    if (!isCheckedControlled) setInternalChecked(next)
    onCheckedChange?.(next)
  }

  const toggleExpanded = () => setExpanded(!expanded)
  const hasExpandedContent = showDataTable || showInfoBlock || showInlineLink

  return (
    <article
      className={cn(
        'group/card flex w-[var(--ace-data-card-width)] max-w-full flex-col overflow-hidden rounded-[var(--ace-data-card-radius)]',
        'border-[0.5px] border-solid border-[var(--ace-data-card-border)] bg-[var(--ace-data-card-surface)]',
        'shadow-[var(--ace-data-card-shadow)]',
        elevateOnHover &&
          'transition-[box-shadow] duration-[var(--ace-motion-duration-fast)] [transition-timing-function:var(--ace-motion-ease-standard)] hover:shadow-[var(--ace-data-card-shadow-hover)]',
        className,
      )}
    >
      <header
        className={cn(
          'flex h-[var(--ace-data-card-header-height)] shrink-0 items-center justify-between gap-3',
          'bg-[var(--ace-data-card-header-bg)] px-4',
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {showCheckbox ? (
            <Checkbox
              size="sm"
              checked={checked}
              disabled={checkboxDisabled}
              onCheckedChange={handleCheckboxChange}
              aria-label={`Select ${heading}`}
            />
          ) : null}
          {showStatusIndicator ? (
            <>
              <span
                className="shrink-0 text-[1.75rem] font-bold leading-none tracking-[-0.035em] text-[var(--ace-success-500)]"
                aria-hidden
              >
                ·
              </span>
              <span className={cn('truncate text-sm leading-[1.65]', p1, 'text-[var(--ace-neutral-800)]')}>
                {heading}
              </span>
              <span
                className="shrink-0 text-[1.75rem] font-bold leading-none tracking-[-0.035em] text-[var(--ace-success-500)]"
                aria-hidden
              >
                ·······
              </span>
            </>
          ) : (
            <span className={cn('truncate text-sm leading-[1.65]', p1, 'text-[var(--ace-neutral-800)]')}>
              {heading}
            </span>
          )}
          {showHeadingInfo ? (
            <HeaderIconButton label="More information" name="info" />
          ) : null}
        </div>
        {showEnterData ? (
          <div className="flex shrink-0 items-center gap-1">
            <span className={cn('whitespace-nowrap text-sm leading-[1.65]', p1, 'text-[var(--ace-neutral-800)]')}>
              {enterData}
            </span>
            {showHeaderActions ? (
              <>
                <HeaderIconButton label="Data info" name="info" />
                <button type="button" aria-label="Quick action" className={iconButtonClass}>
                  <MaterialSymbol name="flash_on" size="lg" />
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="flex min-h-[8.125rem] items-center justify-between px-12">
        <div className="flex flex-col gap-2">
          {leftColumn.map((row, i) => (
            <DataPointLine key={`left-${i}`} {...row} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {rightColumn.map((row, i) => (
            <DataPointLine key={`right-${i}`} {...row} />
          ))}
        </div>
      </div>

      {hasExpandedContent ? (
        <div className={aceExpandPanelGridClass(expanded)} aria-hidden={!expanded}>
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col gap-3 px-8 pb-2">
              {showDataTable ? (
                <div className="flex flex-col gap-3">
                  <h4 className={cn('m-0 text-sm leading-[1.65]', p1Bold, 'text-[var(--ace-neutral-800)]')}>
                    Data Table
                  </h4>
                  <AceTable
                    columns={[...DATA_TABLE_COLUMNS]}
                    rows={DATA_TABLE_ROWS}
                    caption="Data Table"
                  />
                </div>
              ) : null}

              {showInfoBlock ? (
                <div className="flex flex-col gap-4 rounded-[var(--ace-data-card-radius)] border-[0.5px] border-solid border-[var(--ace-data-card-insight-border)] bg-[var(--ace-data-card-insight-bg)] p-6">
                  <div className="flex items-center gap-2.5">
                    <MaterialSymbol name="lightbulb" size="md" className="text-[var(--screening-primary)]" />
                    <p className={cn('m-0 text-sm leading-[1.65]', p1Bold, 'text-[var(--screening-primary)]')}>
                      {insightTitle}
                    </p>
                  </div>
                  <p className={cn('m-0 text-xs leading-[1.65] text-[var(--screening-primary)]', caption)}>
                    {insightBody}
                  </p>
                </div>
              ) : null}

              {showInlineLink ? (
                <button
                  type="button"
                  className={cn(
                    'm-0 w-fit text-left text-xs leading-[1.65] text-[var(--screening-primary)]',
                    caption,
                    'rounded-[var(--radius-sm)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
                  )}
                >
                  {inlineLinkLabel}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <footer className={cn('flex justify-end px-6', expanded ? 'py-4' : 'pb-4 pt-0')}>
        <button
          type="button"
          onClick={toggleExpanded}
          className={cn(
            'inline-flex items-center gap-2 rounded-[var(--radius-sm)] text-xs leading-[1.65] text-[var(--screening-primary)]',
            caption,
            'hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
          )}
        >
          {expanded ? 'Show less' : 'Show more'}
          <MaterialSymbol
            name="keyboard_arrow_down"
            className={cn(
              aceChevronIconClass,
              'transition-transform',
              durationAccordion,
              easeAccordion,
              expanded && 'rotate-180',
            )}
          />
        </button>
      </footer>
    </article>
  )
}
