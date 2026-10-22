import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'c:/Users/anton/OneDrive/Desktop/Token JSON Files'
const files = {
  primitives: path.join(ROOT, 'Primitives/Default.tokens.json'),
  light: path.join(ROOT, 'Semantic/Light.tokens.json'),
  dark: path.join(ROOT, 'Semantic/Dark.tokens.json'),
}

function walk(obj, prefix = [], out = []) {
  if (!obj || typeof obj !== 'object') return out
  if (Object.prototype.hasOwnProperty.call(obj, '$type') && Object.prototype.hasOwnProperty.call(obj, '$value')) {
    const v = obj.$value
    let value = v
    if (v && typeof v === 'object' && v.hex) value = String(v.hex).toUpperCase()
    else if (typeof v === 'number') value = v
    else if (typeof v === 'string') value = v
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

function cssVarFromPath(tokenPath) {
  // color/neutral/50 -> --color-neutral-50
  // colors/bg/primary -> --color-bg-primary
  // radius/sm -> --radius-sm
  const parts = tokenPath.split('/')
  if (parts[0] === 'colors') parts[0] = 'color'
  return `--${parts.join('-')}`
}

function aliasToCssVar(aliasName) {
  if (!aliasName) return null
  // color/neutral/50 or colors/bg/primary
  const parts = aliasName.split('/')
  if (parts[0] === 'colors') parts[0] = 'color'
  return `var(--${parts.join('-')})`
}

function hexNormalize(hex) {
  if (typeof hex !== 'string') return hex
  return hex.toLowerCase()
}

const result = {}
for (const [name, file] of Object.entries(files)) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'))
  result[name] = walk(json)
}

const outDir = path.join(process.cwd(), 'scripts/.token-cache')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'parsed.json'), JSON.stringify(result, null, 2))

// Summaries
for (const [name, tokens] of Object.entries(result)) {
  const byType = {}
  for (const t of tokens) byType[t.type] = (byType[t.type] || 0) + 1
  console.log(`\n=== ${name} (${tokens.length}) ===`, byType)
  const roots = [...new Set(tokens.map((t) => t.path.split('/').slice(0, 2).join('/')))]
  console.log('groups:', roots.join(', '))
}

// Compare primitives hex against current color-tokens.css expectations
const primColors = result.primitives.filter((t) => t.type === 'color')
console.log('\nPrimitive color count:', primColors.length)
primColors.slice(0, 5).forEach((t) => console.log(t.path, t.value, t.alias || ''))

const lightColors = result.light.filter((t) => t.type === 'color')
const darkColors = result.dark.filter((t) => t.type === 'color')
console.log('\nLight semantic colors:', lightColors.length)
console.log('Dark semantic colors:', darkColors.length)

// Diff light aliases
console.log('\n--- Light semantic map (first 40) ---')
lightColors.slice(0, 40).forEach((t) => {
  console.log(`${cssVarFromPath(t.path)}: ${t.alias ? aliasToCssVar(t.alias) : hexNormalize(t.value)}  /* ${t.path}${t.alias ? ' <- ' + t.alias : ''} */`)
})

console.log('\n--- Non-color token samples ---')
;[...result.primitives, ...result.light]
  .filter((t) => t.type !== 'color')
  .slice(0, 40)
  .forEach((t) => console.log(t.path, t.type, t.value, t.alias || ''))

// Write CSS generation plan maps
const maps = {
  primitives: Object.fromEntries(
    result.primitives.map((t) => [cssVarFromPath(t.path), { type: t.type, value: t.value, alias: t.alias }]),
  ),
  light: Object.fromEntries(
    result.light.map((t) => [
      cssVarFromPath(t.path),
      { type: t.type, value: t.value, alias: t.alias, css: t.alias ? aliasToCssVar(t.alias) : hexNormalize(t.value) },
    ]),
  ),
  dark: Object.fromEntries(
    result.dark.map((t) => [
      cssVarFromPath(t.path),
      { type: t.type, value: t.value, alias: t.alias, css: t.alias ? aliasToCssVar(t.alias) : hexNormalize(t.value) },
    ]),
  ),
}
fs.writeFileSync(path.join(outDir, 'css-maps.json'), JSON.stringify(maps, null, 2))
console.log('\nWrote', path.join(outDir, 'css-maps.json'))
