import { useState } from 'react'
import { Button } from '../components/atoms/Button'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { aceToggleLabelClass } from '../components/atoms/Toggle/toggleFieldStyles'
import { TaskBar } from '../components/molecules/TaskBar'
import { LabControlField } from '../lib/labControls'
import { ComponentLabPage } from './ComponentLabPage'
import { taskBarLabCode, taskBarLabQa, taskBarLabUsage } from './labTabDocs'

export function TaskBarLab() {
  const [showLeading, setShowLeading] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const toolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <LabControlField label="Leading content" className="shrink-0">
          <div className="flex min-h-9 items-center gap-2">
            <Toggle
              size="sm"
              checked={showLeading}
              onCheckedChange={setShowLeading}
              aria-label="Leading content"
            />
            <span className={aceToggleLabelClass}>{showLeading ? 'On' : 'Off'}</span>
          </div>
        </LabControlField>
      </div>

      <div className="border-t border-solid border-[var(--screening-border-soft)] pt-6">
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
            <Button type="button" variant="secondary" size="md" onClick={() => setLastAction('Modal')}>
              Modal
            </Button>
            <Button type="button" variant="primary" size="md" onClick={() => setLastAction('Inline Drawer')}>
              Inline Drawer
            </Button>
          </TaskBar>
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={taskBarLabQa}
      title="Task Bar"
      description="Bottom action bar for app shells - Review Assigned chrome with optional leading context and end-aligned actions."
      examplesToolbar={toolbar}
      code={taskBarLabCode}
      usage={taskBarLabUsage}
    />
  )
}
