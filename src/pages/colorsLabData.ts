/**
 * ACE Colors lab — Figma Colors page (node 2:4).
 * Style Sheet: FinScan Colors 2794:5 · Primitives: 5126:2 · Semantic vars: Semantic collection
 */

export type StyleSheetSwatch = {
  shade: string
  hex: string
  hsl: string
  bordered?: boolean
}

export type StyleSheetFamily = {
  id: string
  title: string
  subtitle?: string
  description: string
  swatches: StyleSheetSwatch[]
}

export type PaletteSwatch = {
  shade: string
  hex: string
  /** Figma path, e.g. color/neutral/50 */
  tokenPath: string
  cssVar: string
  bordered?: boolean
}

export type ColorPaletteFamily = {
  id: string
  title: string
  swatches: PaletteSwatch[]
}

export type SemanticTokenEntry = {
  tokenPath: string
  cssVar: string
  /** Primitive path this semantic aliases (Light, as in Figma) */
  alias: string
  hex: string
  bordered?: boolean
}

export type SemanticTokenGroup = {
  id: string
  title: string
  tokens: SemanticTokenEntry[]
}

function shadeSwatches(
  family: string,
  entries: Array<{ shade: string; hex: string; bordered?: boolean }>,
): PaletteSwatch[] {
  return entries.map(({ shade, hex, bordered }) => ({
    shade,
    hex,
    tokenPath: `color/${family}/${shade}`,
    cssVar: `--color-${family}-${shade}`,
    bordered,
  }))
}

/** FinScan Colors / Color Styles — Figma node 2794:5 (includes Notice; Style Sheet only). */
export const COLOR_STYLE_SHEET_FAMILIES: StyleSheetFamily[] = [
  {
    id: 'neutral',
    title: 'Neutral',
    description:
      'These colors are used as supporting secondary colors in backgrounds, text colors, seperators, models, etc',
    swatches: [
      { shade: '50', hex: '#FAFAFB', hsl: 'HSL 240 11 98 100', bordered: true },
      { shade: '100', hex: '#EFF0F2', hsl: 'HSL 220 10 94 100' },
      { shade: '200', hex: '#E4E6EA', hsl: 'HSL 220 13 91 100' },
      { shade: '300', hex: '#DADCE1', hsl: 'HSL 223 10 87 100' },
      { shade: '400', hex: '#CFD2D9', hsl: 'HSL 222 12 83 100' },
      { shade: '500', hex: '#949BAA', hsl: 'HSL 222 11 62 100' },
      { shade: '600', hex: '#6A7285', hsl: 'HSL 222 11 47 100' },
      { shade: '700', hex: '#464C59', hsl: 'HSL 221 12 31 100' },
      { shade: '800', hex: '#23262C', hsl: 'HSL 220 11 15 100' },
      { shade: '900', hex: '#121316', hsl: 'HSL 225 10 8 100' },
    ],
  },
  {
    id: 'primary',
    title: 'Primary',
    subtitle: 'FinScan Purple',
    description:
      'The primary color palette is used across all the interactive elements such as CTA’s, links, inputs, active states, etc',
    swatches: [
      { shade: '50', hex: '#EFEEF9', hsl: 'HSL 246 38 95 100', bordered: true },
      { shade: '100', hex: '#CBC5EC', hsl: 'HSL 249 51 85 100' },
      { shade: '200', hex: '#A296DC', hsl: 'HSL 250 50 73 100' },
      { shade: '300', hex: '#7868CD', hsl: 'HSL 250 50 61 100' },
      { shade: '400', hex: '#523EB9', hsl: 'HSL 250 50 58 100' },
      { shade: '500', hex: '#3D2E8A', hsl: 'HSL 250 50 36 100' },
      { shade: '600', hex: '#312570', hsl: 'HSL 250 50 29 100' },
      { shade: '700', hex: '#261C55', hsl: 'HSL 251 50 22 100' },
      { shade: '800', hex: '#1A143B', hsl: 'HSL 249 49 15 100' },
      { shade: '900', hex: '#0F0B21', hsl: 'HSL 251 50 9 100' },
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    subtitle: 'Enlighten Violet',
    description:
      'This is the primary color palette for Enlighten but may also be used as a secondary palette in FinScan.',
    swatches: [
      { shade: '50', hex: '#FCF2FB', hsl: 'HSL 302 58 97 100', bordered: true },
      { shade: '100', hex: '#F1CCF0', hsl: 'HSL 302 58 87 100' },
      { shade: '200', hex: '#E7A5E5', hsl: 'HSL 302 58 78 100' },
      { shade: '300', hex: '#DD7FDA', hsl: 'HSL 302 58 68 100' },
      { shade: '400', hex: '#D258CF', hsl: 'HSL 302 58 58 100' },
      { shade: '500', hex: '#92278F', hsl: 'HSL 302 58 36 100' },
      { shade: '600', hex: '#6D1D6B', hsl: 'HSL 302 58 27 100' },
      { shade: '700', hex: '#491447', hsl: 'HSL 302 58 18 100' },
      { shade: '800', hex: '#250A24', hsl: 'HSL 302 58 9 100' },
      { shade: '900', hex: '#120512', hsl: 'HSL 302 58 5 100' },
    ],
  },
  {
    id: 'blue',
    title: 'Accent',
    subtitle: 'Innovative Blue',
    description:
      'The primary color palette is used across all the interactive elements such as CTA’s, links, inputs, active states, etc',
    swatches: [
      { shade: '50', hex: '#EAF8FE', hsl: 'HSL 197 86 96 100', bordered: true },
      { shade: '100', hex: '#ADE3FC', hsl: 'HSL 197 93 83 100' },
      { shade: '200', hex: '#6FCEFA', hsl: 'HSL 197 93 71 100' },
      { shade: '300', hex: '#31BAF7', hsl: 'HSL 197 93 58 100' },
      { shade: '400', hex: '#089DE1', hsl: 'HSL 197 93 46 100' },
      { shade: '500', hex: '#0672A3', hsl: 'HSL 197 93 33 100' },
      { shade: '600', hex: '#05557A', hsl: 'HSL 197 92 25 100' },
      { shade: '700', hex: '#033952', hsl: 'HSL 197 93 17 100' },
      { shade: '800', hex: '#021C29', hsl: 'HSL 197 91 8 100' },
      { shade: '900', hex: '#010E14', hsl: 'HSL 197 91 4 100' },
    ],
  },
  {
    id: 'teal',
    title: 'Secondary',
    subtitle: 'FinScan Teal',
    description:
      'The secondary color palette is used alongside the primary to indicate to the user it’s the secondary focus.',
    swatches: [
      { shade: '50', hex: '#F0FBFC', hsl: 'HSL 183 56 97 100', bordered: true },
      { shade: '100', hex: '#C1F0F3', hsl: 'HSL 183 68 85 100' },
      { shade: '200', hex: '#93E5EB', hsl: 'HSL 183 68 75 100' },
      { shade: '300', hex: '#64DAE2', hsl: 'HSL 183 68 64 100' },
      { shade: '400', hex: '#28CAD5', hsl: 'HSL 183 68 50 100' },
      { shade: '500', hex: '#22ADB6', hsl: 'HSL 183 68 42 100' },
      { shade: '600', hex: '#198289', hsl: 'HSL 183 68 32 100' },
      { shade: '700', hex: '#11565B', hsl: 'HSL 183 69 21 100' },
      { shade: '800', hex: '#092B2E', hsl: 'HSL 183 67 11 100' },
      { shade: '900', hex: '#041617', hsl: 'HSL 183 70 5 100' },
    ],
  },
  {
    id: 'success',
    title: 'Success',
    description:
      'These colors depict an emotion of positivity. Generally used across success, complete states.',
    swatches: [
      { shade: '50', hex: '#F8FBF1', hsl: 'HSL 78 56 96 100', bordered: true },
      { shade: '100', hex: '#E2F0C8', hsl: 'HSL 81 57 86 100' },
      { shade: '200', hex: '#CCE59F', hsl: 'HSL 81 57 76 100' },
      { shade: '300', hex: '#B7DA75', hsl: 'HSL 81 58 66 100' },
      { shade: '400', hex: '#A1CF4C', hsl: 'HSL 81 58 55 100' },
      { shade: '500', hex: '#87B531', hsl: 'HSL 81 57 45 100' },
      { shade: '600', hex: '#658825', hsl: 'HSL 81 57 34 100' },
      { shade: '700', hex: '#435B18', hsl: 'HSL 81 58 23 100' },
      { shade: '800', hex: '#222D0C', hsl: 'HSL 80 58 11 100' },
      { shade: '900', hex: '#111706', hsl: 'HSL 81 59 6 100' },
    ],
  },
  {
    id: 'warning',
    title: 'Warning',
    description:
      'These colors depict an emotion of holding. Generally used across warning or on-hold states.',
    swatches: [
      { shade: '50', hex: '#FDF3EA', hsl: 'HSL 28 83 95 100', bordered: true },
      { shade: '100', hex: '#F9E0CB', hsl: 'HSL 27 79 89 100' },
      { shade: '200', hex: '#F4C8A1', hsl: 'HSL 28 79 79 100' },
      { shade: '300', hex: '#F0AF77', hsl: 'HSL 28 80 70 100' },
      { shade: '400', hex: '#EB974D', hsl: 'HSL 28 80 61 100' },
      { shade: '500', hex: '#E67E23', hsl: 'HSL 28 80 52 100' },
      { shade: '600', hex: '#C16616', hsl: 'HSL 28 80 42 100' },
      { shade: '700', hex: '#934E11', hsl: 'HSL 28 79 32 100' },
      { shade: '800', hex: '#66360C', hsl: 'HSL 28 79 22 100' },
      { shade: '900', hex: '#391E06', hsl: 'HSL 28 81 12 100' },
    ],
  },
  {
    id: 'notice',
    title: 'Notice',
    description:
      'These colors depict an emotion of holding. Generally used across warning or on-hold states.',
    swatches: [
      { shade: '50', hex: '#FFFCF3', hsl: 'HSL 45 100 98 100', bordered: true },
      { shade: '100', hex: '#FFF2CE', hsl: 'HSL 44 100 90 100' },
      { shade: '200', hex: '#FFE8AA', hsl: 'HSL 44 100 83 100' },
      { shade: '300', hex: '#FFDF85', hsl: 'HSL 44 100 76 100' },
      { shade: '400', hex: '#FFD560', hsl: 'HSL 44 100 69 100' },
      { shade: '500', hex: '#FFBE0B', hsl: 'HSL 44 100 52 100' },
      { shade: '600', hex: '#C89200', hsl: 'HSL 44 100 39 100' },
      { shade: '700', hex: '#C89200', hsl: 'HSL 44 100 39 100' },
      { shade: '800', hex: '#856200', hsl: 'HSL 44 100 26 100' },
      { shade: '900', hex: '#423100', hsl: 'HSL 44 100 13 100' },
    ],
  },
  {
    id: 'error',
    title: 'Error',
    description:
      'These colors depict an emotion of negativity. Generally used across error states.',
    swatches: [
      { shade: '50', hex: '#FDF4F6', hsl: 'HSL 347 69 97 100', bordered: true },
      { shade: '100', hex: '#FADEE4', hsl: 'HSL 347 74 93 100' },
      { shade: '200', hex: '#F5BEC9', hsl: 'HSL 348 73 85 100' },
      { shade: '300', hex: '#EF9DAE', hsl: 'HSL 348 72 78 100' },
      { shade: '400', hex: '#EA7D93', hsl: 'HSL 348 72 70 100' },
      { shade: '500', hex: '#DC264B', hsl: 'HSL 348 72 51 100' },
      { shade: '600', hex: '#C21F40', hsl: 'HSL 348 72 44 100' },
      { shade: '700', hex: '#8B162E', hsl: 'HSL 348 73 32 100' },
      { shade: '800', hex: '#530D1C', hsl: 'HSL 347 73 19 100' },
      { shade: '900', hex: '#380912', hsl: 'HSL 349 72 13 100' },
    ],
  },
  {
    id: 'dark',
    title: 'Dark mode',
    description:
      'These colors depict an emotion of negativity. Generally used across error states.',
    swatches: [
      { shade: '50', hex: '#3A3C43', hsl: 'HSL 222 7 25 100' },
      { shade: '100', hex: '#373A41', hsl: 'HSL 222 8 24 100' },
      { shade: '200', hex: '#35373E', hsl: 'HSL 227 8 23 100' },
      { shade: '300', hex: '#30333A', hsl: 'HSL 222 9 21 100' },
      { shade: '400', hex: '#2E3138', hsl: 'HSL 222 10 20 100' },
      { shade: '500', hex: '#292C33', hsl: 'HSL 222 11 18 100' },
      { shade: '600', hex: '#272A31', hsl: 'HSL 222 11 17 100' },
      { shade: '700', hex: '#24272F', hsl: 'HSL 224 13 16 100' },
      { shade: '800', hex: '#20232A', hsl: 'HSL 222 14 15 100' },
      { shade: '900', hex: '#14171F', hsl: 'HSL 224 22 10 100' },
    ],
  },
  {
    id: 'shades',
    title: 'Shades',
    description:
      'These colors are used as supporting secondary colors in backgrounds, text colors, seperators, models, etc',
    swatches: [
      { shade: '0', hex: '#FFFFFF', hsl: 'HSL 0 0 100 100', bordered: true },
      { shade: '100', hex: '#000000', hsl: 'HSL 0 0 0 100' },
    ],
  },
]

/** Primitive Color Tokens — Figma node 5126:2 (no Notice scale). */
export const COLOR_PRIMITIVE_FAMILIES: ColorPaletteFamily[] = [
  {
    id: 'neutral',
    title: 'Neutral',
    swatches: shadeSwatches('neutral', [
      { shade: '50', hex: '#FAFAFB', bordered: true },
      { shade: '100', hex: '#EFF0F2' },
      { shade: '200', hex: '#E4E6EA' },
      { shade: '300', hex: '#DADCE1' },
      { shade: '400', hex: '#CFD2D9' },
      { shade: '500', hex: '#949BAA' },
      { shade: '600', hex: '#6A7285' },
      { shade: '700', hex: '#464C59' },
      { shade: '800', hex: '#23262C' },
      { shade: '900', hex: '#121316' },
    ]),
  },
  {
    id: 'primary',
    title: 'Primary',
    swatches: shadeSwatches('primary', [
      { shade: '50', hex: '#EFEEF9', bordered: true },
      { shade: '100', hex: '#CBC5EC' },
      { shade: '200', hex: '#A296DC' },
      { shade: '300', hex: '#7868CD' },
      { shade: '400', hex: '#523EB9' },
      { shade: '500', hex: '#3D2E8A' },
      { shade: '600', hex: '#312570' },
      { shade: '700', hex: '#261C55' },
      { shade: '800', hex: '#1A143B' },
      { shade: '900', hex: '#0F0B21' },
    ]),
  },
  {
    id: 'secondary',
    title: 'Secondary',
    swatches: shadeSwatches('secondary', [
      { shade: '50', hex: '#FCF2FB', bordered: true },
      { shade: '100', hex: '#F1CCF0' },
      { shade: '200', hex: '#E7A5E5' },
      { shade: '300', hex: '#DD7FDA' },
      { shade: '400', hex: '#D258CF' },
      { shade: '500', hex: '#92278F' },
      { shade: '600', hex: '#6D1D6B' },
      { shade: '700', hex: '#491447' },
      { shade: '800', hex: '#250A24' },
      { shade: '900', hex: '#120512' },
    ]),
  },
  {
    id: 'blue',
    title: 'Blue',
    swatches: shadeSwatches('blue', [
      { shade: '50', hex: '#EAF8FE', bordered: true },
      { shade: '100', hex: '#ADE3FC' },
      { shade: '200', hex: '#6FCEFA' },
      { shade: '300', hex: '#31BAF7' },
      { shade: '400', hex: '#089DE1' },
      { shade: '500', hex: '#0672A3' },
      { shade: '600', hex: '#05557A' },
      { shade: '700', hex: '#033952' },
      { shade: '800', hex: '#021C29' },
      { shade: '900', hex: '#010E14' },
    ]),
  },
  {
    id: 'teal',
    title: 'Teal',
    swatches: shadeSwatches('teal', [
      { shade: '50', hex: '#F0FBFC', bordered: true },
      { shade: '100', hex: '#C1F0F3' },
      { shade: '200', hex: '#93E5EB' },
      { shade: '300', hex: '#64DAE2' },
      { shade: '400', hex: '#28CAD5' },
      { shade: '500', hex: '#22ADB6' },
      { shade: '600', hex: '#198289' },
      { shade: '700', hex: '#11565B' },
      { shade: '800', hex: '#092B2E' },
      { shade: '900', hex: '#041617' },
    ]),
  },
  {
    id: 'success',
    title: 'Success',
    swatches: shadeSwatches('success', [
      { shade: '50', hex: '#F8FBF1', bordered: true },
      { shade: '100', hex: '#E2F0C8' },
      { shade: '200', hex: '#CCE59F' },
      { shade: '300', hex: '#B7DA75' },
      { shade: '400', hex: '#A1CF4C' },
      { shade: '500', hex: '#87B531' },
      { shade: '600', hex: '#658825' },
      { shade: '700', hex: '#435B18' },
      { shade: '800', hex: '#222D0C' },
      { shade: '900', hex: '#111706' },
    ]),
  },
  {
    id: 'warning',
    title: 'Warning',
    swatches: shadeSwatches('warning', [
      { shade: '50', hex: '#FDF3EA', bordered: true },
      { shade: '100', hex: '#F9E0CB' },
      { shade: '200', hex: '#F4C8A1' },
      { shade: '300', hex: '#F0AF77' },
      { shade: '400', hex: '#EB974D' },
      { shade: '500', hex: '#E67E23' },
      { shade: '600', hex: '#C16616' },
      { shade: '700', hex: '#934E11' },
      { shade: '800', hex: '#66360C' },
      { shade: '900', hex: '#391E06' },
    ]),
  },
  {
    id: 'error',
    title: 'Error',
    swatches: shadeSwatches('error', [
      { shade: '50', hex: '#FDF4F6', bordered: true },
      { shade: '100', hex: '#FADEE4' },
      { shade: '200', hex: '#F5BEC9' },
      { shade: '300', hex: '#EF9DAE' },
      { shade: '400', hex: '#EA7D93' },
      { shade: '500', hex: '#DC264B' },
      { shade: '600', hex: '#C21F40' },
      { shade: '700', hex: '#8B162E' },
      { shade: '800', hex: '#530D1C' },
      { shade: '900', hex: '#380912' },
    ]),
  },
  {
    id: 'dark',
    title: 'Dark',
    swatches: shadeSwatches('dark', [
      { shade: '50', hex: '#3A3C43' },
      { shade: '100', hex: '#373A41' },
      { shade: '200', hex: '#35373E' },
      { shade: '300', hex: '#30333A' },
      { shade: '400', hex: '#2E3138' },
      { shade: '500', hex: '#292C33' },
      { shade: '600', hex: '#272A31' },
      { shade: '700', hex: '#24272F' },
      { shade: '800', hex: '#20232A' },
      { shade: '900', hex: '#14171F' },
    ]),
  },
  {
    id: 'shades',
    title: 'Shades',
    swatches: shadeSwatches('shades', [
      { shade: '0', hex: '#FFFFFF', bordered: true },
      { shade: '100', hex: '#000000' },
    ]),
  },
]

/** @deprecated Prefer COLOR_PRIMITIVE_FAMILIES */
export const COLOR_PALETTE_FAMILIES = COLOR_PRIMITIVE_FAMILIES

/** Semantic Color Tokens — Figma Semantic collection (Light aliases). */
export const COLOR_SEMANTIC_GROUPS: SemanticTokenGroup[] = [
  {
    id: 'bg',
    title: 'Background',
    tokens: [
      {
        tokenPath: 'colors/bg/primary',
        cssVar: '--color-bg-primary',
        alias: 'color/neutral/50',
        hex: '#FAFAFB',
        bordered: true,
      },
      {
        tokenPath: 'colors/bg/secondary',
        cssVar: '--color-bg-secondary',
        alias: 'color/neutral/100',
        hex: '#EFF0F2',
      },
      {
        tokenPath: 'colors/bg/tertiary',
        cssVar: '--color-bg-tertiary',
        alias: 'color/neutral/200',
        hex: '#E4E6EA',
      },
      {
        tokenPath: 'colors/bg/inverse',
        cssVar: '--color-bg-inverse',
        alias: 'color/neutral/900',
        hex: '#121316',
      },
      {
        tokenPath: 'colors/bg/brand',
        cssVar: '--color-bg-brand',
        alias: 'color/primary/400',
        hex: '#523EB9',
      },
      {
        tokenPath: 'colors/bg/brand-subtle',
        cssVar: '--color-bg-brand-subtle',
        alias: 'color/primary/100',
        hex: '#CBC5EC',
      },
      {
        tokenPath: 'colors/bg/brand-hover',
        cssVar: '--color-bg-brand-hover',
        alias: 'color/primary/50',
        hex: '#EFEEF9',
        bordered: true,
      },
      {
        tokenPath: 'colors/bg/disabled',
        cssVar: '--color-bg-disabled',
        alias: 'color/neutral/600',
        hex: '#6A7285',
      },
      {
        tokenPath: 'colors/bg/disabled-subtle',
        cssVar: '--color-bg-disabled-subtle',
        alias: 'color/neutral/100',
        hex: '#EFF0F2',
      },
      {
        tokenPath: 'colors/bg/success',
        cssVar: '--color-bg-success',
        alias: 'color/success/50',
        hex: '#F8FBF1',
        bordered: true,
      },
      {
        tokenPath: 'colors/bg/warning',
        cssVar: '--color-bg-warning',
        alias: 'color/warning/50',
        hex: '#FDF3EA',
        bordered: true,
      },
      {
        tokenPath: 'colors/bg/error',
        cssVar: '--color-bg-error',
        alias: 'color/error/50',
        hex: '#FDF4F6',
        bordered: true,
      },
    ],
  },
  {
    id: 'surface',
    title: 'Surface',
    tokens: [
      {
        tokenPath: 'colors/surface/primary',
        cssVar: '--color-surface-primary',
        alias: 'color/shades/0',
        hex: '#FFFFFF',
        bordered: true,
      },
      {
        tokenPath: 'colors/surface/page-layout',
        cssVar: '--color-surface-page-layout',
        alias: 'color/neutral/50',
        hex: '#FAFAFB',
        bordered: true,
      },
      {
        tokenPath: 'colors/surface/elevated',
        cssVar: '--color-surface-elevated',
        alias: 'color/shades/0',
        hex: '#FFFFFF',
        bordered: true,
      },
    ],
  },
  {
    id: 'text',
    title: 'Text',
    tokens: [
      {
        tokenPath: 'colors/text/primary',
        cssVar: '--color-text-primary',
        alias: 'color/neutral/800',
        hex: '#23262C',
      },
      {
        tokenPath: 'colors/text/secondary',
        cssVar: '--color-text-secondary',
        alias: 'color/neutral/700',
        hex: '#464C59',
      },
      {
        tokenPath: 'colors/text/disabled',
        cssVar: '--color-text-disabled',
        alias: 'color/neutral/600',
        hex: '#6A7285',
      },
      {
        tokenPath: 'colors/text/placeholder',
        cssVar: '--color-text-placeholder',
        alias: 'color/neutral/400',
        hex: '#CFD2D9',
      },
      {
        tokenPath: 'colors/text/inverse',
        cssVar: '--color-text-inverse',
        alias: 'color/shades/0',
        hex: '#FFFFFF',
        bordered: true,
      },
      {
        tokenPath: 'colors/text/brand',
        cssVar: '--color-text-brand',
        alias: 'color/primary/400',
        hex: '#523EB9',
      },
      {
        tokenPath: 'colors/text/link',
        cssVar: '--color-text-link',
        alias: 'color/blue/500',
        hex: '#0672A3',
      },
    ],
  },
  {
    id: 'border',
    title: 'Border',
    tokens: [
      {
        tokenPath: 'colors/border/default',
        cssVar: '--color-border-default',
        alias: 'color/neutral/400',
        hex: '#CFD2D9',
      },
      {
        tokenPath: 'colors/border/subtle',
        cssVar: '--color-border-subtle',
        alias: 'color/neutral/200',
        hex: '#E4E6EA',
      },
      {
        tokenPath: 'colors/border/brand',
        cssVar: '--color-border-brand',
        alias: 'color/primary/400',
        hex: '#523EB9',
      },
      {
        tokenPath: 'colors/border/focus',
        cssVar: '--color-border-focus',
        alias: 'color/primary/300',
        hex: '#7868CD',
      },
      {
        tokenPath: 'colors/border/inverse',
        cssVar: '--color-border-inverse',
        alias: 'color/shades/0',
        hex: '#FFFFFF',
        bordered: true,
      },
      {
        tokenPath: 'colors/border/disabled',
        cssVar: '--color-border-disabled',
        alias: 'color/neutral/600',
        hex: '#6A7285',
      },
      {
        tokenPath: 'colors/border/disabled-subtle',
        cssVar: '--color-border-disabled-subtle',
        alias: 'color/neutral/300',
        hex: '#DADCE1',
      },
      {
        tokenPath: 'colors/border/error',
        cssVar: '--color-border-error',
        alias: 'color/error/500',
        hex: '#DC264B',
      },
      {
        tokenPath: 'colors/border/success',
        cssVar: '--color-border-success',
        alias: 'color/success/500',
        hex: '#87B531',
      },
      {
        tokenPath: 'colors/border/warning',
        cssVar: '--color-border-warning',
        alias: 'color/warning/500',
        hex: '#E67E23',
      },
    ],
  },
  {
    id: 'action',
    title: 'Action',
    tokens: [
      {
        tokenPath: 'colors/action/primary',
        cssVar: '--color-action-primary',
        alias: 'color/primary/400',
        hex: '#523EB9',
      },
      {
        tokenPath: 'colors/action/primary-hover',
        cssVar: '--color-action-primary-hover',
        alias: 'color/primary/600',
        hex: '#312570',
      },
      {
        tokenPath: 'colors/action/primary-pressed',
        cssVar: '--color-action-primary-pressed',
        alias: 'color/primary/700',
        hex: '#261C55',
      },
      {
        tokenPath: 'colors/action/primary - hover - subtle',
        cssVar: '--color-action-primary-hover-subtle',
        alias: 'color/primary/100',
        hex: '#CBC5EC',
      },
      {
        tokenPath: 'colors/action/primary - pressed - subtle',
        cssVar: '--color-action-primary-pressed-subtle',
        alias: 'color/primary/300',
        hex: '#7868CD',
      },
      {
        tokenPath: 'colors/action/secondary',
        cssVar: '--color-action-secondary',
        alias: 'color/secondary/500',
        hex: '#92278F',
      },
      {
        tokenPath: 'colors/action/secondary-hover',
        cssVar: '--color-action-secondary-hover',
        alias: 'color/secondary/600',
        hex: '#6D1D6B',
      },
      {
        tokenPath: 'colors/action/secondary-pressed',
        cssVar: '--color-action-secondary-pressed',
        alias: 'color/secondary/700',
        hex: '#491447',
      },
      {
        tokenPath: 'colors/action/disabled',
        cssVar: '--color-action-disabled',
        alias: 'color/neutral/200',
        hex: '#E4E6EA',
      },
      {
        tokenPath: 'colors/action/disabled-button',
        cssVar: '--color-action-disabled-button',
        alias: 'color/neutral/400',
        hex: '#CFD2D9',
      },
      {
        tokenPath: 'colors/action/success',
        cssVar: '--color-action-success',
        alias: 'color/success/500',
        hex: '#87B531',
      },
      {
        tokenPath: 'colors/action/success-hover',
        cssVar: '--color-action-success-hover',
        alias: 'color/success/600',
        hex: '#658825',
      },
      {
        tokenPath: 'colors/action/success-pressed',
        cssVar: '--color-action-success-pressed',
        alias: 'color/success/700',
        hex: '#435B18',
      },
      {
        tokenPath: 'colors/action/warning',
        cssVar: '--color-action-warning',
        alias: 'color/warning/500',
        hex: '#E67E23',
      },
      {
        tokenPath: 'colors/action/warning-hover',
        cssVar: '--color-action-warning-hover',
        alias: 'color/warning/600',
        hex: '#C16616',
      },
      {
        tokenPath: 'colors/action/warning-pressed',
        cssVar: '--color-action-warning-pressed',
        alias: 'color/warning/700',
        hex: '#934E11',
      },
      {
        tokenPath: 'colors/action/error',
        cssVar: '--color-action-error',
        alias: 'color/error/500',
        hex: '#DC264B',
      },
      {
        tokenPath: 'colors/action/error-hover',
        cssVar: '--color-action-error-hover',
        alias: 'color/error/600',
        hex: '#C21F40',
      },
      {
        tokenPath: 'colors/action/error-pressed',
        cssVar: '--color-action-error-pressed',
        alias: 'color/error/700',
        hex: '#8B162E',
      },
    ],
  },
  {
    id: 'status',
    title: 'Status',
    tokens: [
      {
        tokenPath: 'colors/status/success',
        cssVar: '--color-status-success',
        alias: 'color/success/500',
        hex: '#87B531',
      },
      {
        tokenPath: 'colors/status/success-subtle',
        cssVar: '--color-status-success-subtle',
        alias: 'color/success/50',
        hex: '#F8FBF1',
        bordered: true,
      },
      {
        tokenPath: 'colors/status/warning',
        cssVar: '--color-status-warning',
        alias: 'color/warning/500',
        hex: '#E67E23',
      },
      {
        tokenPath: 'colors/status/warning-subtle',
        cssVar: '--color-status-warning-subtle',
        alias: 'color/warning/50',
        hex: '#FDF3EA',
        bordered: true,
      },
      {
        tokenPath: 'colors/status/error',
        cssVar: '--color-status-error',
        alias: 'color/error/500',
        hex: '#DC264B',
      },
      {
        tokenPath: 'colors/status/error-subtle',
        cssVar: '--color-status-error-subtle',
        alias: 'color/error/50',
        hex: '#FDF4F6',
        bordered: true,
      },
      {
        tokenPath: 'colors/status/info',
        cssVar: '--color-status-info',
        alias: 'color/blue/500',
        hex: '#0672A3',
      },
      {
        tokenPath: 'colors/status/info-subtle',
        cssVar: '--color-status-info-subtle',
        alias: 'color/blue/50',
        hex: '#EAF8FE',
        bordered: true,
      },
    ],
  },
  {
    id: 'icon',
    title: 'Icon',
    tokens: [
      {
        tokenPath: 'colors/icon/primary',
        cssVar: '--color-icon-primary',
        alias: 'color/neutral/900',
        hex: '#121316',
      },
      {
        tokenPath: 'colors/icon/secondary',
        cssVar: '--color-icon-secondary',
        alias: 'color/neutral/500',
        hex: '#949BAA',
      },
      {
        tokenPath: 'colors/icon/disabled',
        cssVar: '--color-icon-disabled',
        alias: 'color/neutral/300',
        hex: '#DADCE1',
      },
      {
        tokenPath: 'colors/icon/brand',
        cssVar: '--color-icon-brand',
        alias: 'color/primary/500',
        hex: '#3D2E8A',
      },
      {
        tokenPath: 'colors/icon/inverse',
        cssVar: '--color-icon-inverse',
        alias: 'color/shades/0',
        hex: '#FFFFFF',
        bordered: true,
      },
      {
        tokenPath: 'colors/icon/remove',
        cssVar: '--color-icon-remove',
        alias: 'color/error/500',
        hex: '#DC264B',
      },
    ],
  },
]
