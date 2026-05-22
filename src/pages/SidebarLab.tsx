import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PanelLeftClose } from 'lucide-react'
import { AceInputField } from '../components/atoms/AceInputField'
import { AceDropdownMenu } from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import { DialogModal } from '../components/molecules/DialogModal/DialogModal'
import {
  GroupFormDialog,
  type GroupFormDialogItem,
  type GroupFormDialogMode,
} from '../components/organisms/AceSidebar/GroupFormDialog'
import {
  AceSidebar,
  type AceSidebarGroup,
  type AceSidebarMenuAction,
  type AceSidebarNavItem,
  type AceSidebarVariant,
} from '../components/organisms/AceSidebar/AceSidebar'
import { cn } from '../lib/cn'
import { LabCheckbox } from '../lib/labControls'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const FIGMA_SIDEBAR_URL =
  'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=4491-2509&m=dev'

const FIGMA_HEADER_URL =
  'https://www.figma.com/design/4vUzx3bkw7zQifD0Gy7rX1/Review-Assigned?node-id=99-5092&m=dev'

const ORGANIZATIONS = [
  { id: 'org-1', label: 'Organization 1' },
  { id: 'org-2', label: 'Organization 2' },
  { id: 'org-3', label: 'Organization 3' },
]

const NAV_ITEMS: AceSidebarNavItem[] = [
  { id: 'nav-1', label: 'Navigation Item 1' },
  { id: 'nav-2', label: 'Navigation Item 2' },
  { id: 'nav-3', label: 'Navigation Item 3' },
  { id: 'nav-4', label: 'Navigation Item 4' },
  { id: 'nav-5', label: 'Navigation Item 5' },
  { id: 'nav-6', label: 'Navigation Item 6' },
  { id: 'nav-7', label: 'Navigation Item 7' },
]

function buildInitialGroups(selectedId: string): AceSidebarGroup[] {
  return [
    {
      id: 'group-1',
      label: 'Group 1',
      expanded: false,
      items: [],
    },
    {
      id: 'group-2',
      label: 'Group 2',
      expanded: false,
      items: [
        { id: 'item-1', label: 'Group Item 1', selected: selectedId === 'item-1' },
        { id: 'item-2', label: 'Group Item 2', selected: selectedId === 'item-2' },
        { id: 'item-3', label: 'Group Item 3', selected: selectedId === 'item-3' },
        { id: 'item-4', label: 'Group Item 4', selected: selectedId === 'item-4' },
      ],
    },
  ]
}

type DeleteTarget = {
  kind: 'group' | 'item'
  groupId: string
  itemId?: string
  label: string
}

type GroupFormState = {
  mode: GroupFormDialogMode
  sourceGroupId: string
  initialName: string
  draftName: string
  items: GroupFormDialogItem[]
}

const h6Bold =
  '[font:var(--ace-type-heading-h6-bold)] [letter-spacing:var(--ace-type-heading-h6-bold-tracking)]'
const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'
const captionBold =
  '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]'

function SidebarMockHeader({
  open,
  onToggleSidebar,
}: {
  open: boolean
  onToggleSidebar: () => void
}) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] px-8 py-3">
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={open ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={open}
          className="inline-flex size-4 shrink-0 items-center justify-center text-[var(--ace-neutral-800)] transition-colors hover:text-[var(--screening-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]"
        >
          <PanelLeftClose
            className={cn(
              'size-4 transition-transform duration-[var(--ace-motion-duration-medium)] [transition-timing-function:var(--ace-motion-ease-standard)] motion-reduce:transition-none',
              open && 'rotate-180',
            )}
            strokeWidth={1.75}
            aria-hidden
          />
        </button>
        <h1 className={cn(h6Bold, 'm-0 text-base text-[var(--ace-neutral-800)]')}>Header</h1>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="size-2 shrink-0 rounded-full bg-[var(--ace-header-status-success)]"
          aria-hidden
        />
        <span className={cn(p1, 'text-sm text-[var(--ace-neutral-800)]')}>Last updated 30 seconds ago</span>
      </div>
    </header>
  )
}

export function SidebarLab() {
  const [menuHost, setMenuHost] = useState<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(true)
  const [variant, setVariant] = useState<AceSidebarVariant>('navigation')
  const [showGroupAdd, setShowGroupAdd] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState('org-1')
  const [selectedNav, setSelectedNav] = useState('nav-1')
  const [selectedGroupItem, setSelectedGroupItem] = useState('item-1')
  const [groups, setGroups] = useState(() => buildInitialGroups('item-1'))

  const [newGroupOpen, setNewGroupOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupItemOpen, setNewGroupItemOpen] = useState(false)
  const [newGroupItemName, setNewGroupItemName] = useState('')
  const [addItemTargetGroupId, setAddItemTargetGroupId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [groupForm, setGroupForm] = useState<GroupFormState | null>(null)

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    selected: item.id === selectedNav,
    onSelect: () => setSelectedNav(item.id),
  }))

  const openDeleteModal = (target: DeleteTarget) => {
    setDeleteTarget(target)
    setDeleteConfirmText('')
  }

  const closeDeleteModal = () => {
    setDeleteTarget(null)
    setDeleteConfirmText('')
  }

  const openEditGroup = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId)
    if (!group) return
    setGroupForm({
      mode: 'edit',
      sourceGroupId: groupId,
      initialName: group.label,
      draftName: group.label,
      items: (group.items ?? []).map((item) => ({
        id: item.id,
        label: item.label,
        markedForRemoval: false,
      })),
    })
  }

  const openCopyGroup = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId)
    if (!group) return
    const defaultName = `${group.label} Copy`
    setGroupForm({
      mode: 'copy',
      sourceGroupId: groupId,
      initialName: defaultName,
      draftName: defaultName,
      items: (group.items ?? []).map((item) => ({
        id: item.id,
        label: item.label,
        markedForRemoval: false,
      })),
    })
  }

  const closeGroupForm = () => setGroupForm(null)

  const groupFormPrimaryDisabled =
    groupForm == null ||
    !groupForm.draftName.trim() ||
    groupForm.items.filter((item) => !item.markedForRemoval).length === 0 ||
    (groupForm.mode === 'edit' &&
      groupForm.draftName.trim() === groupForm.initialName &&
      !groupForm.items.some((item) => item.markedForRemoval))

  const submitGroupForm = () => {
    if (!groupForm || groupFormPrimaryDisabled) return
    const trimmedName = groupForm.draftName.trim()
    const includedItems = groupForm.items.filter((item) => !item.markedForRemoval)

    if (groupForm.mode === 'edit') {
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== groupForm.sourceGroupId) return g
          const keptItems = includedItems.map((item) => {
            const existing = g.items?.find((i) => i.id === item.id)
            return {
              id: item.id,
              label: item.label,
              selected: existing?.selected,
            }
          })
          return {
            ...g,
            label: trimmedName,
            items: keptItems,
          }
        }),
      )
    } else {
      const copyId = `group-${Date.now()}`
      setGroups((prev) => [
        ...prev,
        {
          id: copyId,
          label: trimmedName,
          expanded: true,
          items: includedItems.map((item, index) => ({
            id: `${item.id}-copy-${copyId}-${index}`,
            label: item.label,
            selected: false,
          })),
        },
      ])
    }
    closeGroupForm()
  }

  const handleGroupMenuAction = (action: AceSidebarMenuAction, groupId: string, label: string) => {
    if (action === 'edit') {
      openEditGroup(groupId)
      return
    }
    if (action === 'copy') {
      openCopyGroup(groupId)
      return
    }
    if (action === 'delete') {
      openDeleteModal({ kind: 'group', groupId, label })
    }
  }

  const confirmDelete = () => {
    if (!deleteTarget || deleteConfirmText !== 'delete') return
    if (deleteTarget.kind === 'group') {
      setGroups((prev) => prev.filter((g) => g.id !== deleteTarget.groupId))
    } else if (deleteTarget.itemId) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === deleteTarget.groupId
            ? { ...g, items: g.items?.filter((i) => i.id !== deleteTarget.itemId) }
            : g,
        ),
      )
    }
    closeDeleteModal()
  }

  const createGroup = () => {
    const name = newGroupName.trim()
    if (!name) return
    setGroups((prev) => [
      ...prev,
      {
        id: `group-${Date.now()}`,
        label: name,
        expanded: true,
        items: [],
      },
    ])
    setNewGroupName('')
    setNewGroupOpen(false)
  }

  const openNewGroupItemModal = (groupId: string) => {
    setAddItemTargetGroupId(groupId)
    setNewGroupItemName('')
    setNewGroupItemOpen(true)
  }

  const closeNewGroupItemModal = () => {
    setNewGroupItemOpen(false)
    setNewGroupItemName('')
    setAddItemTargetGroupId(null)
  }

  const createGroupItem = () => {
    const name = newGroupItemName.trim()
    const groupId = addItemTargetGroupId
    if (!name || !groupId) return
    const newItemId = `item-${Date.now()}`
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g
        return {
          ...g,
          expanded: true,
          items: [...(g.items ?? []), { id: newItemId, label: name }],
        }
      }),
    )
    setSelectedGroupItem(newItemId)
    closeNewGroupItemModal()
  }

  const groupsWithHandlers = groups.map((group) => ({
    ...group,
    onToggle: () =>
      setGroups((prev) =>
        prev.map((g) => (g.id === group.id ? { ...g, expanded: !g.expanded } : g)),
      ),
    onAdd: () => openNewGroupItemModal(group.id),
    onMenuAction: (action: AceSidebarMenuAction) =>
      handleGroupMenuAction(action, group.id, group.label),
    items: group.items?.map((item) => ({
      ...item,
      selected: item.id === selectedGroupItem,
      onSelect: () => setSelectedGroupItem(item.id),
    })),
  }))

  const variantLabel = variant === 'groups' ? 'Groups' : 'Navigation'

  const examplesToolbar = (
    <div className="flex flex-col gap-3">
      <p className="m-0 max-w-xl text-xs leading-relaxed text-[var(--screening-text-muted)]">
        Switch variants below. Open and close the sidebar from the header icon in the mock app frame.
      </p>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <span className={cn(captionBold, 'text-xs text-[var(--screening-text-primary)]')}>
            Sidebar variant
          </span>
          <AceDropdownMenu
            triggerLabel={variantLabel}
            triggerMode="field"
            size="md"
            items={[
              {
                type: 'item',
                label: 'Navigation',
                onSelect: () => setVariant('navigation'),
              },
              {
                type: 'item',
                label: 'Groups',
                onSelect: () => setVariant('groups'),
              },
            ]}
          />
        </div>
        {variant === 'groups' ? (
          <LabCheckbox
            label="Show group add (+)"
            checked={showGroupAdd}
            onCheckedChange={setShowGroupAdd}
          />
        ) : null}
      </div>
    </div>
  )

  return (
    <>
      <ComponentLabPage
        title="Sidebar"
        description="Application sidebar for flat navigation or grouped query lists. Uses ACE screening tokens, collapsible width, group-header overflow menus (Edit, Copy, Delete), and organization switching in the navigation variant."
        figmaUrl={FIGMA_SIDEBAR_URL}
        figmaLinkLabel="Sidebar in Figma"
        examplesToolbar={examplesToolbar}
        examples={
          <div
            ref={setMenuHost}
            className="flex h-[min(85vh,52rem)] min-h-[40rem] flex-col overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)]"
          >
            <SidebarMockHeader open={open} onToggleSidebar={() => setOpen((v) => !v)} />
            <div className="flex min-h-0 flex-1">
              <AceSidebar
                open={open}
                variant={variant}
                organizations={ORGANIZATIONS}
                selectedOrganizationId={selectedOrg}
                onOrganizationChange={setSelectedOrg}
                navItems={navItems}
                addLabel="New Group"
                onNewGroup={() => {
                  setNewGroupName('')
                  setNewGroupOpen(true)
                }}
                groups={groupsWithHandlers}
                showGroupAdd={showGroupAdd}
                menuPortalContainer={menuHost}
              />
              <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[var(--screening-surface-muted)] p-6">
                <p className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Main content</p>
                <p className="mt-2 text-sm text-[var(--screening-text-muted)]">
                  App shell preview based on{' '}
                  <a
                    href={FIGMA_HEADER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--screening-primary)] underline underline-offset-2"
                  >
                    Review Assigned header
                  </a>
                  . Sidebar motion is documented on the{' '}
                  <Link
                    to="/lab/atoms/animations"
                    className="text-[var(--screening-primary)] underline underline-offset-2"
                  >
                    Animations
                  </Link>{' '}
                  page.
                </p>
              </div>
            </div>
          </div>
        }
        code={
          <>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Control <code className="text-[var(--screening-text-primary)]">open</code> from your app header. Pass{' '}
              <code className="text-[var(--screening-text-primary)]">menuPortalContainer</code> when menus render inside
              a clipped viewport.
            </p>
            <ComponentLabCode>{`import { AceSidebar } from '../components/organisms/AceSidebar/AceSidebar'

const [open, setOpen] = useState(true)

<AceSidebar
  open={open}
  variant="groups"
  onNewGroup={() => setNewGroupOpen(true)}
  groups={groups}
  menuPortalContainer={viewportRef.current}
/>

<AceSidebar
  variant="navigation"
  organizations={[
    { id: 'org-1', label: 'Organization 1' },
    { id: 'org-2', label: 'Organization 2' },
  ]}
  selectedOrganizationId={orgId}
  onOrganizationChange={setOrgId}
  navItems={navItems}
/>`}</ComponentLabCode>
          </>
        }
        usage={
          <>
            <section className="space-y-2">
              <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
              <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
                <li>
                  <strong className="text-[var(--screening-text-primary)]">Navigation</strong> — flat settings routes
                  with an organization switcher at the top.
                </li>
                <li>
                  <strong className="text-[var(--screening-text-primary)]">Groups</strong> — collapsible query groups,
                  New Group, and group-header overflow menus (Edit, Copy, Delete). Query rows are select-only.
                </li>
              </ul>
            </section>
            <section className="space-y-2">
              <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Groups actions</h4>
              <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
                <li>
                  Group headers: expand/collapse, optional <strong className="text-[var(--screening-text-primary)]">+</strong>{' '}
                  (<code className="text-[var(--screening-text-primary)]">showGroupAdd</code>) to open a new query dialog,
                  and overflow menu (Edit, Copy, Delete).
                </li>
                <li>Query rows: selection only — no overflow menu.</li>
                <li>Edit and Copy use <code className="text-[var(--screening-text-primary)]">GroupFormDialog</code>; Delete requires typing <strong className="text-[var(--screening-text-primary)]">delete</strong>.</li>
              </ul>
            </section>
            <section className="space-y-2">
              <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Group form dialog (Edit / Copy)</h4>
              <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
                <li>
                  <strong className="text-[var(--screening-text-primary)]">Edit</strong> — trash marks an item for removal; restore uses a Success/500 (
                  <code className="text-[var(--screening-text-primary)]">--ace-success-500</code>) circle with a white plus.
                </li>
                <li>
                  <strong className="text-[var(--screening-text-primary)]">Dimming</strong> — only the item label is dimmed (
                  <code className="text-[var(--screening-text-primary)]">opacity-50</code>); action icons stay at full strength so Success/500 and danger colors read correctly.
                </li>
                <li>
                  Action hover washes: trash → Error/50 (
                  <code className="text-[var(--screening-text-primary)]">--ace-error-50</code>), restore → Success/50 (
                  <code className="text-[var(--screening-text-primary)]">--ace-success-50</code>).
                </li>
                <li>
                  <strong className="text-[var(--screening-text-primary)]">Copy</strong> — checkboxes include/exclude items; included count uses purple 400 (
                  <code className="text-[var(--screening-text-primary)]">--ace-button-purple-400</code>).
                </li>
              </ul>
            </section>
            <section className="space-y-2">
              <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Motion</h4>
              <p className="m-0 text-[var(--screening-text-muted)]">
                Panel width, group expand/collapse, chevron rotation, row hover, and action opacity use{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-motion-ease-standard</code>. See the{' '}
                <Link to="/lab/atoms/animations" className="text-[var(--screening-primary)] underline underline-offset-2">
                  Animations
                </Link>{' '}
                lab.
              </p>
            </section>
          </>
        }
      />

      <DialogModal
        open={newGroupOpen}
        onClose={() => setNewGroupOpen(false)}
        title="New Group"
        size="md"
        footer={
          <div className="flex w-full flex-wrap items-center justify-end gap-[var(--dialog-modal-footer-btn-gap)]">
            <button
              type="button"
              onClick={() => setNewGroupOpen(false)}
              className={cn(
                p1,
                'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] border border-solid border-[var(--dialog-modal-outline-border)] bg-[var(--dialog-modal-surface)] px-4 py-2 font-bold text-[var(--dialog-modal-outline-text)] hover:bg-[var(--dialog-modal-outline-hover-bg)]',
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!newGroupName.trim()}
              onClick={createGroup}
              className={cn(
                p1,
                'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] px-4 py-2 font-bold text-[var(--dialog-modal-on-primary)]',
                'bg-[var(--dialog-modal-primary)] hover:bg-[var(--dialog-modal-primary-hover)]',
                'disabled:pointer-events-none disabled:opacity-50',
              )}
            >
              Create Group
            </button>
          </div>
        }
      >
        <AceInputField
          id="sidebar-new-group-name"
          label="Group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter group name"
          fieldSize="md"
        />
      </DialogModal>

      <DialogModal
        open={newGroupItemOpen}
        onClose={closeNewGroupItemModal}
        title="New Group Item"
        size="md"
        footer={
          <div className="flex w-full flex-wrap items-center justify-end gap-[var(--dialog-modal-footer-btn-gap)]">
            <button
              type="button"
              onClick={closeNewGroupItemModal}
              className={cn(
                p1,
                'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] border border-solid border-[var(--dialog-modal-outline-border)] bg-[var(--dialog-modal-surface)] px-4 py-2 font-bold text-[var(--dialog-modal-outline-text)] hover:bg-[var(--dialog-modal-outline-hover-bg)]',
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!newGroupItemName.trim()}
              onClick={createGroupItem}
              className={cn(
                p1,
                'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] px-4 py-2 font-bold text-[var(--dialog-modal-on-primary)]',
                'bg-[var(--dialog-modal-primary)] hover:bg-[var(--dialog-modal-primary-hover)]',
                'disabled:pointer-events-none disabled:opacity-50',
              )}
            >
              Create Item
            </button>
          </div>
        }
      >
        <AceInputField
          id="sidebar-new-group-item-name"
          label="Item name"
          value={newGroupItemName}
          onChange={(e) => setNewGroupItemName(e.target.value)}
          placeholder="Enter item name"
          fieldSize="md"
        />
      </DialogModal>

      <GroupFormDialog
        mode={groupForm?.mode ?? 'edit'}
        open={groupForm != null}
        onClose={closeGroupForm}
        groupName={groupForm?.draftName ?? ''}
        onGroupNameChange={(name) =>
          setGroupForm((prev) => (prev ? { ...prev, draftName: name } : prev))
        }
        items={groupForm?.items ?? []}
        onToggleItemRemoval={(itemId) =>
          setGroupForm((prev) =>
            prev
              ? {
                  ...prev,
                  items: prev.items.map((item) =>
                    item.id === itemId
                      ? { ...item, markedForRemoval: !item.markedForRemoval }
                      : item,
                  ),
                }
              : prev,
          )
        }
        onPrimary={submitGroupForm}
        primaryDisabled={groupFormPrimaryDisabled}
      />

      <DialogModal
        open={deleteTarget != null}
        onClose={closeDeleteModal}
        title="Delete"
        description={
          deleteTarget ? (
            <>
              Type <strong className="font-semibold">delete</strong> to permanently remove{' '}
              <strong className="font-semibold">{deleteTarget.label}</strong>.
            </>
          ) : null
        }
        size="md"
        footer={
          <div className="flex w-full flex-wrap items-center justify-end gap-[var(--dialog-modal-footer-btn-gap)]">
            <button
              type="button"
              onClick={closeDeleteModal}
              className={cn(
                p1,
                'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] border border-solid border-[var(--dialog-modal-outline-border)] bg-[var(--dialog-modal-surface)] px-4 py-2 font-bold text-[var(--dialog-modal-outline-text)] hover:bg-[var(--dialog-modal-outline-hover-bg)]',
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleteConfirmText !== 'delete'}
              onClick={confirmDelete}
              className={cn(
                p1,
                'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] px-4 py-2 font-bold text-[var(--dialog-modal-on-primary)]',
                'bg-[var(--dialog-modal-danger)] hover:bg-[var(--dialog-modal-danger-hover)]',
                'disabled:pointer-events-none disabled:opacity-50',
              )}
            >
              Delete
            </button>
          </div>
        }
      >
        <AceInputField
          id="sidebar-delete-confirm"
          label="Confirmation"
          value={deleteConfirmText}
          onChange={(e) => setDeleteConfirmText(e.target.value)}
          placeholder="delete"
          autoComplete="off"
          fieldSize="md"
        />
      </DialogModal>
    </>
  )
}
