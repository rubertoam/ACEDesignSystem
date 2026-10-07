import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AceInputField } from '../components/atoms/AceInputField'
import { MaterialSymbol } from '../components/molecules/AceAccordion/MaterialSymbol'
import { AceSiteHeader } from '../components/organisms/AceSiteHeader/AceSiteHeader'
import { LabThemeProvider, type LabTheme } from '../contexts/LabThemeContext'
import { aceChevronIconClass } from '../lib/aceChevron'
import { cn } from '../lib/cn'
import { LabSegmentedToggle } from '../lib/labControls'
import {
  getLabNavFlat,
  getLabNavMatch,
  labNavGuidelinesItem,
  labNavLayoutsItem,
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
  const labelId = useId()
  return (
    <div className="flex items-center gap-2 overflow-visible py-1">
      <span
        id={labelId}
        className={cn(p1, 'text-sm font-semibold text-[var(--screening-text-primary)]')}
      >
        Theme
      </span>
      <LabSegmentedToggle
        aria-labelledby={labelId}
        value={theme}
        onChange={onThemeChange}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
      />
    </div>
  )
}

export function LabLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [theme, setTheme] = useState<LabTheme>('light')
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
  const showLayouts =
    !isFiltering || labNavLayoutsItem.label.toLowerCase().includes(navQueryNormalized)

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
          <AceInputField
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
          {showLayouts ? (
            <>
              <div
                className="my-6 border-t border-solid border-[var(--screening-border-strong)]"
                role="separator"
                aria-hidden
              />
              <ul className="m-0 list-none space-y-1 p-0">
                <li>
                  <NavLink to={labNavLayoutsItem.to} className={topNavLinkClass} end>
                    {labNavLayoutsItem.label}
                  </NavLink>
                </li>
              </ul>
            </>
          ) : null}
          {isFiltering && !showGuidelines && filteredSections.length === 0 && !showLayouts ? (
            <p className="m-0 px-2 text-sm text-[var(--screening-text-muted)]">No matches</p>
          ) : null}
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
