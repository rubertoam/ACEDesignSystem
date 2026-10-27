import { useState } from 'react'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { Accordion, type AccordionSurface } from '../components/molecules/Accordion/Accordion'
import { AccordionReviewProgress } from '../components/molecules/Accordion/AccordionReviewProgress'
import { LabControlField, LabMultiSelect, LabSelect } from '../lib/labControls'
import { labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { accordionLabQa } from './labTabDocs'

const DEMO_REVIEWED = 5
const DEMO_TOTAL = 12

const SURFACE_OPTIONS: { value: AccordionSurface; label: string }[] = [
  { value: 'white', label: 'White' },
  { value: 'gray', label: 'Gray' },
]

type AccordionIconId = 'more' | 'edit' | 'delete' | 'add'

const ICON_OPTIONS: { value: AccordionIconId; label: string }[] = [
  { value: 'more', label: 'More' },
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
  { value: 'add', label: 'Add' },
]

const ALL_ICONS: AccordionIconId[] = ICON_OPTIONS.map((o) => o.value)

const sampleBody = (
  <p className="m-0 min-h-[18rem] [font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--screening-text-secondary)]">
    Accordion body content goes here. Expand and collapse uses a 420ms ease-out curve (
    <code className="text-[var(--screening-text-primary)]">--accordion-ease</code>).
  </p>
)

function StaticSurfaceCell({
  surface,
  dropShadow,
  expanded,
}: {
  surface: AccordionSurface
  dropShadow: boolean
  expanded: boolean
}) {
  return (
    <Accordion
      title="[Enter Title]"
      surface={surface}
      dropShadow={dropShadow}
      showTag
      showMoreIcon
      showEditIcon
      showDeleteIcon
      showAddIcon
      defaultOpen={expanded}
      className="pointer-events-none select-none"
    >
      {sampleBody}
    </Accordion>
  )
}

export function AccordionLab() {
  const [surface, setSurface] = useState<AccordionSurface>('white')
  const [dropShadow, setDropShadow] = useState(false)
  const [showTag, setShowTag] = useState(true)
  const [showIcons, setShowIcons] = useState<AccordionIconId[]>(ALL_ICONS)
  const [showProgressBar, setShowProgressBar] = useState(false)

  const showMoreIcon = showIcons.includes('more')
  const showEditIcon = showIcons.includes('edit')
  const showDeleteIcon = showIcons.includes('delete')
  const showAddIcon = showIcons.includes('add')

  const accordionKey = [
    surface,
    dropShadow,
    showTag,
    showMoreIcon,
    showEditIcon,
    showDeleteIcon,
    showAddIcon,
    showProgressBar,
  ].join('-')

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabSelect label="Background" value={surface} onChange={setSurface} options={SURFACE_OPTIONS} />
        <LabMultiSelect
          label="Show icons"
          values={showIcons}
          onChange={setShowIcons}
          options={ICON_OPTIONS}
        />
        <LabControlField label="Drop shadow" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle
              size="sm"
              checked={dropShadow}
              onCheckedChange={setDropShadow}
              aria-label="Drop shadow"
            />
          </div>
        </LabControlField>
        <LabControlField label="Progress bar" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle
              size="sm"
              checked={showProgressBar}
              onCheckedChange={setShowProgressBar}
              aria-label="Progress bar"
            />
          </div>
        </LabControlField>
        <LabControlField label="Tag" className="shrink-0">
          <div className="flex min-h-9 items-center">
            <Toggle size="sm" checked={showTag} onCheckedChange={setShowTag} aria-label="Tag" />
          </div>
        </LabControlField>
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
        <div className="w-full max-w-[42rem] min-w-[min(100%,42rem)]">
          <Accordion
            key={accordionKey}
            title="[Enter Title]"
            surface={surface}
            dropShadow={dropShadow}
            showTag={showTag}
            showAddIcon={showAddIcon}
            showDeleteIcon={showDeleteIcon}
            showEditIcon={showEditIcon}
            showMoreIcon={showMoreIcon}
            headerTrailing={
              showProgressBar ? (
                <AccordionReviewProgress reviewed={DEMO_REVIEWED} total={DEMO_TOTAL} />
              ) : undefined
            }
          >
            {sampleBody}
          </Accordion>
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={accordionLabQa}
      title="Accordions"
      description="Standard collapsed / expanded accordion from ACE (Figma Accordions 332:1500). Shell uses radius/sm, spacing/16·12, purple Badge pill, and Iconography no-border icons at icon/size/lg (20px) in a 32px hit target."
      examplesToolbar={toolbar}
      examples={
        <section className="space-y-8">
          <div className={cn('w-full min-w-0', labUsageSectionClass)}>
            <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
            <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
              Collapsed and expanded shells for white / gray surfaces with optional XS drop shadow. Live expand /
              collapse and icon controls are above.
            </p>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold text-[var(--color-text-primary)]">Collapsed</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  White
                </p>
                <StaticSurfaceCell surface="white" dropShadow={false} expanded={false} />
              </div>
              <div className="space-y-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  White · Drop shadow
                </p>
                <StaticSurfaceCell surface="white" dropShadow expanded={false} />
              </div>
              <div className="space-y-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Gray
                </p>
                <StaticSurfaceCell surface="gray" dropShadow={false} expanded={false} />
              </div>
              <div className="space-y-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Gray · Drop shadow
                </p>
                <StaticSurfaceCell surface="gray" dropShadow expanded={false} />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold text-[var(--color-text-primary)]">Expanded</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  White
                </p>
                <StaticSurfaceCell surface="white" dropShadow={false} expanded />
              </div>
              <div className="space-y-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  White · Drop shadow
                </p>
                <StaticSurfaceCell surface="white" dropShadow expanded />
              </div>
              <div className="space-y-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Gray
                </p>
                <StaticSurfaceCell surface="gray" dropShadow={false} expanded />
              </div>
              <div className="space-y-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  Gray · Drop shadow
                </p>
                <StaticSurfaceCell surface="gray" dropShadow expanded />
              </div>
            </div>
          </div>
        </section>
      }
      code={
        <ComponentLabCode>{`<Accordion
  title="[Enter Title]"
  surface="white"
  tagLabel="Badge"
  tagVariant="purple"
  showTag
  showMoreIcon
  showEditIcon
  showDeleteIcon
  showAddIcon
>
  {children}
</Accordion>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Set <code className="text-[var(--color-text-primary)]">surface</code> to{' '}
          <code className="text-[var(--color-text-primary)]">gray</code> or{' '}
          <code className="text-[var(--color-text-primary)]">white</code>, then use{' '}
          <code className="text-[var(--color-text-primary)]">dropShadow</code> for elevation without changing the fill.
          Each header icon is controlled with <code className="text-[var(--color-text-primary)]">showAddIcon</code>,{' '}
          <code className="text-[var(--color-text-primary)]">showDeleteIcon</code>,{' '}
          <code className="text-[var(--color-text-primary)]">showEditIcon</code>, and{' '}
          <code className="text-[var(--color-text-primary)]">showMoreIcon</code>. Pass{' '}
          <code className="text-[var(--color-text-primary)]">headerTrailing</code> with{' '}
          <code className="text-[var(--color-text-primary)]">AccordionReviewProgress</code> for the data table review
          progress cluster (can combine with tag and icons).
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--accordion-surface-muted</code> (gray),{' '}
            <code className="text-[var(--color-text-primary)]">--accordion-surface</code> (white)
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xs</code> when{' '}
            <code className="text-[var(--color-text-primary)]">dropShadow</code> is true
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--accordion-duration</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--accordion-ease</code>
          </li>
          <li>
            Progress - <code className="text-[var(--color-text-primary)]">--screening-progress-track</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-progress-fill</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-progress-width</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--screening-progress-height</code>
          </li>
        </ul>
      }
    />
  )
}
