import { useMemo, useState, type ReactNode } from 'react'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { AceDropdownMenu, type AceDropdownMenuEntry } from '../components/molecules/AceDropdownMenu/AceDropdownMenu'

const rowClass =
  'flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 border-b border-[var(--screening-border-row)] pb-4 last:border-0 last:pb-0'

const rowLabelClass = 'm-0 text-sm font-medium text-[var(--screening-text-primary)]'
const rowHintClass = 'm-0 text-xs text-[var(--screening-text-muted)]'

function LabRow({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className={rowClass}>
      <div className="min-w-0 shrink-0 sm:w-48">
        <p className={rowLabelClass}>{label}</p>
        {hint ? <p className={rowHintClass}>{hint}</p> : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export function DropdownsLab() {
  const [menuHost, setMenuHost] = useState<HTMLDivElement | null>(null)
  const [lastAction, setLastAction] = useState<string>('—')

  const [section1Item1, setSection1Item1] = useState(false)
  const [section1Item2, setSection1Item2] = useState(false)
  const [section2Item2, setSection2Item2] = useState(false)
  const [section2Item3, setSection2Item3] = useState(false)
  const [section2Item4, setSection2Item4] = useState(false)

  const [assignJanet, setAssignJanet] = useState(false)
  const [assignLaura, setAssignLaura] = useState(false)
  const [assignSam, setAssignSam] = useState(false)
  const [assignLee, setAssignLee] = useState(false)
  const [assignCarol, setAssignCarol] = useState(false)
  const [assignJana, setAssignJana] = useState(false)

  const [colClient, setColClient] = useState(false)
  const [colApplication, setColApplication] = useState(false)
  const [colAssignment, setColAssignment] = useState(false)
  const [colRecord, setColRecord] = useState(false)
  const [colMatch, setColMatch] = useState(false)

  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [layout, setLayout] = useState('editor')

  const [searchQuery, setSearchQuery] = useState('')

  const assignmentUsers = useMemo(
    () => [
      { id: 'janet', label: 'Janet Analyst', checked: assignJanet, setChecked: setAssignJanet },
      { id: 'laura', label: 'Laura Leader', checked: assignLaura, setChecked: setAssignLaura },
      { id: 'sam', label: 'Sam Owner', checked: assignSam, setChecked: setAssignSam },
      { id: 'lee', label: 'Lee Support', checked: assignLee, setChecked: setAssignLee },
      { id: 'carol', label: 'Carol Admin', checked: assignCarol, setChecked: setAssignCarol },
      { id: 'jana', label: 'Jana Smith', checked: assignJana, setChecked: setAssignJana },
    ],
    [assignCarol, assignJanet, assignJana, assignLaura, assignLee, assignSam],
  )

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return assignmentUsers
    return assignmentUsers.filter((u) => u.label.toLowerCase().includes(q))
  }, [assignmentUsers, searchQuery])

  const hasAssignmentSelection = useMemo(
    () => assignmentUsers.some((u) => u.checked),
    [assignmentUsers],
  )

  const resetAssignment = () => {
    setAssignJanet(false)
    setAssignLaura(false)
    setAssignSam(false)
    setAssignLee(false)
    setAssignCarol(false)
    setAssignJana(false)
    setLastAction('Reset assignment')
  }

  const resetColumns = () => {
    setColClient(false)
    setColApplication(false)
    setColAssignment(false)
    setColRecord(false)
    setColMatch(false)
    setLastAction('Reset columns')
  }

  const section1AllSelected = section1Item1 && section1Item2
  const section2AllSelected = section2Item2 && section2Item3 && section2Item4

  const multiSelectItems: AceDropdownMenuEntry[] = useMemo(
    () => [
      {
        type: 'sectionHeader',
        label: 'Section 1',
        action: {
          label: section1AllSelected ? 'Deselect All' : 'Select All',
          onSelect: () => {
            if (section1AllSelected) {
              setSection1Item1(false)
              setSection1Item2(false)
              setLastAction('Deselect all · Section 1')
            } else {
              setSection1Item1(true)
              setSection1Item2(true)
              setLastAction('Select all · Section 1')
            }
          },
        },
      },
      {
        type: 'checkbox',
        label: 'Menu Item 1',
        checked: section1Item1,
        onCheckedChange: setSection1Item1,
        style: 'assignment',
      },
      {
        type: 'checkbox',
        label: 'Menu Item 2',
        checked: section1Item2,
        onCheckedChange: setSection1Item2,
        style: 'assignment',
      },
      {
        type: 'sectionHeader',
        label: 'Section 2',
        action: {
          label: section2AllSelected ? 'Deselect All' : 'Select All',
          onSelect: () => {
            if (section2AllSelected) {
              setSection2Item2(false)
              setSection2Item3(false)
              setSection2Item4(false)
              setLastAction('Deselect all · Section 2')
            } else {
              setSection2Item2(true)
              setSection2Item3(true)
              setSection2Item4(true)
              setLastAction('Select all · Section 2')
            }
          },
        },
      },
      {
        type: 'checkbox',
        label: 'Menu Item 2',
        checked: section2Item2,
        onCheckedChange: setSection2Item2,
        style: 'assignment',
      },
      {
        type: 'checkbox',
        label: 'Menu Item 3',
        checked: section2Item3,
        onCheckedChange: setSection2Item3,
        style: 'assignment',
      },
      {
        type: 'checkbox',
        label: 'Menu Item 4',
        checked: section2Item4,
        onCheckedChange: setSection2Item4,
        style: 'assignment',
      },
    ],
    [section1AllSelected, section1Item1, section1Item2, section2AllSelected, section2Item2, section2Item3, section2Item4],
  )

  const primaryItems: AceDropdownMenuEntry[] = [
    { type: 'item', label: 'Menu Item 1', onSelect: () => setLastAction('Menu Item 1') },
    { type: 'item', label: 'Menu Item 2', onSelect: () => setLastAction('Menu Item 2') },
  ]

  const threeDotItems: AceDropdownMenuEntry[] = [
    { type: 'item', label: 'Edit', onSelect: () => setLastAction('Edit') },
    { type: 'item', label: 'Copy', onSelect: () => setLastAction('Copy') },
    { type: 'item', label: 'Export', onSelect: () => setLastAction('Export') },
    { type: 'item', label: 'Delete', destructive: true, onSelect: () => setLastAction('Delete') },
  ]

  const hasColumnSelection = colClient || colApplication || colAssignment || colRecord || colMatch

  const switcherItems: AceDropdownMenuEntry[] = useMemo(
    () => [
      { type: 'menuHeader', label: 'Show Columns' },
      { type: 'toggle', label: 'Client Name', checked: colClient, onCheckedChange: setColClient },
      { type: 'toggle', label: 'Application', checked: colApplication, onCheckedChange: setColApplication },
      { type: 'toggle', label: 'Assignment', checked: colAssignment, onCheckedChange: setColAssignment },
      { type: 'toggle', label: 'Record Type', checked: colRecord, onCheckedChange: setColRecord },
      { type: 'toggle', label: 'Match Count', checked: colMatch, onCheckedChange: setColMatch },
      ...(hasColumnSelection
        ? [{ type: 'footerAction' as const, label: 'Reset', onSelect: resetColumns }]
        : []),
    ],
    [colApplication, colAssignment, colClient, colMatch, colRecord, hasColumnSelection],
  )

  const checkboxItems: AceDropdownMenuEntry[] = useMemo(
    () => [
      { type: 'menuHeader', label: 'User Assignment' },
      ...assignmentUsers.map((u) => ({
        type: 'checkbox' as const,
        label: u.label,
        checked: u.checked,
        onCheckedChange: u.setChecked,
        style: 'assignment' as const,
      })),
      ...(hasAssignmentSelection
        ? [{ type: 'footerAction' as const, label: 'Reset All', onSelect: resetAssignment }]
        : []),
    ],
    [assignmentUsers, hasAssignmentSelection],
  )

  const searchItems: AceDropdownMenuEntry[] = useMemo(() => {
    const q = searchQuery.trim()
    const base: AceDropdownMenuEntry[] = [
      {
        type: 'search',
        value: searchQuery,
        placeholder: 'Search',
        onChange: setSearchQuery,
        onClear: () => setSearchQuery(''),
      },
    ]

    if (!q) {
      return [
        ...base,
        { type: 'menuHeader', label: 'User Assignment' },
        ...assignmentUsers.map((u) => ({
          type: 'checkbox' as const,
          label: u.label,
          checked: u.checked,
          onCheckedChange: u.setChecked,
          style: 'assignment' as const,
        })),
        ...(hasAssignmentSelection
          ? [{ type: 'footerAction' as const, label: 'Reset All', onSelect: resetAssignment }]
          : []),
      ]
    }

    return [
      ...base,
      ...filteredUsers.map((u, index) => ({
        type: 'checkbox' as const,
        label: u.label,
        checked: u.checked,
        onCheckedChange: u.setChecked,
        style: 'assignment' as const,
        matchHighlight: q,
        emphasized: index === 0,
      })),
      ...(hasAssignmentSelection
        ? [{ type: 'footerAction' as const, label: 'Reset All', onSelect: resetAssignment }]
        : []),
    ]
  }, [assignmentUsers, filteredUsers, hasAssignmentSelection, searchQuery])

  const viewOptionsItems: AceDropdownMenuEntry[] = useMemo(
    () => [
      { type: 'label', label: 'Account' },
      { type: 'item', label: 'Profile', shortcut: '⌘P', onSelect: () => setLastAction('Profile') },
      { type: 'separator' },
      { type: 'label', label: 'Options' },
      {
        type: 'checkbox',
        label: 'Show status bar',
        checked: showStatusBar,
        onCheckedChange: setShowStatusBar,
        style: 'assignment',
      },
      {
        type: 'checkbox',
        label: 'Show activity bar',
        checked: showActivityBar,
        onCheckedChange: setShowActivityBar,
        style: 'assignment',
      },
      { type: 'separator' },
      { type: 'label', label: 'Layout' },
      {
        type: 'radioGroup',
        value: layout,
        onValueChange: (value) => {
          setLayout(value)
          setLastAction(`Layout: ${value}`)
        },
        options: [
          { value: 'editor', label: 'Editor' },
          { value: 'split', label: 'Split' },
          { value: 'preview', label: 'Preview' },
        ],
      },
      { type: 'separator' },
      {
        type: 'sub',
        label: 'More tools',
        items: [
          { type: 'item', label: 'Command palette…', shortcut: '⌘⇧P', onSelect: () => setLastAction('Command palette') },
          { type: 'item', label: 'Keyboard shortcuts', onSelect: () => setLastAction('Shortcuts') },
          { type: 'separator' },
          { type: 'item', label: 'Report issue', onSelect: () => setLastAction('Report issue') },
        ],
      },
    ],
    [layout, showActivityBar, showStatusBar],
  )

  return (
    <ComponentLabPage
      title="Dropdowns"
      description="Interactive menu lists opened from field triggers. Hover, selection, checkboxes, toggles, search filtering, Select All, and Reset All behave while the menu is open. Static specs live in Figma Menu Lists."
      examples={
        <div ref={setMenuHost} className="relative flex flex-col gap-6">
          <p className="m-0 text-sm text-[var(--screening-text-secondary)]">
            Open each dropdown to explore a menu list variant. Last action:{' '}
            <span className="font-medium text-[var(--screening-text-primary)]">{lastAction}</span>
          </p>

          <div className="flex flex-col gap-4">
            <LabRow label="Multi-select" hint="Sections · Select All · checkboxes">
              <AceDropdownMenu
                triggerLabel="Multi-select"
                triggerMode="field"
                size="md"
                panelWidth="wide"
                items={multiSelectItems}
                portalContainer={menuHost}
              />
            </LabRow>

            <LabRow label="Primary" hint="Purple pipe + row fill on hover">
              <AceDropdownMenu
                triggerLabel="Primary"
                triggerMode="field"
                size="md"
                panelWidth="wide"
                items={primaryItems}
                portalContainer={menuHost}
              />
            </LabRow>

            <LabRow label="Three dot" hint="Compact overflow actions">
              <AceDropdownMenu
                triggerLabel="Three dot"
                triggerMode="field"
                size="sm"
                showChevron={false}
                panelWidth="compact"
                items={threeDotItems}
                portalContainer={menuHost}
              />
            </LabRow>

            <LabRow label="Switcher" hint="Toggles · Reset turns all off">
              <AceDropdownMenu
                triggerLabel="Switcher"
                triggerMode="field"
                size="md"
                items={switcherItems}
                portalContainer={menuHost}
              />
            </LabRow>

            <LabRow label="Checkbox" hint="User assignment · Reset All">
              <AceDropdownMenu
                triggerLabel="Checkbox"
                triggerMode="field"
                size="md"
                items={checkboxItems}
                portalContainer={menuHost}
              />
            </LabRow>

            <LabRow label="Search" hint="Type to filter · match highlight">
              <AceDropdownMenu
                triggerLabel="Search"
                triggerMode="field"
                size="md"
                items={searchItems}
                portalContainer={menuHost}
              />
            </LabRow>

            <LabRow label="View options" hint="Checkbox · radio · submenu flyout">
              <AceDropdownMenu
                triggerLabel="View options"
                triggerMode="field"
                size="md"
                items={viewOptionsItems}
                portalContainer={menuHost}
              />
            </LabRow>
          </div>
        </div>
      }
      code={
        <ComponentLabCode>{`<AceDropdownMenu
  triggerLabel="Search"
  triggerMode="field"
  items={[
    { type: 'search', value: query, onChange: setQuery, onClear: () => setQuery('') },
    { type: 'checkbox', label: 'Janet Analyst', checked, onCheckedChange, style: 'assignment' },
    { type: 'footerAction', label: 'Reset All', onSelect: resetAll },
  ]}
  portalContainer={host}
/>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Use <code className="text-[var(--color-text-primary)]">AceDropdownMenu</code> with a typed{' '}
          <code className="text-[var(--color-text-primary)]">items</code> array. Menu panels use{' '}
          <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xs</code>, design-system{' '}
          <code className="text-[var(--color-text-primary)]">Checkbox</code> and <code className="text-[var(--color-text-primary)]">Toggle</code> at{' '}
          <code className="text-[var(--color-text-primary)]">size=&quot;sm&quot;</code>, and no leading icons in list rows. Pass{' '}
          <code className="text-[var(--color-text-primary)]">portalContainer</code> when the menu must mount inside a scroll container; theme follows the lab Theme control on <code className="text-[var(--color-text-primary)]">&lt;html&gt;</code>. Triggers: Figma · Dropdowns.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Trigger width: <code className="text-[var(--color-text-primary)]">--ace-dropdown-trigger-width</code> (200px)
          </li>
          <li>
            Panel elevation: <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xs</code> (maps to{' '}
            <code className="text-[var(--color-text-primary)]">--ace-dropdown-menu-shadow</code>)
          </li>
          <li>
            Surface / border / text: <code className="text-[var(--color-text-primary)]">--ace-dropdown-menu-surface</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-dropdown-menu-border</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-dropdown-menu-text</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-dropdown-menu-text-muted</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-dropdown-menu-primary</code>
          </li>
          <li>
            Row hover: <code className="text-[var(--color-text-primary)]">--ace-dropdown-menu-row-hover</code>, emphasized:{' '}
            <code className="text-[var(--color-text-primary)]">--ace-dropdown-menu-row-emphasis</code>
          </li>
          <li>
            Checkbox / toggle: <code className="text-[var(--color-text-primary)]">--screening-checkbox-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toggle-*</code> (sm in menus)
          </li>
          <li>
            Typography: <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-label-bold</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-footer-regular</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>
          </li>
          <li>
            Destructive row: <code className="text-[var(--color-text-primary)]">--dialog-modal-danger</code>
          </li>
        </ul>
      }
    />
  )
}
