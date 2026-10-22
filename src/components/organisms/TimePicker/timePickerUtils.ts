export type TimePeriod = 'AM' | 'PM'
export type TimeFormat = '12' | '24'

export type TimeValue = {
  hour: number
  minute: number
  period?: TimePeriod
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

export function formatTimeDisplay(value: TimeValue, format: TimeFormat): string {
  if (format === '24') {
    return `${pad2(value.hour)} : ${pad2(value.minute)}`
  }
  const period = value.period ?? 'AM'
  return `${value.hour} : ${pad2(value.minute)} ${period}`
}

export function cloneTime(value: TimeValue): TimeValue {
  return { ...value }
}

export function timesEqual(a: TimeValue, b: TimeValue): boolean {
  return a.hour === b.hour && a.minute === b.minute && (a.period ?? 'AM') === (b.period ?? 'AM')
}

/** General default: 12:00 PM (12-hour) or 12:00 (24-hour). */
export function getGeneralDefault(format: TimeFormat): TimeValue {
  if (format === '24') return { hour: 12, minute: 0 }
  return { hour: 12, minute: 0, period: 'PM' }
}

/** Scheduling default: current time rounded up to the next minute step. */
export function getSchedulingDefault(minuteStep: number, format: TimeFormat): TimeValue {
  const now = new Date()
  let hour24 = now.getHours()
  let minute = now.getMinutes()
  const remainder = minute % minuteStep
  if (remainder !== 0) minute += minuteStep - remainder
  if (minute >= 60) {
    minute = 0
    hour24 = (hour24 + 1) % 24
  }
  return fromHour24(hour24, minute, format)
}

export function fromHour24(hour24: number, minute: number, format: TimeFormat): TimeValue {
  const m = clampMinute(minute)
  if (format === '24') return { hour: hour24, minute: m }
  const period: TimePeriod = hour24 >= 12 ? 'PM' : 'AM'
  let hour12 = hour24 % 12
  if (hour12 === 0) hour12 = 12
  return { hour: hour12, minute: m, period }
}

export function toHour24(value: TimeValue, format: TimeFormat): number {
  if (format === '24') return value.hour
  const period = value.period ?? 'AM'
  if (value.hour === 12) return period === 'AM' ? 0 : 12
  return period === 'PM' ? value.hour + 12 : value.hour
}

export function clampHour(hour: number, format: TimeFormat): number {
  if (format === '24') {
    if (hour < 0) return 0
    if (hour > 23) return 23
    return hour
  }
  if (hour < 1) return 1
  if (hour > 12) return 12
  return hour
}

export function clampMinute(minute: number): number {
  if (minute < 0) return 0
  if (minute > 59) return 59
  return minute
}

export function stepHour(hour: number, direction: 1 | -1, format: TimeFormat): number {
  if (format === '24') {
    let next = hour + direction
    if (next > 23) next = 0
    if (next < 0) next = 23
    return next
  }
  let next = hour + direction
  if (next > 12) next = 1
  if (next < 1) next = 12
  return next
}

export function highestMinuteStep(minuteStep: number): number {
  return Math.floor(59 / minuteStep) * minuteStep
}

export function stepMinute(
  hour: number,
  minute: number,
  direction: 1 | -1,
  minuteStep: number,
  format: TimeFormat,
): Pick<TimeValue, 'hour' | 'minute'> {
  let nextMinute = minute + direction * minuteStep
  let nextHour = hour

  if (nextMinute > 59) {
    nextMinute = 0
    nextHour = stepHour(hour, 1, format)
  } else if (nextMinute < 0) {
    nextMinute = highestMinuteStep(minuteStep)
    nextHour = stepHour(hour, -1, format)
  }

  return { hour: nextHour, minute: nextMinute }
}

export function togglePeriod(period: TimePeriod): TimePeriod {
  return period === 'AM' ? 'PM' : 'AM'
}

export function stepPeriod(period: TimePeriod, direction: 1 | -1): TimePeriod {
  if (direction === 1) return period === 'AM' ? 'PM' : 'AM'
  return period === 'PM' ? 'AM' : 'PM'
}

export function parseHourInput(raw: string, _format?: TimeFormat): number | null {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  const n = Number(digits)
  if (Number.isNaN(n)) return null
  return n
}

export function parseMinuteInput(raw: string): number | null {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  const n = Number(digits)
  if (Number.isNaN(n)) return null
  return n
}

export function normalizeHourInput(value: number, format: TimeFormat): number {
  return clampHour(value, format)
}

export function normalizeMinuteInput(value: number): number {
  return clampMinute(value)
}
