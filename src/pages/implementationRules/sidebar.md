# Sidebar business rules

Component: `Sidebar`

## 1. Data model

| Type | Fields | Notes |
|------|--------|-------|
| `SidebarVariant` | `'navigation' \| 'groups'` | Required |
| `SidebarOrganizationDisplay` | `'switcher' \| 'label'` | Navigation only |
| `SidebarMenuAction` | `'edit' \| 'copy' \| 'delete'` | Overflow callbacks |
| `SidebarOrganization` | `id`, `label` | |
| `SidebarNavItem` | `id`, `label`, `selected?`, `onSelect?`, `onMenuAction?` | Flat or nested under a group |
| `SidebarGroup` | `id`, `label`, `expanded?`, `items?`, `onToggle?`, `onAdd?`, `onMenuAction?` | |

Selected org resolves to `organizations.find(id === selectedOrganizationId) ?? organizations[0]`.

---

## 2. Component structure

```
<aside data-open aria-hidden={!open}>
  header
    navigation → org switcher OR static label
    groups → “New Group” CTA
  <nav>
    navigation → NavItemRow[]
    groups → SidebarGroupBlock[] (chevron, label, optional +, overflow, nested items)
  children
</aside>
```

Nearby pieces include `SidebarOverflowMenu`, `GroupFormDialog`, and the lab’s delete confirm modal.

---

## 3. Configuration

| Prop | Default | Behavior |
|------|---------|----------|
| `variant` | Required | Chooses navigation or groups |
| `open` / `defaultOpen` | `defaultOpen=true` | Controls width and visibility (`open = openProp ?? defaultOpen`) |
| `onOpenChange` | n/a | Declared on the type, but the component does not call it. The parent toggles `open` |
| `organizationDisplay` | `'switcher'` | Use `'label'` for a non-interactive name |
| `addLabel` | `'New Group'` | Label on the groups header CTA |
| `showGroupAdd` | `false` | Shows + when `group.onAdd` is also set |
| `emptyGroupMessage` | Long default copy | Shortens when `showGroupAdd` is off |
| `menuPortalContainer` | n/a | Portal menus out of clipped shells |

---

## 4. Interaction rules

### Open and close
- The parent owns `open` (the lab header uses `left_panel_close` and rotates it when open)
- When closed: width is `0`, border and shadow are gone, content is hidden and non-interactive, and `aria-hidden` is set

### Navigation
- Clicking a row calls `onSelect`. Selected and hover styles use the sidebar item tokens
- A row overflow menu exists in code, but the shipped lab keeps `showRowMenu` off

### Organization
- Switcher: choosing an option fires `onOrganizationChange(id)`
- Label: display only

### Groups
- Header click calls `onToggle` (expand state stays with the host)
- Chevron is `keyboard_arrow_right` and rotates to 90 degrees when expanded
- If + is enabled, it stops propagation then calls `onAdd`
- Overflow Edit / Copy / Delete calls `onMenuAction`
- An expanded group with no items shows the empty message

### Group form (lab dialog)
- **Edit:** Trash marks an item for removal. Save stays disabled if the name is empty, no items remain, or nothing changed
- **Copy:** Checkboxes choose which items to keep. Copy creates a new expanded group with new ids
- The list starts scrolling after 5 rows
- Delete confirm only continues if the user types exactly `delete`

---

## 5. Keyboard and focus

- Row, New Group, and + buttons use focus-visible rings
- Overflow and row actions show on hover, focus-within, or when the group / menu is open
- Dropdowns follow Radix keyboard behavior (arrows, Enter, Escape)

---

## 6. Defaults and initial state

| State | Default |
|-------|---------|
| Open | `true` |
| Org display | `switcher` |
| `showGroupAdd` | `false` |
| Lists | `[]` |
| Overflow actions | Edit, Copy, Delete (destructive) |

---

## 7. API

```
SidebarProps = {
  variant: 'navigation' | 'groups'
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void   // parent should toggle; unused internally
  organizations?, selectedOrganizationId?, onOrganizationChange?, organizationDisplay?
  navItems?
  groups?, showGroupAdd?, onNewGroup?, addLabel?, emptyGroupMessage?
  menuPortalContainer?, className?, children?
}
```

The host owns open state, selection, group expansion, and any create / edit / delete side effects.

---

## 8. Accessibility

- The `aside` sets `aria-hidden={!open}` and `data-open={open}`
- Nav label is `"Sidebar navigation"` or `"Sidebar groups"`
- Rows and group headers use `aria-label`, with `aria-expanded` on groups
- + and overflow controls are named (`Add to …`, `Actions for …`)
- Icons stay decorative through `MaterialSymbol` (`aria-hidden` by default)

---

## 9. Visual and design tokens

| Area | Tokens |
|------|--------|
| Width / control | `--ace-sidebar-width` (290px), `--ace-sidebar-control-width` |
| Panel | `--ace-sidebar-border`, `--ace-sidebar-shadow` |
| Items / groups | `--ace-sidebar-item-*`, `--ace-sidebar-group-*`, `--ace-sidebar-heading-*` |
| Actions | `--ace-sidebar-row-action-hover-bg` (no resting border) |
| Motion | `--ace-sidebar-duration-panel`, `--ace-sidebar-duration-expand` with standard ease; respects `motion-reduce` |
| Edit dialog | `--ace-edit-group-*`, success / error wash tokens |
| Type | `--ace-type-paragraph-p1-*` |

---

## 10. QA checklist

- Open and close update width, opacity, border, shadow, and `aria-hidden`
- Navigation selection works; org switcher and label modes both behave
- Groups expand with the chevron; empty copy changes with `showGroupAdd`
- + only shows when both `showGroupAdd` and `onAdd` are set; menus portal out of clipped areas
- Overflow Edit / Copy / Delete work; delete needs the typed confirmation
- Edit dimming, Copy checkbox count, and Save disable rules look right
- Action icons reveal correctly; reduced motion turns transitions off
