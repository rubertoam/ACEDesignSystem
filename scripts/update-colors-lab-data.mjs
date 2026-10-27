/**
 * Regenerates COLOR_PRIMITIVE_FAMILIES + COLOR_SEMANTIC_GROUPS in colorsLabData.ts
 */
import fs from 'node:fs'

const seed = JSON.parse(fs.readFileSync('scripts/.token-cache/lab-seed.json', 'utf8'))
const filePath = 'src/pages/colorsLabData.ts'
let src = fs.readFileSync(filePath, 'utf8')

function familyFromPath(tokenPath) {
  return tokenPath.replace(/^colors\//, 'color/').split('/')[1]
}
function shadeFromPath(tokenPath) {
  return tokenPath.split('/').pop()
}

const families = [
  'neutral',
  'primary',
  'secondary',
  'blue',
  'teal',
  'success',
  'warning',
  'warning 2',
  'error',
  'dark',
  'shades',
]
const paletteFamilies = []
for (const fam of families) {
  const swatches = seed.primitives
    .filter((t) => familyFromPath(t.tokenPath) === fam)
    .sort((a, b) =>
      String(shadeFromPath(a.tokenPath)).localeCompare(String(shadeFromPath(b.tokenPath)), undefined, {
        numeric: true,
      }),
    )
  if (!swatches.length) continue
  paletteFamilies.push({
    id: fam.replace(/\s+/g, '-'),
    title: fam === 'warning 2' ? 'Warning 2 (Notice / Yellow)' : fam.charAt(0).toUpperCase() + fam.slice(1),
    swatches: swatches.map((s) => {
      const hex = s.hex.toUpperCase()
      const entry = {
        shade: shadeFromPath(s.tokenPath),
        hex,
        tokenPath: s.tokenPath,
        cssVar: s.cssVar,
      }
      if (hex === '#FFFFFF' || hex === '#FAFAFB') entry.bordered = true
      return entry
    }),
  })
}

const darkByPath = new Map((seed.dark ?? []).map((t) => [t.tokenPath, t]))

const semanticGroupsOrder = ['bg', 'surface', 'text', 'border', 'action', 'status', 'icon', 'badges']
const semanticGroups = []
for (const g of semanticGroupsOrder) {
  const tokens = seed.light
    .filter((t) => t.tokenPath.startsWith(`colors/${g}/`))
    .map((t) => {
      const hex = t.hex.toUpperCase()
      const dark = darkByPath.get(t.tokenPath)
      const darkHex = dark?.hex ? String(dark.hex).toUpperCase() : ''
      const entry = {
        tokenPath: t.tokenPath,
        cssVar: t.cssVar,
        alias: t.alias ?? '',
        hex,
        darkAlias: dark?.alias ?? '',
        darkHex,
      }
      if (hex === '#FFFFFF' || hex === '#FAFAFB') entry.bordered = true
      if (darkHex === '#FFFFFF' || darkHex === '#FAFAFB') entry.darkBordered = true
      return entry
    })
  if (tokens.length) {
    semanticGroups.push({
      id: g,
      title: g.charAt(0).toUpperCase() + g.slice(1),
      tokens,
    })
  }
}

const startPrim = src.indexOf('export const COLOR_PRIMITIVE_FAMILIES')
const startSem = src.indexOf('export const COLOR_SEMANTIC_GROUPS')
if (startPrim < 0 || startSem < 0) throw new Error('markers missing')

// Include preceding doc comment for primitives if present
let cutStart = startPrim
const commentIdx = src.lastIndexOf('/**', startPrim)
if (commentIdx >= 0 && startPrim - commentIdx < 200) cutStart = commentIdx

const afterSemSearch = src.slice(startSem)
const nextExportRel = afterSemSearch.indexOf('\nexport ', 1)
const after = nextExportRel >= 0 ? src.slice(startSem + nextExportRel + 1) : ''
const before = src.slice(0, cutStart)

const mid = `/** Generated from Figma Primitives/Default.tokens.json */
export const COLOR_PRIMITIVE_FAMILIES: ColorPaletteFamily[] = ${JSON.stringify(paletteFamilies, null, 2)}

export const COLOR_PALETTE_FAMILIES = COLOR_PRIMITIVE_FAMILIES

/** Generated from Figma Semantic Light + Dark modes (same variables, two columns) */
export const COLOR_SEMANTIC_GROUPS: SemanticTokenGroup[] = ${JSON.stringify(semanticGroups, null, 2)}

`

fs.writeFileSync(filePath, before + mid + after)
console.log('Rewrote primitives + semantic')
console.log(
  'dark shades:',
  paletteFamilies.find((f) => f.id === 'dark')?.swatches.map((s) => s.shade).join(','),
)
console.log('semantic groups:', semanticGroups.map((g) => `${g.id}(${g.tokens.length})`).join(', '))
