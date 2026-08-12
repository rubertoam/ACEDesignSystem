import { useState } from 'react'
import { MaterialSymbol } from '../components/molecules/AceAccordion/MaterialSymbol'
import { AceSidebar } from '../components/organisms/AceSidebar/AceSidebar'
import { sidebarIconButtonClass } from '../components/organisms/AceSidebar/sidebarRowActions'
import { LabSelect } from '../lib/labControls'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

type LayoutType = 'default' | 'sidebar' | 'sidebar-drawer' | 'landing'

const LAYOUT_OPTIONS: { value: LayoutType; label: string }[] = [
  { value: 'default', label: 'Default layout' },
  { value: 'sidebar', label: 'Header + sidebar + content' },
  { value: 'sidebar-drawer', label: 'Header + sidebar + content + drawer' },
  { value: 'landing', label: 'Landing (header + cards)' },
]

const LAYOUT_COPY: Record<
  LayoutType,
  { title: string; description: string; code: string }
> = {
  default: {
    title: 'Default layout',
    description:
      'Review Assigned app shell: header with sidebar toggle over an empty main region. Open the sidebar from the header icon.',
    code: `const [sidebarOpen, setSidebarOpen] = useState(false)

<header>
  <button
    type="button"
    aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
    aria-expanded={sidebarOpen}
    onClick={() => setSidebarOpen((open) => !open)}
  >
    <MaterialSymbol name={sidebarOpen ? 'left_panel_close' : 'left_panel_open'} />
  </button>
  ...
</header>

<div className="flex">
  <AceSidebar open={sidebarOpen} variant="navigation" navItems={[]} />
  <main />
</div>`,
  },
  sidebar: {
    title: 'Header + sidebar + content',
    description: 'App shell with collapsible sidebar navigation beside the main content area.',
    code: `<AceSiteHeader ... />
<div className="flex">
  <AceSidebar ... />
  <main>...</main>
</div>`,
  },
  'sidebar-drawer': {
    title: 'Header + sidebar + content + drawer',
    description: 'Same app shell with an inline drawer opened beside main content for detail or forms.',
    code: `<AceSiteHeader ... />
<div className="flex">
  <AceSidebar ... />
  <main>...</main>
  <AceInlineDrawer open>...</AceInlineDrawer>
</div>`,
  },
  landing: {
    title: 'Landing (header + cards)',
    description: 'Marketing or hub page: site header above a grid of landing page cards.',
    code: `<AceSiteHeader ... />
<main>
  <AceLandingPageCard ... />
</main>`,
  },
}

const h6Bold =
  '[font:var(--ace-type-heading-h6-bold)] [letter-spacing:var(--ace-type-heading-h6-bold-tracking)]'

const regionClass =
  'flex items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-[var(--screening-border-strong)] text-xs font-medium text-[var(--screening-text-muted)]'

/** Review Assigned header chrome — panel toggle opens/closes the sidebar. */
function DefaultLayoutHeader({
  open,
  onToggleSidebar,
}: {
  open: boolean
  onToggleSidebar: () => void
}) {
  return (
    <header className="flex shrink-0 items-center border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] px-8 py-3">
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={open ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={open}
          className={sidebarIconButtonClass}
        >
          <MaterialSymbol
            name={open ? 'left_panel_close' : 'left_panel_open'}
            size="md"
            className="text-current"
          />
        </button>
        <h1 className={cn(h6Bold, 'm-0 text-base text-[var(--ace-neutral-800)]')}>Header</h1>
      </div>
    </header>
  )
}

function DefaultLayoutPreview() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div
      className="flex h-[min(85vh,52rem)] min-h-[40rem] flex-col overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)]"
      aria-label="Default layout preview"
    >
      <DefaultLayoutHeader
        open={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
      />
      <div className="flex min-h-0 flex-1">
        <AceSidebar open={sidebarOpen} variant="navigation" navItems={[]} />
        <main className="min-h-0 min-w-0 flex-1 bg-[var(--screening-surface-muted)]" />
      </div>
    </div>
  )
}

function SchematicPreview({ type }: { type: Exclude<LayoutType, 'default'> }) {
  const frame = cn(
    'flex h-[min(70vh,40rem)] min-h-[22rem] w-full flex-col overflow-hidden',
    'rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)]',
    'bg-[var(--screening-surface-muted)]',
  )

  if (type === 'landing') {
    return (
      <div className={frame} aria-label="Landing layout preview">
        <div className={cn(regionClass, 'h-14 shrink-0 rounded-none border-0 border-b border-solid bg-[var(--screening-surface)]')}>
          Header
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className={cn(regionClass, 'min-h-28')}>Card</div>
          <div className={cn(regionClass, 'min-h-28')}>Card</div>
          <div className={cn(regionClass, 'min-h-28')}>Card</div>
        </div>
      </div>
    )
  }

  return (
    <div className={frame} aria-label={`${LAYOUT_COPY[type].title} preview`}>
      <div className={cn(regionClass, 'h-14 shrink-0 rounded-none border-0 border-b border-solid bg-[var(--screening-surface)]')}>
        Header
      </div>
      <div className="flex min-h-0 flex-1">
        <div className={cn(regionClass, 'w-48 shrink-0 rounded-none border-0 border-r border-solid bg-[var(--screening-surface)]')}>
          Sidebar
        </div>
        <div className={cn(regionClass, 'min-w-0 flex-1 rounded-none border-0')}>Content</div>
        {type === 'sidebar-drawer' ? (
          <div className={cn(regionClass, 'w-72 shrink-0 rounded-none border-0 border-l border-solid bg-[var(--screening-surface)]')}>
            Drawer
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function LayoutsLab() {
  const [layout, setLayout] = useState<LayoutType>('default')
  const copy = LAYOUT_COPY[layout]

  return (
    <ComponentLabPage
      title="Layouts"
      description="Page and application layouts composed from organisms, molecules, and atoms."
      examplesToolbar={
        <LabSelect label="Layout" value={layout} onChange={setLayout} options={LAYOUT_OPTIONS} />
      }
      examples={
        <div className="flex w-full flex-col gap-3">
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">{copy.title}</p>
            <p className="m-0 mt-1 text-sm text-[var(--screening-text-muted)]">{copy.description}</p>
          </div>
          {layout === 'default' ? <DefaultLayoutPreview /> : <SchematicPreview type={layout} />}
        </div>
      }
      code={<ComponentLabCode>{copy.code}</ComponentLabCode>}
      usage={
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-muted)]">
          <li>
            Default layout matches the Review Assigned shell: header status row, empty main, and a left-panel
            control to open <code className="text-[var(--color-text-primary)]">AceSidebar</code>.
          </li>
          <li>
            Prefer composing <code className="text-[var(--color-text-primary)]">AceSidebar</code> and{' '}
            <code className="text-[var(--color-text-primary)]">AceInlineDrawer</code> rather than one-off shells.
          </li>
          <li>Keep one primary content region; drawers should not replace the main column.</li>
        </ul>
      }
    />
  )
}
