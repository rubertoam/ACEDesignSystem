import { useEffect, useId, useLayoutEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../AceAccordion/MaterialSymbol'
import { AceInlineMessage } from '../AceInlineMessage/AceInlineMessage'
import type { AceInlineMessageTone } from '../AceInlineMessage/inlineMessageFieldStyles'

/** ACE typography tokens (`typography-tokens.css`) → `font` + `letter-spacing` */
function aceTypography(token: string) {
  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`
}

const ACE = {
  title: '--ace-type-heading-h6-bold',
  body: '--ace-type-paragraph-p1-regular',
  bodyBold: '--ace-type-paragraph-p1-bold',
  captionBold: '--ace-type-caption-bold',
  captionRegular: '--ace-type-caption-regular',
} as const

export type DialogModalPresentation = 'overlay' | 'static'

export type DialogModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: ReactNode
  children?: ReactNode
  /** `md` ≈ 448px, `lg` = 616px (Figma default width) */
  size?: 'md' | 'lg'
  /** Replaces default Cancel / primary button row */
  footer?: ReactNode
  /** Outline button (e.g. Cancel) — right group, before primary */
  secondaryAction?: { label: string; onClick: () => void }
  /** Filled primary; use `danger` for delete flows */
  primaryAction?: { label: string; onClick: () => void; variant?: 'default' | 'danger' }
  className?: string
  /** Extra classes on the scrollable body region */
  bodyClassName?: string
  /** Grow modal height with content; body does not scroll (use inner regions for overflow) */
  fitContent?: boolean
  /**
   * `overlay` (default) — portal + backdrop.
   * `static` — inline panel for docs / variant galleries (no portal, trap, or overlay).
   */
  presentation?: DialogModalPresentation
}

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Iconography “No border stroke” — matches toast dismiss / sidebar icon buttons. */
const dialogCloseButtonClass = cn(
  'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)]',
  'text-[var(--dialog-modal-title)]',
  'transition-[background-color,box-shadow,color]',
  'duration-[var(--ace-motion-duration-medium)]',
  '[transition-timing-function:var(--ace-motion-ease-standard)]',
  'motion-reduce:transition-none motion-reduce:duration-0',
  'hover:bg-[var(--screening-surface-hover)] hover:shadow-[0_0_0_1px_var(--screening-border-strong)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
)

export function DialogModal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  footer,
  secondaryAction,
  primaryAction,
  className,
  bodyClassName,
  fitContent = false,
  presentation = 'overlay',
}: DialogModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const primaryButtonRef = useRef<HTMLButtonElement>(null)
  const secondaryButtonRef = useRef<HTMLButtonElement>(null)

  const isStatic = presentation === 'static'
  const showPresetFooter = footer == null && (secondaryAction != null || primaryAction != null)
  const hasDescription = description != null && description !== ''

  useEffect(() => {
    if (!open || isStatic) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open, isStatic])

  useEffect(() => {
    if (!open || isStatic) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, isStatic])

  useEffect(() => {
    if (!open || isStatic) return
    const node = panelRef.current
    if (!node) return
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusables = [...node.querySelectorAll<HTMLElement>(focusableSelector)].filter(
        (el) => !('disabled' in el && (el as HTMLButtonElement).disabled),
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [open, isStatic])

  useLayoutEffect(() => {
    if (!open || isStatic) return
    const id = window.requestAnimationFrame(() => {
      if (primaryAction != null && primaryButtonRef.current) {
        primaryButtonRef.current.focus()
        return
      }
      if (secondaryAction != null && secondaryButtonRef.current) {
        secondaryButtonRef.current.focus()
        return
      }
      closeButtonRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(id)
  }, [open, primaryAction, secondaryAction, isStatic])

  if (!open) return null

  const maxW = size === 'lg' ? 'var(--dialog-modal-max-width-lg)' : 'var(--dialog-modal-max-width-md)'

  const panel = (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={isStatic ? undefined : true}
      aria-labelledby={titleId}
      aria-describedby={hasDescription ? descriptionId : undefined}
      className={cn(
        'box-border flex w-full flex-col border border-[var(--dialog-modal-border)] bg-[var(--dialog-modal-surface)] shadow-[var(--dialog-modal-shadow)]',
        'rounded-[var(--dialog-modal-radius)] p-[var(--dialog-modal-padding)]',
        isStatic
          ? 'relative z-0 gap-[var(--dialog-modal-section-gap)] overflow-hidden'
          : cn(
              'relative z-[1]',
              fitContent
                ? 'my-auto h-fit max-h-none shrink-0 gap-[var(--dialog-modal-section-gap)] overflow-hidden'
                : 'max-h-[var(--dialog-modal-content-max-h)] overflow-clip gap-0',
            ),
        className,
      )}
      style={{
        maxWidth: maxW,
        ...(fitContent && !isStatic
          ? { maxHeight: 'min(85vh, calc(100dvh - 2 * var(--space-4)))' }
          : undefined),
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex shrink-0 items-start justify-between gap-[var(--dialog-modal-footer-btn-gap)]">
        <h2
          id={titleId}
          className={cn(
            aceTypography(ACE.title),
            'm-0 min-w-0 flex-1 text-[var(--dialog-modal-title)]',
          )}
        >
          {title}
        </h2>
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          className={dialogCloseButtonClass}
          aria-label="Close"
        >
          <MaterialSymbol name="close" size="md" className="shrink-0 text-current" />
        </button>
      </div>

      <div
        className={cn(
          'flex min-h-0 flex-col overflow-x-visible',
          isStatic || fitContent
            ? 'flex-none gap-[var(--dialog-modal-section-gap)] overflow-visible'
            : cn(
                'mt-[var(--dialog-modal-section-gap)] flex-1 gap-[var(--dialog-modal-section-gap)] overflow-y-auto px-[var(--dialog-modal-body-focus-gutter)] pb-[var(--dialog-modal-body-focus-gutter)]',
              ),
          bodyClassName,
        )}
      >
        {hasDescription ? (
          <div
            id={descriptionId}
            className={cn(aceTypography(ACE.body), 'text-[var(--dialog-modal-body)] [text-wrap:pretty]')}
          >
            {description}
          </div>
        ) : null}
        {children != null ? (
          <div
            className={cn(
              'flex w-full flex-col gap-[var(--dialog-modal-section-gap)]',
              !isStatic && !fitContent && 'min-h-0 pt-[var(--dialog-modal-body-focus-gutter)]',
              (isStatic || fitContent) && 'min-h-0',
            )}
          >
            {children}
          </div>
        ) : null}
      </div>

      {footer != null ? (
        <div
          className={cn(
            'flex shrink-0 flex-wrap items-center justify-end gap-[var(--dialog-modal-footer-btn-gap)]',
            !isStatic && !fitContent && 'mt-[var(--dialog-modal-section-gap)]',
          )}
        >
          {footer}
        </div>
      ) : showPresetFooter ? (
        <div
          className={cn(
            'flex shrink-0 flex-wrap items-center justify-end gap-[var(--dialog-modal-footer-btn-gap)]',
            !isStatic && !fitContent && 'mt-[var(--dialog-modal-section-gap)]',
          )}
        >
          {secondaryAction != null ? (
            <button
              type="button"
              ref={secondaryButtonRef}
              onClick={secondaryAction.onClick}
              className={cn(
                aceTypography(ACE.bodyBold),
                'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] border border-solid border-[var(--dialog-modal-outline-border)] bg-[var(--dialog-modal-surface)] px-4 py-2 text-[var(--dialog-modal-outline-text)] transition-colors',
                'hover:bg-[var(--dialog-modal-outline-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dialog-modal-primary)] focus-visible:ring-offset-2',
              )}
            >
              {secondaryAction.label}
            </button>
          ) : null}
          {primaryAction != null ? (
            <button
              type="button"
              ref={primaryButtonRef}
              onClick={primaryAction.onClick}
              className={cn(
                aceTypography(ACE.bodyBold),
                'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] px-4 py-2 text-[var(--dialog-modal-on-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dialog-modal-primary)] focus-visible:ring-offset-2',
                primaryAction.variant === 'danger'
                  ? 'bg-[var(--dialog-modal-danger)] hover:bg-[var(--dialog-modal-danger-hover)]'
                  : 'bg-[var(--dialog-modal-primary)] hover:bg-[var(--dialog-modal-primary-hover)]',
              )}
            >
              {primaryAction.label}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )

  if (isStatic) return panel

  const modal = (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex justify-center p-4',
        fitContent ? 'items-center overflow-y-auto' : 'items-end sm:items-center',
      )}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[var(--dialog-modal-overlay)] backdrop-blur-[1px]"
        aria-label="Dismiss dialog"
        onClick={onClose}
      />
      {panel}
    </div>
  )

  return createPortal(modal, document.body)
}

export type DialogModalInlineMessageProps = {
  children: ReactNode
  tone?: AceInlineMessageTone
}

/** Inline message strip inside modal body (Figma Dialog Modals + Inline Messages). */
export function DialogModalInlineMessage({
  children,
  tone = 'error',
}: DialogModalInlineMessageProps) {
  return <AceInlineMessage tone={tone}>{children}</AceInlineMessage>
}

/** @deprecated Prefer `DialogModalInlineMessage` with an explicit tone. */
export function DialogModalInlineError({ children }: { children: ReactNode }) {
  return <DialogModalInlineMessage tone="error">{children}</DialogModalInlineMessage>
}
