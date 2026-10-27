import { LabOverviewList } from '../lib/labOverviewList'
import { ComponentLabPage } from './ComponentLabPage'

export function MoleculesLab() {
  return (
    <ComponentLabPage
      title="Molecules"
      description="Small compositions of atoms - inputs, menus, messages, and other mid-level patterns."
      examplesCanvas={false}
      examples={<LabOverviewList section="Molecules" />}
    />
  )
}
