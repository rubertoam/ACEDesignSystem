import { useState } from 'react'
import { AceTabs } from '../components/atoms/AceTabs/AceTabs'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const FIGMA_TABS_URL =
  'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=2045-4334&m=dev'

const DEMO_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'examples', label: 'Examples' },
  { id: 'code', label: 'Code' },
  { id: 'usage', label: 'Usage' },
  { id: 'changelog', label: 'Changelog' },
]

export function TabsLab() {
  const [active, setActive] = useState('overview')

  return (
    <ComponentLabPage
      title="Tabs"
      description="Horizontal tabs for switching related views within the same context. Active tab uses FinScan primary text and a bottom locator bar."
      figmaUrl={FIGMA_TABS_URL}
      figmaLinkLabel="Tabs in Figma"
      examples={
        <div className="space-y-8">
          <AceTabs items={DEMO_TABS} value={active} onValueChange={setActive} aria-label="Demo tabs" />
          <p className="m-0 text-sm text-[var(--screening-text-muted)]">
            Active panel: <strong className="text-[var(--screening-text-primary)]">{active}</strong>
          </p>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Controlled tabs — pass <code className="text-[var(--screening-text-primary)]">items</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">value</code>, and{' '}
            <code className="text-[var(--screening-text-primary)]">onValueChange</code>.
          </p>
          <ComponentLabCode>{`import { AceTabs } from '../components/atoms/AceTabs/AceTabs'

const [tab, setTab] = useState('overview')

<AceTabs
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'code', label: 'Code' },
  ]}
  value={tab}
  onValueChange={setTab}
  aria-label="Documentation sections"
/>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use tabs to organize peer content (e.g. Examples / Code / Usage on component pages) without navigating
              away. Prefer tabs over segmented controls when each panel is a distinct view rather than a filter on the
              same dataset.
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Anatomy</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>Tab label — P1 Regular (inactive) / P1 Bold (active)</li>
              <li>Locator — 1.5px bar, full tab width, primary purple, rounded top corners</li>
              <li>Gap between tabs — 12px (<code className="text-[var(--screening-text-primary)]">--ace-tabs-gap</code>)</li>
            </ul>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Implements <code className="text-[var(--screening-text-primary)]">role="tablist"</code> and{' '}
              <code className="text-[var(--screening-text-primary)]">role="tab"</code> with{' '}
              <code className="text-[var(--screening-text-primary)]">aria-selected</code>. Pair with tab panels using{' '}
              <code className="text-[var(--screening-text-primary)]">aria-controls</code> on the consuming page.
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Design tokens</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <code className="text-[var(--screening-text-primary)]">--ace-tabs-text-active</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-tabs-text-inactive</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-tabs-indicator-*</code>
              </li>
            </ul>
          </section>
        </>
      }
    />
  )
}
