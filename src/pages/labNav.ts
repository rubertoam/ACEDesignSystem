export type LabNavItem = {

  label: string

  to: string

}



export type LabNavSection = {

  title: string

  items: LabNavItem[]

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

      { label: 'FinScan Logo', to: '/lab/atoms/finscan-logo' },

      { label: 'Colors', to: '/lab/atoms/colors' },

      { label: 'Typography', to: '/lab/atoms/typography' },

      { label: 'Animations', to: '/lab/atoms/animations' },

      { label: 'Drop shadows', to: '/lab/atoms/drop-shadows' },

      { label: 'Buttons', to: '/lab/atoms/buttons' },

      { label: 'Inputs', to: '/lab/atoms/inputs' },

      { label: 'Checkboxes', to: '/lab/atoms/checkboxes' },

      { label: 'Toggles', to: '/lab/atoms/toggles' },

      { label: 'Radio buttons', to: '/lab/atoms/radios' },

      { label: 'Tabs', to: '/lab/atoms/tabs' },

    ],

  },

  {

    title: 'Molecules',

    items: [

      { label: 'Overview', to: '/lab/molecules' },

      { label: 'Dropdowns', to: '/lab/molecules/dropdowns' },

      { label: 'Accordions', to: '/lab/molecules/accordions' },

      { label: 'Pagination', to: '/lab/molecules/pagination' },

      { label: 'Sliders', to: '/lab/molecules/sliders' },

    ],

  },

  {

    title: 'Organisms',

    items: [

      { label: 'Overview', to: '/lab/organisms' },

      { label: 'Dialog modal', to: '/lab/organisms/dialog-modal' },

      { label: 'Data Table', to: '/lab/organisms/data-table' },

      { label: 'Date and time pickers', to: '/lab/organisms/date-time-pickers' },

      { label: 'Sidebar', to: '/lab/organisms/sidebar' },

      { label: 'Site header', to: '/lab/organisms/site-header' },

      { label: 'Cards', to: '/lab/organisms/cards' },

    ],

  },

]



export function getLabNavFlat(): { label: string; to: string; section: string }[] {

  return [

    { ...labNavGuidelinesItem, section: 'Guidelines' },

    ...labNavSections.flatMap((section) =>

      section.items.map((item) => ({

        label: item.label,

        to: item.to,

        section: section.title,

      })),

    ),

  ]

}



/** Longest-prefix match for sidebar (e.g. /lab/atoms/toggles → Atoms). */

export function getLabNavMatch(pathname: string): { label: string; to: string; section: string } | undefined {

  const entries = getLabNavFlat()

  const sorted = [...entries].sort((a, b) => b.to.length - a.to.length)

  return sorted.find((e) => pathname === e.to || pathname.startsWith(`${e.to}/`))

}

