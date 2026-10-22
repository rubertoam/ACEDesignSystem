/**
 * Point radius/component/button at radius/sm (4px) to match Figma update.
 * Updates Semantic Light/Dark JSON copies + regenerates tokensLabData.
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')

function patchSemantic(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const sm = data.radius?.sm
  const btn = data.radius?.component?.button
  if (!sm || !btn) throw new Error(`Missing radius tokens in ${filePath}`)

  const smAlias = sm.$extensions?.['com.figma.aliasData']
  btn.$value = sm.$value ?? 4
  if (btn.$extensions?.['com.figma.aliasData'] && smAlias) {
    btn.$extensions['com.figma.aliasData'] = {
      ...btn.$extensions['com.figma.aliasData'],
      targetVariableId: smAlias.targetVariableId,
      targetVariableName: 'radius/sm',
      targetVariableSetId: smAlias.targetVariableSetId,
      targetVariableSetName: smAlias.targetVariableSetName ?? 'Primitives',
    }
  }
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
  console.log('patched', path.relative(root, filePath), '→ radius/sm value', btn.$value)
}

for (const rel of [
  'tokens/figma/Semantic/Light.tokens.json',
  'tokens/figma/Semantic/Dark.tokens.json',
]) {
  patchSemantic(path.join(root, rel))
}

// Keep Desktop export in sync if present
const desktopLight = 'C:/Users/anton/OneDrive/Desktop/Token JSON Files/Semantic/Light.tokens.json'
const desktopDark = 'C:/Users/anton/OneDrive/Desktop/Token JSON Files/Semantic/Dark.tokens.json'
for (const p of [desktopLight, desktopDark]) {
  if (fs.existsSync(p)) patchSemantic(p)
}

const gen = spawnSync(process.execPath, ['scripts/generate-tokens-lab-data.mjs'], {
  cwd: root,
  encoding: 'utf8',
})
process.stdout.write(gen.stdout || '')
process.stderr.write(gen.stderr || '')
if (gen.status !== 0) process.exit(gen.status ?? 1)
