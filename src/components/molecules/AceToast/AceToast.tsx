import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../AceAccordion/MaterialSymbol'
import {
  aceToastActionLinkClass,
  aceToastActionRowClass,
  aceToastBodyClass,
  aceToastConfirmButtonClass,
  aceToastDismissButtonClass,
  aceToastDismissIconClass,
  aceToastDoubleActionRowClass,
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

const toastStatusIconName: Record<AceToastTone, string> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

const toastStatusIconColor: Record<AceToastTone, string> = {
  success: 'text-[var(--ace-toast-icon-success)]',
  info: 'text-[var(--ace-toast-icon-info)]',
  warning: 'text-[var(--ace-toast-icon-warning)]',
  error: 'text-[var(--ace-toast-icon-error)]',
}

function ToastStatusIcon({ tone }: { tone: AceToastTone }) {
  return (
    <MaterialSymbol
      name={toastStatusIconName[tone]}
      size="md"
      className={cn('shrink-0 text-[16px]', toastStatusIconColor[tone])}
    />
  )
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
      <MaterialSymbol name="close" size="md" className={aceToastDismissIconClass} />
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
