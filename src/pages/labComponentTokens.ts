/**
 * Canonical Figma → CSS token names shown on each component lab Usage tab.
 * Prefer Semantic / Component paths from the Figma JSON exports.
 *
 * Component CSS vars use Figma kebab names (e.g. `--inline-message-*`, `--button-*`).
 * Matching `--ace-*` aliases remain in variables.css as a temporary compat layer only.
 * Foundation tokens (`--ace-type-*`, `--ace-motion-*`, `--ace-drop-shadow-*`, color scales) are unchanged.
 *
 * Token layers (Layouts → Tokens):
 * - Primitive - raw scales (color/*, spacing/N, radius/sm, typography/size, …)
 * - Semantic - intent aliases (colors/*, spacing/layout, …)
 * - Component - component bindings (radius/component/*, icon/size/*, --accordion-*, …)
 */

export type LabTokenLevel = 'primitive' | 'semantic' | 'component'

export type LabTokenRef = {
  /** Figma path when applicable (e.g. colors/action/primary) */
  figma?: string
  /** CSS custom property */
  cssVar: string
  note?: string
  /** Override auto-inferred layer when needed */
  level?: LabTokenLevel
}

export type LabTokenGroup = {
  title: string
  tokens: LabTokenRef[]
}

export const LAB_TOKEN_LEVEL_LABELS: Record<LabTokenLevel, string> = {
  primitive: 'Primitive',
  semantic: 'Semantic',
  component: 'Component',
}

export const LAB_TOKEN_LEVEL_ORDER: LabTokenLevel[] = ['primitive', 'semantic', 'component']

const t = (figma: string, cssVar: string, note?: string, level?: LabTokenLevel): LabTokenRef => ({
  figma,
  cssVar,
  note,
  level,
})

const css = (cssVar: string, note?: string, level?: LabTokenLevel): LabTokenRef => ({
  cssVar,
  note,
  level,
})

/** Classify a Usage-tab token against ACE Primitive / Semantic / Component layers. */
export function inferLabTokenLevel(token: LabTokenRef): LabTokenLevel {
  if (token.level) return token.level

  const figma = (token.figma ?? '').trim().toLowerCase()
  const cssVar = token.cssVar.trim().toLowerCase()

  if (cssVar.startsWith('primitive')) return 'primitive'
  if (cssVar.startsWith('semantic')) return 'semantic'
  if (cssVar.startsWith('component')) return 'component'

  if (figma) {
    if (
      figma.startsWith('radius/component') ||
      figma.startsWith('icon/size') ||
      figma.startsWith('spacing/component') ||
      figma.startsWith('typography/ui') ||
      figma.startsWith('typography/heading') ||
      figma.startsWith('typography/body')
    ) {
      return 'component'
    }
    if (
      figma.startsWith('colors/') ||
      figma.startsWith('border/width') ||
      figma.startsWith('spacing/layout')
    ) {
      return 'semantic'
    }
    if (
      figma.startsWith('color/') ||
      /^spacing\/\d/.test(figma) ||
      /^radius\/(sm|md|lg|xl|2xl|full|none)\b/.test(figma) ||
      figma.startsWith('typography/size') ||
      figma.startsWith('typography/line-height') ||
      figma.startsWith('typography/letter-spacing') ||
      figma.startsWith('border-width/')
    ) {
      return 'primitive'
    }
  }

  if (
    cssVar.includes('--radius-component') ||
    cssVar.includes('--spacing-component') ||
    cssVar.includes('--icon-size') ||
    cssVar.includes('--typography-ui') ||
    cssVar.includes('--typography-heading') ||
    cssVar.includes('--typography-body') ||
    cssVar.includes('--ace-type') ||
    cssVar.includes('--icon-button') ||
    /--(accordion|badge|button|checkbox|toggle|radio|tooltip|tabs|tab-card|toast-message|inline-message|progress-indicator|dropdown|filter|slider|stepper|task-bar|page-header|sub-header|dialog-modal|screening|date-picker|time-picker|sidebar|inline-drawer|site-header|landing-page-card|data-card|timeline|attachments|scrollable-list)(-|\*|$|\/)/.test(
      cssVar,
    )
  ) {
    return 'component'
  }

  if (
    /^--color-(neutral|primary|secondary|blue|teal|success|warning|error|dark)(-|\*|$)/.test(cssVar) ||
    /^--spacing-\d/.test(cssVar) ||
    /^--radius-(sm|md|lg|xl|2xl|full|none)(-|\*|$)/.test(cssVar) ||
    cssVar.startsWith('--typography-size') ||
    cssVar.startsWith('--typography-line-height') ||
    cssVar.startsWith('--typography-letter-spacing') ||
    cssVar.startsWith('--border-width') ||
    cssVar.startsWith('--ace-drop-shadow') ||
    cssVar.startsWith('--ace-motion') ||
    cssVar.startsWith('--type-size')
  ) {
    return 'primitive'
  }

  if (
    /^--color-(surface|bg|text|border|action|status|icon|badges)/.test(cssVar) ||
    cssVar.startsWith('--spacing-layout')
  ) {
    return 'semantic'
  }

  return 'component'
}

/** Shared semantic sets reused across labs */
const surfaceText = [
  t('colors/surface/primary', '--color-surface-primary'),
  t('colors/bg/primary', '--color-bg-primary'),
  t('colors/bg/secondary', '--color-bg-secondary'),
  t('colors/text/primary', '--color-text-primary'),
  t('colors/text/secondary', '--color-text-secondary'),
  t('colors/text/disabled', '--color-text-disabled'),
  t('colors/text/inverse', '--color-text-inverse'),
]

const borders = [
  t('colors/border/default', '--color-border-default'),
  t('colors/border/subtle', '--color-border-subtle'),
  t('colors/border/brand', '--color-border-brand'),
  t('colors/border/focus', '--color-border-focus'),
]

const actionPrimary = [
  t('colors/action/primary', '--color-action-primary'),
  t('colors/action/primary-hover', '--color-action-primary-hover'),
  t('colors/action/primary-pressed', '--color-action-primary-pressed'),
  t('colors/action/disabled-button', '--color-action-disabled-button'),
]

const badges = [
  t('colors/badges/purple-fill', '--color-badges-purple-fill'),
  t('colors/badges/purple-border', '--color-badges-purple-border'),
  t('colors/badges/orange-fill', '--color-badges-orange-fill'),
  t('colors/badges/orange-border', '--color-badges-orange-border'),
  t('colors/badges/green-fill', '--color-badges-green-fill'),
  t('colors/badges/green-border', '--color-badges-green-border'),
  t('colors/badges/gray-fill', '--color-badges-gray-fill'),
  t('colors/badges/gray-border', '--color-badges-gray-border'),
  t('colors/badges/blue-fill', '--color-badges-blue-fill'),
  t('colors/badges/blue-border', '--color-badges-blue-border'),
  t('colors/badges/yellow-fill', '--color-badges-yellow-fill'),
  t('colors/badges/yellow-border', '--color-badges-yellow-border'),
  t('colors/badges/pink-fill', '--color-badges-pink-fill'),
  t('colors/badges/pink-border', '--color-badges-pink-border'),
  t('colors/badges/teal-fill', '--color-badges-teal-fill'),
  t('colors/badges/teal-border', '--color-badges-teal-border'),
  t('colors/badges/red-fill', '--color-badges-red-fill'),
  t('colors/badges/red-border', '--color-badges-red-border'),
]

const status = [
  t('colors/status/success', '--color-status-success'),
  t('colors/status/success-subtle', '--color-status-success-subtle'),
  t('colors/status/warning', '--color-status-warning'),
  t('colors/status/warning-subtle', '--color-status-warning-subtle'),
  t('colors/status/error', '--color-status-error'),
  t('colors/status/error-subtle', '--color-status-error-subtle'),
  t('colors/status/info', '--color-status-info'),
  t('colors/status/info-subtle', '--color-status-info-subtle'),
]

const icons = [
  t('colors/icon/primary', '--color-icon-primary'),
  t('colors/icon/secondary', '--color-icon-secondary'),
  t('colors/icon/brand', '--color-icon-brand'),
  t('colors/icon/disabled', '--color-icon-disabled'),
  t('colors/icon/hover', '--color-icon-hover'),
  t('colors/icon/inverse', '--color-icon-inverse'),
]

/**
 * Route path → token groups for the Usage tab.
 * Overview / guidelines pages omit entries (no component token block).
 */
export const LAB_COMPONENT_TOKENS: Record<string, LabTokenGroup[]> = {
  '/lab/atoms/colors': [
    {
      title: 'Primitive color scales',
      tokens: [
        t('color/neutral/{shade}', '--color-neutral-*'),
        t('color/primary/{shade}', '--color-primary-*'),
        t('color/secondary/{shade}', '--color-secondary-*'),
        t('color/blue|teal|success|warning|warning 2|error|dark/{shade}', '--color-{family}-*'),
      ],
    },
    {
      title: 'Semantic color',
      tokens: [
        ...surfaceText,
        ...borders,
        ...actionPrimary,
        ...status,
        ...icons,
        ...badges.slice(0, 4),
        css('--color-badges-*', 'full badge set - see Tokens → Semantic → colors/badges'),
      ],
    },
  ],
  '/lab/atoms/typography': [
    {
      title: 'Primitive type',
      tokens: [
        t('typography/size/*', '--typography-size-* / --type-size-*'),
        t('typography/line-height/*', '--typography-line-height-*'),
        t('typography/letter-spacing/*', '--typography-letter-spacing-*'),
      ],
    },
    {
      title: 'Component type (Semantic)',
      tokens: [
        t('typography/ui/*', '--typography-ui-*'),
        t('typography/heading/*', '--typography-heading-*'),
        t('typography/body/*', '--typography-body-*'),
        css('--ace-type-*', 'composed ACE type styles in typography-tokens.css'),
      ],
    },
  ],
  '/lab/atoms/iconography': [
    {
      title: 'Icon color & size',
      tokens: [
        ...icons,
        t('icon/size/sm', '--icon-size-sm'),
        t('icon/size/md', '--icon-size-md'),
        t('icon/size/lg', '--icon-size-lg'),
        t('icon/size/xl', '--icon-size-xl'),
        css('--icon-button-*', 'icon button surface / hover / border'),
      ],
    },
  ],
  '/lab/atoms/animations': [
    {
      title: 'Animations',
      tokens: [
        css('--ace-motion-ease-standard'),
        css('--ace-motion-duration-fast'),
        css('--ace-motion-duration-medium'),
        css('--ace-motion-duration-slow'),
      ],
    },
  ],
  '/lab/atoms/shadows': [
    {
      title: 'Elevation',
      tokens: [
        css('--ace-drop-shadow-xs'),
        css('--ace-drop-shadow-sm'),
        css('--ace-drop-shadow-md'),
        css('--ace-drop-shadow-lg'),
        css('--ace-drop-shadow-xl'),
      ],
    },
  ],
  '/lab/atoms/buttons': [
    {
      title: 'Action (actionTone)',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/action/primary-hover', '--color-action-primary-hover'),
        t('colors/action/primary-pressed', '--color-action-primary-pressed'),
        t('colors/action/secondary*', '--color-action-secondary*'),
        t('colors/action/success*', '--color-action-success*'),
        t('colors/action/error*', '--color-action-error*'),
        t('colors/action/warning*', '--color-action-warning*'),
        t('colors/action/disabled-button', '--color-action-disabled-button'),
        css('--button-fill*', 'maps to the selected actionTone'),
      ],
    },
    {
      title: 'Surface / type',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/inverse', '--color-text-inverse'),
        t('colors/text/secondary', '--color-text-secondary'),
        t('radius/component/button', '--radius-component-button'),
        css('--ace-type-caption-bold / --ace-type-paragraph-p1-bold / --ace-type-paragraph-p2-bold'),
      ],
    },
  ],
  '/lab/molecules/inputs': [
    {
      title: 'Field states',
      tokens: [
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/placeholder', '--color-text-placeholder'),
        t('colors/border/brand', '--color-border-brand'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        t('colors/border/focus', '--color-border-focus'),
        t('colors/bg/error', '--color-bg-error'),
        t('colors/border/error', '--color-border-error'),
        t('colors/status/error', '--color-status-error'),
        t('colors/bg/disabled-subtle', '--color-bg-disabled-subtle'),
        t('colors/border/disabled-subtle', '--color-border-disabled-subtle'),
        t('colors/text/disabled', '--color-text-disabled'),
        t('colors/icon/primary', '--color-icon-primary'),
        t('radius/component/input', '--radius-component-input'),
      ],
    },
  ],
  '/lab/atoms/checkboxes': [
    {
      title: 'Checkbox',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/icon/disabled', '--color-icon-disabled'),
        t('colors/text/primary', '--color-text-primary'),
        css('--radius-checkbox'),
      ],
    },
  ],
  '/lab/atoms/toggles': [
    {
      title: 'Toggle',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/disabled-subtle', '--color-bg-disabled-subtle'),
        t('colors/text/primary', '--color-text-primary'),
      ],
    },
  ],
  '/lab/atoms/radios': [
    {
      title: 'Radio',
      tokens: [
        t('colors/action/primary', '--color-action-primary', 'selected border / indicator'),
        t('colors/icon/primary', '--color-icon-primary', 'default border'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover', 'field hover / active'),
        t('colors/icon/disabled', '--color-icon-disabled'),
        t('colors/border/default', '--color-border-default'),
        css('--radio-*', 'component aliases in variables.css'),
      ],
    },
  ],
  '/lab/atoms/badges': [
    {
      title: 'Badges (Semantic)',
      tokens: badges,
    },
    {
      title: 'Component aliases',
      tokens: [
        css('--badge-*', 'pill layout → colors/badges/*'),
        css('--badge-tag-*', 'tag layout'),
        t('radius/component/badge', '--radius-component-badge'),
        t('typography/body/body-secondary', '--typography-body-body-secondary', 'Caption Semi Bold label size'),
        css('--ace-type-caption-semi-bold', 'badge label text style'),
      ],
    },
  ],
  '/lab/molecules/progress-indicators': [
    {
      title: 'Progress',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/text/primary', '--color-text-primary'),
        css('--progress-indicator-*'),
      ],
    },
  ],
  '/lab/atoms/tooltips': [
    {
      title: 'Tooltip',
      tokens: [
        t('colors/text/primary', '--color-text-primary'),
        t('colors/bg/primary', '--color-bg-primary'),
        t('colors/text/inverse', '--color-text-inverse'),
        t('radius/component/tooltip', '--radius-component-tooltip'),
        css('--tooltip-*'),
      ],
    },
  ],
  '/lab/atoms/finscan-logo': [
    {
      title: 'Brand marks',
      tokens: [
        t('color/primary/500', '--color-primary-500'),
        t('color/primary/200', '--color-primary-200', 'dark wordmark'),
        t('color/success/400', '--color-success-400', 'mark green'),
        t('color/blue/500', '--color-blue-500'),
        t('color/secondary/500', '--color-secondary-500'),
      ],
    },
  ],
  '/lab/molecules/dropdowns': [
    {
      title: 'Trigger & menu',
      tokens: [
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/text/brand', '--color-text-brand'),
        t('colors/bg/brand', '--color-bg-brand'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        t('colors/bg/secondary', '--color-bg-secondary'),
        t('colors/border/brand', '--color-border-brand'),
        t('colors/border/focus', '--color-border-focus'),
        t('colors/icon/primary', '--color-icon-primary'),
        t('colors/status/error', '--color-status-error'),
        css('--dropdown-menu-*'),
      ],
    },
  ],
  '/lab/molecules/accordions': [
    {
      title: 'Accordion',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/primary', '--color-bg-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/text/primary', '--color-text-primary', 'title + icons'),
        t('radius/sm', '--radius-sm', 'shell radius'),
        t('spacing/16', '--spacing-16', 'padding-x / title gap'),
        t('spacing/12', '--spacing-12', 'padding-y'),
        t('spacing/4', '--spacing-4', 'actions gap'),
        t('icon/size/lg', '--icon-size-lg', 'header glyphs 20px'),
        css('--accordion-*'),
        css('--badge-purple-*', 'header Badge pill'),
      ],
    },
  ],
  '/lab/molecules/pagination': [
    {
      title: 'Pagination',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/bg/primary', '--color-bg-primary'),
      ],
    },
  ],
  '/lab/molecules/sliders': [
    {
      title: 'Slider',
      tokens: [
        t('colors/action/primary', '--color-action-primary', 'range / handle / ticks'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover', 'inactive track'),
        t('colors/text/primary', '--color-text-primary', 'tooltip bg'),
        t('colors/bg/primary', '--color-bg-primary', 'tooltip text'),
        t('color/neutral/100', '--color-neutral-100', 'disabled track'),
        t('colors/border/default', '--color-border-default'),
        t('color/primary/100', '--color-primary-100', 'disabled range'),
        t('color/neutral/500', '--color-neutral-500', 'disabled handle'),
        css('--slider-*'),
      ],
    },
  ],
  '/lab/molecules/steppers': [
    {
      title: 'Stepper',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/icon/primary', '--color-icon-primary'),
      ],
    },
  ],
  '/lab/molecules/task-bar': [
    {
      title: 'Task bar',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        css('--ace-drop-shadow-xs'),
        css('--task-bar-*'),
      ],
    },
  ],
  '/lab/molecules/page-headers': [
    {
      title: 'Page / sub-header',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/icon/secondary', '--color-icon-secondary'),
        t('colors/text/primary', '--color-text-primary'),
        css('--page-header-* / --sub-header-*'),
      ],
    },
  ],
  '/lab/molecules/tabs': [
    {
      title: 'Tabs',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/icon/secondary', '--color-icon-secondary'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover', 'tab card emphasis'),
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary'),
        css('--tabs-* / --tab-card-*'),
      ],
    },
  ],
  '/lab/molecules/toast-messages': [
    {
      title: 'Toast',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/text/inverse', '--color-text-inverse'),
        t('colors/icon/secondary', '--color-icon-secondary'),
        ...status,
        css('--toast-message-*'),
      ],
    },
  ],
  '/lab/molecules/inline-messages': [
    {
      title: 'Inline message',
      tokens: [
        t('radius/component/inline message', '--radius-component-inline-message'),
        t('colors/bg/error', '--color-bg-error'),
        t('colors/border/error', '--color-border-error'),
        t('colors/status/error', '--color-status-error'),
        t('colors/bg/success', '--color-bg-success'),
        t('colors/border/success', '--color-border-success'),
        t('colors/status/success', '--color-status-success'),
        t('colors/status/info-subtle', '--color-status-info-subtle'),
        t('colors/status/info', '--color-status-info'),
        t('colors/bg/warning', '--color-bg-warning'),
        t('colors/border/warning', '--color-border-warning'),
        t('colors/status/warning', '--color-status-warning'),
        t('colors/text/primary', '--color-text-primary'),
        css('--inline-message-*', 'includes radius → --radius-component-inline-message'),
      ],
    },
  ],
  '/lab/molecules/filtering': [
    {
      title: 'Filters / chips',
      tokens: [
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/bg/brand', '--color-bg-brand', 'selected / active'),
        t('colors/text/inverse', '--color-text-inverse'),
        t('colors/icon/inverse', '--color-icon-inverse'),
        t('colors/icon/primary', '--color-icon-primary'),
        t('colors/icon/secondary', '--color-icon-secondary'),
        css('--filter-* / --dropdown-menu-secondary-*'),
      ],
    },
  ],
  '/lab/organisms/dialog-modal': [
    {
      title: 'Dialog',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/text/secondary', '--color-text-secondary'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/action/primary-hover', '--color-action-primary-hover'),
        t('colors/border/brand', '--color-border-brand'),
        t('colors/text/brand', '--color-text-brand'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        t('colors/status/error', '--color-status-error'),
        t('colors/border/error', '--color-border-error'),
        t('radius/component/modal', '--radius-component-modal'),
        css('--dialog-modal-*'),
      ],
    },
  ],
  '/lab/organisms/data-table': [
    {
      title: 'Data table (screening)',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/primary', '--color-bg-primary'),
        t('colors/bg/secondary', '--color-bg-secondary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        ...badges.slice(0, 4),
        css('--screening-*', 'organism aliases → Semantic colors'),
      ],
    },
  ],
  '/lab/organisms/date-time-pickers': [
    {
      title: 'Date / time picker',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        t('colors/text/inverse', '--color-text-inverse'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/text/secondary', '--color-text-secondary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        css('--date-picker-* / --time-picker-*'),
      ],
    },
  ],
  '/lab/organisms/sidebar': [
    {
      title: 'Sidebar',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/primary', '--color-bg-primary'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/border/default', '--color-border-default'),
        t('color/primary/300', '--color-primary-300', 'accent rail'),
        t('colors/icon/primary', '--color-icon-primary'),
        t('colors/icon/hover', '--color-icon-hover'),
        css('--sidebar-*'),
      ],
    },
  ],
  '/lab/organisms/inline-drawer': [
    {
      title: 'Inline drawer',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/text/primary', '--color-text-primary'),
        css('--inline-drawer-*'),
      ],
    },
  ],
  '/lab/organisms/site-header': [
    {
      title: 'Site header',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('color/primary/500', '--color-primary-500', 'brand mark'),
        css('--site-header-*'),
      ],
    },
  ],
  '/lab/organisms/cards': [
    {
      title: 'Cards',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/primary', '--color-bg-primary'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        t('colors/border/default', '--color-border-default'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/action/primary', '--color-action-primary'),
        t('radius/component/card', '--radius-component-card'),
        ...badges.slice(0, 2),
        css('--landing-page-card-* / --data-card-*'),
      ],
    },
  ],
  '/lab/organisms/timeline': [
    {
      title: 'Timeline',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/primary', '--color-bg-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/text/inverse', '--color-text-inverse'),
        ...status,
        css('--timeline-*'),
      ],
    },
  ],
  '/lab/organisms/attachments': [
    {
      title: 'Attachments',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/primary', '--color-bg-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/text/secondary', '--color-text-secondary'),
        t('colors/text/disabled', '--color-text-disabled'),
        t('colors/status/error', '--color-status-error'),
        css('--attachments-*'),
      ],
    },
  ],
  '/lab/organisms/squeeze-box': [
    {
      title: 'Scrollable list',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/bg/tertiary', '--color-bg-tertiary', 'selected / hover row'),
        t('colors/icon/brand', '--color-icon-brand'),
        css('--scrollable-list-*'),
      ],
    },
  ],
  '/lab/layouts': [
    {
      title: 'Layout shell',
      tokens: [
        t('colors/bg/primary', '--color-bg-primary'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/action/primary', '--color-action-primary'),
        t('spacing/layout/section-gap', '--spacing-layout-section-gap'),
        t('spacing/layout/page-margin', '--spacing-layout-page-margin'),
      ],
    },
  ],
  '/lab/layouts/tokens': [
    {
      title: 'Catalog layers',
      tokens: [
        css(
          'Primitive - color|typography|spacing|radius|border-width from Default.tokens.json',
          undefined,
          'primitive',
        ),
        css(
          'Semantic - colors/* + layout aliases from Light/Dark.tokens.json',
          undefined,
          'semantic',
        ),
        css(
          'Component - radius/component|spacing/component padding|typography/ui|heading|body|icon/size',
          undefined,
          'component',
        ),
      ],
    },
  ],
}

export function getLabComponentTokens(pathname: string): LabTokenGroup[] | null {
  if (LAB_COMPONENT_TOKENS[pathname]) return LAB_COMPONENT_TOKENS[pathname]
  // Longest-prefix match for nested routes
  const keys = Object.keys(LAB_COMPONENT_TOKENS).sort((a, b) => b.length - a.length)
  const match = keys.find((k) => pathname === k || pathname.startsWith(`${k}/`))
  return match ? LAB_COMPONENT_TOKENS[match] : null
}
