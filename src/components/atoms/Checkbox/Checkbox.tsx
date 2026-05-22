import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import { cn } from '../../../lib/cn'
import { aceCheckboxClass, type AceCheckboxSize } from './checkboxFieldStyles'

const iconSize: Record<AceCheckboxSize, string> = {
  sm: 'size-3 stroke-[3]',
  md: 'size-[0.875rem] stroke-[2.5]',
  lg: 'size-4 stroke-[2.5]',
}

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  /** Default matches data table (16px). */
  size?: AceCheckboxSize
}

export const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size = 'sm', ...props }, ref) => {
    const icn = iconSize[size]
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn('group peer shrink-0 outline-none', aceCheckboxClass(size), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="relative flex size-full items-center justify-center text-current">
          <Check
            className={cn(
              'absolute opacity-0 transition-opacity duration-150 group-data-[state=checked]:opacity-100 group-data-[state=indeterminate]:opacity-0',
              icn,
            )}
            aria-hidden
          />
          <Minus
            className={cn(
              'absolute opacity-0 transition-opacity duration-150 group-data-[state=indeterminate]:opacity-100',
              icn,
            )}
            aria-hidden
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  },
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName
