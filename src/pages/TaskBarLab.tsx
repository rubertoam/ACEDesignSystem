import { useState } from 'react'
import { Button } from '../components/atoms/Button'
import { TaskBar } from '../components/molecules/TaskBar'
import { labComponentContainerClass } from '../lib/labChrome'
import { LabCheckbox } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabPage } from './ComponentLabPage'
import { taskBarLabCode, taskBarLabQa, taskBarLabUsage } from './labTabDocs'
export function TaskBarLab() {
  const [showLeading, setShowLeading] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <ComponentLabPage
      qa={taskBarLabQa}
      title="Task Bar"
      description="Bottom action bar for app shells - Review Assigned chrome with optional leading context and end-aligned actions."
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
                <TaskBar
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
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => setLastAction('Modal')}
                  >
                    Modal
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => setLastAction('Inline Drawer')}
                  >
                    Inline Drawer
                  </Button>
                </TaskBar>
              </div>
            </div>
          </div>
        </div>
      }
      code={taskBarLabCode}
      usage={taskBarLabUsage}
    />
  )
}
