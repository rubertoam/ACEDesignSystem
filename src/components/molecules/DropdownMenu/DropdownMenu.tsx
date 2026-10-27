import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { type ComponentType, type ReactNode } from 'react'
import {
  Button,
  type ButtonActionTone,
  type ButtonSize,
  type ButtonVariant,
} from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Toggle } from '../../atoms/Toggle/Toggle'
import { FilterTrigger } from '../Filtering/FilterTrigger'
import { MaterialSymbol } from '../Accordion/MaterialSymbol'
import {
  aceDropdownFieldChevronClass,
  aceDropdownFieldTriggerClass,
  AceDropdownChevron,
} from './dropdownFieldStyles'
import { highlightMenuLabel } from './menuEntryHighlight'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'

/** Keeps the dropdown open while interacting with non-item controls (search, checkbox, etc.). */
function preventMenuClose(e: { preventDefault: () => void }) {
  e.preventDefault()
}

export type { ButtonActionTone, ButtonSize, ButtonVariant }

export type DropdownMenuPanelWidth = 'default' | 'compact' | 'wide' | 'primary' | 'hug'

/** Entries allowed inside a submenu (no nested submenus). */
export type DropdownMenuSubItem =
  | { id?: string; type: 'label'; label: string }
  | { id?: string; type: 'separator' }
  | {
      id?: string
      type: 'item'
      label: string
      disabled?: boolean
      destructive?: boolean
      icon?: ComponentType<{ className?: string }>
      shortcut?: string
      selected?: boolean
      highlighted?: boolean
      /** When true, selecting the row does not close the menu (e.g. primary multi-select). */
      keepOpen?: boolean
      onSelect?: () => void
    }
  | {
      id?: string
      type: 'checkbox'
      label: string
      checked: boolean
      onCheckedChange: (checked: boolean) => void
      disabled?: boolean
      style?: 'menu' | 'assignment'
      matchHighlight?: string
      /**
       * Soft row fill - `true` / selected → bg/brand-hover; `hover` → bg/secondary (Search Results);
       * `warning` → `--ace-warning-50`.
       */
      emphasized?: boolean | 'warning' | 'hover'
    }
  | {
      id?: string
      type: 'radioGroup'
      value: string
      onValueChange: (value: string) => void
      options: { value: string; label: string; disabled?: boolean; imageUrl?: string }[]
    }

export type DropdownMenuEntry =
  | DropdownMenuSubItem
  | {
      id?: string
      type: 'sub'
      label: string
      disabled?: boolean
      items: DropdownMenuSubItem[]
    }
  | { id?: string; type: 'menuHeader'; label: string }
  | {
      id?: string
      type: 'sectionHeader'
      label: string
      action?: { label: string; onSelect?: () => void }
    }
  | { id?: string; type: 'footerAction'; label: string; onSelect?: () => void }
  | {
      id?: string
      type: 'search'
      value?: string
      placeholder?: string
      onChange?: (value: string) => void
      onClear?: () => void
    }
  | {
      id?: string
      type: 'toggle'
      label: string
      checked: boolean
      onCheckedChange: (checked: boolean) => void
      disabled?: boolean
    }

export type DropdownTriggerMode = 'field' | 'button' | 'filter'

export type DropdownMenuProps = {
  /**
   * Label for built-in triggers (`field` / `button` / `filter`).
   * Optional when `trigger` is provided.
   */
  triggerLabel?: string
  items: DropdownMenuEntry[]
  /** Field = screening toolbar style; button = Button; filter = FilterTrigger. */
  triggerMode?: DropdownTriggerMode
  variant?: ButtonVariant
  /** Button trigger only - maps to `--color-action-{tone}*`. */
  actionTone?: ButtonActionTone
  size?: ButtonSize
  /** Field trigger only: show caret. */
  showChevron?: boolean
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  disabled?: boolean
  /** Portal target so the panel inherits `data-theme` from an ancestor (lab preview). */
  portalContainer?: HTMLElement | null
  className?: string
  panelWidth?: DropdownMenuPanelWidth
  /** Custom trigger element (e.g. icon button). When set, built-in trigger modes are ignored. */
  trigger?: ReactNode
  /** Called when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void
}

export type DropdownMenuPanelProps = {
  items: DropdownMenuEntry[]
  className?: string
  /** Matches Figma MenuList widths: compact (three-dot), wide (multi-select / primary). */
  panelWidth?: DropdownMenuPanelWidth
  /** Lab / docs: render rows as static markup (no Radix item focus). */
  staticDisplay?: boolean
  'aria-label'?: string
}

/** Body/Regular · typography/body/body-main (14) - menu item + search field labels */
const itemType = cn(
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]',
)

const labelType = cn(
  'px-[var(--space-3)] py-[var(--space-2)]',
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[var(--color-text-muted)]',
)

const menuHeaderClass = cn(
  itemType,
  'px-[var(--space-3)] pb-[var(--space-2)] pt-[var(--space-3)] text-[var(--color-text-primary)]',
)

const sectionHeaderClass = cn(
  'uppercase text-[var(--color-text-primary)]',
  '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]',
)

/** Figma Select All / Deselect All - Footnote/Regular · colors/text/primary */
const sectionActionClass = cn(
  'text-[var(--dropdown-menu-action,var(--color-text-primary))] hover:underline',
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
)

/** Figma Reset / Reset All - Caption/Regular · colors/text/primary */
const footerActionClass = cn(
  'text-[var(--dropdown-menu-action,var(--color-text-primary))] hover:underline',
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
)

export const dropdownMenuPanelClass = cn(
  /* Above dialog overlay (z-200) so menus open on top of modals */
  'z-[300] overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--dropdown-menu-border)] bg-[var(--dropdown-menu-surface,var(--color-surface-primary,#ffffff))]',
  'shadow-[var(--dropdown-menu-shadow)]',
)

const panelWidthClass: Record<DropdownMenuPanelWidth, string> = {
  /** Secondary Switchers / Checkbox / Search - Figma 184px */
  default: 'w-[11.5rem] py-1',
  /** Icon / Three-dot - Figma 108px · py 8 */
  compact: 'w-[6.75rem] py-2',
  /** MultiSelect - Figma 264px · py 16 */
  wide: 'w-[16.5rem] py-4',
  /** Primary SingleSelect - Figma 264px · py 8 */
  primary: 'w-[16.5rem] py-2',
  /** Width follows menu content (toolbars, short labels). */
  hug: 'w-max min-w-0 py-1',
}

const itemClass = cn(
  itemType,
  'relative flex cursor-pointer select-none items-center text-[var(--color-text-primary)] outline-none',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  'data-[highlighted]:bg-[var(--dropdown-menu-row-hover)] data-[highlighted]:text-[var(--color-text-primary)]',
)

const primaryItemClass = cn(itemClass, 'group gap-0 px-0')

const paddedIndicatorItem = cn(itemClass, 'px-[var(--space-3)] py-[var(--space-2)] pl-8')

const assignmentCheckboxRow = cn(
  itemType,
  'group flex cursor-pointer select-none items-center gap-0 px-0 text-[var(--color-text-primary)]',
)

/** Brand pipe - Figma Menus hover / selected (colors/text/brand · 3px) */
function MenuRowPipe({ active }: { active?: boolean }) {
  return (
    <span
      className={cn(
        'w-[3px] shrink-0 self-stretch bg-transparent',
        active
          ? 'bg-[var(--dropdown-menu-primary)]'
          : 'group-data-[highlighted]:bg-[var(--dropdown-menu-primary)]',
      )}
      aria-hidden
    />
  )
}

const fieldSizeClass: Record<ButtonSize, string> = {
  sm: cn(
    'min-h-9 gap-[var(--space-2)] px-[var(--dropdown-menu-trigger-px)] py-[var(--dropdown-menu-trigger-py)]',
    '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  ),
  md: cn(
    'min-h-11 gap-[var(--space-2)] px-[var(--dropdown-menu-trigger-px)] py-[var(--dropdown-menu-trigger-py)]',
    '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  ),
  lg: cn(
    'min-h-13 gap-[var(--space-2)] px-[var(--dropdown-menu-trigger-px)] py-3',
    '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]',
  ),
}

const shortcutClass =
  'ml-auto shrink-0 pl-4 [font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)] text-[var(--color-text-muted)]'

function entryKey(entry: { id?: string; type: string }, i: number, extra?: string) {
  return entry.id ?? `${entry.type}-${i}-${extra ?? ''}`
}

function panelShellClass(panelWidth: DropdownMenuPanelWidth, className?: string) {
  return cn(dropdownMenuPanelClass, panelWidthClass[panelWidth], className)
}

function checkboxEmphasizedClass(emphasized?: boolean | 'warning' | 'hover') {
  if (emphasized === 'warning') return 'bg-[var(--ace-warning-50)]'
  if (emphasized === 'hover') return 'bg-[var(--dropdown-menu-row-hover)]'
  if (emphasized) return 'bg-[var(--dropdown-menu-row-selected)]'
  return null
}

function MenuCheckboxRow({
  checked,
  disabled,
  label,
  emphasized,
  matchHighlight,
  withPipe,
  onCheckedChange,
}: {
  checked: boolean
  disabled?: boolean
  label: string
  emphasized?: boolean | 'warning' | 'hover'
  matchHighlight?: string
  /** Primary MultiSelect - brand pipe on hover / selected (Figma 5318:1634) */
  withPipe?: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  const isSelected = emphasized === true
  return (
    <DropdownMenuPrimitive.Item
      disabled={disabled}
      aria-label={label}
      className={cn(
        assignmentCheckboxRow,
        'w-full outline-none',
        checkboxEmphasizedClass(emphasized),
        isSelected
          ? 'bg-[var(--dropdown-menu-row-selected)]'
          : 'data-[highlighted]:bg-[var(--dropdown-menu-row-hover)]',
      )}
      onSelect={(e) => {
        preventMenuClose(e)
        if (!disabled) onCheckedChange(!checked)
      }}
    >
      {withPipe ? <MenuRowPipe active={isSelected} /> : null}
      <span className={cn('flex min-w-0 flex-1 items-center gap-2', withPipe ? 'gap-3 p-2' : 'px-3 py-1')}>
        <Checkbox size="sm" checked={checked} disabled={disabled} tabIndex={-1} className="pointer-events-none" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-left">
          {matchHighlight ? highlightMenuLabel(label, matchHighlight) : label}
        </span>
      </span>
    </DropdownMenuPrimitive.Item>
  )
}

function MenuToggleRow({
  label,
  checked,
  disabled,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <DropdownMenuPrimitive.Item
      disabled={disabled}
      aria-label={label}
      className={cn(
        assignmentCheckboxRow,
        'w-full outline-none data-[highlighted]:bg-[var(--dropdown-menu-row-hover)]',
      )}
      onSelect={(e) => {
        preventMenuClose(e)
        if (!disabled) onCheckedChange(!checked)
      }}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2 px-3 py-1">
        <Toggle size="sm" checked={checked} disabled={disabled} tabIndex={-1} className="pointer-events-none" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
      </span>
    </DropdownMenuPrimitive.Item>
  )
}

function PrimaryMenuItem({
  entry,
  staticDisplay,
  compact,
}: {
  entry: Extract<DropdownMenuSubItem, { type: 'item' }>
  staticDisplay?: boolean
  compact?: boolean
}) {
  const isSelected = entry.highlighted || entry.selected
  const Icon = entry.icon
  const rowClass = cn(
    primaryItemClass,
    isSelected
      ? 'bg-[var(--dropdown-menu-row-selected)]'
      : 'data-[highlighted]:bg-[var(--dropdown-menu-row-hover)]',
    entry.destructive && 'text-[var(--dropdown-menu-danger)]',
    entry.disabled && 'pointer-events-none opacity-50',
  )
  const body = (
    <>
      <MenuRowPipe active={isSelected} />
      <span
        className={cn(
          'flex min-w-0 flex-1 items-center gap-[var(--space-2)]',
          compact ? 'px-3 py-1' : 'p-2',
          (entry.shortcut || Icon) && 'justify-between gap-[var(--space-3)]',
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-[var(--space-2)]">
          {Icon ? <Icon className="size-4 shrink-0 text-[var(--dropdown-menu-icon)]" aria-hidden /> : null}
          <span className="min-w-0 truncate">{entry.label}</span>
        </span>
        {entry.shortcut ? <span className={shortcutClass}>{entry.shortcut}</span> : null}
      </span>
    </>
  )

  if (staticDisplay) {
    return <div role="menuitem" className={rowClass}>{body}</div>
  }

  return (
    <DropdownMenuPrimitive.Item
      disabled={entry.disabled}
      className={rowClass}
      onSelect={(e) => {
        if (entry.keepOpen) preventMenuClose(e)
        entry.onSelect?.()
      }}
    >
      {body}
    </DropdownMenuPrimitive.Item>
  )
}

function MenuEntries({
  entries,
  portalContainer,
  staticDisplay,
  panelWidth = 'default',
}: {
  entries: DropdownMenuEntry[]
  portalContainer?: HTMLElement | null
  staticDisplay?: boolean
  panelWidth?: DropdownMenuPanelWidth
}) {
  const compact = panelWidth === 'compact'

  return entries.map((entry, i) => {
    if (entry.type === 'separator') {
      const sep = <div className="my-1 h-px bg-[var(--dropdown-menu-border)]" />
      return staticDisplay ? (
        <div key={entryKey(entry, i)} role="separator">
          {sep}
        </div>
      ) : (
        <DropdownMenuPrimitive.Separator key={entryKey(entry, i)} className="my-1 h-px bg-[var(--dropdown-menu-border)]" />
      )
    }

    if (entry.type === 'menuHeader') {
      return (
        <p key={entryKey(entry, i)} className={menuHeaderClass}>
          {entry.label}
        </p>
      )
    }

    if (entry.type === 'sectionHeader') {
      const action = entry.action ? (
        staticDisplay ? (
          <button
            type="button"
            className={cn(sectionActionClass, 'cursor-pointer border-0 bg-transparent p-0')}
            onClick={() => entry.action?.onSelect?.()}
          >
            {entry.action.label}
          </button>
        ) : (
          <DropdownMenuPrimitive.Item
            className={cn(sectionActionClass, 'cursor-pointer outline-none')}
            onSelect={(e) => {
              preventMenuClose(e)
              entry.action?.onSelect?.()
            }}
          >
            {entry.action.label}
          </DropdownMenuPrimitive.Item>
        )
      ) : null
      return (
        <div
          key={entryKey(entry, i)}
          className="flex items-center justify-between px-2.5 pb-1 pt-2"
        >
          <span className={sectionHeaderClass}>{entry.label}</span>
          {action}
        </div>
      )
    }

    if (entry.type === 'footerAction') {
      return staticDisplay ? (
        <div key={entryKey(entry, i)} className="flex justify-end px-[var(--space-3)] py-2">
          <button type="button" className={footerActionClass} onClick={() => entry.onSelect?.()}>
            {entry.label}
          </button>
        </div>
      ) : (
        <DropdownMenuPrimitive.Item
          key={entryKey(entry, i)}
          className={cn(footerActionClass, 'flex cursor-pointer justify-end px-[var(--space-3)] py-2 outline-none')}
          onSelect={(e) => {
            preventMenuClose(e)
            entry.onSelect?.()
          }}
        >
          {entry.label}
        </DropdownMenuPrimitive.Item>
      )
    }

    if (entry.type === 'search') {
      return (
        <div
          key={entryKey(entry, i)}
          className="flex items-center justify-between gap-2 px-[var(--space-3)] py-2"
          onPointerDown={preventMenuClose}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            inputMode="search"
            enterKeyHint="search"
            role="searchbox"
            aria-label={entry.placeholder ?? 'Search'}
            value={entry.value ?? ''}
            placeholder={entry.placeholder ?? 'Search'}
            onChange={(e) => entry.onChange?.(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn(
              itemType,
              'min-w-0 flex-1 border-0 bg-transparent p-0 text-[var(--dropdown-menu-text)] outline-none placeholder:text-[var(--dropdown-menu-search-placeholder)]',
            )}
          />
          {entry.value ? (
            <button
              type="button"
              aria-label="Clear search"
              className="inline-flex size-3 shrink-0 items-center justify-center text-[var(--dropdown-menu-icon)]"
              onPointerDown={preventMenuClose}
              onClick={() => entry.onClear?.()}
            >
              <MaterialSymbol name="close" size="sm" className="text-[var(--dropdown-menu-icon)]" />
            </button>
          ) : (
            <MaterialSymbol name="search" size="sm" className="shrink-0 text-[var(--dropdown-menu-icon)]" />
          )}
        </div>
      )
    }

    if (entry.type === 'toggle') {
      if (staticDisplay) {
        return (
          <label
            key={entryKey(entry, i)}
            className={cn(assignmentCheckboxRow, entry.disabled && 'cursor-not-allowed opacity-50')}
          >
            <span className="flex min-w-0 flex-1 items-center gap-2 px-3 py-1">
              <Toggle size="sm" checked={entry.checked} disabled={entry.disabled} onCheckedChange={entry.onCheckedChange} />
              <span className="min-w-0 truncate">{entry.label}</span>
            </span>
          </label>
        )
      }
      return (
        <MenuToggleRow
          key={entryKey(entry, i)}
          label={entry.label}
          checked={entry.checked}
          disabled={entry.disabled}
          onCheckedChange={entry.onCheckedChange}
        />
      )
    }

    if (entry.type === 'label') {
      return staticDisplay ? (
        <p key={entryKey(entry, i)} className={labelType}>
          {entry.label}
        </p>
      ) : (
        <DropdownMenuPrimitive.Label key={entryKey(entry, i)} className={labelType}>
          {entry.label}
        </DropdownMenuPrimitive.Label>
      )
    }

    if (entry.type === 'radioGroup') {
      if (staticDisplay) {
        return (
          <div key={entryKey(entry, i)} role="radiogroup" className="flex flex-col">
            {entry.options.map((opt) => {
              const selected = opt.value === entry.value
              return (
                <div
                  key={opt.value}
                  role="radio"
                  aria-checked={selected}
                  aria-disabled={opt.disabled || undefined}
                  className={cn(
                    paddedIndicatorItem,
                    opt.imageUrl && 'gap-[var(--space-2)] pl-9',
                    opt.disabled && 'pointer-events-none opacity-50',
                    selected && 'bg-[var(--dropdown-menu-row-selected)]',
                  )}
                >
                  <span className="absolute left-2 top-1/2 size-4 -translate-y-1/2" aria-hidden>
                    {selected ? (
                      <span className="absolute left-1/2 top-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--dropdown-menu-primary)]" />
                    ) : null}
                  </span>
                  {opt.imageUrl ? (
                    <img
                      src={opt.imageUrl}
                      alt=""
                      className="size-8 shrink-0 rounded-full object-cover"
                    />
                  ) : null}
                  <span
                    className={
                      panelWidth === 'hug' ? 'whitespace-nowrap' : 'min-w-0 truncate'
                    }
                  >
                    {opt.label}
                  </span>
                </div>
              )
            })}
          </div>
        )
      }
      return (
        <DropdownMenuPrimitive.RadioGroup
          key={entryKey(entry, i)}
          value={entry.value}
          onValueChange={entry.onValueChange}
          className="flex flex-col"
        >
          {entry.options.map((opt) => (
            <DropdownMenuPrimitive.RadioItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className={cn(
                paddedIndicatorItem,
                opt.imageUrl && 'gap-[var(--space-2)] pl-9',
              )}
            >
              <span className="absolute left-2 top-1/2 size-4 -translate-y-1/2">
                <DropdownMenuPrimitive.ItemIndicator className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="block size-2 rounded-full bg-[var(--dropdown-menu-primary)]" />
                </DropdownMenuPrimitive.ItemIndicator>
              </span>
              {opt.imageUrl ? (
                <img
                  src={opt.imageUrl}
                  alt=""
                  className="size-8 shrink-0 rounded-full object-cover"
                />
              ) : null}
              <span
                className={
                  panelWidth === 'hug' ? 'whitespace-nowrap' : 'min-w-0 truncate'
                }
              >
                {opt.label}
              </span>
            </DropdownMenuPrimitive.RadioItem>
          ))}
        </DropdownMenuPrimitive.RadioGroup>
      )
    }

    if (entry.type === 'checkbox') {
      const withPipe = panelWidth === 'wide'
      const isSelected = entry.emphasized === true
      if (staticDisplay) {
        return (
          <label
            key={entryKey(entry, i, entry.label)}
            className={cn(
              assignmentCheckboxRow,
              checkboxEmphasizedClass(entry.emphasized),
              isSelected && 'bg-[var(--dropdown-menu-row-selected)]',
              entry.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            {withPipe ? <MenuRowPipe active={isSelected} /> : null}
            <span className={cn('flex min-w-0 flex-1 items-center gap-2', withPipe ? 'gap-3 p-2' : 'px-3 py-1')}>
              <Checkbox
                size="sm"
                checked={entry.checked}
                disabled={entry.disabled}
                onCheckedChange={entry.onCheckedChange}
              />
              <span className="min-w-0 truncate">
                {entry.matchHighlight
                  ? highlightMenuLabel(entry.label, entry.matchHighlight)
                  : entry.label}
              </span>
            </span>
          </label>
        )
      }
      return (
        <MenuCheckboxRow
          key={entryKey(entry, i, entry.label)}
          checked={entry.checked}
          disabled={entry.disabled}
          label={entry.label}
          emphasized={entry.emphasized}
          matchHighlight={entry.matchHighlight}
          withPipe={withPipe}
          onCheckedChange={entry.onCheckedChange}
        />
      )
    }

    if (entry.type === 'sub') {
      if (staticDisplay) {
        return (
          <div key={entryKey(entry, i)} className="flex flex-col">
            <div
              className={cn(
                itemClass,
                'justify-between gap-[var(--space-2)] px-[var(--space-3)] py-[var(--space-2)] pr-[var(--space-2)]',
                entry.disabled && 'pointer-events-none opacity-50',
              )}
            >
              <span className="min-w-0 truncate">{entry.label}</span>
              <MaterialSymbol name="keyboard_arrow_right" size="md" className={cn(aceChevronIconClass, 'opacity-70')} />
            </div>
            <div className="ml-2 border-l border-[var(--dropdown-menu-border)] pl-1">
              <MenuEntries
                entries={entry.items}
                portalContainer={portalContainer}
                staticDisplay
                panelWidth={panelWidth}
              />
            </div>
          </div>
        )
      }
      return (
        <DropdownMenuPrimitive.Sub key={entryKey(entry, i)}>
          <DropdownMenuPrimitive.SubTrigger
            disabled={entry.disabled}
            className={cn(itemClass, 'justify-between gap-[var(--space-2)] px-[var(--space-3)] py-[var(--space-2)] pr-[var(--space-2)]')}
          >
            <span className="min-w-0 truncate">{entry.label}</span>
            <MaterialSymbol name="keyboard_arrow_right" size="md" className={cn(aceChevronIconClass, 'opacity-70')} />
          </DropdownMenuPrimitive.SubTrigger>
          <DropdownMenuPrimitive.Portal container={portalContainer ?? undefined}>
            <DropdownMenuPrimitive.SubContent
              sideOffset={4}
              alignOffset={-4}
              className={panelShellClass('default')}
              collisionPadding={8}
            >
              <MenuEntries entries={entry.items} portalContainer={portalContainer} panelWidth={panelWidth} />
            </DropdownMenuPrimitive.SubContent>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Sub>
      )
    }

    return (
      <PrimaryMenuItem
        key={entryKey(entry, i, entry.label)}
        entry={entry}
        staticDisplay={staticDisplay}
        compact={compact}
      />
    )
  })
}

export function DropdownMenuPanel({
  items,
  className,
  panelWidth = 'default',
  staticDisplay = true,
  'aria-label': ariaLabel = 'Menu',
}: DropdownMenuPanelProps) {
  return (
    <div role="menu" aria-label={ariaLabel} className={panelShellClass(panelWidth, className)}>
      <MenuEntries entries={items} staticDisplay={staticDisplay} panelWidth={panelWidth} />
    </div>
  )
}

export function DropdownMenu({
  triggerLabel = '',
  items,
  triggerMode = 'field',
  variant = 'secondary',
  actionTone = 'primary',
  size = 'md',
  showChevron = true,
  align = 'start',
  sideOffset = 4,
  disabled,
  portalContainer,
  className,
  panelWidth = 'default',
  trigger,
  onOpenChange,
}: DropdownMenuProps) {
  const triggerChild =
    trigger != null ? (
      trigger
    ) : triggerMode === 'button' ? (
      <Button
        type="button"
        variant={variant}
        actionTone={actionTone}
        size={size}
        icon="right"
        disabled={disabled}
        className={cn(
          'w-[var(--dropdown-menu-trigger-width)] max-w-[var(--dropdown-menu-trigger-width)] shrink-0 justify-between',
          '[&>span:first-of-type]:min-w-0 [&>span:first-of-type]:flex-1 [&>span:first-of-type]:truncate [&>span:first-of-type]:text-left',
          'data-[state=open]:ring-2 data-[state=open]:ring-[var(--button-focus-ring)] data-[state=open]:ring-offset-2 data-[state=open]:ring-offset-[var(--color-surface)]',
          className,
        )}
      >
        {triggerLabel}
      </Button>
    ) : triggerMode === 'filter' ? (
      <FilterTrigger label={triggerLabel} showChevron={showChevron} disabled={disabled} className={className} />
    ) : (
      <button
        type="button"
        disabled={disabled}
        className={cn(aceDropdownFieldTriggerClass, fieldSizeClass[size], 'justify-between', className)}
      >
        <span
          className={
            panelWidth === 'hug'
              ? 'whitespace-nowrap text-left'
              : 'min-w-0 flex-1 truncate text-left'
          }
        >
          {triggerLabel}
        </span>
        {showChevron ? <AceDropdownChevron className={cn('ml-auto', aceDropdownFieldChevronClass)} /> : null}
      </button>
    )

  return (
    <DropdownMenuPrimitive.Root modal={false} onOpenChange={onOpenChange}>
      <DropdownMenuPrimitive.Trigger asChild disabled={disabled}>
        {triggerChild}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal container={portalContainer ?? undefined}>
        <DropdownMenuPrimitive.Content
          className={panelShellClass(panelWidth)}
          sideOffset={sideOffset}
          align={align}
          collisionPadding={8}
        >
          <MenuEntries entries={items} portalContainer={portalContainer} panelWidth={panelWidth} />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
