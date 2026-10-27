import { useMemo, useState } from 'react'
import { PageHeader } from '../components/molecules/PageHeader'
import { SubHeader } from '../components/molecules/SubHeader'
import {
  DropdownMenu,
  type DropdownMenuEntry,
} from '../components/molecules/DropdownMenu/DropdownMenu'
import { labControlLegendClass } from '../lib/labControls'
import { cn } from '../lib/cn'
import { ComponentLabPage } from './ComponentLabPage'
import { pageHeadersLabCode, pageHeadersLabQa, pageHeadersLabUsage } from './labTabDocs'

type PageHeaderOptionId = 'sidebarControl' | 'statistics' | 'paging' | 'moreMenu'

const CHECKBOX_OPTIONS: { value: PageHeaderOptionId; label: string }[] = [
  { value: 'sidebarControl', label: 'Sidebar control' },
  { value: 'statistics', label: 'Statistics' },
  { value: 'paging', label: 'Paging' },
  { value: 'moreMenu', label: 'Three dot menu' },
]

export function PageHeadersLab() {
  const [options, setOptions] = useState<PageHeaderOptionId[]>(['sidebarControl'])
  const [drillDown, setDrillDown] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState(1)
  const totalPages = 12

  const showSidebarControl = options.includes('sidebarControl')
  const statistics = options.includes('statistics')
  const paging = options.includes('paging')
  const moreMenu = options.includes('moreMenu')

  const selectedCount = options.length + (drillDown ? 1 : 0)
  const totalCount = CHECKBOX_OPTIONS.length + 1
  const triggerLabel =
    selectedCount === 0 ? 'None' : selectedCount === totalCount ? 'All' : `${selectedCount} selected`

  const menuItems: DropdownMenuEntry[] = useMemo(() => {
    const selected = new Set(options)
    return [
      ...CHECKBOX_OPTIONS.map((o) => {
        const checked = selected.has(o.value)
        return {
          type: 'checkbox' as const,
          label: o.label,
          checked,
          style: 'assignment' as const,
          onCheckedChange: (next: boolean) => {
            if (next) {
              if (checked) return
              setOptions((prev) => [...prev, o.value])
              return
            }
            setOptions((prev) => prev.filter((v) => v !== o.value))
          },
        }
      }),
      {
        type: 'toggle' as const,
        label: 'Drill down',
        checked: drillDown,
        onCheckedChange: setDrillDown,
      },
    ]
  }, [drillDown, options])

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <fieldset className="w-max min-w-0 shrink-0 border-0 p-0">
          <legend className={cn(labControlLegendClass, 'mb-[var(--ace-section-label-gap)] block w-full')}>
            Options
          </legend>
          <DropdownMenu
            triggerLabel={triggerLabel}
            triggerMode="field"
            size="md"
            panelWidth="wide"
            align="start"
            items={menuItems}
          />
        </fieldset>
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="flex w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]">
          <PageHeader
            showSidebarControl={showSidebarControl}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((open) => !open)}
          />
          <SubHeader
            statistics={statistics}
            paging={paging}
            moreMenu={moreMenu}
            drillDown={drillDown}
            paginationLabel={`${page} of ${totalPages}`}
            prevDisabled={page <= 1}
            nextDisabled={page >= totalPages}
            onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
            onNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={pageHeadersLabQa}
      title="Page Headers"
      description="Application page header and composable, responsive sub-header for content regions."
      examplesToolbar={toolbar}
      code={pageHeadersLabCode}
      usage={pageHeadersLabUsage}
    />
  )
}
