import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../AceAccordion/MaterialSymbol'
import {
  aceToastActionLinkClass,
  aceToastActionLinkToneClass,
  aceToastActionRowClass,
  aceToastBodyClass,
  aceToastConfirmButtonClass,
  aceToastDismissButtonClass,
  aceToastDismissIconClass,
  aceToastDoubleActionRowClass,
  aceToastIndentedBodyClass,
  aceToastMessageRowClass,
  aceToastProgressFillClass,
  aceToastProgressFillToneClass,
  aceToastProgressTrackClass,
  aceToastProgressTrackToneClass,
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
   * Optional countdown fill (0–1). Renders a tone-tinted bar along the bottom edge.
   * Product hosts own the timer; pass remaining/total each frame.
   */
  progress?: number
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
  tone = 'success',
}: {
  label: string
  onClick?: () => void
  tone?: AceToastTone
}) {
  return (
    <button
      type="button"
      className={cn(aceToastActionLinkClass, aceToastActionLinkToneClass[tone])}
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

function ToastMessageBody({ message }: { message: ReactNode | string | string[] }) {
  if (Array.isArray(message)) {
    return <ToastLines lines={message} />
  }
  if (typeof message === 'string') {
    return <p className={aceToastBodyClass}>{message}</p>
  }
  return <div className={aceToastBodyClass}>{message}</div>
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
  AceToastProps,
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
      <div className={aceToastDoubleActionRowClass}>
        <ActionLink label={cancelLabel ?? 'Cancel'} onClick={onCancel} tone={tone} />
        <ConfirmButton label={confirmLabel ?? 'Confirm'} onClick={onConfirm} />
      </div>
    )
  }

  if (hasSingleAction) {
    return (
      <div className={aceToastActionRowClass}>
        <ActionLink label={actionLabel ?? 'Action'} onClick={onAction} tone={tone} />
      </div>
    )
  }

  return null
}

function ToastProgress({ progress, tone }: { progress: number; tone: AceToastTone }) {
  const clamped = Math.min(1, Math.max(0, progress))
  return (
    <div
      className={cn(aceToastProgressTrackClass, aceToastProgressTrackToneClass[tone])}
      aria-hidden
    >
      <div
        className={cn(aceToastProgressFillClass, aceToastProgressFillToneClass[tone])}
        style={{ transform: `scaleX(${clamped})` }}
      />
    </div>
  )
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
  progress,
  className,
}: AceToastProps) {
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
        <div className={aceToastTopRowClass}>
          <div className={aceToastMessageRowClass}>
            <ToastStatusIcon tone={tone} />
            <p className={aceToastTitleClass}>{title}</p>
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
        {actions}
      </>
    )
  } else {
    body = (
      <>
        <div className={aceToastTopRowClass}>
          <div className={aceToastMessageRowClass}>
            <ToastStatusIcon tone={tone} />
            {lines ? (
              <p className={aceToastBodyClass}>{lines[0]}</p>
            ) : typeof message === 'string' ? (
              <p className={aceToastBodyClass}>{message}</p>
            ) : (
              <div className={aceToastBodyClass}>{message}</div>
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
        aceToastShellClass,
        showProgress && 'gap-0 overflow-hidden',
        !showProgress &&
          (compactActionLayout && hasActions
            ? 'min-h-[6.25rem] justify-between gap-[var(--ace-toast-gap)]'
            : 'gap-[var(--ace-toast-gap)]'),
        className,
      )}
    >
      {showProgress ? (
        <>
          <div className="flex w-full flex-col gap-[var(--ace-toast-gap)]">
            {body}
          </div>
          <div className="-mx-[var(--ace-toast-px)] -mb-[var(--ace-toast-py)] mt-[var(--ace-toast-gap)]">
            <ToastProgress progress={progress!} tone={tone} />
          </div>
        </>
      ) : (
        body
      )}
    </div>
  )
}
