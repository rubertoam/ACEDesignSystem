import { type HTMLAttributes, type ReactNode } from 'react'
import { MaterialSymbol } from '../Accordion/MaterialSymbol'
import { sidebarIconButtonClass } from '../../organisms/Sidebar/sidebarRowActions'
import { cn } from '../../../lib/cn'
import {
  pageHeaderLeadingClass,
  pageHeaderShellClass,
  pageHeaderTitleClass,
} from './pageHeaderFieldStyles'

export type PageHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Page title. Default `Headline`. */
  title?: ReactNode
  /** Show the sidebar open/close control (Review Assigned). */
  showSidebarControl?: boolean
  /** Whether the sidebar is currently open (controls icon + aria). */
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
  /** Optional trailing content after the title cluster. */
  trailing?: ReactNode
  /** Accessible name for the header landmark. */
  'aria-label'?: string
}

/**
 * Application page header under the FinScan site nav - Review Assigned title bar
 * with optional sidebar panel control.
 */
export function PageHeader({
  title = 'Headline',
  showSidebarControl = false,
  sidebarOpen = false,
  onToggleSidebar,
  trailing,
  className,
  children,
  'aria-label': ariaLabel = 'Page header',
  ...rest
}: PageHeaderProps) {
  return (
    <header {...rest} aria-label={ariaLabel} className={cn(pageHeaderShellClass, className)}>
      <div className={pageHeaderLeadingClass}>
        {showSidebarControl ? (
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={sidebarOpen}
            className={sidebarIconButtonClass}
          >
            <MaterialSymbol
              name={sidebarOpen ? 'left_panel_close' : 'left_panel_open'}
              size="md"
              className="text-current"
            />
          </button>
        ) : null}
        <h1 className={pageHeaderTitleClass}>{title}</h1>
      </div>
      {trailing ?? children}
    </header>
  )
}
