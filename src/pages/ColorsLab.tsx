import { useState } from 'react'
import { LabSelect } from '../lib/labControls'
import { ColorComponentTokensView } from './ColorComponentTokensView'
import { ColorPaletteView } from './ColorPaletteView'
import { COLOR_COMPONENT_GROUPS, COLOR_PALETTE_FAMILIES } from './colorsLabData'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

type ColorsLabView = 'palette' | 'component'

export function ColorsLab() {
  const [view, setView] = useState<ColorsLabView>('palette')
  const [componentId, setComponentId] = useState(COLOR_COMPONENT_GROUPS[0]?.id ?? '')

  const selectedGroup = COLOR_COMPONENT_GROUPS.find((g) => g.id === componentId) ?? COLOR_COMPONENT_GROUPS[0]

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:max-w-2xl">
      <LabSelect
        label="View"
        value={view}
        onChange={(v) => setView(v as ColorsLabView)}
        options={[
          { value: 'palette', label: 'Color palette' },
          { value: 'component', label: 'By component' },
        ]}
      />
      {view === 'component' ? (
        <LabSelect
          label="Component"
          value={componentId}
          onChange={setComponentId}
          options={COLOR_COMPONENT_GROUPS.map((g) => ({ value: g.id, label: g.title }))}
        />
      ) : null}
    </div>
  )

  return (
    <ComponentLabPage
      title="Colors"
      description="ACE color scales from Figma (node 2794:5) and semantic tokens from src/styles/variables.css. Use var(--token-name) in components; literal hex belongs only in the variables file."
      examplesToolbar={toolbar}
      examples={
        view === 'palette' ? (
          <ColorPaletteView families={COLOR_PALETTE_FAMILIES} />
        ) : selectedGroup ? (
          <ColorComponentTokensView group={selectedGroup} />
        ) : null
      }
      code={
        <ComponentLabCode>{`/* variables.css */
--screening-primary: #523eb9;

/* component */
color: var(--screening-text-primary);
background: var(--screening-surface-muted);`}</ComponentLabCode>
      }
      usage={
        <div className="space-y-3 text-[var(--color-text-muted)]">
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Color palette</strong> mirrors the Figma
            FinScan Colors page: each family shows shade, hex, and HSL with optional CSS variable links where tokens
            exist in code.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">By component</strong> lists solid tokens used by a
            specific molecule or lab area. Drop shadows are documented on the Drop shadows lab, not here.
          </p>
          <p className="m-0 leading-relaxed">
            Reference tokens by name - for the data table prefer <code className="text-[var(--screening-text-primary)]">--screening-*</code>;
            for modals <code className="text-[var(--screening-text-primary)]">--dialog-modal-*</code>.
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Source of truth: <code className="text-[var(--screening-text-primary)]">src/styles/variables.css</code>.
            Dark theme overrides live under{' '}
            <code className="text-[var(--screening-text-primary)]">[data-theme=&quot;dark&quot;]</code> (lab Theme
            control).
          </li>
          <li>
            When you add or rename a token, update{' '}
            <code className="text-[var(--screening-text-primary)]">src/pages/colorsLabData.ts</code> so designers stay
            aligned with code.
          </li>
        </ul>
      }
    />
  )
}
