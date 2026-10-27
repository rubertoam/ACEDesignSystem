import { useState } from 'react'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { aceToggleLabelClass } from '../components/atoms/Toggle/toggleFieldStyles'
import {
  ScrollableList,
  DEMO_SCROLLABLE_LIST_ITEMS,
} from '../components/organisms/ScrollableList/ScrollableList'
import { ScrollableListItemRow } from '../components/organisms/ScrollableList/ScrollableListItemRow'
import { LabControlField } from '../lib/labControls'
import { labComponentContainerClass } from '../lib/labChrome'
import { labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

import { scrollableListLabQa } from './labTabDocs'

const ITEM_DEMO = DEMO_SCROLLABLE_LIST_ITEMS[0]

function ListControlToggle({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <LabControlField label={label} className="shrink-0">
      <div className="flex min-h-9 items-center gap-2">
        <Toggle size="sm" checked={checked} onCheckedChange={onCheckedChange} aria-label={label} />
        <span className={aceToggleLabelClass}>{checked ? 'On' : 'Off'}</span>
      </div>
    </LabControlField>
  )
}

export function ScrollableListLab() {
  const [selectedId, setSelectedId] = useState(DEMO_SCROLLABLE_LIST_ITEMS[0]?.id)

  const [interactiveFilter, setInteractiveFilter] = useState(true)
  const [interactiveSort, setInteractiveSort] = useState(true)
  const [interactiveSearch, setInteractiveSearch] = useState(false)

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <ListControlToggle
          label="Filter by"
          checked={interactiveFilter}
          onCheckedChange={setInteractiveFilter}
        />
        <ListControlToggle
          label="Sort by"
          checked={interactiveSort}
          onCheckedChange={setInteractiveSort}
        />
        <ListControlToggle
          label="Search"
          checked={interactiveSearch}
          onCheckedChange={setInteractiveSearch}
        />
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="flex h-[56.4rem] items-stretch gap-4">
          <ScrollableList
            title="List title"
            items={DEMO_SCROLLABLE_LIST_ITEMS}
            selectedId={selectedId}
            onSelectedIdChange={setSelectedId}
            showFilter={interactiveFilter}
            showSort={interactiveSort}
            showSearch={interactiveSearch}
          />
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={scrollableListLabQa}
      title="Squeeze Box"
      description="A list component with optional filter, sort, and searching functions. This component can also be navigated with a keyboard and can be minimized."
      examplesCanvas={false}
      examplesToolbar={toolbar}
      examples={
        <section className="space-y-5">
          <div className={cn('w-full min-w-0', labUsageSectionClass)}>
            <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
            <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
              Building blocks for the list container shell and modular row pieces. Use the toolbar above for the
              live list.
            </p>
          </div>
          <div className={labComponentContainerClass}>
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-4 space-y-1">
                  <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">
                    1. List container
                  </h4>
                  <p className="m-0 text-xs leading-relaxed text-[var(--screening-text-muted)]">
                    Shell with Filter by / Sort by / Search and the empty body container (sticky section, no rows).
                  </p>
                </div>
                <div className="flex h-[48rem] items-stretch gap-4 p-4">
                  <ScrollableList title="List title" items={[]} showFilter showSort showSearch />
                </div>
              </div>

              <div>
                <div className="mb-4 space-y-1">
                  <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">2. List item</h4>
                  <p className="m-0 text-xs leading-relaxed text-[var(--screening-text-muted)]">
                    Modular row pieces: title (always on), icon, subtext, and count (
                    <code className="text-[var(--screening-text-primary)]">ScrollableListItemRow</code>
                    ).
                  </p>
                </div>
                <div className="max-w-sm rounded-[var(--radius-sm)] border border-solid border-[var(--scrollable-list-border)] bg-[var(--scrollable-list-surface)] py-1 shadow-[var(--ace-drop-shadow-xs)]">
                  <ScrollableListItemRow
                    title={ITEM_DEMO?.label ?? 'List Item'}
                    icon={ITEM_DEMO?.icon}
                    subtext={ITEM_DEMO?.subtext}
                    count={ITEM_DEMO?.count}
                    showIcon
                    showSubtext
                    showCount
                    selected
                    showFocusRing
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Compose with <code className="text-[var(--screening-text-primary)]">ScrollableList</code> for the full
            container, or use{' '}
            <code className="text-[var(--screening-text-primary)]">ScrollableListBody</code> and{' '}
            <code className="text-[var(--screening-text-primary)]">ScrollableListItemRow</code> for the body and
            modular rows (title, icon, subtext, count).
          </p>
          <ComponentLabCode>{`import {
  ScrollableList,
  ScrollableListItemRow,
  DEMO_SCROLLABLE_LIST_ITEMS,
} from '@ace/design-system'

<ScrollableList
  title="List title"
  items={DEMO_SCROLLABLE_LIST_ITEMS}
  showFilter
  showSort
  showSearch
/>

<ScrollableListItemRow
  title="List Item 1"
  icon="person"
  subtext="ID-1001"
  count={38}
  selected
/>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>Master/detail layouts where a compact list drives the content beside it.</li>
              <li>
                Toggle <code className="text-[var(--screening-text-primary)]">showFilter</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">showSort</code>, and{' '}
                <code className="text-[var(--screening-text-primary)]">showSearch</code> on the list container. Search
                renders under the Filter / Sort row when those controls are on.
              </li>
              <li>
                Rows always show a title. Toggle{' '}
                <code className="text-[var(--screening-text-primary)]">showIcon</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">showSubtext</code>, and{' '}
                <code className="text-[var(--screening-text-primary)]">showCount</code>. Pass{' '}
                <code className="text-[var(--screening-text-primary)]">subtext</code> and{' '}
                <code className="text-[var(--screening-text-primary)]">count</code> separately.
              </li>
              <li>
                Use <code className="text-[var(--screening-text-primary)]">icon=&quot;person&quot;</code> or{' '}
                <code className="text-[var(--screening-text-primary)]">icon=&quot;organization&quot;</code> for the
                Review Assigned SVG glyphs.
              </li>
            </ul>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Tokens</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                Surfaces - <code className="text-[var(--screening-text-primary)]">--scrollable-list-surface</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--scrollable-list-item-selected-bg</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--scrollable-list-icon</code>
              </li>
            </ul>
          </section>
        </>
      }
    />
  )
}
