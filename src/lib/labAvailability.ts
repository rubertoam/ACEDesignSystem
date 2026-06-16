/** Product availability for ACE lab components (in-app usage status). */
export type LabAvailabilityStatus = 'available' | 'in-progress' | 'planned'

export const LAB_AVAILABILITY_LABELS: Record<LabAvailabilityStatus, string> = {
  available: 'Available',
  'in-progress': 'In Progress',
  planned: 'Planned',
}

/** Canonical status by lab route (component pages only). */
export const LAB_AVAILABILITY_BY_PATH: Record<string, LabAvailabilityStatus> = {
  '/lab/atoms/finscan-logo': 'available',
  '/lab/atoms/colors': 'available',
  '/lab/atoms/typography': 'available',
  '/lab/atoms/animations': 'in-progress',
  '/lab/atoms/drop-shadows': 'available',
  '/lab/atoms/buttons': 'available',
  '/lab/atoms/inputs': 'in-progress',
  '/lab/atoms/checkboxes': 'available',
  '/lab/atoms/toggles': 'available',
  '/lab/atoms/radios': 'available',
  '/lab/atoms/badges': 'available',
  '/lab/molecules/tabs': 'available',
  '/lab/molecules/dropdowns': 'in-progress',
  '/lab/molecules/accordions': 'in-progress',
  '/lab/molecules/pagination': 'planned',
  '/lab/molecules/sliders': 'in-progress',
  '/lab/molecules/toast-messages': 'available',
  '/lab/organisms/dialog-modal': 'available',
  '/lab/organisms/data-table': 'planned',
  '/lab/organisms/date-time-pickers': 'in-progress',
  '/lab/organisms/sidebar': 'planned',
  '/lab/organisms/site-header': 'available',
  '/lab/organisms/cards': 'available',
  '/lab/organisms/timeline': 'available',
  '/lab/organisms/attachments': 'available',
}

export function getLabAvailability(pathname: string): LabAvailabilityStatus | undefined {
  const entries = Object.entries(LAB_AVAILABILITY_BY_PATH).sort((a, b) => b[0].length - a[0].length)
  const match = entries.find(([path]) => pathname === path || pathname.startsWith(`${path}/`))
  return match?.[1]
}
