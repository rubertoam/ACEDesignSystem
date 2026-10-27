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
  label: 'Our Philosophy',
  to: '/lab',
}

/** Top-level brand asset (not an atom playground); listed below Tokens + Layouts. */
export const labNavFinScanLogoItem: LabNavItem = component(
  'FinScan Logo',
  '/lab/atoms/finscan-logo',
  'Hash mark + wordmark lockup (Figma Icon / FinScan 2782:29).',
)

/** Top-level links below collapsible atomic-design sections. */
export const labNavLayoutsItem: LabNavItem = {
  label: 'Layouts',
  to: '/lab/layouts',
}

export const labNavTokensItem: LabNavItem = {
  label: 'Tokens',
  to: '/lab/layouts/tokens',
}

export const labNavLayoutItems: LabNavItem[] = [labNavTokensItem, labNavLayoutsItem]

/** Tokens + Layouts + FinScan Logo (rendered below Atoms / Molecules / Organisms). */
export const labNavBottomItems: LabNavItem[] = [...labNavLayoutItems, labNavFinScanLogoItem]

export const labNavSections: LabNavSection[] = [
  {
    title: 'Atoms',
    items: [
      { label: 'Overview', to: '/lab/atoms' },
      component('Colors', '/lab/atoms/colors', 'Tokens from variables.css with swatches.'),
      component(
        'Typography',
        '/lab/atoms/typography',
        'Style sheet, typography tokens, and primitive/semantic tokens from Figma.',
      ),
      component(
        'Iconography',
        '/lab/atoms/iconography',
        'Material Symbols catalog, sizes, fill rules, and product usage.',
      ),
      component(
        'Animations',
        '/lab/atoms/animations',
        'Animation catalog, easing/duration tokens, and live demos for developers.',
      ),
      component('Shadows', '/lab/atoms/shadows', 'Elevation tokens (Figma Drop Shadows 71-71).'),
      component('Badges', '/lab/atoms/badges', 'Pills and tags - shared color variants (Review Assigned).'),
      component('Tooltips', '/lab/atoms/tooltips', 'Contextual labels for icon controls - screening toolbar pattern.'),
      component(
        'Buttons',
        '/lab/atoms/buttons',
        'ACE button variants, sizes, states, and descriptive tiles (Figma Buttons 2067:191, ButtonDescriptive 4118:682).',
      ),
      component(
        'Radio buttons',
        '/lab/atoms/radios',
        'Sizes, states, field wrapper (Figma Radio Buttons 331-1755).',
      ),
      component(
        'Checkboxes',
        '/lab/atoms/checkboxes',
        'With/without label, sizes, states (Figma Checkboxes 317-1492).',
      ),
      component('Toggles', '/lab/atoms/toggles', 'Switch states, descriptive pattern (Figma Toggles 117-1265).'),
    ],
  },
  {
    title: 'Molecules',
    items: [
      { label: 'Overview', to: '/lab/molecules' },
      component(
        'Inputs',
        '/lab/molecules/inputs',
        'Text fields, sizes, states, optional search icon (Figma Input frame).',
      ),
      component(
        'Dropdowns',
        '/lab/molecules/dropdowns',
        'Primary / Secondary triggers + MenuList variants (Figma 1307:3725 / 5318:1634), semantic --color-* tokens.',
      ),
      component(
        'Filtering',
        '/lab/molecules/filtering',
        'Filters dropdown and applied filter chips (Figma Table Headers 1540:4577).',
      ),
      component(
        'Accordions',
        '/lab/molecules/accordions',
        'Expand / collapse, gray / white / XS shadow surfaces, tag + Material icons (Figma 332-1500).',
      ),
      component(
        'Pagination',
        '/lab/molecules/pagination',
        'Range label, page size, numbered pages with ellipses (Figma Review Assigned).',
      ),
      component(
        'Sliders',
        '/lab/molecules/sliders',
        'Horizontal value control with label, sizes, and active / inactive states (Figma 2505-47).',
      ),
      component(
        'Steppers',
        '/lab/molecules/steppers',
        'Horizontal (−/+) and vertical (chevron) numeric steppers.',
      ),
      component(
        'Tabs',
        '/lab/molecules/tabs',
        'Horizontal, vertical, and Tab Cards (Figma Tabs 5196:82).',
      ),
      component(
        'Page Headers',
        '/lab/molecules/page-headers',
        'Review Assigned page header and responsive sub-header with statistics, paging, more menu, drill-down.',
      ),
      component(
        'Toast messages',
        '/lab/molecules/toast-messages',
        'Success, info, warning, and error notifications with action layouts (Figma 2783-5).',
      ),
      component(
        'Inline messages',
        '/lab/molecules/inline-messages',
        'Error, info, success, and warning in-page / banner alerts (Figma 4481-275).',
      ),
      component(
        'Progress Indicators',
        '/lab/molecules/progress-indicators',
        'Table review bar + processing spinner cards (Figma Progress Indicators 414:4109).',
      ),
      component(
        'Task Bar',
        '/lab/molecules/task-bar',
        'Bottom action bar for app shells (Review Assigned).',
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
        'Basic Action, Delete, Dropdown, Form, Extended Form + optional inline message (Figma 3047-2036).',
      ),
      component(
        'Date and time pickers',
        '/lab/organisms/date-time-pickers',
        'Time picker prototype (scheduling controls).',
      ),
      component('Sidebar', '/lab/organisms/sidebar', 'Navigation and grouped query layouts.'),
      component(
        'Inline Drawer',
        '/lab/organisms/inline-drawer',
        'Right in-flow panel with sidebar open/close motion (Figma 1063-3635).',
      ),
      component(
        'Squeeze Box',
        '/lab/organisms/squeeze-box',
        'Filter, sort, minimize, and selectable rows (Review Assigned Case List).',
      ),
      component(
        'Cards',
        '/lab/organisms/cards',
        'Landing page cards (Figma Landing Page Cards 4130:1977).',
      ),
      component(
        'Timeline',
        '/lab/organisms/timeline',
        'Match and transaction history with expandable status rows (Figma 4622-1645).',
      ),
      component(
        'Attachments',
        '/lab/organisms/attachments',
        'File upload dropzone and URL linking for case evidence (Figma 3313-156).',
      ),
      component(
        'Site header',
        '/lab/organisms/site-header',
        'Top navigation, FinScan brand, and user toolbar.',
      ),
      component('Data Table', '/lab/organisms/data-table'),
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
    { ...labNavGuidelinesItem, section: 'Our Philosophy' },
    ...labNavSections.flatMap((section) =>
      section.items.map((item) => ({
        label: item.label,
        to: item.to,
        section: section.title,
        availability: item.availability,
      })),
    ),
    ...labNavLayoutItems.map((item) => ({
      ...item,
      section: item.to.includes('/tokens') ? 'Tokens' : 'Layouts',
    })),
    {
      ...labNavFinScanLogoItem,
      section: 'Brand',
    },
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
