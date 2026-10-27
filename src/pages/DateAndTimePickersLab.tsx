import { useState } from 'react'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { aceToggleLabelClass } from '../components/atoms/Toggle/toggleFieldStyles'
import {
  DatePicker,
  type DatePickerMode,
  type DateRangeValue,
} from '../components/organisms/DatePicker/DatePicker'
import { formatDateLabel, formatRangeDisplay } from '../components/organisms/DatePicker/datePickerUtils'
import { TimePicker, type TimeFormat, type TimeValue } from '../components/organisms/TimePicker/TimePicker'
import { formatTimeDisplay, fromHour24, toHour24 } from '../components/organisms/TimePicker/timePickerUtils'
import { LabControlField, LabSelect } from '../lib/labControls'
import { labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

import timePickerRules from './implementationRules/timePicker.md?raw'

const DATE_MODE_OPTIONS = [
  { value: 'single' as const, label: 'Single date' },
  { value: 'range' as const, label: 'Date range' },
]

export function DateAndTimePickersLab() {
  const [format, setFormat] = useState<TimeFormat>('12')
  const [time, setTime] = useState<TimeValue | null>(null)
  const [dateMode, setDateMode] = useState<DatePickerMode>('single')
  const [dateRange, setDateRange] = useState<DateRangeValue | null>(null)
  const [singleDate, setSingleDate] = useState<Date | null>(null)
  const [dateDisabled, setDateDisabled] = useState(false)

  const handleFormatChange = (use24Hour: boolean) => {
    const nextFormat: TimeFormat = use24Hour ? '24' : '12'
    setFormat(nextFormat)
    if (time) {
      const hour24 = toHour24(time, format)
      setTime(fromHour24(hour24, time.minute, nextFormat))
    }
  }

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-start gap-x-5 gap-y-4">
        <LabSelect label="Mode" value={dateMode} onChange={setDateMode} options={DATE_MODE_OPTIONS} />
        <LabControlField label="24-hour clock" className="shrink-0">
          <div className="flex min-h-9 items-center gap-2">
            <Toggle
              size="sm"
              checked={format === '24'}
              onCheckedChange={handleFormatChange}
              aria-label="Use 24-hour clock"
            />
            <span className={aceToggleLabelClass}>{format === '24' ? 'On' : 'Off'}</span>
          </div>
        </LabControlField>
        <LabControlField label="Disabled" className="shrink-0">
          <div className="flex min-h-9 items-center gap-2">
            <Toggle
              size="sm"
              checked={dateDisabled}
              onCheckedChange={setDateDisabled}
              aria-label="Disabled"
            />
            <span className={aceToggleLabelClass}>{dateDisabled ? 'On' : 'Off'}</span>
          </div>
        </LabControlField>
      </div>

      <div className="flex flex-col gap-8 border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="flex flex-col gap-3">
          <p className={labSectionLabelClass}>Time picker</p>
          {time ? (
            <p className="m-0 text-xs text-[var(--screening-text-muted)]">
              Last confirmed:{' '}
              <strong className="text-[var(--screening-text-primary)]">{formatTimeDisplay(time, format)}</strong>
            </p>
          ) : null}
          <TimePicker
            key={format}
            label="Select Time"
            format={format}
            onChange={setTime}
            defaultMode="general"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className={labSectionLabelClass}>Date picker</p>
          {dateMode === 'range' && dateRange ? (
            <p className="m-0 text-xs text-[var(--screening-text-muted)]">
              Last confirmed:{' '}
              <strong className="text-[var(--screening-text-primary)]">{formatRangeDisplay(dateRange)}</strong>
            </p>
          ) : null}
          {dateMode === 'single' && singleDate ? (
            <p className="m-0 text-xs text-[var(--screening-text-muted)]">
              Last confirmed:{' '}
              <strong className="text-[var(--screening-text-primary)]">{formatDateLabel(singleDate)}</strong>
            </p>
          ) : null}
          {dateMode === 'range' ? (
            <DatePicker
              key="range"
              mode="range"
              label="Select Date"
              disabled={dateDisabled}
              onChange={setDateRange}
            />
          ) : (
            <DatePicker
              key="single"
              mode="single"
              label="Select Date"
              placeholder="Select date"
              disabled={dateDisabled}
              onChange={setSingleDate}
            />
          )}
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      title="Date and time pickers"
      description="Organism-level scheduling controls. Time and date pickers use ACE field triggers and dropdown panels with Reset, Cancel, and Set footers."
      examplesCanvas={false}
      examplesToolbar={toolbar}
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Import <code className="text-[var(--screening-text-primary)]">TimePicker</code> or{' '}
            <code className="text-[var(--screening-text-primary)]">DatePicker</code>. Use{' '}
            <code className="text-[var(--screening-text-primary)]">mode="range"</code> or{' '}
            <code className="text-[var(--screening-text-primary)]">mode="single"</code>.
          </p>
          <ComponentLabCode>{`import { TimePicker } from '../components/organisms/TimePicker/TimePicker'
import { DatePicker } from '../components/organisms/DatePicker/DatePicker'

<TimePicker label="Select Time" format="12" onChange={setTime} />

<DatePicker mode="range" label="Select Date" onChange={setRange} />
<DatePicker mode="single" label="Select Date" onChange={setDate} />`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Time picker</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>Hour step: ±1 (12h: 1-12 wrap; 24h: 0-23 wrap). AM/PM never auto-flips on hour rollover.</li>
              <li>Minute step: ±5 with carry into hours (55 → 00 +1h; 00 → 55 −1h).</li>
              <li>Tab to Set, then Enter (or click Set) to confirm; Escape / Cancel / outside click reverts.</li>
            </ul>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Date picker</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <code className="text-[var(--screening-text-primary)]">mode="range"</code> - dual-month range;
                first click start, second end.
              </li>
              <li>
                <code className="text-[var(--screening-text-primary)]">mode="single"</code> - one month, one date.
              </li>
              <li>Footer: Reset (tertiary, left), Cancel (secondary), Set (primary).</li>
            </ul>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Tokens</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <code className="text-[var(--screening-text-primary)]">--time-picker-*</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--date-picker-*</code>
              </li>
            </ul>
          </section>
        </>
      }
      implementationRulesMarkdown={timePickerRules}
    />
  )
}
