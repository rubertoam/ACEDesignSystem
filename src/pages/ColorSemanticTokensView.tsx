import { cn } from '../lib/cn'
import type { SemanticTokenEntry, SemanticTokenGroup } from './colorsLabData'

function SemanticTokenCard({ token }: { token: SemanticTokenEntry }) {
  return (
    <div className="w-[9.375rem] shrink-0 pb-2">
      <div
        className={cn(
          'h-12 w-full rounded-lg',
          token.bordered && 'border border-[rgba(0,0,0,0.1)]',
        )}
        style={{ background: `var(${token.cssVar}, ${token.hex})` }}
      />
      <p className="m-0 mt-1 text-[10px] leading-[14px] text-[rgba(0,0,0,0.8)]">{token.tokenPath}</p>
      <p className="m-0 text-[9px] leading-[13px] text-[rgba(0,0,0,0.35)]">{`-> ${token.alias}`}</p>
      <p className="m-0 text-[9px] leading-[13px] text-[rgba(0,0,0,0.3)]">{token.hex}</p>
      <code className="mt-0.5 block break-all text-[9px] leading-snug text-[var(--color-text-muted)]">
        {token.cssVar}
      </code>
    </div>
  )
}

function SemanticGroupSection({ group }: { group: SemanticTokenGroup }) {
  return (
    <section className="border-b border-[var(--color-border)] py-8 last:border-b-0">
      <h3 className="m-0 mb-3 text-base font-bold text-[rgba(17,24,39,0.9)]">{group.title}</h3>
      <div className="flex flex-wrap gap-x-4 gap-y-6">
        {group.tokens.map((token) => (
          <SemanticTokenCard key={token.tokenPath} token={token} />
        ))}
      </div>
    </section>
  )
}

export function ColorSemanticTokensView({ groups }: { groups: SemanticTokenGroup[] }) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]',
        'px-6 py-2 shadow-[var(--shadow-sm)] sm:px-8',
      )}
    >
      {groups.map((group) => (
        <SemanticGroupSection key={group.id} group={group} />
      ))}
    </div>
  )
}
