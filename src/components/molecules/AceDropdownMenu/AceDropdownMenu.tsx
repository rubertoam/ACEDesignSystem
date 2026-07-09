import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, ChevronRight, Search, X, type LucideIcon } from 'lucide-react'
import { AceButton, type AceButtonPalette, type AceButtonSize, type AceButtonVariant } from '../../atoms/AceButton'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Toggle } from '../../atoms/Toggle/Toggle'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import { highlightMenuLabel } from './menuEntryHighlight'

/** Keeps the dropdown open while interacting with non-item controls (search, checkbox, etc.). */
function preventMenuClose(e: { preventDefault: () => void }) {
  e.preventDefault()
}

export type { AceButtonPalette, AceButtonSize, AceButtonVariant }

export type AceDropdownMenuPanelWidth = 'default' | 'compact' | 'wide'

/** Entries allowed inside a submenu (no nested submenus). */
export type AceDropdownMenuSubItem =
  | { id?: string; type: 'label'; label: string }
  | { id?: string; type: 'separator' }
  | {
      id?: string
      type: 'item'
      label: string
      disabled?: boolean
      destructive?: boolean
      icon?: LucideIcon
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
      emphasized?: boolean
    }
  | {
      id?: string
      type: 'radioGroup'
      value: string
      onValueChange: (value: string) => void
      options: { value: string; label: string; disabled?: boolean; imageUrl?: string }[]
    }

export type AceDropdownMenuEntry =
  | AceDropdownMenuSubItem
  | {
      id?: string
      type: 'sub'
      label: string
      disabled?: boolean
      items: AceDropdownMenuSubItem[]
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

export type AceDropdownTriggerMode = 'field' | 'aceButton'

export type AceDropdownMenuProps = {
  triggerLabel: string
  items: AceDropdownMenuEntry[]
  /** Field = screening toolbar style; aceButton = same variants as `AceButton`. */
  triggerMode?: AceDropdownTriggerMode
  variant?: AceButtonVariant
  palette?: AceButtonPalette
  size?: AceButtonSize
  /** Field trigger only: show caret. */
  showChevron?: boolean
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  disabled?: boolean
  /** Portal target so the panel inherits `data-theme` from an ancestor (lab preview). */
  portalContainer?: HTMLElement | null
  className?: string
  panelWidth?: AceDropdownMenuPanelWidth
}

export type AceDropdownMenuPanelProps = {
  items: AceDropdownMenuEntry[]
  className?: string
  /** Matches Figma MenuList widths: compact (three-dot), wide (multi-select / primary). */
  panelWidth?: AceDropdownMenuPanelWidth
  /** Lab / docs: render rows as static markup (no Radix item focus). */
  staticDisplay?: boolean
  'aria-label'?: string
}

const itemType =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const labelType =
  '[font:var(--ace-type-label-bold)] [letter-spacing:var(--ace-type-label-bold-tracking)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--screening-text-muted)]'

const menuHeaderClass = cn(
  itemType,
  'px-[var(--space-3)] pb-[var(--space-2)] pt-[var(--space-3)] font-bold text-[var(--screening-text-primary)]',
)

const sectionHeaderClass =
  '[font:var(--ace-type-label-bold)] [letter-spacing:var(--ace-type-label-bold-tracking)] uppercase text-[var(--screening-text-primary)]'

const sectionActionClass =
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)] text-[var(--screening-primary)] hover:underline'

const footerActionClass =
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)] text-[var(--screening-primary)] hover:underline'

const fieldSizeClass: Record<AceButtonSize, string> = {
  sm: 'gap-[var(--ace-button-gap-sm)] px-[var(--ace-button-px-sm)] py-[var(--ace-button-py-sm)] text-xs',
  md: 'gap-[var(--ace-button-gap-md)] px-[var(--ace-button-px-md)] py-[var(--ace-button-py-md)] text-sm',
  lg: 'gap-[var(--ace-button-gap-lg)] px-[var(--ace-button-px-lg)] py-[var(--ace-button-py-lg)] text-base',
}

const fieldTriggerBase = cn(
  'inline-flex w-[var(--ace-dropdown-trigger-width)] max-w-[var(--ace-dropdown-trigger-width)] shrink-0 items-center justify-between gap-[var(--space-2)] rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] font-semibold leading-[1.65] text-[var(--screening-text-primary)] outline-none transition-colors [font-family:var(--font-screening)]',
  'hover:bg-[var(--screening-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
  'data-[state=open]:bg-[var(--screening-surface-hover)] data-[state=open]:ring-2 data-[state=open]:ring-[var(--screening-primary-ring)] data-[state=open]:ring-offset-2 data-[state=open]:ring-offset-[var(--screening-primary-ring-offset)]',
  'disabled:pointer-events-none disabled:opacity-50',
)

export const aceDropdownMenuPanelClass = cn(
  'z-[250] overflow-hidden rounded-[var(--radius-md)] border border-solid border-[var(--ace-dropdown-menu-border)] bg-[var(--ace-dropdown-menu-surface)]',
  'shadow-[var(--ace-dropdown-menu-shadow)]',
)

const panelWidthClass: Record<AceDropdownMenuPanelWidth, string> = {
  default: 'min-w-[11.5rem] p-1',
  compact: 'w-[6.75rem] py-2',
  wide: 'w-[16.5rem] py-2',
}

const itemClass = cn(
  itemType,
  'relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)] text-[var(--screening-text-primary)] outline-none',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  'data-[highlighted]:bg-[var(--screening-surface-hover)] data-[highlighted]:text-[var(--screening-text-primary)]',
)

const primaryItemClass = cn(itemClass, 'group gap-0 px-0 py-2')

const compactItemClass = cn(itemClass, 'px-3 py-1')

const paddedIndicatorItem = cn(itemClass, 'px-[var(--space-3)] py-[var(--space-2)] pl-8')

const assignmentCheckboxRow = cn(
  itemType,
  'flex cursor-pointer select-none items-center gap-[var(--space-2)] px-[var(--space-3)] py-1 text-[var(--screening-text-primary)]',
)

const shortcutClass =
  'ml-auto shrink-0 pl-4 [font:var(--ace-type-footer-semi-bold)] [letter-spacing:var(--ace-type-footer-semi-bold-tracking)] text-[var(--screening-text-muted)]'

function entryKey(entry: { id?: string; type: string }, i: number, extra?: string) {
  return entry.id ?? `${entry.type}-${i}-${extra ?? ''}`
}

function panelShellClass(panelWidth: AceDropdownMenuPanelWidth, className?: string) {
  return cn(aceDropdownMenuPanelClass, panelWidthClass[panelWidth], className)
}

function MenuCheckboxRow({
  checked,
  disabled,
  label,
  matchHighlight,
  emphasized,
  onCheckedChange,
}: {
  checked: boolean
  disabled?: boolean
  label: string
  matchHighlight?: string
  emphasized?: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <DropdownMenu.Item
      disabled={disabled}
      aria-label={label}
      className={cn(
        assignmentCheckboxRow,
        'w-full outline-none',
        emphasized && 'bg-[var(--screening-surface-muted)]',
        'data-[highlighted]:bg-[var(--screening-surface-hover)]',
      )}
      onSelect={(e) => {
        preventMenuClose(e)
        if (!disabled) onCheckedChange(!checked)
      }}
    >
      <Checkbox size="sm" checked={checked} disabled={disabled} tabIndex={-1} className="pointer-events-none" aria-hidden />
      <span className="min-w-0 flex-1 truncate text-left">
        {matchHighlight ? highlightMenuLabel(label, matchHighlight) : label}
      </span>
    </DropdownMenu.Item>
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
    <DropdownMenu.Item
      disabled={disabled}
      aria-label={label}
      className={cn(
        assignmentCheckboxRow,
        'w-full outline-none data-[highlighted]:bg-[var(--screening-surface-hover)]',
      )}
      onSelect={(e) => {
        preventMenuClose(e)
        if (!disabled) onCheckedChange(!checked)
      }}
    >
      <Toggle size="sm" checked={checked} disabled={disabled} tabIndex={-1} className="pointer-events-none" aria-hidden />
      <span className="min-w-0 flex-1 truncate text-left">{label}</span>
    </DropdownMenu.Item>
  )
}

function PrimaryMenuItem({
  entry,
  staticDisplay,
}: {
  entry: Extract<AceDropdownMenuSubItem, { type: 'item' }>
  staticDisplay?: boolean
}) {
  const isSelected = entry.highlighted || entry.selected
  const rowClass = cn(
    primaryItemClass,
    isSelected && 'bg-[var(--screening-surface-hover)]',
    entry.destructive && 'text-[var(--dialog-modal-danger)]',
    entry.disabled && 'pointer-events-none opacity-50',
  )
  const body = (
    <>
      <span
        className={cn(
          'w-[3px] shrink-0 self-stretch bg-transparent',
          isSelected
            ? 'bg-[var(--ace-dropdown-menu-primary)]'
            : 'group-data-[highlighted]:bg-[var(--ace-dropdown-menu-primary)]',
        )}
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate px-2">{entry.label}</span>
    </>
  )

  if (staticDisplay) {
    return <div role="menuitem" className={rowClass}>{body}</div>
  }

  return (
    <DropdownMenu.Item
      disabled={entry.disabled}
      className={rowClass}
      onSelect={(e) => {
        if (entry.keepOpen) preventMenuClose(e)
        entry.onSelect?.()
      }}
    >
      {body}
    </DropdownMenu.Item>
  )
}

function MenuEntries({
  entries,
  portalContainer,
  staticDisplay,
  panelWidth = 'default',
}: {
  entries: AceDropdownMenuEntry[]
  portalContainer?: HTMLElement | null
  staticDisplay?: boolean
  panelWidth?: AceDropdownMenuPanelWidth
}) {
  const compact = panelWidth === 'compact'

  return entries.map((entry, i) => {
    if (entry.type === 'separator') {
      const sep = <div className="my-1 h-px bg-[var(--screening-border-row)]" />
      return staticDisplay ? (
        <div key={entryKey(entry, i)} role="separator">
          {sep}
        </div>
      ) : (
        <DropdownMenu.Separator key={entryKey(entry, i)} className="my-1 h-px bg-[var(--screening-border-row)]" />
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
      return (
        <div
          key={entryKey(entry, i)}
          className="flex items-center justify-between px-2.5 pb-1 pt-2"
        >
          <span className={sectionHeaderClass}>{entry.label}</span>
          {entry.action ? (
            <DropdownMenu.Item
              className={cn(sectionActionClass, 'cursor-pointer outline-none')}
              onSelect={(e) => {
                preventMenuClose(e)
                entry.action?.onSelect?.()
              }}
            >
              {entry.action.label}
            </DropdownMenu.Item>
          ) : null}
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
        <DropdownMenu.Item
          key={entryKey(entry, i)}
          className={cn(footerActionClass, 'flex cursor-pointer justify-end px-[var(--space-3)] py-2 outline-none')}
          onSelect={(e) => {
            preventMenuClose(e)
            entry.onSelect?.()
          }}
        >
          {entry.label}
        </DropdownMenu.Item>
      )
    }

    if (entry.type === 'search') {
      return (
        <div
          key={entryKey(entry, i)}
          className="flex items-center justify-between gap-2 border-b border-[var(--screening-border-row)] px-[var(--space-3)] py-2"
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
              'min-w-0 flex-1 border-0 bg-transparent p-0 text-[var(--screening-text-primary)] outline-none placeholder:text-[var(--screening-text-muted)]',
              '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
            )}
          />
          {entry.value ? (
            <button
              type="button"
              aria-label="Clear search"
              className="inline-flex size-3 shrink-0 items-center justify-center text-[var(--screening-icon-muted)]"
              onPointerDown={preventMenuClose}
              onClick={() => entry.onClear?.()}
            >
              <X className="size-3" strokeWidth={2} />
            </button>
          ) : (
            <Search className="size-3 shrink-0 text-[var(--screening-icon-muted)]" aria-hidden />
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
            <Toggle size="sm" checked={entry.checked} disabled={entry.disabled} onCheckedChange={entry.onCheckedChange} />
            <span className="min-w-0 truncate">{entry.label}</span>
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
        <DropdownMenu.Label key={entryKey(entry, i)} className={labelType}>
          {entry.label}
        </DropdownMenu.Label>
      )
    }

    if (entry.type === 'radioGroup') {
      return (
        <DropdownMenu.RadioGroup
          key={entryKey(entry, i)}
          value={entry.value}
          onValueChange={entry.onValueChange}
          className="flex flex-col"
        >
          {entry.options.map((opt) => (
            <DropdownMenu.RadioItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className={cn(
                paddedIndicatorItem,
                opt.imageUrl && 'gap-[var(--space-2)] pl-9',
              )}
            >
              <span className="absolute left-2 top-1/2 size-4 -translate-y-1/2">
                <DropdownMenu.ItemIndicator className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="block size-2 rounded-full bg-[var(--screening-primary)]" />
                </DropdownMenu.ItemIndicator>
              </span>
              {opt.imageUrl ? (
                <img
                  src={opt.imageUrl}
                  alt=""
                  className="size-8 shrink-0 rounded-full object-cover"
                />
              ) : null}
              <span className="min-w-0 truncate">{opt.label}</span>
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      )
    }

    if (entry.type === 'checkbox') {
      if (staticDisplay) {
        return (
          <label
            key={entryKey(entry, i, entry.label)}
            className={cn(
              assignmentCheckboxRow,
              entry.emphasized && 'bg-[var(--screening-surface-muted)]',
              entry.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <Checkbox
              size="sm"
              checked={entry.checked}
              disabled={entry.disabled}
              onCheckedChange={entry.onCheckedChange}
            />
            <span className="min-w-0 truncate">
              {entry.matchHighlight ? highlightMenuLabel(entry.label, entry.matchHighlight) : entry.label}
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
          matchHighlight={entry.matchHighlight}
          emphasized={entry.emphasized}
          onCheckedChange={entry.onCheckedChange}
        />
      )
    }

    if (entry.type === 'sub') {
      return (
        <DropdownMenu.Sub key={entryKey(entry, i)}>
          <DropdownMenu.SubTrigger
            disabled={entry.disabled}
            className={cn(itemClass, 'justify-between gap-[var(--space-2)] px-[var(--space-3)] py-[var(--space-2)] pr-[var(--space-2)]')}
          >
            <span className="min-w-0 truncate">{entry.label}</span>
            <ChevronRight className={cn(aceChevronIconClass, 'opacity-70')} aria-hidden />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal container={portalContainer ?? undefined}>
            <DropdownMenu.SubContent
              sideOffset={4}
              alignOffset={-4}
              className={panelShellClass('default')}
              collisionPadding={8}
            >
              <MenuEntries entries={entry.items} portalContainer={portalContainer} panelWidth={panelWidth} />
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      )
    }

    if (panelWidth === 'wide' && !entry.icon && !entry.shortcut) {
      return <PrimaryMenuItem key={entryKey(entry, i, entry.label)} entry={entry} staticDisplay={staticDisplay} />
    }

    const Icon = entry.icon
    const isSelected = entry.highlighted || entry.selected
    const rowClass = cn(
      compact ? compactItemClass : cn(itemClass, 'px-[var(--space-3)] py-[var(--space-2)]'),
      isSelected && 'bg-[var(--screening-surface-hover)]',
      (entry.shortcut || Icon) && 'justify-between gap-[var(--space-3)]',
      entry.destructive &&
        'text-[var(--dialog-modal-danger)] data-[highlighted]:bg-[var(--screening-surface-hover)] data-[highlighted]:text-[var(--dialog-modal-danger)]',
    )

    if (staticDisplay) {
      return (
        <div key={entryKey(entry, i, entry.label)} role="menuitem" className={rowClass}>
          <span className="flex min-w-0 flex-1 items-center gap-[var(--space-2)]">
            {Icon ? <Icon className="size-4 shrink-0 text-[var(--screening-icon-muted)]" aria-hidden /> : null}
            <span className="min-w-0 truncate">{entry.label}</span>
          </span>
          {entry.shortcut ? <span className={shortcutClass}>{entry.shortcut}</span> : null}
        </div>
      )
    }

    return (
      <DropdownMenu.Item
        key={entryKey(entry, i, entry.label)}
        disabled={entry.disabled}
        className={rowClass}
        onSelect={() => entry.onSelect?.()}
      >
        <span className="flex min-w-0 flex-1 items-center gap-[var(--space-2)]">
          {Icon ? <Icon className="size-4 shrink-0 text-[var(--screening-icon-muted)]" aria-hidden /> : null}
          <span className="min-w-0 truncate">{entry.label}</span>
        </span>
        {entry.shortcut ? <span className={shortcutClass}>{entry.shortcut}</span> : null}
      </DropdownMenu.Item>
    )
  })
}

export function AceDropdownMenuPanel({
  items,
  className,
  panelWidth = 'default',
  staticDisplay = true,
  'aria-label': ariaLabel = 'Menu',
}: AceDropdownMenuPanelProps) {
  return (
    <div role="menu" aria-label={ariaLabel} className={panelShellClass(panelWidth, className)}>
      <MenuEntries entries={items} staticDisplay={staticDisplay} panelWidth={panelWidth} />
    </div>
  )
}

export function AceDropdownMenu({
  triggerLabel,
  items,
  triggerMode = 'field',
  variant = 'secondary',
  palette = 'purple',
  size = 'md',
  showChevron = true,
  align = 'start',
  sideOffset = 4,
  disabled,
  portalContainer,
  className,
  panelWidth = 'default',
}: AceDropdownMenuProps) {
  const fieldClass = cn(fieldTriggerBase, fieldSizeClass[size], className)

  const triggerChild =
    triggerMode === 'aceButton' ? (
      <AceButton
        type="button"
        variant={variant}
        palette={palette}
        size={size}
        icon="right"
        disabled={disabled}
        className={cn(
          'w-[var(--ace-dropdown-trigger-width)] max-w-[var(--ace-dropdown-trigger-width)] shrink-0 justify-between',
          '[&>span:first-of-type]:min-w-0 [&>span:first-of-type]:flex-1 [&>span:first-of-type]:truncate [&>span:first-of-type]:text-left',
          'data-[state=open]:ring-2 data-[state=open]:ring-[var(--ace-button-focus-ring)] data-[state=open]:ring-offset-2 data-[state=open]:ring-offset-[var(--color-surface)]',
          className,
        )}
      >
        {triggerLabel}
      </AceButton>
    ) : (
      <button type="button" disabled={disabled} className={fieldClass}>
        <span className="min-w-0 flex-1 truncate text-left">{triggerLabel}</span>
        {showChevron ? (
          <ChevronDown className={cn('ml-auto opacity-70', aceChevronIconClass)} aria-hidden />
        ) : null}
      </button>
    )

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild disabled={disabled}>
        {triggerChild}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal container={portalContainer ?? undefined}>
        <DropdownMenu.Content
          className={cn(panelShellClass(panelWidth), 'z-50')}
          sideOffset={sideOffset}
          align={align}
          collisionPadding={8}
        >
          <MenuEntries entries={items} portalContainer={portalContainer} panelWidth={panelWidth} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
