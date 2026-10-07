import {
  AceDropdownMenu,
  type AceDropdownMenuEntry,
} from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { cn } from '../../../lib/cn'
import { sidebarRowActionButtonClass, sidebarRowActionIconClass } from './sidebarRowActions'

type SidebarOverflowMenuProps = {
  items: AceDropdownMenuEntry[]
  ariaLabel: string
  portalContainer?: HTMLElement | null
  className?: string
}

export function SidebarOverflowMenu({
  items,
  ariaLabel,
  portalContainer,
  className,
}: SidebarOverflowMenuProps) {
  return (
    <AceDropdownMenu
      items={items}
      align="end"
      panelWidth="compact"
      portalContainer={portalContainer}
      trigger={
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(
            sidebarRowActionButtonClass,
            'data-[state=open]:border-[var(--ace-icon-button-border)] data-[state=open]:bg-[var(--ace-icon-button-hover-bg)] data-[state=open]:text-[var(--ace-icon-button-icon)] data-[state=open]:opacity-100',
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <MaterialSymbol name="more_horiz" size="md" className={sidebarRowActionIconClass} />
        </button>
      }
    />
  )
}
