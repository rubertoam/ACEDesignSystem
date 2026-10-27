import { LabOverviewList } from '../lib/labOverviewList'
import { ComponentLabPage } from './ComponentLabPage'

export function OrganismsLab() {
  return (
    <ComponentLabPage
      title="Organisms"
      description="Full patterns built from molecules and atoms - headers, sidebars, tables, and other product shells."
      examplesCanvas={false}
      examples={<LabOverviewList section="Organisms" />}
    />
  )
}
