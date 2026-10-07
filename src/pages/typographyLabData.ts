/**
 * ACE Typography lab — Figma Typography page (node 2:5).
 * Style Sheet: 2651:5 · Typography Tokens: 5157:46 · Primitives: 5160:2 · Semantic: 5160:154
 */

export type TypeWeight = 'regular' | 'semiBold' | 'bold'

export type StyleSheetSpecimen = {
  weight: TypeWeight
  label: string
  weightValue: number
  /** Letter spacing as shown on the Style Sheet frame */
  trackingCss: string
}

export type StyleSheetFamily = {
  id: string
  title: string
  sizePx: number
  sizeRem: string
  specimens: StyleSheetSpecimen[]
}

export type TypographyTokenStyle = {
  id: string
  title: string
  description: string
  metaLabel: string
  sizePx: number
  sizeRem: string
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

/** Style Sheet — Figma node 2651:5 (Noto Sans; Regular / Semi Bold / Bold). */
export const TYPE_STYLE_SHEET_FAMILIES: StyleSheetFamily[] = [
  {
    id: 'heading',
    title: 'Heading',
    sizePx: 20,
    sizeRem: '1.25rem',
    specimens: WEIGHTS.map((w) => ({
      ...w,
      trackingCss: '-0.04em',
    })),
  },
  {
    id: 'subheading',
    title: 'Subheading',
    sizePx: 16,
    sizeRem: '1rem',
    specimens: WEIGHTS.map((w) => ({
      ...w,
      trackingCss: '-0.04em',
    })),
  },
  {
    id: 'body',
    title: 'Body',
    sizePx: 14,
    sizeRem: '0.875rem',
    specimens: WEIGHTS.map((w) => ({
      ...w,
      trackingCss: '-0.04em',
    })),
  },
  {
    id: 'caption',
    title: 'Caption',
    sizePx: 12,
    sizeRem: '0.75rem',
    specimens: WEIGHTS.map((w) => ({
      ...w,
      // Style Sheet: Regular uses −0.24px (−2%); Semi Bold / Bold have no tracking
      trackingCss: w.weight === 'regular' ? '-0.02em' : '0',
    })),
  },
  {
    id: 'footnote',
    title: 'Footnote',
    sizePx: 10,
    sizeRem: '0.625rem',
    specimens: WEIGHTS.map((w) => ({
      ...w,
      trackingCss: '-0.02em',
    })),
  },
  {
    id: 'micro',
    title: 'Micro',
    sizePx: 8,
    sizeRem: '0.5rem',
    specimens: WEIGHTS.map((w) => ({
      ...w,
      trackingCss: '-0.02em',
    })),
  },
]

/** Typography Tokens — Figma node 5157:46 (product type scale with usage copy). */
export const TYPE_TOKEN_GROUPS: TypographyTokenGroup[] = [
  {
    id: 'heading',
    title: 'Heading',
    styles: [
      {
        id: 'heading',
        title: 'Heading',
        description: 'Primary heading style at 20px for section titles and content hierarchy.',
        metaLabel: 'Heading  |  20px  |  Noto Sans',
        sizePx: 20,
        sizeRem: '1.25rem',
        trackingCss: '-0.04em',
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
        metaLabel: 'Subheading  |  16px  |  Noto Sans',
        sizePx: 16,
        sizeRem: '1rem',
        trackingCss: '0',
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
        metaLabel: 'Body  |  14px  |  Noto Sans',
        sizePx: 14,
        sizeRem: '0.875rem',
        trackingCss: '0',
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
        metaLabel: 'Caption  |  12px  |  Noto Sans',
        sizePx: 12,
        sizeRem: '0.75rem',
        trackingCss: '0',
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
        metaLabel: 'Footnote  |  10px  |  Noto Sans',
        sizePx: 10,
        sizeRem: '0.625rem',
        trackingCss: '0.02em',
        weights: WEIGHTS,
      },
      {
        id: 'micro',
        title: 'Micro',
        description: 'Smallest text sizes for footnotes (10px) and micro text (8px).',
        metaLabel: 'Micro  |  8px  |  Noto Sans',
        sizePx: 8,
        sizeRem: '0.5rem',
        trackingCss: '0.02em',
        weights: WEIGHTS,
      },
    ],
  },
]

function sizeToken(name: string, px: number): PrimitiveTypeToken {
  return {
    tokenPath: `type/size/${name}`,
    cssVar: `--type-size-${name}`,
    value: `${px}px`,
    sizePx: px,
    cssValue: `${px / 16}rem`,
  }
}

/** Primitive Typography Tokens — Figma node 5160:2. */
export const TYPE_PRIMITIVE_GROUPS: PrimitiveTypeGroup[] = [
  {
    id: 'font-size',
    title: 'Font Size',
    description: 'Raw pixel values for the type scale, from Heading (72px) down to Footer (8px).',
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
    description: 'Percentage-based line height values for controlling vertical rhythm.',
    tokens: [
      {
        tokenPath: 'type/line-height/tight',
        cssVar: '--type-line-height-tight',
        value: '120%',
        cssValue: '1.2',
      },
      {
        tokenPath: 'type/line-height/normal',
        cssVar: '--type-line-height-normal',
        value: '150%',
        cssValue: '1.5',
      },
      {
        tokenPath: 'type/line-height/relaxed',
        cssVar: '--type-line-height-relaxed',
        value: '165%',
        cssValue: '1.65',
      },
    ],
  },
  {
    id: 'letter-spacing',
    title: 'Letter Spacing',
    description: 'Percentage-based letter spacing values for fine-tuning character spacing.',
    tokens: [
      {
        tokenPath: 'type/letter-spacing/tight',
        cssVar: '--type-letter-spacing-tight',
        value: '-4%',
        cssValue: '-0.04em',
      },
      {
        tokenPath: 'type/letter-spacing/normal',
        cssVar: '--type-letter-spacing-normal',
        value: '0%',
        cssValue: '0',
      },
    ],
  },
]

/** Semantic Typography Tokens — Figma node 5160:154. */
export const TYPE_SEMANTIC_GROUPS: SemanticTypeGroup[] = [
  {
    id: 'heading',
    title: 'Heading',
    description: 'Semantic heading tokens for content hierarchy.',
    tokens: [
      {
        tokenPath: 'typography/heading/heading',
        cssVar: '--typography-heading-heading',
        alias: 'type/size/subheading',
        value: '20px',
        sizePx: 20,
      },
      {
        tokenPath: 'typography/heading/subheading',
        cssVar: '--typography-heading-subheading',
        alias: 'type/size/p2',
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
        alias: 'type/size/p3',
        value: '14px',
        sizePx: 14,
      },
      {
        tokenPath: 'typography/body/body-secondary',
        cssVar: '--typography-body-body-secondary',
        alias: 'type/size/caption',
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
        alias: 'type/size/caption',
        value: '12px',
        sizePx: 12,
      },
      {
        tokenPath: 'typography/ui/footnote',
        cssVar: '--typography-ui-footnote',
        alias: 'type/size/footer-01',
        value: '10px',
        sizePx: 10,
      },
      {
        tokenPath: 'typography/ui/micro',
        cssVar: '--typography-ui-micro',
        alias: 'type/size/footer-02',
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
        alias: 'type/line-height/relaxed',
        value: '165%',
        cssValue: '1.65',
      },
      {
        tokenPath: 'typography/leading/normal',
        cssVar: '--typography-leading-normal',
        alias: 'type/line-height/normal',
        value: '150%',
        cssValue: '1.5',
      },
      {
        tokenPath: 'typography/leading/tight',
        cssVar: '--typography-leading-tight',
        alias: 'type/line-height/tight',
        value: '120%',
        cssValue: '1.2',
      },
    ],
  },
]
