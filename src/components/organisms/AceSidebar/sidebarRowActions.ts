import { cn } from '../../../lib/cn'

const motionEase = '[transition-timing-function:var(--ace-motion-ease-standard)]'
const motionReduce = 'motion-reduce:transition-none motion-reduce:duration-0'

/** Shared 16px row actions (plus, overflow) — revealed on row/header hover */
export const sidebarRowActionButtonClass = cn(
  'relative z-[1] inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--ace-sidebar-menu-icon)] opacity-0',
  'transition-[opacity,background-color,box-shadow,color]',
  'duration-[var(--ace-motion-duration-medium)]',
  motionEase,
  motionReduce,
  'hover:bg-[var(--ace-sidebar-row-action-hover-bg)] hover:shadow-[0_0_0_1px_var(--screening-border-strong)]',
  'group-hover/row:opacity-100 group-hover/header:opacity-100',
  'group-focus-within/row:opacity-100 group-focus-within/header:opacity-100',
  'focus-visible:opacity-100',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

/** Keep add visible on open groups (container hover must not hide it). */
export const sidebarRowActionButtonExpandedClass = 'opacity-100'

export const sidebarRowActionIconClass = 'size-4 shrink-0 text-current'
