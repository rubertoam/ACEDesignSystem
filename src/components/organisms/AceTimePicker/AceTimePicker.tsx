import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { AceButton } from '../../atoms/AceButton'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import {
  cloneTime,
  formatTimeDisplay,
  getGeneralDefault,
  getSchedulingDefault,
  normalizeHourInput,
  normalizeMinuteInput,
  pad2,
  parseHourInput,
  parseMinuteInput,
  stepHour,
  stepMinute,
  stepPeriod,
  type TimeFormat,
  type TimePeriod,
  type TimeValue,
} from './timePickerUtils'

export type { TimeFormat, TimePeriod, TimeValue }

export type AceTimePickerDefaultMode = 'scheduling' | 'general'

export type AceTimePickerProps = {
  label?: string
  value?: TimeValue | null
  defaultValue?: TimeValue
  onChange?: (value: TimeValue) => void
  format?: TimeFormat
  minuteStep?: number
  placeholder?: string
  disabled?: boolean
  defaultMode?: AceTimePickerDefaultMode
  portalContainer?: HTMLElement | null
  className?: string
  id?: string
}

const fieldTriggerClass = cn(
  'inline-flex w-[var(--ace-time-picker-trigger-width)] max-w-[var(--ace-time-picker-trigger-width)] shrink-0 items-center justify-between gap-[var(--space-2)] rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] px-3 py-2 text-sm font-semibold leading-[1.65] text-[var(--screening-text-primary)] outline-none transition-colors [font-family:var(--font-screening)]',
  'hover:bg-[var(--screening-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
  'data-[state=open]:bg-[var(--screening-surface-hover)] data-[state=open]:ring-2 data-[state=open]:ring-[var(--screening-primary-ring)] data-[state=open]:ring-offset-2 data-[state=open]:ring-offset-[var(--screening-primary-ring-offset)]',
  'disabled:pointer-events-none disabled:opacity-50',
)

const panelClass = cn(
  'z-50 overflow-hidden rounded-[var(--radius-md)] border border-solid border-[var(--ace-dropdown-menu-border)] bg-[var(--ace-dropdown-menu-surface)] p-0 shadow-[var(--ace-dropdown-menu-shadow)]',
  'w-[var(--ace-time-picker-panel-width)]',
)

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const labelBold =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]'

function focusInputSelect(el: HTMLInputElement | null | undefined) {
  if (!el) return
  el.focus({ preventScroll: true })
  requestAnimationFrame(() => el.select())
}

function resolveInitial(
  value: TimeValue | null | undefined,
  defaultValue: TimeValue | undefined,
  format: TimeFormat,
  minuteStep: number,
  defaultMode: AceTimePickerDefaultMode,
): TimeValue {
  if (value != null) return cloneTime(value)
  if (defaultValue != null) return cloneTime(defaultValue)
  return defaultMode === 'scheduling'
    ? getSchedulingDefault(minuteStep, format)
    : getGeneralDefault(format)
}

function StepperButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-5 items-center justify-center rounded-[var(--radius-sm)] text-[var(--screening-primary)] transition-colors hover:bg-[var(--screening-primary-soft-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]"
    >
      {children}
    </button>
  )
}

function TimeStepperColumn({
  label,
  displayValue,
  inputValue,
  onInputChange,
  onInputBlur,
  onStepUp,
  onStepDown,
  onArrowKey,
  onEnter,
  onTabForward,
  onTabBackward,
  ariaMin,
  ariaMax,
  inputRef,
}: {
  label: string
  displayValue: string
  inputValue: string
  onInputChange: (raw: string) => void
  onInputBlur: () => void
  onStepUp: () => void
  onStepDown: () => void
  onArrowKey: (direction: 1 | -1) => void
  onEnter?: () => void
  onTabForward?: () => void
  onTabBackward?: () => void
  ariaMin: number
  ariaMax: number
  inputRef: React.RefObject<HTMLInputElement | null>
}) {
  const selectInput = () => {
    requestAnimationFrame(() => inputRef.current?.select())
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onArrowKey(1)
      selectInput()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onArrowKey(-1)
      selectInput()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      onEnter?.()
    } else if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (onTabBackward) {
          e.preventDefault()
          onTabBackward()
        }
      } else if (onTabForward) {
        e.preventDefault()
        onTabForward()
      }
    }
  }

  return (
    <div
      className="flex flex-col items-center gap-1.5"
      role="group"
      aria-label={label}
    >
      <StepperButton
        label={`Increase ${label}`}
        onClick={() => {
          onStepUp()
          focusInputSelect(inputRef.current)
        }}
      >
        <MaterialSymbol name="keyboard_arrow_up" className={aceChevronIconClass} />
      </StepperButton>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        aria-label={label}
        aria-valuemin={ariaMin}
        aria-valuemax={ariaMax}
        aria-valuenow={Number.parseInt(displayValue, 10) || ariaMin}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onFocus={(e) => focusInputSelect(e.currentTarget)}
        onBlur={onInputBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          p1,
          'w-[2.25rem] border-0 bg-transparent p-0 text-center text-[var(--screening-text-primary)] outline-none',
          'focus-visible:rounded-[var(--radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
        )}
      />
      <StepperButton
        label={`Decrease ${label}`}
        onClick={() => {
          onStepDown()
          focusInputSelect(inputRef.current)
        }}
      >
        <MaterialSymbol name="keyboard_arrow_down" className={aceChevronIconClass} />
      </StepperButton>
    </div>
  )
}

function PeriodStepperColumn({
  period,
  onStepUp,
  onStepDown,
  onEnter,
  onTabForward,
  onTabBackward,
  focusRef,
}: {
  period: TimePeriod
  onStepUp: () => void
  onStepDown: () => void
  onEnter?: () => void
  onTabForward?: () => void
  onTabBackward?: () => void
  focusRef?: React.RefObject<HTMLDivElement | null>
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onStepUp()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onStepDown()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      onEnter?.()
    } else if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (onTabBackward) {
          e.preventDefault()
          onTabBackward()
        }
      } else if (onTabForward) {
        e.preventDefault()
        onTabForward()
      }
    }
  }

  return (
    <div
      ref={focusRef}
      className="flex flex-col items-center gap-1.5 outline-none focus-visible:rounded-[var(--radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]"
      role="group"
      aria-label="AM or PM"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <StepperButton label="Toggle to PM" onClick={onStepUp}>
        <MaterialSymbol name="keyboard_arrow_up" className={aceChevronIconClass} />
      </StepperButton>
      <span
        className={cn(p1, 'w-[2.625rem] text-center text-[var(--screening-text-primary)]')}
        aria-live="polite"
        aria-atomic="true"
      >
        {period}
      </span>
      <StepperButton label="Toggle to AM" onClick={onStepDown}>
        <MaterialSymbol name="keyboard_arrow_down" className={aceChevronIconClass} />
      </StepperButton>
    </div>
  )
}

export function AceTimePicker({
  label = 'Select Time',
  value: valueProp,
  defaultValue,
  onChange,
  format = '12',
  minuteStep = 5,
  placeholder = 'Select time',
  disabled = false,
  defaultMode = 'general',
  portalContainer,
  className,
  id: idProp,
}: AceTimePickerProps) {
  const genId = useId()
  const labelId = idProp ?? genId
  const triggerId = `${labelId}-trigger`
  const panelId = `${labelId}-panel`
  const instructionsId = `${labelId}-instructions`

  const isControlled = valueProp !== undefined
  const [internalConfirmed, setInternalConfirmed] = useState<TimeValue>(() =>
    resolveInitial(valueProp, defaultValue, format, minuteStep, defaultMode),
  )
  const confirmed = isControlled && valueProp != null ? valueProp : internalConfirmed

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<TimeValue>(() => cloneTime(confirmed))
  const [hourText, setHourText] = useState(() => String(confirmed.hour))
  const [minuteText, setMinuteText] = useState(() => pad2(confirmed.minute))
  const [minuteCorrected, setMinuteCorrected] = useState(false)

  const closingIntent = useRef<'confirm' | 'cancel' | null>(null)
  const hourRef = useRef<HTMLInputElement>(null)
  const minuteRef = useRef<HTMLInputElement>(null)
  const periodRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)

  const focusHour = useCallback(() => focusInputSelect(hourRef.current), [])
  const focusMinute = useCallback(() => focusInputSelect(minuteRef.current), [])
  const focusPeriod = useCallback(() => periodRef.current?.focus({ preventScroll: true }), [])
  const focusCancel = useCallback(() => cancelRef.current?.focus({ preventScroll: true }), [])
  const focusConfirm = useCallback(() => confirmRef.current?.focus({ preventScroll: true }), [])

  useEffect(() => {
    if (isControlled && valueProp != null) {
      setInternalConfirmed(cloneTime(valueProp))
    }
  }, [isControlled, valueProp])

  const syncTextFromDraft = useCallback((t: TimeValue) => {
    setHourText(String(t.hour))
    setMinuteText(pad2(t.minute))
    setMinuteCorrected(false)
  }, [])

  const openPanel = useCallback(() => {
    const base = cloneTime(confirmed)
    setDraft(base)
    syncTextFromDraft(base)
    setOpen(true)
  }, [confirmed, syncTextFromDraft])

  const applyCancel = useCallback(() => {
    closingIntent.current = 'cancel'
    setOpen(false)
  }, [])

  const applyConfirm = useCallback(() => {
    const next = cloneTime(draft)
    closingIntent.current = 'confirm'
    if (!isControlled) setInternalConfirmed(next)
    onChange?.(next)
    setOpen(false)
  }, [draft, isControlled, onChange])

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
      setDraft(cloneTime(confirmed))
      syncTextFromDraft(confirmed)
      closingIntent.current = null
      setOpen(false)
    },
    [confirmed, openPanel, syncTextFromDraft],
  )

  const updateDraft = useCallback((patch: Partial<TimeValue>) => {
    setDraft((prev) => {
      const next = { ...prev, ...patch }
      if (format === '12' && next.period == null) next.period = 'AM'
      return next
    })
  }, [format])

  const commitHourBlur = useCallback(() => {
    const parsed = parseHourInput(hourText, format)
    if (parsed == null) {
      setHourText(String(draft.hour))
      return
    }
    const normalized = normalizeHourInput(parsed, format)
    updateDraft({ hour: normalized })
    setHourText(String(normalized))
  }, [draft.hour, format, hourText, updateDraft])

  const commitMinuteBlur = useCallback(() => {
    const parsed = parseMinuteInput(minuteText)
    if (parsed == null) {
      setMinuteText(pad2(draft.minute))
      setMinuteCorrected(false)
      return
    }
    const raw = parsed
    const normalized = normalizeMinuteInput(raw)
    setMinuteCorrected(raw !== normalized)
    updateDraft({ minute: normalized })
    setMinuteText(pad2(normalized))
  }, [draft.minute, minuteText, updateDraft])

  const handleHourInput = useCallback(
    (raw: string) => {
      const digits = raw.replace(/\D/g, '').slice(0, 2)
      setHourText(digits)
      const parsed = parseHourInput(digits, format)
      if (parsed != null) updateDraft({ hour: parsed })
      if (digits.length >= 2) focusInputSelect(minuteRef.current)
    },
    [format, updateDraft],
  )

  const handleMinuteInput = useCallback(
    (raw: string) => {
      const digits = raw.replace(/\D/g, '').slice(0, 2)
      setMinuteText(digits)
      const parsed = parseMinuteInput(digits)
      if (parsed != null) {
        updateDraft({ minute: parsed })
        setMinuteCorrected(parsed > 59)
      } else {
        setMinuteCorrected(false)
      }
    },
    [updateDraft],
  )

  const stepHourField = useCallback(
    (direction: 1 | -1) => {
      const next = stepHour(draft.hour, direction, format)
      updateDraft({ hour: next })
      setHourText(String(next))
      if (document.activeElement === hourRef.current) {
        requestAnimationFrame(() => hourRef.current?.select())
      }
    },
    [draft.hour, format, updateDraft],
  )

  const stepMinuteField = useCallback(
    (direction: 1 | -1) => {
      const { hour, minute } = stepMinute(draft.hour, draft.minute, direction, minuteStep, format)
      updateDraft({ hour, minute })
      setHourText(String(hour))
      setMinuteText(pad2(minute))
      setMinuteCorrected(false)
      if (document.activeElement === minuteRef.current) {
        requestAnimationFrame(() => minuteRef.current?.select())
      }
    },
    [draft.hour, draft.minute, format, minuteStep, updateDraft],
  )

  const stepPeriodField = useCallback(
    (direction: 1 | -1) => {
      const period = draft.period ?? 'AM'
      const next = stepPeriod(period, direction)
      updateDraft({ period: next })
    },
    [draft.period, updateDraft],
  )

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => focusInputSelect(hourRef.current), 0)
    return () => window.clearTimeout(t)
  }, [open])

  const displayConfirmed =
    confirmed != null && (confirmed.hour !== undefined || confirmed.minute !== undefined)
      ? formatTimeDisplay(confirmed, format)
      : null

  const hourMin = format === '24' ? 0 : 1
  const hourMax = format === '24' ? 23 : 12

  const handlePanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      applyCancel()
    }
  }

  const handleConfirmKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      applyConfirm()
    }
  }

  const handleCancelKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      focusConfirm()
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault()
      if (format === '12') focusPeriod()
      else focusMinute()
    }
  }

  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-1.5', className)}>
      <span id={labelId} className={cn(labelBold, 'text-[var(--screening-text-primary)]')}>
        {label}
      </span>
      <p id={instructionsId} className="sr-only">
        {format === '24'
          ? '24-hour format. Use hours 0-23 and minutes 0-59. Steppers use 5-minute intervals. Confirm to save or Cancel to revert.'
          : '12-hour format. Use hours 1-12 and minutes 0-59. Change AM or PM with the period control. Confirm to save or Cancel to revert.'}
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
            <span className={cn('min-w-0 flex-1 truncate text-left', p1, !displayConfirmed && 'font-normal text-[var(--screening-text-muted)]')}>
              {displayConfirmed ?? placeholder}
            </span>
            <MaterialSymbol name="keyboard_arrow_down" className={cn('ml-auto text-[var(--screening-icon-muted)]', aceChevronIconClass)} />
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
              <div className="flex items-center justify-center gap-3">
                <TimeStepperColumn
                  label="Hours"
                  displayValue={pad2(draft.hour)}
                  inputValue={hourText}
                  onInputChange={handleHourInput}
                  onInputBlur={commitHourBlur}
                  onStepUp={() => stepHourField(1)}
                  onStepDown={() => stepHourField(-1)}
                  onArrowKey={stepHourField}
                  onEnter={applyConfirm}
                  onTabForward={focusMinute}
                  ariaMin={hourMin}
                  ariaMax={hourMax}
                  inputRef={hourRef}
                />
                <span className={cn(p1, 'select-none text-[var(--screening-text-primary)]')} aria-hidden>
                  :
                </span>
                <TimeStepperColumn
                  label="Minutes"
                  displayValue={pad2(draft.minute)}
                  inputValue={minuteText}
                  onInputChange={handleMinuteInput}
                  onInputBlur={commitMinuteBlur}
                  onStepUp={() => stepMinuteField(1)}
                  onStepDown={() => stepMinuteField(-1)}
                  onArrowKey={stepMinuteField}
                  onEnter={applyConfirm}
                  onTabForward={format === '12' ? focusPeriod : focusCancel}
                  onTabBackward={focusHour}
                  ariaMin={0}
                  ariaMax={59}
                  inputRef={minuteRef}
                />
                {format === '12' ? (
                  <PeriodStepperColumn
                    period={draft.period ?? 'AM'}
                    onStepUp={() => stepPeriodField(1)}
                    onStepDown={() => stepPeriodField(-1)}
                    onEnter={applyConfirm}
                    onTabForward={focusCancel}
                    onTabBackward={focusMinute}
                    focusRef={periodRef}
                  />
                ) : null}
              </div>

              {minuteCorrected ? (
                <p className="mt-2 text-center text-xs text-[var(--ace-input-error-message)]" role="status">
                  Minutes adjusted to the nearest valid value (0-59).
                </p>
              ) : null}

              <div className="mt-4 flex justify-end gap-2 border-t border-solid border-[var(--screening-border-soft)] pt-3">
                <AceButton
                  ref={cancelRef}
                  type="button"
                  variant="secondary"
                  palette="purple"
                  size="sm"
                  onClick={applyCancel}
                  onKeyDown={handleCancelKeyDown}
                >
                  Cancel
                </AceButton>
                <AceButton
                  ref={confirmRef}
                  type="button"
                  variant="primary"
                  palette="purple"
                  size="sm"
                  onClick={applyConfirm}
                  onKeyDown={handleConfirmKeyDown}
                >
                  Set
                </AceButton>
              </div>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
