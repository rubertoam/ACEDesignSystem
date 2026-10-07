import { useState } from 'react'
import { AceTabCards } from '../components/atoms/AceTabs/AceTabCards'
import { AceTabs } from '../components/atoms/AceTabs/AceTabs'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const DEMO_TABS = [
  { id: 'tab-1', label: 'Enter Text' },
  { id: 'tab-2', label: 'Enter Text' },
  { id: 'tab-3', label: 'Enter Text' },
  { id: 'tab-4', label: 'Enter Text' },
  { id: 'tab-5', label: 'Enter Text' },
  { id: 'tab-6', label: 'Enter Text' },
]

const DEMO_VERTICAL_TABS = [
  ...DEMO_TABS,
  { id: 'tab-7', label: 'Enter Text' },
  { id: 'tab-8', label: 'Enter Text' },
  { id: 'tab-9', label: 'Enter Text' },
  { id: 'tab-10', label: 'Enter Text' },
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

export function TabsLab() {
  const [horizontalActive, setHorizontalActive] = useState('tab-1')
  const [verticalActive, setVerticalActive] = useState('tab-1')
  const [activeCard, setActiveCard] = useState('tab-1')

  return (
    <ComponentLabPage
      title="Tabs"
      description="Vertical, horizontal and card tabs. Tabs organize content into separate views and allow navigation between them (Figma Tabs 5196:82)."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Horizontal</p>
            <div className={labComponentContainerClass}>
              <AceTabs
                items={DEMO_TABS}
                value={horizontalActive}
                onValueChange={setHorizontalActive}
                orientation="horizontal"
                aria-label="Horizontal demo tabs"
              />
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Vertical</p>
            <div className={labComponentContainerClass}>
              <AceTabs
                items={DEMO_VERTICAL_TABS}
                value={verticalActive}
                onValueChange={setVerticalActive}
                orientation="vertical"
                aria-label="Vertical demo tabs"
              />
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Tab cards</p>
            <div className={labComponentContainerClass}>
              <AceTabCards
                items={[...DEMO_TAB_CARDS]}
                value={activeCard}
                onValueChange={setActiveCard}
                aria-label="Demo tab cards"
              />
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Controlled tabs - pass <code className="text-[var(--screening-text-primary)]">items</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">value</code>, and{' '}
            <code className="text-[var(--screening-text-primary)]">onValueChange</code>. Use{' '}
            <code className="text-[var(--screening-text-primary)]">orientation</code> for underline vs leading-bar
            layouts, or <code className="text-[var(--screening-text-primary)]">AceTabCards</code> for richer options.
          </p>
          <ComponentLabCode>{`import { AceTabs } from '../components/atoms/AceTabs/AceTabs'
import { AceTabCards } from '../components/atoms/AceTabs/AceTabCards'

<AceTabs
  items={[{ id: 'one', label: 'Enter Text' }]}
  value={tab}
  onValueChange={setTab}
  orientation="horizontal"
/>

<AceTabs
  items={[{ id: 'one', label: 'Enter Text' }]}
  value={tab}
  onValueChange={setTab}
  orientation="vertical"
/>

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
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use <strong className="text-[var(--screening-text-primary)]">horizontal</strong> or{' '}
              <strong className="text-[var(--screening-text-primary)]">vertical</strong> tabs to organize peer content
              without navigating away. Use{' '}
              <strong className="text-[var(--screening-text-primary)]">Tab Cards</strong> for inner-feature navigation
              when each option needs a title, optional meta line, description, and header icons.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Edge case</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              If tabs do not fit in the view, scroll horizontally to reveal more. When an off-screen tab is selected,
              keep scroll position so the selected tab stays in focus.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Tab Card anatomy</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>Title - Paragraph/P1 Bold (14)</li>
              <li>Header icons - Figma Earthquake + History + Tune cluster (68×16)</li>
              <li>Subtitle - Caption Regular (12, optional)</li>
              <li>Description - Caption Regular (12)</li>
              <li>
                States - default (white + neutral border), hover (Primary 50 fill + XL drop shadow), selected (Primary
                50 fill + brand border)
              </li>
            </ul>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Both variants use <code className="text-[var(--screening-text-primary)]">role="tablist"</code> and{' '}
              <code className="text-[var(--screening-text-primary)]">role="tab"</code> with{' '}
              <code className="text-[var(--screening-text-primary)]">aria-selected</code>. Set{' '}
              <code className="text-[var(--screening-text-primary)]">aria-orientation</code> via the{' '}
              <code className="text-[var(--screening-text-primary)]">orientation</code> prop. Pair with tab panels using{' '}
              <code className="text-[var(--screening-text-primary)]">aria-controls</code> on the consuming page.
            </p>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--screening-text-muted)]">
          <li>
            Standard - <code className="text-[var(--screening-text-primary)]">--ace-tabs-text-*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-tabs-indicator-*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-tabs-vertical-*</code>
          </li>
          <li>
            Tab Card - <code className="text-[var(--screening-text-primary)]">--ace-tab-card-surface-*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-tab-card-border-*</code>, hover elevation{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-drop-shadow-xl</code>, emphasis fill{' '}
            <code className="text-[var(--screening-text-primary)]">--screening-primary-soft-bg</code> (Primary 50)
          </li>
        </ul>
      }
    />
  )
}
