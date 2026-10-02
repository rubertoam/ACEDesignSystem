import { type ReactNode } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  AceDropdownMenu,
  aceDropdownMenuPanelClass,
  type AceDropdownMenuEntry,
} from '../../molecules/AceDropdownMenu/AceDropdownMenu'
import {
  AceTooltip,
  AceTooltipContent,
  AceTooltipTrigger,
} from '../../atoms/AceTooltip/AceTooltip'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import { SidebarOverflowMenu } from './SidebarOverflowMenu'
import {
  sidebarIconButtonClass,
  sidebarRowActionButtonClass,
  sidebarRowActionButtonExpandedClass,
  sidebarRowActionIconClass,
} from './sidebarRowActions'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const motionEase = '[transition-timing-function:var(--ace-motion-ease-standard)]'
const motionReduce = 'motion-reduce:transition-none motion-reduce:duration-0'

const panelMotion = cn(
  'transition-[width,border-color,box-shadow]',
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

/** How the sidebar shows the current organization / group. */
export type AceSidebarOrganizationDisplay = 'switcher' | 'label' | 'icon'

export type AceSidebarMenuAction = 'edit' | 'copy' | 'delete'

export type AceSidebarOrganization = {
  id: string
  label: string
}

export type AceSidebarNavItem = {
  id: string
  label: string
  selected?: boolean
  /** Non-interactive row (muted, no hover / select). */
  disabled?: boolean
  /** Optional trailing content (e.g. count badge). */
  trailing?: ReactNode
  onSelect?: () => void
  onMenuAction?: (action: AceSidebarMenuAction) => void
}

export type AceSidebarGroup = {
  id: string
  label: string
  expanded?: boolean
  items?: AceSidebarNavItem[]
  /** Optional trailing content on the group header (e.g. summed count badge). */
  trailing?: ReactNode
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
   * `switcher` — field dropdown (default);
   * `label` — selected org name as non-interactive text;
   * `icon` — non-bordered icon button dropdown (optionally paired with Application ID).
   */
  organizationDisplay?: AceSidebarOrganizationDisplay
  /** Application ID options shown as a second icon dropdown when `organizationDisplay="icon"`. */
  applications?: AceSidebarOrganization[]
  selectedApplicationId?: string
  onApplicationChange?: (id: string) => void
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
  /**
   * Optional control to the right of the organization switcher / New Group CTA
   * (Review Assigned — typically a bordered search icon via `sidebarIconButtonBorderedClass`).
   * Shrinks the org field so both fit the sidebar width.
   */
  headerTrailing?: ReactNode
  /** Optional content directly below the organization / groups header (e.g. search field). */
  headerBelow?: ReactNode
  className?: string
  children?: ReactNode
}

const sidebarIconDropdownTriggerClass = cn(
  sidebarIconButtonClass,
  'data-[state=open]:border-[var(--ace-icon-button-border)]',
  'data-[state=open]:bg-[var(--ace-icon-button-hover-bg)]',
  'data-[state=open]:text-[var(--ace-icon-button-icon)]',
)

/** Icon-button dropdown that does not depend on AceDropdownMenu `trigger` prop. */
function SidebarIconDropdown({
  ariaLabel,
  iconName,
  items,
  portalContainer,
}: {
  ariaLabel: string
  iconName: string
  items: AceDropdownMenuEntry[]
  portalContainer?: HTMLElement | null
}) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button type="button" aria-label={ariaLabel} className={sidebarIconDropdownTriggerClass}>
          <MaterialSymbol name={iconName} size="md" className="text-current" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal container={portalContainer ?? undefined}>
        <DropdownMenu.Content
          className={cn(aceDropdownMenuPanelClass, 'w-[16.5rem] py-2')}
          sideOffset={4}
          align="start"
          collisionPadding={8}
        >
          {items.map((entry, index) => {
            if (entry.type !== 'item') return null
            return (
              <DropdownMenu.Item
                key={entry.id ?? `${entry.label}-${index}`}
                className={cn(
                  'relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)] px-3 py-2 outline-none',
                  'font-normal [font-family:var(--font-ace-noto)] text-sm leading-[1.65] text-[var(--screening-text-primary)]',
                  'data-[highlighted]:bg-[var(--screening-surface-hover)]',
                  entry.selected && 'bg-[var(--screening-surface-hover)]',
                )}
                onSelect={() => entry.onSelect?.()}
              >
                <span className="min-w-0 truncate">{entry.label}</span>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
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
  const disabled = item.disabled === true
  return (
    <div
      className={cn(
        'group/row relative z-[1] flex items-center rounded-[var(--ace-sidebar-item-radius)]',
        selected
          ? 'bg-[var(--ace-sidebar-item-selected-bg)] text-[var(--ace-sidebar-item-selected-text)]'
          : disabled
            ? 'text-[var(--screening-text-muted)]'
            : 'text-[var(--screening-text-primary)] hover:bg-[var(--ace-sidebar-item-hover-bg)]',
      )}
    >
      <SidebarRowButton
        onClick={disabled ? undefined : item.onSelect}
        aria-label={item.label}
        className={cn(
          'min-w-0 flex-1 px-3 py-1.5',
          // Indent nested steps under the group header label (after chevron).
          nested && 'pl-9',
          disabled && 'cursor-not-allowed',
        )}
      >
        <span className={cn(p1, 'min-w-0 flex-1 truncate text-sm leading-[1.3125rem]')}>{item.label}</span>
      </SidebarRowButton>
      {item.trailing != null ? item.trailing : null}
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
      data-sidebar-group-id={group.id}
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
          {group.trailing != null ? group.trailing : null}
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
            <div className="flex flex-col gap-1 pb-2 pl-3 pr-2 pt-0">
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
  applications = [],
  selectedApplicationId,
  onApplicationChange,
  navItems = [],
  addLabel = 'New Group',
  onNewGroup,
  groups = [],
  showGroupAdd = false,
  emptyGroupMessage = defaultEmptyGroupMessage,
  menuPortalContainer,
  headerTrailing,
  headerBelow,
  className,
  children,
}: AceSidebarProps) {
  const open = openProp ?? defaultOpen
  const isIconHeader = organizationDisplay === 'icon'

  const selectedOrg =
    organizations.find((o) => o.id === selectedOrganizationId) ?? organizations[0]

  const selectedApp =
    applications.find((a) => a.id === selectedApplicationId) ?? applications[0]

  const orgMenuItems: AceDropdownMenuEntry[] = organizations.map((org) => ({
    type: 'item',
    label: org.label,
    selected: org.id === selectedOrg?.id,
    onSelect: () => onOrganizationChange?.(org.id),
  }))

  const appMenuItems: AceDropdownMenuEntry[] = applications.map((app) => ({
    type: 'item',
    label: app.label,
    selected: app.id === selectedApp?.id,
    onSelect: () => onApplicationChange?.(app.id),
  }))

  const orgFieldWidthClass = headerTrailing
    ? 'min-w-0 w-full max-w-full [&_button]:!w-full [&_button]:!max-w-full'
    : '!w-[var(--ace-sidebar-control-width)] !max-w-[var(--ace-sidebar-control-width)] [&_button]:!w-full [&_button]:!max-w-full'

  const organizationIconHeader =
    selectedOrg != null ? (
      <div className="inline-flex shrink-0 items-center gap-1">
        <AceTooltip>
          <AceTooltipTrigger asChild>
            <span className="inline-flex">
              <SidebarIconDropdown
                ariaLabel={`Groups: ${selectedOrg.label}`}
                iconName="groups"
                items={orgMenuItems}
                portalContainer={menuPortalContainer}
              />
            </span>
          </AceTooltipTrigger>
          <AceTooltipContent side="bottom" variant="screening-toolbar" hideArrow>
            Groups
          </AceTooltipContent>
        </AceTooltip>
        {selectedApp != null ? (
          <AceTooltip>
            <AceTooltipTrigger asChild>
              <span className="inline-flex">
                <SidebarIconDropdown
                  ariaLabel={`Application ID: ${selectedApp.label}`}
                  iconName="assignment_globe"
                  items={appMenuItems}
                  portalContainer={menuPortalContainer}
                />
              </span>
            </AceTooltipTrigger>
            <AceTooltipContent side="bottom" variant="screening-toolbar" hideArrow>
              Application ID
            </AceTooltipContent>
          </AceTooltip>
        ) : null}
      </div>
    ) : null

  const organizationHeader =
    !selectedOrg ? null : isIconHeader ? (
      organizationIconHeader
    ) : organizationDisplay === 'label' ? (
      <p
        className={cn(
          '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
          'm-0 truncate px-3 py-2 text-[var(--screening-text-primary)]',
          headerTrailing
            ? 'w-full min-w-0'
            : 'w-[var(--ace-sidebar-control-width)]',
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
        panelWidth="wide"
        className={orgFieldWidthClass}
        portalContainer={menuPortalContainer}
        align="start"
      />
    )

  const groupsHeader =
    onNewGroup != null ? (
      <button
        type="button"
        onClick={onNewGroup}
        className={cn(
          'inline-flex items-center justify-center gap-3 rounded-[var(--radius-sm)] border border-solid',
          'border-[var(--ace-sidebar-heading-border)] bg-[var(--ace-sidebar-heading-bg)] px-3 py-2',
          'text-[var(--screening-text-primary)] transition-colors duration-[var(--ace-motion-duration-fast)]',
          motionEase,
          motionReduce,
          'hover:bg-[var(--screening-surface-hover)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
          headerTrailing ? 'w-full min-w-0' : 'w-[var(--ace-sidebar-control-width)]',
        )}
      >
        <span
          aria-hidden
          className="inline-flex size-4 shrink-0 items-center justify-center text-[var(--screening-text-primary)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 2.5v11M2.5 8h11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className={cn(p1, 'truncate text-sm')}>{addLabel}</span>
      </button>
    ) : (
      organizationHeader
    )

  const headerContent = variant === 'groups' ? groupsHeader : organizationHeader
  const headerContentGrows = Boolean(headerTrailing && headerContent && !isIconHeader)

  return (
    <aside
      data-open={open}
      aria-hidden={!open}
      className={cn(
        // Clip content as width collapses so nav does not spill over the page.
        // Shadow is drawn on a non-clipped parent when needed; panel itself must clip.
        'relative flex h-full shrink-0 flex-col overflow-hidden border-solid bg-[var(--screening-surface)]',
        panelMotion,
        'border-r-[0.5px] border-[var(--ace-sidebar-border)] shadow-[var(--ace-sidebar-shadow)]',
        open
          ? 'z-20 w-[var(--ace-sidebar-width)]'
          : 'z-0 w-0 border-r-0 shadow-none',
        className,
      )}
    >
      <div
        className={cn(
          'flex min-w-[var(--ace-sidebar-width)] flex-1 flex-col overflow-hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        {headerContent || headerTrailing ? (
          <div className="flex shrink-0 flex-col">
            <div
              className={cn(
                'flex items-center px-[var(--ace-sidebar-nav-px)] py-4',
                isIconHeader
                  ? headerTrailing
                    ? 'justify-between gap-2'
                    : 'justify-start'
                  : headerTrailing
                    ? 'gap-2'
                    : 'justify-center',
                headerBelow ? 'pb-2' : undefined,
              )}
            >
              {headerContent ? (
                <div className={cn(headerContentGrows ? 'min-w-0 flex-1' : 'shrink-0')}>
                  {headerContent}
                </div>
              ) : null}
              {headerTrailing ? (
                <div className="inline-flex shrink-0 items-center leading-none">{headerTrailing}</div>
              ) : null}
            </div>
            {headerBelow ? (
              <div className="shrink-0 px-[var(--ace-sidebar-nav-px)] pb-3">{headerBelow}</div>
            ) : null}
          </div>
        ) : (
          <div className="shrink-0 pt-5" aria-hidden />
        )}

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
