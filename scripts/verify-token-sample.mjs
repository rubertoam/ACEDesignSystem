import fs from 'node:fs'

const light = JSON.parse(fs.readFileSync('tokens/figma/Semantic/Light.tokens.json', 'utf8'))
const prim = JSON.parse(fs.readFileSync('tokens/figma/Primitives/Default.tokens.json', 'utf8'))

function walk(obj, prefix = [], out = []) {
  if (!obj || typeof obj !== 'object') return out
  if (Object.prototype.hasOwnProperty.call(obj, '$type') && Object.prototype.hasOwnProperty.call(obj, '$value')) {
    const alias = obj.$extensions?.['com.figma.aliasData']?.targetVariableName ?? null
    out.push({ path: prefix.join('/'), value: obj.$value, alias })
    return out
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue
    walk(v, [...prefix, k], out)
  }
  return out
}

const lightTokens = walk(light)
const primTokens = walk(prim)

for (const key of [
  'colors/action/primary',
  'colors/action/primary-hover',
  'colors/badges/purple-fill',
  'colors/badges/purple-border',
  'colors/border/default',
  'colors/text/primary',
]) {
  const t = lightTokens.find((x) => x.path === key)
  console.log(key, '→', t?.alias || t?.value)
}

for (const key of ['color/primary/400', 'color/primary/500', 'color/neutral/400']) {
  const t = primTokens.find((x) => x.path === key)
  console.log(key, '→', t?.value?.hex || t?.value)
}
