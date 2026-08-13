import { useState } from 'react'
import { AcePageHeader } from '../components/molecules/AcePageHeader'
import { AceSubHeader } from '../components/molecules/AceSubHeader'
import { LabCheckbox, labControlLegendClass } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

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
            <AcePageHeader
              showSidebarControl={showSidebarControl}
              sidebarOpen={sidebarOpen}
              onToggleSidebar={() => setSidebarOpen((open) => !open)}
            />
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Sub-header</p>
            <AceSubHeader
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
      code={
        <ComponentLabCode>{`import { AcePageHeader } from '../components/molecules/AcePageHeader'
import { AceSubHeader } from '../components/molecules/AceSubHeader'

<AcePageHeader
  title="Headline"
  showSidebarControl
  sidebarOpen={sidebarOpen}
  onToggleSidebar={toggleSidebar}
/>

<AceSubHeader
  statistics={${statistics}}
  paging={${paging}}
  moreMenu={${moreMenu}}
  drillDown={${drillDown}}
/>`}</ComponentLabCode>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Place <code className="text-[var(--screening-text-primary)]">AcePageHeader</code> under{' '}
              <code className="text-[var(--screening-text-primary)]">AceSiteHeader</code> for the page title. Use{' '}
              <code className="text-[var(--screening-text-primary)]">AceSubHeader</code> in content regions — it fills
              its parent width and supports optional statistics, paging, more menu, or drill-down.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Tokens</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                Header:{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-page-header-bg</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-page-header-border</code>
              </li>
              <li>
                Sub-header:{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-sub-header-bg</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-sub-header-border</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-sub-header-radius</code>
              </li>
            </ul>
          </section>
        </>
      }
    />
  )
}
