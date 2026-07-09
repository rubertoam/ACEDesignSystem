/**
 * ACE motion catalog — single source of truth for documented animations.
 * When adding animation to a component, register an entry here and demo it on AnimationsLab.
 */

export type AceAnimationEntry = {
  /** Stable id, e.g. sidebar-panel-open */
  id: string
  /** Human-readable name */
  name: string
  /** Atom / molecule / organism / lab */
  component: string
  /** CSS properties animated (comma-separated in UI) */
  properties: string
  /** Duration token or value */
  duration: string
  /** Easing token or curve */
  easing: string
  /** CSS variables consumed */
  tokens: string[]
  /** Implementation notes for developers */
  notes?: string
}

/** Standard deceleration curve — nav, sidebar, accordion expand */
export const ACE_MOTION_EASE_STANDARD = 'cubic-bezier(0.33, 1, 0.68, 1)'

export const ACE_ANIMATIONS: AceAnimationEntry[] = [
  {
    id: 'sidebar-panel-open',
    name: 'Panel open / close',
    component: 'AceSidebar',
    properties: 'width, border-color, box-shadow',
    duration: 'var(--ace-sidebar-duration-panel)',
    easing: 'var(--ace-motion-ease-standard)',
    tokens: ['--ace-sidebar-duration-panel', '--ace-motion-ease-standard'],
    notes: 'Aside collapses to 0 width; inner content fades with opacity.',
  },
  {
    id: 'sidebar-group-expand',
    name: 'Group expand / collapse',
    component: 'AceSidebar',
    properties: 'grid-template-rows',
    duration: 'var(--ace-sidebar-duration-expand)',
    easing: 'var(--ace-motion-ease-standard)',
    tokens: ['--ace-sidebar-duration-expand', '--ace-motion-ease-standard'],
    notes: 'Nested items use 0fr → 1fr grid row pattern (same as AceAccordion).',
  },
  {
    id: 'sidebar-chevron-rotate',
    name: 'Group chevron rotate',
    component: 'AceSidebar',
    properties: 'transform',
    duration: 'var(--ace-sidebar-duration-expand)',
    easing: 'var(--ace-motion-ease-standard)',
    tokens: ['--ace-sidebar-duration-expand', '--ace-motion-ease-standard'],
    notes: 'ChevronRight rotates 90° when group is expanded.',
  },
  {
    id: 'sidebar-row-hover',
    name: 'Nav row hover / selected',
    component: 'AceSidebar',
    properties: 'background-color, color',
    duration: 'var(--ace-motion-duration-fast)',
    easing: 'var(--ace-motion-ease-standard)',
    tokens: ['--ace-motion-duration-fast', '--ace-motion-ease-standard'],
  },
  {
    id: 'sidebar-actions-reveal',
    name: 'Group actions on hover',
    component: 'AceSidebar',
    properties: 'opacity',
    duration: 'var(--ace-motion-duration-medium)',
    easing: 'var(--ace-motion-ease-standard)',
    tokens: ['--ace-motion-duration-medium', '--ace-motion-ease-standard'],
    notes: 'Add / more icons fade in when hovering group header.',
  },
  {
    id: 'accordion-body-expand',
    name: 'Body expand / collapse',
    component: 'AceAccordion',
    properties: 'grid-template-rows',
    duration: 'var(--ace-accordion-duration)',
    easing: 'var(--ace-accordion-ease)',
    tokens: ['--ace-accordion-duration', '--ace-accordion-ease'],
  },
  {
    id: 'lab-sidebar-toggle-rotate',
    name: 'Sidebar toggle icon rotate',
    component: 'SidebarLab (app header)',
    properties: 'transform',
    duration: 'var(--ace-motion-duration-medium)',
    easing: 'var(--ace-motion-ease-standard)',
    tokens: ['--ace-motion-duration-medium', '--ace-motion-ease-standard'],
    notes: 'PanelLeftClose rotates 180° when sidebar is open vs closed.',
  },
  {
    id: 'toggle-thumb-slide',
    name: 'Toggle thumb slide',
    component: 'Toggle',
    properties: 'translate, background-color',
    duration: 'var(--ace-toggle-duration)',
    easing: 'var(--ace-toggle-ease)',
    tokens: ['--ace-toggle-duration', '--ace-toggle-ease'],
    notes: 'Thumb translate-x on data-state; track fill uses the same duration and easing.',
  },
  {
    id: 'lab-nav-section-expand',
    name: 'Lab nav section expand',
    component: 'LabLayout',
    properties: 'grid-template-rows',
    duration: 'var(--ace-motion-duration-medium)',
    easing: 'var(--ace-motion-ease-standard)',
    tokens: ['--ace-motion-duration-medium', '--ace-motion-ease-standard'],
  },
  {
    id: 'tooltip-enter-exit',
    name: 'Tooltip enter / exit',
    component: 'AceTooltip',
    properties: 'opacity, transform (scale, slide)',
    duration: 'var(--ace-tooltip-duration)',
    easing: 'var(--ace-tooltip-ease)',
    tokens: [
      '--ace-tooltip-duration',
      '--ace-tooltip-ease',
      '--ace-motion-duration-fast',
      '--ace-motion-ease-standard',
    ],
    notes: 'Fade + scale from 0.95 with a 2px slide based on `data-side` (top/bottom/left/right).',
  },
]

export function getAnimationById(id: string): AceAnimationEntry | undefined {
  return ACE_ANIMATIONS.find((a) => a.id === id)
}
