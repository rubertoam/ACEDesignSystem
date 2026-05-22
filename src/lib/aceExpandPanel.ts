import { cn } from './cn'

/** Same open/close motion as AceAccordion (`--ace-accordion-duration` / `--ace-accordion-ease`). */
export const aceExpandPanelDurationClass = 'duration-[var(--ace-accordion-duration)]'
export const aceExpandPanelEaseClass = '[transition-timing-function:var(--ace-accordion-ease)]'

export function aceExpandPanelGridClass(open: boolean) {
  return cn(
    'grid overflow-hidden transition-[grid-template-rows]',
    aceExpandPanelDurationClass,
    aceExpandPanelEaseClass,
    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
  )
}
