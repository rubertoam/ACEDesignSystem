import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AceSiteHeader } from '../components/organisms/AceSiteHeader/AceSiteHeader'
import { LabThemeProvider, type LabTheme } from '../contexts/LabThemeContext'
import { aceChevronIconClass } from '../lib/aceChevron'
import { cn } from '../lib/cn'
import { LabSegmentedToggle } from '../lib/labControls'
import { getLabNavMatch, labNavGuidelinesItem, labNavSections } from '../pages/labNav'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const navLinkBase =
  'block rounded-[var(--radius-md)] px-3 text-sm transition-colors [font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const topNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    navLinkBase,
    'py-2',
    isActive
      ? 'bg-[var(--screening-primary-soft-bg)] font-semibold text-[var(--ace-sidebar-item-selected-text)] ring-1 ring-inset ring-[var(--screening-border-strong)]'
      : 'text-[var(--screening-text-muted)] hover:bg-[var(--screening-surface-hover)] hover:text-[var(--screening-text-primary)]',
  )

/** Tight stack for Atoms / Molecules / Organisms child links. */
const sectionNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    navLinkBase,
    'py-1 leading-tight',
    isActive
      ? 'bg-[var(--screening-primary-soft-bg)] font-semibold text-[var(--ace-sidebar-item-selected-text)] ring-1 ring-inset ring-[var(--screening-border-strong)]'
      : 'text-[var(--screening-text-muted)] hover:bg-[var(--screening-surface-hover)] hover:text-[var(--screening-text-primary)]',
  )

const COLLAPSIBLE_SECTIONS = new Set(['Atoms', 'Molecules', 'Organisms'])

const navMotion =
  'transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:duration-0'
const chevronMotion =
  'transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:duration-0'

function LabThemeToggle({
  theme,
  onThemeChange,
}: {
  theme: LabTheme
  onThemeChange: (theme: LabTheme) => void
}) {
  return (
    <LabSegmentedToggle
      aria-label="Site theme"
      value={theme}
      onChange={onThemeChange}
      options={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ]}
    />
  )
}

export function LabLayout() {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState<LabTheme>('light')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Atoms: false,
    Molecules: false,
    Organisms: false,
  })

  useEffect(() => {
    const match = getLabNavMatch(pathname)
    if (match && COLLAPSIBLE_SECTIONS.has(match.section)) {
      setOpenSections((prev) => ({ ...prev, [match.section]: true }))
    }
  }, [pathname])

  /** Apply theme on <html> so portaled menus/modals inherit dark tokens everywhere. */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    return () => {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.style.colorScheme = ''
    }
  }, [theme])

  return (
    <LabThemeProvider theme={theme}>
    <div
      className="flex min-h-screen flex-col bg-[var(--screening-surface-muted)]"
      data-theme={theme}
      style={{ colorScheme: theme }}
    >
      <AceSiteHeader
        navItems={[]}
        userName=""
        showNotifications={false}
        showHelp={false}
        showProfile={false}
        trailing={<LabThemeToggle theme={theme} onThemeChange={setTheme} />}
      />
      <div className="flex min-h-0 flex-1">
      <aside
        className="flex w-60 shrink-0 flex-col border-r border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] p-4 shadow-[var(--ace-sidebar-shadow)]"
        aria-label="Lab navigation"
      >
        <div className="mb-6 px-2">
          <p
            className={cn(
              'm-0 [font:var(--ace-type-heading-h6-bold)] [letter-spacing:var(--ace-type-heading-h6-bold-tracking)]',
              'text-base text-[var(--screening-text-primary)]',
            )}
          >
            ACE Design System
          </p>
        </div>
        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <ul className="m-0 mb-6 list-none space-y-1 p-0">
            <li>
              <NavLink to={labNavGuidelinesItem.to} className={topNavLinkClass} end>
                {labNavGuidelinesItem.label}
              </NavLink>
            </li>
          </ul>
          <div className="flex flex-col gap-[20px]">
          {labNavSections.map((section) => {
            const collapsible = COLLAPSIBLE_SECTIONS.has(section.title)
            const isOpen = collapsible ? (openSections[section.title] ?? false) : true
            const headingId = `lab-nav-${section.title.toLowerCase().replace(/\s+/g, '-')}`

            return (
              <div key={section.title}>
                {collapsible ? (
                  <>
                    <button
                      type="button"
                      id={headingId}
                      aria-expanded={isOpen}
                      aria-controls={`${headingId}-links`}
                      onClick={() =>
                        setOpenSections((prev) => ({
                          ...prev,
                          [section.title]: !prev[section.title],
                        }))
                      }
                      className={cn(
                        p1,
                        'mb-0 flex w-full items-center gap-2 rounded-[var(--radius-md)] px-2 py-1 text-left text-sm font-semibold',
                        'text-[var(--screening-text-muted)] transition-colors hover:bg-[var(--screening-surface-hover)] hover:text-[var(--screening-text-primary)]',
                      )}
                    >
                      <ChevronRight
                        className={cn(aceChevronIconClass, 'opacity-70', chevronMotion, isOpen && 'rotate-90')}
                        aria-hidden
                      />
                      <span>{section.title}</span>
                    </button>
                    <div className={cn('grid', navMotion, isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                      <div className="min-h-0 overflow-hidden" inert={!isOpen ? true : undefined}>
                        <ul id={`${headingId}-links`} className="m-0 list-none p-0" aria-labelledby={headingId}>
                          {section.items.map((item) => (
                            <li key={item.to} className="m-0 p-0">
                              <NavLink
                                to={item.to}
                                className={sectionNavLinkClass}
                                end={
                                  item.to === '/lab' ||
                                  item.to === '/lab/atoms' ||
                                  item.to === '/lab/molecules' ||
                                  item.to === '/lab/organisms'
                                }
                              >
                                {item.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      id={headingId}
                      className={cn(
                        p1,
                        'mb-0 px-2 py-1 text-sm font-semibold text-[var(--screening-text-muted)]',
                      )}
                    >
                      {section.title}
                    </p>
                    <ul className="m-0 list-none p-0" aria-labelledby={headingId}>
                      {section.items.map((item) => (
                        <li key={item.to} className="m-0 p-0">
                          <NavLink to={item.to} className={sectionNavLinkClass} end={item.to === '/lab'}>
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )
          })}
          </div>
        </nav>
      </aside>
        <main className="min-w-0 flex-1 overflow-y-auto px-6 py-8 sm:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
    </LabThemeProvider>
  )
}
