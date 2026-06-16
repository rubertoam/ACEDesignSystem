import {
  LAB_AVAILABILITY_BY_PATH,
  type LabAvailabilityStatus,
} from '../lib/labAvailability'

export type LabNavItem = {
  label: string
  to: string
  availability?: LabAvailabilityStatus
  /** Shown on section overview pages after the link. */
  overviewHint?: string
}

export type LabNavSection = {
  title: string
  items: LabNavItem[]
}

export type LabNavSectionTitle = LabNavSection['title']

function component(
  label: string,
  to: string,
  overviewHint?: string,
): LabNavItem {
  return {
    label,
    to,
    availability: LAB_AVAILABILITY_BY_PATH[to],
    overviewHint,
  }
}

/** Top-level link (no section heading in sidebar). */
export const labNavGuidelinesItem: LabNavItem = {
  label: 'Guidelines',
  to: '/lab',
}

export const labNavSections: LabNavSection[] = [
  {
    title: 'Atoms',
    items: [
      { label: 'Overview', to: '/lab/atoms' },
      component(
        'FinScan Logo',
        '/lab/atoms/finscan-logo',
        'hash mark + wordmark lockup (Figma Icon / FinScan 2782:29).',
      ),
      component('Colors', '/lab/atoms/colors', 'tokens from variables.css with swatches.'),
      component(
        'Typography',
        '/lab/atoms/typography',
        'ACE type tokens and samples from the Figma export JSON.',
      ),
      component(
        'Animations',
        '/lab/atoms/animations',
        'motion catalog, easing/duration tokens, and live demos for developers.',
      ),
      component('Drop shadows', '/lab/atoms/drop-shadows', 'elevation tokens (Figma Drop Shadows 71-71).'),
      component('Buttons', '/lab/atoms/buttons', 'ACE button variants, sizes, and states (Figma Buttons frame).'),
      component(
        'Inputs',
        '/lab/atoms/inputs',
        'text fields, sizes, states, optional search icon (Figma Input frame).',
      ),
      component(
        'Checkboxes',
        '/lab/atoms/checkboxes',
        'with/without label, sizes, states (Figma Checkboxes 317-1492).',
      ),
      component('Toggles', '/lab/atoms/toggles', 'switch states, descriptive pattern (Figma Toggles 117-1265).'),
      component(
        'Radio buttons',
        '/lab/atoms/radios',
        'sizes, states, field wrapper (Figma Radio Buttons 331-1755).',
      ),
      component('Badges', '/lab/atoms/badges', 'pill tags — active, inactive, and dismissible (Figma Tags 2347-669).'),
    ],
  },
  {
    title: 'Molecules',
    items: [
      { label: 'Overview', to: '/lab/molecules' },
      component(
        'Dropdowns',
        '/lab/molecules/dropdowns',
        'menu trigger and list (Radix), screening + ACE tokens.',
      ),
      component(
        'Accordions',
        '/lab/molecules/accordions',
        'expand / collapse, gray / white / XS shadow surfaces, tag + Material icons (Figma 332-1500).',
      ),
      component(
        'Pagination',
        '/lab/molecules/pagination',
        'range label, page size, numbered pages with ellipses (Figma Review Assigned).',
      ),
      component(
        'Sliders',
        '/lab/molecules/sliders',
        'horizontal value control with label, sizes, and active / inactive states (Figma 2505-47).',
      ),
      component(
        'Tabs',
        '/lab/molecules/tabs',
        'standard underline tabs and Tab Cards for inner-feature navigation (Figma Tabs / Tab Cards).',
      ),
      component(
        'Toast messages',
        '/lab/molecules/toast-messages',
        'success, info, warning, and error notifications with action layouts (Figma 2783-5).',
      ),
    ],
  },
  {
    title: 'Organisms',
    items: [
      { label: 'Overview', to: '/lab/organisms' },
      component(
        'Dialog modal',
        '/lab/organisms/dialog-modal',
        'ACE dialog overlay (molecule) used inside organisms.',
      ),
      component('Data Table', '/lab/organisms/data-table'),
      component(
        'Date and time pickers',
        '/lab/organisms/date-time-pickers',
        'time picker prototype (scheduling controls).',
      ),
      component('Sidebar', '/lab/organisms/sidebar', 'navigation and grouped query layouts.'),
      component(
        'Site header',
        '/lab/organisms/site-header',
        'top navigation, FinScan brand, and user toolbar.',
      ),
      component(
        'Cards',
        '/lab/organisms/cards',
        'landing page navigation cards (stats and description variants).',
      ),
      component(
        'Timeline',
        '/lab/organisms/timeline',
        'match and transaction history with expandable status rows (Figma 4622-1645).',
      ),
    ],
  },
]

export function getLabNavFlat(): {
  label: string
  to: string
  section: string
  availability?: LabAvailabilityStatus
}[] {
  return [
    { ...labNavGuidelinesItem, section: 'Guidelines' },
    ...labNavSections.flatMap((section) =>
      section.items.map((item) => ({
        label: item.label,
        to: item.to,
        section: section.title,
        availability: item.availability,
      })),
    ),
  ]
}

/** Longest-prefix match for sidebar (e.g. /lab/atoms/toggles → Atoms). */
export function getLabNavMatch(pathname: string):
  | { label: string; to: string; section: string; availability?: LabAvailabilityStatus }
  | undefined {
  const entries = getLabNavFlat()
  const sorted = [...entries].sort((a, b) => b.to.length - a.to.length)
  return sorted.find((e) => pathname === e.to || pathname.startsWith(`${e.to}/`))
}
