import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { aceDropdownMenuPanelClass } from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { cn } from '../../../lib/cn'
import {
  screeningRowActionsMenuIconClass,
  screeningRowActionsMenuTriggerClass,
} from './screeningTableToolbar'

const itemType =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const menuItemClass = cn(
  itemType,
  'relative flex w-full cursor-pointer select-none items-center whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-1 text-[var(--screening-text-primary)] outline-none',
  'data-[highlighted]:bg-[var(--screening-surface-hover)]',
)

const ROW_ACTION_ITEMS = [
  { id: 'screening-history', label: 'Screening History' },
  { id: 'documents', label: 'Documents' },
  { id: 'match-simulator', label: 'Match Simulator' },
] as const

export function ScreeningRowActionsMenu({
  rowName,
  portalContainer,
}: {
  rowName: string
  portalContainer?: HTMLElement | null
}) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${rowName}`}
          onClick={(event) => event.stopPropagation()}
          className={screeningRowActionsMenuTriggerClass}
        >
          <MaterialSymbol name="more_horiz" size="md" weight={300} className={screeningRowActionsMenuIconClass} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal container={portalContainer ?? undefined}>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          collisionPadding={8}
          className={cn(
            aceDropdownMenuPanelClass,
            'z-[250] w-max min-w-[var(--radix-dropdown-menu-trigger-width)] py-2',
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {ROW_ACTION_ITEMS.map((item) => (
            <DropdownMenu.Item key={item.id} className={menuItemClass}>
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
