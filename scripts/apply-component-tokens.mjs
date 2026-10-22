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
    '--ace-button-radius: var(--dialog-modal-btn-radius);',
    '--ace-button-radius: var(--radius-component-button);',
  ],
  [
    '--screening-input-radius: 0.25rem; /* 4px */',
    '--screening-input-radius: var(--radius-component-input);',
  ],
  [
    '--ace-landing-page-card-radius: var(--radius-sm); /* radius/sm 4px */',
    '--ace-landing-page-card-radius: var(--radius-component-card);',
  ],
  ['--ace-data-card-radius: var(--radius-sm);', '--ace-data-card-radius: var(--radius-component-card);'],
  ['--ace-tooltip-radius: var(--radius-sm);', '--ace-tooltip-radius: var(--radius-component-tooltip);'],
  ['--ace-toast-radius: 4px;', '--ace-toast-radius: var(--radius-component-tooltip);'],
  ['--ace-accordion-radius: 0.25rem;', '--ace-accordion-radius: var(--radius-component-input);'],
  [
    '--ace-badge-tag-radius: var(--radius-sm); /* 4px */',
    '--ace-badge-tag-radius: var(--radius-sm); /* tags stay squared; pills use --radius-component-badge */',
  ],
  [
    '--ace-descriptive-button-radius: 0.25rem;',
    '--ace-descriptive-button-radius: var(--radius-component-button);',
  ],
  [
    '--ace-descriptive-button-padding: 0.75rem;',
    '--ace-descriptive-button-padding: var(--spacing-component-padding-padding-md);',
  ],
  [
    '--ace-descriptive-button-gap: 0.75rem;',
    '--ace-descriptive-button-gap: var(--spacing-component-padding-gap-md);',
  ],

  // Button padding / gap → spacing/component padding/*
  ['--ace-button-px-sm: 0.75rem;', '--ace-button-px-sm: var(--spacing-component-padding-padding-md);'],
  ['--ace-button-py-sm: 0.25rem;', '--ace-button-py-sm: var(--spacing-component-padding-padding-xs);'],
  ['--ace-button-gap-sm: 0.5rem;', '--ace-button-gap-sm: var(--spacing-component-padding-gap-sm);'],
  ['--ace-button-px-md: 1rem;', '--ace-button-px-md: var(--spacing-component-padding-padding-lg);'],
  ['--ace-button-py-md: 0.5rem;', '--ace-button-py-md: var(--spacing-component-padding-padding-sm);'],
  ['--ace-button-gap-md: 0.5rem;', '--ace-button-gap-md: var(--spacing-component-padding-gap-sm);'],
  ['--ace-button-px-lg: 1.125rem;', '--ace-button-px-lg: var(--spacing-component-padding-padding-lg);'],
  ['--ace-button-py-lg: 0.75rem;', '--ace-button-py-lg: var(--spacing-component-padding-padding-md);'],
  ['--ace-button-gap-lg: 0.75rem;', '--ace-button-gap-lg: var(--spacing-component-padding-gap-md);'],

  // Badge padding → component padding
  ['--ace-status-pill-gap: 0.375rem; /* 6px */', '--ace-status-pill-gap: var(--spacing-component-padding-gap-xs);'],
  ['--ace-status-pill-py: 0.125rem; /* 2px */', '--ace-status-pill-py: var(--spacing-component-padding-padding-xs);'],
  ['--ace-status-pill-px: 0.5rem; /* 8px */', '--ace-status-pill-px: var(--spacing-component-padding-padding-sm);'],
  [
    '--ace-status-pill-label-size: 0.75rem; /* 12px */',
    '--ace-status-pill-label-size: var(--typography-ui-caption);',
  ],

  // Progress → action tokens (drop purple aliases)
  [
    '--ace-progress-indicator-bg-brand: var(--ace-button-purple-500);',
    '--ace-progress-indicator-bg-brand: var(--color-action-primary);',
  ],
  [
    '--ace-progress-indicator-border: var(--ace-button-purple-500);',
    '--ace-progress-indicator-border: var(--color-action-primary);',
  ],
  [
    '--ace-progress-indicator-text-on-surface: var(--ace-button-purple-400);',
    '--ace-progress-indicator-text-on-surface: var(--color-text-brand);',
  ],
  [
    '--ace-progress-indicator-spinner-on-surface: var(--ace-button-purple-500);',
    '--ace-progress-indicator-spinner-on-surface: var(--color-action-primary);',
  ],
  [
    '--ace-progress-indicator-text-on-brand: var(--color-neutral-50); /* Neutral/50 */',
    '--ace-progress-indicator-text-on-brand: var(--color-text-inverse);',
  ],
  [
    '--ace-progress-indicator-spinner-on-brand: var(--color-neutral-50);',
    '--ace-progress-indicator-spinner-on-brand: var(--color-text-inverse);',
  ],
  [
    '--ace-progress-indicator-padding: 1rem;',
    '--ace-progress-indicator-padding: var(--spacing-component-padding-padding-lg);',
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
if (!css.includes('--ace-status-pill-radius:')) {
  css = css.replace(
    '--ace-status-pill-gap:',
    '--ace-status-pill-radius: var(--radius-component-badge);\n  --ace-status-pill-gap:',
  )
  hits++
}

fs.writeFileSync(file, css)
console.log(JSON.stringify({ hits, total: replacements.length }, null, 2))
