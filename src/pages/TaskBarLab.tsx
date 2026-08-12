import { useState } from 'react'
import { AceButton } from '../components/atoms/AceButton'
import { AceTaskBar } from '../components/molecules/AceTaskBar'
import { labComponentContainerClass } from '../lib/labChrome'
import { LabCheckbox } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

export function TaskBarLab() {
  const [showLeading, setShowLeading] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <ComponentLabPage
      title="Task Bar"
      description="Bottom action bar for app shells — Review Assigned chrome with optional leading context and end-aligned actions."
      examplesToolbar={
        <div className="flex flex-wrap items-end gap-6">
          <LabCheckbox
            label="Leading content"
            checked={showLeading}
            onCheckedChange={setShowLeading}
          />
        </div>
      }
      examples={
        <div className="space-y-10 pb-16">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            <div className={labComponentContainerClass}>
              <div className="flex flex-col gap-4 bg-[var(--screening-surface-muted)] p-4">
                <p className="m-0 min-h-24 text-sm text-[var(--screening-text-muted)]">
                  Main content sits above the task bar.
                  {lastAction ? (
                    <>
                      {' '}
                      Last action:{' '}
                      <strong className="text-[var(--screening-text-primary)]">{lastAction}</strong>
                    </>
                  ) : null}
                </p>
                <AceTaskBar
                  leading={
                    showLeading ? (
                      <>
                        <span className="whitespace-nowrap text-[13px] tabular-nums text-[var(--screening-text-secondary)]">
                          3 selected
                        </span>
                        <button
                          type="button"
                          className="rounded-[var(--radius-sm)] px-2 py-1.5 text-[13px] font-semibold text-[var(--screening-primary)] transition-colors hover:bg-[var(--screening-primary-soft-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]"
                          onClick={() => setLastAction('Deselect all')}
                        >
                          Deselect all
                        </button>
                      </>
                    ) : undefined
                  }
                >
                  <AceButton
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => setLastAction('Modal')}
                  >
                    Modal
                  </AceButton>
                  <AceButton
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => setLastAction('Inline Drawer')}
                  >
                    Inline Drawer
                  </AceButton>
                </AceTaskBar>
              </div>
            </div>
          </div>
        </div>
      }
      code={
        <ComponentLabCode>{`import { AceButton } from '../components/atoms/AceButton'
import { AceTaskBar } from '../components/molecules/AceTaskBar'

<AceTaskBar
  leading={
    <>
      <span>3 selected</span>
      <button type="button">Deselect all</button>
    </>
  }
>
  <AceButton variant="secondary" onClick={openModal}>Modal</AceButton>
  <AceButton variant="primary" onClick={openDrawer}>Inline Drawer</AceButton>
</AceTaskBar>`}</ComponentLabCode>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use under the main content column in app shells (e.g. Layouts / Review Assigned) for primary page
              actions. Keep selection context in <code className="text-[var(--screening-text-primary)]">leading</code>{' '}
              and primary / secondary actions as children.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Tokens</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <code className="text-[var(--screening-text-primary)]">--ace-task-bar-surface</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-task-bar-border</code>,{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-task-bar-shadow</code>
              </li>
            </ul>
          </section>
        </>
      }
    />
  )
}
