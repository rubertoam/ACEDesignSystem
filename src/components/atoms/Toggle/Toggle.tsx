import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import { cn } from '../../../lib/cn'
import { aceToggleClass, aceToggleThumbClass, type AceToggleSize } from './toggleFieldStyles'

export type ToggleProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  /** Default matches Figma reference (~24×12.4px track). */
  size?: AceToggleSize
}

export const Toggle = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, ToggleProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <SwitchPrimitive.Root ref={ref} className={cn(aceToggleClass(size), className)} {...props}>
        <SwitchPrimitive.Thumb className={aceToggleThumbClass(size)} />
      </SwitchPrimitive.Root>
    )
  },
)
Toggle.displayName = SwitchPrimitive.Root.displayName
