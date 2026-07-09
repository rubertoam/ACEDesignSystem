import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceScreeningToolbarTooltipContentClass,
  aceTooltipArrowClass,
  aceTooltipContentClass,
} from './tooltipFieldStyles'

export type AceTooltipProviderProps = ComponentProps<typeof TooltipPrimitive.Provider>

export function AceTooltipProvider({ delayDuration = 0, ...props }: AceTooltipProviderProps) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
}

export type AceTooltipProps = ComponentProps<typeof TooltipPrimitive.Root>

export function AceTooltip({ children, ...props }: AceTooltipProps) {
  return (
    <AceTooltipProvider>
      <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
    </AceTooltipProvider>
  )
}

export type AceTooltipTriggerProps = ComponentProps<typeof TooltipPrimitive.Trigger>

export function AceTooltipTrigger(props: AceTooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="ace-tooltip-trigger" {...props} />
}

export type AceTooltipContentProps = ComponentProps<typeof TooltipPrimitive.Content> & {
  hideArrow?: boolean
  /** Review Assigned screening toolbar surface (caption regular, md radius, px-3 py-1.5). */
  variant?: 'default' | 'screening-toolbar'
}

export function AceTooltipContent({
  className,
  sideOffset = 4,
  hideArrow = false,
  variant = 'default',
  children,
  ...props
}: AceTooltipContentProps) {
  const contentClass =
    variant === 'screening-toolbar' ? aceScreeningToolbarTooltipContentClass : aceTooltipContentClass

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="ace-tooltip-content"
        sideOffset={sideOffset}
        className={cn(contentClass, className)}
        {...props}
      >
        {children}
        {hideArrow ? null : (
          <TooltipPrimitive.Arrow className={cn(aceTooltipArrowClass, 'size-2.5 translate-y-[calc(-50%-2px)]')} />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export type AceTooltipIconWrapProps = {
  children: ReactNode
  className?: string
}

/** Optional wrapper when the trigger is a disabled control (Review Assigned pattern). */
export function AceTooltipIconWrap({ children, className }: AceTooltipIconWrapProps) {
  return <span className={cn('inline-flex', className)}>{children}</span>
}
