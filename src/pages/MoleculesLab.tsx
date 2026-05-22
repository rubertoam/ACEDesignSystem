import { LabOverviewList } from '../lib/labOverviewList'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

export function MoleculesLab() {
  return (
    <ComponentLabPage
      title="Overview"
      description="Search forms, breadcrumbs, and other small compositions of atoms."
      examples={
        <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
          <p className="m-0">Compose atoms with clear layout; document edge cases in Usage.</p>
          <LabOverviewList section="Molecules" />
        </div>
      }
      code={
        <ComponentLabCode>{`import { YourMolecule } from '../components/molecules/YourMolecule'

<YourMolecule label="…" />`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Describe composition, required props, and when to use this molecule vs a smaller atom.
        </p>
      }
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
