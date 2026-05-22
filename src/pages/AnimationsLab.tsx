import { useState } from 'react'
import { AceAccordion } from '../components/molecules/AceAccordion/AceAccordion'
import { AceSidebar, type AceSidebarGroup } from '../components/organisms/AceSidebar/AceSidebar'
import { ACE_ANIMATIONS, ACE_MOTION_EASE_STANDARD } from '../lib/aceAnimations'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

function AnimationCatalogTable() {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)]">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface-muted)]">
            <th className="px-4 py-2.5 font-semibold text-[var(--screening-text-primary)]">Name</th>
            <th className="px-4 py-2.5 font-semibold text-[var(--screening-text-primary)]">Component</th>
            <th className="px-4 py-2.5 font-semibold text-[var(--screening-text-primary)]">Properties</th>
            <th className="px-4 py-2.5 font-semibold text-[var(--screening-text-primary)]">Duration</th>
            <th className="px-4 py-2.5 font-semibold text-[var(--screening-text-primary)]">Easing</th>
            <th className="px-4 py-2.5 font-semibold text-[var(--screening-text-primary)]">Tokens</th>
          </tr>
        </thead>
        <tbody>
          {ACE_ANIMATIONS.map((entry) => (
            <tr
              key={entry.id}
              className="border-b border-solid border-[var(--screening-border-strong)] last:border-b-0"
            >
              <td className="px-4 py-3 align-top">
                <span className="font-medium text-[var(--screening-text-primary)]">{entry.name}</span>
                <p className="m-0 mt-1 font-mono text-xs text-[var(--screening-text-muted)]">{entry.id}</p>
                {entry.notes ? (
                  <p className="m-0 mt-1 text-xs text-[var(--screening-text-muted)]">{entry.notes}</p>
                ) : null}
              </td>
              <td className="px-4 py-3 align-top text-[var(--screening-text-muted)]">{entry.component}</td>
              <td className="px-4 py-3 align-top font-mono text-xs text-[var(--screening-text-muted)]">
                {entry.properties}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-[var(--screening-text-muted)]">
                {entry.duration}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-[var(--screening-text-muted)]">
                {entry.easing}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-[var(--screening-text-muted)]">
                {entry.tokens.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SidebarMotionDemo() {
  const [open, setOpen] = useState(true)
  const [groups, setGroups] = useState<AceSidebarGroup[]>([
    {
      id: 'g1',
      label: 'High Risk',
      expanded: true,
      items: [
        { id: 'i1', label: 'AML Checks', selected: true },
        { id: 'i2', label: 'Sanctions' },
      ],
    },
    { id: 'g2', label: 'FinScan Queries', expanded: false, items: [] },
  ])

  const groupsWithHandlers = groups.map((g) => ({
    ...g,
    onToggle: () =>
      setGroups((prev) => prev.map((x) => (x.id === g.id ? { ...x, expanded: !x.expanded } : x))),
  }))

  return (
    <div className="space-y-3">
      <p className="m-0 text-xs text-[var(--screening-text-muted)]">
        Open/close the panel and expand groups to preview sidebar motion tokens.
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] px-3 py-1.5 text-sm text-[var(--screening-text-primary)] transition-colors duration-[var(--ace-motion-duration-fast)] hover:bg-[var(--screening-surface-hover)]"
        style={{ transitionTimingFunction: 'var(--ace-motion-ease-standard)' }}
      >
        {open ? 'Close sidebar' : 'Open sidebar'}
      </button>
      <div className="flex h-[min(70vh,36rem)] min-h-[28rem] overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)]">
        <AceSidebar open={open} variant="groups" addLabel="New Group" groups={groupsWithHandlers} />
        <div className="flex min-w-0 flex-1 items-center justify-center bg-[var(--screening-surface-muted)] p-6 text-sm text-[var(--screening-text-muted)]">
          App viewport
        </div>
      </div>
    </div>
  )
}

function AccordionMotionDemo() {
  return (
    <AceAccordion title="Accordion expand" defaultOpen={false}>
      <p className="m-0 text-sm text-[var(--screening-text-muted)]">
        Body uses <code className="text-[var(--screening-text-primary)]">grid-template-rows</code> with{' '}
        <code className="text-[var(--screening-text-primary)]">--ace-accordion-duration</code> and{' '}
        <code className="text-[var(--screening-text-primary)]">--ace-accordion-ease</code>.
      </p>
    </AceAccordion>
  )
}

export function AnimationsLab() {
  return (
    <ComponentLabPage
      title="Animations"
      description="Central registry of ACE motion: easing curves, durations, and per-component transitions. Update src/lib/aceAnimations.ts whenever you add animation to a component."
      examples={
        <div className="space-y-10">
          <section className="space-y-3">
            <h3 className="m-0 text-base font-semibold text-[var(--screening-text-primary)]">Motion tokens</h3>
            <ul className="m-0 list-disc space-y-1 pl-5 text-sm text-[var(--screening-text-muted)]">
              <li>
                Standard ease:{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-motion-ease-standard</code> (
                {ACE_MOTION_EASE_STANDARD})
              </li>
              <li>
                Durations:{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-motion-duration-fast</code> (150ms),{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-motion-duration-medium</code> (300ms),{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-motion-duration-slow</code> (420ms)
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="m-0 text-base font-semibold text-[var(--screening-text-primary)]">Catalog</h3>
            <AnimationCatalogTable />
          </section>

          <section className="space-y-3">
            <h3 className="m-0 text-base font-semibold text-[var(--screening-text-primary)]">Sidebar</h3>
            <SidebarMotionDemo />
          </section>

          <section className="space-y-3">
            <h3 className="m-0 text-base font-semibold text-[var(--screening-text-primary)]">Accordion</h3>
            <AccordionMotionDemo />
          </section>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Register new animations in the catalog, then reference tokens in component styles.
          </p>
          <ComponentLabCode>{`// src/lib/aceAnimations.ts
export const ACE_ANIMATIONS = [
  {
    id: 'my-component-hover',
    name: 'Row hover',
    component: 'MyComponent',
    properties: 'background-color',
    duration: 'var(--ace-motion-duration-fast)',
    easing: 'var(--ace-motion-ease-standard)',
    tokens: ['--ace-motion-duration-fast', '--ace-motion-ease-standard'],
  },
  // ...
]

// Component (Tailwind + tokens)
className={cn(
  'transition-colors duration-[var(--ace-motion-duration-fast)]',
  '[transition-timing-function:var(--ace-motion-ease-standard)]',
  'motion-reduce:transition-none',
)}`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Workflow for developers</h4>
            <ol className="m-0 list-decimal space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>Prefer existing motion tokens in variables.css before introducing new durations or curves.</li>
              <li>
                When adding or changing animation on any component, append an entry to{' '}
                <code className="text-[var(--screening-text-primary)]">ACE_ANIMATIONS</code> in{' '}
                <code className="text-[var(--screening-text-primary)]">src/lib/aceAnimations.ts</code>.
              </li>
              <li>Add or update a live demo on this page so design and engineering can evaluate the motion together.</li>
              <li>Respect <code className="text-[var(--screening-text-primary)]">prefers-reduced-motion</code> via motion-reduce utilities.</li>
            </ol>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Expand / collapse pattern</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use a grid wrapper with <code className="text-[var(--screening-text-primary)]">grid-rows-[0fr]</code> →{' '}
              <code className="text-[var(--screening-text-primary)]">grid-rows-[1fr]</code> and an inner{' '}
              <code className="text-[var(--screening-text-primary)]">min-h-0 overflow-hidden</code> child. AceSidebar
              groups, AceAccordion, and LabLayout nav sections all follow this pattern.
            </p>
          </section>
        </>
      }
    />
  )
}
