import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../Accordion/MaterialSymbol'
import {
  toastMessageActionLinkClass,
  toastMessageActionLinkToneClass,
  toastMessageActionRowClass,
  toastMessageBodyClass,
  toastMessageConfirmButtonClass,
  toastMessageDismissButtonClass,
  toastMessageDismissIconClass,
  toastMessageDoubleActionRowClass,
  toastMessageIndentedBodyClass,
  toastMessageMessageRowClass,
  toastMessageProgressFillClass,
  toastMessageProgressFillToneClass,
  toastMessageProgressTrackClass,
  toastMessageProgressTrackToneClass,
  toastMessageShellClass,
  toastMessageTitleClass,
  toastMessageTopRowClass,
  type ToastMessageLayout,
  type ToastMessageTone,
} from './toastFieldStyles'

export type ToastMessageProps = {
  tone?: ToastMessageTone
  layout?: ToastMessageLayout
  /** Shown on the default layout for success-style toasts. */
  title?: string
  /** Single string, multiple lines (multi-line layouts), or rich content. */
  message: ReactNode | string | string[]
  onDismiss?: () => void
  dismissLabel?: string
  actionLabel?: string
  onAction?: () => void
  cancelLabel?: string
  onCancel?: () => void
  confirmLabel?: string
  onConfirm?: () => void
  /**
   * Optional countdown fill (0-1). Renders a tone-tinted bar along the bottom edge.
   * Product hosts own the timer; pass remaining/total each frame.
   */
  progress?: number
  className?: string
}

const toastStatusIconName: Record<ToastMessageTone, string> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

const toastStatusIconColor: Record<ToastMessageTone, string> = {
  success: 'text-[var(--toast-message-icon-success)]',
  info: 'text-[var(--toast-message-icon-info)]',
  warning: 'text-[var(--toast-message-icon-warning)]',
  error: 'text-[var(--toast-message-icon-error)]',
}

function ToastStatusIcon({ tone }: { tone: ToastMessageTone }) {
  return (
    <MaterialSymbol
      name={toastStatusIconName[tone]}
      size="md"
      className={cn('shrink-0', toastStatusIconColor[tone])}
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
      className={toastMessageDismissButtonClass}
      aria-label={dismissLabel}
      onClick={onDismiss}
    >
      <MaterialSymbol name="close" size="md" className={toastMessageDismissIconClass} />
    </button>
  )
}

function ActionLink({
  label,
  onClick,
  tone = 'success',
}: {
  label: string
  onClick?: () => void
  tone?: ToastMessageTone
}) {
  return (
    <button
      type="button"
      className={cn(toastMessageActionLinkClass, toastMessageActionLinkToneClass[tone])}
      onClick={onClick}
    >
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
    <button type="button" className={toastMessageConfirmButtonClass} onClick={onClick}>
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
      <p className={toastMessageBodyClass}>{first}</p>
      {rest.map((line) => (
        <p
          key={line}
          className={indentContinuation ? toastMessageIndentedBodyClass : toastMessageBodyClass}
        >
          {line}
        </p>
      ))}
    </>
  )
}

function ToastMessageBody({ message }: { message: ReactNode | string | string[] }) {
  if (Array.isArray(message)) {
    return <ToastLines lines={message} />
  }
  if (typeof message === 'string') {
    return <p className={toastMessageBodyClass}>{message}</p>
  }
  return <div className={toastMessageBodyClass}>{message}</div>
}

function renderActions({
  layout,
  tone,
  actionLabel,
  onAction,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
}: Pick<
  ToastMessageProps,
  | 'layout'
  | 'tone'
  | 'actionLabel'
  | 'onAction'
  | 'cancelLabel'
  | 'onCancel'
  | 'confirmLabel'
  | 'onConfirm'
>): ReactNode {
  const hasSingleAction =
    layout === 'action' ||
    layout === 'multi-line-action' ||
    (layout === 'default' && Boolean(actionLabel))
  const hasDoubleAction =
    layout === 'double-action' || layout === 'multi-line-double-action'

  if (hasDoubleAction) {
    return (
      <div className={toastMessageDoubleActionRowClass}>
        {/* Figma: Cancel is always brand purple; Confirm is the filled primary. */}
        <ActionLink label={cancelLabel ?? 'Cancel'} onClick={onCancel} tone="success" />
        <ConfirmButton label={confirmLabel ?? 'Confirm'} onClick={onConfirm} />
      </div>
    )
  }

  if (hasSingleAction) {
    return (
      <div className={toastMessageActionRowClass}>
        <ActionLink label={actionLabel ?? 'Action'} onClick={onAction} tone={tone} />
      </div>
    )
  }

  return null
}

function ToastProgress({ progress, tone }: { progress: number; tone: ToastMessageTone }) {
  const clamped = Math.min(1, Math.max(0, progress))
  return (
    <div
      className={cn(toastMessageProgressTrackClass, toastMessageProgressTrackToneClass[tone])}
      aria-hidden
    >
      <div
        className={cn(toastMessageProgressFillClass, toastMessageProgressFillToneClass[tone])}
        style={{ transform: `scaleX(${clamped})` }}
      />
    </div>
  )
}

export function ToastMessage({
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
  progress,
  className,
}: ToastMessageProps) {
  const lines = Array.isArray(message) ? message : null
  const isMultiLine = layout.startsWith('multi-line')
  const hasTitle = layout === 'default' && Boolean(title)
  const hasActions =
    layout === 'action' ||
    layout === 'double-action' ||
    layout === 'multi-line-action' ||
    layout === 'multi-line-double-action' ||
    (layout === 'default' && Boolean(actionLabel))
  const compactActionLayout = layout === 'action' || layout === 'double-action'
  const showProgress = typeof progress === 'number'

  const actions = renderActions({
    layout,
    tone,
    actionLabel,
    onAction,
    cancelLabel,
    onCancel,
    confirmLabel,
    onConfirm,
  })

  let body: ReactNode

  if (hasTitle) {
    body = (
      <>
        <div className={toastMessageTopRowClass}>
          <div className={toastMessageMessageRowClass}>
            <ToastStatusIcon tone={tone} />
            <p className={toastMessageTitleClass}>{title}</p>
          </div>
          <DismissButton onDismiss={onDismiss} dismissLabel={dismissLabel} />
        </div>
        <ToastMessageBody message={message} />
        {actions}
      </>
    )
  } else if (isMultiLine && lines) {
    const [first, ...rest] = lines
    body = (
      <>
        <div className={toastMessageTopRowClass}>
          <div className={toastMessageMessageRowClass}>
            <ToastStatusIcon tone={tone} />
            <p className={toastMessageBodyClass}>{first}</p>
          </div>
          <DismissButton onDismiss={onDismiss} dismissLabel={dismissLabel} />
        </div>
        {rest.map((line) => (
          <p key={line} className={toastMessageIndentedBodyClass}>
            {line}
          </p>
        ))}
        {actions}
      </>
    )
  } else {
    body = (
      <>
        <div className={toastMessageTopRowClass}>
          <div className={toastMessageMessageRowClass}>
            <ToastStatusIcon tone={tone} />
            {lines ? (
              <p className={toastMessageBodyClass}>{lines[0]}</p>
            ) : typeof message === 'string' ? (
              <p className={toastMessageBodyClass}>{message}</p>
            ) : (
              <div className={toastMessageBodyClass}>{message}</div>
            )}
          </div>
          <DismissButton onDismiss={onDismiss} dismissLabel={dismissLabel} />
        </div>
        {actions}
      </>
    )
  }

  return (
    <div
      role="status"
      className={cn(
        toastMessageShellClass,
        showProgress && 'gap-0 overflow-hidden',
        !showProgress &&
          (compactActionLayout && hasActions
            ? 'min-h-[6.25rem] justify-between gap-[var(--toast-message-gap)]'
            : 'gap-[var(--toast-message-gap)]'),
        className,
      )}
    >
      {showProgress ? (
        <>
          <div className="flex w-full flex-col gap-[var(--toast-message-gap)]">
            {body}
          </div>
          <div className="-mx-[var(--toast-message-px)] -mb-[var(--toast-message-py)] mt-[var(--toast-message-gap)]">
            <ToastProgress progress={progress!} tone={tone} />
          </div>
        </>
      ) : (
        body
      )}
    </div>
  )
}
