import { LabOverviewList } from '../lib/labOverviewList'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

export function AtomsLab() {
  return (
    <ComponentLabPage
      title="Overview"
      description="Buttons, icons, inputs, and other indivisible UI primitives. Add nested routes in App.tsx when you need one lab page per atom."
      examples={
        <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
          <p className="m-0">Mount atom previews here (states, sizes, disabled, and so on).</p>
          <LabOverviewList section="Atoms" />
        </div>
      }
      code={
        <ComponentLabCode>{`import { YourAtom } from '../components/atoms/YourAtom'

<YourAtom />`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Document props, variants, and accessibility expectations for each atom.
        </p>
      }
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
