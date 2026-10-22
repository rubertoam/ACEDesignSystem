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

/** Generated from Figma Primitives/Default.tokens.json */
export const COLOR_PRIMITIVE_FAMILIES: ColorPaletteFamily[] = [
  {
    "id": "neutral",
    "title": "Neutral",
    "swatches": [
      {
        "shade": "50",
        "hex": "#FAFAFB",
        "tokenPath": "color/neutral/50",
        "cssVar": "--color-neutral-50",
        "bordered": true
      },
      {
        "shade": "100",
        "hex": "#EFF0F2",
        "tokenPath": "color/neutral/100",
        "cssVar": "--color-neutral-100"
      },
      {
        "shade": "200",
        "hex": "#E4E6EA",
        "tokenPath": "color/neutral/200",
        "cssVar": "--color-neutral-200"
      },
      {
        "shade": "300",
        "hex": "#DADCE1",
        "tokenPath": "color/neutral/300",
        "cssVar": "--color-neutral-300"
      },
      {
        "shade": "400",
        "hex": "#CFD2D9",
        "tokenPath": "color/neutral/400",
        "cssVar": "--color-neutral-400"
      },
      {
        "shade": "500",
        "hex": "#949BAA",
        "tokenPath": "color/neutral/500",
        "cssVar": "--color-neutral-500"
      },
      {
        "shade": "600",
        "hex": "#6A7285",
        "tokenPath": "color/neutral/600",
        "cssVar": "--color-neutral-600"
      },
      {
        "shade": "700",
        "hex": "#464C59",
        "tokenPath": "color/neutral/700",
        "cssVar": "--color-neutral-700"
      },
      {
        "shade": "800",
        "hex": "#23262C",
        "tokenPath": "color/neutral/800",
        "cssVar": "--color-neutral-800"
      },
      {
        "shade": "900",
        "hex": "#121316",
        "tokenPath": "color/neutral/900",
        "cssVar": "--color-neutral-900"
      }
    ]
  },
  {
    "id": "primary",
    "title": "Primary",
    "swatches": [
      {
        "shade": "50",
        "hex": "#EFEEF9",
        "tokenPath": "color/primary/50",
        "cssVar": "--color-primary-50"
      },
      {
        "shade": "100",
        "hex": "#CBC5EC",
        "tokenPath": "color/primary/100",
        "cssVar": "--color-primary-100"
      },
      {
        "shade": "200",
        "hex": "#A296DC",
        "tokenPath": "color/primary/200",
        "cssVar": "--color-primary-200"
      },
      {
        "shade": "300",
        "hex": "#7868CD",
        "tokenPath": "color/primary/300",
        "cssVar": "--color-primary-300"
      },
      {
        "shade": "400",
        "hex": "#523EB9",
        "tokenPath": "color/primary/400",
        "cssVar": "--color-primary-400"
      },
      {
        "shade": "500",
        "hex": "#3D2E8A",
        "tokenPath": "color/primary/500",
        "cssVar": "--color-primary-500"
      },
      {
        "shade": "600",
        "hex": "#312570",
        "tokenPath": "color/primary/600",
        "cssVar": "--color-primary-600"
      },
      {
        "shade": "700",
        "hex": "#261C55",
        "tokenPath": "color/primary/700",
        "cssVar": "--color-primary-700"
      },
      {
        "shade": "800",
        "hex": "#1A143B",
        "tokenPath": "color/primary/800",
        "cssVar": "--color-primary-800"
      },
      {
        "shade": "900",
        "hex": "#0F0B21",
        "tokenPath": "color/primary/900",
        "cssVar": "--color-primary-900"
      }
    ]
  },
  {
    "id": "secondary",
    "title": "Secondary",
    "swatches": [
      {
        "shade": "50",
        "hex": "#FCF2FB",
        "tokenPath": "color/secondary/50",
        "cssVar": "--color-secondary-50"
      },
      {
        "shade": "100",
        "hex": "#F1CCF0",
        "tokenPath": "color/secondary/100",
        "cssVar": "--color-secondary-100"
      },
      {
        "shade": "200",
        "hex": "#E7A5E5",
        "tokenPath": "color/secondary/200",
        "cssVar": "--color-secondary-200"
      },
      {
        "shade": "300",
        "hex": "#DD7FDA",
        "tokenPath": "color/secondary/300",
        "cssVar": "--color-secondary-300"
      },
      {
        "shade": "400",
        "hex": "#D258CF",
        "tokenPath": "color/secondary/400",
        "cssVar": "--color-secondary-400"
      },
      {
        "shade": "500",
        "hex": "#92278F",
        "tokenPath": "color/secondary/500",
        "cssVar": "--color-secondary-500"
      },
      {
        "shade": "600",
        "hex": "#6D1D6B",
        "tokenPath": "color/secondary/600",
        "cssVar": "--color-secondary-600"
      },
      {
        "shade": "700",
        "hex": "#491447",
        "tokenPath": "color/secondary/700",
        "cssVar": "--color-secondary-700"
      },
      {
        "shade": "800",
        "hex": "#250A24",
        "tokenPath": "color/secondary/800",
        "cssVar": "--color-secondary-800"
      },
      {
        "shade": "900",
        "hex": "#120512",
        "tokenPath": "color/secondary/900",
        "cssVar": "--color-secondary-900"
      }
    ]
  },
  {
    "id": "blue",
    "title": "Blue",
    "swatches": [
      {
        "shade": "50",
        "hex": "#EAF8FE",
        "tokenPath": "color/blue/50",
        "cssVar": "--color-blue-50"
      },
      {
        "shade": "100",
        "hex": "#ADE3FC",
        "tokenPath": "color/blue/100",
        "cssVar": "--color-blue-100"
      },
      {
        "shade": "200",
        "hex": "#6FCEFA",
        "tokenPath": "color/blue/200",
        "cssVar": "--color-blue-200"
      },
      {
        "shade": "300",
        "hex": "#31BAF7",
        "tokenPath": "color/blue/300",
        "cssVar": "--color-blue-300"
      },
      {
        "shade": "400",
        "hex": "#089DE1",
        "tokenPath": "color/blue/400",
        "cssVar": "--color-blue-400"
      },
      {
        "shade": "500",
        "hex": "#0672A3",
        "tokenPath": "color/blue/500",
        "cssVar": "--color-blue-500"
      },
      {
        "shade": "600",
        "hex": "#05557A",
        "tokenPath": "color/blue/600",
        "cssVar": "--color-blue-600"
      },
      {
        "shade": "700",
        "hex": "#033952",
        "tokenPath": "color/blue/700",
        "cssVar": "--color-blue-700"
      },
      {
        "shade": "800",
        "hex": "#021C29",
        "tokenPath": "color/blue/800",
        "cssVar": "--color-blue-800"
      },
      {
        "shade": "900",
        "hex": "#010E14",
        "tokenPath": "color/blue/900",
        "cssVar": "--color-blue-900"
      }
    ]
  },
  {
    "id": "teal",
    "title": "Teal",
    "swatches": [
      {
        "shade": "50",
        "hex": "#F0FBFC",
        "tokenPath": "color/teal/50",
        "cssVar": "--color-teal-50"
      },
      {
        "shade": "100",
        "hex": "#C1F0F3",
        "tokenPath": "color/teal/100",
        "cssVar": "--color-teal-100"
      },
      {
        "shade": "200",
        "hex": "#93E5EB",
        "tokenPath": "color/teal/200",
        "cssVar": "--color-teal-200"
      },
      {
        "shade": "300",
        "hex": "#64DAE2",
        "tokenPath": "color/teal/300",
        "cssVar": "--color-teal-300"
      },
      {
        "shade": "400",
        "hex": "#28CAD5",
        "tokenPath": "color/teal/400",
        "cssVar": "--color-teal-400"
      },
      {
        "shade": "500",
        "hex": "#22ADB6",
        "tokenPath": "color/teal/500",
        "cssVar": "--color-teal-500"
      },
      {
        "shade": "600",
        "hex": "#198289",
        "tokenPath": "color/teal/600",
        "cssVar": "--color-teal-600"
      },
      {
        "shade": "700",
        "hex": "#11565B",
        "tokenPath": "color/teal/700",
        "cssVar": "--color-teal-700"
      },
      {
        "shade": "800",
        "hex": "#092B2E",
        "tokenPath": "color/teal/800",
        "cssVar": "--color-teal-800"
      },
      {
        "shade": "900",
        "hex": "#041617",
        "tokenPath": "color/teal/900",
        "cssVar": "--color-teal-900"
      }
    ]
  },
  {
    "id": "success",
    "title": "Success",
    "swatches": [
      {
        "shade": "50",
        "hex": "#F8FBF1",
        "tokenPath": "color/success/50",
        "cssVar": "--color-success-50"
      },
      {
        "shade": "100",
        "hex": "#E2F0C8",
        "tokenPath": "color/success/100",
        "cssVar": "--color-success-100"
      },
      {
        "shade": "200",
        "hex": "#CCE59F",
        "tokenPath": "color/success/200",
        "cssVar": "--color-success-200"
      },
      {
        "shade": "300",
        "hex": "#B7DA75",
        "tokenPath": "color/success/300",
        "cssVar": "--color-success-300"
      },
      {
        "shade": "400",
        "hex": "#A1CF4C",
        "tokenPath": "color/success/400",
        "cssVar": "--color-success-400"
      },
      {
        "shade": "500",
        "hex": "#87B531",
        "tokenPath": "color/success/500",
        "cssVar": "--color-success-500"
      },
      {
        "shade": "600",
        "hex": "#658825",
        "tokenPath": "color/success/600",
        "cssVar": "--color-success-600"
      },
      {
        "shade": "700",
        "hex": "#435B18",
        "tokenPath": "color/success/700",
        "cssVar": "--color-success-700"
      },
      {
        "shade": "800",
        "hex": "#222D0C",
        "tokenPath": "color/success/800",
        "cssVar": "--color-success-800"
      },
      {
        "shade": "900",
        "hex": "#111706",
        "tokenPath": "color/success/900",
        "cssVar": "--color-success-900"
      }
    ]
  },
  {
    "id": "warning",
    "title": "Warning",
    "swatches": [
      {
        "shade": "50",
        "hex": "#FDF3EA",
        "tokenPath": "color/warning/50",
        "cssVar": "--color-warning-50"
      },
      {
        "shade": "100",
        "hex": "#F9E0CB",
        "tokenPath": "color/warning/100",
        "cssVar": "--color-warning-100"
      },
      {
        "shade": "200",
        "hex": "#F4C8A1",
        "tokenPath": "color/warning/200",
        "cssVar": "--color-warning-200"
      },
      {
        "shade": "300",
        "hex": "#F0AF77",
        "tokenPath": "color/warning/300",
        "cssVar": "--color-warning-300"
      },
      {
        "shade": "400",
        "hex": "#EB974D",
        "tokenPath": "color/warning/400",
        "cssVar": "--color-warning-400"
      },
      {
        "shade": "500",
        "hex": "#E67E23",
        "tokenPath": "color/warning/500",
        "cssVar": "--color-warning-500"
      },
      {
        "shade": "600",
        "hex": "#C16616",
        "tokenPath": "color/warning/600",
        "cssVar": "--color-warning-600"
      },
      {
        "shade": "700",
        "hex": "#934E11",
        "tokenPath": "color/warning/700",
        "cssVar": "--color-warning-700"
      },
      {
        "shade": "800",
        "hex": "#66360C",
        "tokenPath": "color/warning/800",
        "cssVar": "--color-warning-800"
      },
      {
        "shade": "900",
        "hex": "#391E06",
        "tokenPath": "color/warning/900",
        "cssVar": "--color-warning-900"
      }
    ]
  },
  {
    "id": "warning-2",
    "title": "Warning 2 (Notice / Yellow)",
    "swatches": [
      {
        "shade": "50",
        "hex": "#FFFCF3",
        "tokenPath": "color/warning 2/50",
        "cssVar": "--color-warning-2-50"
      },
      {
        "shade": "100",
        "hex": "#FFF2CE",
        "tokenPath": "color/warning 2/100",
        "cssVar": "--color-warning-2-100"
      },
      {
        "shade": "200",
        "hex": "#FFE8AA",
        "tokenPath": "color/warning 2/200",
        "cssVar": "--color-warning-2-200"
      },
      {
        "shade": "300",
        "hex": "#FFDF85",
        "tokenPath": "color/warning 2/300",
        "cssVar": "--color-warning-2-300"
      },
      {
        "shade": "400",
        "hex": "#FFD560",
        "tokenPath": "color/warning 2/400",
        "cssVar": "--color-warning-2-400"
      },
      {
        "shade": "500",
        "hex": "#FFBE0B",
        "tokenPath": "color/warning 2/500",
        "cssVar": "--color-warning-2-500"
      },
      {
        "shade": "600",
        "hex": "#C89200",
        "tokenPath": "color/warning 2/600",
        "cssVar": "--color-warning-2-600"
      },
      {
        "shade": "700",
        "hex": "#C89200",
        "tokenPath": "color/warning 2/700",
        "cssVar": "--color-warning-2-700"
      },
      {
        "shade": "800",
        "hex": "#856200",
        "tokenPath": "color/warning 2/800",
        "cssVar": "--color-warning-2-800"
      },
      {
        "shade": "900",
        "hex": "#423100",
        "tokenPath": "color/warning 2/900",
        "cssVar": "--color-warning-2-900"
      }
    ]
  },
  {
    "id": "error",
    "title": "Error",
    "swatches": [
      {
        "shade": "50",
        "hex": "#FDF4F6",
        "tokenPath": "color/error/50",
        "cssVar": "--color-error-50"
      },
      {
        "shade": "100",
        "hex": "#FADEE4",
        "tokenPath": "color/error/100",
        "cssVar": "--color-error-100"
      },
      {
        "shade": "200",
        "hex": "#F5BEC9",
        "tokenPath": "color/error/200",
        "cssVar": "--color-error-200"
      },
      {
        "shade": "300",
        "hex": "#EF9DAE",
        "tokenPath": "color/error/300",
        "cssVar": "--color-error-300"
      },
      {
        "shade": "400",
        "hex": "#EA7D93",
        "tokenPath": "color/error/400",
        "cssVar": "--color-error-400"
      },
      {
        "shade": "500",
        "hex": "#DC264B",
        "tokenPath": "color/error/500",
        "cssVar": "--color-error-500"
      },
      {
        "shade": "600",
        "hex": "#C21F40",
        "tokenPath": "color/error/600",
        "cssVar": "--color-error-600"
      },
      {
        "shade": "700",
        "hex": "#8B162E",
        "tokenPath": "color/error/700",
        "cssVar": "--color-error-700"
      },
      {
        "shade": "800",
        "hex": "#530D1C",
        "tokenPath": "color/error/800",
        "cssVar": "--color-error-800"
      },
      {
        "shade": "900",
        "hex": "#380912",
        "tokenPath": "color/error/900",
        "cssVar": "--color-error-900"
      }
    ]
  },
  {
    "id": "dark",
    "title": "Dark",
    "swatches": [
      {
        "shade": "50",
        "hex": "#B6C2CF",
        "tokenPath": "color/dark/50",
        "cssVar": "--color-dark-50"
      },
      {
        "shade": "100",
        "hex": "#8B9AA6",
        "tokenPath": "color/dark/100",
        "cssVar": "--color-dark-100"
      },
      {
        "shade": "200",
        "hex": "#596773",
        "tokenPath": "color/dark/200",
        "cssVar": "--color-dark-200"
      },
      {
        "shade": "300",
        "hex": "#444E59",
        "tokenPath": "color/dark/300",
        "cssVar": "--color-dark-300"
      },
      {
        "shade": "400",
        "hex": "#38414A",
        "tokenPath": "color/dark/400",
        "cssVar": "--color-dark-400"
      },
      {
        "shade": "500",
        "hex": "#2C333A",
        "tokenPath": "color/dark/500",
        "cssVar": "--color-dark-500"
      },
      {
        "shade": "600",
        "hex": "#282E33",
        "tokenPath": "color/dark/600",
        "cssVar": "--color-dark-600"
      },
      {
        "shade": "700",
        "hex": "#22272B",
        "tokenPath": "color/dark/700",
        "cssVar": "--color-dark-700"
      },
      {
        "shade": "750",
        "hex": "#20232A",
        "tokenPath": "color/dark/750",
        "cssVar": "--color-dark-750"
      },
      {
        "shade": "800",
        "hex": "#1D2125",
        "tokenPath": "color/dark/800",
        "cssVar": "--color-dark-800"
      },
      {
        "shade": "900",
        "hex": "#161A1D",
        "tokenPath": "color/dark/900",
        "cssVar": "--color-dark-900"
      },
      {
        "shade": "950",
        "hex": "#14171F",
        "tokenPath": "color/dark/950",
        "cssVar": "--color-dark-950"
      }
    ]
  },
  {
    "id": "shades",
    "title": "Shades",
    "swatches": [
      {
        "shade": "0",
        "hex": "#FFFFFF",
        "tokenPath": "color/shades/0",
        "cssVar": "--color-shades-0",
        "bordered": true
      },
      {
        "shade": "100",
        "hex": "#000000",
        "tokenPath": "color/shades/100",
        "cssVar": "--color-shades-100"
      }
    ]
  }
]

export const COLOR_PALETTE_FAMILIES = COLOR_PRIMITIVE_FAMILIES

/** Generated from Figma Semantic/Light.tokens.json */
export const COLOR_SEMANTIC_GROUPS: SemanticTokenGroup[] = [
  {
    "id": "bg",
    "title": "Bg",
    "tokens": [
      {
        "tokenPath": "colors/bg/primary",
        "cssVar": "--color-bg-primary",
        "alias": "color/neutral/50",
        "hex": "#FAFAFB",
        "bordered": true
      },
      {
        "tokenPath": "colors/bg/secondary",
        "cssVar": "--color-bg-secondary",
        "alias": "color/neutral/100",
        "hex": "#EFF0F2"
      },
      {
        "tokenPath": "colors/bg/tertiary",
        "cssVar": "--color-bg-tertiary",
        "alias": "color/neutral/200",
        "hex": "#E4E6EA"
      },
      {
        "tokenPath": "colors/bg/inverse",
        "cssVar": "--color-bg-inverse",
        "alias": "color/neutral/900",
        "hex": "#121316"
      },
      {
        "tokenPath": "colors/bg/brand",
        "cssVar": "--color-bg-brand",
        "alias": "color/primary/400",
        "hex": "#523EB9"
      },
      {
        "tokenPath": "colors/bg/brand-subtle",
        "cssVar": "--color-bg-brand-subtle",
        "alias": "color/primary/100",
        "hex": "#CBC5EC"
      },
      {
        "tokenPath": "colors/bg/brand-hover",
        "cssVar": "--color-bg-brand-hover",
        "alias": "color/primary/50",
        "hex": "#EFEEF9"
      },
      {
        "tokenPath": "colors/bg/disabled",
        "cssVar": "--color-bg-disabled",
        "alias": "color/neutral/600",
        "hex": "#6A7285"
      },
      {
        "tokenPath": "colors/bg/disabled-subtle",
        "cssVar": "--color-bg-disabled-subtle",
        "alias": "color/neutral/100",
        "hex": "#EFF0F2"
      },
      {
        "tokenPath": "colors/bg/success",
        "cssVar": "--color-bg-success",
        "alias": "color/success/50",
        "hex": "#F8FBF1"
      },
      {
        "tokenPath": "colors/bg/warning",
        "cssVar": "--color-bg-warning",
        "alias": "color/warning/50",
        "hex": "#FDF3EA"
      },
      {
        "tokenPath": "colors/bg/error",
        "cssVar": "--color-bg-error",
        "alias": "color/error/50",
        "hex": "#FDF4F6"
      }
    ]
  },
  {
    "id": "surface",
    "title": "Surface",
    "tokens": [
      {
        "tokenPath": "colors/surface/primary",
        "cssVar": "--color-surface-primary",
        "alias": "color/shades/0",
        "hex": "#FFFFFF",
        "bordered": true
      },
      {
        "tokenPath": "colors/surface/page-layout",
        "cssVar": "--color-surface-page-layout",
        "alias": "color/neutral/50",
        "hex": "#FAFAFB",
        "bordered": true
      },
      {
        "tokenPath": "colors/surface/elevated",
        "cssVar": "--color-surface-elevated",
        "alias": "color/shades/0",
        "hex": "#FFFFFF",
        "bordered": true
      }
    ]
  },
  {
    "id": "text",
    "title": "Text",
    "tokens": [
      {
        "tokenPath": "colors/text/primary",
        "cssVar": "--color-text-primary",
        "alias": "color/neutral/800",
        "hex": "#23262C"
      },
      {
        "tokenPath": "colors/text/secondary",
        "cssVar": "--color-text-secondary",
        "alias": "color/neutral/700",
        "hex": "#464C59"
      },
      {
        "tokenPath": "colors/text/disabled",
        "cssVar": "--color-text-disabled",
        "alias": "color/neutral/600",
        "hex": "#6A7285"
      },
      {
        "tokenPath": "colors/text/placeholder",
        "cssVar": "--color-text-placeholder",
        "alias": "color/neutral/400",
        "hex": "#CFD2D9"
      },
      {
        "tokenPath": "colors/text/inverse",
        "cssVar": "--color-text-inverse",
        "alias": "color/shades/0",
        "hex": "#FFFFFF",
        "bordered": true
      },
      {
        "tokenPath": "colors/text/brand",
        "cssVar": "--color-text-brand",
        "alias": "color/primary/400",
        "hex": "#523EB9"
      },
      {
        "tokenPath": "colors/text/link",
        "cssVar": "--color-text-link",
        "alias": "color/blue/500",
        "hex": "#0672A3"
      }
    ]
  },
  {
    "id": "border",
    "title": "Border",
    "tokens": [
      {
        "tokenPath": "colors/border/default",
        "cssVar": "--color-border-default",
        "alias": "color/neutral/400",
        "hex": "#CFD2D9"
      },
      {
        "tokenPath": "colors/border/subtle",
        "cssVar": "--color-border-subtle",
        "alias": "color/neutral/200",
        "hex": "#E4E6EA"
      },
      {
        "tokenPath": "colors/border/brand",
        "cssVar": "--color-border-brand",
        "alias": "color/primary/400",
        "hex": "#523EB9"
      },
      {
        "tokenPath": "colors/border/focus",
        "cssVar": "--color-border-focus",
        "alias": "color/primary/300",
        "hex": "#7868CD"
      },
      {
        "tokenPath": "colors/border/disabled",
        "cssVar": "--color-border-disabled",
        "alias": "color/neutral/600",
        "hex": "#6A7285"
      },
      {
        "tokenPath": "colors/border/disabled-subtle",
        "cssVar": "--color-border-disabled-subtle",
        "alias": "color/neutral/300",
        "hex": "#DADCE1"
      },
      {
        "tokenPath": "colors/border/inverse",
        "cssVar": "--color-border-inverse",
        "alias": "color/shades/0",
        "hex": "#FFFFFF",
        "bordered": true
      },
      {
        "tokenPath": "colors/border/success",
        "cssVar": "--color-border-success",
        "alias": "color/success/500",
        "hex": "#87B531"
      },
      {
        "tokenPath": "colors/border/warning",
        "cssVar": "--color-border-warning",
        "alias": "color/warning/500",
        "hex": "#E67E23"
      },
      {
        "tokenPath": "colors/border/error",
        "cssVar": "--color-border-error",
        "alias": "color/error/500",
        "hex": "#DC264B"
      }
    ]
  },
  {
    "id": "action",
    "title": "Action",
    "tokens": [
      {
        "tokenPath": "colors/action/primary",
        "cssVar": "--color-action-primary",
        "alias": "color/primary/400",
        "hex": "#523EB9"
      },
      {
        "tokenPath": "colors/action/primary-hover",
        "cssVar": "--color-action-primary-hover",
        "alias": "color/primary/600",
        "hex": "#312570"
      },
      {
        "tokenPath": "colors/action/primary - hover - subtle",
        "cssVar": "--color-action-primary-hover-subtle",
        "alias": "color/primary/100",
        "hex": "#CBC5EC"
      },
      {
        "tokenPath": "colors/action/primary-pressed",
        "cssVar": "--color-action-primary-pressed",
        "alias": "color/primary/700",
        "hex": "#261C55"
      },
      {
        "tokenPath": "colors/action/primary - pressed - subtle",
        "cssVar": "--color-action-primary-pressed-subtle",
        "alias": "color/primary/300",
        "hex": "#7868CD"
      },
      {
        "tokenPath": "colors/action/secondary",
        "cssVar": "--color-action-secondary",
        "alias": "color/secondary/500",
        "hex": "#92278F"
      },
      {
        "tokenPath": "colors/action/secondary-hover",
        "cssVar": "--color-action-secondary-hover",
        "alias": "color/secondary/600",
        "hex": "#6D1D6B"
      },
      {
        "tokenPath": "colors/action/secondary-pressed",
        "cssVar": "--color-action-secondary-pressed",
        "alias": "color/secondary/700",
        "hex": "#491447"
      },
      {
        "tokenPath": "colors/action/success",
        "cssVar": "--color-action-success",
        "alias": "color/success/500",
        "hex": "#87B531"
      },
      {
        "tokenPath": "colors/action/success-hover",
        "cssVar": "--color-action-success-hover",
        "alias": "color/success/600",
        "hex": "#658825"
      },
      {
        "tokenPath": "colors/action/success-pressed",
        "cssVar": "--color-action-success-pressed",
        "alias": "color/success/700",
        "hex": "#435B18"
      },
      {
        "tokenPath": "colors/action/error",
        "cssVar": "--color-action-error",
        "alias": "color/error/500",
        "hex": "#DC264B"
      },
      {
        "tokenPath": "colors/action/error-hover",
        "cssVar": "--color-action-error-hover",
        "alias": "color/error/600",
        "hex": "#C21F40"
      },
      {
        "tokenPath": "colors/action/error-pressed",
        "cssVar": "--color-action-error-pressed",
        "alias": "color/error/700",
        "hex": "#8B162E"
      },
      {
        "tokenPath": "colors/action/warning",
        "cssVar": "--color-action-warning",
        "alias": "color/warning/500",
        "hex": "#E67E23"
      },
      {
        "tokenPath": "colors/action/warning-hover",
        "cssVar": "--color-action-warning-hover",
        "alias": "color/warning/600",
        "hex": "#C16616"
      },
      {
        "tokenPath": "colors/action/warning-pressed",
        "cssVar": "--color-action-warning-pressed",
        "alias": "color/warning/700",
        "hex": "#934E11"
      },
      {
        "tokenPath": "colors/action/disabled",
        "cssVar": "--color-action-disabled",
        "alias": "color/neutral/600",
        "hex": "#6A7285"
      },
      {
        "tokenPath": "colors/action/disabled-button",
        "cssVar": "--color-action-disabled-button",
        "alias": "color/neutral/200",
        "hex": "#E4E6EA"
      }
    ]
  },
  {
    "id": "status",
    "title": "Status",
    "tokens": [
      {
        "tokenPath": "colors/status/success",
        "cssVar": "--color-status-success",
        "alias": "color/success/500",
        "hex": "#87B531"
      },
      {
        "tokenPath": "colors/status/success-subtle",
        "cssVar": "--color-status-success-subtle",
        "alias": "color/success/50",
        "hex": "#F8FBF1"
      },
      {
        "tokenPath": "colors/status/warning",
        "cssVar": "--color-status-warning",
        "alias": "color/warning/500",
        "hex": "#E67E23"
      },
      {
        "tokenPath": "colors/status/warning-subtle",
        "cssVar": "--color-status-warning-subtle",
        "alias": "color/warning/50",
        "hex": "#FDF3EA"
      },
      {
        "tokenPath": "colors/status/error",
        "cssVar": "--color-status-error",
        "alias": "color/error/500",
        "hex": "#DC264B"
      },
      {
        "tokenPath": "colors/status/error-subtle",
        "cssVar": "--color-status-error-subtle",
        "alias": "color/error/50",
        "hex": "#FDF4F6"
      },
      {
        "tokenPath": "colors/status/info",
        "cssVar": "--color-status-info",
        "alias": "color/blue/500",
        "hex": "#0672A3"
      },
      {
        "tokenPath": "colors/status/info-subtle",
        "cssVar": "--color-status-info-subtle",
        "alias": "color/blue/50",
        "hex": "#EAF8FE"
      }
    ]
  },
  {
    "id": "icon",
    "title": "Icon",
    "tokens": [
      {
        "tokenPath": "colors/icon/primary",
        "cssVar": "--color-icon-primary",
        "alias": "color/neutral/800",
        "hex": "#23262C"
      },
      {
        "tokenPath": "colors/icon/secondary",
        "cssVar": "--color-icon-secondary",
        "alias": "color/neutral/600",
        "hex": "#6A7285"
      },
      {
        "tokenPath": "colors/icon/disabled",
        "cssVar": "--color-icon-disabled",
        "alias": "color/neutral/500",
        "hex": "#949BAA"
      },
      {
        "tokenPath": "colors/icon/hover",
        "cssVar": "--color-icon-hover",
        "alias": "color/primary/50",
        "hex": "#EFEEF9"
      },
      {
        "tokenPath": "colors/icon/brand",
        "cssVar": "--color-icon-brand",
        "alias": "color/primary/400",
        "hex": "#523EB9"
      },
      {
        "tokenPath": "colors/icon/inverse",
        "cssVar": "--color-icon-inverse",
        "alias": "color/shades/0",
        "hex": "#FFFFFF",
        "bordered": true
      },
      {
        "tokenPath": "colors/icon/remove",
        "cssVar": "--color-icon-remove",
        "alias": "color/error/500",
        "hex": "#DC264B"
      }
    ]
  },
  {
    "id": "badges",
    "title": "Badges",
    "tokens": [
      {
        "tokenPath": "colors/badges/purple-fill",
        "cssVar": "--color-badges-purple-fill",
        "alias": "color/primary/50",
        "hex": "#EFEEF9"
      },
      {
        "tokenPath": "colors/badges/purple-border",
        "cssVar": "--color-badges-purple-border",
        "alias": "color/primary/400",
        "hex": "#523EB9"
      },
      {
        "tokenPath": "colors/badges/orange-fill",
        "cssVar": "--color-badges-orange-fill",
        "alias": "color/warning/50",
        "hex": "#FDF3EA"
      },
      {
        "tokenPath": "colors/badges/orange-border",
        "cssVar": "--color-badges-orange-border",
        "alias": "color/warning/500",
        "hex": "#E67E23"
      },
      {
        "tokenPath": "colors/badges/green-fill",
        "cssVar": "--color-badges-green-fill",
        "alias": "color/success/50",
        "hex": "#F8FBF1"
      },
      {
        "tokenPath": "colors/badges/green-border",
        "cssVar": "--color-badges-green-border",
        "alias": "color/success/500",
        "hex": "#87B531"
      },
      {
        "tokenPath": "colors/badges/gray-fill",
        "cssVar": "--color-badges-gray-fill",
        "alias": "color/neutral/200",
        "hex": "#E4E6EA"
      },
      {
        "tokenPath": "colors/badges/gray-border",
        "cssVar": "--color-badges-gray-border",
        "alias": "color/neutral/700",
        "hex": "#464C59"
      },
      {
        "tokenPath": "colors/badges/blue-fill",
        "cssVar": "--color-badges-blue-fill",
        "alias": "color/blue/50",
        "hex": "#EAF8FE"
      },
      {
        "tokenPath": "colors/badges/blue-border",
        "cssVar": "--color-badges-blue-border",
        "alias": "color/blue/400",
        "hex": "#089DE1"
      },
      {
        "tokenPath": "colors/badges/yellow-fill",
        "cssVar": "--color-badges-yellow-fill",
        "alias": "color/warning 2/50",
        "hex": "#FFFCF3"
      },
      {
        "tokenPath": "colors/badges/yellow-border",
        "cssVar": "--color-badges-yellow-border",
        "alias": "color/warning 2/500",
        "hex": "#FFBE0B"
      },
      {
        "tokenPath": "colors/badges/pink-fill",
        "cssVar": "--color-badges-pink-fill",
        "alias": "color/secondary/50",
        "hex": "#FCF2FB"
      },
      {
        "tokenPath": "colors/badges/pink-border",
        "cssVar": "--color-badges-pink-border",
        "alias": "color/secondary/500",
        "hex": "#92278F"
      },
      {
        "tokenPath": "colors/badges/teal-fill",
        "cssVar": "--color-badges-teal-fill",
        "alias": "color/teal/50",
        "hex": "#F0FBFC"
      },
      {
        "tokenPath": "colors/badges/teal-border",
        "cssVar": "--color-badges-teal-border",
        "alias": "color/teal/500",
        "hex": "#22ADB6"
      },
      {
        "tokenPath": "colors/badges/red-fill",
        "cssVar": "--color-badges-red-fill",
        "alias": "color/error/50",
        "hex": "#FDF4F6"
      },
      {
        "tokenPath": "colors/badges/red-border",
        "cssVar": "--color-badges-red-border",
        "alias": "color/error/500",
        "hex": "#DC264B"
      }
    ]
  }
]

