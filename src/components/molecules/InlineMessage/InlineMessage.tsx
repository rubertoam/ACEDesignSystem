import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../Accordion/MaterialSymbol'
import {
  inlineMessageClass,
  inlineMessageIconClass,
  inlineMessageIconName,
  inlineMessageTextClass,
  type InlineMessageTone,
} from './inlineMessageFieldStyles'

export type InlineMessageProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  tone?: InlineMessageTone
  /** Message body — Caption Regular (Figma). */
  children: ReactNode
}

/**
 * In-page / banner alert — Figma Inline Messages 4481:275.
 * Status icons match Iconography catalog + ToastMessage (check_circle, info, warning, error).
 */
export function InlineMessage({
  tone = 'info',
  children,
  className,
  role,
  ...props
}: InlineMessageProps) {
  return (
    <div
      role={role ?? (tone === 'error' ? 'alert' : 'status')}
      className={cn(inlineMessageClass(tone), className)}
      {...props}
    >
      <MaterialSymbol
        name={inlineMessageIconName[tone]}
        size="md"
        className={cn('shrink-0', inlineMessageIconClass[tone])}
      />
      <span className={inlineMessageTextClass}>{children}</span>
    </div>
  )
}
