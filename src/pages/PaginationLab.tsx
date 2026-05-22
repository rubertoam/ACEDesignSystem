import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AceInputField } from '../components/atoms/AceInputField'
import { LabSelect } from '../lib/labControls'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { AcePagination } from '../components/molecules/AcePagination/AcePagination'

const FIGMA_URL =
  'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=102-5124&m=dev'

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 250]

type ScalePreset = {
  id: string
  label: string
  hint: string
  totalItems: number
  pageSize: number
  startPage?: number
}

const SCALE_PRESETS: ScalePreset[] = [
  { id: 'compact', label: 'Compact', hint: '5 pages', totalItems: 47, pageSize: 10 },
  { id: 'medium', label: 'Medium', hint: '20 pages', totalItems: 487, pageSize: 25 },
  { id: 'large', label: 'Large', hint: '100 pages', totalItems: 2487, pageSize: 25 },
  { id: 'xlarge', label: 'X-Large', hint: '500 pages', totalItems: 12487, pageSize: 25 },
  { id: 'stress', label: 'Stress', hint: '2,000 pages · mid-range', totalItems: 49987, pageSize: 25, startPage: 1000 },
  { id: 'end', label: 'Near end', hint: '100 pages · last page', totalItems: 2487, pageSize: 25, startPage: 100 },
]

function LabField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs">
      <span className="font-medium text-[var(--color-text-muted)]">{label}</span>
      {children}
    </label>
  )
}

export function PaginationLab() {
  const [totalItems, setTotalItems] = useState(487)
  const [pageSize, setPageSize] = useState(25)
  const [page, setPage] = useState(1)
  const [activePreset, setActivePreset] = useState<string | null>('medium')

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages))
  }, [totalPages])

  const applyPreset = (preset: ScalePreset) => {
    setActivePreset(preset.id)
    setTotalItems(preset.totalItems)
    setPageSize(preset.pageSize)
    setPage(preset.startPage ?? 1)
  }

  const pageSummary = useMemo(
    () => ({ totalPages, range: `${totalItems.toLocaleString()} rows` }),
    [totalItems, totalPages],
  )

  return (
    <ComponentLabPage
      title="Pagination"
      description="Table footer pagination from Review Assigned (Figma). Range label, page-size select, first/prev/numbered/next/last controls, and ellipses for long page counts."
      figmaUrl={FIGMA_URL}
      figmaLinkLabel="Pagination in Figma"
      examplesToolbar={
        <div className="flex flex-col gap-4">
          <div>
            <p className="m-0 mb-2 text-xs font-medium text-[var(--color-text-muted)]">Scale presets</p>
            <div className="flex flex-wrap gap-2">
              {SCALE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={[
                    'rounded-[var(--radius-md)] border px-3 py-2 text-left text-xs transition-colors',
                    activePreset === preset.id
                      ? 'border-[var(--screening-primary)] bg-[var(--screening-surface-muted)] text-[var(--screening-text-primary)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--screening-primary)]',
                  ].join(' ')}
                >
                  <span className="block font-semibold">{preset.label}</span>
                  <span className="block text-[var(--color-text-muted)]">{preset.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <LabField label="Total items">
              <AceInputField
                fieldSize="sm"
                type="number"
                min={0}
                max={100000}
                step={1}
                value={totalItems}
                onChange={(e) => {
                  setActivePreset(null)
                  setTotalItems(Math.max(0, Number(e.target.value) || 0))
                }}
                aria-label="Total items"
              />
            </LabField>
            <LabSelect
              label="Page size"
              value={String(pageSize)}
              onChange={(v) => {
                setActivePreset(null)
                setPageSize(Number(v))
                setPage(1)
              }}
              options={PAGE_SIZE_OPTIONS.map((n) => ({ value: String(n), label: String(n) }))}
            />
            <LabField label="Current page">
              <AceInputField
                fieldSize="sm"
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={(e) => {
                  setActivePreset(null)
                  setPage(Math.min(totalPages, Math.max(1, Number(e.target.value) || 1)))
                }}
                aria-label="Current page"
              />
            </LabField>
            <LabField label="Summary">
              <p className="m-0 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-sm text-[var(--color-text-primary)]">
                {pageSummary.totalPages.toLocaleString()} pages · {pageSummary.range}
              </p>
            </LabField>
          </div>
        </div>
      }
      examples={
        <div className="w-full min-w-0 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--screening-border-strong)] bg-[var(--screening-surface)] shadow-[var(--ace-drop-shadow-xs)]">
          <div className="border-b border-[var(--screening-border-row)] px-4 py-3 text-sm text-[var(--screening-text-secondary)]">
            Preview uses the same footer chrome as the data table. Jump to page {page} of {totalPages.toLocaleString()} to
            exercise ellipses.
          </div>
          <div className="shrink-0 border-t border-[var(--screening-border-strong)] bg-[var(--screening-surface-muted)] px-[var(--space-4)] py-[var(--space-3)]">
            <AcePagination
              totalItems={totalItems}
              page={page}
              pageSize={pageSize}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onPageChange={setPage}
              onPageSizeChange={(n) => {
                setActivePreset(null)
                setPageSize(n)
                setPage(1)
              }}
            />
          </div>
        </div>
      }
      code={
        <ComponentLabCode>{`import { AcePagination } from '../components/molecules/AcePagination/AcePagination'

const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(25)
const totalItems = 2487

<AcePagination
  totalItems={totalItems}
  page={page}
  pageSize={pageSize}
  pageSizeOptions={[10, 25, 50, 100]}
  onPageChange={setPage}
  onPageSizeChange={(n) => { setPageSize(n); setPage(1) }}
/>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Use <code className="text-[var(--color-text-primary)]">AcePagination</code> at the bottom of long lists or
          tables. Parent owns <code className="text-[var(--color-text-primary)]">page</code>,{' '}
          <code className="text-[var(--color-text-primary)]">pageSize</code>, and{' '}
          <code className="text-[var(--color-text-primary)]">totalItems</code>; slice your data before rendering rows.
          The data table organism imports the same component as{' '}
          <code className="text-[var(--color-text-primary)]">TablePagination</code> (deprecated alias).
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Buttons: <code className="text-[var(--color-text-primary)]">--screening-pagination-btn-size</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-pagination-btn-radius</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-pagination-gap</code>
          </li>
          <li>
            Page size: <code className="text-[var(--color-text-primary)]">AceDropdownMenu</code> field trigger (sm) + compact radio menu list
          </li>
          <li>
            Active page: <code className="text-[var(--color-text-primary)]">--screening-primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-text-on-primary</code>
          </li>
          <li>
            Meta text: <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code>
          </li>
          <li>
            Footer shell (in table): <code className="text-[var(--color-text-primary)]">--screening-surface-muted</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-border-strong</code>
          </li>
        </ul>
      }
    />
  )
}
