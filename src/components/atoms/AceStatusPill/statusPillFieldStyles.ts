import { cn } from '../../../lib/cn'

export type AceStatusPillVariant =
  | 'purple'
  | 'orange'
  | 'green'
  | 'gray'
  | 'blue'
  | 'yellow'
  | 'pink'
  | 'teal'
  | 'red'

const labelClass = cn(
  '[font:var(--ace-type-caption-semi-bold)] [letter-spacing:var(--ace-type-caption-semi-bold-tracking)]',
  'leading-none',
)

const shellClass = cn(
  'inline-flex w-fit max-w-none shrink-0 items-center gap-[var(--ace-status-pill-gap)] rounded-full',
  'border border-solid py-[var(--ace-status-pill-py)] pl-[var(--ace-status-pill-pl)] pr-[var(--ace-status-pill-pr)]',
  'transition-colors duration-200 ease-out',
  labelClass,
  'whitespace-nowrap',
  'border-[var(--ace-status-pill-border)] bg-[var(--ace-status-pill-surface)] text-[var(--ace-status-pill-label)]',
)

const dotClass =
  'size-[var(--ace-status-pill-dot-size)] shrink-0 rounded-full bg-[var(--ace-status-pill-dot)]'

type StatusPillTokens = {
  border: string
  surface: string
  dot: string
  label: string
}

export const aceStatusPillVariantTokens: Record<AceStatusPillVariant, StatusPillTokens> = {
  purple: {
    border: 'var(--ace-status-pill-purple-border)',
    surface: 'var(--ace-status-pill-purple-surface)',
    dot: 'var(--ace-status-pill-purple-dot)',
    label: 'var(--ace-status-pill-purple-label)',
  },
  orange: {
    border: 'var(--ace-status-pill-orange-border)',
    surface: 'var(--ace-status-pill-orange-surface)',
    dot: 'var(--ace-status-pill-orange-dot)',
    label: 'var(--ace-status-pill-orange-label)',
  },
  green: {
    border: 'var(--ace-status-pill-green-border)',
    surface: 'var(--ace-status-pill-green-surface)',
    dot: 'var(--ace-status-pill-green-dot)',
    label: 'var(--ace-status-pill-green-label)',
  },
  gray: {
    border: 'var(--ace-status-pill-gray-border)',
    surface: 'var(--ace-status-pill-gray-surface)',
    dot: 'var(--ace-status-pill-gray-dot)',
    label: 'var(--ace-status-pill-gray-label)',
  },
  blue: {
    border: 'var(--ace-status-pill-blue-border)',
    surface: 'var(--ace-status-pill-blue-surface)',
    dot: 'var(--ace-status-pill-blue-dot)',
    label: 'var(--ace-status-pill-blue-label)',
  },
  yellow: {
    border: 'var(--ace-status-pill-yellow-border)',
    surface: 'var(--ace-status-pill-yellow-surface)',
    dot: 'var(--ace-status-pill-yellow-dot)',
    label: 'var(--ace-status-pill-yellow-label)',
  },
  pink: {
    border: 'var(--ace-status-pill-pink-border)',
    surface: 'var(--ace-status-pill-pink-surface)',
    dot: 'var(--ace-status-pill-pink-dot)',
    label: 'var(--ace-status-pill-pink-label)',
  },
  teal: {
    border: 'var(--ace-status-pill-teal-border)',
    surface: 'var(--ace-status-pill-teal-surface)',
    dot: 'var(--ace-status-pill-teal-dot)',
    label: 'var(--ace-status-pill-teal-label)',
  },
  red: {
    border: 'var(--ace-status-pill-red-border)',
    surface: 'var(--ace-status-pill-red-surface)',
    dot: 'var(--ace-status-pill-red-dot)',
    label: 'var(--ace-status-pill-red-label)',
  },
}

export function aceStatusPillShellClass() {
  return shellClass
}

export const aceStatusPillDotClass = dotClass

export const aceStatusPillLabelClass = 'shrink-0 min-w-0 truncate whitespace-nowrap'
