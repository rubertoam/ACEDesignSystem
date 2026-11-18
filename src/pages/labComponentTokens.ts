/**
 * Canonical Figma → CSS token names shown on each component lab Usage tab.
 * Prefer Semantic / Component paths from the Figma JSON exports.
 *
 * Component CSS vars use Figma kebab names (e.g. `--inline-message-*`, `--button-*`).
 * Composed type styles use `--type-{heading|subheading|body|caption|footnote|micro}-*`.
 * Elevation uses Figma Shadow tokens `--shadow-{none|xs|sm|md|lg|xl}`.
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
    cssVar.includes('--type-heading') ||
    cssVar.includes('--type-subheading') ||
    cssVar.includes('--type-body') ||
    cssVar.includes('--type-caption') ||
    cssVar.includes('--type-footnote') ||
    cssVar.includes('--type-micro') ||
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
    cssVar.startsWith('--shadow-') ||
    cssVar.startsWith('--motion-')
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
  t('colors/badges & inline messages/purple-fill', '--color-badges-inline-messages-purple-fill'),
  t('colors/badges & inline messages/purple-border', '--color-badges-inline-messages-purple-border'),
  t('colors/badges & inline messages/orange-fill', '--color-badges-inline-messages-orange-fill'),
  t('colors/badges & inline messages/orange-border', '--color-badges-inline-messages-orange-border'),
  t('colors/badges & inline messages/green-fill', '--color-badges-inline-messages-green-fill'),
  t('colors/badges & inline messages/green-border', '--color-badges-inline-messages-green-border'),
  t('colors/badges & inline messages/gray-fill', '--color-badges-inline-messages-gray-fill'),
  t('colors/badges & inline messages/gray-border', '--color-badges-inline-messages-gray-border'),
  t('colors/badges & inline messages/blue-fill', '--color-badges-inline-messages-blue-fill'),
  t('colors/badges & inline messages/blue-border', '--color-badges-inline-messages-blue-border'),
  t('colors/badges & inline messages/yellow-fill', '--color-badges-inline-messages-yellow-fill'),
  t('colors/badges & inline messages/yellow-border', '--color-badges-inline-messages-yellow-border'),
  t('colors/badges & inline messages/pink-fill', '--color-badges-inline-messages-pink-fill'),
  t('colors/badges & inline messages/pink-border', '--color-badges-inline-messages-pink-border'),
  t('colors/badges & inline messages/teal-fill', '--color-badges-inline-messages-teal-fill'),
  t('colors/badges & inline messages/teal-border', '--color-badges-inline-messages-teal-border'),
  t('colors/badges & inline messages/red-fill', '--color-badges-inline-messages-red-fill'),
  t('colors/badges & inline messages/red-border', '--color-badges-inline-messages-red-border'),
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
        t('color/blue|teal|success|warning|warning 2|error|dark|input/{shade}', '--color-{family}-*'),
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
        css('--color-badges-inline-messages-*', 'full set - Tokens → Semantic → colors/badges & inline messages'),
      ],
    },
  ],
  '/lab/atoms/typography': [
    {
      title: 'Primitive type',
      tokens: [
        t('typography/size/*', '--typography-size-*'),
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
        css('--type-*', 'composed style-sheet styles in typography-tokens.css (Heading→Micro)'),
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
        css('--motion-ease-standard'),
        css('--motion-duration-fast'),
        css('--motion-duration-medium'),
        css('--motion-duration-slow'),
      ],
    },
  ],
  '/lab/atoms/shadows': [
    {
      title: 'Elevation',
      tokens: [
        css('--shadow-xs'),
        css('--shadow-sm'),
        css('--shadow-md'),
        css('--shadow-lg'),
        css('--shadow-xl'),
      ],
    },
  ],
  '/lab/atoms/buttons': [
    {
      title: 'Action (actionTone)',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/action/primary-hover', '--color-action-primary-hover'),
        t(
          'colors/action/primary - pressed - subtle',
          '--color-action-primary-pressed-subtle',
          'Figma pressed fill',
        ),
        t('colors/action/secondary*', '--color-action-secondary*'),
        t('colors/action/success*', '--color-action-success*'),
        t('colors/action/error*', '--color-action-error*'),
        t('colors/action/warning*', '--color-action-warning*'),
        t('colors/action/warning 2*', '--color-action-warning-2*'),
        t('colors/action/icon', '--color-action-icon'),
        t('colors/action/disabled', '--color-action-disabled', 'disabled fill for all variants'),
        css('--button-fill*', 'maps to the selected actionTone'),
      ],
    },
    {
      title: 'Surface / type / geometry',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/button label', '--color-text-button-label', 'on solid fills + disabled'),
        t('colors/text/button label - alt', '--color-text-button-label-alt', 'secondary/tertiary default'),
        t('radius/component/button', '--radius-component-button'),
        t(
          'typography/body/body-main',
          '--typography-body-body-main',
          'default label via --type-body-semi-bold — typography token drives height',
        ),
        t(
          'typography/body/body-secondary',
          '--typography-body-body-secondary',
          'via --type-caption-semi-bold',
        ),
        t('spacing/8', '--spacing-8', 'vertical padding + icon gap'),
        t('spacing/12', '--spacing-12', 'horizontal padding'),
      ],
    },
  ],
  '/lab/molecules/inputs': [
    {
      title: 'Field states (Figma Input Field bindings)',
      tokens: [
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary', 'value + label'),
        t('colors/text/placeholder', '--color-text-placeholder'),
        t('colors/input/focused', '--color-input-focused', 'focused fill'),
        t('colors/border/focus', '--color-border-focus', 'focused stroke'),
        t('colors/bg/error', '--color-bg-error'),
        t('colors/border/error', '--color-border-error'),
        t('colors/text/error message', '--color-text-error-message', 'error helper'),
        t('colors/bg/disabled-subtle', '--color-bg-disabled-subtle'),
        t('colors/border/disabled-subtle', '--color-border-disabled-subtle'),
        t('colors/text/disabled', '--color-text-disabled'),
        t('colors/icon/primary', '--color-icon-primary'),
        t(
          'typography/body/body-main',
          '--typography-body-body-main',
          'default field value via --type-body-regular — typography token drives height',
        ),
        t(
          'typography/body/body-secondary',
          '--typography-body-body-secondary',
          'label; also fieldTypography=body-secondary → --type-caption-regular',
        ),
        t('typography/ui/footnote', '--typography-ui-footnote', 'error helper'),
        t('radius/sm', '--radius-sm', 'Input Field corner radius'),
        t('spacing/8', '--spacing-8', 'padding + stack gap'),
        t('border-width/default', '--border-width-default'),
      ],
    },
  ],
  '/lab/atoms/checkboxes': [
    {
      title: 'Checkbox',
      tokens: [
        t('colors/border/brand', '--color-border-brand'),
        t('colors/bg/brand', '--color-bg-brand'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/disabled', '--color-border-disabled'),
        t('colors/bg/disabled', '--color-bg-disabled'),
        t('colors/text/primary', '--color-text-primary'),
        t('radius/3', '--radius-3', 'sm/md control'),
        t('radius/sm', '--radius-sm', 'lg control'),
        t('border-width/default', '--border-width-default'),
        t('border-width/medium', '--border-width-medium', 'lg stroke'),
      ],
    },
  ],
  '/lab/atoms/toggles': [
    {
      title: 'Toggle',
      tokens: [
        t('colors/bg/brand', '--color-bg-brand'),
        t('colors/bg/secondary', '--color-bg-secondary'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/disabled-subtle', '--color-bg-disabled-subtle'),
        t('radius/component/toggle-track', '--radius-component-toggle-track'),
        t('border-width/toggle-icon-small', '--border-width-toggle-icon-small'),
        t('border-width/toggle-icon-medium', '--border-width-toggle-icon-medium'),
        css('--toggle-*', 'component aliases in variables.css'),
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
        t('colors/surface/focused', '--color-surface-focused', 'control hover'),
        t('colors/surface/disabled', '--color-surface-disabled', 'field disabled'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover', 'field hover / active'),
        t('radius/component/radio-inner', '--radius-component-radio-inner'),
        t('radius/component/radio-container', '--radius-component-radio-container'),
        t('spacing/component padding/radio-inset', '--spacing-component-padding-radio-inset'),
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
        css('--badge-*', 'pill layout → colors/badges & inline messages/*'),
        css('--badge-tag-*', 'tag layout'),
        t('radius/component/badge', '--radius-component-badge'),
        t('typography/body/body-secondary', '--typography-body-body-secondary', 'Caption Semi Bold label size'),
        css('--type-caption-semi-bold', 'badge label text style'),
      ],
    },
  ],
  '/lab/molecules/progress-indicators': [
    {
      title: 'Progress',
      tokens: [
        t('colors/action/primary', '--color-action-primary'),
        t('colors/progress/foreground', '--color-progress-foreground', 'on-brand text / spinner'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        t('colors/text/brand', '--color-text-brand'),
        css('--progress-indicator-*'),
      ],
    },
  ],
  '/lab/atoms/tooltips': [
    {
      title: 'Tooltip',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('radius/component/tooltip', '--radius-component-tooltip'),
        t('spacing/12', '--spacing-12', 'horizontal padding'),
        t('spacing/8', '--spacing-8', 'vertical padding'),
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
        t('colors/text/brand', '--color-text-brand', 'pipe + Select All / Reset'),
        t('colors/bg/brand-subtle', '--color-bg-brand-subtle', 'Secondary Active / FilterChip Selected'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover', 'Primary open + selected rows'),
        t('colors/bg/secondary', '--color-bg-secondary', 'row hover'),
        t('colors/border/brand', '--color-border-brand'),
        t('colors/border/focus', '--color-border-focus'),
        t('colors/action/icon', '--color-action-icon', 'Secondary / FilterChip active icons'),
        t('colors/status/error', '--color-status-error'),
        t('radius/sm', '--radius-sm', 'trigger / menu radius'),
        t('spacing/12', '--spacing-12', 'Primary padding-x / Secondary Label padding-x'),
        t('spacing/8', '--spacing-8', 'Primary padding-y / Secondary·FilterChip padding-x / menu row pad'),
        t('spacing/16', '--spacing-16', 'Primary label↔chevron gap'),
        t('spacing/4', '--spacing-4', 'Secondary / FilterChip / Secondary Label padding-y'),
        t('border/width/subtle', '--border-width-subtle', 'menu panel stroke'),
        t('typography/body/body-secondary', '--type-caption-regular', 'trigger + label'),
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
        t('colors/bg/brand-hover', '--color-bg-brand-hover', 'control hover'),
        t('spacing/2', '--spacing-2', 'gap + vertical pad'),
        t('spacing/component padding/padding-xs', '--spacing-component-padding-padding-xs', 'horizontal pad'),
        css('--stepper-*'),
      ],
    },
  ],
  '/lab/molecules/task-bar': [
    {
      title: 'Task bar',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/default', '--color-border-default'),
        css('--shadow-xs'),
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
        t('colors/text/brand', '--color-text-brand', 'active label'),
        t('colors/text/secondary', '--color-text-secondary', 'inactive label'),
        t('colors/bg/brand', '--color-bg-brand', 'horizontal indicator'),
        t('spacing/12', '--spacing-12', 'tab list gap'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover', 'tab card hover / selected fill'),
        t('colors/border/brand', '--color-border-brand', 'tab card selected stroke'),
        t('colors/border/default', '--color-border-default'),
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/text/primary', '--color-text-primary'),
        t('radius/md', '--radius-md', 'tab card'),
        css('--tabs-* / --tab-card-*'),
      ],
    },
  ],
  '/lab/molecules/toast-messages': [
    {
      title: 'Toast',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/border/subtle', '--color-border-subtle'),
        t('colors/action/primary', '--color-action-primary', 'info / confirm'),
        t('colors/text/inverse', '--color-text-inverse'),
        t('colors/icon/secondary', '--color-icon-secondary'),
        t('colors/status/success', '--color-status-success'),
        t('colors/status/warning', '--color-status-warning'),
        t('colors/status/error', '--color-status-error'),
        t('radius/sm', '--radius-sm'),
        t('spacing/16', '--spacing-16', 'horizontal padding'),
        t('spacing/12', '--spacing-12', 'vertical padding'),
        css('--toast-message-*'),
      ],
    },
  ],
  '/lab/molecules/inline-messages': [
    {
      title: 'Inline message',
      tokens: [
        t('radius/component/inline message', '--radius-component-inline-message'),
        t('colors/badges & inline messages/red-fill', '--color-badges-inline-messages-red-fill'),
        t('colors/badges & inline messages/red-border', '--color-badges-inline-messages-red-border'),
        t('colors/badges & inline messages/green-fill', '--color-badges-inline-messages-green-fill'),
        t('colors/badges & inline messages/green-border', '--color-badges-inline-messages-green-border'),
        t('colors/badges & inline messages/purple-fill', '--color-badges-inline-messages-purple-fill', 'info'),
        t('colors/badges & inline messages/purple-border', '--color-badges-inline-messages-purple-border', 'info'),
        t('colors/badges & inline messages/orange-fill', '--color-badges-inline-messages-orange-fill'),
        t('colors/badges & inline messages/orange-border', '--color-badges-inline-messages-orange-border'),
        t('colors/text/primary', '--color-text-primary'),
        css('--inline-message-*', 'tones → red/green/purple/orange badges & inline messages'),
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
        t('colors/bg/brand-subtle', '--color-bg-brand-subtle', 'selected / active'),
        t('colors/action/icon', '--color-action-icon', 'selected icons'),
        t('colors/icon/primary', '--color-icon-primary'),
        t('radius/sm', '--radius-sm'),
        t('spacing/8', '--spacing-8'),
        t('spacing/4', '--spacing-4'),
        css('--filter-* / --dropdown-menu-secondary-*'),
      ],
    },
  ],
  '/lab/organisms/dialog-modal': [
    {
      title: 'Dialog',
      tokens: [
        t('colors/surface/primary', '--color-surface-primary'),
        t('colors/bg/secondary', '--color-bg-secondary', 'modal border'),
        t('colors/text/primary', '--color-text-primary'),
        t('colors/text/secondary', '--color-text-secondary'),
        t('colors/action/primary', '--color-action-primary'),
        t('colors/action/primary-hover', '--color-action-primary-hover'),
        t('colors/border/brand', '--color-border-brand'),
        t('colors/text/brand', '--color-text-brand'),
        t('colors/bg/brand-hover', '--color-bg-brand-hover'),
        t('colors/status/error', '--color-status-error'),
        t('colors/badges & inline messages/red-fill', '--color-badges-inline-messages-red-fill'),
        t('colors/badges & inline messages/red-border', '--color-badges-inline-messages-red-border'),
        t('spacing/24', '--spacing-24', 'padding + section gap'),
        t('spacing/12', '--spacing-12', 'footer button gap'),
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
