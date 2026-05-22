import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceRadioControlClass,
  aceRadioIndicatorClass,
  aceRadioItemRootClass,
  type AceRadioSize,
} from './radioFieldStyles'

export const RadioGroup = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('outline-none', className)} {...props} />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export type RadioItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  size?: AceRadioSize
}

export const RadioItem = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Item>, RadioItemProps>(
  ({ className, size = 'md', children, ...props }, ref) => (
    <RadioGroupPrimitive.Item ref={ref} className={cn(aceRadioItemRootClass, className)} {...props}>
      <span className={aceRadioControlClass(size)}>
        <RadioGroupPrimitive.Indicator className={aceRadioIndicatorClass(size)} />
      </span>
      {children}
    </RadioGroupPrimitive.Item>
  ),
)
RadioItem.displayName = RadioGroupPrimitive.Item.displayName
