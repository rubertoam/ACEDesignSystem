import { cn } from '../lib/cn'
import type { ColorPaletteFamily, PaletteSwatch } from './colorsLabData'

function PaletteSwatchCard({ swatch }: { swatch: PaletteSwatch }) {
  const previewStyle = swatch.cssVar
    ? { background: `var(${swatch.cssVar})` }
    : { background: swatch.hex }

  return (
    <div className="w-[8.125rem] shrink-0">
      <div
        className={cn(
          'h-[3.125rem] w-full rounded-[5px]',
          swatch.bordered && 'border border-[var(--ace-button-neutral-500)]',
        )}
        style={previewStyle}
      />
      <div className="mt-2 space-y-1">
        <div className="flex items-start justify-between gap-2 text-xs leading-[1.4] text-[var(--screening-text-secondary)]">
          <span className="shrink-0 font-[family-name:var(--font-screening)]">{swatch.shade}</span>
          <span className="text-right font-[family-name:var(--font-screening)] uppercase">{swatch.hex}</span>
        </div>
        <p className="m-0 text-xs uppercase leading-[1.4] text-[var(--screening-text-secondary)]">{swatch.hsl}</p>
        {swatch.cssVar ? (
          <code className="block break-all text-[10px] leading-snug text-[var(--color-text-muted)]">{swatch.cssVar}</code>
        ) : null}
      </div>
    </div>
  )
}

function PaletteFamilySection({ family }: { family: ColorPaletteFamily }) {
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
              <PaletteSwatchCard key={`${family.id}-${swatch.shade}`} swatch={swatch} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ColorPaletteView({ families }: { families: ColorPaletteFamily[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2 shadow-[var(--shadow-sm)] sm:px-8">
      {families.map((family) => (
        <PaletteFamilySection key={family.id} family={family} />
      ))}
    </div>
  )
}
