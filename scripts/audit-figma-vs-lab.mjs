/**
 * Compare Figma variable name list (stdin JSON) against repo token JSON.
 * Usage: node scripts/audit-figma-vs-lab.mjs figma-vars.json
 */
import fs from 'node:fs'

function walk(obj, prefix = [], out = []) {
  if (!obj || typeof obj !== 'object') return out
  if (Object.prototype.hasOwnProperty.call(obj, '$type') && Object.prototype.hasOwnProperty.call(obj, '$value')) {
    out.push(prefix.join('/'))
    return out
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue
    walk(v, [...prefix, k], out)
  }
  return out
}

const figma = JSON.parse(fs.readFileSync(process.argv[2] || 'scripts/.token-cache/figma-vars-live.json', 'utf8'))
const prim = walk(JSON.parse(fs.readFileSync('tokens/figma/Primitives/Default.tokens.json', 'utf8')))
const light = walk(JSON.parse(fs.readFileSync('tokens/figma/Semantic/Light.tokens.json', 'utf8')))

const figmaPrim = new Set(
  figma.collections.find((c) => c.name === 'Primitives')?.variableNames ?? [],
)
const figmaSem = new Set(
  figma.collections.find((c) => c.name === 'Semantic')?.variableNames ?? [],
)
const labPrim = new Set(prim)
const labSem = new Set(light)

function diff(a, b) {
  return {
    onlyA: [...a].filter((x) => !b.has(x)).sort(),
    onlyB: [...b].filter((x) => !a.has(x)).sort(),
  }
}

const primDiff = diff(figmaPrim, labPrim)
const semDiff = diff(figmaSem, labSem)

console.log(
  JSON.stringify(
    {
      figmaPrim: figmaPrim.size,
      labPrim: labPrim.size,
      figmaSem: figmaSem.size,
      labSem: labSem.size,
      primOnlyInFigma: primDiff.onlyA,
      primOnlyInLab: primDiff.onlyB,
      semOnlyInFigma: semDiff.onlyA,
      semOnlyInLab: semDiff.onlyB,
    },
    null,
    2,
  ),
)
