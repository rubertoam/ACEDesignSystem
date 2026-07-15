import { useCallback, useId, useState, type ReactNode } from 'react'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from './MaterialSymbol'

export type AceAccordionSurface = 'gray' | 'white'

export type AceAccordionProps = {
  title: string
  children?: ReactNode
  tagLabel?: string
  showTag?: boolean
  surface?: AceAccordionSurface
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
}

const durationAccordion = 'duration-[var(--ace-accordion-duration)]'
const easeAccordion = '[transition-timing-function:var(--ace-accordion-ease)]'

function surfaceBgClass(surface: AceAccordionSurface) {
  return surface === 'gray'
    ? 'bg-[var(--ace-accordion-surface-muted)]'
    : 'bg-[var(--ace-accordion-surface)]'
}

const titleClass =
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)] text-[var(--ace-accordion-title)]'

const tagClass =
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)] rounded-full bg-[var(--ace-accordion-tag-bg)] px-3 py-0.5 text-[var(--ace-accordion-tag-text)]'

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
      className="inline-flex size-6 shrink-0 items-center justify-center rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--screening-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]"
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
            contentPadding && 'px-[var(--ace-accordion-px)] py-[var(--ace-accordion-py)]',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function AceAccordion({
  title,
  children,
  tagLabel = '[Label]',
  showTag = true,
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
}: AceAccordionProps) {
  const panelId = useId()
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : openUncontrolled

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setOpenUncontrolled(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const toggle = () => setOpen(!open)
  const surfaceBg = surfaceBgClass(surface)
  const hasDefaultRightChrome = showTag || showAddIcon || showDeleteIcon || showEditIcon || showMoreIcon

  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col overflow-hidden rounded-[var(--ace-accordion-radius)] border border-solid border-[var(--ace-accordion-border)] transition-shadow',
        durationAccordion,
        easeAccordion,
        surfaceBg,
        dropShadow && 'shadow-[var(--ace-drop-shadow-xs)]',
        className,
      )}
    >
      <button
        type="button"
        className={cn(
          'flex w-full shrink-0 cursor-pointer select-none items-center justify-between gap-[var(--ace-accordion-gap)] border-0 bg-inherit px-[var(--ace-accordion-px)] py-[var(--ace-accordion-py)] text-left outline-none transition-colors hover:opacity-95',
          'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--screening-primary-ring)]',
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className="flex min-w-0 items-center gap-[var(--ace-accordion-gap)]">
          <span
            className={cn(
              'flex shrink-0 items-center justify-center transition-transform',
              durationAccordion,
              easeAccordion,
              open ? 'rotate-0' : '-rotate-90',
            )}
            aria-hidden
          >
            <MaterialSymbol
              name="keyboard_arrow_down"
              size="md"
              className={cn(aceChevronIconClass, 'text-[var(--ace-accordion-title)]')}
            />
          </span>
          <span className={cn(titleClass, titleClassName, 'min-w-0 truncate')}>{title}</span>
        </span>

        {headerTrailing != null || hasDefaultRightChrome ? (
          <span className="flex shrink-0 items-center gap-[var(--ace-accordion-gap)]">
            {headerTrailing}
            {hasDefaultRightChrome ? (
              <>
                {showTag ? <span className={tagClass}>{tagLabel}</span> : null}
                {showAddIcon ? (
                  <ActionButton label="Add" onClick={onAddClick}>
                    <MaterialSymbol name="add_circle" size="sm" className="text-[var(--ace-accordion-icon)]" />
                  </ActionButton>
                ) : null}
                {showDeleteIcon ? (
                  <ActionButton label="Delete" onClick={onDeleteClick}>
                    <MaterialSymbol name="delete" size="sm" className="text-[var(--ace-accordion-icon)]" />
                  </ActionButton>
                ) : null}
                {showEditIcon ? (
                  <ActionButton label="Edit" onClick={onEditClick}>
                    <MaterialSymbol name="edit" size="sm" className="text-[var(--ace-accordion-icon)]" />
                  </ActionButton>
                ) : null}
                {showMoreIcon ? (
                  <ActionButton label="More options" onClick={onMoreClick}>
                    <MaterialSymbol name="more_horiz" size="sm" className="text-[var(--ace-accordion-icon)]" />
                  </ActionButton>
                ) : null}
              </>
            ) : null}
          </span>
        ) : null}
      </button>

      {children != null ? (
        <AccordionPanel id={panelId} open={open} contentPadding={contentPadding}>
          {children}
        </AccordionPanel>
      ) : null}
    </div>
  )
}