import { cn } from '../lib/cn'
import type { ColorPaletteFamily, PaletteSwatch } from './colorsLabData'

function PrimitiveSwatchCard({ swatch }: { swatch: PaletteSwatch }) {
  return (
    <div className="min-w-0 flex-1 basis-[4.5rem]">
      <div
        className={cn(
          'h-14 w-full rounded-lg',
          swatch.bordered && 'border border-[rgba(0,0,0,0.1)]',
        )}
        style={{ background: `var(${swatch.cssVar}, ${swatch.hex})` }}
      />
      <div className="mt-1.5 space-y-0.5">
        <p className="m-0 text-[10px] leading-[14px] text-[rgba(0,0,0,0.8)]">{swatch.tokenPath}</p>
        <p className="m-0 text-[10px] leading-[14px] text-[rgba(0,0,0,0.4)]">{swatch.hex}</p>
      </div>
    </div>
  )
}

function PrimitiveFamilySection({ family }: { family: ColorPaletteFamily }) {
  return (
    <section className="border-b border-[var(--color-border)] py-6 last:border-b-0">
      <h3 className="m-0 mb-4 text-base font-bold text-[rgba(17,24,39,0.9)]">{family.title}</h3>
      <div className="flex gap-2 overflow-x-auto">
        {family.swatches.map((swatch) => (
          <PrimitiveSwatchCard key={`${family.id}-${swatch.shade}`} swatch={swatch} />
        ))}
      </div>
    </section>
  )
}

export function ColorPaletteView({ families }: { families: ColorPaletteFamily[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2 shadow-[var(--shadow-sm)] sm:px-8">
      {families.map((family) => (
        <PrimitiveFamilySection key={family.id} family={family} />
      ))}
    </div>
  )
}
