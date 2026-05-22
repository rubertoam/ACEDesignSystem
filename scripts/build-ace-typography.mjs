import fs from 'node:fs'

const scriptDir = new URL('.', import.meta.url)
const stylesDir = new URL('../src/styles/', import.meta.url)
const rawPath = new URL('figma-2651-raw.json', scriptDir)
const jsonPath = new URL('ace-typography-from-figma.json', stylesDir)

function writeCss(typography) {
  let css =
    ':root {\n  /* ACE typography — generated from Figma node 2651:5 (Font variables). Pair each --ace-type-* with its *-tracking token. */\n'
  css += '  --font-ace-noto: "Noto Sans", var(--font-sans);\n'
  css += '  --font-ace-inter: "Inter", var(--font-sans);\n'
  for (const t of typography) {
    const fam = t.family === 'Inter' ? 'var(--font-ace-inter)' : 'var(--font-ace-noto)'
    const fontShorthand = `${t.weight} ${t.sizeRem}/${t.lineHeightCss} ${fam}`
    css += `  ${t.token}: ${fontShorthand};\n`
    css += `  ${t.token}-tracking: ${t.letterSpacingCss};\n`
  }
  css += '}\n'
  fs.writeFileSync(new URL('typography-tokens.css', stylesDir), css)
}

const re =
  /^Font\(family: "([^"]+)", style: (.+?), size: (\d+), weight: (\d+), lineHeight: ([^,]+), letterSpacing: ([^)]+)\)$/

if (fs.existsSync(rawPath)) {
  const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'))
  const typography = []
  for (const [name, val] of Object.entries(raw)) {
    if (typeof val !== 'string' || !val.startsWith('Font(')) continue
    const m = val.match(re)
    if (!m) {
      console.error('no match', name, val)
      process.exit(1)
    }
    const [, family, style, size, weight, lh, ls] = m
    const sizePx = Number(size)
    const sizeRem = `${(sizePx / 16).toFixed(4)}rem`
    const lhNum = Number.parseFloat(lh)
    const lineHeightCss =
      !Number.isNaN(lhNum) && lhNum > 6 ? `${(lhNum / 16).toFixed(4)}rem` : String(lhNum)
    const lsNum = Number.parseFloat(ls)
    const letterSpacingCss =
      !Number.isNaN(lsNum) && lsNum !== 0
        ? Math.abs(lsNum) <= 10
          ? `${lsNum * 0.01}em`
          : `${lsNum}px`
        : '0'
    const baseSlug = name
      .replace(/\s*\/\s*/g, '-')
      .replace(/\//g, '-')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
    const slug = family === 'Inter' ? `${baseSlug}-inter` : baseSlug
    typography.push({
      figmaName: name,
      token: `--ace-type-${slug}`,
      family: family.trim(),
      style: style.trim(),
      sizePx,
      sizeRem,
      weight: Number(weight),
      lineHeightRaw: lh.trim(),
      lineHeightCss,
      letterSpacingRaw: ls.trim(),
      letterSpacingCss,
      figmaValue: val,
    })
  }

  const out = {
    meta: {
      source: 'Figma MCP get_variable_defs',
      fileKey: 'nIr5xquI2bOX7A9JRpamOg',
      nodeId: '2651:5',
      figmaUrl:
        'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=2651-5&m=dev',
      note: 'Color variables on the same node are omitted; only Font(...) typography variables are listed.',
    },
    typography,
  }

  fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2))
  writeCss(typography)
  console.log('from raw: typography count', typography.length)
} else {
  const existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  writeCss(existing.typography)
  console.log('from JSON: typography count', existing.typography.length)
}
