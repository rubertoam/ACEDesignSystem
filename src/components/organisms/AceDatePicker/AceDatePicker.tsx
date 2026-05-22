import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { AceButton } from '../../atoms/AceButton'
import { cn } from '../../../lib/cn'
import {
  addMonths,
  buildMonthGrid,
  cloneDate,
  formatDateLabel,
  formatRangeDisplay,
  isBetweenRange,
  isSameDay,
  isToday,
  monthTitle,
  normalizeRange,
  resolveRangeEndpoints,
  startOfDay,
  type DateRangeValue,
} from './datePickerUtils'

export type { DateRangeValue, PartialDateRange } from './datePickerUtils'

export type AceDatePickerMode = 'range' | 'single'

type AceDatePickerPropsBase = {
  label?: string
  disabled?: boolean
  portalContainer?: HTMLElement | null
  className?: string
  id?: string
}

export type AceDatePickerRangeProps = AceDatePickerPropsBase & {
  mode?: 'range'
  value?: DateRangeValue | null
  defaultValue?: DateRangeValue
  onChange?: (value: DateRangeValue) => void
  placeholder?: string
}

export type AceDatePickerSingleProps = AceDatePickerPropsBase & {
  mode: 'single'
  value?: Date | null
  defaultValue?: Date
  onChange?: (value: Date) => void
  placeholder?: string
}

export type AceDatePickerProps = AceDatePickerRangeProps | AceDatePickerSingleProps

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

const fieldTriggerClass = cn(
  'inline-flex w-[var(--ace-date-picker-trigger-width)] max-w-[var(--ace-date-picker-trigger-width)] shrink-0 items-center justify-between gap-[var(--space-2)] rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] px-3 py-2 text-sm leading-[1.65] text-[var(--screening-text-primary)] outline-none transition-colors [font-family:var(--font-screening)]',
  'hover:bg-[var(--screening-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
  'data-[state=open]:bg-[var(--screening-surface-hover)] data-[state=open]:ring-2 data-[state=open]:ring-[var(--screening-primary-ring)] data-[state=open]:ring-offset-2 data-[state=open]:ring-offset-[var(--screening-primary-ring-offset)]',
  'disabled:pointer-events-none disabled:opacity-50',
)

const panelBaseClass = cn(
  'z-50 overflow-hidden rounded-[var(--radius-md)] border border-solid border-[var(--ace-dropdown-menu-border)] bg-[var(--ace-dropdown-menu-surface)] p-0 shadow-[var(--ace-dropdown-menu-shadow)]',
)

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const labelBold =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]'

const monthTitleClass =
  'text-center text-xs font-bold uppercase leading-none tracking-normal text-[var(--ace-date-picker-month-title)]'

const weekdayClass =
  'text-center text-xs font-normal leading-none text-[var(--ace-date-picker-weekday)]'

type DraftRange = {
  start: Date | null
  end: Date | null
}

function cloneRange(range: DateRangeValue | null | undefined): DraftRange {
  if (!range) return { start: null, end: null }
  return { start: cloneDate(range.start), end: cloneDate(range.end) }
}

function draftRangeIsComplete(draft: DraftRange): draft is { start: Date; end: Date } {
  return draft.start != null && draft.end != null
}

function CalendarDayButton({
  date,
  inMonth,
  today,
  selected,
  inRange,
  onSelect,
  onHover,
}: {
  date: Date
  inMonth: boolean
  today: boolean
  selected: boolean
  inRange: boolean
  onSelect: () => void
  onHover?: () => void
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={cn(
        'relative flex size-[var(--ace-date-picker-day-size)] shrink-0 items-center justify-center rounded-full text-xs leading-none transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
        inMonth ? 'text-[var(--ace-date-picker-day)]' : 'text-[var(--ace-date-picker-day-muted)]',
        inRange && !selected && 'bg-[var(--ace-date-picker-range-fill)]',
        selected && 'bg-[var(--screening-primary)] font-normal text-[var(--ace-date-picker-day-on-primary)]',
        !selected && today && 'ring-1 ring-inset ring-[var(--screening-primary)]',
        !inRange && !selected && 'hover:bg-[var(--screening-surface-hover)]',
      )}
      aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      aria-pressed={selected}
    >
      {date.getDate()}
    </button>
  )
}

function MonthGrid({
  monthAnchor,
  today,
  rangeDraft,
  singleDraft,
  hoverDate,
  mode,
  onSelectDay,
  onHoverDay,
}: {
  monthAnchor: Date
  today: Date
  rangeDraft: DraftRange
  singleDraft: Date | null
  hoverDate: Date | null
  mode: AceDatePickerMode
  onSelectDay: (date: Date) => void
  onHoverDay: (date: Date) => void
}) {
  const year = monthAnchor.getFullYear()
  const month = monthAnchor.getMonth()
  const cells = buildMonthGrid(year, month)

  const { start: previewStart, end: previewEnd } =
    mode === 'range'
      ? resolveRangeEndpoints(rangeDraft.start, rangeDraft.end, hoverDate)
      : { start: singleDraft, end: null as Date | null }

  return (
    <div className="min-w-0 flex-1">
      <div className="mb-2 grid grid-cols-7 gap-[var(--ace-date-picker-day-gap)]">
        {WEEKDAYS.map((day, index) => (
          <span key={`${day}-${index}`} className={cn(weekdayClass, 'flex items-center justify-center')}>
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-[var(--ace-date-picker-day-gap)]">
        {cells.map((cell) => {
          const start = previewStart
          const end = previewEnd
          const selectedStart = start != null && isSameDay(cell.date, start)
          const selectedEnd = end != null && isSameDay(cell.date, end)
          const selected = selectedStart || selectedEnd
          const inRange =
            mode === 'range' &&
            start != null &&
            end != null &&
            isBetweenRange(cell.date, start, end)
          return (
            <div key={cell.date.toISOString()} className="flex items-center justify-center">
              <CalendarDayButton
                date={cell.date}
                inMonth={cell.inMonth}
                today={isToday(cell.date, today)}
                selected={selected}
                inRange={inRange}
                onSelect={() => onSelectDay(cell.date)}
                onHover={mode === 'range' ? () => onHoverDay(cell.date) : undefined}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DatePickerFooter({
  canConfirm,
  onReset,
  onCancel,
  onConfirm,
}: {
  canConfirm: boolean
  onReset: () => void
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="mt-4 flex items-center justify-between gap-2 border-t border-solid border-[var(--screening-border-soft)] pt-3">
      <AceButton type="button" variant="tertiary" palette="purple" size="sm" onClick={onReset}>
        Reset
      </AceButton>
      <div className="flex gap-2">
        <AceButton type="button" variant="secondary" palette="purple" size="sm" onClick={onCancel}>
          Cancel
        </AceButton>
        <AceButton
          type="button"
          variant="primary"
          palette="purple"
          size="sm"
          disabled={!canConfirm}
          onClick={onConfirm}
        >
          Set
        </AceButton>
      </div>
    </div>
  )
}

export function AceDatePicker(props: AceDatePickerProps) {
  const {
    label = 'Select Date',
    disabled = false,
    portalContainer,
    className,
    id: idProp,
  } = props

  const mode: AceDatePickerMode = props.mode ?? 'range'
  const placeholder =
    props.placeholder ?? (mode === 'range' ? 'Start - End' : 'Select date')

  const genId = useId()
  const labelId = idProp ?? genId
  const triggerId = `${labelId}-trigger`
  const panelId = `${labelId}-panel`
  const instructionsId = `${labelId}-instructions`

  const isControlled = props.value !== undefined

  const [internalRange, setInternalRange] = useState<DateRangeValue | null>(() =>
    mode === 'range' ? (props as AceDatePickerRangeProps).defaultValue ?? null : null,
  )
  const [internalSingle, setInternalSingle] = useState<Date | null>(() =>
    mode === 'single' ? (props as AceDatePickerSingleProps).defaultValue ?? null : null,
  )

  const confirmedRange =
    mode === 'range'
      ? isControlled
        ? ((props as AceDatePickerRangeProps).value ?? null)
        : internalRange
      : null
  const confirmedSingle =
    mode === 'single'
      ? isControlled
        ? ((props as AceDatePickerSingleProps).value ?? null)
        : internalSingle
      : null

  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(() =>
    startOfDay(
      mode === 'range'
        ? (confirmedRange?.start ?? new Date())
        : (confirmedSingle ?? new Date()),
    ),
  )
  const [rangeDraft, setRangeDraft] = useState<DraftRange>(() => cloneRange(confirmedRange))
  const [singleDraft, setSingleDraft] = useState<Date | null>(() =>
    confirmedSingle ? cloneDate(confirmedSingle) : null,
  )
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const today = startOfDay(new Date())

  const closingIntent = useRef<'confirm' | 'cancel' | null>(null)

  useEffect(() => {
    if (!isControlled) return
    if (mode === 'range') {
      setInternalRange((props as AceDatePickerRangeProps).value ?? null)
    } else {
      setInternalSingle((props as AceDatePickerSingleProps).value ?? null)
    }
  }, [isControlled, mode, props])

  const syncDraftFromConfirmed = useCallback(() => {
    if (mode === 'range') {
      setRangeDraft(cloneRange(confirmedRange))
      setHoverDate(null)
      if (confirmedRange?.start) setViewMonth(startOfDay(confirmedRange.start))
    } else {
      setSingleDraft(confirmedSingle ? cloneDate(confirmedSingle) : null)
      if (confirmedSingle) setViewMonth(startOfDay(confirmedSingle))
    }
  }, [confirmedRange, confirmedSingle, mode])

  const openPanel = useCallback(() => {
    syncDraftFromConfirmed()
    setOpen(true)
  }, [syncDraftFromConfirmed])

  const applyCancel = useCallback(() => {
    closingIntent.current = 'cancel'
    setOpen(false)
  }, [])

  const applyReset = useCallback(() => {
    if (mode === 'range') {
      setRangeDraft({ start: null, end: null })
      setHoverDate(null)
    } else {
      setSingleDraft(null)
    }
  }, [mode])

  const applyConfirm = useCallback(() => {
    closingIntent.current = 'confirm'
    if (mode === 'range') {
      if (!draftRangeIsComplete(rangeDraft)) return
      const next = normalizeRange(rangeDraft.start, rangeDraft.end)
      if (!isControlled) setInternalRange(next)
      ;(props as AceDatePickerRangeProps).onChange?.(next)
    } else {
      if (!singleDraft) return
      const next = cloneDate(singleDraft)
      if (!isControlled) setInternalSingle(next)
      ;(props as AceDatePickerSingleProps).onChange?.(next)
    }
    setOpen(false)
  }, [isControlled, mode, props, rangeDraft, singleDraft])

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next) {
        openPanel()
        return
      }
      if (closingIntent.current === 'confirm') {
        closingIntent.current = null
        setOpen(false)
        return
      }
      syncDraftFromConfirmed()
      closingIntent.current = null
      setOpen(false)
    },
    [openPanel, syncDraftFromConfirmed],
  )

  const handleSelectDay = useCallback(
    (date: Date) => {
      const day = startOfDay(date)
      if (mode === 'single') {
        setSingleDraft(day)
        return
      }
      setRangeDraft((prev) => {
        if (!prev.start || (prev.start && prev.end)) {
          return { start: day, end: null }
        }
        return { start: prev.start, end: day }
      })
      setHoverDate(null)
    },
    [mode],
  )

  const shiftView = useCallback((delta: number) => {
    setViewMonth((prev) => addMonths(prev, delta))
  }, [])

  const leftMonth = viewMonth
  const rightMonth = addMonths(viewMonth, 1)

  const triggerLabel =
    mode === 'range'
      ? (() => {
          const displayConfirmed = formatRangeDisplay(confirmedRange)
          const displayDraft =
            open && rangeDraft.start && !rangeDraft.end
              ? formatRangeDisplay({ start: rangeDraft.start }, { partialEndLabel: true })
              : null
          return open ? displayDraft ?? displayConfirmed : displayConfirmed
        })()
      : open && singleDraft
        ? formatDateLabel(singleDraft)
        : confirmedSingle
          ? formatDateLabel(confirmedSingle)
          : null

  const canConfirm =
    mode === 'range' ? draftRangeIsComplete(rangeDraft) : singleDraft != null

  const instructions =
    mode === 'range'
      ? 'Date range picker. Select a start date, then an end date. Use Reset to clear, Cancel to revert, or Set to confirm.'
      : 'Date picker. Select a date. Use Reset to clear, Cancel to revert, or Set to confirm.'

  const panelClass = cn(
    panelBaseClass,
    mode === 'range'
      ? 'w-[var(--ace-date-picker-panel-width)]'
      : 'w-[var(--ace-date-picker-panel-width-single)]',
  )

  const handlePanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      applyCancel()
    }
  }

  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-1.5', className)}>
      <span id={labelId} className={cn(labelBold, 'text-[var(--screening-text-primary)]')}>
        {label}
      </span>
      <p id={instructionsId} className="sr-only">
        {instructions}
      </p>

      <DropdownMenu.Root open={open} onOpenChange={handleOpenChange} modal>
        <DropdownMenu.Trigger asChild disabled={disabled}>
          <button
            type="button"
            id={triggerId}
            className={fieldTriggerClass}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? panelId : undefined}
            aria-labelledby={`${labelId} ${instructionsId}`}
          >
            <span
              className={cn(
                'min-w-0 flex-1 truncate text-left',
                p1,
                !triggerLabel && 'font-normal text-[var(--screening-text-muted)]',
                triggerLabel && 'font-normal',
              )}
            >
              {triggerLabel ?? placeholder}
            </span>
            <Calendar
              className="size-4 shrink-0 text-[var(--screening-icon-muted)]"
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal container={portalContainer ?? undefined}>
          <DropdownMenu.Content
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            aria-describedby={instructionsId}
            sideOffset={4}
            align="start"
            collisionPadding={8}
            className={panelClass}
            onEscapeKeyDown={(e) => {
              e.preventDefault()
              applyCancel()
            }}
            onPointerDownOutside={() => applyCancel()}
            onFocusOutside={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <div className="p-4" onKeyDown={handlePanelKeyDown}>
              <div className="mb-3 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => shiftView(-1)}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--screening-primary)] transition-colors hover:bg-[var(--screening-primary-soft-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]"
                >
                  <ChevronLeft className="size-4" strokeWidth={2} aria-hidden />
                </button>
                <p
                  className={cn(
                    monthTitleClass,
                    'min-w-0 flex-1',
                    mode === 'range' ? 'text-center' : 'text-center',
                  )}
                >
                  {monthTitle(mode === 'range' ? leftMonth : viewMonth)}
                </p>
                {mode === 'range' ? (
                  <p className={cn(monthTitleClass, 'min-w-0 flex-1 text-center')}>
                    {monthTitle(rightMonth)}
                  </p>
                ) : null}
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => shiftView(1)}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--screening-primary)] transition-colors hover:bg-[var(--screening-primary-soft-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]"
                >
                  <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
                </button>
              </div>

              <div className={cn('flex', mode === 'range' ? 'gap-4' : '')}>
                <MonthGrid
                  monthAnchor={mode === 'range' ? leftMonth : viewMonth}
                  today={today}
                  rangeDraft={rangeDraft}
                  singleDraft={singleDraft}
                  hoverDate={hoverDate}
                  mode={mode}
                  onSelectDay={handleSelectDay}
                  onHoverDay={setHoverDate}
                />
                {mode === 'range' ? (
                  <MonthGrid
                    monthAnchor={rightMonth}
                    today={today}
                    rangeDraft={rangeDraft}
                    singleDraft={singleDraft}
                    hoverDate={hoverDate}
                    mode={mode}
                    onSelectDay={handleSelectDay}
                    onHoverDay={setHoverDate}
                  />
                ) : null}
              </div>

              <DatePickerFooter
                canConfirm={canConfirm}
                onReset={applyReset}
                onCancel={applyCancel}
                onConfirm={applyConfirm}
              />
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
