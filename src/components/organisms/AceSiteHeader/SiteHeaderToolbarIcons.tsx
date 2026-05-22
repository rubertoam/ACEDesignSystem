import type { SVGProps } from 'react'
import { cn } from '../../../lib/cn'

const iconColor = 'text-[var(--ace-site-header-toolbar-icon-color)]'

/** Bell — Figma Site Menu notifications (2468:1038) */
export function SiteHeaderNotificationIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 31.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn(
        iconColor,
        'block h-[var(--ace-site-header-icon-notifications-height)] w-[var(--ace-site-header-icon-notifications-width)] shrink-0',
        className,
      )}
      {...props}
    >
      <path
        d="M16 25.5C17.1 25.5 18 24.6 18 23.5H14C14 24.6 14.89 25.5 16 25.5ZM22 19.5V14.5C22 11.43 20.36 8.86 17.5 8.18V7.5C17.5 6.67 16.83 6 16 6C15.17 6 14.5 6.67 14.5 7.5V8.18C11.63 8.86 10 11.42 10 14.5V19.5L8 21.5V22.5H24V21.5L22 19.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Help in circle — Figma Site Menu help (2468:1044) */
export function SiteHeaderHelpIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn(
        iconColor,
        'block size-[var(--ace-site-header-icon-help-size)] shrink-0',
        className,
      )}
      {...props}
    >
      <path
        d="M17 8C12.032 8 8 12.032 8 17C8 21.968 12.032 26 17 26C21.968 26 26 21.968 26 17C26 12.032 21.968 8 17 8ZM17.9 23.3H16.1V21.5H17.9V23.3ZM19.763 16.325L18.953 17.153C18.305 17.81 17.9 18.35 17.9 19.7H16.1V19.25C16.1 18.26 16.505 17.36 17.153 16.703L18.269 15.569C18.602 15.245 18.8 14.795 18.8 14.3C18.8 13.31 17.99 12.5 17 12.5C16.01 12.5 15.2 13.31 15.2 14.3H13.4C13.4 12.311 15.011 10.7 17 10.7C18.989 10.7 20.6 12.311 20.6 14.3C20.6 15.092 20.276 15.812 19.763 16.325Z"
        fill="currentColor"
      />
    </svg>
  )
}
