/**
 * Diff committed Figma token JSON vs working tree copies.
 */
import fs from 'node:fs'
import { execSync } from 'node:child_process'

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

function load(p) {
  return walk(JSON.parse(fs.readFileSync(p, 'utf8')))
}

function loadGit(p) {
  const raw = execSync(`git show HEAD:${p}`, { encoding: 'utf8' })
  return walk(JSON.parse(raw))
}

const sets = [
  ['prim', 'tokens/figma/Primitives/Default.tokens.json'],
  ['light', 'tokens/figma/Semantic/Light.tokens.json'],
  ['dark', 'tokens/figma/Semantic/Dark.tokens.json'],
]

for (const [name, p] of sets) {
  const oldT = loadGit(p)
  const newT = load(p)
  const oldMap = new Map(oldT.map((t) => [t.path, t]))
  const newMap = new Map(newT.map((t) => [t.path, t]))
  const added = [...newMap.keys()].filter((k) => !oldMap.has(k)).sort()
  const removed = [...oldMap.keys()].filter((k) => !newMap.has(k)).sort()
  const changed = [...newMap.keys()]
    .filter((k) => {
      if (!oldMap.has(k)) return false
      const a = oldMap.get(k)
      const b = newMap.get(k)
      return a.alias !== b.alias || String(a.value) !== String(b.value) || a.type !== b.type
    })
    .sort()

  console.log(`\n=== ${name} ===`)
  console.log('counts', oldT.length, '->', newT.length)
  console.log('added', added.length)
  for (const k of added) console.log('  +', k)
  console.log('removed', removed.length)
  for (const k of removed) console.log('  -', k)
  console.log('changed', changed.length)
  for (const k of changed) {
    const a = oldMap.get(k)
    const b = newMap.get(k)
    console.log(`  ~ ${k} | ${a.alias || a.value} => ${b.alias || b.value}`)
  }
}
