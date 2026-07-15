import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import { MaterialSymbol } from '../AceAccordion/MaterialSymbol'
import {
  aceInlineMessageClass,
  aceInlineMessageIconClass,
  aceInlineMessageIconName,
  aceInlineMessageTextClass,
  type AceInlineMessageTone,
} from './inlineMessageFieldStyles'

export type AceInlineMessageProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  tone?: AceInlineMessageTone
  /** Message body — Caption Regular (Figma). */
  children: ReactNode
}

/**
 * In-page / banner alert — Figma Inline Messages 4481:275.
 * Status icons match Iconography catalog + AceToast (check_circle, info, warning, error).
 */
export function AceInlineMessage({
  tone = 'info',
  children,
  className,
  role,
  ...props
}: AceInlineMessageProps) {
  return (
    <div
      role={role ?? (tone === 'error' ? 'alert' : 'status')}
      className={cn(aceInlineMessageClass(tone), className)}
      {...props}
    >
      <MaterialSymbol
        name={aceInlineMessageIconName[tone]}
        size="md"
        className={cn('shrink-0 text-[16px]', aceInlineMessageIconClass[tone])}
      />
      <span className={aceInlineMessageTextClass}>{children}</span>
    </div>
  )
}
