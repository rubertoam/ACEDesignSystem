/**
 * Remove ACE AI-generated token API surface and map usages to hand-built Figma tokens.
 *
 * Type: --ace-type-* → --type-{heading|subheading|body|caption|footnote|micro}-*
 * Shadows: --ace-drop-shadow-* → --shadow-* (Figma Shadow XS…XL); lab chrome --shadow-sm → --lab-shadow-sm
 * Motion: --ace-motion-* → --motion-*
 * Color/brand aliases: --ace-{neutral|error|…}-* → --color-* / --finscan-*
 *
 * Usage: node scripts/remove-ace-ai-tokens.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.cursor', 'agent-transcripts'])
const TEXT_EXT = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.md',
  '.mdc',
  '.json',
  '.html',
])

/** Longest-first ace-type slug → style-sheet family (hand-built Figma Typography). */
const TYPE_SLUG_MAP = [
  ['paragraph-p1', 'body'],
  ['paragraph-p2', 'subheading'],
  ['paragraph-p3', 'heading'],
  ['footer-02', 'micro'],
  ['footer', 'footnote'],
  ['label', 'footnote'],
  ['caption', 'caption'],
  ['subheading', 'heading'],
  ['body-semibold-default-16px', 'subheading'],
  ['heading-h6-small', 'subheading'],
  ['heading-h6', 'heading'],
  ['heading-h5-small', 'subheading'],
  ['heading-h5', 'subheading'],
  ['heading-h4-small', 'subheading'],
  ['heading-h4', 'heading'],
  ['heading-h3-small', 'heading'],
  ['heading-h3', 'heading'],
  ['heading-h2-small', 'heading'],
  ['heading-h2', 'heading'],
  ['heading-h1-small', 'heading'],
  ['heading-h1', 'heading'],
  ['display-02', 'heading'],
  ['display-01', 'heading'],
]

function mapAceTypeToken(name) {
  // name like --ace-type-paragraph-p1-regular or ...-tracking or ...-inter
  const m = name.match(/^--ace-type-(.+)$/)
  if (!m) return null
  let rest = m[1]
  let suffix = ''
  if (rest.endsWith('-tracking')) {
    suffix = '-tracking'
    rest = rest.slice(0, -'-tracking'.length)
  }
  // drop -inter specialty suffix; map base then re-attach weight
  const inter = rest.endsWith('-inter')
  if (inter) rest = rest.slice(0, -'-inter'.length)

  for (const [from, family] of TYPE_SLUG_MAP) {
    if (rest === from || rest.startsWith(from + '-')) {
      const weightPart = rest.slice(from.length) // e.g. -regular, -semi-bold, -bold, -extra-bold
      const weight = weightPart || ''
      // normalize extra-bold → bold for style sheet
      const normalizedWeight = weight.replace(/^-extra-bold$/, '-bold')
      return `--type-${family}${normalizedWeight}${suffix}`
    }
  }
  return null
}

/** Exact / prefix replacements applied after type mapping (longest first). */
const EXACT_REPLACEMENTS = [
  ['--ace-drop-shadow-', '--shadow-'],
  ['--ace-motion-', '--motion-'],
  ['--font-ace-noto', '--font-noto'],
  ['--font-ace-inter', '--font-inter'],
  ['--ace-secondary-enlighten-violet-', '--color-secondary-'],
  ['--ace-secondary-teal-', '--color-teal-'],
  ['--ace-dark-mode-', '--color-dark-'],
  ['--ace-neutral-', '--color-neutral-'],
  ['--ace-success-', '--color-success-'],
  ['--ace-warning-', '--color-warning-'],
  ['--ace-notice-', '--color-warning-2-'],
  ['--ace-error-', '--color-error-'],
  ['--ace-finscan-mark-primary', '--color-primary-500'],
  ['--ace-finscan-wordmark-fill', '--color-primary-500'],
  ['--ace-finscan-mark-green', '--color-success-400'],
  ['--ace-finscan-mark-blue', '--color-blue-500'],
  ['--ace-finscan-mark-magenta', '--color-secondary-500'],
  ['--ace-finscan-icon-gap', '--finscan-icon-gap'],
  ['--ace-guidelines-principle-title', '--color-primary-400'],
  ['--ace-header-status-success', '--color-success-500'],
  ['--ace-section-label-gap', '--section-label-gap'],
  ['--ace-lab-segmented-', '--lab-segmented-'],
  ['--ace-edit-group-', '--edit-group-'],
  // component compat aliases → canonical (already defined without ace-)
  ['--ace-descriptive-button-', '--button-descriptive-'],
  ['--ace-progress-indicator-', '--progress-indicator-'],
  ['--ace-progress-spinner-', '--progress-spinner-'],
  ['--ace-landing-page-card-', '--landing-page-card-'],
  ['--ace-data-card-', '--data-card-'],
  ['--ace-inline-message-', '--inline-message-'],
  ['--ace-scrollable-list-', '--scrollable-list-'],
  ['--ace-date-picker-', '--date-picker-'],
  ['--ace-time-picker-', '--time-picker-'],
  ['--ace-inline-drawer-', '--inline-drawer-'],
  ['--ace-side-drawer-', '--side-drawer-'],
  ['--ace-site-header-', '--site-header-'],
  ['--ace-page-header-', '--page-header-'],
  ['--ace-sub-header-', '--sub-header-'],
  ['--ace-task-bar-', '--task-bar-'],
  ['--ace-status-pill-', '--badge-'],
  ['--ace-badge-tag-', '--badge-tag-'],
  ['--ace-tab-card-', '--tab-card-'],
  ['--ace-dropdown-menu-', '--dropdown-menu-'],
  ['--ace-dropdown-', '--dropdown-menu-'],
  ['--ace-filter-', '--filter-'],
  ['--ace-toast-', '--toast-message-'],
  ['--ace-icon-button-', '--icon-button-'],
  ['--ace-button-', '--button-'],
  ['--ace-tooltip-', '--tooltip-'],
  ['--ace-tabs-', '--tabs-'],
  ['--ace-input-', '--input-'],
  ['--ace-accordion-', '--accordion-'],
  ['--ace-slider-', '--slider-'],
  ['--ace-stepper-', '--stepper-'],
  ['--ace-attachments-', '--attachments-'],
  ['--ace-sidebar-', '--sidebar-'],
  ['--ace-timeline-', '--timeline-'],
  ['--ace-toggle-', '--toggle-'],
  ['--ace-radio-', '--radio-'],
  ['--ace-availability-', '--availability-tag-'],
  ['--ace-pagination-', '--pagination-'],
].sort((a, b) => b[0].length - a[0].length)

function rewriteTokenRefs(text) {
  let out = text
  let changed = 0

  // Lab chrome shadow must move before ace-drop-shadow → --shadow-*
  // Only rewrite the token name when it's the chrome one defined as light 0 1px 2px —
  // we handle definition rename separately; here rename usages of the old chrome token
  // AFTER drop-shadow remap would collide. So: first rename chrome --shadow-sm → --lab-shadow-sm
  // only in contexts that aren't ace-drop-shadow. We'll do a two-phase approach in variables.css.

  out = out.replace(/--ace-type-[\w-]+/g, (match) => {
    const mapped = mapAceTypeToken(match)
    if (mapped && mapped !== match) {
      changed++
      return mapped
    }
    return match
  })

  for (const [from, to] of EXACT_REPLACEMENTS) {
    if (!out.includes(from)) continue
    const next = out.split(from).join(to)
    if (next !== out) {
      changed += (out.length - next.length) / Math.max(from.length - to.length, 1) || 1
      out = next
    }
  }

  return { text: out, changed }
}

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(full, files)
    else if (TEXT_EXT.has(path.extname(ent.name))) files.push(full)
  }
  return files
}

function writeTypographyTokensCss() {
  const families = [
    {
      id: 'heading',
      size: 'var(--typography-heading-heading)',
      tracking: 'var(--typography-letter-spacing-tight)',
      path: 'typography/heading/heading',
    },
    {
      id: 'subheading',
      size: 'var(--typography-heading-subheading)',
      tracking: 'var(--typography-letter-spacing-normal)',
      path: 'typography/heading/subheading',
    },
    {
      id: 'body',
      size: 'var(--typography-body-body-main)',
      tracking: 'var(--typography-letter-spacing-normal)',
      path: 'typography/body/body-main',
    },
    {
      id: 'caption',
      size: 'var(--typography-body-body-secondary)',
      tracking: 'var(--typography-letter-spacing-normal)',
      path: 'typography/body/body-secondary',
    },
    {
      id: 'footnote',
      size: 'var(--typography-ui-footnote)',
      tracking: 'var(--typography-letter-spacing-normal)',
      path: 'typography/ui/footnote',
    },
    {
      id: 'micro',
      size: 'var(--typography-ui-micro)',
      tracking: 'var(--typography-letter-spacing-normal)',
      path: 'typography/ui/micro',
    },
  ]
  const weights = [
    ['regular', 400],
    ['semi-bold', 600],
    ['bold', 700],
  ]

  let css = `:root {
  /*
   * Composed typography styles — Figma Typography style sheet (Heading → Micro)
   * sized from Semantic Desktop JSON aliases; leading from typography/leading/relaxed;
   * tracking from typography/letter-spacing/* primitives (only tight | normal exist).
   * Pair each --type-* shorthand with its *-tracking token.
   */
  --font-noto: "Noto Sans", var(--font-sans);

`

  for (const fam of families) {
    css += `  /* ${fam.path} → --type-${fam.id}-* */\n`
    for (const [wName, wVal] of weights) {
      const token = `--type-${fam.id}-${wName}`
      css += `  ${token}: ${wVal} ${fam.size}/var(--typography-leading-relaxed) var(--font-noto);\n`
      css += `  ${token}-tracking: ${fam.tracking};\n`
    }
    css += '\n'
  }

  css += `}\n`
  fs.writeFileSync(path.join(root, 'src/styles/typography-tokens.css'), css)
  console.log('Wrote typography-tokens.css (hand-built style sheet composed styles)')
}

function patchVariablesCss(raw) {
  let css = raw

  // Rename lab chrome shadow before introducing Figma --shadow-sm
  css = css.replace(
    /(--shadow-sm:\s*0 1px 2px rgb\(0 0 0 \/ 0\.05\);)/,
    '--lab-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);',
  )
  css = css.replace(
    /(--shadow-sm:\s*0 1px 2px rgb\(0 0 0 \/ 0\.35\);)/,
    '--lab-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.35);',
  )

  // Replace ace drop shadow definitions with Figma Shadow (*) names
  css = css.replace(
    /\/\* ACE drop shadows - Figma Drop Shadows \(71:71\); single-layer elevation, 10% alpha \*\//,
    '/* Drop shadows — Figma Drop Shadows (71:71) / Shadow (XS…XL); single-layer elevation, 10% alpha */',
  )
  css = css.replace(/--ace-drop-shadow-none:/g, '--shadow-none:')
  css = css.replace(/--ace-drop-shadow-xs:/g, '--shadow-xs:')
  css = css.replace(/--ace-drop-shadow-sm:/g, '--shadow-sm:')
  css = css.replace(/--ace-drop-shadow-md:/g, '--shadow-md:')
  css = css.replace(/--ace-drop-shadow-lg:/g, '--shadow-lg:')
  css = css.replace(/--ace-drop-shadow-xl:/g, '--shadow-xl:')

  // Motion
  css = css.replace(/--ace-motion-/g, '--motion-')

  // Section / lab / edit-group / finscan definitions
  css = css.replace(/--ace-section-label-gap:/g, '--section-label-gap:')
  css = css.replace(/--ace-lab-segmented-/g, '--lab-segmented-')
  css = css.replace(/--ace-edit-group-/g, '--edit-group-')
  css = css.replace(/--ace-finscan-icon-gap:/g, '--finscan-icon-gap:')

  // Remove obsolete color-scale ace aliases and finscan mark aliases that only wrap --color-*
  // (keep definitions that introduce unique values like edit-group heights — already renamed)

  const aliasBlocks = [
    /\/\* ace→figma CSS compat aliases \(generated\) \*\/[\s\S]*?(?=\n\}|\n@media|\n\[data-theme|\n\.dark|\n:root)/,
  ]

  // Strip lines that are pure --ace-* : var(--something) compat aliases
  const lines = css.split('\n')
  const filtered = []
  let skippingCompat = false
  let removedAliases = 0
  for (const line of lines) {
    if (line.includes('ace→figma CSS compat aliases')) {
      skippingCompat = true
      removedAliases++
      continue
    }
    if (skippingCompat) {
      // stop at next non-alias / blank-only until we hit a non --ace- line that isn't an alias
      if (/^\s*$/.test(line)) {
        filtered.push(line)
        continue
      }
      if (/^\s*--ace-[\w-]+\s*:/.test(line)) {
        removedAliases++
        continue
      }
      skippingCompat = false
    }
    // Also drop standalone ace color/brand alias definitions that only wrap color tokens
    if (
      /^\s*--ace-(neutral|success|warning|notice|error|secondary-|dark-mode|finscan-mark|finscan-wordmark|guidelines-principle|header-status)/.test(
        line,
      )
    ) {
      removedAliases++
      continue
    }
    filtered.push(line)
  }
  css = filtered.join('\n')

  // Rewrite remaining --ace-* refs inside values (e.g. var(--ace-drop-shadow-xl))
  const rewritten = rewriteTokenRefs(css)
  css = rewritten.text

  // Fix any accidental double-mapping of dropdown
  css = css.replace(/--dropdown-menu-menu-/g, '--dropdown-menu-')

  console.log(`variables.css: removed ~${removedAliases} ace alias lines`)
  return css
}

function rewriteFile(filePath) {
  const rel = path.relative(root, filePath)
  // Skip generated obsolete json / build scripts that we delete separately
  if (rel.replace(/\\/g, '/').endsWith('ace-typography-from-figma.json')) return 0
  if (rel.replace(/\\/g, '/').endsWith('remove-ace-ai-tokens.mjs')) return 0

  let text = fs.readFileSync(filePath, 'utf8')
  const original = text

  if (rel.replace(/\\/g, '/') === 'src/styles/variables.css') {
    text = patchVariablesCss(text)
  } else if (rel.replace(/\\/g, '/') === 'src/styles/typography-tokens.css') {
    // rewritten wholesale
    return 0
  } else {
    // Rename lab chrome --shadow-sm usages BEFORE ace-drop-shadow → --shadow-
    // Heuristic: lab views use shadow-[var(--shadow-sm)] for chrome cards
    if (
      text.includes('shadow-[var(--shadow-sm)]') ||
      text.includes('var(--shadow-sm)') ||
      text.includes('--shadow-sm')
    ) {
      // Only rewrite chrome shadow when file does NOT also define ace-drop-shadow-sm
      // After migration drop-shadow becomes --shadow-sm; chrome should be --lab-shadow-sm
      text = text.replace(/var\(--shadow-sm\)/g, 'var(--lab-shadow-sm)')
      text = text.replace(/`--shadow-sm`/g, '`--lab-shadow-sm`')
      text = text.replace(/>--shadow-sm</g, '>--lab-shadow-sm<')
      // DropShadowsLab / docs mention chrome --shadow-sm — already handled by backtick replace
    }

    const { text: next } = rewriteTokenRefs(text)
    text = next
    text = text.replace(/--dropdown-menu-menu-/g, '--dropdown-menu-')
  }

  if (text !== original) {
    fs.writeFileSync(filePath, text)
    return 1
  }
  return 0
}

writeTypographyTokensCss()

const files = walk(root)
let updated = 0
for (const f of files) {
  updated += rewriteFile(f)
}
console.log(`Updated ${updated} files`)

// Delete obsolete ace typography artifacts
const toDelete = [
  'src/styles/ace-typography-from-figma.json',
  'scripts/build-ace-typography.mjs',
]
for (const rel of toDelete) {
  const full = path.join(root, rel)
  if (fs.existsSync(full)) {
    fs.unlinkSync(full)
    console.log('Deleted', rel)
  }
}
