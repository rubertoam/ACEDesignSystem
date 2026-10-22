import fs from 'node:fs'

const paths = [
  'tokens/figma/Semantic/Light.tokens.json',
  'C:/Users/anton/OneDrive/Desktop/Token JSON Files/Semantic/Light.tokens.json',
]

for (const p of paths) {
  try {
    const j = JSON.parse(fs.readFileSync(p, 'utf8'))
    const comp = j.radius?.component ?? {}
    console.log('===', p)
    for (const [k, v] of Object.entries(comp)) {
      const alias = v?.$extensions?.['com.figma.aliasData']?.targetVariableName
      console.log(`  ${k}: value=${v?.$value} alias=${alias}`)
    }
  } catch (e) {
    console.log(p, e.message)
  }
}
