import { useState } from 'react'
import { LabSelect } from '../lib/labControls'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

import { typographyLabQa } from './labTabDocs'
import { TypographyPrimitiveTokensView } from './TypographyPrimitiveTokensView'
import { TypographySemanticTokensView } from './TypographySemanticTokensView'
import { TypographyStyleSheetView } from './TypographyStyleSheetView'
import { TypographyTokensView } from './TypographyTokensView'
import {
  TYPE_PRIMITIVE_GROUPS,
  TYPE_SEMANTIC_GROUPS,
  TYPE_STYLE_SHEET_FAMILIES,
  TYPE_TOKEN_GROUPS,
} from './typographyLabData'

type TypographyLabView = 'stylesheet' | 'tokens' | 'primitives' | 'semantics'

export function TypographyLab() {
  const [view, setView] = useState<TypographyLabView>('stylesheet')

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:max-w-2xl">
      <LabSelect
        label="View"
        value={view}
        onChange={(v) => setView(v as TypographyLabView)}
        options={[
          { value: 'stylesheet', label: 'Style Sheet' },
          { value: 'tokens', label: 'Typography Tokens' },
          { value: 'primitives', label: 'Primitive Tokens' },
          { value: 'semantics', label: 'Semantic Tokens' },
        ]}
      />
    </div>
  )

  return (
    <ComponentLabPage
      qa={typographyLabQa}
      title="Typography"
      description="Documents the typography style sheet along with typography, primitive, and semantic tokens from Figma."
      examplesToolbar={toolbar}
      examples={
        view === 'stylesheet' ? (
          <TypographyStyleSheetView families={TYPE_STYLE_SHEET_FAMILIES} />
        ) : view === 'tokens' ? (
          <TypographyTokensView groups={TYPE_TOKEN_GROUPS} />
        ) : view === 'primitives' ? (
          <TypographyPrimitiveTokensView groups={TYPE_PRIMITIVE_GROUPS} />
        ) : (
          <TypographySemanticTokensView groups={TYPE_SEMANTIC_GROUPS} />
        )
      }
      code={
        <ComponentLabCode>{`/* color-tokens.css — Semantic ← Primitive (Desktop JSON) */
--typography-size-subheading: 1.25rem; /* typography/size/subheading */
--typography-heading-heading: var(--typography-size-subheading);

/* typography-tokens.css — composed style sheet */
--type-heading-bold: 700 var(--typography-heading-heading)/var(--typography-leading-relaxed) var(--font-noto);
--type-heading-bold-tracking: var(--typography-letter-spacing-tight);`}</ComponentLabCode>
      }
      usage={
        <div className="space-y-3 text-[var(--color-text-muted)]">
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Style Sheet</strong> mirrors Figma
            Typography (2651:5): Heading → Micro in Noto Sans (Regular, Semi Bold, Bold), sized from
            semantic tokens (
            <code className="text-[var(--screening-text-primary)]">typography/heading/*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">typography/body/*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">typography/ui/*</code>).
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Typography Tokens</strong> mirrors
            Figma Typography Tokens (5157:46): the product type scale with usage notes.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Primitive Tokens</strong> mirror Figma
            Primitives JSON as{' '}
            <code className="text-[var(--screening-text-primary)]">typography/size/*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">typography/line-height/*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">typography/letter-spacing/*</code>.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Semantic Tokens</strong> mirror Figma
            Semantic JSON role aliases that reference those primitives (including{' '}
            <code className="text-[var(--screening-text-primary)]">typography/leading/*</code>).
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Source of truth:{' '}
            <code className="text-[var(--screening-text-primary)]">tokens/figma/Primitives/Default.tokens.json</code>{' '}
            +{' '}
            <code className="text-[var(--screening-text-primary)]">tokens/figma/Semantic/Light.tokens.json</code>{' '}
            →{' '}
            <code className="text-[var(--screening-text-primary)]">src/styles/color-tokens.css</code>.
          </li>
          <li>
            Composed style-sheet shorthands{' '}
            <code className="text-[var(--screening-text-primary)]">--type-{'{heading|subheading|body|caption|footnote|micro}'}-*</code>{' '}
            in{' '}
            <code className="text-[var(--screening-text-primary)]">typography-tokens.css</code> reference
            those semantic size / leading / letter-spacing vars.
          </li>
        </ul>
      }
    />
  )
}
