import { type ReactNode } from 'react'
import { Button } from '../../atoms/Button'
import { Toggle } from '../../atoms/Toggle/Toggle'
import { MaterialSymbol } from '../../molecules/Accordion/MaterialSymbol'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import { sidebarIconButtonClass } from '../Sidebar/sidebarRowActions'
import { SideDrawer } from './SideDrawer'

const titleClass = cn(
  'm-0 shrink-0 whitespace-nowrap',
  '[font:var(--ace-type-subheading-bold)] [letter-spacing:var(--ace-type-subheading-bold-tracking)]',
  'text-[var(--color-text-primary)]',
)

const toggleLabelClass = cn(
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]',
  'text-[var(--color-action-primary)]',
)

const notoVar = { fontVariationSettings: "'CTGR' 0, 'wdth' 100" } as const

export type InlineDrawerProps = {
  open?: boolean
  defaultOpen?: boolean
  /** Called on Escape, header close, and when secondary footer has no dedicated handler. */
  onClose?: () => void
  /** @deprecated Prefer `onClose`. Still honored for secondary footer when `onCancel` is unset. */
  onOpenChange?: (open: boolean) => void
  /** Drawer title - Review Assigned header uses Noto Bold 20. */
  title?: ReactNode
  /** Shows a back chevron before the title. */
  showBackButton?: boolean
  onBack?: () => void
  /** Optional header view toggle. */
  showToggle?: boolean
  toggleChecked?: boolean
  onToggleChange?: (checked: boolean) => void
  toggleLabel?: string
  /** Show the header close (X) control. Default true (Review Assigned). */
  showCloseButton?: boolean
  /** Body content between header and footer. Omit for an empty body. */
  children?: ReactNode
  /** Secondary footer label. Default `Close` (Review Assigned / Figma Inline Drawer). */
  cancelLabel?: string
  /** Primary footer label. Default `Confirm`. */
  saveLabel?: string
  onCancel?: () => void
  onSave?: () => void
  /** Replace default Close / Confirm footer. */
  footer?: ReactNode
  /** localStorage key for persisted width; omit to skip persistence. */
  widthStorageKey?: string
  /** Pixel width when first opened. Defaults to 25% of the viewport. */
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  className?: string
}

/**
 * Right-side in-flow drawer from Review Assigned (`SideDrawer` + Review panel chrome).
 * Resizable; not an overlay. Escape and the header close control dismiss it.
 */
export function InlineDrawer({
  open: openProp,
  defaultOpen = true,
  onClose,
  onOpenChange,
  title = 'Title',
  showBackButton = false,
  onBack,
  showToggle = false,
  toggleChecked = false,
  onToggleChange,
  toggleLabel = 'Switch view toggle',
  showCloseButton = true,
  children,
  cancelLabel = 'Close',
  saveLabel = 'Confirm',
  onCancel,
  onSave,
  footer,
  widthStorageKey,
  defaultWidth,
  minWidth,
  maxWidth,
  className,
}: InlineDrawerProps) {
  const open = openProp ?? defaultOpen
  const hasBody = children != null && children !== false

  const dismiss = () => {
    onClose?.()
    onOpenChange?.(false)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    else dismiss()
  }

  const defaultFooter = (
    <div className="flex w-full shrink-0 items-start justify-end gap-[var(--inline-drawer-footer-gap)] p-6">
      <Button type="button" variant="secondary" size="md" onClick={handleCancel}>
        {cancelLabel}
      </Button>
      <Button type="button" variant="primary" size="md" onClick={onSave ?? dismiss}>
        {saveLabel}
      </Button>
    </div>
  )

  return (
    <SideDrawer
      open={open}
      onClose={dismiss}
      widthStorageKey={widthStorageKey}
      defaultWidth={defaultWidth}
      minWidth={minWidth}
      maxWidth={maxWidth}
      className={cn('min-h-0 self-stretch', className)}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="relative w-full shrink-0 bg-[var(--screening-surface)]">
          <div
            className={cn(
              'flex size-full flex-row items-center gap-3 overflow-clip px-5 py-4',
              showToggle || showCloseButton ? 'justify-between' : 'justify-start',
            )}
          >
            <div className="flex min-w-0 items-center gap-4">
              {showBackButton ? (
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Back"
                  className={sidebarIconButtonClass}
                >
                  <MaterialSymbol name="chevron_left" size="lg" className={aceChevronIconClass} />
                </button>
              ) : null}
              <h2 className={titleClass} style={notoVar}>
                {title}
              </h2>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {showToggle ? (
                <label className="flex cursor-pointer items-center gap-3">
                  <Toggle
                    size="sm"
                    checked={toggleChecked}
                    onCheckedChange={onToggleChange}
                    aria-label={toggleLabel}
                  />
                  <span className={toggleLabelClass}>{toggleLabel}</span>
                </label>
              ) : null}
              {showCloseButton ? (
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Close drawer"
                  className={sidebarIconButtonClass}
                >
                  <MaterialSymbol name="close" size="lg" className="text-current" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-px w-full flex-1 flex-col bg-[var(--screening-surface)]">
          {hasBody ? (
            <div
              className={cn(
                'flex min-h-0 w-full flex-1 flex-col gap-[var(--inline-drawer-section-gap)] overflow-y-auto',
                'px-[var(--inline-drawer-body-px)] py-[var(--inline-drawer-body-py)]',
              )}
            >
              {children}
            </div>
          ) : (
            <div className="min-h-0 flex-1" aria-hidden />
          )}
          {footer ?? defaultFooter}
        </div>
      </div>
    </SideDrawer>
  )
}
