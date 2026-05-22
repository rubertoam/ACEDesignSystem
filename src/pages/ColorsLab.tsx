import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'

type ColorToken = {
  name: string
  /** CSS var name without `var()` */
  cssVar: string
  kind?: 'solid' | 'shadow'
}

type ColorGroup = {
  title: string
  description?: string
  tokens: ColorToken[]
}

const COLOR_GROUPS: ColorGroup[] = [
  {
    title: 'Lab shell',
    description: 'Default page chrome in the component lab (not ACE product tokens).',
    tokens: [
      { name: 'Background', cssVar: '--color-background' },
      { name: 'Surface', cssVar: '--color-surface' },
      { name: 'Text primary', cssVar: '--color-text-primary' },
      { name: 'Text muted', cssVar: '--color-text-muted' },
      { name: 'Border', cssVar: '--color-border' },
      { name: 'Accent', cssVar: '--color-accent' },
    ],
  },
  {
    title: 'Semantic status',
    description: 'Success and error washes used in forms, sidebars, and inline validation.',
    tokens: [
      { name: 'Success 50', cssVar: '--ace-success-50' },
      { name: 'Success 500', cssVar: '--ace-success-500' },
      { name: 'Error 50', cssVar: '--ace-error-50' },
    ],
  },
  {
    title: 'ACE drop shadows',
    description: 'Single-layer elevation (Figma Drop Shadows 71:71; see Drop shadows lab).',
    tokens: [
      { name: 'None', cssVar: '--ace-drop-shadow-none', kind: 'shadow' },
      { name: 'XS', cssVar: '--ace-drop-shadow-xs', kind: 'shadow' },
      { name: 'SM', cssVar: '--ace-drop-shadow-sm', kind: 'shadow' },
      { name: 'MD', cssVar: '--ace-drop-shadow-md', kind: 'shadow' },
      { name: 'LG', cssVar: '--ace-drop-shadow-lg', kind: 'shadow' },
      { name: 'XL', cssVar: '--ace-drop-shadow-xl', kind: 'shadow' },
    ],
  },
  {
    title: 'Dialog modal',
    description: 'ACE dialog / modal molecule (see Dialog modal lab).',
    tokens: [
      { name: 'Surface', cssVar: '--dialog-modal-surface' },
      { name: 'Border', cssVar: '--dialog-modal-border' },
      { name: 'Title & body', cssVar: '--dialog-modal-title' },
      { name: 'Body (same as title in light)', cssVar: '--dialog-modal-body' },
      { name: 'Muted', cssVar: '--dialog-modal-muted' },
      { name: 'Overlay', cssVar: '--dialog-modal-overlay' },
      { name: 'Primary', cssVar: '--dialog-modal-primary' },
      { name: 'Primary hover', cssVar: '--dialog-modal-primary-hover' },
      { name: 'On primary', cssVar: '--dialog-modal-on-primary' },
      { name: 'Outline border', cssVar: '--dialog-modal-outline-border' },
      { name: 'Outline text', cssVar: '--dialog-modal-outline-text' },
      { name: 'Outline hover bg', cssVar: '--dialog-modal-outline-hover-bg' },
      { name: 'Danger', cssVar: '--dialog-modal-danger' },
      { name: 'Danger hover', cssVar: '--dialog-modal-danger-hover' },
      { name: 'Close hover', cssVar: '--dialog-modal-close-hover' },
      { name: 'Inline error background', cssVar: '--dialog-modal-inline-error-bg' },
      { name: 'Inline error border', cssVar: '--dialog-modal-inline-error-border' },
      { name: 'Shadow (XL)', cssVar: '--dialog-modal-shadow', kind: 'shadow' },
    ],
  },
  {
    title: 'Data Table',
    description: 'Tokens for the data table organism (--screening-* in variables.css).',
    tokens: [
      { name: 'Surface', cssVar: '--screening-surface' },
      { name: 'Surface muted', cssVar: '--screening-surface-muted' },
      { name: 'Surface hover', cssVar: '--screening-surface-hover' },
      { name: 'Surface row muted', cssVar: '--screening-surface-row-muted' },
      { name: 'Surface expanded', cssVar: '--screening-surface-expanded' },
      { name: 'Surface selected', cssVar: '--screening-surface-selected' },
      { name: 'Border strong', cssVar: '--screening-border-strong' },
      { name: 'Border row', cssVar: '--screening-border-row' },
      { name: 'Border soft', cssVar: '--screening-border-soft' },
      { name: 'Text primary', cssVar: '--screening-text-primary' },
      { name: 'Text secondary', cssVar: '--screening-text-secondary' },
      { name: 'Text muted', cssVar: '--screening-text-muted' },
      { name: 'Text on primary', cssVar: '--screening-text-on-primary' },
      { name: 'Primary', cssVar: '--screening-primary' },
      { name: 'Primary hover border', cssVar: '--screening-primary-hover-border' },
      { name: 'Primary soft bg', cssVar: '--screening-primary-soft-bg' },
      { name: 'Primary soft bg hover', cssVar: '--screening-primary-soft-bg-hover' },
      { name: 'Primary ring', cssVar: '--screening-primary-ring' },
      { name: 'Primary ring offset', cssVar: '--screening-primary-ring-offset' },
      { name: 'Icon muted', cssVar: '--screening-icon-muted' },
      { name: 'Progress track', cssVar: '--screening-progress-track' },
      { name: 'Progress fill', cssVar: '--screening-progress-fill' },
      { name: 'Chip inactive bg', cssVar: '--screening-chip-inactive-bg' },
      { name: 'Chip inactive border', cssVar: '--screening-chip-inactive-border' },
      { name: 'Chip inactive hover bg', cssVar: '--screening-chip-inactive-hover-bg' },
      { name: 'Chip inactive hover border', cssVar: '--screening-chip-inactive-hover-border' },
      { name: 'Chip active text', cssVar: '--screening-chip-active-text' },
      { name: 'Chip active border', cssVar: '--screening-chip-active-border' },
      { name: 'Pill new border', cssVar: '--screening-pill-new-border' },
      { name: 'Pill new surface', cssVar: '--screening-pill-new-surface' },
      { name: 'Pill new dot', cssVar: '--screening-pill-new-dot' },
      { name: 'Pill new label', cssVar: '--screening-pill-new-label' },
      { name: 'Checkbox inner bg', cssVar: '--screening-checkbox-inner-bg' },
      { name: 'Checkbox border', cssVar: '--screening-checkbox-border' },
      { name: 'Checkbox disabled border', cssVar: '--screening-checkbox-disabled-border' },
      { name: 'Checkbox disabled checked bg', cssVar: '--screening-checkbox-disabled-checked-bg' },
      { name: 'Pill escalated border', cssVar: '--screening-pill-escalated-border' },
      { name: 'Pill escalated surface', cssVar: '--screening-pill-escalated-surface' },
      { name: 'Pill escalated dot', cssVar: '--screening-pill-escalated-dot' },
      { name: 'Pill escalated label', cssVar: '--screening-pill-escalated-label' },
      { name: 'Score high', cssVar: '--screening-score-high' },
      { name: 'Age fresh', cssVar: '--screening-age-fresh' },
      { name: 'Age warn', cssVar: '--screening-age-warn' },
      { name: 'Age stale', cssVar: '--screening-age-stale' },
      { name: 'Tile E bg', cssVar: '--screening-tile-e-bg' },
      { name: 'Tile E fg', cssVar: '--screening-tile-e-fg' },
      { name: 'Tile E border', cssVar: '--screening-tile-e-border' },
      { name: 'Tile N bg', cssVar: '--screening-tile-n-bg' },
      { name: 'Tile N fg', cssVar: '--screening-tile-n-fg' },
      { name: 'Tile N border', cssVar: '--screening-tile-n-border' },
      { name: 'Tile C1 bg', cssVar: '--screening-tile-c1-bg' },
      { name: 'Tile C1 fg', cssVar: '--screening-tile-c1-fg' },
      { name: 'Tile C1 border', cssVar: '--screening-tile-c1-border' },
      { name: 'Tile C2 bg', cssVar: '--screening-tile-c2-bg' },
      { name: 'Tile C2 fg', cssVar: '--screening-tile-c2-fg' },
      { name: 'Tile C2 border', cssVar: '--screening-tile-c2-border' },
      { name: 'Tile B bg', cssVar: '--screening-tile-b-bg' },
      { name: 'Tile B fg', cssVar: '--screening-tile-b-fg' },
      { name: 'Tile B border', cssVar: '--screening-tile-b-border' },
      { name: 'Shadow card', cssVar: '--screening-shadow-card', kind: 'shadow' },
      { name: 'Shadow card hover', cssVar: '--screening-shadow-card-hover', kind: 'shadow' },
      { name: 'Shadow row accent', cssVar: '--screening-shadow-row-accent', kind: 'shadow' },
      { name: 'Shadow thead', cssVar: '--screening-shadow-thead', kind: 'shadow' },
      { name: 'Input border', cssVar: '--screening-input-border' },
      { name: 'Input border focus', cssVar: '--screening-input-border-focus' },
      { name: 'Input bg focus', cssVar: '--screening-input-bg-focus' },
      { name: 'Input focus ring', cssVar: '--screening-input-focus-ring' },
      { name: 'Input placeholder', cssVar: '--screening-input-placeholder' },
    ],
  },
  {
    title: 'ACE Toggle',
    description: 'Switch track and thumb (Figma Toggles 117:1265; see Toggles lab).',
    tokens: [
      { name: 'Toggle thumb', cssVar: '--ace-toggle-thumb' },
      { name: 'Toggle track off', cssVar: '--ace-toggle-track-off' },
      { name: 'Toggle track on', cssVar: '--ace-toggle-track-on' },
      { name: 'Toggle track off hover', cssVar: '--ace-toggle-track-off-hover' },
      { name: 'Toggle track on hover', cssVar: '--ace-toggle-track-on-hover' },
      { name: 'Toggle track disabled off', cssVar: '--ace-toggle-track-disabled-off' },
      { name: 'Toggle track disabled on', cssVar: '--ace-toggle-track-disabled-on' },
      { name: 'Toggle focus ring', cssVar: '--ace-toggle-focus-ring' },
    ],
  },
  {
    title: 'ACE Radio',
    description: 'Radio control, indicator, and field chrome (Figma Radio Buttons 331:1755; see Radio buttons lab).',
    tokens: [
      { name: 'Radio inner bg', cssVar: '--ace-radio-bg-inner' },
      { name: 'Radio border default', cssVar: '--ace-radio-border-default' },
      { name: 'Radio border hover', cssVar: '--ace-radio-border-hover' },
      { name: 'Radio surface hover', cssVar: '--ace-radio-surface-hover' },
      { name: 'Radio border selected', cssVar: '--ace-radio-border-selected' },
      { name: 'Radio indicator selected', cssVar: '--ace-radio-indicator-selected' },
      { name: 'Radio border disabled', cssVar: '--ace-radio-border-disabled' },
      { name: 'Radio indicator disabled', cssVar: '--ace-radio-indicator-disabled' },
      { name: 'Radio label disabled', cssVar: '--ace-radio-label-disabled' },
      { name: 'Radio field border', cssVar: '--ace-radio-field-border' },
      { name: 'Radio field bg', cssVar: '--ace-radio-field-bg' },
      { name: 'Radio field bg hover', cssVar: '--ace-radio-field-bg-hover' },
      { name: 'Radio field border active', cssVar: '--ace-radio-field-border-active' },
      { name: 'Radio field bg disabled', cssVar: '--ace-radio-field-bg-disabled' },
    ],
  },
]

function Swatch({ token }: { token: ColorToken }) {
  const v = `var(${token.cssVar})`
  if (token.kind === 'shadow') {
    return (
      <div
        className="flex h-16 w-full items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]"
        style={{ boxShadow: v }}
      >
        <span className="rounded bg-[var(--color-background)]/90 px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]">
          shadow
        </span>
      </div>
    )
  }
  return (
    <div
      className="h-14 w-full rounded-[var(--radius-md)] border border-[var(--color-border)]"
      style={{ background: v }}
    />
  )
}

export function ColorsLab() {
  return (
    <ComponentLabPage
      title="Colors"
      description="Design tokens that resolve to color or shadow values from src/styles/variables.css. Use var(--token-name) in components; literal hex belongs only in the variables file."
      examples={
        <div className="space-y-10">
          {COLOR_GROUPS.map((group) => (
            <section key={group.title} className={labExampleSectionClass}>
              <div>
                <h4 className={labSectionLabelClass}>{group.title}</h4>
                {group.description ? (
                  <p className="m-0 mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">{group.description}</p>
                ) : null}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.tokens.map((t) => (
                  <div
                    key={t.cssVar}
                    className={cn(
                      'overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)]',
                    )}
                  >
                    <Swatch token={t} />
                    <div className="space-y-1 p-3">
                      <p className="m-0 text-xs font-medium text-[var(--color-text-primary)]">{t.name}</p>
                      <code className="block break-all text-[11px] text-[var(--color-text-muted)]">{t.cssVar}</code>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      }
      code={
        <ComponentLabCode>{`/* variables.css */
--screening-primary: #523eb9;

/* component */
color: var(--screening-text-primary);
background: var(--screening-surface-muted);`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Reference a token by name. For the data table, prefer <code className="text-[var(--color-text-primary)]">--screening-*</code>; for modals,{' '}
          <code className="text-[var(--color-text-primary)]">--dialog-modal-*</code>.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Source of truth: <code className="text-[var(--color-text-primary)]">src/styles/variables.css</code>. Dark theme overrides live under{' '}
            <code className="text-[var(--color-text-primary)]">[data-theme=&quot;dark&quot;]</code> on the document (lab Theme control) for dark-mode token overrides.
          </li>
          <li>
            When you add or rename a token, update this lab list in <code className="text-[var(--color-text-primary)]">ColorsLab.tsx</code> so designers stay aligned
            with code.
          </li>
        </ul>
      }
    />
  )
}
