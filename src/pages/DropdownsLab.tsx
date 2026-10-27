import { useMemo, useState } from 'react'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

import { dropdownsLabQa } from './labTabDocs'
import {
  DropdownMenu,
  DropdownMenuPanel,
  type DropdownMenuEntry,
} from '../components/molecules/DropdownMenu/DropdownMenu'
import { aceDropdownFieldLabelClass } from '../components/molecules/DropdownMenu/dropdownFieldStyles'
import { cn } from '../lib/cn'
import { LabSelect } from '../lib/labControls'
import { labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'

type TriggerMode = 'field' | 'filter'
type MenuVariant =
  | 'multi-select'
  | 'primary'
  | 'three-dot'
  | 'switcher'
  | 'checkbox'
  | 'search'

const TRIGGER_OPTIONS: { value: TriggerMode; label: string }[] = [
  { value: 'field', label: 'Primary field' },
  { value: 'filter', label: 'Secondary / Filter' },
]

const MENU_OPTIONS: { value: MenuVariant; label: string }[] = [
  { value: 'multi-select', label: 'Multi-select' },
  { value: 'primary', label: 'Primary items' },
  { value: 'three-dot', label: 'Three dot' },
  { value: 'switcher', label: 'Switcher' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'search', label: 'Search' },
]

const SIZE_OPTIONS = [
  { value: 'sm' as const, label: 'Small' },
  { value: 'md' as const, label: 'Medium' },
  { value: 'lg' as const, label: 'Large' },
]

function DropdownsChangelog() {
  return (
    <div className="space-y-8">
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">20 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with ACE Design System v.3 Figma Dropdowns (
            <code className="text-[var(--color-text-primary)]">1307:3725</code> / set{' '}
            <code className="text-[var(--color-text-primary)]">2277:136</code>) and Dropdown Menus (
            <code className="text-[var(--color-text-primary)]">5318:1634</code> / MenuList{' '}
            <code className="text-[var(--color-text-primary)]">1541:6165</code>) plus semantic color/typography
            tokens. Doc canvas <code className="text-[var(--color-text-primary)]">414:2617</code>.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Rewired Primary field trigger, Secondary / FilterChip triggers, and MenuList panel/row colors from
            screening / Neutral hex aliases to semantic <code className="text-[var(--color-text-primary)]">--color-*</code>{' '}
            tokens.
          </li>
          <li>
            Primary open / LabelActive now uses brand border + brand-hover fill (like Inputs focus), not a Neutral
            gray hover + focus ring only.
          </li>
          <li>
            Secondary Active / FilterChip Selected use{' '}
            <code className="text-[var(--color-text-primary)]">colors/bg/brand</code> with inverse text/icons.
          </li>
          <li>
            MenuList elevation uses Shadow (MD) (
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-md</code>).
          </li>
          <li>Added this Changelog tab documenting the Dropdowns / Menus update.</li>
        </ul>
      </article>
    </div>
  )
}

export function DropdownsLab() {
  const [menuHost, setMenuHost] = useState<HTMLDivElement | null>(null)
  const [lastAction, setLastAction] = useState<string>(' - ')
  const [triggerMode, setTriggerMode] = useState<TriggerMode>('field')
  const [menuVariant, setMenuVariant] = useState<MenuVariant>('primary')
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')

  const [section1Item1, setSection1Item1] = useState(true)
  const [section1Item2, setSection1Item2] = useState(false)
  const [section2Item2, setSection2Item2] = useState(false)
  const [section2Item3, setSection2Item3] = useState(true)
  const [section2Item4, setSection2Item4] = useState(false)

  const [assignJanet, setAssignJanet] = useState(true)
  const [assignLaura, setAssignLaura] = useState(false)
  const [assignSam, setAssignSam] = useState(false)
  const [assignLee, setAssignLee] = useState(false)
  const [assignCarol, setAssignCarol] = useState(false)
  const [assignJana, setAssignJana] = useState(false)

  const [colClient, setColClient] = useState(true)
  const [colApplication, setColApplication] = useState(false)
  const [colAssignment, setColAssignment] = useState(true)
  const [colRecord, setColRecord] = useState(false)
  const [colMatch, setColMatch] = useState(false)

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
  const hasColumnSelection = colClient || colApplication || colAssignment || colRecord || colMatch

  const multiSelectItems: DropdownMenuEntry[] = useMemo(
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

  const primaryItems: DropdownMenuEntry[] = [
    { type: 'item', label: 'Menu Item 1', onSelect: () => setLastAction('Menu Item 1'), selected: true },
    { type: 'item', label: 'Menu Item 2', onSelect: () => setLastAction('Menu Item 2') },
  ]

  const threeDotItems: DropdownMenuEntry[] = [
    { type: 'item', label: 'Edit', onSelect: () => setLastAction('Edit') },
    { type: 'item', label: 'Copy', onSelect: () => setLastAction('Copy') },
    { type: 'item', label: 'Export', onSelect: () => setLastAction('Export') },
    { type: 'item', label: 'Delete', destructive: true, onSelect: () => setLastAction('Delete') },
  ]

  const switcherItems: DropdownMenuEntry[] = useMemo(
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

  const checkboxItems: DropdownMenuEntry[] = useMemo(
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

  const searchItems: DropdownMenuEntry[] = useMemo(() => {
    const q = searchQuery.trim()
    const base: DropdownMenuEntry[] = [
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
        // Figma Search / Results: first match uses bg/secondary (hover), match substring Body/Bold.
        ...(index === 0 ? { emphasized: 'hover' as const } : {}),
      })),
    ]
  }, [assignmentUsers, filteredUsers, searchQuery])

  const liveConfig = useMemo(() => {
    switch (menuVariant) {
      case 'multi-select':
        return {
          items: multiSelectItems,
          triggerLabel: 'Multi-select',
          panelWidth: 'wide' as const,
          showChevron: true,
        }
      case 'three-dot':
        return {
          items: threeDotItems,
          triggerLabel: 'Three dot',
          panelWidth: 'compact' as const,
          showChevron: false,
        }
      case 'switcher':
        return {
          items: switcherItems,
          triggerLabel: 'Switcher',
          panelWidth: 'default' as const,
          showChevron: true,
        }
      case 'checkbox':
        return {
          items: checkboxItems,
          triggerLabel: 'Checkbox',
          panelWidth: 'default' as const,
          showChevron: true,
        }
      case 'search':
        return {
          items: searchItems,
          triggerLabel: 'Search',
          panelWidth: 'default' as const,
          showChevron: true,
        }
      case 'primary':
      default:
        return {
          items: primaryItems,
          triggerLabel: 'Dropdown Label',
          panelWidth: 'primary' as const,
          showChevron: true,
        }
    }
  }, [checkboxItems, menuVariant, multiSelectItems, searchItems, switcherItems])

  const staticPanels: { title: string; hint: string; panelWidth: 'default' | 'compact' | 'wide' | 'primary'; items: DropdownMenuEntry[] }[] =
    [
      { title: 'Multi-select', hint: 'Sections · Select All · checkboxes', panelWidth: 'wide', items: multiSelectItems },
      { title: 'Primary', hint: 'Brand pipe + row fill on hover / selected', panelWidth: 'primary', items: primaryItems },
      { title: 'Three dot', hint: 'Compact overflow actions', panelWidth: 'compact', items: threeDotItems },
      { title: 'Switcher', hint: 'Toggles · Reset turns all off', panelWidth: 'default', items: switcherItems },
      { title: 'Checkbox', hint: 'User assignment · Reset All', panelWidth: 'default', items: checkboxItems },
      {
        title: 'Search',
        hint: 'Filtered results · match bold · first row hover',
        panelWidth: 'default',
        items: [
          {
            type: 'search',
            value: 'Jan',
            placeholder: 'Search',
            onChange: () => {},
            onClear: () => {},
          },
          {
            type: 'checkbox',
            label: 'Janet Analyst',
            checked: false,
            onCheckedChange: () => {},
            style: 'assignment',
            matchHighlight: 'Jan',
            emphasized: 'hover',
          },
          {
            type: 'checkbox',
            label: 'Jana Smith',
            checked: false,
            onCheckedChange: () => {},
            style: 'assignment',
            matchHighlight: 'Jan',
          },
        ],
      },
    ]

  const toolbar = (
    <div ref={setMenuHost} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabSelect label="Trigger" value={triggerMode} onChange={setTriggerMode} options={TRIGGER_OPTIONS} />
        <LabSelect label="Menu list" value={menuVariant} onChange={setMenuVariant} options={MENU_OPTIONS} />
        <LabSelect label="Size" value={size} onChange={setSize} options={SIZE_OPTIONS} />
      </div>

      <div className="flex flex-col gap-4 border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="flex flex-wrap items-end justify-start gap-4">
          {triggerMode === 'field' ? (
            <div className="flex flex-col gap-2">
              <span className={aceDropdownFieldLabelClass}>Label</span>
              <DropdownMenu
                triggerLabel={liveConfig.triggerLabel}
                triggerMode="field"
                size={size}
                panelWidth={liveConfig.panelWidth}
                showChevron={liveConfig.showChevron}
                items={liveConfig.items}
                portalContainer={menuHost}
              />
            </div>
          ) : (
            <DropdownMenu
              triggerLabel={liveConfig.triggerLabel}
              triggerMode="filter"
              size={size === 'lg' ? 'md' : size}
              panelWidth={liveConfig.panelWidth}
              showChevron={liveConfig.showChevron}
              items={liveConfig.items}
              portalContainer={menuHost}
            />
          )}
        </div>
        <p className="m-0 text-sm text-[var(--color-text-secondary)]">
          Last action: <span className="font-medium text-[var(--color-text-primary)]">{lastAction}</span>
        </p>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={dropdownsLabQa}
      title="Dropdowns"
      description="ACE Design System v.3 dropdowns (Figma 1307:3725 / set 2277:136) and menus (5318:1634 / MenuList 1541:6165): Primary field (default / LabelActive), Secondary / FilterChip triggers, and MenuList variants (MultiSelect, Primary, Three Dot, Switchers, Checkbox, Search). Colors and type wired to semantic --color-* and --ace-type-* tokens."
      examplesToolbar={toolbar}
      examples={
        <section className="space-y-10">
          <div className={cn('w-full min-w-0 space-y-2', labUsageSectionClass)}>
            <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
            <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
              Closed triggers and frozen MenuList panels. Open the control above for live menus.
            </p>
          </div>

          <div>
            <p className={cn(labSectionLabelClass, 'mb-5')}>Triggers</p>
            <div className="flex flex-wrap items-end justify-start gap-x-10 gap-y-8">
              <div className="flex flex-col gap-3">
                <p className="m-0 text-sm font-medium text-[var(--color-text-primary)]">Primary</p>
                <div className="flex flex-col gap-2">
                  <span className={aceDropdownFieldLabelClass}>Label</span>
                  <DropdownMenu
                    triggerLabel="Dropdown Label"
                    triggerMode="field"
                    size="md"
                    panelWidth="primary"
                    items={primaryItems}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="m-0 text-sm font-medium text-[var(--color-text-primary)]">Secondary</p>
                <DropdownMenu
                  triggerLabel="Dropdown No Label"
                  triggerMode="filter"
                  panelWidth="wide"
                  items={multiSelectItems}
                  disabled
                />
              </div>
            </div>
          </div>

          <div>
            <p className={cn(labSectionLabelClass, 'mb-5')}>Menu lists</p>
            <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2 xl:grid-cols-3">
              {staticPanels.map((panel) => (
                <div key={panel.title} className="flex min-w-0 flex-col gap-4">
                  <div className="space-y-1">
                    <p className="m-0 text-sm font-medium text-[var(--color-text-primary)]">{panel.title}</p>
                    <p className="m-0 text-xs text-[var(--color-text-secondary)]">{panel.hint}</p>
                  </div>
                  <DropdownMenuPanel
                    items={panel.items}
                    panelWidth={panel.panelWidth}
                    staticDisplay
                    aria-label={`${panel.title} static menu`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      }
      code={
        <ComponentLabCode>{`import { DropdownMenu } from '../components/molecules/DropdownMenu/DropdownMenu'

<DropdownMenu
  triggerLabel="Dropdown Label"
  triggerMode="field"
  panelWidth="primary"
  items={[
    { type: 'item', label: 'Menu Item 1', onSelect },
    { type: 'item', label: 'Menu Item 2', onSelect },
  ]}
/>

<DropdownMenu
  triggerLabel="Dropdown No Label"
  triggerMode="filter"
  panelWidth="wide"
  items={multiSelectItems}
/>`}</ComponentLabCode>
      }
      usage={
        <div className={cn('max-w-3xl space-y-4', labUsageSectionClass)}>
          <p className="m-0 leading-relaxed text-[var(--color-text-muted)]">
            Import <code className="text-[var(--color-text-primary)]">DropdownMenu</code> with a typed{' '}
            <code className="text-[var(--color-text-primary)]">items</code> array. Use{' '}
            <code className="text-[var(--color-text-primary)]">triggerMode=&quot;field&quot;</code> for Primary
            dropdowns (form fields), <code className="text-[var(--color-text-primary)]">filter</code> for Secondary /
            FilterChip triggers. Pass <code className="text-[var(--color-text-primary)]">portalContainer</code> when the
            menu must mount inside a scroll container.
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Primary trigger: <code className="text-[var(--color-text-primary)]">--dropdown-menu-trigger-*</code>
          </li>
          <li>
            Secondary / FilterChip: <code className="text-[var(--color-text-primary)]">--filter-trigger-*</code> /{' '}
            <code className="text-[var(--color-text-primary)]">--filter-chip-*</code>
          </li>
          <li>
            Menu panel: <code className="text-[var(--color-text-primary)]">--dropdown-menu-surface</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--dropdown-menu-shadow</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-md</code>
          </li>
          <li>
            Rows (Figma 5318:1634): hover{' '}
            <code className="text-[var(--color-text-primary)]">--dropdown-menu-row-hover</code> (bg/secondary), selected{' '}
            <code className="text-[var(--color-text-primary)]">--dropdown-menu-row-selected</code> (bg/brand-hover), pipe{' '}
            <code className="text-[var(--color-text-primary)]">--dropdown-menu-primary</code> (text/brand)
          </li>
          <li>
            Select All / Reset All:{' '}
            <code className="text-[var(--color-text-primary)]">--dropdown-menu-action</code> → text/primary
          </li>
        </ul>
      }
      changelog={<DropdownsChangelog />}
    />
  )
}
