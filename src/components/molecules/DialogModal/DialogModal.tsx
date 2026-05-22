import { useEffect, useId, useLayoutEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X, AlertCircle } from 'lucide-react'
import { cn } from '../../../lib/cn'

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
}

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

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
}: DialogModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const primaryButtonRef = useRef<HTMLButtonElement>(null)
  const secondaryButtonRef = useRef<HTMLButtonElement>(null)

  const showPresetFooter = footer == null && (secondaryAction != null || primaryAction != null)
  const hasDescription = description != null && description !== ''

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
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
  }, [open])

  useLayoutEffect(() => {
    if (!open) return
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
  }, [open, primaryAction, secondaryAction])

  if (!open) return null

  const maxW = size === 'lg' ? 'var(--dialog-modal-max-width-lg)' : 'var(--dialog-modal-max-width-md)'

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
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className={cn(
          'relative z-[1] box-border flex w-full flex-col border border-[var(--dialog-modal-border)] bg-[var(--dialog-modal-surface)] shadow-[var(--dialog-modal-shadow)]',
          'rounded-[var(--dialog-modal-radius)] p-[var(--dialog-modal-padding)]',
          fitContent
            ? 'my-auto h-fit max-h-none shrink-0 gap-[var(--dialog-modal-section-gap)] overflow-hidden'
            : 'max-h-[var(--dialog-modal-content-max-h)] overflow-clip',
          !fitContent && 'gap-0',
          className,
        )}
        style={{
          maxWidth: maxW,
          ...(fitContent
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
            className={cn(
              'inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--dialog-modal-btn-radius)] text-[var(--dialog-modal-title)] transition-colors',
              'hover:bg-[var(--dialog-modal-close-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dialog-modal-primary)] focus-visible:ring-offset-2',
            )}
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div
          className={cn(
            'flex min-h-0 flex-col overflow-x-visible',
            fitContent
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
                fitContent ? 'min-h-0 w-full' : 'min-h-0 pt-[var(--dialog-modal-body-focus-gutter)]',
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
              !fitContent && 'mt-[var(--dialog-modal-section-gap)]',
            )}
          >
            {footer}
          </div>
        ) : showPresetFooter ? (
          <div
            className={cn(
              'flex shrink-0 flex-wrap items-center justify-end gap-[var(--dialog-modal-footer-btn-gap)]',
              !fitContent && 'mt-[var(--dialog-modal-section-gap)]',
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
    </div>
  )

  return createPortal(modal, document.body)
}

/** Optional helper for ACE inline error strip inside modal body (Figma Basic / Action) */
export function DialogModalInlineError({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-[var(--dialog-modal-btn-radius)] border border-[var(--dialog-modal-inline-error-border)] bg-[var(--dialog-modal-inline-error-bg)] px-4 py-2',
      )}
      role="alert"
    >
      <AlertCircle className="size-4 shrink-0 text-[var(--dialog-modal-danger)]" strokeWidth={2} aria-hidden />
      <span className={cn(aceTypography(ACE.captionRegular), 'min-w-0 flex-1 text-[var(--dialog-modal-body)]')}>
        {children}
      </span>
    </div>
  )
}
