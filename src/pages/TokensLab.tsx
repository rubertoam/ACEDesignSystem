import { useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { LabSegmentedToggle } from '../lib/labControls'
import { ComponentLabPage } from './ComponentLabPage'
import {
  TOKEN_CATALOG_COUNTS,
  TOKEN_COMPONENT_GROUPS,
  TOKEN_PRIMITIVE_GROUPS,
  TOKEN_SEMANTIC_GROUPS,
  type TokenCatalogEntry,
  type TokenCatalogGroup,
} from './tokensLabData'

type TokensView = 'primitive' | 'semantic' | 'component'

const VIEW_OPTIONS: { value: TokensView; label: string }[] = [
  { value: 'primitive', label: `Primitive (${TOKEN_CATALOG_COUNTS.primitive})` },
  { value: 'semantic', label: `Semantic (${TOKEN_CATALOG_COUNTS.semantic})` },
  { value: 'component', label: `Component (${TOKEN_CATALOG_COUNTS.component})` },
]

function isColorToken(token: TokenCatalogEntry) {
  return token.type === 'color' || token.cssVar.startsWith('--color-')
}

function TokenRow({ token, showDark }: { token: TokenCatalogEntry; showDark: boolean }) {
  const swatch = isColorToken(token)
  return (
    <tr className="border-b border-solid border-[var(--color-border-subtle)] last:border-b-0">
      <td className="py-2 pr-3 align-middle">
        <div className="flex items-center gap-2">
          {swatch ? (
            <span
              className="inline-block h-6 w-6 shrink-0 rounded-[var(--radius-sm)] border border-solid border-[var(--color-border-subtle)]"
              style={{ background: `var(${token.cssVar})` }}
              aria-hidden
            />
          ) : null}
          <code className="break-all text-[11px] text-[var(--color-text-primary)]">{token.path}</code>
        </div>
      </td>
      <td className="py-2 pr-3 align-middle">
        <code className="break-all text-[11px] text-[var(--color-text-secondary)]">{token.cssVar}</code>
      </td>
      <td className="py-2 pr-3 align-middle text-[11px] text-[var(--color-text-muted)]">
        {token.alias ? (
          <span>
            → <code className="text-[var(--color-text-primary)]">{token.alias}</code>
          </span>
        ) : (
          <span className="font-mono">{token.value}</span>
        )}
      </td>
      {showDark ? (
        <td className="py-2 align-middle text-[11px] text-[var(--color-text-muted)]">
          {token.darkAlias ? (
            <span>
              → <code className="text-[var(--color-text-primary)]">{token.darkAlias}</code>
            </span>
          ) : token.darkValue ? (
            <span className="font-mono">{token.darkValue}</span>
          ) : (
            <span className="opacity-40">—</span>
          )}
        </td>
      ) : null}
    </tr>
  )
}

function TokenGroupTable({ group, showDark }: { group: TokenCatalogGroup; showDark: boolean }) {
  return (
    <section className="space-y-3 border-b border-solid border-[var(--color-border-subtle)] py-8 last:border-b-0">
      <h3
        className={cn(
          'm-0',
          '[font:var(--ace-type-heading-h6-bold)] [letter-spacing:var(--ace-type-heading-h6-bold-tracking)]',
          'text-[var(--color-text-primary)]',
        )}
      >
        {group.label}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-solid border-[var(--color-border-default)] text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">
              <th className="pb-2 pr-3 font-semibold">Figma path</th>
              <th className="pb-2 pr-3 font-semibold">CSS variable</th>
              <th className="pb-2 pr-3 font-semibold">{showDark ? 'Light' : 'Value'}</th>
              {showDark ? <th className="pb-2 font-semibold">Dark</th> : null}
            </tr>
          </thead>
          <tbody>
            {group.tokens.map((token) => (
              <TokenRow key={token.path} token={token} showDark={showDark} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TokensCatalog({
  groups,
  showDark,
}: {
  groups: TokenCatalogGroup[]
  showDark: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-solid border-[var(--color-border-default)]',
        'bg-[var(--color-surface-primary)] px-6 py-2 shadow-[var(--ace-drop-shadow-xs)] sm:px-8',
      )}
    >
      {groups.map((group) => (
        <TokenGroupTable key={group.id} group={group} showDark={showDark} />
      ))}
    </div>
  )
}

export function TokensLab() {
  const [view, setView] = useState<TokensView>('primitive')

  const groups = useMemo(() => {
    if (view === 'primitive') return TOKEN_PRIMITIVE_GROUPS
    if (view === 'component') return TOKEN_COMPONENT_GROUPS
    return TOKEN_SEMANTIC_GROUPS
  }, [view])

  return (
    <ComponentLabPage
      title="Tokens"
      description="Full catalog of Figma-exported Primitive, Semantic, and Component tokens used by the ACE lab."
      examplesToolbar={
        <LabSegmentedToggle
          aria-label="Token layer"
          value={view}
          onChange={setView}
          options={VIEW_OPTIONS}
        />
      }
      examples={<TokensCatalog groups={groups} showDark={view !== 'primitive'} />}
      code={`/* Sources */
tokens/figma/Primitives/Default.tokens.json
tokens/figma/Semantic/Light.tokens.json
tokens/figma/Semantic/Dark.tokens.json

/* Generated CSS */
src/styles/color-tokens.css

/* Regenerate catalog */
node scripts/generate-tokens-lab-data.mjs`}
      usage={
        <div className="max-w-3xl space-y-4 text-[var(--color-text-muted)]">
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--color-text-primary)]">Primitive</strong> tokens are raw scales from
            Figma Primitives / Default (<code className="text-[var(--color-text-primary)]">color/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">typography/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">spacing/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">radius/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">border-width/*</code>).
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--color-text-primary)]">Semantic</strong> tokens are intent aliases from
            Semantic Light / Dark (<code className="text-[var(--color-text-primary)]">colors/bg/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">colors/action/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">colors/badges/*</code>, …). Dark values appear when
            viewing the Semantic or Component layer.
          </p>
          <p className="m-0 leading-relaxed">
            <strong className="text-[var(--color-text-primary)]">Component</strong> tokens are the
            component-scoped Semantic groups:{' '}
            <code className="text-[var(--color-text-primary)]">radius/component/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">spacing/component padding/*</code>,{' '}
            <code className="text-[var(--color-text-primary)]">typography/ui|heading|body/*</code>, and{' '}
            <code className="text-[var(--color-text-primary)]">icon/size/*</code>.
          </p>
          <p className="m-0 leading-relaxed">
            Prefer Semantic (or Component) names in product CSS. Reach for Primitives only when defining new
            Semantic aliases.
          </p>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Figma path → CSS:{' '}
            <code className="text-[var(--color-text-primary)]">colors/action/primary</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-primary</code>
          </li>
          <li>
            Generated data:{' '}
            <code className="text-[var(--color-text-primary)]">src/pages/tokensLabData.ts</code>
          </li>
          <li>
            Runtime theme:{' '}
            <code className="text-[var(--color-text-primary)]">[data-theme=&apos;dark&apos;]</code> on{' '}
            <code className="text-[var(--color-text-primary)]">&lt;html&gt;</code>
          </li>
        </ul>
      }
    />
  )
}
