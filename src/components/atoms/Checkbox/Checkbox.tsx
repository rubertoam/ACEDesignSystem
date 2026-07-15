import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceCheckboxClass,
  aceCheckboxIconSizeClass,
  type AceCheckboxSize,
} from './checkboxFieldStyles'

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  /** Default is Small (16px). Data table uses Medium. */
  size?: AceCheckboxSize
}

/** Horizontal bar for indeterminate — Figma selected mark is a filled square, not a check. */
function IndeterminateGlyph({ className }: { className?: string }) {
  return (
    <span
      className={cn('rounded-full bg-current', className)}
      aria-hidden
    />
  )
}

export const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size = 'sm', ...props }, ref) => {
    const iconClass = aceCheckboxIconSizeClass[size]
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn('group peer shrink-0', aceCheckboxClass(size), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex size-full items-center justify-center text-current">
          {/* Checked: empty — purple fill + white inset ring come from root styles */}
          <IndeterminateGlyph
            className={cn(
              'opacity-0 transition-opacity duration-150 group-data-[state=indeterminate]:opacity-100',
              iconClass,
            )}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  },
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName
