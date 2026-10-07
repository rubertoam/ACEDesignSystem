import type { CSSProperties } from 'react'
import type { PrimitiveTypeGroup, PrimitiveTypeToken } from './typographyLabData'

function sizePreview(token: PrimitiveTypeToken): CSSProperties | undefined {
  if (token.sizePx == null) return undefined
  return {
    fontFamily: 'var(--font-ace-noto)',
    fontSize: `var(${token.cssVar}, ${token.cssValue ?? `${token.sizePx / 16}rem`})`,
    fontWeight: 400,
    lineHeight: 1.65,
  }
}

function PrimitiveRow({ token, showPreview }: { token: PrimitiveTypeToken; showPreview: boolean }) {
  return (
    <div className="flex items-center gap-6 rounded-lg bg-[var(--color-bg-primary,#f9fafb)] px-4 py-3">
      <p className="m-0 w-[12.5rem] shrink-0 text-[10px] text-[var(--screening-text-secondary)]">
        {token.tokenPath}
      </p>
      <p className="m-0 w-[3.75rem] shrink-0 text-[10px] text-[var(--screening-text-secondary)]">
        {token.value}
      </p>
      <div className="min-w-0 flex-1">
        {showPreview && token.sizePx != null ? (
          <span className="text-[var(--screening-text-primary)]" style={sizePreview(token)}>
            Aa
          </span>
        ) : (
          <code className="break-all text-[9px] text-[var(--color-text-muted)]">{token.cssVar}</code>
        )}
      </div>
    </div>
  )
}

function PrimitiveGroupSection({ group }: { group: PrimitiveTypeGroup }) {
  const showPreview = group.id === 'font-size'

  return (
    <section className="border-b border-[var(--color-border)] py-8 last:border-b-0">
      <h3 className="m-0 text-base font-bold text-[var(--screening-text-primary)]">{group.title}</h3>
      <p className="m-0 mt-2 text-xs text-[var(--screening-text-secondary)]">{group.description}</p>
      <div className="mt-4 flex gap-6 px-4 pb-1 pt-2 text-[9px] font-normal uppercase tracking-[0.5px] text-[var(--screening-text-secondary)]">
        <span className="w-[12.5rem] shrink-0">Token</span>
        <span className="w-[3.75rem] shrink-0">Value</span>
        <span className="min-w-0 flex-1">Preview</span>
      </div>
      <div className="mt-1 space-y-2">
        {group.tokens.map((token) => (
          <PrimitiveRow key={token.tokenPath} token={token} showPreview={showPreview} />
        ))}
      </div>
    </section>
  )
}

export function TypographyPrimitiveTokensView({ groups }: { groups: PrimitiveTypeGroup[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2 shadow-[var(--shadow-sm)] sm:px-8">
      {groups.map((group) => (
        <PrimitiveGroupSection key={group.id} group={group} />
      ))}
    </div>
  )
}
