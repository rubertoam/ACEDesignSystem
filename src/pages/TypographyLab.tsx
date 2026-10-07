import { useState } from 'react'
import { LabSelect } from '../lib/labControls'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
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
        <ComponentLabCode>{`/* typography-tokens.css — Figma documentation layer */
--type-size-subheading: 1.25rem;
--typography-heading-heading: var(--type-size-subheading);

/* Semantic aliases resolve to primitives */
font-size: var(--typography-heading-heading);`}</ComponentLabCode>
      }
      usage={
        <div className="space-y-3 text-[var(--color-text-muted)]">
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Style Sheet</strong> mirrors Figma
            Typography (2651:5): Heading → Micro in Noto Sans (Regular, Semi Bold, Bold).
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Typography Tokens</strong> mirrors
            Figma Typography Tokens (5157:46): the product type scale with usage notes.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Primitive Tokens</strong> mirror Figma
            Primitive Typography Tokens as{' '}
            <code className="text-[var(--screening-text-primary)]">type/size/*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">type/line-height/*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">type/letter-spacing/*</code>.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--screening-text-primary)]">Semantic Tokens</strong> mirror Figma
            Semantic Typography Tokens: role aliases (
            <code className="text-[var(--screening-text-primary)]">typography/heading/*</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">typography/body/*</code>, …) that
            reference primitives.
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Documentation source:{' '}
            <code className="text-[var(--screening-text-primary)]">src/styles/typography-tokens.css</code> +{' '}
            <code className="text-[var(--screening-text-primary)]">src/pages/typographyLabData.ts</code>.
          </li>
          <li>
            Existing composed{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-type-*</code> shorthands remain for
            product components; new Figma paths use{' '}
            <code className="text-[var(--screening-text-primary)]">--type-*</code> /{' '}
            <code className="text-[var(--screening-text-primary)]">--typography-*</code>.
          </li>
        </ul>
      }
    />
  )
}
