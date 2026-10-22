import { cn } from '../../../lib/cn'

/** Color palette for status badges (Review Assigned screening table). */
export type BadgeVariant =
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
export type BadgeAppearance = 'pill' | 'tag' | 'status'

type BadgeTokens = {
  border: string
  surface: string
  dot: string
  label: string
}

/** Figma Badge pill shell — px 8, py 2, gap 6, rounded-full; colors via CSS vars. */
export const badgeStatusShellClass = cn(
  'inline-flex w-fit max-w-none shrink-0 items-center gap-[var(--badge-gap)] whitespace-nowrap rounded-[var(--badge-radius,var(--radius-component-badge))]',
  'border border-solid border-[var(--badge-border)] bg-[var(--badge-surface)]',
  'px-[var(--badge-px)] py-[var(--badge-py)]',
  'transition-colors duration-200 ease-out',
)

/** Figma Badge tag shell — same padding as pill; 4px radius; no leading dot. */
export const badgeTagShellClass = cn(
  'inline-flex w-fit max-w-none shrink-0 items-center gap-[var(--badge-tag-gap)] whitespace-nowrap',
  'rounded-[var(--badge-tag-radius)] border border-solid',
  'border-[var(--badge-tag-border)] bg-[var(--badge-tag-surface)]',
  'px-[var(--badge-tag-px)] py-[var(--badge-tag-py)]',
  'transition-colors duration-200 ease-out',
)

export const badgeStatusDotClass =
  'size-[var(--badge-dot-size)] shrink-0 rounded-full bg-[var(--badge-dot)]'

/** Caption Regular — Figma Badge label. */
export const badgeStatusLabelClass = cn(
  'shrink-0 whitespace-nowrap',
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'text-[var(--badge-label)]',
)

/** Same Caption Regular treatment as pills; color from variant tokens. */
export const badgeTagLabelClass = cn(
  'shrink-0 whitespace-nowrap',
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'text-[var(--badge-tag-label)]',
)

export const badgeWarningIconClass = cn(
  'inline-flex size-[var(--badge-tag-warning-icon-size)] shrink-0 items-center justify-center rounded-full',
  'bg-[var(--badge-tag-warning-icon-bg)]',
  '[font:var(--ace-type-footer-02-bold)] [letter-spacing:var(--ace-type-footer-02-bold-tracking)]',
  'text-[var(--badge-tag-warning-icon-fg)]',
)

export const badgeVariantTokens: Record<BadgeVariant, BadgeTokens> = {
  purple: {
    border: 'var(--badge-purple-border)',
    surface: 'var(--badge-purple-surface)',
    dot: 'var(--badge-purple-dot)',
    label: 'var(--badge-purple-label)',
  },
  orange: {
    border: 'var(--badge-orange-border)',
    surface: 'var(--badge-orange-surface)',
    dot: 'var(--badge-orange-dot)',
    label: 'var(--badge-orange-label)',
  },
  green: {
    border: 'var(--badge-green-border)',
    surface: 'var(--badge-green-surface)',
    dot: 'var(--badge-green-dot)',
    label: 'var(--badge-green-label)',
  },
  gray: {
    border: 'var(--badge-gray-border)',
    surface: 'var(--badge-gray-surface)',
    dot: 'var(--badge-gray-dot)',
    label: 'var(--badge-gray-label)',
  },
  blue: {
    border: 'var(--badge-blue-border)',
    surface: 'var(--badge-blue-surface)',
    dot: 'var(--badge-blue-dot)',
    label: 'var(--badge-blue-label)',
  },
  yellow: {
    border: 'var(--badge-yellow-border)',
    surface: 'var(--badge-yellow-surface)',
    dot: 'var(--badge-yellow-dot)',
    label: 'var(--badge-yellow-label)',
  },
  pink: {
    border: 'var(--badge-pink-border)',
    surface: 'var(--badge-pink-surface)',
    dot: 'var(--badge-pink-dot)',
    label: 'var(--badge-pink-label)',
  },
  teal: {
    border: 'var(--badge-teal-border)',
    surface: 'var(--badge-teal-surface)',
    dot: 'var(--badge-teal-dot)',
    label: 'var(--badge-teal-label)',
  },
  red: {
    border: 'var(--badge-red-border)',
    surface: 'var(--badge-red-surface)',
    dot: 'var(--badge-red-dot)',
    label: 'var(--badge-red-label)',
  },
}

/** Neutral meta tag (Client ID, country, DOB). */
export const badgeTagNeutralTokens = {
  border: 'var(--badge-tag-border)',
  surface: 'var(--badge-tag-surface)',
  label: 'var(--badge-tag-label)',
} as const

/** Overdue warning tag (client profile accordion). */
export const badgeTagWarningTokens = {
  border: 'var(--badge-tag-warning-border)',
  surface: 'var(--badge-tag-warning-surface)',
  label: 'var(--badge-tag-warning-label)',
} as const

/** @deprecated Use `badgeStatusShellClass`. */
export function badgeShellClass() {
  return badgeStatusShellClass
}

/** @deprecated Use `badgeStatusDotClass`. */
export const badgeDotClass = badgeStatusDotClass

/** @deprecated Use `badgeStatusLabelClass`. */
export const badgeLabelClass = badgeStatusLabelClass
