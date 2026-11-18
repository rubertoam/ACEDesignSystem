/**
 * ACE Typography lab - Figma Typography page (node 2:5).
 * Style Sheet: 2651:5 · Typography Tokens: 5157:46 · Primitives: 5160:2 · Semantic: 5160:154
 *
 * Paths / aliases match tokens/figma Desktop JSON (Primitives + Semantic Light/Dark).
 * Composed style-sheet shorthands live in typography-tokens.css as --type-{family}-*.
 */

export type TypeWeight = 'regular' | 'semiBold' | 'bold'

export type StyleSheetSpecimen = {
  weight: TypeWeight
  label: string
  weightValue: number
  /** Letter spacing from JSON primitives (tight | normal) */
  trackingCss: string
}

export type StyleSheetFamily = {
  id: string
  title: string
  sizePx: number
  sizeRem: string
  /** Semantic size token path used by composed --type-* styles */
  semanticPath: string
  /** CSS var for the semantic size */
  sizeCssVar: string
  specimens: StyleSheetSpecimen[]
}

export type TypographyTokenStyle = {
  id: string
  title: string
  description: string
  metaLabel: string
  sizePx: number
  sizeRem: string
  /** Semantic size CSS var from Desktop JSON */
  sizeCssVar: string
  trackingCss: string
  weights: Array<{ weight: TypeWeight; label: string; weightValue: number }>
}

export type TypographyTokenGroup = {
  id: string
  title: string
  description?: string
  styles: TypographyTokenStyle[]
}

export type PrimitiveTypeToken = {
  tokenPath: string
  cssVar: string
  value: string
  /** For size tokens: px used in preview */
  sizePx?: number
  /** For letter-spacing / line-height: CSS value for preview */
  cssValue?: string
}

export type PrimitiveTypeGroup = {
  id: string
  title: string
  description: string
  tokens: PrimitiveTypeToken[]
}

export type SemanticTypeToken = {
  tokenPath: string
  cssVar: string
  alias: string
  value: string
  sizePx?: number
  cssValue?: string
}

export type SemanticTypeGroup = {
  id: string
  title: string
  description: string
  tokens: SemanticTypeToken[]
}

const WEIGHTS: Array<{ weight: TypeWeight; label: string; weightValue: number }> = [
  { weight: 'regular', label: 'Regular', weightValue: 400 },
  { weight: 'semiBold', label: 'Semi Bold', weightValue: 600 },
  { weight: 'bold', label: 'Bold', weightValue: 700 },
]

/** JSON letter-spacing primitives: tight = -4%, normal = 0% */
const TRACKING_TIGHT = 'var(--typography-letter-spacing-tight)'
const TRACKING_NORMAL = 'var(--typography-letter-spacing-normal)'

function specimens(trackingCss: string): StyleSheetSpecimen[] {
  return WEIGHTS.map((w) => ({ ...w, trackingCss }))
}

/**
 * Style Sheet - Figma node 2651:5 (Noto Sans; Regular / Semi Bold / Bold).
 * Sizes map 1:1 to Semantic typography/* aliases from Desktop JSON.
 * Tracking uses only JSON letter-spacing tokens (tight on heading, normal elsewhere).
 */
export const TYPE_STYLE_SHEET_FAMILIES: StyleSheetFamily[] = [
  {
    id: 'heading',
    title: 'Heading',
    sizePx: 20,
    sizeRem: '1.25rem',
    semanticPath: 'typography/heading/heading',
    sizeCssVar: '--typography-heading-heading',
    specimens: specimens(TRACKING_TIGHT),
  },
  {
    id: 'subheading',
    title: 'Subheading',
    sizePx: 16,
    sizeRem: '1rem',
    semanticPath: 'typography/heading/subheading',
    sizeCssVar: '--typography-heading-subheading',
    specimens: specimens(TRACKING_NORMAL),
  },
  {
    id: 'body',
    title: 'Body',
    sizePx: 14,
    sizeRem: '0.875rem',
    semanticPath: 'typography/body/body-main',
    sizeCssVar: '--typography-body-body-main',
    specimens: specimens(TRACKING_NORMAL),
  },
  {
    id: 'caption',
    title: 'Caption',
    sizePx: 12,
    sizeRem: '0.75rem',
    semanticPath: 'typography/body/body-secondary',
    sizeCssVar: '--typography-body-body-secondary',
    specimens: specimens(TRACKING_NORMAL),
  },
  {
    id: 'footnote',
    title: 'Footnote',
    sizePx: 10,
    sizeRem: '0.625rem',
    semanticPath: 'typography/ui/footnote',
    sizeCssVar: '--typography-ui-footnote',
    specimens: specimens(TRACKING_NORMAL),
  },
  {
    id: 'micro',
    title: 'Micro',
    sizePx: 8,
    sizeRem: '0.5rem',
    semanticPath: 'typography/ui/micro',
    sizeCssVar: '--typography-ui-micro',
    specimens: specimens(TRACKING_NORMAL),
  },
]

/** Typography Tokens - Figma node 5157:46 (product type scale with usage copy). */
export const TYPE_TOKEN_GROUPS: TypographyTokenGroup[] = [
  {
    id: 'heading',
    title: 'Heading',
    styles: [
      {
        id: 'heading',
        title: 'Heading',
        description: 'Primary heading style at 20px for section titles and content hierarchy.',
        metaLabel: 'Heading  |  20px  |  Noto Sans  |  typography/heading/heading',
        sizePx: 20,
        sizeRem: '1.25rem',
        sizeCssVar: '--typography-heading-heading',
        trackingCss: TRACKING_TIGHT,
        weights: WEIGHTS,
      },
    ],
  },
  {
    id: 'subheading',
    title: 'Subheading',
    styles: [
      {
        id: 'subheading',
        title: 'Subheading',
        description: 'Secondary heading style at 16px for subsections and supporting labels.',
        metaLabel: 'Subheading  |  16px  |  Noto Sans  |  typography/heading/subheading',
        sizePx: 16,
        sizeRem: '1rem',
        sizeCssVar: '--typography-heading-subheading',
        trackingCss: TRACKING_NORMAL,
        weights: WEIGHTS,
      },
    ],
  },
  {
    id: 'body',
    title: 'Body',
    styles: [
      {
        id: 'body',
        title: 'Body',
        description: 'Primary body text style at 14px for readable content blocks.',
        metaLabel: 'Body  |  14px  |  Noto Sans  |  typography/body/body-main',
        sizePx: 14,
        sizeRem: '0.875rem',
        sizeCssVar: '--typography-body-body-main',
        trackingCss: TRACKING_NORMAL,
        weights: WEIGHTS,
      },
    ],
  },
  {
    id: 'caption',
    title: 'Caption',
    styles: [
      {
        id: 'caption',
        title: 'Caption',
        description: 'Small text at 12px for labels, form hints, and metadata.',
        metaLabel: 'Caption  |  12px  |  Noto Sans  |  typography/body/body-secondary',
        sizePx: 12,
        sizeRem: '0.75rem',
        sizeCssVar: '--typography-body-body-secondary',
        trackingCss: TRACKING_NORMAL,
        weights: WEIGHTS,
      },
    ],
  },
  {
    id: 'footnote-micro',
    title: 'Footnote & Micro',
    description: 'Smallest text sizes for footnotes (10px) and micro text (8px).',
    styles: [
      {
        id: 'footnote',
        title: 'Footnote',
        description: 'Smallest text sizes for footnotes (10px) and micro text (8px).',
        metaLabel: 'Footnote  |  10px  |  Noto Sans  |  typography/ui/footnote',
        sizePx: 10,
        sizeRem: '0.625rem',
        sizeCssVar: '--typography-ui-footnote',
        trackingCss: TRACKING_NORMAL,
        weights: WEIGHTS,
      },
      {
        id: 'micro',
        title: 'Micro',
        description: 'Smallest text sizes for footnotes (10px) and micro text (8px).',
        metaLabel: 'Micro  |  8px  |  Noto Sans  |  typography/ui/micro',
        sizePx: 8,
        sizeRem: '0.5rem',
        sizeCssVar: '--typography-ui-micro',
        trackingCss: TRACKING_NORMAL,
        weights: WEIGHTS,
      },
    ],
  },
]

function sizeToken(name: string, px: number): PrimitiveTypeToken {
  return {
    tokenPath: `typography/size/${name}`,
    cssVar: `--typography-size-${name}`,
    value: `${px}px`,
    sizePx: px,
    cssValue: `${px / 16}rem`,
  }
}

/** Primitive Typography Tokens - Figma Primitives/Default.tokens.json. */
export const TYPE_PRIMITIVE_GROUPS: PrimitiveTypeGroup[] = [
  {
    id: 'font-size',
    title: 'Font Size',
    description: 'Raw pixel values for the type scale (typography/size/*), from Heading (72px) down to Footer (8px).',
    tokens: [
      sizeToken('heading', 72),
      sizeToken('display-02', 60),
      sizeToken('h1', 48),
      sizeToken('h2', 39),
      sizeToken('h1-small', 34),
      sizeToken('h2-small', 33),
      sizeToken('h3', 28),
      sizeToken('h3-small', 23),
      sizeToken('subheading', 20),
      sizeToken('h4', 19),
      sizeToken('p1', 18),
      sizeToken('h4-small', 16),
      sizeToken('h5', 16),
      sizeToken('p2', 16),
      sizeToken('h5-small', 14),
      sizeToken('h6', 14),
      sizeToken('p3', 14),
      sizeToken('h6-small', 12),
      sizeToken('caption', 12),
      sizeToken('footer-01', 10),
      sizeToken('footer-02', 8),
    ],
  },
  {
    id: 'line-height',
    title: 'Line Height',
    description: 'Percentage-based line height values (typography/line-height/*).',
    tokens: [
      {
        tokenPath: 'typography/line-height/tight',
        cssVar: '--typography-line-height-tight',
        value: '120%',
        cssValue: '1.2',
      },
      {
        tokenPath: 'typography/line-height/normal',
        cssVar: '--typography-line-height-normal',
        value: '150%',
        cssValue: '1.5',
      },
      {
        tokenPath: 'typography/line-height/relaxed',
        cssVar: '--typography-line-height-relaxed',
        value: '165%',
        cssValue: '1.65',
      },
    ],
  },
  {
    id: 'letter-spacing',
    title: 'Letter Spacing',
    description: 'Percentage-based letter spacing values (typography/letter-spacing/*).',
    tokens: [
      {
        tokenPath: 'typography/letter-spacing/tight',
        cssVar: '--typography-letter-spacing-tight',
        value: '-4%',
        cssValue: '-0.04em',
      },
      {
        tokenPath: 'typography/letter-spacing/normal',
        cssVar: '--typography-letter-spacing-normal',
        value: '0%',
        cssValue: '0em',
      },
    ],
  },
]

/** Semantic Typography Tokens - Figma Semantic Light/Dark.tokens.json. */
export const TYPE_SEMANTIC_GROUPS: SemanticTypeGroup[] = [
  {
    id: 'heading',
    title: 'Heading',
    description: 'Semantic heading tokens for content hierarchy.',
    tokens: [
      {
        tokenPath: 'typography/heading/heading',
        cssVar: '--typography-heading-heading',
        alias: 'typography/size/subheading',
        value: '20px',
        sizePx: 20,
      },
      {
        tokenPath: 'typography/heading/subheading',
        cssVar: '--typography-heading-subheading',
        alias: 'typography/size/p2',
        value: '16px',
        sizePx: 16,
      },
    ],
  },
  {
    id: 'body',
    title: 'Body',
    description: 'Semantic body text sizes for readable content.',
    tokens: [
      {
        tokenPath: 'typography/body/body-main',
        cssVar: '--typography-body-body-main',
        alias: 'typography/size/p3',
        value: '14px',
        sizePx: 14,
      },
      {
        tokenPath: 'typography/body/body-secondary',
        cssVar: '--typography-body-body-secondary',
        alias: 'typography/size/caption',
        value: '12px',
        sizePx: 12,
      },
    ],
  },
  {
    id: 'ui',
    title: 'UI',
    description: 'Semantic sizes for captions, footnotes, and micro text.',
    tokens: [
      {
        tokenPath: 'typography/ui/caption',
        cssVar: '--typography-ui-caption',
        alias: 'typography/size/caption',
        value: '12px',
        sizePx: 12,
      },
      {
        tokenPath: 'typography/ui/footnote',
        cssVar: '--typography-ui-footnote',
        alias: 'typography/size/footer-01',
        value: '10px',
        sizePx: 10,
      },
      {
        tokenPath: 'typography/ui/micro',
        cssVar: '--typography-ui-micro',
        alias: 'typography/size/footer-02',
        value: '8px',
        sizePx: 8,
      },
    ],
  },
  {
    id: 'leading',
    title: 'Leading',
    description: 'Semantic line height tokens for controlling vertical rhythm.',
    tokens: [
      {
        tokenPath: 'typography/leading/relaxed',
        cssVar: '--typography-leading-relaxed',
        alias: 'typography/line-height/relaxed',
        value: '165%',
        cssValue: '1.65',
      },
      {
        tokenPath: 'typography/leading/normal',
        cssVar: '--typography-leading-normal',
        alias: 'typography/line-height/normal',
        value: '150%',
        cssValue: '1.5',
      },
      {
        tokenPath: 'typography/leading/tight',
        cssVar: '--typography-leading-tight',
        alias: 'typography/line-height/tight',
        value: '120%',
        cssValue: '1.2',
      },
    ],
  },
]
