import type { AceDropdownMenuEntry } from '../AceDropdownMenu/AceDropdownMenu'

export const FILTER_VIEW_MODES = [
  { value: 'client', label: 'Client Centric' },
  { value: 'compliance', label: 'Compliance Centric' },
] as const

export type FilterViewMode = (typeof FILTER_VIEW_MODES)[number]['value']

/** Primary menu list width — purple pipe + row fill (see Dropdowns → Primary). */
export const FILTER_VIEW_MODE_PANEL_WIDTH = 'wide' as const

export function filterViewModeLabel(mode: FilterViewMode): string {
  return FILTER_VIEW_MODES.find((m) => m.value === mode)?.label ?? 'Client Centric'
}

/** Primary Menu List entries for Client / Compliance Centric. */
export function filterViewModeMenuItems(
  value: FilterViewMode,
  onChange: (value: FilterViewMode) => void,
): AceDropdownMenuEntry[] {
  return FILTER_VIEW_MODES.map((mode) => ({
    type: 'item' as const,
    id: mode.value,
    label: mode.label,
    selected: mode.value === value,
    onSelect: () => onChange(mode.value),
  }))
}
