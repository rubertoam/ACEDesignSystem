import { useEffect, useMemo, useState } from 'react'
import { Input } from '../components/atoms/Input'
import { LabControlField, LabSelect } from '../lib/labControls'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { paginationLabQa } from './labTabDocs'
import { Pagination } from '../components/molecules/Pagination/Pagination'

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

const PRESET_OPTIONS = [
  ...SCALE_PRESETS.map((p) => ({ value: p.id, label: `${p.label} · ${p.hint}` })),
  { value: 'custom', label: 'Custom' },
]

export function PaginationLab() {
  const [totalItems, setTotalItems] = useState(487)
  const [pageSize, setPageSize] = useState(25)
  const [page, setPage] = useState(1)
  const [activePreset, setActivePreset] = useState<string>('medium')

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages))
  }, [totalPages])

  const applyPreset = (presetId: string) => {
    if (presetId === 'custom') {
      setActivePreset('custom')
      return
    }
    const preset = SCALE_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    setActivePreset(preset.id)
    setTotalItems(preset.totalItems)
    setPageSize(preset.pageSize)
    setPage(preset.startPage ?? 1)
  }

  const pageSummary = useMemo(
    () => ({ totalPages, range: `${totalItems.toLocaleString()} rows` }),
    [totalItems, totalPages],
  )

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabSelect
          label="Scale preset"
          value={activePreset}
          onChange={applyPreset}
          options={PRESET_OPTIONS}
        />
        <LabControlField label="Total items">
          <Input
            fieldSize="sm"
            type="number"
            min={0}
            max={100000}
            step={1}
            value={totalItems}
            onChange={(e) => {
              setActivePreset('custom')
              setTotalItems(Math.max(0, Number(e.target.value) || 0))
            }}
            aria-label="Total items"
          />
        </LabControlField>
        <LabSelect
          label="Page size"
          value={String(pageSize)}
          onChange={(v) => {
            setActivePreset('custom')
            setPageSize(Number(v))
            setPage(1)
          }}
          options={PAGE_SIZE_OPTIONS.map((n) => ({ value: String(n), label: String(n) }))}
        />
        <LabControlField label="Current page">
          <Input
            fieldSize="sm"
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => {
              setActivePreset('custom')
              setPage(Math.min(totalPages, Math.max(1, Number(e.target.value) || 1)))
            }}
            aria-label="Current page"
          />
        </LabControlField>
        <LabControlField label="Summary">
          <p className="m-0 flex min-h-[var(--screening-input-height-sm)] items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-2 text-sm text-[var(--color-text-primary)]">
            {pageSummary.totalPages.toLocaleString()} pages · {pageSummary.range}
          </p>
        </LabControlField>
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="w-full min-w-0 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--screening-border-strong)] bg-[var(--screening-surface)] shadow-[var(--ace-drop-shadow-xs)]">
          <div className="shrink-0 bg-[var(--screening-surface-muted)] px-[var(--space-4)] py-[var(--space-3)]">
            <Pagination
              totalItems={totalItems}
              page={page}
              pageSize={pageSize}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onPageChange={setPage}
              onPageSizeChange={(n) => {
                setActivePreset('custom')
                setPageSize(n)
                setPage(1)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={paginationLabQa}
      title="Pagination"
      description="Table footer pagination from Review Assigned (Figma). Range label, page-size select, prev/numbered/next controls, and ellipses for long page counts."
      examplesToolbar={toolbar}
      code={
        <ComponentLabCode>{`import { Pagination } from '../components/molecules/Pagination/Pagination'

const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(25)
const totalItems = 2487

<Pagination
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
          Use <code className="text-[var(--color-text-primary)]">Pagination</code> at the bottom of long lists or
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
            Page size: <code className="text-[var(--color-text-primary)]">DropdownMenu</code> field trigger (sm) + compact radio menu list
          </li>
          <li>
            Active page: <code className="text-[var(--color-text-primary)]">--screening-primary</code> →{' '}
            <code className="text-[var(--color-text-primary)]">colors/action/primary</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-primary</code>; on-fill text{' '}
            <code className="text-[var(--color-text-primary)]">--screening-text-on-primary</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-inverse</code>
          </li>
          <li>
            Meta text: <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-regular</code>
          </li>
          <li>
            Footer shell (in table): <code className="text-[var(--color-text-primary)]">--screening-surface-muted</code>{' '}
            → <code className="text-[var(--color-text-primary)]">--color-bg-primary</code>;{' '}
            <code className="text-[var(--color-text-primary)]">--screening-border-strong</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-default</code>
          </li>
        </ul>
      }
    />
  )
}
