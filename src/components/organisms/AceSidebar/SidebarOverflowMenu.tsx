import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  type AceDropdownMenuEntry,
  aceDropdownMenuPanelClass,
} from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { cn } from '../../../lib/cn'
import { sidebarRowActionButtonClass, sidebarRowActionIconClass } from './sidebarRowActions'

const itemType =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const motionEase = '[transition-timing-function:var(--ace-motion-ease-standard)]'

const itemClass = cn(
  itemType,
  'relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)] px-3 py-1 text-[var(--screening-text-primary)] outline-none',
  'transition-colors duration-[var(--ace-motion-duration-fast)]',
  motionEase,
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  'data-[highlighted]:bg-[var(--screening-surface-hover)]',
)

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
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(
            sidebarRowActionButtonClass,
            'data-[state=open]:bg-[var(--ace-sidebar-row-action-hover-bg)] data-[state=open]:opacity-100 data-[state=open]:shadow-[0_0_0_1px_var(--screening-border-strong)]',
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <MaterialSymbol name="more_horiz" size="md" className={sidebarRowActionIconClass} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal container={portalContainer ?? undefined}>
        <DropdownMenu.Content
          className={cn(aceDropdownMenuPanelClass, 'z-50 w-[6.75rem] py-2', 'p-1')}
          sideOffset={4}
          align="end"
          collisionPadding={8}
        >
          {items.map((entry, i) => {
            if (entry.type !== 'item') return null
            return (
              <DropdownMenu.Item
                key={entry.id ?? `${entry.label}-${i}`}
                disabled={entry.disabled}
                className={cn(
                  itemClass,
                  entry.destructive &&
                    'text-[var(--dialog-modal-danger)] data-[highlighted]:text-[var(--dialog-modal-danger)]',
                )}
                onSelect={() => entry.onSelect?.()}
              >
                {entry.label}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
