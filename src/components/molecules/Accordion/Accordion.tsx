import { useCallback, useId, useState, type ReactNode } from 'react'
import { Badge, type BadgeVariant } from '../../atoms/Badge/Badge'
import {
  sidebarIconButtonClass,
  sidebarRowActionIconClass,
} from '../../organisms/Sidebar/sidebarRowActions'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from './MaterialSymbol'

export type AccordionSurface = 'gray' | 'white'

export type AccordionProps = {
  title: string
  children?: ReactNode
  tagLabel?: string
  showTag?: boolean
  /** Badge pill color when `showTag` is on. Defaults to `purple` (Figma Accordion). */
  tagVariant?: BadgeVariant
  surface?: AccordionSurface
  /** Applies --ace-drop-shadow-xs independently of surface color. */
  dropShadow?: boolean
  showAddIcon?: boolean
  showDeleteIcon?: boolean
  showEditIcon?: boolean
  showMoreIcon?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  onAddClick?: () => void
  onDeleteClick?: () => void
  onEditClick?: () => void
  onMoreClick?: () => void
  /** Replaces the default tag + icon cluster (e.g. data table progress). */
  headerTrailing?: ReactNode
  /** When false, body children fill the panel edge-to-edge (no extra padding). */
  contentPadding?: boolean
  titleClassName?: string
  /** When false, hides the expand/collapse chevron. Default true. */
  showChevron?: boolean
  /**
   * When false, the section stays expanded and the header is not a toggle.
   * Defaults to true when `showChevron` is true; false when `showChevron` is false.
   */
  collapsible?: boolean
}

const durationAccordion = 'duration-[var(--accordion-duration)]'
const easeAccordion = '[transition-timing-function:var(--accordion-ease)]'

/** Figma Accordion icon glyph = 20px (`icon/size/lg`) in 32px no-border hit target. */
const accordionIconGlyphSize = 'lg' as const

function surfaceBgClass(surface: AccordionSurface) {
  return surface === 'gray'
    ? 'bg-[var(--accordion-surface-muted)]'
    : 'bg-[var(--accordion-surface)]'
}

const titleClass =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)] text-[var(--accordion-title)]'

function ActionButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={sidebarIconButtonClass}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {children}
    </button>
  )
}

function AccordionPanel({
  id,
  open,
  contentPadding,
  children,
}: {
  id: string
  open: boolean
  contentPadding: boolean
  children: ReactNode
}) {
  return (
    <div
      id={id}
      role="region"
      aria-hidden={!open}
      className={cn(
        'grid overflow-hidden transition-[grid-template-rows]',
        durationAccordion,
        easeAccordion,
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={cn(
            'bg-inherit',
            contentPadding && 'px-[var(--accordion-px)] pb-[var(--accordion-py)] pt-0',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function Accordion({
  title,
  children,
  tagLabel = 'Badge',
  showTag = true,
  tagVariant = 'purple',
  surface = 'white',
  dropShadow = false,
  showAddIcon = true,
  showDeleteIcon = true,
  showEditIcon = true,
  showMoreIcon = true,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
  onAddClick,
  onDeleteClick,
  onEditClick,
  onMoreClick,
  headerTrailing,
  contentPadding = true,
  titleClassName,
  showChevron = true,
  collapsible,
}: AccordionProps) {
  const panelId = useId()
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const isCollapsible = collapsible ?? showChevron
  const open = isCollapsible ? (isControlled ? openProp : openUncontrolled) : true

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setOpenUncontrolled(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const toggle = () => {
    if (!isCollapsible) return
    setOpen(!open)
  }
  const surfaceBg = surfaceBgClass(surface)
  const hasDefaultRightChrome = showTag || showAddIcon || showDeleteIcon || showEditIcon || showMoreIcon
  const HeaderTag = isCollapsible ? 'button' : 'div'

  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col overflow-hidden rounded-[var(--accordion-radius)] border border-solid border-[var(--accordion-border)] transition-shadow',
        durationAccordion,
        easeAccordion,
        surfaceBg,
        dropShadow && 'shadow-[var(--ace-drop-shadow-xs)]',
        className,
      )}
    >
      <HeaderTag
        {...(isCollapsible
          ? {
              type: 'button' as const,
              'aria-expanded': open,
              'aria-controls': panelId,
              onClick: toggle,
            }
          : {
              role: 'heading' as const,
              'aria-level': 2,
            })}
        className={cn(
          'flex w-full shrink-0 select-none items-center justify-between gap-[var(--accordion-gap)] border-0 bg-inherit px-[var(--accordion-px)] py-[var(--accordion-py)] text-left outline-none',
          isCollapsible &&
            'cursor-pointer transition-colors hover:opacity-95 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--screening-primary-ring)]',
        )}
      >
        <span className="flex min-w-0 items-center gap-[var(--accordion-gap)]">
          {showChevron ? (
            <span
              className="inline-flex size-8 shrink-0 items-center justify-center text-[var(--accordion-icon)]"
              aria-hidden
            >
              <MaterialSymbol
                name={open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
                size={accordionIconGlyphSize}
                className={sidebarRowActionIconClass}
              />
            </span>
          ) : null}
          <span className={cn(titleClass, titleClassName, 'min-w-0 truncate')}>{title}</span>
        </span>

        {headerTrailing != null || hasDefaultRightChrome ? (
          <span className="flex shrink-0 items-center gap-[var(--accordion-actions-gap)]">
            {headerTrailing}
            {hasDefaultRightChrome ? (
              <>
                {showTag ? (
                  <Badge appearance="pill" variant={tagVariant}>
                    {tagLabel}
                  </Badge>
                ) : null}
                {/* Figma Accordion actions order: more → edit → delete; add is catalog extension */}
                {showMoreIcon ? (
                  <ActionButton label="More options" onClick={onMoreClick}>
                    <MaterialSymbol
                      name="more_horiz"
                      size={accordionIconGlyphSize}
                      className={sidebarRowActionIconClass}
                    />
                  </ActionButton>
                ) : null}
                {showEditIcon ? (
                  <ActionButton label="Edit" onClick={onEditClick}>
                    <MaterialSymbol
                      name="edit"
                      size={accordionIconGlyphSize}
                      className={sidebarRowActionIconClass}
                    />
                  </ActionButton>
                ) : null}
                {showDeleteIcon ? (
                  <ActionButton label="Delete" onClick={onDeleteClick}>
                    <MaterialSymbol
                      name="delete"
                      size={accordionIconGlyphSize}
                      className={sidebarRowActionIconClass}
                    />
                  </ActionButton>
                ) : null}
                {showAddIcon ? (
                  <ActionButton label="Add" onClick={onAddClick}>
                    <MaterialSymbol
                      name="add_circle"
                      size={accordionIconGlyphSize}
                      className={sidebarRowActionIconClass}
                    />
                  </ActionButton>
                ) : null}
              </>
            ) : null}
          </span>
        ) : null}
      </HeaderTag>

      {children != null ? (
        <AccordionPanel id={panelId} open={open} contentPadding={contentPadding}>
          {children}
        </AccordionPanel>
      ) : null}
    </div>
  )
}
