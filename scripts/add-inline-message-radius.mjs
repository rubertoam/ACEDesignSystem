/**
 * Adds radius/component/inline message → radius/sm from live Figma,
 * updates color-tokens + variables aliases, regenerates tokensLabData.
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')

const INLINE_MESSAGE_TOKEN = {
  $type: 'number',
  $value: 4,
  $extensions: {
    'com.figma.variableId': 'VariableID:5863:481',
    'com.figma.scopes': ['ALL_SCOPES'],
    'com.figma.aliasData': {
      targetVariableId: 'VariableID:74268dcd44265e41929a56cb6ce2a46964bcc610/-1:-1',
      targetVariableName: 'radius/sm',
      targetVariableSetId: 'VariableCollectionId:f115a1b9fa40a007087b464afd0755755706df94/-1:-1',
      targetVariableSetName: 'Primitives',
    },
  },
}

function patchSemantic(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  if (!data.radius?.component) throw new Error(`No radius.component in ${filePath}`)
  // Prefer sm alias IDs from existing button token when present
  const button = data.radius.component.button
  const token = structuredClone(INLINE_MESSAGE_TOKEN)
  if (button?.$extensions?.['com.figma.aliasData']) {
    token.$extensions['com.figma.aliasData'] = {
      ...token.$extensions['com.figma.aliasData'],
      ...button.$extensions['com.figma.aliasData'],
      targetVariableName: 'radius/sm',
    }
    token.$value = button.$value ?? 4
  }
  data.radius.component['inline message'] = token
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
  console.log('added radius/component/inline message →', path.relative(root, filePath))
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

// color-tokens.css - add component token next to other radius/component entries
const colorTokensPath = path.join(root, 'src/styles/color-tokens.css')
let colorCss = fs.readFileSync(colorTokensPath, 'utf8')
const inlineDecl =
  '  --radius-component-inline-message: var(--radius-sm); /* radius/component/inline message ← radius/sm */'
if (!colorCss.includes('--radius-component-inline-message')) {
  colorCss = colorCss.replace(
    /(--radius-component-tooltip:[^\n]+\n)/,
    `$1${inlineDecl}\n`,
  )
  fs.writeFileSync(colorTokensPath, colorCss)
  console.log('updated color-tokens.css')
} else {
  colorCss = colorCss.replace(
    /--radius-component-inline-message:[^;]+;/,
    '--radius-component-inline-message: var(--radius-sm);',
  )
  fs.writeFileSync(colorTokensPath, colorCss)
}

// variables.css - point AceInlineMessage at the new component token
const variablesPath = path.join(root, 'src/styles/variables.css')
let variables = fs.readFileSync(variablesPath, 'utf8')
variables = variables.replace(
  /--ace-inline-message-radius:\s*[^;]+;/,
  '--ace-inline-message-radius: var(--radius-component-inline-message);',
)
fs.writeFileSync(variablesPath, variables)
console.log('updated variables.css --ace-inline-message-radius')

const gen = spawnSync(process.execPath, ['scripts/generate-tokens-lab-data.mjs'], {
  cwd: root,
  encoding: 'utf8',
})
process.stdout.write(gen.stdout || '')
process.stderr.write(gen.stderr || '')
if (gen.status !== 0) process.exit(gen.status ?? 1)
