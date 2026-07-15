import { useState, type ReactNode } from 'react'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import {
  AceDatePicker,
  type AceDatePickerMode,
  type DateRangeValue,
} from '../components/organisms/AceDatePicker/AceDatePicker'
import { formatDateLabel, formatRangeDisplay } from '../components/organisms/AceDatePicker/datePickerUtils'
import { AceTimePicker, type TimeFormat, type TimeValue } from '../components/organisms/AceTimePicker/AceTimePicker'
import { formatTimeDisplay, fromHour24, toHour24 } from '../components/organisms/AceTimePicker/timePickerUtils'
import { LabCheckbox, LabSelect } from '../lib/labControls'
import { cn } from '../lib/cn'
import { labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import timePickerRules from './implementationRules/timePicker.md?raw'

const DATE_MODE_OPTIONS = [
  { value: 'single' as const, label: 'Single date' },
  { value: 'range' as const, label: 'Date range' },
]

const labComponentContainerClass = cn(
  'flex w-full min-w-0 flex-col gap-[var(--ace-section-label-gap)] rounded-[var(--radius-lg)]',
  'border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)]',
  'p-4 shadow-[var(--ace-drop-shadow-xs)] sm:p-5',
)

const labControlsPanelClass =
  'flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--screening-border-soft)] bg-[var(--screening-surface-elevated)] p-4'

function LabControlsPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={labControlsPanelClass}>
      <h4 className="m-0 text-sm font-bold leading-[1.65] text-[var(--ace-neutral-800)]">{title}</h4>
      {children}
    </div>
  )
}

export function DateAndTimePickersLab() {
  const [format, setFormat] = useState<TimeFormat>('12')
  const [time, setTime] = useState<TimeValue | null>(null)
  const [dateMode, setDateMode] = useState<AceDatePickerMode>('single')
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

  const timePickerControls = (
    <LabControlsPanel title="Time picker">
      <p className="m-0 max-w-xl text-xs leading-relaxed text-[var(--screening-text-muted)]">
        Scheduling time control from node 419:3011.
      </p>
      <label className="flex w-fit cursor-pointer items-center gap-2.5">
        <Toggle
          size="sm"
          checked={format === '24'}
          onCheckedChange={handleFormatChange}
          aria-label="Use 24-hour clock"
        />
        <span className="text-sm text-[var(--screening-text-primary)]">24-hour clock</span>
      </label>
      {time ? (
        <p className="m-0 text-xs text-[var(--screening-text-muted)]">
          Last confirmed:{' '}
          <strong className="text-[var(--screening-text-primary)]">{formatTimeDisplay(time, format)}</strong>
        </p>
      ) : null}
    </LabControlsPanel>
  )

  const datePickerControls = (
    <LabControlsPanel title="Date picker">
      <p className="m-0 max-w-xl text-xs leading-relaxed text-[var(--screening-text-muted)]">
        Range and single-date modes from node 419:3010. Choose the mode below to switch the preview.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <LabSelect
          label="Mode"
          value={dateMode}
          onChange={setDateMode}
          options={DATE_MODE_OPTIONS}
          className="max-w-xs"
        />
        <div className="flex items-end pb-1">
          <LabCheckbox label="Disabled" checked={dateDisabled} onCheckedChange={setDateDisabled} />
        </div>
      </div>
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
    </LabControlsPanel>
  )

  return (
    <ComponentLabPage
      title="Date and time pickers"
      description="Organism-level scheduling controls. Time and date pickers use ACE field triggers and dropdown panels with Reset, Cancel, and Set footers."
      examplesCanvas={false}
      examples={
        <div className="flex flex-col gap-10">
          <div className={labComponentContainerClass}>
            {timePickerControls}
            <AceTimePicker
              key={format}
              label="Select Time"
              format={format}
              onChange={setTime}
              defaultMode="general"
            />
          </div>

          <div className={labComponentContainerClass}>
            {datePickerControls}
            {dateMode === 'range' ? (
              <AceDatePicker
                key="range"
                mode="range"
                label="Select Date"
                disabled={dateDisabled}
                onChange={setDateRange}
              />
            ) : (
              <AceDatePicker
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
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Import <code className="text-[var(--screening-text-primary)]">AceTimePicker</code> or{' '}
            <code className="text-[var(--screening-text-primary)]">AceDatePicker</code>. Use{' '}
            <code className="text-[var(--screening-text-primary)]">mode="range"</code> or{' '}
            <code className="text-[var(--screening-text-primary)]">mode="single"</code>.
          </p>
          <ComponentLabCode>{`import { AceTimePicker } from '../components/organisms/AceTimePicker/AceTimePicker'
import { AceDatePicker } from '../components/organisms/AceDatePicker/AceDatePicker'

<AceTimePicker label="Select Time" format="12" onChange={setTime} />

<AceDatePicker mode="range" label="Select Date" onChange={setRange} />
<AceDatePicker mode="single" label="Select Date" onChange={setDate} />`}</ComponentLabCode>
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
                <code className="text-[var(--screening-text-primary)]">--ace-time-picker-*</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-date-picker-*</code>
              </li>
            </ul>
          </section>
        </>
      }
      implementationRulesMarkdown={timePickerRules}
    />
  )
}
