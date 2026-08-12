import { useState } from 'react'
import {
  AceScrollableList,
  DEMO_SCROLLABLE_LIST_ITEMS,
} from '../components/organisms/AceScrollableList/AceScrollableList'
import { AceScrollableListItemRow } from '../components/organisms/AceScrollableList/AceScrollableListItemRow'
import { LabCheckbox } from '../lib/labControls'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const ITEM_DEMO = DEMO_SCROLLABLE_LIST_ITEMS[0]

export function ScrollableListLab() {
  const [selectedId, setSelectedId] = useState(DEMO_SCROLLABLE_LIST_ITEMS[0]?.id)
  const [showFilter, setShowFilter] = useState(true)
  const [showSort, setShowSort] = useState(true)
  const [showSearch, setShowSearch] = useState(false)

  const [showItemIcon, setShowItemIcon] = useState(true)
  const [showItemSubtext, setShowItemSubtext] = useState(true)
  const [showItemCount, setShowItemCount] = useState(true)
  const [itemSelected, setItemSelected] = useState(true)

  return (
    <ComponentLabPage
      title="Scrollable List"
      description="A list component with optional filter, sort, and searching functions. This component can also be navigated with a keyboard and can be minimized."
      examplesCanvas={false}
      examplesToolbar={
        <div className="flex flex-wrap items-end gap-6">
          <LabCheckbox label="Filter by" checked={showFilter} onCheckedChange={setShowFilter} />
          <LabCheckbox label="Sort by" checked={showSort} onCheckedChange={setShowSort} />
          <LabCheckbox label="Search" checked={showSearch} onCheckedChange={setShowSearch} />
        </div>
      }
      examples={
        <div className="space-y-10 pb-24">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            <div className={labComponentContainerClass}>
              <div className="flex h-[56.4rem] items-stretch gap-4 p-4">
                <AceScrollableList
                  title="List title"
                  items={DEMO_SCROLLABLE_LIST_ITEMS}
                  selectedId={selectedId}
                  onSelectedIdChange={setSelectedId}
                  showFilter={showFilter}
                  showSort={showSort}
                  showSearch={showSearch}
                />
              </div>
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Building blocks</p>
            <div className={labComponentContainerClass}>
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <div>
                  <div className="mb-4 space-y-1">
                    <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">
                      1. List container
                    </h4>
                    <p className="m-0 text-xs leading-relaxed text-[var(--screening-text-muted)]">
                      Shell with Filter by / Sort by / Search and the empty body container (sticky section, no rows).
                      Toolbar toggles above apply here too.
                    </p>
                  </div>
                  <div className="flex h-[48rem] items-stretch gap-4 p-4">
                    <AceScrollableList
                      title="List title"
                      items={[]}
                      showFilter={showFilter}
                      showSort={showSort}
                      showSearch={showSearch}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-4 space-y-1">
                    <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">
                      2. List item
                    </h4>
                    <p className="m-0 text-xs leading-relaxed text-[var(--screening-text-muted)]">
                      Modular row pieces: title (always on), icon, subtext, and count (
                      <code className="text-[var(--screening-text-primary)]">AceScrollableListItemRow</code>
                      ).
                    </p>
                  </div>
                  <div className="mb-4 flex flex-wrap items-end gap-6">
                    <LabCheckbox label="Icon" checked={showItemIcon} onCheckedChange={setShowItemIcon} />
                    <LabCheckbox label="Subtext" checked={showItemSubtext} onCheckedChange={setShowItemSubtext} />
                    <LabCheckbox label="Count" checked={showItemCount} onCheckedChange={setShowItemCount} />
                    <LabCheckbox label="Selected" checked={itemSelected} onCheckedChange={setItemSelected} />
                  </div>
                  <div className="max-w-sm rounded-[var(--radius-sm)] border border-solid border-[var(--ace-scrollable-list-border)] bg-[var(--ace-scrollable-list-surface)] py-1 shadow-[var(--ace-drop-shadow-xs)]">
                    <AceScrollableListItemRow
                      title={ITEM_DEMO?.label ?? 'List Item'}
                      icon={ITEM_DEMO?.icon}
                      subtext={ITEM_DEMO?.subtext}
                      count={ITEM_DEMO?.count}
                      showIcon={showItemIcon}
                      showSubtext={showItemSubtext}
                      showCount={showItemCount}
                      selected={itemSelected}
                      showFocusRing={itemSelected}
                      onSelect={() => setItemSelected((prev) => !prev)}
                      role="button"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Compose with <code className="text-[var(--screening-text-primary)]">AceScrollableList</code> for the full
            container, or use{' '}
            <code className="text-[var(--screening-text-primary)]">AceScrollableListBody</code> and{' '}
            <code className="text-[var(--screening-text-primary)]">AceScrollableListItemRow</code> for the body and
            modular rows (title, icon, subtext, count).
          </p>
          <ComponentLabCode>{`import {
  AceScrollableList,
  AceScrollableListItemRow,
  DEMO_SCROLLABLE_LIST_ITEMS,
} from '@ace/design-system'

<AceScrollableList
  title="List title"
  items={DEMO_SCROLLABLE_LIST_ITEMS}
  showFilter
  showSort
  showSearch
/>

<AceScrollableListItemRow
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
                Surfaces — <code className="text-[var(--screening-text-primary)]">--ace-scrollable-list-surface</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-scrollable-list-item-selected-bg</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-scrollable-list-icon</code>
              </li>
            </ul>
          </section>
        </>
      }
    />
  )
}
