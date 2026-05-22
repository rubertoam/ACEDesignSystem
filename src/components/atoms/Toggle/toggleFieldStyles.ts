import { cn } from '../../../lib/cn'

export type AceToggleSize = 'sm' | 'md' | 'lg'

/** Track + interaction (Figma Toggles 117:1265; --ace-toggle-* tokens). */
export const aceToggleTrackClass =
  'relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-0 p-px outline-none transition-colors duration-200 ease-out disabled:cursor-not-allowed ' +
  'data-[state=unchecked]:bg-[var(--ace-toggle-track-off)] data-[state=checked]:bg-[var(--ace-toggle-track-on)] ' +
  'disabled:data-[state=unchecked]:bg-[var(--ace-toggle-track-disabled-off)] disabled:data-[state=checked]:bg-[var(--ace-toggle-track-disabled-on)] ' +
  'enabled:data-[state=unchecked]:hover:bg-[var(--ace-toggle-track-off-hover)] enabled:data-[state=checked]:hover:bg-[var(--ace-toggle-track-on-hover)] ' +
  'focus-visible:ring-2 focus-visible:ring-[var(--ace-toggle-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ace-toggle-ring-offset)]'

const aceToggleRootSize: Record<AceToggleSize, string> = {
  sm: 'h-2.5 w-5',
  md: 'h-[0.774rem] w-6',
  lg: 'h-3.5 w-7',
}

/** White thumb; translate matches track inner width minus thumb (2px horizontal padding via p-px). */
const aceToggleThumbSize: Record<AceToggleSize, string> = {
  sm:
    'pointer-events-none block size-2 rounded-full bg-[var(--ace-toggle-thumb)] shadow-[0_1px_2px_rgb(35_38_44_/0.12)] transition-transform duration-200 ease-out will-change-transform ' +
    'translate-x-0 data-[state=checked]:translate-x-[0.625rem]',
  md:
    'pointer-events-none block size-[0.625rem] rounded-full bg-[var(--ace-toggle-thumb)] shadow-[0_1px_2px_rgb(35_38_44_/0.12)] transition-transform duration-200 ease-out will-change-transform ' +
    'translate-x-0 data-[state=checked]:translate-x-3',
  lg:
    'pointer-events-none block size-3 rounded-full bg-[var(--ace-toggle-thumb)] shadow-[0_1px_2px_rgb(35_38_44_/0.12)] transition-transform duration-200 ease-out will-change-transform ' +
    'translate-x-0 data-[state=checked]:translate-x-[0.875rem]',
}

export function aceToggleClass(size: AceToggleSize = 'md'): string {
  return cn(aceToggleTrackClass, aceToggleRootSize[size])
}

export function aceToggleThumbClass(size: AceToggleSize = 'md'): string {
  return aceToggleThumbSize[size]
}
