import { cn } from '../../../lib/cn'

/** Color palette for status badges (Review Assigned screening table). */
export type AceBadgeVariant =
  | 'purple'
  | 'orange'
  | 'green'
  | 'gray'
  | 'blue'
  | 'yellow'
  | 'pink'
  | 'teal'
  | 'red'

/** `pill` = table status pill; `tag` = client profile meta tag (same color variants). `status` is a deprecated alias for `pill`. */
export type AceBadgeAppearance = 'pill' | 'tag' | 'status'

/** @deprecated Use `AceBadgeVariant`. */
export type AceStatusPillVariant = AceBadgeVariant

type BadgeTokens = {
  border: string
  surface: string
  dot: string
  label: string
}

/** Review Assigned `statusPillShellClass` — layout only; colors via CSS vars. */
export const aceBadgeStatusShellClass = cn(
  'inline-flex w-fit max-w-none shrink-0 items-center gap-[var(--ace-status-pill-gap)] whitespace-nowrap rounded-full',
  'border border-solid border-[var(--ace-status-pill-border)] bg-[var(--ace-status-pill-surface)]',
  'py-[var(--ace-status-pill-py)] pl-[var(--ace-status-pill-pl)] pr-[var(--ace-status-pill-pr)]',
  'transition-colors duration-200 ease-out',
)

/** Review Assigned `ReviewMetaTag` / client profile accordion tags. */
export const aceBadgeTagShellClass = cn(
  'inline-flex w-fit max-w-none shrink-0 items-center gap-[var(--ace-badge-tag-gap)] whitespace-nowrap',
  'rounded-[var(--ace-badge-tag-radius)] border border-solid',
  'border-[var(--ace-badge-tag-border)] bg-[var(--ace-badge-tag-surface)]',
  'px-[var(--ace-badge-tag-px)] py-[var(--ace-badge-tag-py)]',
  'transition-colors duration-200 ease-out',
)

export const aceBadgeStatusDotClass =
  'size-[var(--ace-status-pill-dot-size)] shrink-0 rounded-full bg-[var(--ace-status-pill-dot)]'

/** Status pill label — Regular, 11px → 12px at sm, leading-none. */
export const aceBadgeStatusLabelClass = cn(
  'shrink-0 whitespace-nowrap font-[family-name:var(--font-ace-noto)] font-normal leading-none',
  'text-[length:var(--ace-status-pill-label-size)] sm:text-[length:var(--ace-status-pill-label-size-sm)]',
  'text-[var(--ace-status-pill-label)]',
)

/** Meta tag label — Caption Regular (not bold). */
export const aceBadgeTagLabelClass = cn(
  'shrink-0 whitespace-nowrap',
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'text-[var(--ace-badge-tag-label)]',
)

export const aceBadgeWarningIconClass = cn(
  'inline-flex size-[var(--ace-badge-tag-warning-icon-size)] shrink-0 items-center justify-center rounded-full',
  'bg-[var(--ace-badge-tag-warning-icon-bg)] font-[family-name:var(--font-ace-noto)] font-bold leading-none',
  'text-[length:var(--ace-badge-tag-warning-icon-text-size)] text-[var(--ace-badge-tag-warning-icon-fg)]',
)

export const aceBadgeVariantTokens: Record<AceBadgeVariant, BadgeTokens> = {
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

/** Neutral meta tag (Client ID, country, DOB). */
export const aceBadgeTagNeutralTokens = {
  border: 'var(--ace-badge-tag-border)',
  surface: 'var(--ace-badge-tag-surface)',
  label: 'var(--ace-badge-tag-label)',
} as const

/** Overdue warning tag (client profile accordion). */
export const aceBadgeTagWarningTokens = {
  border: 'var(--ace-badge-tag-warning-border)',
  surface: 'var(--ace-badge-tag-warning-surface)',
  label: 'var(--ace-badge-tag-warning-label)',
} as const

/** @deprecated Use `aceBadgeVariantTokens`. */
export const aceStatusPillVariantTokens = aceBadgeVariantTokens

/** @deprecated Use `aceBadgeStatusShellClass`. */
export function aceStatusPillShellClass() {
  return aceBadgeStatusShellClass
}

/** @deprecated Use `aceBadgeStatusDotClass`. */
export const aceStatusPillDotClass = aceBadgeStatusDotClass

/** @deprecated Use `aceBadgeStatusLabelClass`. */
export const aceStatusPillLabelClass = aceBadgeStatusLabelClass
