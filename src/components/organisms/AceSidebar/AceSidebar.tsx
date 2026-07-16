import { type ReactNode } from 'react'
import {
  AceDropdownMenu,
  type AceDropdownMenuEntry,
} from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import { SidebarOverflowMenu } from './SidebarOverflowMenu'
import {
  sidebarRowActionButtonClass,
  sidebarRowActionButtonExpandedClass,
  sidebarRowActionIconClass,
} from './sidebarRowActions'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const motionEase = '[transition-timing-function:var(--ace-motion-ease-standard)]'
const motionReduce = 'motion-reduce:transition-none motion-reduce:duration-0'

const panelMotion = cn(
  'transition-[width,border-color,box-shadow,opacity]',
  'duration-[var(--ace-sidebar-duration-panel)]',
  motionEase,
  motionReduce,
)

const expandMotion = cn(
  'grid overflow-hidden transition-[grid-template-rows]',
  'duration-[var(--ace-sidebar-duration-expand)]',
  motionEase,
  motionReduce,
)

const chevronMotion = cn(
  aceChevronIconClass,
  'text-[var(--screening-text-primary)] transition-transform',
  'duration-[var(--ace-sidebar-duration-expand)]',
  motionEase,
  motionReduce,
)

export type AceSidebarVariant = 'navigation' | 'groups'

/** How the navigation variant shows the current organization. */
export type AceSidebarOrganizationDisplay = 'switcher' | 'label'

export type AceSidebarMenuAction = 'edit' | 'copy' | 'delete'

export type AceSidebarOrganization = {
  id: string
  label: string
}

export type AceSidebarNavItem = {
  id: string
  label: string
  selected?: boolean
  onSelect?: () => void
  onMenuAction?: (action: AceSidebarMenuAction) => void
}

export type AceSidebarGroup = {
  id: string
  label: string
  expanded?: boolean
  items?: AceSidebarNavItem[]
  onToggle?: () => void
  onAdd?: () => void
  onMenuAction?: (action: AceSidebarMenuAction) => void
}

export type AceSidebarProps = {
  variant: AceSidebarVariant
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Navigation variant — organization switcher */
  organizations?: AceSidebarOrganization[]
  selectedOrganizationId?: string
  onOrganizationChange?: (id: string) => void
  /**
   * Navigation variant — `switcher` shows the org dropdown (default);
   * `label` shows the selected org name as non-interactive text.
   */
  organizationDisplay?: AceSidebarOrganizationDisplay
  navItems?: AceSidebarNavItem[]
  addLabel?: string
  onNewGroup?: () => void
  groups?: AceSidebarGroup[]
  /** Show the + action on group headers (groups variant). Default false. */
  showGroupAdd?: boolean
  /** Shown when an expanded group has no items (groups variant) */
  emptyGroupMessage?: string
  /** Portal target for row overflow menus inside scroll/clip regions */
  menuPortalContainer?: HTMLElement | null
  className?: string
  children?: ReactNode
}

function rowMenuItems(onMenuAction?: (action: AceSidebarMenuAction) => void): AceDropdownMenuEntry[] {
  return [
    { id: 'edit', type: 'item', label: 'Edit', onSelect: () => onMenuAction?.('edit') },
    { id: 'copy', type: 'item', label: 'Copy', onSelect: () => onMenuAction?.('copy') },
    {
      id: 'delete',
      type: 'item',
      label: 'Delete',
      destructive: true,
      onSelect: () => onMenuAction?.('delete'),
    },
  ]
}

function SidebarRowButton({
  className,
  children,
  onClick,
  'aria-label': ariaLabel,
  'aria-expanded': ariaExpanded,
}: {
  className?: string
  children: ReactNode
  onClick?: () => void
  'aria-label'?: string
  'aria-expanded'?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      className={cn(
        'flex w-full items-center gap-3 rounded-[var(--ace-sidebar-item-radius)] border-0 bg-transparent p-0 text-left outline-none',
        'transition-colors duration-[var(--ace-motion-duration-fast)]',
        motionEase,
        motionReduce,
        'focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
        className,
      )}
    >
      {children}
    </button>
  )
}

function NavItemRow({
  item,
  nested = false,
  showRowMenu = false,
  menuPortalContainer,
}: {
  item: AceSidebarNavItem
  nested?: boolean
  showRowMenu?: boolean
  menuPortalContainer?: HTMLElement | null
}) {
  const selected = item.selected
  return (
    <div
      className={cn(
        'group/row relative z-[1] flex items-center rounded-[var(--ace-sidebar-item-radius)]',
        selected
          ? 'bg-[var(--ace-sidebar-item-selected-bg)] text-[var(--ace-sidebar-item-selected-text)]'
          : 'text-[var(--screening-text-primary)] hover:bg-[var(--ace-sidebar-item-hover-bg)]',
      )}
    >
      <SidebarRowButton
        onClick={item.onSelect}
        aria-label={item.label}
        className={cn('min-w-0 flex-1 px-3 py-1.5', nested && 'pl-4')}
      >
        <span className={cn(p1, 'min-w-0 flex-1 truncate text-sm leading-[1.3125rem]')}>{item.label}</span>
      </SidebarRowButton>
      {showRowMenu ? (
        <SidebarOverflowMenu
          items={rowMenuItems(item.onMenuAction)}
          ariaLabel={`Actions for ${item.label}`}
          portalContainer={menuPortalContainer}
          className="mr-1.5"
        />
      ) : null}
    </div>
  )
}

const defaultEmptyGroupMessage =
  'No items in this group yet. Select the + button on the group header to add one.'

function SidebarGroupBlock({
  group,
  menuPortalContainer,
  emptyGroupMessage,
  showGroupAdd,
}: {
  group: AceSidebarGroup
  menuPortalContainer?: HTMLElement | null
  emptyGroupMessage: string
  showGroupAdd: boolean
}) {
  const expanded = !!group.expanded
  const hasItems = (group.items?.length ?? 0) > 0

  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-[var(--radius-sm)]',
        expanded && [
          'border-[0.5px] border-solid border-[var(--ace-sidebar-group-expanded-border)]',
          'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]',
          'before:bg-[var(--ace-sidebar-group-hover-bg)] before:opacity-0',
          'before:transition-opacity before:duration-[var(--ace-motion-duration-fast)]',
          motionEase,
          motionReduce,
          'has-[[data-sidebar-group-header]:hover]:before:opacity-100',
        ],
      )}
    >
      <div
        data-sidebar-group-header
        className={cn(
          'group/header relative z-[1] flex items-center justify-between rounded-[var(--ace-sidebar-item-radius)] p-1.5',
          !expanded && 'hover:bg-[var(--ace-sidebar-item-hover-bg)]',
        )}
      >
        <SidebarRowButton
          onClick={group.onToggle}
          aria-expanded={expanded}
          aria-label={`${group.label} group`}
          className="min-w-0 flex-1 gap-3 px-1 py-0.5 hover:bg-transparent"
        >
          <MaterialSymbol name="keyboard_arrow_right" className={cn(chevronMotion, expanded && 'rotate-90')} />
          <span className={cn(p1, 'truncate text-sm')}>{group.label}</span>
        </SidebarRowButton>
        <div className="flex shrink-0 items-center gap-0.5 pr-0.5">
          {showGroupAdd && group.onAdd ? (
            <button
              type="button"
              aria-label={`Add to ${group.label}`}
              onClick={(e) => {
                e.stopPropagation()
                group.onAdd?.()
              }}
              className={cn(
                sidebarRowActionButtonClass,
                expanded && sidebarRowActionButtonExpandedClass,
              )}
            >
              <MaterialSymbol name="add" size="md" className={sidebarRowActionIconClass} />
            </button>
          ) : null}
          {group.onMenuAction ? (
            <SidebarOverflowMenu
              items={rowMenuItems(group.onMenuAction)}
              ariaLabel={`Actions for ${group.label}`}
              portalContainer={menuPortalContainer}
              className={cn(expanded && sidebarRowActionButtonExpandedClass)}
            />
          ) : null}
        </div>
      </div>
      <div
        className={cn(
          'relative z-[1]',
          expandMotion,
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          {expanded && !hasItems ? (
            <p
              className={cn(
                p1,
                'm-0 px-3 py-4 text-center text-xs leading-relaxed text-[var(--screening-text-muted)]',
              )}
            >
              {emptyGroupMessage}
            </p>
          ) : hasItems ? (
            <div className="flex flex-col gap-1 px-2 pb-2 pt-0">
              {group.items!.map((item) => (
                <NavItemRow key={item.id} item={item} nested menuPortalContainer={menuPortalContainer} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function AceSidebar({
  variant,
  open: openProp,
  defaultOpen = true,
  organizations = [],
  selectedOrganizationId,
  onOrganizationChange,
  organizationDisplay = 'switcher',
  navItems = [],
  addLabel = 'New Group',
  onNewGroup,
  groups = [],
  showGroupAdd = false,
  emptyGroupMessage = defaultEmptyGroupMessage,
  menuPortalContainer,
  className,
  children,
}: AceSidebarProps) {
  const open = openProp ?? defaultOpen

  const selectedOrg =
    organizations.find((o) => o.id === selectedOrganizationId) ?? organizations[0]

  const orgMenuItems: AceDropdownMenuEntry[] = organizations.map((org) => ({
    type: 'item',
    label: org.label,
    selected: org.id === selectedOrg?.id,
    onSelect: () => onOrganizationChange?.(org.id),
  }))

  const organizationHeader =
    variant !== 'navigation' || !selectedOrg ? null : organizationDisplay === 'label' ? (
      <p
        className={cn(
          '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
          'm-0 w-[var(--ace-sidebar-control-width)] truncate px-3 py-2 text-[var(--screening-text-primary)]',
        )}
      >
        {selectedOrg.label}
      </p>
    ) : (
      <AceDropdownMenu
        triggerLabel={selectedOrg.label}
        items={orgMenuItems}
        triggerMode="field"
        size="md"
        className="!w-[var(--ace-sidebar-control-width)] !max-w-[var(--ace-sidebar-control-width)] [&_button]:!w-full [&_button]:!max-w-full"
        portalContainer={menuPortalContainer}
        align="start"
      />
    )

  return (
    <aside
      data-open={open}
      aria-hidden={!open}
      className={cn(
        'flex h-full shrink-0 flex-col overflow-hidden border-solid bg-[var(--screening-surface)]',
        panelMotion,
        'border-r-[0.5px] border-[var(--ace-sidebar-border)] shadow-[var(--ace-sidebar-shadow)]',
        open ? 'w-[var(--ace-sidebar-width)]' : 'w-0 border-r-0 shadow-none',
        className,
      )}
    >
      <div
        className={cn(
          'flex min-w-[var(--ace-sidebar-width)] flex-1 flex-col transition-opacity',
          'duration-[var(--ace-sidebar-duration-panel)]',
          motionEase,
          motionReduce,
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="flex shrink-0 justify-center px-[var(--ace-sidebar-nav-px)] py-4">
          {variant === 'groups' ? (
            <button
              type="button"
              onClick={onNewGroup}
              className={cn(
                'inline-flex w-[var(--ace-sidebar-control-width)] items-center gap-3 rounded-[var(--radius-sm)] border border-solid',
                'border-[var(--ace-sidebar-heading-border)] bg-[var(--ace-sidebar-heading-bg)] px-3 py-2',
                'text-[var(--screening-text-primary)] transition-colors duration-[var(--ace-motion-duration-fast)]',
                motionEase,
                motionReduce,
                'hover:bg-[var(--screening-surface-hover)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
              )}
            >
              <MaterialSymbol name="add" size="md" className="size-4 shrink-0 text-[var(--screening-text-primary)]" />
              <span className={cn(p1, 'truncate text-sm')}>{addLabel}</span>
            </button>
          ) : (
            organizationHeader
          )}
        </div>

        <nav
          className={cn(
            'flex min-h-0 flex-1 flex-col overflow-y-auto px-3',
            variant === 'groups' ? 'gap-3' : 'gap-0',
          )}
          aria-label={variant === 'groups' ? 'Sidebar groups' : 'Sidebar navigation'}
        >
          {variant === 'navigation'
            ? navItems.map((item) => <NavItemRow key={item.id} item={item} />)
            : groups.map((group) => (
                <SidebarGroupBlock
                  key={group.id}
                  group={group}
                  menuPortalContainer={menuPortalContainer}
                  emptyGroupMessage={
                    showGroupAdd ? emptyGroupMessage : 'No items in this group yet.'
                  }
                  showGroupAdd={showGroupAdd}
                />
              ))}
          {children}
        </nav>
      </div>
    </aside>
  )
}
