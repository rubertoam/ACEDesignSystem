import { LabOverviewList } from '../lib/labOverviewList'
import { ComponentLabPage } from './ComponentLabPage'
import { atomsLabCode, atomsLabUsage, overviewLabQa } from './labTabDocs'

export function AtomsLab() {
  return (
    <ComponentLabPage
      qa={overviewLabQa}
      title="Overview"
      description="Buttons, icons, inputs, and other indivisible UI primitives. Add nested routes in App.tsx when you need one lab page per atom."
      examples={
        <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
          <p className="m-0">Mount atom previews here (states, sizes, disabled, and so on).</p>
          <LabOverviewList section="Atoms" />
        </div>
      }
      code={atomsLabCode}
      usage={atomsLabUsage}
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            List every <code className="text-[var(--color-text-primary)]">variables.css</code> token referenced by
            this atom.
          </li>
        </ul>
      }
    />
  )
}
