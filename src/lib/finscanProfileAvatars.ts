/** Profile photos from Figma Site Header Actions (3127:35) */
export type FinScanProfileId = 'none' | 'janet' | 'laura' | 'carol' | 'lee' | 'sam' | 'no-image'

export type FinScanProfileAvatar = {
  id: FinScanProfileId
  /** Label in the profile picker dropdown */
  label: string
  /** Shown in the site header greeting: "Hi, {greetingName}" */
  greetingName: string
  /** Initials when no profile image is shown */
  initials: string
  /** Public URL under /brand/profiles; undefined for initials-only */
  imageUrl?: string
}

export const FINSCAN_PROFILE_AVATARS: FinScanProfileAvatar[] = [
  { id: 'none', label: 'Hidden (initials)', greetingName: 'User Name', initials: 'UN' },
  { id: 'janet', label: 'Janet', greetingName: 'Janet', initials: 'JA', imageUrl: '/brand/profiles/janet.png' },
  { id: 'laura', label: 'Laura', greetingName: 'Laura', initials: 'LA', imageUrl: '/brand/profiles/laura.png' },
  { id: 'carol', label: 'Carol', greetingName: 'Carol', initials: 'CA', imageUrl: '/brand/profiles/carol.png' },
  { id: 'lee', label: 'Lee', greetingName: 'Lee', initials: 'LE', imageUrl: '/brand/profiles/lee.png' },
  { id: 'sam', label: 'Sam', greetingName: 'Sam', initials: 'SA', imageUrl: '/brand/profiles/sam.png' },
  {
    id: 'no-image',
    label: 'User Name',
    greetingName: 'User Name',
    initials: 'UN',
    imageUrl: '/brand/profiles/no-image.png',
  },
]

export function getFinScanProfileAvatar(id: FinScanProfileId): FinScanProfileAvatar {
  return FINSCAN_PROFILE_AVATARS.find((p) => p.id === id) ?? FINSCAN_PROFILE_AVATARS[0]
}
