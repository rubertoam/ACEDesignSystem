import type { CSSProperties } from 'react'
import type { TypographyTokenGroup, TypographyTokenStyle } from './typographyLabData'

function stylePreview(style: TypographyTokenStyle, weightValue: number): CSSProperties {
  return {
    fontFamily: 'var(--font-ace-noto)',
    fontSize: style.sizeRem,
    fontWeight: weightValue,
    lineHeight: 1.65,
    letterSpacing: style.trackingCss,
  }
}

function TokenStyleCard({ style }: { style: TypographyTokenStyle }) {
  return (
    <div className="rounded-lg bg-[var(--color-bg-primary,#f9fafb)] px-4 py-3">
      <p className="m-0 text-[10px] leading-normal text-[var(--screening-text-secondary)]">
        {style.metaLabel}
      </p>
      <div className="mt-1 flex flex-wrap gap-8 text-[var(--screening-text-primary)]">
        {style.weights.map((w) => (
          <span key={w.weight} style={stylePreview(style, w.weightValue)}>
            {w.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function TokenGroupSection({ group }: { group: TypographyTokenGroup }) {
  const description = group.description ?? group.styles[0]?.description

  return (
    <section className="border-b border-[var(--color-border)] py-8 last:border-b-0">
      <h3 className="m-0 text-base font-bold text-[var(--screening-text-primary)]">{group.title}</h3>
      {description ? (
        <p className="m-0 mt-2 text-xs text-[var(--screening-text-secondary)]">{description}</p>
      ) : null}
      <div className="mt-4 space-y-3">
        {group.styles.map((style) => (
          <TokenStyleCard key={style.id} style={style} />
        ))}
      </div>
    </section>
  )
}

export function TypographyTokensView({ groups }: { groups: TypographyTokenGroup[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2 shadow-[var(--shadow-sm)] sm:px-8">
      {groups.map((group) => (
        <TokenGroupSection key={group.id} group={group} />
      ))}
    </div>
  )
}
