import { cn } from '../../../lib/cn'

export type ScreeningRowStatus = 'New' | 'Escalated'

export type ScreeningResultRow = {
  id: string
  name: string
  dob: string
  matchAgeLabel: string
  matchAgeTone: 'fresh' | 'warn' | 'stale'
  matchScore: number
  matchTiles: string[]
  status: ScreeningRowStatus
}

const CASE_RESULT_COUNTS = [8, 8, 7, 5, 3, 2] as const

const CASE_VARIANT_NAMES: readonly (readonly string[])[] = [
  ['John Smith', 'John A. Smith', 'J. Smith', 'Smith, John', 'Johnny Smith', 'Jon P. Smith', 'John Smyth', 'Smith, Johnathan'],
  [
    'Mr. Jose A Gonzalez',
    'Jose Antonio Gonzalez',
    'J. A. Gonzalez',
    'Gonzalez, Jose',
    'Jose A. Gonzales',
    'J. Gonzalez',
    'Jose González',
    'Gonzalez Jose',
  ],
  [
    'Muammar Qadhafi',
    'Muammar Gaddafi',
    'Moammar Qaddafi',
    'Qadhafi, Muammar',
    'Kadhafi Muammar',
    'Al-Qadhafi Muammar',
    'Muammar Al Qathafi',
  ],
  ['Jane Doe', 'J. Doe', 'Doe, Jane', 'Janet Doe', 'Jane D. Oe'],
  ['Bank of Iran', 'Bank Melli Iran', 'Iranian Banking Corp.'],
  ['Bank of Moscow', 'Moscow Joint Stock Bank'],
]

const AGE_LABELS = ['4h', '9h', '12h', '18h', '22h', '1d', '2d', '3d'] as const
const TONE_ROTATION: ScreeningResultRow['matchAgeTone'][] = [
  'fresh',
  'fresh',
  'warn',
  'warn',
  'stale',
  'stale',
  'stale',
  'fresh',
]

const TILE_ROTATIONS = [
  ['E', 'B', 'N', 'C1', 'E', 'N', 'B'],
  ['E', 'N', 'C2', 'B', 'E', 'N', 'N'],
  ['N', 'B', 'C1', 'E', 'N', 'B', 'E'],
  ['E', 'E', 'N', 'C2', 'B', 'N', 'N'],
  ['N', 'C1', 'B', 'E', 'N', 'B', 'B'],
] as const

function rowStatusForIndex(index: number, total: number, caseIndex: number): ScreeningRowStatus {
  if (caseIndex === 4 && total === 3) {
    return index === 2 ? 'Escalated' : 'New'
  }
  if (caseIndex === 1 && total === 8) {
    return index === 0 ? 'New' : 'Escalated'
  }
  if (caseIndex === 2 && total === 7) {
    return index < 2 ? 'New' : 'Escalated'
  }
  if (total >= 3 && index >= total - 3) return 'Escalated'
  if (total < 3 && index === total - 1) return 'Escalated'
  return 'New'
}

function dobForCase(caseIndex: number): string {
  const dobs = ['03/23/1978', '04/11/1985', '06/07/1942', '09/14/1992', '—', '—']
  return dobs[Math.min(caseIndex, dobs.length - 1)]
}

export function getScreeningRowsForCase(caseIndex: number): ScreeningResultRow[] {
  const ci = Math.max(0, Math.min(caseIndex, CASE_RESULT_COUNTS.length - 1))
  const total = CASE_RESULT_COUNTS[ci]
  const names = CASE_VARIANT_NAMES[ci]
  const rows: ScreeningResultRow[] = []
  for (let i = 0; i < total; i++) {
    const name = names[Math.min(i, names.length - 1)]
    const score = Math.max(22, 93 - i * 7 - (ci % 3) * 2)
    const tiles = TILE_ROTATIONS[i % TILE_ROTATIONS.length]
    rows.push({
      id: `c${ci}-${i + 1}`,
      name,
      dob: dobForCase(ci),
      matchAgeLabel: AGE_LABELS[i % AGE_LABELS.length],
      matchAgeTone: TONE_ROTATION[i % TONE_ROTATION.length],
      matchScore: score,
      matchTiles: [...tiles],
      status: rowStatusForIndex(i, total, ci),
    })
  }
  return rows
}

export const MOCK_ROWS: ScreeningResultRow[] = getScreeningRowsForCase(0)

export const MATCH_KEY_ITEMS: {
  code: string
  label: string
  bg: string
  fg: string
  border: string
}[] = [
  { code: 'E', label: 'Equal', bg: 'var(--screening-tile-e-bg)', fg: 'var(--screening-tile-e-fg)', border: 'var(--screening-tile-e-border)' },
  { code: 'N', label: 'Not Equal', bg: 'var(--screening-tile-n-bg)', fg: 'var(--screening-tile-n-fg)', border: 'var(--screening-tile-n-border)' },
  { code: 'C1', label: 'Very Close', bg: 'var(--screening-tile-c1-bg)', fg: 'var(--screening-tile-c1-fg)', border: 'var(--screening-tile-c1-border)' },
  { code: 'C2', label: 'Close', bg: 'var(--screening-tile-c2-bg)', fg: 'var(--screening-tile-c2-fg)', border: 'var(--screening-tile-c2-border)' },
  { code: 'B', label: 'Blank', bg: 'var(--screening-tile-b-bg)', fg: 'var(--screening-tile-b-fg)', border: 'var(--screening-tile-b-border)' },
]

export function scoreIsHighRisk(score: number): boolean {
  return score >= 85
}

export function tileSoftStyle(code: string): { bg: string; fg: string; border: string } {
  const upper = code.toUpperCase()
  if (upper === 'E') {
    return { bg: 'var(--screening-tile-e-bg)', fg: 'var(--screening-tile-e-fg)', border: 'var(--screening-tile-e-border)' }
  }
  if (upper === 'N') {
    return { bg: 'var(--screening-tile-n-bg)', fg: 'var(--screening-tile-n-fg)', border: 'var(--screening-tile-n-border)' }
  }
  if (upper === 'C1' || upper === 'C') {
    return { bg: 'var(--screening-tile-c1-bg)', fg: 'var(--screening-tile-c1-fg)', border: 'var(--screening-tile-c1-border)' }
  }
  if (upper === 'C2') {
    return { bg: 'var(--screening-tile-c2-bg)', fg: 'var(--screening-tile-c2-fg)', border: 'var(--screening-tile-c2-border)' }
  }
  if (upper === 'B') {
    return { bg: 'var(--screening-tile-b-bg)', fg: 'var(--screening-tile-b-fg)', border: 'var(--screening-tile-b-border)' }
  }
  return { bg: 'var(--screening-tile-b-bg)', fg: 'var(--screening-tile-b-fg)', border: 'var(--screening-tile-b-border)' }
}

export function showMatchAgeStaleIndicator(tone: ScreeningResultRow['matchAgeTone']): boolean {
  return tone === 'stale'
}

export function ageDotClass(tone: ScreeningResultRow['matchAgeTone']): string {
  if (showMatchAgeStaleIndicator(tone)) return 'bg-[var(--screening-age-stale)]'
  return ''
}

export function parseAgeForSort(label: string): number {
  const m = label.match(/^(\d+(?:\.\d+)?)\s*(h|d|w|m|y)?$/i)
  if (!m) return 0
  const n = Number.parseFloat(m[1])
  const u = (m[2] || 'h').toLowerCase()
  const mult =
    u === 'h' ? 1 : u === 'd' ? 24 : u === 'w' ? 24 * 7 : u === 'm' ? 24 * 30 : u === 'y' ? 24 * 365 : 1
  return n * mult
}

/** Disabled / completed screening rows — italic body text (Review Assigned pattern). */
export const screeningDisabledRowClass = cn(
  'bg-[var(--screening-surface-row-muted)]',
  '[&_td]:italic [&_td_*]:italic',
  '[&_td]:!text-[var(--ace-button-neutral-600)] [&_td_*]:!text-[var(--ace-button-neutral-600)]',
)
