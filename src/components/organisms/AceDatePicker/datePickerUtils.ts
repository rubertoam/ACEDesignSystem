export type DateRangeValue = {
  start: Date
  end: Date
}

export type PartialDateRange = {
  start: Date
  end?: Date
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function cloneDate(date: Date): Date {
  return new Date(date.getTime())
}

export function compareDays(a: Date, b: Date): number {
  return startOfDay(a).getTime() - startOfDay(b).getTime()
}

export function isSameDay(a: Date, b: Date): boolean {
  return compareDays(a, b) === 0
}

export function isToday(date: Date, today = startOfDay(new Date())): boolean {
  return isSameDay(date, today)
}

export function normalizeRange(start: Date, end: Date): DateRangeValue {
  const a = startOfDay(start)
  const b = startOfDay(end)
  if (compareDays(a, b) <= 0) return { start: a, end: b }
  return { start: b, end: a }
}

export function formatDateLabel(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function formatRangeDisplay(
  range: PartialDateRange | DateRangeValue | null,
  options?: { partialEndLabel?: boolean },
): string | null {
  if (!range) return null
  if (!('end' in range) || range.end == null) {
    if (options?.partialEndLabel) return `${formatDateLabel(range.start)} - End`
    return formatDateLabel(range.start)
  }
  return `${formatDateLabel(range.start)} - ${formatDateLabel(range.end)}`
}

export function addMonths(anchor: Date, delta: number): Date {
  return new Date(anchor.getFullYear(), anchor.getMonth() + delta, 1)
}

export function monthTitle(monthAnchor: Date): string {
  return monthAnchor.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()
}

export type CalendarDayCell = {
  date: Date
  inMonth: boolean
}

export function buildMonthGrid(year: number, month: number): CalendarDayCell[] {
  const firstOfMonth = new Date(year, month, 1)
  const leading = firstOfMonth.getDay()
  const gridStart = new Date(year, month, 1 - leading)
  const cells: CalendarDayCell[] = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i)
    cells.push({ date, inMonth: date.getMonth() === month })
  }
  return cells
}

export function isBetweenRange(date: Date, start: Date, end: Date): boolean {
  const d = compareDays(date, start)
  const e = compareDays(date, end)
  return d > 0 && e < 0
}

export function resolveRangeEndpoints(
  start: Date | null,
  end: Date | null,
  hover: Date | null,
): { start: Date | null; end: Date | null } {
  if (!start) return { start: null, end: null }
  if (end) return { start, end }
  if (!hover) return { start, end: null }
  const normalized = normalizeRange(start, hover)
  return { start: normalized.start, end: normalized.end }
}
