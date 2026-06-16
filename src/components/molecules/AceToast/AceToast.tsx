import { AlertCircle, Check, Info, TriangleAlert, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceToastActionLinkClass,
  aceToastActionRowClass,
  aceToastBodyClass,
  aceToastConfirmButtonClass,
  aceToastDismissButtonClass,
  aceToastDismissIconClass,
  aceToastDoubleActionRowClass,
  aceToastIconShellClass,
  aceToastIndentedBodyClass,
  aceToastMessageRowClass,
  aceToastShellClass,
  aceToastTitleClass,
  aceToastTopRowClass,
  type AceToastLayout,
  type AceToastTone,
} from './toastFieldStyles'

export type AceToastProps = {
  tone?: AceToastTone
  layout?: AceToastLayout
  /** Shown on the default layout for success-style toasts. */
  title?: string
  /** Single string or multiple lines (multi-line layouts). */
  message: string | string[]
  onDismiss?: () => void
  dismissLabel?: string
  actionLabel?: string
  onAction?: () => void
  cancelLabel?: string
  onCancel?: () => void
  confirmLabel?: string
  onConfirm?: () => void
  className?: string
}

function ToastStatusIcon({ tone }: { tone: AceToastTone }) {
  const shell = cn(
    'inline-flex size-4 shrink-0 items-center justify-center',
    tone === 'warning' ? 'text-[var(--ace-toast-icon-warning)]' : aceToastIconShellClass[tone],
    tone === 'warning' ? '' : 'rounded-full',
  )

  const iconClass = tone === 'warning' ? 'size-4' : 'size-2.5'

  const glyph =
    tone === 'success' ? (
      <Check className={iconClass} strokeWidth={2.5} aria-hidden />
    ) : tone === 'info' ? (
      <Info className={iconClass} strokeWidth={2.5} aria-hidden />
    ) : tone === 'warning' ? (
      <TriangleAlert className={iconClass} fill="currentColor" strokeWidth={0} aria-hidden />
    ) : (
      <AlertCircle className={iconClass} strokeWidth={2.5} aria-hidden />
    )

  return <span className={shell}>{glyph}</span>
}

function DismissButton({
  onDismiss,
  dismissLabel,
}: {
  onDismiss?: () => void
  dismissLabel: string
}) {
  return (
    <button
      type="button"
      className={aceToastDismissButtonClass}
      aria-label={dismissLabel}
      onClick={onDismiss}
    >
      <X className={aceToastDismissIconClass} strokeWidth={2} aria-hidden />
    </button>
  )
}

function ActionLink({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <button type="button" className={aceToastActionLinkClass} onClick={onClick}>
      {label}
    </button>
  )
}

function ConfirmButton({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <button type="button" className={aceToastConfirmButtonClass} onClick={onClick}>
      {label}
    </button>
  )
}

function ToastLines({
  lines,
  indentContinuation,
}: {
  lines: string[]
  indentContinuation?: boolean
}) {
  if (lines.length === 0) return null

  const [first, ...rest] = lines

  return (
    <>
      <p className={aceToastBodyClass}>{first}</p>
      {rest.map((line) => (
        <p
          key={line}
          className={indentContinuation ? aceToastIndentedBodyClass : aceToastBodyClass}
        >
          {line}
        </p>
      ))}
    </>
  )
}

function renderActions({
  layout,
  actionLabel,
  onAction,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
}: Pick<
  AceToastProps,
  'layout' | 'actionLabel' | 'onAction' | 'cancelLabel' | 'onCancel' | 'confirmLabel' | 'onConfirm'
>): ReactNode {
  const hasSingleAction =
    layout === 'action' || layout === 'multi-line-action'
  const hasDoubleAction =
    layout === 'double-action' || layout === 'multi-line-double-action'

  if (hasDoubleAction) {
    return (
      <div className={aceToastDoubleActionRowClass}>
        <ActionLink label={cancelLabel ?? 'Cancel'} onClick={onCancel} />
        <ConfirmButton label={confirmLabel ?? 'Confirm'} onClick={onConfirm} />
      </div>
    )
  }

  if (hasSingleAction) {
    return (
      <div className={aceToastActionRowClass}>
        <ActionLink label={actionLabel ?? 'Action'} onClick={onAction} />
      </div>
    )
  }

  return null
}

export function AceToast({
  tone = 'success',
  layout = 'default',
  title,
  message,
  onDismiss,
  dismissLabel = 'Dismiss toast',
  actionLabel,
  onAction,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
  className,
}: AceToastProps) {
  const lines = Array.isArray(message) ? message : [message]
  const isMultiLine = layout.startsWith('multi-line')
  const hasTitle = layout === 'default' && Boolean(title)
  const hasActions =
    layout === 'action' ||
    layout === 'double-action' ||
    layout === 'multi-line-action' ||
    layout === 'multi-line-double-action'
  const compactActionLayout = layout === 'action' || layout === 'double-action'

  if (hasTitle) {
    return (
      <div
        role="status"
        className={cn(aceToastShellClass, 'gap-[var(--ace-toast-gap)]', className)}
      >
        <div className={aceToastTopRowClass}>
          <div className={aceToastMessageRowClass}>
            <ToastStatusIcon tone={tone} />
            <p className={aceToastTitleClass}>{title}</p>
          </div>
          <DismissButton onDismiss={onDismiss} dismissLabel={dismissLabel} />
        </div>
        <ToastLines lines={lines} />
      </div>
    )
  }

  if (isMultiLine) {
    const [first, ...rest] = lines

    return (
      <div
        role="status"
        className={cn(aceToastShellClass, hasActions ? 'gap-[var(--ace-toast-gap)]' : '', className)}
      >
        <div className={aceToastTopRowClass}>
          <div className={aceToastMessageRowClass}>
            <ToastStatusIcon tone={tone} />
            <p className={aceToastBodyClass}>{first}</p>
          </div>
          <DismissButton onDismiss={onDismiss} dismissLabel={dismissLabel} />
        </div>
        {rest.map((line) => (
          <p key={line} className={aceToastIndentedBodyClass}>
            {line}
          </p>
        ))}
        {renderActions({
          layout,
          actionLabel,
          onAction,
          cancelLabel,
          onCancel,
          confirmLabel,
          onConfirm,
        })}
      </div>
    )
  }

  return (
    <div
      role="status"
      className={cn(
        aceToastShellClass,
        compactActionLayout && hasActions
          ? 'min-h-[6.25rem] justify-between gap-[var(--ace-toast-gap)]'
          : 'gap-[var(--ace-toast-gap)]',
        className,
      )}
    >
      <div className={aceToastTopRowClass}>
        <div className={aceToastMessageRowClass}>
          <ToastStatusIcon tone={tone} />
          <p className={aceToastBodyClass}>{lines[0]}</p>
        </div>
        <DismissButton onDismiss={onDismiss} dismissLabel={dismissLabel} />
      </div>
      {renderActions({
        layout,
        actionLabel,
        onAction,
        cancelLabel,
        onCancel,
        confirmLabel,
        onConfirm,
      })}
    </div>
  )
}
