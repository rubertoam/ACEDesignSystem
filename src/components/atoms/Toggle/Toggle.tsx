import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import { cn } from '../../../lib/cn'
import {
  aceToggleClass,
  aceToggleIconCheckClass,
  aceToggleIconGlyphMotion,
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

/** Compact stroke icons — Material Symbols stay too large in the track half. */
function ToggleCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.2 5 8.6 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ToggleCloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3.25 3.25 8.75 8.75M8.75 3.25 3.25 8.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const Toggle = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, ToggleProps>(
  ({ className, size = 'md', variant = 'standard', ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(aceToggleClass(size, variant), className)}
        {...props}
      >
        {variant === 'icon' ? (
          <>
            <span
              className="pointer-events-none absolute inset-y-0 left-0 flex w-1/2 items-center justify-center"
              aria-hidden
            >
              <ToggleCheckIcon
                className={cn(
                  aceToggleIconCheckClass[size],
                  aceToggleIconGlyphMotion,
                  'opacity-0 group-data-[state=checked]:opacity-100',
                )}
              />
            </span>
            <span
              className="pointer-events-none absolute inset-y-0 right-0 flex w-1/2 items-center justify-center"
              aria-hidden
            >
              <ToggleCloseIcon
                className={cn(
                  aceToggleIconXClass[size],
                  aceToggleIconGlyphMotion,
                  'opacity-100 group-data-[state=checked]:opacity-0',
                )}
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
