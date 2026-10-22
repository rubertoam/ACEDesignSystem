import { useMemo } from 'react'
import { DropdownMenu, type DropdownMenuEntry } from '../../molecules/DropdownMenu/DropdownMenu'
import { MaterialSymbol } from '../../molecules/Accordion/MaterialSymbol'
import {
  screeningRowActionsMenuIconClass,
  screeningRowActionsMenuTriggerClass,
} from './screeningTableToolbar'

const ROW_ACTION_LABELS = ['Screening History', 'Documents', 'Match Simulator'] as const

export function ScreeningRowActionsMenu({
  rowName,
  portalContainer,
}: {
  rowName: string
  portalContainer?: HTMLElement | null
}) {
  const items = useMemo<DropdownMenuEntry[]>(
    () =>
      ROW_ACTION_LABELS.map((label) => ({
        type: 'item' as const,
        label,
      })),
    [],
  )

  return (
    <DropdownMenu
      items={items}
      align="end"
      panelWidth="hug"
      portalContainer={portalContainer}
      trigger={
        <button
          type="button"
          aria-label={`Actions for ${rowName}`}
          onClick={(event) => event.stopPropagation()}
          className={screeningRowActionsMenuTriggerClass}
        >
          <MaterialSymbol name="more_horiz" size="md" weight={300} className={screeningRowActionsMenuIconClass} />
        </button>
      }
    />
  )
}
