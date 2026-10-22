import { type ReactNode } from 'react'
import { MaterialSymbol } from '../../molecules/Accordion/MaterialSymbol'
import { aceChevronIconClass } from '../../../lib/aceChevron'
import { cn } from '../../../lib/cn'
import { FinScanLogo } from './FinScanLogo'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'
const captionBold =
  '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]'

const motionEase = '[transition-timing-function:var(--ace-motion-ease-standard)]'

export type SiteHeaderNavItem = {
  id: string
  label: string
  /** Shows dropdown chevron (default true for top-level site menu items) */
  showChevron?: boolean
  href?: string
  onSelect?: () => void
}

export type SiteHeaderProps = {
  /** Visible navigation entries (parent controls which items are enabled) */
  navItems?: SiteHeaderNavItem[]
  userName?: string
  showNotifications?: boolean
  showHelp?: boolean
  showProfile?: boolean
  profileImageUrl?: string
  profileInitials?: string
  onNotificationsClick?: () => void
  onHelpClick?: () => void
  onProfileClick?: () => void
  /** Renders in the top-right actions area (e.g. theme toggle). */
  trailing?: ReactNode
  className?: string
  children?: ReactNode
}

function SiteHeaderNavButton({
  item,
}: {
  item: SiteHeaderNavItem
}) {
  const showChevron = item.showChevron !== false
  const className = cn(
    p1,
    'inline-flex h-full min-h-[2rem] items-center gap-2 rounded-[var(--radius-sm)] px-3 py-1.5 text-[var(--color-text-primary)]',
    'transition-colors duration-[var(--ace-motion-duration-fast)]',
    motionEase,
    'hover:bg-[var(--site-header-nav-hover)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
  )

  const content = (
    <>
      <span>{item.label}</span>
      {showChevron ? (
        <MaterialSymbol name="keyboard_arrow_down" className={aceChevronIconClass} />
      ) : null}
    </>
  )

  if (item.href) {
    return (
      <a href={item.href} className={className} onClick={item.onSelect}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={className} onClick={item.onSelect}>
      {content}
    </button>
  )
}

function ToolbarIconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'inline-flex size-[1.5rem] shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--screening-text-primary)]',
        'transition-colors duration-[var(--ace-motion-duration-fast)]',
        motionEase,
        'hover:bg-[var(--site-header-nav-hover)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
      )}
    >
      {children}
    </button>
  )
}

export function SiteHeader({
  navItems = [],
  userName = 'User Name',
  showNotifications = true,
  showHelp = true,
  showProfile = true,
  profileImageUrl,
  profileInitials = 'UN',
  onNotificationsClick,
  onHelpClick,
  onProfileClick,
  trailing,
  className,
  children,
}: SiteHeaderProps) {
  const greeting = userName ? `Hi, ${userName}` : null
  const showActionsRegion = Boolean(
    greeting || showNotifications || showHelp || showProfile || trailing,
  )

  return (
    <header
      className={cn(
        'flex h-[var(--site-header-height)] w-full shrink-0 items-center justify-between',
        'border-b-[0.5px] border-solid border-[var(--site-header-border)] bg-[var(--site-header-surface)]',
        'box-border px-[var(--site-header-px)] py-[var(--site-header-py)]',
        className,
      )}
    >
      <div className="flex min-h-0 min-w-0 flex-1 items-center gap-[var(--site-header-nav-gap)]">
        <FinScanLogo />
        {navItems.length > 0 ? (
          <nav
            className="flex h-full min-w-0 items-center"
            aria-label="Site navigation"
          >
            {navItems.map((item) => (
              <SiteHeaderNavButton key={item.id} item={item} />
            ))}
          </nav>
        ) : null}
        {children}
      </div>

      {showActionsRegion ? (
      <div className="flex shrink-0 items-center gap-[var(--site-header-actions-gap)]">
        {greeting ? (
          <p
            className={cn(
              captionBold,
              'm-0 text-center text-[var(--site-header-greeting-color)]',
            )}
          >
            {greeting}
          </p>
        ) : null}
        <div className="flex items-center gap-[var(--site-header-toolbar-gap)] overflow-visible py-1">
          {showNotifications ? (
            <ToolbarIconButton label="Notifications" onClick={onNotificationsClick}>
              <MaterialSymbol
                name="notifications"
                size="xl"
                className="text-[var(--site-header-toolbar-icon-color)]"
                style={{
                  fontSize: 'var(--site-header-icon-notifications-height)',
                  width: 'var(--site-header-icon-notifications-width)',
                  height: 'var(--site-header-icon-notifications-height)',
                }}
              />
            </ToolbarIconButton>
          ) : null}
          {showHelp ? (
            <ToolbarIconButton label="Help" onClick={onHelpClick}>
              <MaterialSymbol
                name="help"
                size="xl"
                className="text-[var(--site-header-toolbar-icon-color)]"
                style={{
                  fontSize: 'var(--site-header-icon-help-size)',
                  width: 'var(--site-header-icon-help-size)',
                  height: 'var(--site-header-icon-help-size)',
                }}
              />
            </ToolbarIconButton>
          ) : null}
          {showProfile ? (
            <button
              type="button"
              aria-label="User profile"
              onClick={onProfileClick}
              className={cn(
                'inline-flex shrink-0 rounded-full p-1 transition-colors duration-[var(--ace-motion-duration-fast)]',
                motionEase,
                'hover:bg-[var(--site-header-nav-hover)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
              )}
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt=""
                  className="size-8 rounded-full object-cover"
                />
              ) : (
                <span
                  className={cn(
                    captionBold,
                    'inline-flex size-8 items-center justify-center rounded-full bg-[var(--screening-surface-muted)] text-[var(--color-text-primary)]',
                  )}
                >
                  {profileInitials}
                </span>
              )}
            </button>
          ) : null}
          {trailing}
        </div>
      </div>
      ) : null}
    </header>
  )
}
