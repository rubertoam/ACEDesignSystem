import { useCallback, useState } from 'react'
import { AceButton } from '../components/atoms/AceButton'
import { AceDropdownMenu } from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import {
  DEFAULT_SCREENING_TABLE_CHROME,
  ScreeningResultsTable,
  type ScreeningResultsTableChrome,
} from '../components/organisms/ScreeningResultsTable/ScreeningResultsTable'
import { DialogModal } from '../components/molecules/DialogModal/DialogModal'
import { LabCheckbox } from '../lib/labControls'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'

function aceTypography(token: string) {
  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`
}

const CHROME_OPTIONS: {
  key: keyof ScreeningResultsTableChrome
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
    label: 'Accordion header',
    hint: 'Collapsible title bar; off renders a flat table shell',
  },
]

const TABLE_CONTEXT_OPTIONS = [{ value: 'Watchlist Screening', label: 'Watchlist Screening' }] as const

export function DataTableLab() {
  const [chrome, setChrome] = useState<ScreeningResultsTableChrome>(() => ({ ...DEFAULT_SCREENING_TABLE_CHROME }))
  const [modalOpen, setModalOpen] = useState(false)
  const [tableContext, setTableContext] = useState('Watchlist Screening')

  const toggleChrome = useCallback((key: keyof ScreeningResultsTableChrome) => {
    setChrome((c) => ({ ...c, [key]: !c[key] }))
  }, [])

  const previewToolbar = (
    <>
      <div className="flex w-full flex-wrap items-end gap-3">
        <AceButton type="button" variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
          Table preview options
        </AceButton>
        <div className="flex min-w-0 flex-col gap-1.5">
          <span
            className={cn(
              aceTypography('--ace-type-paragraph-p1-regular'),
              'text-[var(--screening-text-primary)]',
            )}
          >
            Context
          </span>
          <AceDropdownMenu
            triggerLabel={tableContext}
            triggerMode="field"
            size="sm"
            panelWidth="wide"
            align="start"
            items={TABLE_CONTEXT_OPTIONS.map((option) => ({
              type: 'item' as const,
              label: option.label,
              selected: option.value === tableContext,
              onSelect: () => setTableContext(option.value),
            }))}
          />
        </div>
      </div>
      <DialogModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Table preview options"
        description="Toggle regions of the data table. Changes apply to the preview below."
        size="lg"
        secondaryAction={{ label: 'Cancel', onClick: () => setModalOpen(false) }}
        primaryAction={{ label: 'Done', onClick: () => setModalOpen(false) }}
        bodyClassName="max-h-[min(60vh,22rem)]"
      >
        <ul className="m-0 list-none space-y-1 p-0">
          {CHROME_OPTIONS.map(({ key, label, hint }) => (
            <li key={key}>
              <div className="rounded-[var(--dialog-modal-btn-radius)] px-1 py-2 hover:bg-[var(--dialog-modal-close-hover)]">
                <LabCheckbox
                  label={label}
                  checked={chrome[key]}
                  onCheckedChange={() => toggleChrome(key)}
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
    </>
  )

  return (
    <ComponentLabPage
      title="Data Table"
      description="Dense results grid with filters, sortable columns, row expansion, bulk selection (New rows only), and review progress. Organism — composed of table regions, filter controls, and the Checkbox atom."
      examplesToolbar={previewToolbar}
      examples={
        <div className="w-full min-w-0">
          <ScreeningResultsTable className="max-w-full" chrome={chrome} title={tableContext} />
        </div>
      }
      code={
        <ComponentLabCode>{`import {
  ScreeningResultsTable,
  MOCK_ROWS,
  DEFAULT_SCREENING_TABLE_CHROME,
} from '../components/organisms/ScreeningResultsTable/ScreeningResultsTable'

<ScreeningResultsTable
  rows={MOCK_ROWS}
  title="Watchlist Screening"
  chrome={{ showPagination: true }}
/>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Import the organism and pass optional <code className="text-[var(--color-text-primary)]">rows</code>,{' '}
          <code className="text-[var(--color-text-primary)]">title</code>, <code className="text-[var(--color-text-primary)]">chrome</code>, or controlled
          selection props.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            All table chrome uses <code className="text-[var(--color-text-primary)]">--screening-*</code> tokens in{' '}
            <code className="text-[var(--color-text-primary)]">src/styles/variables.css</code>. Dark values apply when an ancestor has{' '}
            the lab <strong>Theme</strong> control in the top bar (sets <code className="text-[var(--color-text-primary)]">data-theme</code> on the document).
          </li>
          <li>
            Typography uses ACE tokens from <code className="text-[var(--color-text-primary)]">typography-tokens.css</code> (e.g.{' '}
            <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code> + matching{' '}
            <code className="text-[var(--color-text-primary)]">-tracking</code>) via <code className="text-[var(--color-text-primary)]">aceTypography()</code> in the
            table source.
          </li>
          <li>
            Spacing / layout: <code className="text-[var(--color-text-primary)]">--space-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-header-min-height</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-table-min-width</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-body-max-height</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-progress-width</code>, etc.
          </li>
          <li>
            Match-string tiles: <code className="text-[var(--color-text-primary)]">--screening-tile-e-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-tile-n-*</code>, <code className="text-[var(--color-text-primary)]">--screening-tile-c1-*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-tile-c2-*</code>, <code className="text-[var(--color-text-primary)]">--screening-tile-b-*</code>.
          </li>
          <li>
            Layout toggles: pass a <code className="text-[var(--color-text-primary)]">chrome</code> object (see{' '}
            <code className="text-[var(--color-text-primary)]">DEFAULT_SCREENING_TABLE_CHROME</code> in the organism) to hide accordion chrome, filters, search, column menu, history toggle,
            chevrons, checkboxes, or enable the pagination footer (<code className="text-[var(--color-text-primary)]">AcePagination</code>). The preview-options UI uses the shared{' '}
            <code className="text-[var(--color-text-primary)]">DialogModal</code> molecule (<code className="text-[var(--color-text-primary)]">--dialog-modal-*</code>).
          </li>
        </ul>
      }
    />
  )
}
