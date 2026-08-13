import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { AceButton } from '../components/atoms/AceButton'
import { AceAccordion } from '../components/molecules/AceAccordion/AceAccordion'
import {
  AceDropdownMenu,
  type AceDropdownMenuEntry,
} from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import { AcePageHeader } from '../components/molecules/AcePageHeader'
import { AceSlider } from '../components/molecules/AceSlider'
import { AceSubHeader } from '../components/molecules/AceSubHeader'
import { AceTaskBar } from '../components/molecules/AceTaskBar'
import { DialogModal } from '../components/molecules/DialogModal/DialogModal'
import { AceLandingPageCard } from '../components/organisms/AceCards'
import { AceInlineDrawer } from '../components/organisms/AceInlineDrawer/AceInlineDrawer'
import { AceSidebar } from '../components/organisms/AceSidebar/AceSidebar'
import {
  AceSiteHeader,
  type AceSiteHeaderNavItem,
} from '../components/organisms/AceSiteHeader/AceSiteHeader'
import { labControlLegendClass } from '../lib/labControls'
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
const COLUMN_GAP_PX = 16
const COLUMN_WIDTH_STEPS = 6
const COLUMN_WIDTH_STEP_PCT = (COLUMN_MAX_PCT - COLUMN_MIN_PCT) / COLUMN_WIDTH_STEPS

type PageLayout = 'single' | 'two-column'
type ShellOption = 'none' | 'sidebar' | 'task-bar' | 'both'
type SubHeaderOption = 'none' | 'show' | 'left' | 'right' | 'both'
type ContentOption = 'empty' | 'cards' | 'accordions' | 'cards-and-accordions'

function snapColumnWidthPct(pct: number): number {
  const stepped =
    COLUMN_MIN_PCT +
    Math.round((pct - COLUMN_MIN_PCT) / COLUMN_WIDTH_STEP_PCT) * COLUMN_WIDTH_STEP_PCT
  return Math.min(COLUMN_MAX_PCT, Math.max(COLUMN_MIN_PCT, stepped))
}

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

function ToolbarSelect<T extends string>({
  value,
  onChange,
  options,
  'aria-label': ariaLabel,
  className,
}: {
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string }[]
  'aria-label': string
  className?: string
}) {
  const selectedLabel = options.find((o) => o.value === value)?.label ?? 'Select'
  const items = useMemo<AceDropdownMenuEntry[]>(
    () => [
      {
        type: 'radioGroup',
        value,
        onValueChange: (v) => onChange(v as T),
        options: options.map((o) => ({ value: o.value, label: o.label })),
      },
    ],
    [value, onChange, options],
  )

  return (
    <AceDropdownMenu
      triggerLabel={selectedLabel}
      triggerMode="field"
      size="sm"
      items={items}
      align="start"
      panelWidth="hug"
      aria-label={ariaLabel}
      className={cn('!w-auto !max-w-none', className)}
    />
  )
}

function ModularCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <AceLandingPageCard
        variant="description"
        title="Screening"
        tag="Active"
        description="Modular landing-page card placed in the layout content region."
        showHeaderActions={false}
        showFooterStats={false}
        showFooterLink
        className="w-full max-w-none"
      />
      <AceLandingPageCard
        variant="stats"
        title="Reporting"
        showHeaderActions={false}
        showFooterStats
        showFooterLink={false}
        className="w-full max-w-none"
      />
      <AceLandingPageCard
        variant="description"
        title="Workflow"
        tag="New"
        description="Up to three cards share a row and fill the content region."
        showHeaderActions={false}
        showFooterStats={false}
        showFooterLink
        className="w-full max-w-none"
      />
    </div>
  )
}

function ModularAccordions() {
  return (
    <div className="flex flex-col gap-3">
      <AceAccordion title="Client details" surface="white" showTag tagLabel="Open" showMoreIcon>
        <p className="m-0 text-sm text-[var(--screening-text-muted)]">
          Accordion body content for the layout preview.
        </p>
      </AceAccordion>
      <AceAccordion title="Match history" surface="white" showTag={false} showEditIcon showMoreIcon>
        <p className="m-0 text-sm text-[var(--screening-text-muted)]">
          Second accordion module in the content stack.
        </p>
      </AceAccordion>
    </div>
  )
}

function ModularContent({ content }: { content: ContentOption }) {
  if (content === 'empty') return null
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-auto">
      {content === 'cards' || content === 'cards-and-accordions' ? <ModularCards /> : null}
      {content === 'accordions' || content === 'cards-and-accordions' ? <ModularAccordions /> : null}
    </div>
  )
}

function EmptyPane({
  label,
  showSubHeader,
}: {
  label: string
  showSubHeader?: boolean
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)]">
      {showSubHeader ? (
        <AceSubHeader className="rounded-none border-0 border-b border-solid border-[var(--screening-border-strong)] shadow-none" />
      ) : null}
      <div className="min-h-0 flex-1 p-4">
        <p className="m-0 text-sm text-[var(--screening-text-muted)]">{label}</p>
      </div>
    </div>
  )
}

/** Empty column: sub-header attaches to the pane. Modules: sub-header stays its own module above. */
function ContentRegion({
  showSubHeader,
  content,
  emptyLabel,
  style,
  className,
}: {
  showSubHeader: boolean
  content: ContentOption
  emptyLabel: string
  style?: CSSProperties
  className?: string
}) {
  if (content === 'empty') {
    return (
      <div className={cn('flex min-h-0 min-w-0 flex-col', className)} style={style}>
        <EmptyPane label={emptyLabel} showSubHeader={showSubHeader} />
      </div>
    )
  }

  return (
    <div className={cn('flex min-h-0 min-w-0 flex-col gap-4', className)} style={style}>
      {showSubHeader ? <AceSubHeader /> : null}
      <ModularContent content={content} />
    </div>
  )
}

function TwoColumnRegion({
  leftSubHeader,
  rightSubHeader,
  leftWidthPct,
  onLeftWidthPctChange,
  content,
}: {
  leftSubHeader: boolean
  rightSubHeader: boolean
  leftWidthPct: number
  onLeftWidthPctChange: (pct: number) => void
  content: ContentOption
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const resizingRef = useRef(false)
  const [isResizing, setIsResizing] = useState(false)
  const clampPct = useCallback((pct: number) => snapColumnWidthPct(pct), [])

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!resizingRef.current || !rowRef.current) return
      const rect = rowRef.current.getBoundingClientRect()
      const usable = rect.width - COLUMN_GAP_PX
      if (usable <= 0) return
      onLeftWidthPctChange(clampPct(((e.clientX - rect.left) / usable) * 100))
    }
    const onUp = () => {
      if (!resizingRef.current) return
      resizingRef.current = false
      setIsResizing(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [clampPct, onLeftWidthPctChange])

  const onResizeStart = (e: ReactMouseEvent) => {
    e.preventDefault()
    resizingRef.current = true
    setIsResizing(true)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  return (
    <div ref={rowRef} className="flex min-h-0 min-w-0 flex-1">
      <ContentRegion
        showSubHeader={leftSubHeader}
        content={content}
        emptyLabel="Left column"
        style={{ flex: `0 0 calc(${leftWidthPct}% - ${COLUMN_GAP_PX / 2}px)` }}
      />
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={leftWidthPct}
        aria-valuemin={COLUMN_MIN_PCT}
        aria-valuemax={COLUMN_MAX_PCT}
        aria-label="Resize columns"
        tabIndex={0}
        onMouseDown={onResizeStart}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            onLeftWidthPctChange(clampPct(leftWidthPct - COLUMN_WIDTH_STEP_PCT))
          } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            onLeftWidthPctChange(clampPct(leftWidthPct + COLUMN_WIDTH_STEP_PCT))
          }
        }}
        className={cn(
          'group relative z-[1] flex w-4 shrink-0 cursor-col-resize items-stretch justify-center',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'my-2 w-0.5 rounded-full bg-[var(--screening-border-strong)] transition-colors',
            'group-hover:bg-[var(--screening-text-muted)]',
            isResizing && 'bg-[var(--screening-primary)]',
          )}
        />
      </div>
      <ContentRegion
        showSubHeader={rightSubHeader}
        content={content}
        emptyLabel="Right column"
        style={{ flex: '1 1 0%' }}
      />
    </div>
  )
}

function LayoutPreview({
  pageLayout,
  showSidebarControl,
  showTaskBar,
  showSubHeader,
  leftSubHeader,
  rightSubHeader,
  leftWidthPct,
  onLeftWidthPctChange,
  content,
}: {
  pageLayout: PageLayout
  showSidebarControl: boolean
  showTaskBar: boolean
  showSubHeader: boolean
  leftSubHeader: boolean
  rightSubHeader: boolean
  leftWidthPct: number
  onLeftWidthPctChange: (pct: number) => void
  content: ContentOption
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const sidebarVisible = showSidebarControl && sidebarOpen
  const isTwoColumn = pageLayout === 'two-column'

  return (
    <>
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface-muted)]',
          isTwoColumn ? 'h-[min(85vh,52rem)] min-h-[40rem]' : 'h-[calc(100dvh-8rem)] min-h-[40rem]',
        )}
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
                onLeftWidthPctChange={onLeftWidthPctChange}
                content={content}
              />
            ) : (
              <ContentRegion
                className="min-h-0 flex-1"
                showSubHeader={showSubHeader}
                content={content}
                emptyLabel="Main content"
              />
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

const PAGE_LAYOUT_OPTIONS: { value: PageLayout; label: string }[] = [
  { value: 'single', label: 'Single column' },
  { value: 'two-column', label: 'Two column' },
]

const SHELL_OPTIONS: { value: ShellOption; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'sidebar', label: 'Sidebar' },
  { value: 'task-bar', label: 'Task bar' },
  { value: 'both', label: 'Sidebar + task bar' },
]

const CONTENT_OPTIONS: { value: ContentOption; label: string }[] = [
  { value: 'empty', label: 'Empty' },
  { value: 'cards', label: 'Cards' },
  { value: 'accordions', label: 'Accordions' },
  { value: 'cards-and-accordions', label: 'Cards + accordions' },
]

export function LayoutsLab() {
  const [pageLayout, setPageLayout] = useState<PageLayout>('single')
  const [shell, setShell] = useState<ShellOption>('sidebar')
  const [subHeaders, setSubHeaders] = useState<SubHeaderOption>('none')
  const [content, setContent] = useState<ContentOption>('empty')
  const [leftWidthPct, setLeftWidthPct] = useState(50)

  const isTwoColumn = pageLayout === 'two-column'
  const showSidebarControl = shell === 'sidebar' || shell === 'both'
  const showTaskBar = shell === 'task-bar' || shell === 'both'

  const subHeaderOptions = useMemo<{ value: SubHeaderOption; label: string }[]>(
    () =>
      isTwoColumn
        ? [
            { value: 'none', label: 'None' },
            { value: 'left', label: 'Left column' },
            { value: 'right', label: 'Right column' },
            { value: 'both', label: 'Both columns' },
          ]
        : [
            { value: 'none', label: 'None' },
            { value: 'show', label: 'Show' },
          ],
    [isTwoColumn],
  )

  const showSubHeader = !isTwoColumn && subHeaders === 'show'
  const leftSubHeader = isTwoColumn && (subHeaders === 'left' || subHeaders === 'both')
  const rightSubHeader = isTwoColumn && (subHeaders === 'right' || subHeaders === 'both')

  return (
    <ComponentLabPage
      title="Layouts"
      description="Page and application layouts composed from organisms, molecules, and atoms."
      examplesToolbar={
        <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
          <ToolbarGroup label="Page layout">
            <ToolbarSelect
              aria-label="Page layout"
              value={pageLayout}
              onChange={(next) => {
                setPageLayout(next)
                setSubHeaders('none')
              }}
              options={PAGE_LAYOUT_OPTIONS}
            />
          </ToolbarGroup>
          <ToolbarGroup label="Shell">
            <ToolbarSelect
              aria-label="Shell"
              value={shell}
              onChange={setShell}
              options={SHELL_OPTIONS}
            />
          </ToolbarGroup>
          <ToolbarGroup label="Sub-headers">
            <ToolbarSelect
              aria-label="Sub-headers"
              value={subHeaderOptions.some((o) => o.value === subHeaders) ? subHeaders : 'none'}
              onChange={setSubHeaders}
              options={subHeaderOptions}
            />
          </ToolbarGroup>
          <ToolbarGroup label="Content">
            <ToolbarSelect
              aria-label="Content"
              value={content}
              onChange={setContent}
              options={CONTENT_OPTIONS}
            />
          </ToolbarGroup>
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
              Compose site nav, page header, optional modular sub-headers, and content modules (cards / accordions).
              Cards and accordions sit outside empty column chrome; the sub-header stays its own module above them.
            </p>
          </div>
          <LayoutPreview
            pageLayout={pageLayout}
            showSidebarControl={showSidebarControl}
            showTaskBar={showTaskBar}
            showSubHeader={showSubHeader}
            leftSubHeader={leftSubHeader}
            rightSubHeader={rightSubHeader}
            leftWidthPct={leftWidthPct}
            onLeftWidthPctChange={setLeftWidthPct}
            content={content}
          />
        </div>
      }
      code={
        <ComponentLabCode>{`{/* Modular sub-header — fills its parent; separate from content modules */}
{showSubHeader ? <AceSubHeader /> : null}

{/* Cards / accordions are not wrapped in column chrome */}
<AceLandingPageCard title="Screening" variant="description" />
<AceAccordion title="Client details">…</AceAccordion>

{/* Two-column regions keep the drag handle; each side can host modules */}
<div className="flex">
  <div style={{ flex: \`0 0 \${leftWidthPct}%\` }}>
    {leftSubHeader ? <AceSubHeader /> : null}
    {/* modules */}
  </div>
  {/* resize handle */}
  <div style={{ flex: 1 }}>
    {rightSubHeader ? <AceSubHeader /> : null}
    {/* modules */}
  </div>
</div>`}</ComponentLabCode>
      }
      usage={
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-muted)]">
          <li>
            Start with <code className="text-[var(--color-text-primary)]">AceSiteHeader</code>, then{' '}
            <code className="text-[var(--color-text-primary)]">AcePageHeader</code> for the page title.
          </li>
          <li>
            Treat <code className="text-[var(--color-text-primary)]">AceSubHeader</code> as its own module above
            content — especially when composing cards or accordions.
          </li>
          <li>
            Cards and accordions fill the content region without empty column shells. Two-column mode still supports
            a resizable split for side-by-side modules.
          </li>
          <li>
            Shell dropdown controls sidebar affordance and{' '}
            <code className="text-[var(--color-text-primary)]">AceTaskBar</code> / inline drawer actions.
          </li>
        </ul>
      }
    />
  )
}
