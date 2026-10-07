import { cn } from '../lib/cn'
import type { StyleSheetFamily, StyleSheetSwatch } from './colorsLabData'

function StyleSheetSwatchCard({ swatch }: { swatch: StyleSheetSwatch }) {
  return (
    <div className="w-[8.125rem] shrink-0">
      <div
        className={cn(
          'h-[3.125rem] w-full rounded-[5px]',
          swatch.bordered && 'border border-[var(--ace-button-neutral-500)]',
        )}
        style={{ background: swatch.hex }}
      />
      <div className="mt-2 space-y-0.5 text-xs leading-[1.4] text-[var(--screening-text-secondary)]">
        <div className="flex items-start justify-between gap-2">
          <span className="shrink-0 font-[family-name:var(--font-screening)]">{swatch.shade}</span>
          <span className="text-right font-[family-name:var(--font-screening)] uppercase">{swatch.hex}</span>
        </div>
        <p className="m-0 uppercase text-[var(--screening-text-muted)]">{swatch.hsl}</p>
      </div>
    </div>
  )
}

function StyleSheetFamilySection({ family }: { family: StyleSheetFamily }) {
  return (
    <section className="border-b border-[var(--color-border)] py-8 last:border-b-0">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="w-full shrink-0 lg:max-w-[15.625rem]">
          <h3 className="m-0 text-2xl font-bold tracking-[-0.045em] text-[var(--screening-text-primary)]">
            {family.title}
            {family.subtitle ? (
              <>
                <br />
                <span className="text-sm font-normal text-[var(--screening-text-primary)]">{family.subtitle}</span>
              </>
            ) : null}
          </h3>
          <p className="m-0 mt-3 text-xs leading-[1.4] text-[var(--screening-text-muted)]">{family.description}</p>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-x-4 gap-y-6">
            {family.swatches.map((swatch) => (
              <StyleSheetSwatchCard key={`${family.id}-${swatch.shade}`} swatch={swatch} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ColorStyleSheetView({ families }: { families: StyleSheetFamily[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2 shadow-[var(--shadow-sm)] sm:px-8">
      {families.map((family) => (
        <StyleSheetFamilySection key={family.id} family={family} />
      ))}
    </div>
  )
}
