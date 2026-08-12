import { type HTMLAttributes, type ReactNode } from 'react'
import { MaterialSymbol } from '../AceAccordion/MaterialSymbol'
import { sidebarIconButtonClass } from '../../organisms/AceSidebar/sidebarRowActions'
import { cn } from '../../../lib/cn'
import {
  acePageHeaderLeadingClass,
  acePageHeaderShellClass,
  acePageHeaderTitleClass,
} from './pageHeaderFieldStyles'

export type AcePageHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
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
 * Application page header under the FinScan site nav — Review Assigned title bar
 * with optional sidebar panel control.
 */
export function AcePageHeader({
  title = 'Headline',
  showSidebarControl = false,
  sidebarOpen = false,
  onToggleSidebar,
  trailing,
  className,
  children,
  'aria-label': ariaLabel = 'Page header',
  ...rest
}: AcePageHeaderProps) {
  return (
    <header {...rest} aria-label={ariaLabel} className={cn(acePageHeaderShellClass, className)}>
      <div className={acePageHeaderLeadingClass}>
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
        <h1 className={acePageHeaderTitleClass}>{title}</h1>
      </div>
      {trailing ?? children}
    </header>
  )
}
