import { LabOverviewList } from '../lib/labOverviewList'
import { ComponentLabPage } from './ComponentLabPage'
import { moleculesLabCode, moleculesLabUsage, overviewLabQa } from './labTabDocs'

export function MoleculesLab() {
  return (
    <ComponentLabPage
      qa={overviewLabQa}
      title="Overview"
      description="Search forms, breadcrumbs, and other small compositions of atoms."
      examples={
        <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
          <p className="m-0">Compose atoms with clear layout; document edge cases in Usage.</p>
          <LabOverviewList section="Molecules" />
        </div>
      }
      code={moleculesLabCode}
      usage={moleculesLabUsage}
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            List every <code className="text-[var(--color-text-primary)]">variables.css</code> token referenced by
            this molecule (including tokens passed through to children).
          </li>
        </ul>
      }
    />
  )
}
