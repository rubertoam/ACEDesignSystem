import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Input } from '../components/atoms/Input'
import { MaterialSymbol } from '../components/molecules/Accordion/MaterialSymbol'
import { SiteHeader } from '../components/organisms/SiteHeader/SiteHeader'
import { LabThemeProvider, type LabTheme } from '../contexts/LabThemeContext'
import { aceChevronIconClass } from '../lib/aceChevron'
import { cn } from '../lib/cn'
import {
  getLabNavFlat,
  getLabNavMatch,
  labNavBottomItems,
  labNavGuidelinesItem,
  labNavSections,
} from '../pages/labNav'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const navLinkBase =
  'block rounded-[var(--radius-md)] px-3 text-sm transition-colors [font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const topNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    navLinkBase,
    'py-2',
    isActive
      ? 'lab-nav-link-active font-semibold text-[var(--sidebar-item-selected-text)]'
      : 'text-[var(--screening-text-muted)] hover:bg-[var(--screening-surface-hover)] hover:text-[var(--screening-text-primary)]',
  )

/** Tight stack for Atoms / Molecules / Organisms child links. */
const sectionNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    navLinkBase,
    'py-1 leading-tight',
    isActive
      ? 'lab-nav-link-active font-semibold text-[var(--sidebar-item-selected-text)]'
      : 'text-[var(--screening-text-muted)] hover:bg-[var(--screening-surface-hover)] hover:text-[var(--screening-text-primary)]',
  )

const COLLAPSIBLE_SECTIONS = new Set(['Atoms', 'Molecules', 'Organisms'])

const navMotion =
  'transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:duration-0'
const chevronMotion =
  'transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:duration-0'

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  return Boolean(target.closest('[role="textbox"], [role="combobox"], [role="menu"], [role="listbox"]'))
}

function LabThemeToggle({
  theme,
  onThemeChange,
}: {
  theme: LabTheme
  onThemeChange: (theme: LabTheme) => void
}) {
  const isDark = theme === 'dark'

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        'relative inline-grid h-8 max-w-full shrink-0 grid-cols-2 items-center gap-0.5 overflow-hidden rounded-full p-0.5',
        'border border-solid border-[var(--color-border-default)]',
        'bg-[color-mix(in_srgb,var(--color-bg-secondary)_88%,transparent)]',
        'shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-surface-primary)_55%,transparent)]',
        'transition-[background-color,border-color]',
        'duration-[var(--ace-motion-duration-medium)]',
        '[transition-timing-function:var(--ace-motion-ease-standard)]',
      )}
    >
      {/* Sliding thumb — pin left/right so it never overflows the track */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0.5 rounded-full',
          'transition-[left,right] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]',
          'motion-reduce:transition-none',
          isDark ? 'left-[calc(50%+1px)] right-0.5' : 'left-0.5 right-[calc(50%+1px)]',
          isDark
            ? 'bg-[linear-gradient(145deg,#0c4a6e_0%,#0369a1_52%,#0ea5e9_100%)]'
            : 'bg-[linear-gradient(145deg,#fbbf24_0%,#f59e0b_55%,#f97316_100%)]',
        )}
      />

      <button
        type="button"
        aria-pressed={!isDark}
        aria-label="Light theme"
        onClick={() => onThemeChange('light')}
        className={cn(
          'relative z-[1] inline-flex h-7 items-center justify-center gap-1 rounded-full px-2.5',
          '[font:var(--ace-type-caption-semi-bold)] [letter-spacing:var(--ace-type-caption-semi-bold-tracking)]',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--screening-primary-ring)]',
          !isDark ? 'text-[#1c1917]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
        )}
      >
        <MaterialSymbol
          name="light_mode"
          size="sm"
          className={cn(
            'transition-transform duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]',
            !isDark ? 'rotate-0 scale-110 text-[#1c1917]' : 'rotate-[-20deg] scale-95 opacity-70',
          )}
        />
        <span>Light</span>
      </button>

      <button
        type="button"
        aria-pressed={isDark}
        aria-label="Dark theme"
        onClick={() => onThemeChange('dark')}
        className={cn(
          'relative z-[1] inline-flex h-7 items-center justify-center gap-1 rounded-full px-2.5',
          '[font:var(--ace-type-caption-semi-bold)] [letter-spacing:var(--ace-type-caption-semi-bold-tracking)]',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--screening-primary-ring)]',
          isDark ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
        )}
      >
        <MaterialSymbol
          name="dark_mode"
          size="sm"
          className={cn(
            'transition-transform duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]',
            isDark ? 'rotate-0 scale-110 text-white' : 'rotate-[18deg] scale-95 opacity-70',
          )}
        />
        <span>Dark</span>
      </button>
    </div>
  )
}

export function LabLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [theme, setTheme] = useState<LabTheme>('dark')
  const [navQuery, setNavQuery] = useState('')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Atoms: false,
    Molecules: false,
    Organisms: false,
  })

  const navQueryNormalized = navQuery.trim().toLowerCase()
  const isFiltering = navQueryNormalized.length > 0

  const showGuidelines =
    !isFiltering || labNavGuidelinesItem.label.toLowerCase().includes(navQueryNormalized)
  const filteredBottomItems = useMemo(() => {
    if (!isFiltering) return labNavBottomItems
    return labNavBottomItems.filter((item) => item.label.toLowerCase().includes(navQueryNormalized))
  }, [isFiltering, navQueryNormalized])
  const showBottomNav = filteredBottomItems.length > 0

  const filteredSections = useMemo(() => {
    if (!isFiltering) return labNavSections
    return labNavSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.label.toLowerCase().includes(navQueryNormalized) ||
            section.title.toLowerCase().includes(navQueryNormalized),
        ),
      }))
      .filter((section) => section.items.length > 0)
  }, [isFiltering, navQueryNormalized])

  const toggleSection = useCallback((title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }, [])

  const setSectionOpen = useCallback((title: string, open: boolean) => {
    setOpenSections((prev) => (prev[title] === open ? prev : { ...prev, [title]: open }))
  }, [])

  useEffect(() => {
    const match = getLabNavMatch(pathname)
    if (match && COLLAPSIBLE_SECTIONS.has(match.section)) {
      setOpenSections((prev) => ({ ...prev, [match.section]: true }))
    }
  }, [pathname])

  /** While filtering, keep matching sections expanded. */
  useEffect(() => {
    if (!isFiltering) return
    setOpenSections((prev) => {
      const next = { ...prev }
      let changed = false
      for (const section of filteredSections) {
        if (COLLAPSIBLE_SECTIONS.has(section.title) && !next[section.title]) {
          next[section.title] = true
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [filteredSections, isFiltering])

  /** Apply theme on <html> so portaled menus/modals inherit dark tokens everywhere. */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    return () => {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.style.colorScheme = ''
    }
  }, [theme])

  /** ← / → page through lab routes (skip when typing or a modal is open). */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (isTypingTarget(event.target)) return
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return

      const focusEl = event.target instanceof HTMLElement ? event.target : null
      // Section headers use ←/→ to collapse / expand instead of paging.
      if (focusEl?.matches('button[data-lab-nav-section]')) return

      const pages = getLabNavFlat()
      const index = pages.findIndex((p) => p.to === pathname)
      if (index < 0) return

      const nextIndex = event.key === 'ArrowRight' ? index + 1 : index - 1
      if (nextIndex < 0 || nextIndex >= pages.length) return

      event.preventDefault()
      const next = pages[nextIndex]
      if (COLLAPSIBLE_SECTIONS.has(next.section)) {
        setSectionOpen(next.section, true)
      }
      navigate(next.to)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate, pathname, setSectionOpen])

  return (
    <LabThemeProvider theme={theme}>
    <div
      className="lab-shell flex min-h-screen flex-col"
      data-theme={theme}
      style={{ colorScheme: theme }}
    >
      <SiteHeader
        className="lab-header-band !h-auto min-h-[var(--site-header-height)] overflow-hidden"
        navItems={[]}
        userName=""
        showNotifications={false}
        showHelp={false}
        showProfile={false}
        trailing={<LabThemeToggle theme={theme} onThemeChange={setTheme} />}
      />
      <div className="flex min-h-0 flex-1">
      <aside
        className="lab-sidebar flex w-60 shrink-0 flex-col border-r border-solid border-[var(--screening-border-strong)] p-4"
        aria-label="Lab navigation"
      >
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <div className="mb-6 px-2">
          <p className="lab-brand-mark m-0 text-xl">ACE Design System</p>
        </div>
        <ul className="m-0 mb-3 list-none space-y-1 p-0">
          {showGuidelines ? (
            <li>
              <NavLink to={labNavGuidelinesItem.to} className={topNavLinkClass} end>
                {labNavGuidelinesItem.label}
              </NavLink>
            </li>
          ) : null}
        </ul>
        {/* Outside overflow-y nav so focus ring / active chrome is not clipped */}
        <div className="mb-4 p-0.5">
          <Input
            fieldSize="sm"
            icon="left"
            placeholder="Search"
            value={navQuery}
            onChange={(e) => setNavQuery(e.target.value)}
            onClear={() => setNavQuery('')}
            aria-label="Search lab navigation"
          />
        </div>
        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-[20px]">
          {filteredSections.map((section) => {
            const isOpen = isFiltering ? true : (openSections[section.title] ?? false)
            const headingId = `lab-nav-${section.title.toLowerCase().replace(/\s+/g, '-')}`

            return (
              <div key={section.title}>
                <button
                  type="button"
                  id={headingId}
                  data-lab-nav-section={section.title}
                  aria-expanded={isOpen}
                  aria-controls={`${headingId}-links`}
                  onClick={() => toggleSection(section.title)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggleSection(section.title)
                      return
                    }
                    if (event.key === 'ArrowRight') {
                      event.preventDefault()
                      setSectionOpen(section.title, true)
                      return
                    }
                    if (event.key === 'ArrowLeft') {
                      event.preventDefault()
                      setSectionOpen(section.title, false)
                    }
                  }}
                  className={cn(
                    p1,
                    'mb-0 flex w-full items-center gap-2 rounded-[var(--radius-md)] px-2 py-1 text-left text-sm font-semibold',
                    'text-[var(--screening-text-muted)] transition-colors hover:bg-[var(--screening-surface-hover)] hover:text-[var(--screening-text-primary)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--screening-surface)]',
                  )}
                >
                  <MaterialSymbol
                    name="keyboard_arrow_right"
                    size="md"
                    className={cn(aceChevronIconClass, 'opacity-70', chevronMotion, isOpen && 'rotate-90')}
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
              </div>
            )
          })}
          </div>
          {showBottomNav ? (
            <>
              <div
                className="my-6 border-t border-solid border-[var(--screening-border-strong)]"
                role="separator"
                aria-hidden
              />
              <ul className="m-0 list-none space-y-1 p-0">
                {filteredBottomItems.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className={topNavLinkClass} end={item.to === '/lab/layouts'}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {isFiltering && !showGuidelines && filteredSections.length === 0 && !showBottomNav ? (
            <p className="m-0 px-2 text-sm text-[var(--screening-text-muted)]">No matches</p>
          ) : null}
        </nav>
        </div>
      </aside>
        <main className="lab-main min-w-0 flex-1 overflow-y-auto px-6 py-8 sm:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
    </LabThemeProvider>
  )
}
