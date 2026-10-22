import {
  DropdownMenu,
  type DropdownMenuEntry,
} from '../../molecules/DropdownMenu/DropdownMenu'
import { MaterialSymbol } from '../../molecules/Accordion/MaterialSymbol'
import { cn } from '../../../lib/cn'
import { sidebarRowActionButtonClass, sidebarRowActionIconClass } from './sidebarRowActions'

type SidebarOverflowMenuProps = {
  items: DropdownMenuEntry[]
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
    <DropdownMenu
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
            'data-[state=open]:border-[var(--icon-button-border)] data-[state=open]:bg-[var(--icon-button-hover-bg)] data-[state=open]:text-[var(--icon-button-icon)] data-[state=open]:opacity-100',
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
