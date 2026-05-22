import { cn } from '../lib/cn'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import type { ColorComponentGroup, ColorToken } from './colorsLabData'

function TokenSwatch({ token }: { token: ColorToken }) {
  return (
    <div
      className="h-14 w-full rounded-[var(--radius-md)] border border-[var(--color-border)]"
      style={{ background: `var(${token.cssVar})` }}
    />
  )
}

export function ColorComponentTokensView({ group }: { group: ColorComponentGroup }) {
  return (
    <section className={labExampleSectionClass}>
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
            <TokenSwatch token={t} />
            <div className="space-y-1 p-3">
              <p className="m-0 text-xs font-medium text-[var(--color-text-primary)]">{t.name}</p>
              <code className="block break-all text-[11px] text-[var(--color-text-muted)]">{t.cssVar}</code>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
