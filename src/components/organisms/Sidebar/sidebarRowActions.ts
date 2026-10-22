import { cn } from '../../../lib/cn'

const motionEase = '[transition-timing-function:var(--ace-motion-ease-standard)]'
const motionReduce = 'motion-reduce:transition-none motion-reduce:duration-0'

/**
 * Iconography “No border stroke” (Figma Iconography).
 * Rest: transparent + transparent border (avoids layout shift).
 * Hover: `--icon-button-hover-bg` + `--icon-button-border` (color/bg/primary + color/border/default).
 */
export const sidebarIconButtonClass = cn(
  'relative z-[1] inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'border border-solid border-transparent',
  'text-[var(--icon-button-icon-rest-ghost)]',
  'transition-[opacity,background-color,border-color,color]',
  'duration-[var(--ace-motion-duration-medium)]',
  motionEase,
  motionReduce,
  'hover:border-[var(--icon-button-border)] hover:bg-[var(--icon-button-hover-bg)] hover:text-[var(--icon-button-icon)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

/**
 * Iconography “Border stroke” (Figma Iconography).
 * Rest: surface + soft border + icon primary.
 * Hover: same border, `--icon-button-hover-bg`.
 */
export const sidebarIconButtonBorderedClass = cn(
  'relative z-[1] inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-solid',
  'border-[var(--icon-button-border)] bg-[var(--icon-button-surface)] text-[var(--icon-button-icon)]',
  'transition-[opacity,background-color,border-color,color]',
  'duration-[var(--ace-motion-duration-medium)]',
  motionEase,
  motionReduce,
  'hover:border-[var(--icon-button-border)] hover:bg-[var(--icon-button-hover-bg)] hover:text-[var(--icon-button-icon)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

/** Shared 16px row actions (plus, overflow) — revealed on row/header hover */
export const sidebarRowActionButtonClass = cn(
  sidebarIconButtonClass,
  'opacity-0',
  'group-hover/row:opacity-100 group-hover/header:opacity-100',
  'group-focus-within/row:opacity-100 group-focus-within/header:opacity-100',
  'focus-visible:opacity-100',
)

/** Keep add visible on open groups (container hover must not hide it). */
export const sidebarRowActionButtonExpandedClass = 'opacity-100'

export const sidebarRowActionIconClass = 'shrink-0 text-current'
