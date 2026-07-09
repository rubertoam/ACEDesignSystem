import type { SortKey } from './screeningTableTypes'

export type ScreeningColumnKey = SortKey

export const SCREENING_COLUMN_DEFINITIONS: ReadonlyArray<{
  key: ScreeningColumnKey
  label: string
}> = [
  { key: 'status', label: 'Status' },
  { key: 'name', label: 'Name' },
  { key: 'dob', label: 'Date of Birth' },
  { key: 'matchAge', label: 'Match Age' },
  { key: 'matchScore', label: 'Match Score' },
  { key: 'matchString', label: 'Match String' },
]

export const DEFAULT_VISIBLE_SCREENING_COLUMNS = new Set<ScreeningColumnKey>(
  SCREENING_COLUMN_DEFINITIONS.map((column) => column.key),
)

export const DEFAULT_SCREENING_COLUMN_ORDER: ScreeningColumnKey[] = SCREENING_COLUMN_DEFINITIONS.map(
  (column) => column.key,
)
