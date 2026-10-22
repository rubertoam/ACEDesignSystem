import { useMemo, useState } from 'react'
import { FilterChip, FilterToggleChip } from '../components/molecules/Filtering'
import {
  DropdownMenu,
  type DropdownMenuEntry,
} from '../components/molecules/DropdownMenu/DropdownMenu'
import { filterHeaderChipsClass } from '../components/molecules/Filtering/filterFieldStyles'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import filteringRules from './implementationRules/filtering.md?raw'

const FILTER_OPTIONS = [
  { id: 'locked', menuLabel: 'Locked', chipLabel: 'Locked: All' },
  { id: 'users', menuLabel: 'Users', chipLabel: 'User: All' },
  { id: 'groups', menuLabel: 'Groups', chipLabel: 'Group: All' },
  { id: 'statuses', menuLabel: 'Statuses', chipLabel: 'Status: All' },
] as const

type FilterOptionId = (typeof FILTER_OPTIONS)[number]['id']

export function FilteringLab() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterOptionId>>(() => new Set())
  const [toggledChips, setToggledChips] = useState<Set<FilterOptionId>>(() => new Set())

  const toggleFilter = (id: FilterOptionId, checked: boolean) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const clearFilter = (id: FilterOptionId) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const toggleChip = (id: FilterOptionId) => {
    setToggledChips((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filterMenuItems: DropdownMenuEntry[] = useMemo(
    () =>
      FILTER_OPTIONS.map((option) => ({
        type: 'checkbox' as const,
        id: option.id,
        label: option.menuLabel,
        checked: activeFilters.has(option.id),
        onCheckedChange: (checked: boolean) => toggleFilter(option.id, checked),
        style: 'assignment' as const,
      })),
    [activeFilters],
  )

  const activeChips = FILTER_OPTIONS.filter((option) => activeFilters.has(option.id))

  return (
    <ComponentLabPage
      title="Filtering"
      description="Filters dropdown, clearable applied chips, and on/off filter chips for table toolbars (Figma Table Headers 1540:4577)."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Filter triggers</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-col items-start gap-3">
                <DropdownMenu
                  triggerLabel="Filters"
                  triggerMode="filter"
                  items={filterMenuItems}
                />
                {activeChips.length > 0 ? (
                  <div className={filterHeaderChipsClass}>
                    {activeChips.map((option) => (
                      <FilterChip
                        key={option.id}
                        label={option.chipLabel}
                        onClear={() => clearFilter(option.id)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Filter chips</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-wrap items-center gap-3">
                {(['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4'] as const).map((label, index) => {
                  const id = FILTER_OPTIONS[index].id
                  return (
                    <FilterToggleChip
                      key={id}
                      label={label}
                      pressed={toggledChips.has(id)}
                      onClick={() => toggleChip(id)}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Use <code className="text-[var(--screening-text-primary)]">DropdownMenu</code> with{' '}
            <code className="text-[var(--screening-text-primary)]">triggerMode=&quot;filter&quot;</code> for the
            Filters menu. Use <code className="text-[var(--screening-text-primary)]">FilterToggleChip</code> for
            on/off chips (no chevron or clear). Use{' '}
            <code className="text-[var(--screening-text-primary)]">FilterChip</code> for clearable applied filters.
          </p>
          <ComponentLabCode>{`import { DropdownMenu } from '../components/molecules/DropdownMenu/DropdownMenu'
import { FilterChip, FilterToggleChip } from '../components/molecules/Filtering'

<DropdownMenu
  triggerLabel="Filters"
  triggerMode="filter"
  items={[
    { type: 'checkbox', label: 'Locked', checked, onCheckedChange },
    { type: 'checkbox', label: 'Users', checked, onCheckedChange },
    { type: 'checkbox', label: 'Groups', checked, onCheckedChange },
    { type: 'checkbox', label: 'Statuses', checked, onCheckedChange },
  ]}
/>

<FilterToggleChip label="Filter 1" pressed={on} onClick={toggle} />
<FilterChip label="Locked: All" onClear={...} />`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use the Filters trigger to choose filter dimensions; selected options appear as clearable chips
              below. Use Filter chips for simple on/off toggles. Full table header compositions live on the Data
              Table lab page.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">States</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Triggers and chips use{' '}
              <code className="text-[var(--screening-text-primary)]">colors/surface/primary</code> →{' '}
              <code className="text-[var(--screening-text-primary)]">--color-surface-primary</code> with{' '}
              <code className="text-[var(--screening-text-primary)]">colors/border/default</code> →{' '}
              <code className="text-[var(--screening-text-primary)]">--color-border-default</code> at rest. Hover and
              pressed toggle chips fill <code className="text-[var(--screening-text-primary)]">colors/bg/brand</code>{' '}
              → <code className="text-[var(--screening-text-primary)]">--color-bg-brand</code> with{' '}
              <code className="text-[var(--screening-text-primary)]">colors/text/inverse</code> →{' '}
              <code className="text-[var(--screening-text-primary)]">--color-text-inverse</code>.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Toggle chips expose <code>aria-pressed</code>. Clearable chips use an explicit aria-label on the
              clear control; clearing deselects the matching Filters menu option.
            </p>
          </section>
        </>
      }
      implementationRulesMarkdown={filteringRules}
    />
  )
}
