import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { AceButton } from '../components/atoms/AceButton'
import { RadioGroup, RadioItem } from '../components/atoms/Radio/RadioGroup'
import { AcePageHeader } from '../components/molecules/AcePageHeader'
import { AceSlider } from '../components/molecules/AceSlider'
import { AceSubHeader } from '../components/molecules/AceSubHeader'
import { AceTaskBar } from '../components/molecules/AceTaskBar'
import { DialogModal } from '../components/molecules/DialogModal/DialogModal'
import { AceInlineDrawer } from '../components/organisms/AceInlineDrawer/AceInlineDrawer'
import { AceSidebar } from '../components/organisms/AceSidebar/AceSidebar'
import {
  AceSiteHeader,
  type AceSiteHeaderNavItem,
} from '../components/organisms/AceSiteHeader/AceSiteHeader'
import { LabCheckbox, labControlLegendClass } from '../lib/labControls'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const SITE_NAV_ITEMS: AceSiteHeaderNavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'reporting', label: 'Reporting' },
  { id: 'settings', label: 'Settings' },
  { id: 'administration', label: 'Administration' },
]

const COLUMN_MIN_PCT = 20
const COLUMN_MAX_PCT = 80
/** Discrete steps between min/max → 20, 30, …, 80. */
const COLUMN_WIDTH_STEPS = 6
const COLUMN_WIDTH_STEP_PCT = (COLUMN_MAX_PCT - COLUMN_MIN_PCT) / COLUMN_WIDTH_STEPS

function snapColumnWidthPct(pct: number): number {
  const stepped =
    COLUMN_MIN_PCT +
    Math.round((pct - COLUMN_MIN_PCT) / COLUMN_WIDTH_STEP_PCT) * COLUMN_WIDTH_STEP_PCT
  return Math.min(COLUMN_MAX_PCT, Math.max(COLUMN_MIN_PCT, stepped))
}

/** Toolbar column — shared label + fixed-height control row so groups align. */
function ToolbarGroup({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-[var(--ace-section-label-gap)]', className)}>
      <p className={cn(labControlLegendClass, 'm-0 flex h-5 items-center')}>{label}</p>
      <div className="flex h-9 items-center">{children}</div>
    </div>
  )
}

type PageLayout = 'single' | 'two-column'

function ContentPane({ label }: { label: string }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)]">
      <div className="min-h-0 flex-1 p-4">
        <p className="m-0 text-sm text-[var(--screening-text-muted)]">{label}</p>
      </div>
    </div>
  )
}

function ColumnStack({
  showSubHeader,
  label,
  style,
}: {
  showSubHeader: boolean
  label: string
  style?: CSSProperties
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-4" style={style}>
      {showSubHeader ? <AceSubHeader layout="split" /> : null}
      <ContentPane label={label} />
    </div>
  )
}

function TwoColumnRegion({
  leftSubHeader,
  rightSubHeader,
  leftWidthPct,
}: {
  leftSubHeader: boolean
  rightSubHeader: boolean
  leftWidthPct: number
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 gap-4">
      <ColumnStack
        showSubHeader={leftSubHeader}
        label="Left column"
        style={{ flex: `0 0 ${leftWidthPct}%` }}
      />
      <ColumnStack
        showSubHeader={rightSubHeader}
        label="Right column"
        style={{ flex: '1 1 0%' }}
      />
    </div>
  )
}

function LayoutPreview({
  pageLayout,
  showSidebarControl,
  showSubHeader,
  leftSubHeader,
  rightSubHeader,
  leftWidthPct,
  showTaskBar,
}: {
  pageLayout: PageLayout
  showSidebarControl: boolean
  showSubHeader: boolean
  leftSubHeader: boolean
  rightSubHeader: boolean
  leftWidthPct: number
  showTaskBar: boolean
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const sidebarVisible = showSidebarControl && sidebarOpen
  const isTwoColumn = pageLayout === 'two-column'

  return (
    <>
      <div
        className="flex h-[min(85vh,52rem)] min-h-[40rem] flex-col overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface-muted)]"
        aria-label={isTwoColumn ? 'Two-column layout preview' : 'Single-column layout preview'}
      >
        <AceSiteHeader navItems={SITE_NAV_ITEMS} userName="User Name" />
        <AcePageHeader
          title="Headline"
          showSidebarControl={showSidebarControl}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
          className="border-t-0"
        />
        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          <AceSidebar open={sidebarVisible} variant="navigation" navItems={[]} />
          <div className="relative z-0 flex min-h-0 min-w-0 flex-1 flex-col gap-4 bg-[var(--screening-surface-muted)] p-4">
            {isTwoColumn ? (
              <TwoColumnRegion
                leftSubHeader={leftSubHeader}
                rightSubHeader={rightSubHeader}
                leftWidthPct={leftWidthPct}
              />
            ) : (
              <>
                {showSubHeader ? <AceSubHeader layout="full" /> : null}
                <ContentPane label="Main content" />
              </>
            )}
            {showTaskBar ? (
              <AceTaskBar>
                <AceButton type="button" variant="secondary" size="md" onClick={() => setModalOpen(true)}>
                  Modal
                </AceButton>
                <AceButton type="button" variant="primary" size="md" onClick={() => setDrawerOpen(true)}>
                  Inline Drawer
                </AceButton>
              </AceTaskBar>
            ) : null}
          </div>
          <AceInlineDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Review"
            widthStorageKey={
              isTwoColumn
                ? 'ace-layouts-lab-inline-drawer-width-two-column'
                : 'ace-layouts-lab-inline-drawer-width'
            }
            onSave={() => setDrawerOpen(false)}
          >
            <p className="m-0 text-sm text-[var(--screening-text-muted)]">
              Drawer content opened from the task bar
              {isTwoColumn ? ' — docks beside both columns.' : ' — docks beside the main column.'}
            </p>
          </AceInlineDrawer>
        </div>
      </div>

      <DialogModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal"
        description="Opened from the task bar."
        secondaryAction={{ label: 'Cancel', onClick: () => setModalOpen(false) }}
        primaryAction={{ label: 'Confirm', onClick: () => setModalOpen(false) }}
      />
    </>
  )
}

export function LayoutsLab() {
  const [pageLayout, setPageLayout] = useState<PageLayout>('single')
  const [showSidebarControl, setShowSidebarControl] = useState(true)
  const [showSubHeader, setShowSubHeader] = useState(false)
  const [leftSubHeader, setLeftSubHeader] = useState(false)
  const [rightSubHeader, setRightSubHeader] = useState(false)
  const [leftWidthPct, setLeftWidthPct] = useState(50)
  const [showTaskBar, setShowTaskBar] = useState(false)

  const isTwoColumn = pageLayout === 'two-column'
  const pageLayoutRadioId = useId()

  return (
    <ComponentLabPage
      title="Layouts"
      description="Page and application layouts composed from organisms, molecules, and atoms."
      examplesToolbar={
        <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
          <ToolbarGroup label="Page layout">
            <RadioGroup
              value={pageLayout}
              onValueChange={(v) => setPageLayout(v as PageLayout)}
              className="flex flex-wrap items-center gap-x-6"
              aria-label="Page layout"
            >
              <RadioItem value="single" id={`${pageLayoutRadioId}-single`} size="sm">
                <span className="text-xs font-medium text-[var(--color-text-primary)]">Single column</span>
              </RadioItem>
              <RadioItem value="two-column" id={`${pageLayoutRadioId}-two-column`} size="sm">
                <span className="text-xs font-medium text-[var(--color-text-primary)]">Two column</span>
              </RadioItem>
            </RadioGroup>
          </ToolbarGroup>
          <ToolbarGroup label="Shell">
            <div className="flex flex-wrap items-center gap-4">
              <LabCheckbox
                label="Sidebar"
                checked={showSidebarControl}
                onCheckedChange={setShowSidebarControl}
              />
              <LabCheckbox label="Task Bar" checked={showTaskBar} onCheckedChange={setShowTaskBar} />
            </div>
          </ToolbarGroup>
          {isTwoColumn ? (
            <ToolbarGroup label="Sub-headers">
              <div className="flex flex-wrap items-center gap-4">
                <LabCheckbox
                  label="Left column"
                  checked={leftSubHeader}
                  onCheckedChange={setLeftSubHeader}
                />
                <LabCheckbox
                  label="Right column"
                  checked={rightSubHeader}
                  onCheckedChange={setRightSubHeader}
                />
              </div>
            </ToolbarGroup>
          ) : (
            <ToolbarGroup label="Sub-header">
              <LabCheckbox
                label="Show"
                checked={showSubHeader}
                onCheckedChange={setShowSubHeader}
              />
            </ToolbarGroup>
          )}
          {isTwoColumn ? (
            <ToolbarGroup label={`Left column width (${leftWidthPct}%)`} className="w-[14rem]">
              <AceSlider
                variant="discrete"
                discreteSteps={COLUMN_WIDTH_STEPS}
                min={COLUMN_MIN_PCT}
                max={COLUMN_MAX_PCT}
                value={leftWidthPct}
                onValueChange={(v) => {
                  const next = Array.isArray(v) ? v[0] : v
                  setLeftWidthPct(snapColumnWidthPct(next))
                }}
                className="w-full"
              />
            </ToolbarGroup>
          ) : null}
        </div>
      }
      examples={
        <div className="flex w-full flex-col gap-3 pb-16">
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">
              {isTwoColumn ? 'Two-column layout' : 'Single-column layout'}
            </p>
            <p className="m-0 mt-1 text-sm text-[var(--screening-text-muted)]">
              FinScan site nav and page header with optional sub-header, sidebar, and task bar. In two-column mode,
              use the width slider to resize panes and toggle each column&apos;s sub-header independently.
            </p>
          </div>
          <LayoutPreview
            pageLayout={pageLayout}
            showSidebarControl={showSidebarControl}
            showSubHeader={showSubHeader}
            leftSubHeader={leftSubHeader}
            rightSubHeader={rightSubHeader}
            leftWidthPct={leftWidthPct}
            showTaskBar={showTaskBar}
          />
        </div>
      }
      code={
        <ComponentLabCode>{`const [pageLayout, setPageLayout] = useState<'single' | 'two-column'>('single')
const [leftWidthPct, setLeftWidthPct] = useState(50)
const [leftSubHeader, setLeftSubHeader] = useState(false)
const [rightSubHeader, setRightSubHeader] = useState(false)

{pageLayout === 'two-column' ? (
  <div className="flex gap-4">
    <div style={{ flex: \`0 0 \${leftWidthPct}%\` }}>
      {leftSubHeader ? <AceSubHeader layout="split" /> : null}
      {/* left content */}
    </div>
    <div style={{ flex: 1 }}>
      {rightSubHeader ? <AceSubHeader layout="split" /> : null}
      {/* right content */}
    </div>
  </div>
) : (
  <>
    {showSubHeader ? <AceSubHeader layout="full" /> : null}
    {/* main column */}
  </>
)}`}</ComponentLabCode>
      }
      usage={
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-muted)]">
          <li>
            Start with <code className="text-[var(--color-text-primary)]">AceSiteHeader</code>, then{' '}
            <code className="text-[var(--color-text-primary)]">AcePageHeader</code> for the page title.
          </li>
          <li>
            Use <code className="text-[var(--color-text-primary)]">AceSubHeader</code> with{' '}
            <code className="text-[var(--color-text-primary)]">layout=&quot;full&quot;</code> in single-column pages
            and <code className="text-[var(--color-text-primary)]">layout=&quot;split&quot;</code> per pane in
            two-column pages — each pane can show or hide its own sub-header.
          </li>
          <li>
            Two-column layouts support a resizable split via the left-width slider. Keep the sidebar and inline
            drawer docked to the shell so they reflow with the content region.
          </li>
          <li>
            Task bar actions open a modal or{' '}
            <code className="text-[var(--color-text-primary)]">AceInlineDrawer</code>.
          </li>
        </ul>
      }
    />
  )
}
