import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Check, X } from 'lucide-react'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceToggleClass,
  aceToggleIconCheckClass,
  aceToggleIconXClass,
  aceToggleThumbClass,
  type AceToggleSize,
  type AceToggleVariant,
} from './toggleFieldStyles'

export type ToggleProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  size?: AceToggleSize
  /** Standard white thumb; icon shows white check / dark X in the track (same tokens as standard). */
  variant?: AceToggleVariant
}

export const Toggle = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, ToggleProps>(
  ({ className, size = 'md', variant = 'standard', ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(aceToggleClass(size, variant), variant === 'icon' && 'group', className)}
        {...props}
      >
        {variant === 'icon' ? (
          <>
            <span
              className="pointer-events-none absolute inset-y-0 left-0 flex w-1/2 items-center justify-center"
              aria-hidden
            >
              <Check
                className={cn(
                  aceToggleIconCheckClass[size],
                  'opacity-0 transition-opacity group-data-[state=checked]:opacity-100',
                )}
                strokeWidth={2}
              />
            </span>
            <span
              className="pointer-events-none absolute inset-y-0 right-0 flex w-1/2 items-center justify-center"
              aria-hidden
            >
              <X
                className={cn(
                  aceToggleIconXClass[size],
                  'opacity-100 transition-opacity group-data-[state=checked]:opacity-0',
                )}
                strokeWidth={2}
              />
            </span>
          </>
        ) : null}
        <SwitchPrimitive.Thumb className={aceToggleThumbClass(size)} />
      </SwitchPrimitive.Root>
    )
  },
)
Toggle.displayName = SwitchPrimitive.Root.displayName
