import { useState } from 'react'
import { AceTooltip, AceTooltipContent, AceTooltipTrigger } from '../components/atoms/AceTooltip/AceTooltip'
import { MaterialSymbol } from '../components/molecules/AceAccordion/MaterialSymbol'
import { sidebarIconButtonClass } from '../components/organisms/AceSidebar/sidebarRowActions'
import { screeningToolbarIconButtonClass } from '../components/organisms/ScreeningResultsTable/screeningTableToolbar'
import { cn } from '../lib/cn'
import { LabCheckbox, LabSelect } from '../lib/labControls'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabPage, ComponentLabCode } from './ComponentLabPage'
import iconographyRules from './implementationRules/iconography.md?raw'

const HOVER_DEMO_ICONS = ['more_horiz', 'search', 'settings', 'add', 'notifications'] as const

type HoverSurface = 'gray' | 'white'

const HOVER_SURFACE_OPTIONS: { value: HoverSurface; label: string }[] = [
  { value: 'gray', label: 'Gray' },
  { value: 'white', label: 'White' },
]

const hoverSurfaceClass: Record<HoverSurface, string> = {
  gray: 'bg-[var(--screening-surface-muted)]',
  white: 'bg-[var(--screening-surface)] border border-solid border-[var(--screening-border-soft)]',
}

/** Sidebar - Iconography “No border stroke” (`sidebarIconButtonClass`). */
const iconButtonGhostClass = cn(sidebarIconButtonClass, 'text-[var(--screening-text-primary)]')

/** Forced hover for ghost (sidebar) - mirrors hover:bg + hover:shadow. */
const iconButtonGhostHoverClass = cn(
  iconButtonGhostClass,
  'bg-[var(--ace-sidebar-row-action-hover-bg)] shadow-[0_0_0_1px_var(--screening-border-strong)]',
)

/** Data table toolbar / row actions - always bordered; resting surface is white. */
const iconButtonStrokeClass = screeningToolbarIconButtonClass

/**
 * Forced hover for bordered icons - matches `screeningToolbarIconButtonClass` hover:
 * `--screening-surface-hover` (= `--ace-neutral-100`) on white resting fill.
 */
const iconButtonStrokeHoverClass = cn(
  iconButtonStrokeClass,
  'border-[var(--screening-chip-inactive-hover-border)] bg-[var(--screening-surface-hover)] text-[var(--screening-text-primary)]',
)

function IconHoverDemoButton({
  name,
  className,
  label,
  showTooltip,
}: {
  name: string
  className: string
  label: string
  showTooltip: boolean
}) {
  const button = (
    <button type="button" aria-label={label} className={className}>
      <MaterialSymbol name={name} size="md" className="text-current" />
    </button>
  )

  if (!showTooltip) return button

  return (
    <AceTooltip>
      <AceTooltipTrigger asChild>{button}</AceTooltipTrigger>
      <AceTooltipContent side="top" hideArrow variant="screening-toolbar">
        Tooltip
      </AceTooltipContent>
    </AceTooltip>
  )
}

function IconHoverVariant({
  title,
  description,
  restClass,
  hoverClass,
  surface,
  showTooltips,
}: {
  title: string
  description: string
  restClass: string
  hoverClass: string
  surface: HoverSurface
  showTooltips: boolean
}) {
  const padClass = cn(
    'flex flex-wrap items-center gap-2 rounded-[var(--radius-md)] p-3',
    hoverSurfaceClass[surface],
  )

  return (
    <div className="min-w-0 w-full space-y-3">
      <div>
        <p className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">{title}</p>
        <p className="m-0 mt-1 text-xs leading-snug text-[var(--screening-text-muted)]">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-[var(--screening-text-muted)]">
            Default
          </p>
          <div className={padClass}>
            {HOVER_DEMO_ICONS.map((name) => (
              <IconHoverDemoButton
                key={`rest-${name}`}
                name={name}
                className={restClass}
                label={`${title} default ${name}`}
                showTooltip={showTooltips}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-[var(--screening-text-muted)]">
            Hover
          </p>
          <div className={padClass}>
            {HOVER_DEMO_ICONS.map((name) => (
              <IconHoverDemoButton
                key={`hover-${name}`}
                name={name}
                className={hoverClass}
                label={`${title} hover ${name}`}
                showTooltip={showTooltips}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function IconHoverSection() {
  const [surface, setSurface] = useState<HoverSurface>('white')
  const [showTooltips, setShowTooltips] = useState(false)

  return (
    <div className={cn(labComponentContainerClass, 'gap-8')}>
      <div className="flex w-full min-w-0 flex-wrap items-end justify-start gap-6">
        <LabSelect
          label="Background"
          size="sm"
          panelWidth="compact"
          value={surface}
          onChange={setSurface}
          options={HOVER_SURFACE_OPTIONS}
          className="w-[12.5rem] shrink-0"
        />
        <LabCheckbox
          label="Tooltips"
          size="sm"
          checked={showTooltips}
          onCheckedChange={setShowTooltips}
          className="shrink-0 pb-1.5"
        />
      </div>
      <IconHoverVariant
        title="No border stroke"
        description="Sidebar icons - no border at rest; hover uses --screening-surface-hover (--ace-neutral-100) plus a 1px ring via box-shadow."
        restClass={iconButtonGhostClass}
        hoverClass={iconButtonGhostHoverClass}
        surface={surface}
        showTooltips={showTooltips}
      />
      <IconHoverVariant
        title="Border stroke"
        description="Data table toolbar and row actions - white resting fill (--screening-surface); hover uses --screening-surface-hover (--ace-neutral-100)."
        restClass={iconButtonStrokeClass}
        hoverClass={iconButtonStrokeHoverClass}
        surface={surface}
        showTooltips={showTooltips}
      />
    </div>
  )
}

type IconFill = 'outlined' | 'filled' | 'either'

type CatalogIcon = {
  id: number
  label: string
  /** Material Symbols ligature (underscore form) */
  name: string
  /** Display name from Confluence / Material IO */
  materialIoName: string
  fill: IconFill
  notes?: string
  /** Optional color override for the preview glyph */
  colorClass?: string
}

const CATALOG: CatalogIcon[] = [
  {
    id: 1,
    label: 'Three dot menu (kebab)',
    name: 'more_horiz',
    materialIoName: 'More Horiz',
    fill: 'outlined',
    notes: 'Prefer horizontal three-dot menu for clearer affordance.',
  },
  {
    id: 2,
    label: 'Notifications',
    name: 'notifications',
    materialIoName: 'Notifications',
    fill: 'outlined',
  },
  {
    id: 3,
    label: 'Help',
    name: 'help',
    materialIoName: 'Help',
    fill: 'outlined',
  },
  {
    id: 4,
    label: 'User menu / Profile',
    name: 'account_circle',
    materialIoName: 'Account Circle',
    fill: 'outlined',
  },
  {
    id: 5,
    label: 'Calendar / Date picker',
    name: 'calendar_month',
    materialIoName: 'Calendar Month',
    fill: 'outlined',
  },
  {
    id: 6,
    label: 'Close',
    name: 'close',
    materialIoName: 'Close',
    fill: 'outlined',
  },
  {
    id: 7,
    label: 'Expand',
    name: 'keyboard_arrow_right',
    materialIoName: 'Keyboard Arrow Right',
    fill: 'outlined',
  },
  {
    id: 8,
    label: 'Collapse',
    name: 'keyboard_arrow_down',
    materialIoName: 'Keyboard Arrow Down',
    fill: 'outlined',
  },
  {
    id: 9,
    label: 'Add new',
    name: 'add',
    materialIoName: 'Add',
    fill: 'outlined',
  },
  {
    id: 10,
    label: 'Refresh',
    name: 'autorenew',
    materialIoName: 'Autorenew',
    fill: 'outlined',
  },
  {
    id: 11,
    label: 'Favorite - selected',
    name: 'favorite',
    materialIoName: 'Favorite',
    fill: 'filled',
    notes: 'Selected state uses Error 500. Prefer heart over star for favorites.',
    colorClass: 'text-[var(--ace-error-500)]',
  },
  {
    id: 12,
    label: 'Favorite - default',
    name: 'favorite',
    materialIoName: 'Favorite',
    fill: 'outlined',
    notes: 'Default state without fill.',
  },
  {
    id: 13,
    label: 'Download report',
    name: 'sim_card_download',
    materialIoName: 'Sim Card Download',
    fill: 'filled',
    notes: 'Use the filled variant for consistency with other icon usage.',
  },
  {
    id: 14,
    label: 'Export and preview',
    name: 'file_export',
    materialIoName: 'File Export',
    fill: 'outlined',
  },
  {
    id: 15,
    label: 'Quick clear',
    name: 'flash_on',
    materialIoName: 'Flash On',
    fill: 'outlined',
  },
  {
    id: 16,
    label: 'Success',
    name: 'check_circle',
    materialIoName: 'Check Circle',
    fill: 'outlined',
    notes: 'Most commonly used in toast messages.',
    colorClass: 'text-[var(--ace-toast-icon-success)]',
  },
  {
    id: 17,
    label: 'Info',
    name: 'info',
    materialIoName: 'Info',
    fill: 'outlined',
    notes: 'Toast or inline message (info variant).',
    colorClass: 'text-[var(--ace-toast-icon-info)]',
  },
  {
    id: 18,
    label: 'Error',
    name: 'error',
    materialIoName: 'Error',
    fill: 'outlined',
    notes: 'Toast, inline message, modal, or failed input.',
    colorClass: 'text-[var(--ace-toast-icon-error)]',
  },
  {
    id: 19,
    label: 'Warning',
    name: 'warning',
    materialIoName: 'Warning',
    fill: 'outlined',
    notes: 'Warning toast or warning inline message.',
    colorClass: 'text-[var(--ace-toast-icon-warning)]',
  },
  {
    id: 20,
    label: 'Reorder',
    name: 'drag_handle',
    materialIoName: 'Drag Handle',
    fill: 'outlined',
    notes: 'Use Material Symbols styling for reorder handles.',
  },
  {
    id: 21,
    label: 'Test connection',
    name: 'network_check',
    materialIoName: 'Network Check',
    fill: 'outlined',
  },
  {
    id: 22,
    label: 'Settings',
    name: 'settings',
    materialIoName: 'Settings',
    fill: 'outlined',
  },
  {
    id: 23,
    label: 'Search',
    name: 'search',
    materialIoName: 'Search',
    fill: 'outlined',
  },
  {
    id: 24,
    label: 'File',
    name: 'draft',
    materialIoName: 'Draft',
    fill: 'outlined',
  },
  {
    id: 25,
    label: 'Link',
    name: 'link',
    materialIoName: 'Link',
    fill: 'outlined',
  },
  {
    id: 26,
    label: 'Blocked',
    name: 'stop_circle',
    materialIoName: 'Stop Circle',
    fill: 'outlined',
    notes: 'Do not use the filled variant.',
  },
  {
    id: 27,
    label: 'Escalate',
    name: 'arrow_circle_up',
    materialIoName: 'Arrow Circle Up',
    fill: 'outlined',
    notes: 'Do not use the filled variant.',
  },
  {
    id: 28,
    label: 'Released',
    name: 'check_circle',
    materialIoName: 'Check Circle',
    fill: 'outlined',
    notes: 'Do not use the filled variant.',
  },
  {
    id: 29,
    label: 'Canceled',
    name: 'cancel',
    materialIoName: 'Cancel',
    fill: 'outlined',
    notes: 'Do not use filled. Used as Cancel in payment screening.',
  },
  {
    id: 30,
    label: 'Locked',
    name: 'lock',
    materialIoName: 'Lock',
    fill: 'filled',
    notes: 'Always use the filled variant.',
  },
  {
    id: 31,
    label: 'Configurations → Data Manager',
    name: 'page_info',
    materialIoName: 'Page Info',
    fill: 'outlined',
    notes: 'Data Manager tab card.',
  },
  {
    id: 32,
    label: 'Active Jobs → Data Manager',
    name: 'vital_signs',
    materialIoName: 'Vital Signs',
    fill: 'outlined',
    notes: 'Data Manager tab card.',
  },
  {
    id: 33,
    label: 'History → Data Manager',
    name: 'history',
    materialIoName: 'History',
    fill: 'outlined',
    notes: 'Data Manager tab card.',
  },
  {
    id: 34,
    label: 'Expand (up)',
    name: 'keyboard_arrow_up',
    materialIoName: 'Keyboard Arrow Up',
    fill: 'outlined',
    notes: 'Time picker steppers.',
  },
  {
    id: 35,
    label: 'Previous / back',
    name: 'keyboard_arrow_left',
    materialIoName: 'Keyboard Arrow Left',
    fill: 'outlined',
    notes: 'Pagination and date picker month navigation.',
  },
  {
    id: 36,
    label: 'Check (control)',
    name: 'check',
    materialIoName: 'Check',
    fill: 'outlined',
    notes: 'Checkbox checked glyph and icon-toggle on state.',
  },
  {
    id: 37,
    label: 'Indeterminate',
    name: 'remove',
    materialIoName: 'Remove',
    fill: 'outlined',
    notes: 'Checkbox indeterminate glyph.',
  },
  {
    id: 38,
    label: 'Delete / remove',
    name: 'delete',
    materialIoName: 'Delete',
    fill: 'outlined',
    notes: 'Accordion actions, attachments remove, sidebar edit-group trash.',
  },
  {
    id: 39,
    label: 'Add (circle)',
    name: 'add_circle',
    materialIoName: 'Add Circle',
    fill: 'outlined',
    notes: 'Accordion header action.',
  },
  {
    id: 40,
    label: 'Edit',
    name: 'edit',
    materialIoName: 'Edit',
    fill: 'outlined',
    notes: 'Accordion header action.',
  },
  {
    id: 41,
    label: 'Upload',
    name: 'cloud_upload',
    materialIoName: 'Cloud Upload',
    fill: 'outlined',
    notes: 'Attachments dropzone.',
  },
  {
    id: 42,
    label: 'System action',
    name: 'apartment',
    materialIoName: 'Apartment',
    fill: 'outlined',
    notes: 'Timeline system-action variant.',
  },
  {
    id: 43,
    label: 'Pending',
    name: 'schedule',
    materialIoName: 'Schedule',
    fill: 'outlined',
    notes: 'Timeline pending variant.',
  },
  {
    id: 44,
    label: 'Columns / list view',
    name: 'view_list',
    materialIoName: 'View List',
    fill: 'outlined',
    notes: 'Data table columns menu trigger.',
  },
  {
    id: 45,
    label: 'Show (visible)',
    name: 'visibility',
    materialIoName: 'Visibility',
    fill: 'outlined',
    notes: 'Data table review-history toggle (shown).',
  },
  {
    id: 46,
    label: 'Hide',
    name: 'visibility_off',
    materialIoName: 'Visibility Off',
    fill: 'outlined',
    notes: 'Data table review-history toggle (hidden).',
  },
  {
    id: 47,
    label: 'Sort ascending',
    name: 'arrow_upward',
    materialIoName: 'Arrow Upward',
    fill: 'outlined',
    notes: 'Table column sort active (asc).',
  },
  {
    id: 48,
    label: 'Sort descending',
    name: 'arrow_downward',
    materialIoName: 'Arrow Downward',
    fill: 'outlined',
    notes: 'Table column sort active (desc).',
  },
  {
    id: 49,
    label: 'Sort idle',
    name: 'swap_vert',
    materialIoName: 'Swap Vert',
    fill: 'outlined',
    notes: 'Table column unsorted / idle sort affordance.',
  },
  {
    id: 50,
    label: 'Insight / tip',
    name: 'lightbulb',
    materialIoName: 'Lightbulb',
    fill: 'outlined',
    notes: 'Data card insight block.',
  },
  {
    id: 51,
    label: 'Sidebar collapse',
    name: 'left_panel_close',
    materialIoName: 'Left Panel Close',
    fill: 'outlined',
    notes: 'Lab / shell sidebar collapse control.',
  },
]

function fillLabel(fill: IconFill) {
  if (fill === 'filled') return 'Filled'
  if (fill === 'outlined') return 'Outlined'
  return 'Either'
}

export function IconographyLab() {
  return (
    <ComponentLabPage
      title="Iconography"
      description="ACE uses Google Material Symbols Outlined across product components. Catalog includes Confluence iconography plus icons discovered in Timeline, Data Table, Attachments, Accordion, and related organisms."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Sizes</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-wrap items-end gap-8">
                {(
                  [
                    { size: 'sm' as const, label: 'sm · 12px', note: 'Accordion / dense actions' },
                    { size: 'md' as const, label: 'md · 16px', note: 'Default UI' },
                    { size: 'lg' as const, label: 'lg · 20px', note: 'Controls / emphasis' },
                    { size: 'xl' as const, label: 'xl · 24px', note: 'Headers / toolbar' },
                  ] as const
                ).map(({ size, label, note }) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <MaterialSymbol
                      name="search"
                      size={size}
                      className="text-[var(--screening-text-primary)]"
                    />
                    <p className="m-0 text-xs font-semibold text-[var(--screening-text-primary)]">{label}</p>
                    <p className="m-0 text-[11px] text-[var(--screening-text-muted)]">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Fill</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-wrap items-center gap-10">
                <div className="flex items-center gap-3">
                  <MaterialSymbol
                    name="favorite"
                    size="lg"
                    className="text-[var(--screening-text-primary)]"
                  />
                  <div>
                    <p className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Outlined</p>
                    <p className="m-0 text-xs text-[var(--screening-text-muted)]">
                      <code className="text-[var(--screening-text-primary)]">filled=false</code> (default)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialSymbol
                    name="favorite"
                    size="lg"
                    filled
                    className="text-[var(--ace-error-500)]"
                  />
                  <div>
                    <p className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Filled</p>
                    <p className="m-0 text-xs text-[var(--screening-text-muted)]">
                      <code className="text-[var(--screening-text-primary)]">filled</code> · favorite selected
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialSymbol
                    name="lock"
                    size="lg"
                    filled
                    className="text-[var(--screening-text-primary)]"
                  />
                  <div>
                    <p className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Always filled</p>
                    <p className="m-0 text-xs text-[var(--screening-text-muted)]">Lock, download report</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Hover</p>
            <IconHoverSection />
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Icon Catalog</p>
            <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] shadow-[var(--ace-drop-shadow-xs)]">
              <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                <thead className="bg-[var(--screening-surface-muted)] text-xs font-semibold uppercase tracking-wide text-[var(--screening-text-muted)]">
                  <tr>
                    <th className="border-b border-[var(--screening-border-soft)] px-4 py-3 w-12">#</th>
                    <th className="border-b border-[var(--screening-border-soft)] px-4 py-3 w-16">Icon</th>
                    <th className="border-b border-[var(--screening-border-soft)] px-4 py-3">Usage</th>
                    <th className="border-b border-[var(--screening-border-soft)] px-4 py-3">Material IO</th>
                    <th className="border-b border-[var(--screening-border-soft)] px-4 py-3">Ligature</th>
                    <th className="border-b border-[var(--screening-border-soft)] px-4 py-3">Fill</th>
                    <th className="border-b border-[var(--screening-border-soft)] px-4 py-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {CATALOG.map((icon) => (
                    <tr
                      key={`${icon.id}-${icon.label}`}
                      className="border-b border-[var(--screening-border-soft)] last:border-b-0"
                    >
                      <td className="px-4 py-3 align-middle text-[var(--screening-text-muted)]">{icon.id}</td>
                      <td className="px-4 py-3 align-middle">
                        <MaterialSymbol
                          name={icon.name}
                          size="lg"
                          filled={icon.fill === 'filled'}
                          className={cn('text-[var(--screening-text-primary)]', icon.colorClass)}
                          title={icon.materialIoName}
                        />
                      </td>
                      <td className="px-4 py-3 align-middle font-medium text-[var(--screening-text-primary)]">
                        {icon.label}
                      </td>
                      <td className="px-4 py-3 align-middle text-[var(--screening-text-muted)]">
                        {icon.materialIoName}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <code className="text-xs text-[var(--screening-text-primary)]">{icon.name}</code>
                      </td>
                      <td className="px-4 py-3 align-middle text-[var(--screening-text-muted)]">
                        {fillLabel(icon.fill)}
                      </td>
                      <td className="max-w-[18rem] px-4 py-3 align-middle text-xs leading-snug text-[var(--screening-text-muted)]">
                        {icon.notes ?? '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Material Symbols Outlined load from Google Fonts in{' '}
            <code className="text-[var(--screening-text-primary)]">index.html</code>. Use{' '}
            <code className="text-[var(--screening-text-primary)]">MaterialSymbol</code> with the ligature name from{' '}
            <a
              href="https://fonts.google.com/icons"
              className="text-[var(--screening-primary)] underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              fonts.google.com/icons
            </a>
            .
          </p>
          <ComponentLabCode>{`import { MaterialSymbol } from '@rubertoam/ace-design-system'

{/* Default outlined */}
<MaterialSymbol name="search" size="md" />

{/* Filled + semantic color (favorite selected) */}
<MaterialSymbol
  name="favorite"
  size="md"
  filled
  className="text-[var(--ace-error-500)]"
/>

{/* Always filled */}
<MaterialSymbol name="lock" size="md" filled />

{/* Status (toast / inline) */}
<MaterialSymbol name="check_circle" size="md" className="text-[var(--ace-toast-icon-success)]" />
<MaterialSymbol name="error" size="md" className="text-[var(--ace-toast-icon-error)]" />

{/* Icon button hover - no resting border (sidebar) */}
<button className="… hover:bg-[var(--ace-sidebar-row-action-hover-bg)] hover:shadow-[0_0_0_1px_var(--screening-border-strong)]">
  <MaterialSymbol name="more_horiz" size="md" className="text-current" />
</button>

{/* Icon button hover - border stroke (data table toolbar) */}
<button className="… border border-[var(--screening-border-strong)] hover:border-[var(--screening-chip-inactive-hover-border)] hover:bg-[var(--screening-surface-hover)]">
  <MaterialSymbol name="search" size="md" className="text-current" />
</button>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Source of truth</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              ACE product icons are{' '}
              <strong className="font-semibold text-[var(--screening-text-primary)]">Material Symbols Outlined</strong>.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Icon button hover</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">No border stroke</strong>: sidebar icons (
                <code className="text-[var(--screening-text-primary)]">sidebarIconButtonClass</code> /{' '}
                <code className="text-[var(--screening-text-primary)]">sidebarRowActionButtonClass</code>
                ). No border at rest; hover fill is{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-sidebar-row-action-hover-bg</code> (
                <code className="text-[var(--screening-text-primary)]">--screening-surface-hover</code>) plus a 1px
                ring via box-shadow.
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Border stroke</strong>: data table toolbar
                and row menus (
                <code className="text-[var(--screening-text-primary)]">screeningToolbarIconButtonClass</code>). Resting
                fill is <code className="text-[var(--screening-text-primary)]">--screening-surface</code> (white);
                hover uses <code className="text-[var(--screening-text-primary)]">--screening-surface-hover</code> (
                <code className="text-[var(--screening-text-primary)]">--ace-neutral-100</code>).
              </li>
            </ul>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Decorative icons should be{' '}
              <code className="text-[var(--screening-text-primary)]">aria-hidden</code> (default on{' '}
              <code className="text-[var(--screening-text-primary)]">MaterialSymbol</code>). Icon-only controls need a
              visible or{' '}
              <code className="text-[var(--screening-text-primary)]">aria-label</code> on the button.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Finding icons</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Search on{' '}
              <a
                href="https://fonts.google.com/icons"
                className="text-[var(--screening-primary)] underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                Google Fonts Icons
              </a>
              , copy the name, and convert spaces to underscores (
              <code className="text-[var(--screening-text-primary)]">account_circle</code>).
            </p>
          </section>
        </>
      }
      implementationRulesMarkdown={iconographyRules}
    />
  )
}
