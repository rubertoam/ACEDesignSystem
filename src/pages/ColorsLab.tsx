import { useState } from 'react'
import { LabSelect } from '../lib/labControls'
import { ColorPaletteView } from './ColorPaletteView'
import { ColorSemanticTokensView } from './ColorSemanticTokensView'
import { ColorStyleSheetView } from './ColorStyleSheetView'
import {
  COLOR_PRIMITIVE_FAMILIES,
  COLOR_SEMANTIC_GROUPS,
  COLOR_STYLE_SHEET_FAMILIES,
} from './colorsLabData'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

type ColorsLabView = 'stylesheet' | 'primitives' | 'semantics'

export function ColorsLab() {
  const [view, setView] = useState<ColorsLabView>('stylesheet')

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:max-w-2xl">
      <LabSelect
        label="View"
        value={view}
        onChange={(v) => setView(v as ColorsLabView)}
        options={[
          { value: 'stylesheet', label: 'Style Sheet' },
          { value: 'primitives', label: 'Primitive Tokens' },
          { value: 'semantics', label: 'Semantic Tokens' },
        ]}
      />
    </div>
  )

  return (
    <ComponentLabPage
      title="Colors"
      description="Documents the colors style sheet along with the primitive and semantic color tokens from Figma."
      examplesToolbar={toolbar}
      examples={
        view === 'stylesheet' ? (
          <ColorStyleSheetView families={COLOR_STYLE_SHEET_FAMILIES} />
        ) : view === 'primitives' ? (
          <ColorPaletteView families={COLOR_PRIMITIVE_FAMILIES} />
        ) : (
          <ColorSemanticTokensView groups={COLOR_SEMANTIC_GROUPS} />
        )
      }
      code={
        <ComponentLabCode>{`/* color-tokens.css — Figma documentation layer */
--color-neutral-400: #cfd2d9;
--color-border-default: var(--color-neutral-400);

/* Semantic aliases resolve to primitives */
border-color: var(--color-border-default);`}</ComponentLabCode>
      }
      usage={
        <div className="space-y-3 text-[var(--color-text-muted)]">
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Style Sheet</strong> mirrors Figma
            FinScan Colors / Color Styles (shade, hex, HSL), including Notice.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Primitive Tokens</strong> mirror Figma
            Primitive Color Tokens as{' '}
            <code className="text-[var(--screening-text-primary)]">color/&#123;family&#125;/&#123;shade&#125;</code> →{' '}
            <code className="text-[var(--screening-text-primary)]">--color-&#123;family&#125;-&#123;shade&#125;</code>.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Semantic Tokens</strong> mirror Figma
            Semantic Color Tokens (Light): intent aliases that reference primitives (
            <code className="text-[var(--screening-text-primary)]">colors/bg/*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">colors/border/*</code>, …).
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Documentation source:{' '}
            <code className="text-[var(--screening-text-primary)]">src/styles/color-tokens.css</code> +{' '}
            <code className="text-[var(--screening-text-primary)]">src/pages/colorsLabData.ts</code>.
          </li>
          <li>
            Product/site chrome stays in{' '}
            <code className="text-[var(--screening-text-primary)]">src/styles/variables.css</code>, with border
            aliases pointed at{' '}
            <code className="text-[var(--screening-text-primary)]">--color-border-default</code>.
          </li>
        </ul>
      }
    />
  )
}
