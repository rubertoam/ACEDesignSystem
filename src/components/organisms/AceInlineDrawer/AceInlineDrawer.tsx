import { type ReactNode } from 'react'
import { AceButton } from '../../atoms/AceButton'
import { Toggle } from '../../atoms/Toggle/Toggle'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'

const motionEase = '[transition-timing-function:var(--ace-motion-ease-standard)]'
const motionReduce = 'motion-reduce:transition-none motion-reduce:duration-0'

const panelMotion = cn(
  'transition-[width,border-color,box-shadow,opacity]',
  'duration-[var(--ace-inline-drawer-duration-panel)]',
  motionEase,
  motionReduce,
)

const titleClass = cn(
  'm-0 [font:var(--ace-type-heading-h5-bold)] [letter-spacing:var(--ace-type-heading-h5-bold-tracking)]',
  'text-[var(--screening-text-primary)]',
)

const toggleLabelClass = cn(
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]',
  'text-sm text-[var(--screening-primary)]',
)

export type AceInlineDrawerProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Drawer title — Heading/H5/Bold (Figma). */
  title?: ReactNode
  /** Shows a back chevron before the title (Property 2 = Back Button). */
  showBackButton?: boolean
  onBack?: () => void
  /** Header toggle (Property 1 = Toggle). */
  showToggle?: boolean
  toggleChecked?: boolean
  onToggleChange?: (checked: boolean) => void
  toggleLabel?: string
  /** Body content between header and footer. Omit for NoContent frame. */
  children?: ReactNode
  cancelLabel?: string
  saveLabel?: string
  onCancel?: () => void
  onSave?: () => void
  /** Replace default Cancel / Save footer. */
  footer?: ReactNode
  className?: string
}

/**
 * Right-side in-flow drawer — same width open/close motion as AceSidebar (not an overlay).
 * Figma Inline Drawer 1063:3635.
 */
export function AceInlineDrawer({
  open: openProp,
  defaultOpen = true,
  title = 'Title',
  showBackButton = false,
  onBack,
  showToggle = false,
  toggleChecked = false,
  onToggleChange,
  toggleLabel = 'Switch view toggle',
  children,
  cancelLabel = 'Cancel',
  saveLabel = 'Save',
  onCancel,
  onSave,
  footer,
  className,
}: AceInlineDrawerProps) {
  const open = openProp ?? defaultOpen
  const hasBody = children != null && children !== false

  const defaultFooter = (
    <div className="flex w-full shrink-0 items-start justify-end gap-[var(--ace-inline-drawer-footer-gap)]">
      <AceButton type="button" variant="secondary" size="md" onClick={onCancel}>
        {cancelLabel}
      </AceButton>
      <AceButton type="button" variant="primary" size="md" onClick={onSave}>
        {saveLabel}
      </AceButton>
    </div>
  )

  return (
    <aside
      data-open={open}
      aria-hidden={!open}
      className={cn(
        'flex h-full shrink-0 flex-col overflow-hidden border-solid bg-[var(--screening-surface)]',
        panelMotion,
        'border-l-[0.5px] border-[var(--ace-inline-drawer-border)] shadow-[var(--ace-inline-drawer-shadow)]',
        open ? 'w-[var(--ace-inline-drawer-width)]' : 'w-0 border-l-0 shadow-none',
        className,
      )}
    >
      <div
        className={cn(
          'flex min-w-[var(--ace-inline-drawer-width)] flex-1 flex-col transition-opacity',
          'duration-[var(--ace-inline-drawer-duration-panel)]',
          motionEase,
          motionReduce,
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <header
          className={cn(
            'flex shrink-0 items-center overflow-hidden bg-[var(--screening-surface)]',
            'px-[var(--ace-inline-drawer-header-px)] py-[var(--ace-inline-drawer-header-py)]',
            showToggle ? 'justify-between gap-4' : 'justify-start',
          )}
        >
          <div className="flex min-w-0 items-center gap-4">
            {showBackButton ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Back"
                className={cn(
                  'inline-flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] border-0 bg-transparent p-0',
                  'text-[var(--screening-text-primary)]',
                  'transition-colors duration-[var(--ace-motion-duration-fast)]',
                  motionEase,
                  motionReduce,
                  'hover:bg-[var(--screening-surface-hover)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
                )}
              >
                <MaterialSymbol name="chevron_left" size="md" className={aceChevronIconClass} />
              </button>
            ) : null}
            <h2 className={titleClass}>{title}</h2>
          </div>

          {showToggle ? (
            <label className="flex shrink-0 cursor-pointer items-center gap-3">
              <Toggle
                size="sm"
                checked={toggleChecked}
                onCheckedChange={onToggleChange}
                aria-label={toggleLabel}
              />
              <span className={toggleLabelClass}>{toggleLabel}</span>
            </label>
          ) : null}
        </header>

        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--screening-surface)]',
            hasBody
              ? 'justify-between px-[var(--ace-inline-drawer-body-px)] py-[var(--ace-inline-drawer-body-py)]'
              : 'items-end justify-end p-[var(--ace-inline-drawer-body-px)]',
          )}
        >
          {hasBody ? (
            <div className="flex min-h-0 w-full flex-1 flex-col gap-[var(--ace-inline-drawer-section-gap)] overflow-y-auto">
              {children}
            </div>
          ) : null}
          {footer ?? defaultFooter}
        </div>
      </div>
    </aside>
  )
}
