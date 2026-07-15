import { useCallback, useMemo, useState } from 'react'
import { AceButton } from '../components/atoms/AceButton'
import {
  AceFilterChip,
  AceFilterToggleChip,
  AceTableFilterHeader,
  FILTER_VIEW_MODE_PANEL_WIDTH,
  filterViewModeLabel,
  filterViewModeMenuItems,
  type FilterViewMode,
} from '../components/molecules/AceFiltering'
import {
  AceDropdownMenu,
  type AceDropdownMenuEntry,
} from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import {
  DEFAULT_SCREENING_TABLE_VISIBILITY_CONTROLS,
  ScreeningResultsTable,
  type ScreeningResultsTableVisibilityControls,
} from '../components/organisms/ScreeningResultsTable/ScreeningResultsTable'
import { ScreeningColumnsMenu } from '../components/organisms/ScreeningResultsTable/ScreeningColumnsMenu'
import { DialogModal } from '../components/molecules/DialogModal/DialogModal'
import { LabCheckbox, LabSelect } from '../lib/labControls'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import dataTableRules from './implementationRules/dataTable.md?raw'
import { cn } from '../lib/cn'

function aceTypography(token: string) {
  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`
}

const VISIBILITY_CONTROL_OPTIONS: {
  key: keyof ScreeningResultsTableVisibilityControls
  label: string
  hint?: string
}[] = [
  { key: 'showCheckboxes', label: 'Checkboxes', hint: 'Row and header selection' },
  { key: 'showExpandChevrons', label: 'Expand chevrons', hint: 'Header expand-all and per-row expansion' },
  { key: 'showRowSearch', label: 'Search field', hint: 'Toolbar search input' },
  { key: 'showColumnMenu', label: 'Columns menu', hint: 'Show or hide table columns' },
  { key: 'showHistoryToggle', label: 'History toggle', hint: 'Show or hide reviewed (Escalated) rows' },
  {
    key: 'showQuickFilters',
    label: 'Quick filters',
    hint: 'Removes the “Filter by” label and status chips',
  },
  {
    key: 'showPagination',
    label: 'Pagination',
    hint: 'Footer: range, rows-per-page select, and page controls',
  },
  {
    key: 'showAccordionHeader',
    label: 'Show accordion container',
    hint: 'Wraps the table in a collapsible accordion; off renders a flat table shell',
  },
  {
    key: 'showDisabledRows',
    label: 'Disabled rows',
    hint: 'Escalated rows use disabled styling; off shows them as enabled (New)',
  },
  {
    key: 'showEditableCells',
    label: 'Editable Cells',
    hint: 'Adds a Notes column with text inputs',
  },
  {
    key: 'showDraggableRows',
    label: 'Draggable',
    hint: 'Adds drag handles so rows can be reordered',
  },
  {
    key: 'showDropdownColumn',
    label: 'Dropdowns',
    hint: 'Adds a Decision column with select menus',
  },
  {
    key: 'showStepperColumn',
    label: 'Stepper',
    hint: 'Adds a Count column with plus/minus steppers',
  },
]

/** Scroll the options list only after more than 10 rows (~3.75rem each). */
const PREVIEW_OPTIONS_LIST_SCROLL_CLASS = 'max-h-[calc(10*3.75rem)] overflow-y-auto'

const FILTER_OPTIONS = [
  { id: 'locked', menuLabel: 'Locked', chipLabel: 'Locked: All' },
  { id: 'users', menuLabel: 'Users', chipLabel: 'User: All' },
  { id: 'groups', menuLabel: 'Groups', chipLabel: 'Group: All' },
  { id: 'statuses', menuLabel: 'Statuses', chipLabel: 'Status: All' },
] as const

type FilterOptionId = (typeof FILTER_OPTIONS)[number]['id']
type HeaderFilterType = 'triggers' | 'chips'

const FILTER_TYPE_OPTIONS = [
  { value: 'triggers' as const, label: 'Filter Triggers' },
  { value: 'chips' as const, label: 'Filter Chips' },
]

const examplesToolbarPanel = cn(
  'w-full min-w-0 rounded-[var(--radius-lg)] border border-solid border-[var(--screening-border-strong)]',
  'bg-[var(--screening-surface)] p-4 shadow-[var(--ace-drop-shadow-xs)] sm:p-5',
)

export function DataTableLab() {
  const [visibilityControls, setVisibilityControls] = useState<ScreeningResultsTableVisibilityControls>(() => ({ ...DEFAULT_SCREENING_TABLE_VISIBILITY_CONTROLS }))
  const [draftVisibilityControls, setDraftVisibilityControls] = useState<ScreeningResultsTableVisibilityControls>(() => ({
    ...DEFAULT_SCREENING_TABLE_VISIBILITY_CONTROLS,
  }))
  const [columnResizing, setColumnResizing] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [headerSearch, setHeaderSearch] = useState('')
  const [filterType, setFilterType] = useState<HeaderFilterType>('triggers')
  const [viewMode, setViewMode] = useState<FilterViewMode>('client')
  const [activeFilters, setActiveFilters] = useState<Set<FilterOptionId>>(() => new Set())
  const [toggledChips, setToggledChips] = useState<Set<FilterOptionId>>(() => new Set())

  const openPreviewOptions = useCallback(() => {
    setDraftVisibilityControls({ ...visibilityControls })
    setModalOpen(true)
  }, [visibilityControls])

  const closePreviewOptions = useCallback(() => {
    setModalOpen(false)
  }, [])

  const applyPreviewOptions = useCallback(() => {
    setVisibilityControls({ ...draftVisibilityControls })
    setModalOpen(false)
  }, [draftVisibilityControls])

  const toggleDraftVisibilityControl = useCallback((key: keyof ScreeningResultsTableVisibilityControls) => {
    setDraftVisibilityControls((c) => ({ ...c, [key]: !c[key] }))
  }, [])

  const toggleFilter = (id: FilterOptionId, checked: boolean) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const clearFilter = (id: FilterOptionId) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const toggleChip = (id: FilterOptionId) => {
    setToggledChips((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filterMenuItems: AceDropdownMenuEntry[] = useMemo(
    () =>
      FILTER_OPTIONS.map((option) => ({
        type: 'checkbox' as const,
        id: option.id,
        label: option.menuLabel,
        checked: activeFilters.has(option.id),
        onCheckedChange: (checked: boolean) => toggleFilter(option.id, checked),
        style: 'assignment' as const,
      })),
    [activeFilters],
  )

  const viewModeItems = useMemo(
    () => filterViewModeMenuItems(viewMode, setViewMode),
    [viewMode],
  )

  const activeChips = FILTER_OPTIONS.filter((option) => activeFilters.has(option.id))

  const viewModeMenu = (
    <AceDropdownMenu
      triggerLabel={filterViewModeLabel(viewMode)}
      triggerMode="filter"
      panelWidth={FILTER_VIEW_MODE_PANEL_WIDTH}
      items={viewModeItems}
    />
  )

  const headerActions =
    filterType === 'triggers' ? (
      <>
        {viewModeMenu}
        <AceDropdownMenu triggerLabel="Filters" triggerMode="filter" items={filterMenuItems} />
      </>
    ) : (
      <>
        {viewModeMenu}
        {FILTER_OPTIONS.map((option) => (
          <AceFilterToggleChip
            key={option.id}
            label={option.menuLabel}
            pressed={toggledChips.has(option.id)}
            onClick={() => toggleChip(option.id)}
          />
        ))}
      </>
    )

  const headerChips =
    filterType === 'triggers' && activeChips.length > 0
      ? activeChips.map((option) => (
          <AceFilterChip
            key={option.id}
            label={option.chipLabel}
            onClear={() => clearFilter(option.id)}
          />
        ))
      : null

  return (
    <ComponentLabPage
      title="Data Table"
      description="Dense results grid with filters, sortable columns, row expansion, bulk selection (New rows only), and review progress. Built from table regions, filter controls, and the Checkbox atom."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Headers / Table / Default</p>
            <div className={labComponentContainerClass}>
              <div className="mb-4">
                <LabSelect
                  label="Filter Type"
                  value={filterType}
                  onChange={setFilterType}
                  options={FILTER_TYPE_OPTIONS}
                  size="sm"
                />
              </div>
              <AceTableFilterHeader
                title="Table Header"
                actions={headerActions}
                trailing={<ScreeningColumnsMenu />}
                searchValue={headerSearch}
                onSearchChange={setHeaderSearch}
                onSearchClear={() => setHeaderSearch('')}
                searchPlaceholder="Search"
                chips={headerChips}
              />
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Table preview</p>
            <div className="flex flex-col gap-3">
              <div className={examplesToolbarPanel}>
                <div className="flex w-full flex-wrap items-center gap-4">
                  <AceButton type="button" variant="secondary" size="sm" onClick={openPreviewOptions}>
                    Table View Options
                  </AceButton>
                  <LabCheckbox
                    label="Column Resizing"
                    checked={columnResizing}
                    onCheckedChange={setColumnResizing}
                    className="min-h-8"
                  />
                </div>
              </div>
              <div className={labComponentContainerClass}>
                <ScreeningResultsTable
                  className="max-w-full"
                  visibilityControls={visibilityControls}
                  columnResizing={columnResizing}
                  title="Watchlist Screening"
                />
              </div>
            </div>
          </div>

          <DialogModal
            open={modalOpen}
            onClose={closePreviewOptions}
            title="Table View Options"
            description="Toggle regions of the data table. Choose Done to apply, or Cancel to discard."
            size="lg"
            fitContent
            secondaryAction={{ label: 'Cancel', onClick: closePreviewOptions }}
            primaryAction={{ label: 'Done', onClick: applyPreviewOptions }}
          >
            <ul
              className={cn(
                'm-0 list-none space-y-1 p-0',
                VISIBILITY_CONTROL_OPTIONS.length > 10 && PREVIEW_OPTIONS_LIST_SCROLL_CLASS,
              )}
            >
              {VISIBILITY_CONTROL_OPTIONS.map(({ key, label, hint }) => (
                <li key={key}>
                  <div className="rounded-[var(--dialog-modal-btn-radius)] px-1 py-2 hover:bg-[var(--dialog-modal-close-hover)]">
                    <LabCheckbox
                      label={label}
                      checked={draftVisibilityControls[key]}
                      onCheckedChange={() => toggleDraftVisibilityControl(key)}
                      className="items-start gap-3"
                    />
                    {hint ? (
                      <span
                        className={cn(
                          aceTypography('--ace-type-caption-regular'),
                          'mt-0.5 block pl-6 text-[var(--dialog-modal-muted)]',
                        )}
                      >
                        {hint}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </DialogModal>
        </div>
      }
      code={
        <ComponentLabCode>{`import {
  ScreeningResultsTable,
  MOCK_ROWS,
} from '../components/organisms/ScreeningResultsTable/ScreeningResultsTable'
import { ScreeningColumnsMenu } from '../components/organisms/ScreeningResultsTable/ScreeningColumnsMenu'
import {
  AceFilterChip,
  AceFilterToggleChip,
  AceTableFilterHeader,
  filterViewModeLabel,
  filterViewModeMenuItems,
} from '../components/molecules/AceFiltering'
import { AceDropdownMenu } from '../components/molecules/AceDropdownMenu/AceDropdownMenu'

<AceTableFilterHeader
  title="Table Header"
  actions={
    <>
      <AceDropdownMenu
        triggerLabel={filterViewModeLabel(viewMode)}
        triggerMode="filter"
        panelWidth="wide"
        items={filterViewModeMenuItems(viewMode, setViewMode)}
      />
      <AceDropdownMenu triggerLabel="Filters" triggerMode="filter" items={...} />
    </>
  }
  trailing={<ScreeningColumnsMenu />}
  searchPlaceholder="Search"
  chips={active.map((f) => <AceFilterChip key={f.id} label={f.label} onClear={...} />)}
/>

{/* Filter Chips mode */}
<AceFilterToggleChip label="Locked" pressed={on} onClick={toggle} />

<ScreeningResultsTable rows={MOCK_ROWS} title="Watchlist Screening" />`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Import the component and pass optional <code className="text-[var(--color-text-primary)]">rows</code>,{' '}
          <code className="text-[var(--color-text-primary)]">title</code>,{' '}
          <code className="text-[var(--color-text-primary)]">visibilityControls</code>, or controlled selection props.
          Use <code className="text-[var(--color-text-primary)]">Filter Type</code> on the header demo to switch
          between Filters dropdown + clearable chips and on/off filter chips. Interactive filter atoms are also
          documented on the Filtering molecules page.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Table surfaces and controls use <code className="text-[var(--color-text-primary)]">--screening-*</code>{' '}
            tokens in <code className="text-[var(--color-text-primary)]">src/styles/variables.css</code>.
          </li>
          <li>
            Typography uses ACE tokens from{' '}
            <code className="text-[var(--color-text-primary)]">typography-tokens.css</code>.
          </li>
          <li>
            Visibility controls: pass a{' '}
            <code className="text-[var(--color-text-primary)]">visibilityControls</code> object (see{' '}
            <code className="text-[var(--color-text-primary)]">DEFAULT_SCREENING_TABLE_VISIBILITY_CONTROLS</code>).
          </li>
        </ul>
      }
      implementationRulesMarkdown={dataTableRules}
    />
  )
}
