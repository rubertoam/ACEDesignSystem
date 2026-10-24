import { useState } from 'react'
import { PageHeader } from '../components/molecules/PageHeader'
import { SubHeader } from '../components/molecules/SubHeader'
import { LabCheckbox, labControlLegendClass } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabPage } from './ComponentLabPage'
import { pageHeadersLabCode, pageHeadersLabQa, pageHeadersLabUsage } from './labTabDocs'
export function PageHeadersLab() {
  const [showSidebarControl, setShowSidebarControl] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [statistics, setStatistics] = useState(false)
  const [paging, setPaging] = useState(false)
  const [moreMenu, setMoreMenu] = useState(false)
  const [drillDown, setDrillDown] = useState(false)
  const [page, setPage] = useState(1)
  const totalPages = 12

  return (
    <ComponentLabPage
      qa={pageHeadersLabQa}
      title="Page Headers"
      description="Application page header and composable, responsive sub-header for content regions."
      examplesToolbar={
        <div className="flex flex-wrap items-end gap-6">
          <LabCheckbox
            label="Sidebar control"
            checked={showSidebarControl}
            onCheckedChange={setShowSidebarControl}
          />
          <div className="flex flex-col gap-2">
            <p className={cn(labControlLegendClass, 'm-0')}>Sub-header variants</p>
            <div className="flex flex-wrap gap-4">
              <LabCheckbox label="Statistics" checked={statistics} onCheckedChange={setStatistics} />
              <LabCheckbox label="Paging" checked={paging} onCheckedChange={setPaging} />
              <LabCheckbox label="Three dot menu" checked={moreMenu} onCheckedChange={setMoreMenu} />
              <LabCheckbox label="Drill down" checked={drillDown} onCheckedChange={setDrillDown} />
            </div>
          </div>
        </div>
      }
      examples={
        <div className="space-y-10 pb-16">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Header</p>
            <PageHeader
              showSidebarControl={showSidebarControl}
              sidebarOpen={sidebarOpen}
              onToggleSidebar={() => setSidebarOpen((open) => !open)}
            />
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Sub-header</p>
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
      }
      code={pageHeadersLabCode}
      usage={pageHeadersLabUsage}
    />
  )
}
