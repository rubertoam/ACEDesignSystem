import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { forwardRef, type ComponentProps, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceScreeningToolbarTooltipContentClass,
  tooltipArrowClass,
  tooltipContentClass,
} from './tooltipFieldStyles'

export type TooltipProviderProps = ComponentProps<typeof TooltipPrimitive.Provider>

export function TooltipProvider({ delayDuration = 0, ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
}

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root>

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
    </TooltipProvider>
  )
}

export type TooltipTriggerProps = ComponentProps<typeof TooltipPrimitive.Trigger>

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="ace-tooltip-trigger" {...props} />
}

export type TooltipContentProps = ComponentProps<typeof TooltipPrimitive.Content> & {
  hideArrow?: boolean
  /** Review Assigned screening toolbar surface (caption regular, md radius, px-3 py-1.5). */
  variant?: 'default' | 'screening-toolbar'
}

export function TooltipContent({
  className,
  sideOffset = 4,
  hideArrow = false,
  variant = 'default',
  children,
  ...props
}: TooltipContentProps) {
  const contentClass =
    variant === 'screening-toolbar' ? aceScreeningToolbarTooltipContentClass : tooltipContentClass

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
          <TooltipPrimitive.Arrow className={cn(tooltipArrowClass, 'size-2.5 translate-y-[calc(-50%-2px)]')} />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export type TooltipIconWrapProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLSpanElement>

/** Optional wrapper when the trigger is a disabled control (Review Assigned pattern). */
export const TooltipIconWrap = forwardRef<HTMLSpanElement, TooltipIconWrapProps>(
  function TooltipIconWrap({ children, className, ...props }, ref) {
    return (
      <span ref={ref} className={cn('inline-flex', className)} {...props}>
        {children}
      </span>
    )
  },
)
