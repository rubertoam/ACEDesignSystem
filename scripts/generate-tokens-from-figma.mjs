/**
 * Regenerates src/styles/color-tokens.css (+ foundation snippets) from Figma token JSON exports.
 *
 * Usage:
 *   node scripts/generate-tokens-from-figma.mjs
 *   node scripts/generate-tokens-from-figma.mjs --primitives "path" --light "path" --dark "path"
 */
import fs from 'node:fs'
import path from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]])
    return acc
  }, []),
)

const ROOT = 'c:/Users/anton/OneDrive/Desktop/Token JSON Files'
const paths = {
  primitives: args.primitives ?? path.join(ROOT, 'Primitives/Default.tokens.json'),
  light: args.light ?? path.join(ROOT, 'Semantic/Light.tokens.json'),
  dark: args.dark ?? path.join(ROOT, 'Semantic/Dark.tokens.json'),
}

function walk(obj, prefix = [], out = []) {
  if (!obj || typeof obj !== 'object') return out
  if (Object.prototype.hasOwnProperty.call(obj, '$type') && Object.prototype.hasOwnProperty.call(obj, '$value')) {
    const raw = obj.$value
    let value = raw
    if (raw && typeof raw === 'object' && raw.hex) value = String(raw.hex).toLowerCase()
    const alias = obj.$extensions?.['com.figma.aliasData']?.targetVariableName ?? null
    out.push({ path: prefix.join('/'), type: obj.$type, value, alias })
    return out
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue
    walk(v, [...prefix, k], out)
  }
  return out
}

/** Figma path → CSS custom property name (sanitize spaces). */
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

function aliasToCssVar(aliasName) {
  if (!aliasName) return null
  return `var(${cssVarFromPath(aliasName)})`
}

function pxToRem(n) {
  if (typeof n !== 'number') return n
  if (n === 0) return '0'
  if (n >= 100) return `${n}px` // full / pill sentinels stay px
  return `${n / 16}rem`
}

function resolveCssValue(token) {
  if (token.alias) return aliasToCssVar(token.alias)
  if (token.type === 'color') return String(token.value).toLowerCase()
  if (token.type === 'number') {
    // line-height % stored as 120/150/165 → unitless multipliers
    if (token.path.includes('line-height') || token.path.includes('leading')) {
      return String(token.value / 100)
    }
    // letter-spacing % → em
    if (token.path.includes('letter-spacing')) {
      return `${token.value / 100}em`
    }
    // typography sizes are px
    if (token.path.includes('typography/size') || token.path.startsWith('typography/ui') || token.path.includes('typography/heading') || token.path.includes('typography/body')) {
      return pxToRem(token.value)
    }
    // spacing / radius / border / icon sizes in px
    return pxToRem(token.value)
  }
  return String(token.value)
}

function groupByFamily(tokens) {
  const map = new Map()
  for (const t of tokens) {
    const family = t.path.split('/').slice(0, 2).join('/')
    if (!map.has(family)) map.set(family, [])
    map.get(family).push(t)
  }
  return map
}

function emitBlock(title, tokens, { onlyTypes } = {}) {
  const filtered = onlyTypes ? tokens.filter((t) => onlyTypes.includes(t.type)) : tokens
  if (!filtered.length) return ''
  const lines = [`  /* ——— ${title} ——— */`]
  for (const t of filtered) {
    const name = cssVarFromPath(t.path)
    const value = resolveCssValue(t)
    const comment = t.alias ? ` /* ${t.path} ← ${t.alias} */` : ` /* ${t.path} */`
    lines.push(`  ${name}: ${value};${comment}`)
  }
  lines.push('')
  return lines.join('\n')
}

const primitives = walk(JSON.parse(fs.readFileSync(paths.primitives, 'utf8')))
const light = walk(JSON.parse(fs.readFileSync(paths.light, 'utf8')))
const dark = walk(JSON.parse(fs.readFileSync(paths.dark, 'utf8')))

const primColors = primitives.filter((t) => t.type === 'color')
const primNumbers = primitives.filter((t) => t.type === 'number')
const lightColors = light.filter((t) => t.type === 'color')
const darkColors = dark.filter((t) => t.type === 'color')
const lightNonColor = light.filter((t) => t.type !== 'color')
const darkNonColor = dark.filter((t) => t.type !== 'color')

// Compatibility aliases for prior CSS names used across the codebase
const COMPAT_LIGHT = `
  /* Compatibility aliases (pre-export names used by components) */
  --color-action-primary-hover-subtle: var(--color-action-primary-hover-subtle);
  --color-action-primary-pressed-subtle: var(--color-action-primary-pressed-subtle);
`

// The sanitized names already produce --color-action-primary-hover-subtle from "primary - hover - subtle"
// so COMPAT is a no-op if generation is correct. Keep explicit redirects only if needed.

let css = `/**
 * ACE color + foundation tokens — generated from Figma token JSON exports.
 * Source: Primitives/Default.tokens.json, Semantic/Light.tokens.json, Semantic/Dark.tokens.json
 * Do not hand-edit hex/alias values here; re-run: node scripts/generate-tokens-from-figma.mjs
 */

:root {
`

// Primitive colors by family order
const colorFamilyOrder = [
  'color/neutral',
  'color/primary',
  'color/secondary',
  'color/blue',
  'color/teal',
  'color/success',
  'color/warning',
  'color/warning 2',
  'color/error',
  'color/dark',
  'color/shades',
]
const primByFamily = groupByFamily(primColors)
css += `  /* ——— Primitives · Color (Figma Primitives) ——— */\n`
for (const family of colorFamilyOrder) {
  const list = primByFamily.get(family)
  if (!list) continue
  css += `  /* ${family} */\n`
  for (const t of list.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }))) {
    css += `  ${cssVarFromPath(t.path)}: ${resolveCssValue(t)};\n`
  }
  css += `\n`
}
// any leftover color families
for (const [family, list] of primByFamily) {
  if (colorFamilyOrder.includes(family)) continue
  css += `  /* ${family} */\n`
  for (const t of list) css += `  ${cssVarFromPath(t.path)}: ${resolveCssValue(t)};\n`
  css += `\n`
}

css += `  /* ——— Primitives · Spacing / Radius / Border / Type metrics ——— */\n`
for (const t of primNumbers.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }))) {
  css += `  ${cssVarFromPath(t.path)}: ${resolveCssValue(t)}; /* ${t.path} = ${t.value} */\n`
}
css += `\n`

/** Primitive CSS names already emitted — skip semantic tokens that would clobber them. */
const emittedPrimNames = new Set([
  ...primColors.map((t) => cssVarFromPath(t.path)),
  ...primNumbers.map((t) => cssVarFromPath(t.path)),
])

/**
 * Resolve alias to a CSS var. Prefer the primitive target name; if semantic path
 * collides with a primitive name, keep pointing at the primitive literal name.
 */
function resolveSemanticValue(token) {
  if (!token.alias) return resolveCssValue(token)
  return aliasToCssVar(token.alias)
}

css += `  /* ——— Semantic · Light · Color (Figma Semantic / Light) ——— */\n`
for (const t of lightColors) {
  css += `  ${cssVarFromPath(t.path)}: ${resolveSemanticValue(t)}; /* ${t.path}${t.alias ? ` ← ${t.alias}` : ''} */\n`
}
css += `\n`

css += `  /* ——— Semantic · Light · Number tokens (non-colliding) ——— */\n`
for (const t of lightNonColor) {
  const name = cssVarFromPath(t.path)
  // Skip tokens that would overwrite primitive radius/spacing/border-width/type metrics
  if (emittedPrimNames.has(name) && !t.path.startsWith('radius/component') && !t.path.startsWith('spacing/component') && !t.path.startsWith('spacing/layout') && !t.path.startsWith('icon/size') && !t.path.startsWith('typography/')) {
    css += `  /* skip ${name} — preserves primitive; Figma ${t.path}${t.alias ? ` ← ${t.alias}` : ''} */\n`
    continue
  }
  // Component / layout / icon semantic numbers always emit (unique paths)
  css += `  ${name}: ${resolveSemanticValue(t)}; /* ${t.path}${t.alias ? ` ← ${t.alias}` : ''} */\n`
}
css += `\n`

// Bridge legacy --type-* names used by typography-tokens.css / labs
css += `  /* Bridge: typography primitive sizes → --type-size-* (lab + composed styles) */\n`
for (const t of primNumbers.filter((x) => x.path.startsWith('typography/size/'))) {
  const shade = t.path.split('/').pop()
  css += `  --type-size-${shade}: var(${cssVarFromPath(t.path)});\n`
}
for (const key of ['tight', 'normal', 'relaxed']) {
  const prim = primNumbers.find((x) => x.path === `typography/line-height/${key}`)
  if (prim) css += `  --type-line-height-${key}: var(${cssVarFromPath(prim.path)});\n`
}
for (const key of ['tight', 'normal']) {
  const prim = primNumbers.find((x) => x.path === `typography/letter-spacing/${key}`)
  if (prim) css += `  --type-letter-spacing-${key}: var(${cssVarFromPath(prim.path)});\n`
}

/* Legacy spacing aliases used across the lab (--space-*) */
css += `\n  /* Bridge: common --space-* aliases → Figma spacing primitives */\n`
css += `  --space-1: var(--spacing-4); /* 4px */\n`
css += `  --space-2: var(--spacing-8); /* 8px */\n`
css += `  --space-3: var(--spacing-12); /* 12px */\n`
css += `  --space-4: var(--spacing-16); /* 16px */\n`
css += `  --space-6: var(--spacing-24); /* 24px */\n`
css += `  --space-8: var(--spacing-32); /* 32px */\n`
css += `}\n\n`

css += `[data-theme='dark'] {\n`
css += `  /* ——— Semantic · Dark (Figma Semantic / Dark) ——— */\n`
for (const t of darkColors) {
  css += `  ${cssVarFromPath(t.path)}: ${resolveCssValue(t)}; /* ${t.path}${t.alias ? ` ← ${t.alias}` : ''} */\n`
}
css += `\n`
css += `  /* Dark number semantics (when they differ) */\n`
for (const t of darkNonColor) {
  const lightTwin = lightNonColor.find((x) => x.path === t.path)
  const lightVal = lightTwin ? resolveCssValue(lightTwin) : null
  const darkVal = resolveCssValue(t)
  if (lightVal === darkVal) continue
  css += `  ${cssVarFromPath(t.path)}: ${darkVal}; /* ${t.path}${t.alias ? ` ← ${t.alias}` : ''} */\n`
}
css += `}\n`

const outCss = path.join(process.cwd(), 'src/styles/color-tokens.css')
fs.writeFileSync(outCss, css, 'utf8')
console.log('Wrote', outCss)

// Also copy source JSON into repo for provenance
const destDir = path.join(process.cwd(), 'tokens/figma')
fs.mkdirSync(path.join(destDir, 'Primitives'), { recursive: true })
fs.mkdirSync(path.join(destDir, 'Semantic'), { recursive: true })
fs.copyFileSync(paths.primitives, path.join(destDir, 'Primitives/Default.tokens.json'))
fs.copyFileSync(paths.light, path.join(destDir, 'Semantic/Light.tokens.json'))
fs.copyFileSync(paths.dark, path.join(destDir, 'Semantic/Dark.tokens.json'))
console.log('Copied token JSON → tokens/figma/')

// Emit lab data seed for colors
const labSeed = {
  primitives: primColors.map((t) => ({
    tokenPath: t.path.replace(/ /g, ' '),
    cssVar: cssVarFromPath(t.path),
    hex: String(t.value).toLowerCase(),
  })),
  light: lightColors.map((t) => ({
    tokenPath: t.path,
    cssVar: cssVarFromPath(t.path),
    alias: t.alias,
    hex: String(t.value).toLowerCase(),
  })),
  dark: darkColors.map((t) => ({
    tokenPath: t.path,
    cssVar: cssVarFromPath(t.path),
    alias: t.alias,
    hex: String(t.value).toLowerCase(),
  })),
}
fs.writeFileSync(path.join(process.cwd(), 'scripts/.token-cache/lab-seed.json'), JSON.stringify(labSeed, null, 2))
console.log('Wrote scripts/.token-cache/lab-seed.json')
console.log('Primitive colors:', primColors.length, 'Light:', lightColors.length, 'Dark:', darkColors.length)
