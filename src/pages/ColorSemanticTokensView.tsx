import { cn } from '../lib/cn'
import type { SemanticTokenEntry, SemanticTokenGroup } from './colorsLabData'

function ModeCell({
  alias,
  hex,
  bordered,
  cssVar,
}: {
  alias: string
  hex: string
  bordered?: boolean
  cssVar: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span
        className={cn(
          'inline-block h-6 w-6 shrink-0 rounded-[var(--radius-sm)] border border-solid',
          bordered ? 'border-[rgba(0,0,0,0.15)]' : 'border-[var(--color-border-subtle)]',
        )}
        style={{ background: hex || `var(${cssVar})` }}
        aria-hidden
      />
      <div className="min-w-0">
        {alias ? (
          <code className="block truncate text-[11px] text-[var(--color-text-primary)]">{alias}</code>
        ) : (
          <span className="text-[11px] text-[var(--color-text-muted)] opacity-40">—</span>
        )}
        {hex ? (
          <span className="block font-mono text-[10px] text-[var(--color-text-muted)]">{hex}</span>
        ) : null}
      </div>
    </div>
  )
}

function SemanticGroupTable({ group }: { group: SemanticTokenGroup }) {
  return (
    <section className="space-y-3 border-b border-solid border-[var(--color-border-subtle)] py-8 last:border-b-0">
      <h3
        className={cn(
          'm-0',
          '[font:var(--ace-type-heading-h6-bold)] [letter-spacing:var(--ace-type-heading-h6-bold-tracking)]',
          'text-[var(--color-text-primary)]',
        )}
      >
        colors / {group.id}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-solid border-[var(--color-border-default)] text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">
              <th className="pb-2 pr-3 font-semibold">Name</th>
              <th className="pb-2 pr-3 font-semibold">Light</th>
              <th className="pb-2 font-semibold">Dark</th>
            </tr>
          </thead>
          <tbody>
            {group.tokens.map((token) => (
              <SemanticTokenRow key={token.tokenPath} token={token} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function SemanticTokenRow({ token }: { token: SemanticTokenEntry }) {
  const name = token.tokenPath.replace(/^colors\/[^/]+\//, '')
  return (
    <tr className="border-b border-solid border-[var(--color-border-subtle)] last:border-b-0">
      <td className="py-2.5 pr-3 align-middle">
        <div className="min-w-0">
          <span className="block text-[12px] text-[var(--color-text-primary)]">{name}</span>
          <code className="block break-all text-[10px] text-[var(--color-text-muted)]">{token.cssVar}</code>
        </div>
      </td>
      <td className="py-2.5 pr-3 align-middle">
        <ModeCell alias={token.alias} hex={token.hex} bordered={token.bordered} cssVar={token.cssVar} />
      </td>
      <td className="py-2.5 align-middle">
        <ModeCell
          alias={token.darkAlias ?? ''}
          hex={token.darkHex ?? ''}
          bordered={token.darkBordered}
          cssVar={token.cssVar}
        />
      </td>
    </tr>
  )
}

export function ColorSemanticTokensView({ groups }: { groups: SemanticTokenGroup[] }) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-solid border-[var(--color-border-default)]',
        'bg-[var(--color-surface-primary)] px-6 py-2 shadow-[var(--ace-drop-shadow-xs)] sm:px-8',
      )}
    >
      {groups.map((group) => (
        <SemanticGroupTable key={group.id} group={group} />
      ))}
    </div>
  )
}
