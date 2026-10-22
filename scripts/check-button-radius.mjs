import fs from 'node:fs'

const paths = [
  'tokens/figma/Semantic/Light.tokens.json',
  'C:/Users/anton/OneDrive/Desktop/Token JSON Files/Semantic/Light.tokens.json',
]

for (const p of paths) {
  try {
    const light = JSON.parse(fs.readFileSync(p, 'utf8'))
    const btn = light.radius?.component?.button
    const alias = btn?.$extensions?.['com.figma.aliasData']?.targetVariableName
    console.log(p)
    console.log('  alias:', alias, 'value:', btn?.$value)
  } catch (e) {
    console.log(p, e.message)
  }
}
