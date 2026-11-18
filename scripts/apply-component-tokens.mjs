/**
 * Remaps component-facing aliases in variables.css to Figma Component tokens
 * from color-tokens.css (radius/component/*, spacing/component padding/*, etc.).
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const file = path.join(root, 'src/styles/variables.css')
let css = fs.readFileSync(file, 'utf8')

const replacements = [
  // Radius → radius/component/*
  ['--dialog-modal-radius: 0.5rem;', '--dialog-modal-radius: var(--radius-component-modal);'],
  ['--dialog-modal-btn-radius: 0.25rem;', '--dialog-modal-btn-radius: var(--radius-component-button);'],
  [
    '--button-radius: var(--dialog-modal-btn-radius);',
    '--button-radius: var(--radius-component-button);',
  ],
  [
    '--screening-input-radius: 0.25rem; /* 4px */',
    '--screening-input-radius: var(--radius-component-input);',
  ],
  [
    '--landing-page-card-radius: var(--radius-sm); /* radius/sm 4px */',
    '--landing-page-card-radius: var(--radius-component-card);',
  ],
  ['--data-card-radius: var(--radius-sm);', '--data-card-radius: var(--radius-component-card);'],
  ['--tooltip-radius: var(--radius-sm);', '--tooltip-radius: var(--radius-component-tooltip);'],
  ['--toast-message-radius: 4px;', '--toast-message-radius: var(--radius-component-tooltip);'],
  ['--accordion-radius: 0.25rem;', '--accordion-radius: var(--radius-component-input);'],
  [
    '--badge-tag-radius: var(--radius-sm); /* 4px */',
    '--badge-tag-radius: var(--radius-sm); /* tags stay squared; pills use --radius-component-badge */',
  ],
  [
    '--button-descriptive-radius: 0.25rem;',
    '--button-descriptive-radius: var(--radius-component-button);',
  ],
  [
    '--button-descriptive-padding: 0.75rem;',
    '--button-descriptive-padding: var(--spacing-component-padding-padding-md);',
  ],
  [
    '--button-descriptive-gap: 0.75rem;',
    '--button-descriptive-gap: var(--spacing-component-padding-gap-md);',
  ],

  // Button padding / gap → spacing/component padding/*
  ['--button-px-sm: 0.75rem;', '--button-px-sm: var(--spacing-component-padding-padding-md);'],
  ['--button-py-sm: 0.25rem;', '--button-py-sm: var(--spacing-component-padding-padding-xs);'],
  ['--button-gap-sm: 0.5rem;', '--button-gap-sm: var(--spacing-component-padding-gap-sm);'],
  ['--button-px-md: 1rem;', '--button-px-md: var(--spacing-component-padding-padding-lg);'],
  ['--button-py-md: 0.5rem;', '--button-py-md: var(--spacing-component-padding-padding-sm);'],
  ['--button-gap-md: 0.5rem;', '--button-gap-md: var(--spacing-component-padding-gap-sm);'],
  ['--button-px-lg: 1.125rem;', '--button-px-lg: var(--spacing-component-padding-padding-lg);'],
  ['--button-py-lg: 0.75rem;', '--button-py-lg: var(--spacing-component-padding-padding-md);'],
  ['--button-gap-lg: 0.75rem;', '--button-gap-lg: var(--spacing-component-padding-gap-md);'],

  // Badge padding → component padding
  ['--badge-gap: 0.375rem; /* 6px */', '--badge-gap: var(--spacing-component-padding-gap-xs);'],
  ['--badge-py: 0.125rem; /* 2px */', '--badge-py: var(--spacing-component-padding-padding-xs);'],
  ['--badge-px: 0.5rem; /* 8px */', '--badge-px: var(--spacing-component-padding-padding-sm);'],
  [
    '--badge-label-size: 0.75rem; /* 12px */',
    '--badge-label-size: var(--typography-ui-caption);',
  ],

  // Progress → action tokens (drop purple aliases)
  [
    '--progress-indicator-bg-brand: var(--button-purple-500);',
    '--progress-indicator-bg-brand: var(--color-action-primary);',
  ],
  [
    '--progress-indicator-border: var(--button-purple-500);',
    '--progress-indicator-border: var(--color-action-primary);',
  ],
  [
    '--progress-indicator-text-on-surface: var(--button-purple-400);',
    '--progress-indicator-text-on-surface: var(--color-text-brand);',
  ],
  [
    '--progress-indicator-spinner-on-surface: var(--button-purple-500);',
    '--progress-indicator-spinner-on-surface: var(--color-action-primary);',
  ],
  [
    '--progress-indicator-text-on-brand: var(--color-neutral-50); /* Neutral/50 */',
    '--progress-indicator-text-on-brand: var(--color-text-inverse);',
  ],
  [
    '--progress-indicator-spinner-on-brand: var(--color-neutral-50);',
    '--progress-indicator-spinner-on-brand: var(--color-text-inverse);',
  ],
  [
    '--progress-indicator-padding: 1rem;',
    '--progress-indicator-padding: var(--spacing-component-padding-padding-lg);',
  ],
]

let hits = 0
for (const [from, to] of replacements) {
  if (!css.includes(from)) {
    console.warn('MISS:', from.slice(0, 80))
    continue
  }
  css = css.replace(from, to)
  hits++
}

// Ensure status pill radius token exists near status pill block
if (!css.includes('--badge-radius:')) {
  css = css.replace(
    '--badge-gap:',
    '--badge-radius: var(--radius-component-badge);\n  --badge-gap:',
  )
  hits++
}

fs.writeFileSync(file, css)
console.log(JSON.stringify({ hits, total: replacements.length }, null, 2))
