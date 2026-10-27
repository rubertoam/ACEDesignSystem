import { LabOverviewList } from '../lib/labOverviewList'
import { ComponentLabPage } from './ComponentLabPage'

export function AtomsLab() {
  return (
    <ComponentLabPage
      title="Atoms"
      description="Indivisible UI primitives - colors, type, icons, controls, and other building blocks."
      examplesCanvas={false}
      examples={<LabOverviewList section="Atoms" />}
    />
  )
}
