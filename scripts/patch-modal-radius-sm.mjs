/**
 * Sync radius/component/modal → radius/sm (live Figma) into JSON + CSS + catalog.
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')

function patchSemantic(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const modal = data.radius?.component?.modal
  const sm = data.radius?.sm
  const button = data.radius?.component?.button
  if (!modal) throw new Error(`No radius.component.modal in ${filePath}`)

  const smAlias = sm?.$extensions?.['com.figma.aliasData'] ?? button?.$extensions?.['com.figma.aliasData']
  modal.$value = sm?.$value ?? button?.$value ?? 4
  if (modal.$extensions?.['com.figma.aliasData'] && smAlias) {
    modal.$extensions['com.figma.aliasData'] = {
      ...modal.$extensions['com.figma.aliasData'],
      targetVariableId: smAlias.targetVariableId,
      targetVariableName: 'radius/sm',
      targetVariableSetId: smAlias.targetVariableSetId,
      targetVariableSetName: smAlias.targetVariableSetName ?? 'Primitives',
    }
  }
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
  console.log('patched modal → radius/sm', path.relative(root, filePath))
}

for (const rel of [
  'tokens/figma/Semantic/Light.tokens.json',
  'tokens/figma/Semantic/Dark.tokens.json',
]) {
  patchSemantic(path.join(root, rel))
}

for (const p of [
  'C:/Users/anton/OneDrive/Desktop/Token JSON Files/Semantic/Light.tokens.json',
  'C:/Users/anton/OneDrive/Desktop/Token JSON Files/Semantic/Dark.tokens.json',
]) {
  if (fs.existsSync(p)) patchSemantic(p)
}

const colorTokensPath = path.join(root, 'src/styles/color-tokens.css')
let colorCss = fs.readFileSync(colorTokensPath, 'utf8')
colorCss = colorCss.replace(
  /--radius-component-modal:\s*[^;]+;\s*\/\*[^*]*\*\//,
  '--radius-component-modal: var(--radius-sm); /* radius/component/modal ← radius/sm */',
)
fs.writeFileSync(colorTokensPath, colorCss)
console.log('updated color-tokens.css')

const gen = spawnSync(process.execPath, ['scripts/generate-tokens-lab-data.mjs'], {
  cwd: root,
  encoding: 'utf8',
})
process.stdout.write(gen.stdout || '')
process.stderr.write(gen.stderr || '')
if (gen.status !== 0) process.exit(gen.status ?? 1)
