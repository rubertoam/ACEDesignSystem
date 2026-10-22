/**
 * Rewrite --ace-type-* composed styles in typography-tokens.css to reference
 * Figma --typography-size-* / --typography-line-height-* / --typography-letter-spacing-*.
 *
 * ACE paragraph naming (p1/p2/p3) is product-facing and maps to Figma size tokens as:
 *   ace p1 (14) → typography/size/p3
 *   ace p2 (16) → typography/size/p2
 *   ace p3 (18) → typography/size/p1
 */
import fs from 'node:fs'
import path from 'node:path'

const file = path.resolve(import.meta.dirname, '../src/styles/typography-tokens.css')
let css = fs.readFileSync(file, 'utf8')

/** Map hardcoded rem font-size in font shorthand → token. */
const sizeMap = {
  '4.5000rem': 'var(--typography-size-display-01, 4.5rem)',
  '3.7500rem': 'var(--typography-size-display-02)',
  '3.0000rem': 'var(--typography-size-h1)',
  '2.4375rem': 'var(--typography-size-h2)',
  '2.1250rem': 'var(--typography-size-h1-small)',
  '2.0625rem': 'var(--typography-size-h2-small)', // also h3
  '1.7500rem': 'var(--typography-size-h3-small)', // also h4
  '1.4375rem': 'var(--typography-size-h4-small)', // also h5
  '1.2500rem': 'var(--typography-size-subheading)', // also h5-small / h6
  '1.1250rem': 'var(--typography-size-p1)', // ace p3
  '1.0000rem': 'var(--typography-size-p2)', // ace p2 / h6-small
  '0.8750rem': 'var(--typography-size-p3)', // ace p1
  '0.7500rem': 'var(--typography-size-caption)',
  '0.6250rem': 'var(--typography-size-footer-01)',
  '0.5000rem': 'var(--typography-size-footer-02)',
}

// Replace line-height literal 1.649999976158142 with relaxed token
css = css.replace(/\/1\.649999976158142 /g, '/var(--typography-line-height-relaxed) ')
css = css.replace(/\/1\.5000rem /g, '/var(--typography-line-height-normal) ')

for (const [rem, token] of Object.entries(sizeMap)) {
  // Only replace inside font shorthands (weight SIZE/line-height family)
  const re = new RegExp(`( (?:400|600|700|800) )${rem.replace('.', '\\.')}(\\/)`, 'g')
  css = css.replace(re, `$1${token}$2`)
}

// Letter-spacing tokens for tracking vars that are currently literals
css = css.replace(
  /(--ace-type-[a-z0-9-]+-tracking):\s*-0\.04em;/g,
  '$1: var(--typography-letter-spacing-tight);',
)
css = css.replace(
  /(--ace-type-[a-z0-9-]+-tracking):\s*0\.02em;/g,
  '$1: var(--typography-letter-spacing-normal);',
)
// Keep 0 tracking as 0 (normal is often 0 in Figma) — map to token when available
css = css.replace(
  /(--ace-type-(?:paragraph|caption|subheading|heading-h2-bold|heading-h2-semi-bold)[a-z0-9-]*-tracking):\s*0;/g,
  '$1: var(--typography-letter-spacing-normal);',
)

// Document the ACE ↔ Figma size mapping once near the top
if (!css.includes('ACE paragraph p1/p2/p3 ↔ Figma')) {
  css = css.replace(
    '/* ——— Composed --ace-type-* shorthands (pair each with *-tracking) ——— */',
    `/* ——— Composed --ace-type-* shorthands (pair each with *-tracking) ——— */
  /* ACE paragraph p1/p2/p3 ↔ Figma typography/size: p1→p3 (14), p2→p2 (16), p3→p1 (18). */`,
  )
}

fs.writeFileSync(file, css)
console.log('typography-tokens.css wired to Figma size / leading / tracking tokens')
