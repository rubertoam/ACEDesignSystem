/**
 * Replace hardcoded hex in variables.css with var(--color-*) when the hex
 * exactly matches a primitive (or shade) token from color-tokens.css.
 *
 * Also applies a curated set of semantic aliases for common component surfaces.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const colorTokensPath = path.join(root, 'src/styles/color-tokens.css')
const variablesPath = path.join(root, 'src/styles/variables.css')

const colorCss = fs.readFileSync(colorTokensPath, 'utf8')
const hexToVar = new Map()

// Prefer longer / more specific names last so later wins; we collect all then
// prefer primitives (color-neutral-*, color-primary-*, etc.) over semantic aliases.
for (const m of colorCss.matchAll(/--(color-[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\b/g)) {
  const name = m[1]
  const hex = m[2].toLowerCase()
  // Skip semantic groups that only alias (shouldn't appear as hex in color-tokens :root primitives)
  if (
    name.startsWith('color-bg-') ||
    name.startsWith('color-surface-') ||
    name.startsWith('color-text-') ||
    name.startsWith('color-border-') ||
    name.startsWith('color-action-') ||
    name.startsWith('color-status-') ||
    name.startsWith('color-icon-') ||
    name.startsWith('color-badges-')
  ) {
    continue
  }
  if (!hexToVar.has(hex)) hexToVar.set(hex, name)
}

/** Curated semantic replacements (property → css value) for known component tokens. */
const propertySemantic = {
  '--dialog-modal-surface': 'var(--color-surface-primary)',
  '--dialog-modal-border': 'var(--color-neutral-100)',
  '--dialog-modal-title': 'var(--color-text-primary)',
  '--dialog-modal-body': 'var(--color-text-primary)',
  '--dialog-modal-muted': 'var(--color-text-secondary)',
  '--dialog-modal-primary': 'var(--color-primary-500)',
  '--dialog-modal-primary-hover': 'var(--color-primary-600)',
  '--dialog-modal-on-primary': 'var(--color-text-inverse)',
  '--dialog-modal-outline-border': 'var(--color-primary-500)',
  '--dialog-modal-outline-text': 'var(--color-primary-500)',
  '--dialog-modal-outline-hover-bg': 'var(--color-bg-brand-hover)',
  '--dialog-modal-danger': 'var(--color-status-error)',
  '--dialog-modal-danger-hover': 'var(--color-error-600)',
  '--dialog-modal-inline-error-border': 'var(--color-border-error)',
  '--date-picker-day-on-primary': 'var(--color-text-inverse)',
  '--color-success-400': 'var(--color-success-400)',
  '--color-blue-500': 'var(--color-blue-500)',
  '--color-secondary-500': 'var(--color-secondary-500)',
  '--sidebar-border-accent': 'var(--color-primary-300)',
  '--toast-message-bg': 'var(--color-surface-primary)',
  '--toast-message-border': 'var(--color-border-default)',
  '--toast-message-confirm-text': 'var(--color-text-inverse)',
  '--toast-message-dismiss-icon': 'var(--color-icon-secondary)',
  '--toast-message-icon-glyph': 'var(--color-text-inverse)',
  '--timeline-sort-bg': 'var(--color-surface-primary)',
  '--timeline-expanded-bg': 'var(--color-bg-primary)',
  '--timeline-body-bg': 'var(--color-surface-primary)',
  '--timeline-icon-glyph': 'var(--color-text-inverse)',
  '--scrollable-list-item-selected-bg': 'var(--color-bg-tertiary)',
  '--scrollable-list-item-hover-bg': 'var(--color-bg-tertiary)',
  '--scrollable-list-icon': 'var(--color-icon-brand)',
  '--filter-trigger-border': 'var(--color-border-default)',
  '--filter-chip-border': 'var(--color-border-default)',
  '--slider-track-inactive': 'var(--color-bg-brand-hover)',
  '--slider-track-border': 'var(--color-action-primary)',
  '--slider-range': 'var(--color-action-primary)',
  '--slider-handle': 'var(--color-action-primary)',
  '--slider-tick-on-range': 'var(--color-bg-brand-hover)',
  '--slider-tick-on-track': 'var(--color-action-primary)',
  '--slider-tooltip-bg': 'var(--color-text-primary)',
  '--slider-tooltip-text': 'var(--color-bg-primary)',
  '--slider-track-inactive-disabled': 'var(--color-neutral-100)',
  '--slider-track-border-disabled': 'var(--color-border-default)',
  '--slider-range-disabled': 'var(--color-primary-100)',
  '--slider-handle-disabled': 'var(--color-neutral-500)',
  '--radio-bg-inner': 'var(--color-surface-primary)',
  '--radio-border-default': 'var(--color-icon-primary)',
  '--radio-border-hover': 'var(--color-icon-primary)',
  '--radio-border-selected': 'var(--color-action-primary)',
  '--radio-indicator-selected': 'var(--color-action-primary)',
  '--radio-border-disabled': 'var(--color-icon-disabled)',
  '--radio-label-disabled': 'var(--color-icon-disabled)',
  '--radio-field-bg': 'var(--color-surface-primary)',
  '--radio-field-bg-hover': 'var(--color-bg-brand-hover)',
  '--radio-field-bg-active': 'var(--color-bg-brand-hover)',
  '--radio-field-border-active': 'var(--color-action-primary)',
  '--radio-field-bg-disabled': 'var(--color-neutral-100)',
  '--accordion-surface': 'var(--color-surface-primary)',
  '--accordion-surface-muted': 'var(--color-bg-primary)',
  '--accordion-border': 'var(--color-border-default)',
  '--accordion-title': 'var(--color-text-primary)',
  '--accordion-tag-bg': 'var(--color-bg-tertiary)',
  '--accordion-tag-text': 'var(--color-text-primary)',
  '--accordion-icon': 'var(--color-icon-primary)',
  '--accordion-content-bg': 'var(--color-surface-primary)',
  '--availability-tag-planned-bg': 'var(--color-bg-brand-hover)',
  '--availability-tag-planned-text': 'var(--color-action-primary)',
  '--inline-drawer-border': 'var(--color-border-default)',
  '--tab-card-border-default': 'var(--color-border-default)',
}

/** Near-miss hex → preferred token (not exact primitive match). */
const nearHex = {
  '#322475': 'var(--color-primary-600)', // legacy hover ≈ primary-600
  '#c41e42': 'var(--color-error-600)',
  '#64748b': 'var(--color-icon-secondary)',
  '#2e7d32': 'var(--color-status-success)',
  '#c62828': 'var(--color-status-error)',
  '#ef6c00': 'var(--color-status-warning)',
  '#99ca3c': 'var(--color-success-400)',
  '#f8f7fc': 'var(--color-bg-brand-hover)',
  '#f4f1fc': 'var(--color-bg-brand-hover)',
  '#d6cef5': 'var(--color-primary-100)',
  '#e8f4ea': 'var(--color-status-success-subtle)',
  '#bcbcca': 'var(--color-border-default)',
  '#d4d6db': 'var(--color-neutral-300)',
  '#454c59': 'var(--color-neutral-700)',
}

let css = fs.readFileSync(variablesPath, 'utf8')
let semanticHits = 0
let hexHits = 0
let nearHits = 0

// 1) Property-level semantic replacements
for (const [prop, value] of Object.entries(propertySemantic)) {
  const re = new RegExp(`(${prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*)([^;]+)`, 'g')
  const next = css.replace(re, (full, prefix, current) => {
    if (current.trim() === value) return full
    semanticHits++
    return `${prefix}${value}`
  })
  css = next
}

// 2) Secondary / teal scale aliases → color-secondary / color-teal
css = css.replace(
  /--color-secondary-(\d+)\s*:\s*#[0-9a-fA-F]{3,8}/g,
  (_, shade) => {
    hexHits++
    return `--color-secondary-${shade}: var(--color-secondary-${shade})`
  },
)
css = css.replace(/--color-teal-(\d+)\s*:\s*#[0-9a-fA-F]{3,8}/g, (_, shade) => {
  hexHits++
  return `--color-teal-${shade}: var(--color-teal-${shade})`
})

// 3) Remaining hex → primitive var or near map
css = css.replace(/(:\s*)(#[0-9a-fA-F]{3,8})\b/g, (full, prefix, hex) => {
  const key = hex.toLowerCase()
  if (nearHex[key]) {
    nearHits++
    return `${prefix}${nearHex[key]}`
  }
  const token = hexToVar.get(key)
  if (token) {
    hexHits++
    return `${prefix}var(--${token})`
  }
  return full
})

fs.writeFileSync(variablesPath, css)
const remaining = [...css.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0].toLowerCase())
const uniq = [...new Set(remaining)].sort()
console.log(
  JSON.stringify(
    { semanticHits, hexHits, nearHits, remainingCount: remaining.length, remainingUnique: uniq },
    null,
    2,
  ),
)
