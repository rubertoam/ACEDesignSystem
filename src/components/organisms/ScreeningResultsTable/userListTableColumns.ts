export type UserListColumnKey =
  | 'displayName'
  | 'userName'
  | 'status'
  | 'lastLogin'
  | 'groupCount'
  | 'applicationCount'
  | 'actions'

export const USER_LIST_COLUMN_DEFINITIONS: ReadonlyArray<{
  key: UserListColumnKey
  label: string
  sortable?: boolean
}> = [
  { key: 'displayName', label: 'Display Name', sortable: true },
  { key: 'userName', label: 'User Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastLogin', label: 'Last Login', sortable: true },
  { key: 'groupCount', label: 'Count of Groups', sortable: true },
  { key: 'applicationCount', label: 'Count of Applications', sortable: true },
  { key: 'actions', label: '', sortable: false },
]

export const DEFAULT_USER_LIST_COLUMN_ORDER: UserListColumnKey[] = USER_LIST_COLUMN_DEFINITIONS.map(
  (column) => column.key,
)
