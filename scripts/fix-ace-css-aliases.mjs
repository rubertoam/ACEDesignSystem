import fs from 'node:fs'

const path = 'src/styles/variables.css'
let css = fs.readFileSync(path, 'utf8')

/**
 * Canonical CSS prefix → Ace alias prefix (for compat forwards).
 * Longest canonical prefixes first.
 */
const CANON_TO_ACE = [
  ['button-descriptive', 'descriptive-button'],
  ['progress-indicator', 'progress-indicator'],
  ['progress-spinner', 'progress-spinner'],
  ['landing-page-card', 'landing-page-card'],
  ['availability-tag', 'availability'],
  ['toast-message', 'toast'],
  ['dropdown-menu', 'dropdown'],
  ['scrollable-list', 'scrollable-list'],
  ['inline-message', 'inline-message'],
  ['inline-drawer', 'inline-drawer'],
  ['date-picker', 'date-picker'],
  ['time-picker', 'time-picker'],
  ['side-drawer', 'side-drawer'],
  ['site-header', 'site-header'],
  ['page-header', 'page-header'],
  ['sub-header', 'sub-header'],
  ['task-bar', 'task-bar'],
  ['badge-tag', 'badge-tag'],
  ['tab-card', 'tab-card'],
  ['icon-button', 'icon-button'],
  ['attachments', 'attachments'],
  ['accordion', 'accordion'],
  ['timeline', 'timeline'],
  ['sidebar', 'sidebar'],
  ['tooltip', 'tooltip'],
  ['slider', 'slider'],
  ['stepper', 'stepper'],
  ['filter', 'filter'],
  ['button', 'button'],
  ['toggle', 'toggle'],
  ['input', 'input'],
  ['radio', 'radio'],
  ['tabs', 'tabs'],
  // status-pill was renamed to badge (not badge-tag)
  ['badge', 'status-pill'],
]

// Strip prior generated blocks (may sit before } or before [data-theme)
css = css.replace(
  /\n\s*\/\* ace→figma CSS compat aliases \(generated\) \*\/\n[\s\S]*?(?=\n\}|\n\[data-theme)/g,
  '\n',
)

const darkIdx = css.indexOf("[data-theme='dark']")
if (darkIdx < 0) throw new Error('dark theme not found')
const rootPart = css.slice(0, darkIdx)
let darkPart = css.slice(darkIdx)

const canonicalNames = [...rootPart.matchAll(/^\s*(--[a-z0-9-]+):/gm)]
  .map((m) => m[1])
  .filter((n) => !n.startsWith('--ace-'))

const aliases = new Map()
for (const canon of canonicalNames) {
  const body = canon.slice(2)
  for (const [to, from] of CANON_TO_ACE) {
    if (body === to || body.startsWith(`${to}-`)) {
      const rest = body.slice(to.length)
      aliases.set(`--ace-${from}${rest}`, `var(${canon});`)
      break
    }
  }
}
console.log('component aliases', aliases.size)

const DARK_FOUNDATION = `    --ace-finscan-mark-primary: var(--color-primary-200);
    --ace-finscan-wordmark-fill: var(--color-primary-200);
    --ace-guidelines-principle-title: var(--color-primary-200);
    --ace-success-500: var(--color-status-success);
    --ace-error-50: var(--color-bg-error);
    --ace-warning-50: var(--color-bg-warning);
    --ace-notice-50: var(--color-warning-2-900);
    --ace-notice-100: var(--color-warning-2-800);
    --ace-notice-200: var(--color-warning-2-700);
`

if (!darkPart.includes('--ace-finscan-wordmark-fill:')) {
  if (darkPart.includes('/* Descriptive buttons')) {
    darkPart = darkPart.replace(
      /(\s*)(\/\* Descriptive buttons)/,
      `\n${DARK_FOUNDATION}\n$1$2`,
    )
  } else {
    darkPart = darkPart.replace(/\n\}\s*$/, `\n${DARK_FOUNDATION}\n}\n`)
  }
}

const rootClose = rootPart.lastIndexOf('\n}')
if (rootClose < 0) throw new Error('root close missing')

const aliasBlock = [
  '',
  '  /* ace→figma CSS compat aliases (generated) */',
  ...[...aliases.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => `  ${k}: ${v}`),
  '',
].join('\n')

const out =
  rootPart.slice(0, rootClose) +
  '\n' +
  aliasBlock +
  rootPart.slice(rootClose) +
  darkPart

fs.writeFileSync(path, out)

const rootOnly = out.slice(0, out.indexOf("[data-theme='dark']"))
const darkOnly = out.slice(out.indexOf("[data-theme='dark']"))
console.log(
  'root polluted finscan-200?',
  /--ace-finscan-mark-primary:\s*var\(--color-primary-200\)/.test(rootOnly),
)
console.log(
  'root light finscan-500',
  /--ace-finscan-mark-primary:\s*var\(--color-primary-500\)/.test(rootOnly),
)
console.log('dark finscan-wordmark', /--ace-finscan-wordmark-fill:/.test(darkOnly))
console.log('root ace-inline-message', rootOnly.includes('--ace-inline-message-radius'))
console.log('root ace-status-pill-radius', rootOnly.includes('--ace-status-pill-radius'))
console.log('wrote', path)
