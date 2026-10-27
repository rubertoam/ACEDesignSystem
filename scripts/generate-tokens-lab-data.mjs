/**
 * Generates src/pages/tokensLabData.ts from Figma token JSON exports.
 * Classifies tokens as Primitive | Semantic | Component.
 *
 * Component = Semantic paths under radius/component or spacing/component padding
 * (plus typography/ui|heading|body when present as product-facing aliases).
 *
 * Usage:
 *   node scripts/generate-tokens-lab-data.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const PATHS = {
  primitives: path.join(ROOT, 'tokens/figma/Primitives/Default.tokens.json'),
  light: path.join(ROOT, 'tokens/figma/Semantic/Light.tokens.json'),
  dark: path.join(ROOT, 'tokens/figma/Semantic/Dark.tokens.json'),
}
const OUT = path.join(ROOT, 'src/pages/tokensLabData.ts')

function walk(obj, prefix = [], out = []) {
  if (!obj || typeof obj !== 'object') return out
  if (Object.prototype.hasOwnProperty.call(obj, '$type') && Object.prototype.hasOwnProperty.call(obj, '$value')) {
    const raw = obj.$value
    let value = raw
    if (raw && typeof raw === 'object' && raw.hex) value = String(raw.hex)
    const alias = obj.$extensions?.['com.figma.aliasData']?.targetVariableName ?? null
    out.push({
      path: prefix.join('/'),
      type: obj.$type,
      value,
      alias,
    })
    return out
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue
    walk(v, [...prefix, k], out)
  }
  return out
}

function cssVarFromPath(tokenPath) {
  const parts = tokenPath
    .replace(/^colors\//, 'color/')
    .split('/')
    .map((p) =>
      p
        .trim()
        .replace(/\s*-\s*/g, '-')
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
    )
  return `--${parts.join('-')}`
}

function formatValue(token) {
  if (token.alias) return `→ ${token.alias}`
  if (token.type === 'color') return String(token.value).toUpperCase()
  if (typeof token.value === 'number') {
    if (token.path.includes('line-height') || token.path.includes('leading')) {
      return String(token.value / 100)
    }
    if (token.path.includes('letter-spacing')) {
      return `${token.value / 100}em`
    }
    return String(token.value)
  }
  return String(token.value)
}

function groupKey(tokenPath) {
  const parts = tokenPath.split('/')
  if (parts[0] === 'color' || parts[0] === 'colors') {
    return parts.slice(0, 2).join('/')
  }
  return parts[0]
}

function isComponentPath(tokenPath) {
  return (
    tokenPath.startsWith('radius/component/') ||
    tokenPath.startsWith('spacing/component padding/') ||
    tokenPath.startsWith('spacing/component-padding/') ||
    tokenPath.startsWith('typography/ui/') ||
    tokenPath.startsWith('typography/heading/') ||
    tokenPath.startsWith('typography/body/') ||
    tokenPath.startsWith('icon/size/')
  )
}

function toEntries(tokens) {
  return tokens.map((t) => ({
    path: t.path,
    cssVar: cssVarFromPath(t.path),
    type: t.type,
    value: formatValue(t),
    alias: t.alias,
    group: groupKey(t.path),
  }))
}

/** Natural sort so color/…/50 precedes …/100 (localeCompare alone puts 50 after 400). */
function naturalPathCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

/**
 * Primitive group order: all `color/*` families first, then `border-width`,
 * then remaining groups alphabetically.
 */
function primitiveGroupCompare(a, b) {
  const aColor = a.startsWith('color/')
  const bColor = b.startsWith('color/')
  if (aColor !== bColor) return aColor ? -1 : 1
  if (a === 'border-width' && b !== 'border-width') {
    // After colors; before other non-color groups
    return bColor ? 1 : -1
  }
  if (b === 'border-width' && a !== 'border-width') {
    return aColor ? -1 : 1
  }
  return naturalPathCompare(a, b)
}

function groupEntries(entries, { groupCompare = naturalPathCompare } = {}) {
  const map = new Map()
  for (const e of entries) {
    if (!map.has(e.group)) map.set(e.group, [])
    map.get(e.group).push(e)
  }
  return [...map.entries()]
    .sort(([a], [b]) => groupCompare(a, b))
    .map(([id, tokens]) => ({
      id,
      label: id,
      tokens: tokens.sort((a, b) => naturalPathCompare(a.path, b.path)),
    }))
}

const prim = toEntries(walk(JSON.parse(fs.readFileSync(PATHS.primitives, 'utf8'))))
const lightRaw = walk(JSON.parse(fs.readFileSync(PATHS.light, 'utf8')))
const darkRaw = walk(JSON.parse(fs.readFileSync(PATHS.dark, 'utf8')))
const darkByPath = new Map(darkRaw.map((t) => [t.path, t]))

const semanticLight = []
const componentLight = []
for (const t of lightRaw) {
  if (isComponentPath(t.path)) componentLight.push(t)
  else semanticLight.push(t)
}

function withDark(entries) {
  return entries.map((e) => {
    const d = darkByPath.get(e.path)
    return {
      ...e,
      darkValue: d ? formatValue(d) : null,
      darkAlias: d?.alias ?? null,
    }
  })
}

const primitiveGroups = groupEntries(prim, { groupCompare: primitiveGroupCompare })
const semanticGroups = groupEntries(withDark(toEntries(semanticLight)))
const componentGroups = groupEntries(withDark(toEntries(componentLight)))

const file = `/**
 * Auto-generated from tokens/figma/*.tokens.json - do not edit by hand.
 * Regenerate: node scripts/generate-tokens-lab-data.mjs
 */

export type TokenCatalogEntry = {
  path: string
  cssVar: string
  type: string
  value: string
  alias: string | null
  group: string
  darkValue?: string | null
  darkAlias?: string | null
}

export type TokenCatalogGroup = {
  id: string
  label: string
  tokens: TokenCatalogEntry[]
}

export const TOKEN_PRIMITIVE_GROUPS: TokenCatalogGroup[] = ${JSON.stringify(primitiveGroups, null, 2)}

export const TOKEN_SEMANTIC_GROUPS: TokenCatalogGroup[] = ${JSON.stringify(semanticGroups, null, 2)}

export const TOKEN_COMPONENT_GROUPS: TokenCatalogGroup[] = ${JSON.stringify(componentGroups, null, 2)}

export const TOKEN_CATALOG_COUNTS = {
  primitive: ${prim.length},
  semantic: ${semanticLight.length},
  component: ${componentLight.length},
} as const
`

fs.writeFileSync(OUT, file)
console.log(
  JSON.stringify(
    {
      primitive: prim.length,
      semantic: semanticLight.length,
      component: componentLight.length,
      out: path.relative(ROOT, OUT),
    },
    null,
    2,
  ),
)
