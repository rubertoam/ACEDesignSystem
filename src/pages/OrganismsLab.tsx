import { LabOverviewList } from '../lib/labOverviewList'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

export function OrganismsLab() {
  return (
    <ComponentLabPage
      title="Overview"
      description="Nav bars, sidebars, headers, and other full patterns built from molecules and atoms."
      examples={
        <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
          <p className="m-0">
            Show full organism layout; pair with <code className="text-[var(--color-text-primary)]">get_screenshot</code>{' '}
            parity checks.
          </p>
          <LabOverviewList section="Organisms" />
        </div>
      }
      code={
        <ComponentLabCode>{`import { YourOrganism } from '../components/organisms/YourOrganism'

<YourOrganism />`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Describe layout regions, data dependencies, and responsive behavior.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            List organism-level tokens and which child components supply nested tokens.
          </li>
        </ul>
      }
    />
  )
}
