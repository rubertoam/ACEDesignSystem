import { useState } from 'react'
import { AceTabCards } from '../components/atoms/AceTabs/AceTabCards'
import { AceTabs } from '../components/atoms/AceTabs/AceTabs'
import { LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const DEMO_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'examples', label: 'Examples' },
  { id: 'code', label: 'Code' },
  { id: 'usage', label: 'Usage' },
  { id: 'changelog', label: 'Changelog' },
]

const DEMO_TAB_CARD_DESCRIPTION =
  'Description text for this tab option with enough copy to wrap onto a second line in the card layout.'

const DEMO_TAB_CARDS = [
  {
    id: 'tab-1',
    title: 'Tab title 1',
    subtitle: 'Subtitle text',
    description: DEMO_TAB_CARD_DESCRIPTION,
  },
  {
    id: 'tab-2',
    title: 'Tab title 2',
    subtitle: 'Subtitle text',
    description: DEMO_TAB_CARD_DESCRIPTION,
  },
  {
    id: 'tab-3',
    title: 'Tab title 3',
    subtitle: 'Subtitle text',
    description: DEMO_TAB_CARD_DESCRIPTION,
  },
] as const

type TabsLabVariant = 'standard' | 'tab-card'

export function TabsLab() {
  const [variant, setVariant] = useState<TabsLabVariant>('standard')
  const [active, setActive] = useState('overview')
  const [activeCard, setActiveCard] = useState('tab-1')

  const toolbar = (
    <LabSelect
      label="Variant"
      value={variant}
      onChange={(v) => setVariant(v as TabsLabVariant)}
      options={[
        { value: 'standard', label: 'Standard' },
        { value: 'tab-card', label: 'Tab Card' },
      ]}
    />
  )

  return (
    <ComponentLabPage
      title="Tabs"
      description="Horizontal tabs for switching related views: standard underline tabs or Tab Cards for inner-feature navigation with richer context (Figma Tab Cards 4130:4356)."
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-8">
          <div className={cn('space-y-6', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            {variant === 'standard' ? (
              <AceTabs items={DEMO_TABS} value={active} onValueChange={setActive} aria-label="Demo tabs" />
            ) : (
              <AceTabCards
                items={[...DEMO_TAB_CARDS]}
                value={activeCard}
                onValueChange={setActiveCard}
                aria-label="Demo tab cards"
              />
            )}
            <p className="m-0 text-sm text-[var(--screening-text-muted)]">
              Active panel:{' '}
              <strong className="text-[var(--screening-text-primary)]">
                {variant === 'standard' ? active : activeCard}
              </strong>
            </p>
          </div>
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
import { AceTabCards } from '../components/atoms/AceTabs/AceTabCards'

// Standard
<AceTabs items={[{ id: 'overview', label: 'Overview' }]} value={tab} onValueChange={setTab} />

// Tab Card
<AceTabCards
  items={[
    {
      id: 'section-a',
      title: 'Tab title 1',
      subtitle: 'Subtitle text',
      description: 'Description text for this tab option with enough copy to wrap onto a second line.',
    },
  ]}
  value={card}
  onValueChange={setCard}
  aria-label="Feature sections"
/>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use <strong className="text-[var(--screening-text-primary)]">standard tabs</strong> to organize peer
              content (e.g. Examples / Code / Usage) without navigating away. Use{' '}
              <strong className="text-[var(--screening-text-primary)]">Tab Cards</strong> for inner-feature navigation
              when each option needs a title, optional meta line, description, and a decorative header icon.
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Tab Card anatomy</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>Title — H5 Small Bold</li>
              <li>Header icon — 16px, primary accent (decorative)</li>
              <li>Subtitle — Footer Regular (optional)</li>
              <li>Description — Caption Regular</li>
              <li>
                States — default (white + neutral border), hover (Primary 50 fill + XS drop shadow), selected (Primary
                50 fill + primary border)
              </li>
            </ul>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Both variants use <code className="text-[var(--screening-text-primary)]">role="tablist"</code> and{' '}
              <code className="text-[var(--screening-text-primary)]">role="tab"</code> with{' '}
              <code className="text-[var(--screening-text-primary)]">aria-selected</code>. Pair with tab panels using{' '}
              <code className="text-[var(--screening-text-primary)]">aria-controls</code> on the consuming page.
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Design tokens</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                Standard — <code className="text-[var(--screening-text-primary)]">--ace-tabs-text-*</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-tabs-indicator-*</code>
              </li>
              <li>
                Tab Card — <code className="text-[var(--screening-text-primary)]">--ace-tab-card-surface-*</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-tab-card-border-*</code>, hover elevation{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-drop-shadow-xs</code>, emphasis fill{' '}
                <code className="text-[var(--screening-text-primary)]">--screening-primary-soft-bg</code> (Primary 50)
              </li>
            </ul>
          </section>
        </>
      }
    />
  )
}
