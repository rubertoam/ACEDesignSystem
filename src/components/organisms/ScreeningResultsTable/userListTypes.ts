export type UserListStatus = 'Active' | 'Inactive'

export type UserListRow = {
  id: string
  displayName: string
  userName: string
  status: UserListStatus
  lastLogin: string
  groupCount: number
  applicationCount: number
}

const SEED_ROWS: Omit<UserListRow, 'id'>[] = [
  { displayName: 'antonio', userName: 'antonio', status: 'Active', lastLogin: '10 Jul 2026', groupCount: 2, applicationCount: 16 },
  { displayName: 'bgm', userName: 'bgm', status: 'Active', lastLogin: '10 Jul 2026', groupCount: 2, applicationCount: 16 },
  { displayName: 'Brian Markham 2', userName: 'bgm2', status: 'Active', lastLogin: '08 Jul 2026', groupCount: 3, applicationCount: 16 },
  { displayName: 'bjkv', userName: 'bjkv', status: 'Active', lastLogin: '02 Jul 2026', groupCount: 2, applicationCount: 16 },
  { displayName: 'djg', userName: 'djg', status: 'Active', lastLogin: '10 Jul 2026', groupCount: 2, applicationCount: 16 },
  { displayName: 'djgoa', userName: 'djgoa', status: 'Active', lastLogin: '07 Jul 2026', groupCount: 1, applicationCount: 16 },
  { displayName: 'djgrpt', userName: 'djgrpt', status: 'Active', lastLogin: '23 Jun 2026', groupCount: 1, applicationCount: 2 },
  { displayName: 'dsi', userName: 'dsi', status: 'Active', lastLogin: '09 Jul 2026', groupCount: 2, applicationCount: 16 },
  { displayName: 'dsi2', userName: 'dsi2', status: 'Active', lastLogin: '09 Jul 2026', groupCount: 2, applicationCount: 16 },
  { displayName: 'es', userName: 'es', status: 'Active', lastLogin: '10 Jul 2026', groupCount: 2, applicationCount: 16 },
]

const PAD_NAMES = [
  'frank',
  'grace',
  'helen',
  'ivan',
  'julia',
  'kevin',
  'lisa',
  'marco',
  'nina',
  'omar',
  'paula',
  'quentin',
  'rita',
  'sam',
  'tina',
  'uma',
  'victor',
  'wanda',
  'xavier',
  'yara',
  'zane',
  'alex',
  'blake',
  'casey',
  'drew',
  'eden',
  'finn',
  'gale',
  'harper',
  'indigo',
  'jordan',
  'kai',
] as const

const PAD_LOGINS = [
  '10 Jul 2026',
  '09 Jul 2026',
  '08 Jul 2026',
  '07 Jul 2026',
  '05 Jul 2026',
  '01 Jul 2026',
  '28 Jun 2026',
  '23 Jun 2026',
] as const

/** 42 rows — matches User List pagination mock (1–10 of 42). */
export const MOCK_USER_LIST_ROWS: UserListRow[] = (() => {
  const rows: UserListRow[] = SEED_ROWS.map((row, index) => ({
    ...row,
    id: `user-${index + 1}`,
  }))
  for (let i = 0; i < 32; i++) {
    const name = PAD_NAMES[i % PAD_NAMES.length]
    const suffix = i >= PAD_NAMES.length ? String(Math.floor(i / PAD_NAMES.length) + 1) : ''
    const userName = `${name}${suffix}`
    rows.push({
      id: `user-${rows.length + 1}`,
      displayName: userName,
      userName,
      status: i % 11 === 0 ? 'Inactive' : 'Active',
      lastLogin: PAD_LOGINS[i % PAD_LOGINS.length],
      groupCount: (i % 4) + 1,
      applicationCount: i % 7 === 0 ? 2 : 16,
    })
  }
  return rows
})()
