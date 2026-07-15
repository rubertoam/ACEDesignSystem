import { useMemo, useState } from 'react'
import { AceFilterChip, AceFilterToggleChip } from '../components/molecules/AceFiltering'
import {
  AceDropdownMenu,
  type AceDropdownMenuEntry,
} from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import { aceFilterHeaderChipsClass } from '../components/molecules/AceFiltering/filterFieldStyles'
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

  const filterMenuItems: AceDropdownMenuEntry[] = useMemo(
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
                <AceDropdownMenu
                  triggerLabel="Filters"
                  triggerMode="filter"
                  items={filterMenuItems}
                />
                {activeChips.length > 0 ? (
                  <div className={aceFilterHeaderChipsClass}>
                    {activeChips.map((option) => (
                      <AceFilterChip
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
                    <AceFilterToggleChip
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
            Use <code className="text-[var(--screening-text-primary)]">AceDropdownMenu</code> with{' '}
            <code className="text-[var(--screening-text-primary)]">triggerMode=&quot;filter&quot;</code> for the
            Filters menu. Use <code className="text-[var(--screening-text-primary)]">AceFilterToggleChip</code> for
            on/off chips (no chevron or clear). Use{' '}
            <code className="text-[var(--screening-text-primary)]">AceFilterChip</code> for clearable applied filters.
          </p>
          <ComponentLabCode>{`import { AceDropdownMenu } from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import { AceFilterChip, AceFilterToggleChip } from '../components/molecules/AceFiltering'

<AceDropdownMenu
  triggerLabel="Filters"
  triggerMode="filter"
  items={[
    { type: 'checkbox', label: 'Locked', checked, onCheckedChange },
    { type: 'checkbox', label: 'Users', checked, onCheckedChange },
    { type: 'checkbox', label: 'Groups', checked, onCheckedChange },
    { type: 'checkbox', label: 'Statuses', checked, onCheckedChange },
  ]}
/>

<AceFilterToggleChip label="Filter 1" pressed={on} onClick={toggle} />
<AceFilterChip label="Locked: All" onClear={...} />`}</ComponentLabCode>
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
              Triggers and chips use Shade 0 with a Neutral/400 border at rest. Hover (and pressed toggle chips)
              fill Neutral/700 with Neutral/100 text.
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
