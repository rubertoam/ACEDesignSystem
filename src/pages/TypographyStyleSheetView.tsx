import type { CSSProperties } from 'react'
import type { StyleSheetFamily, StyleSheetSpecimen } from './typographyLabData'

function weightSlug(weight: StyleSheetSpecimen['weight']): string {
  if (weight === 'semiBold') return 'semi-bold'
  return weight
}

function specimenStyle(family: StyleSheetFamily, specimen: StyleSheetSpecimen): CSSProperties {
  const composed = `--type-${family.id}-${weightSlug(specimen.weight)}`
  return {
    font: `var(${composed})`,
    letterSpacing: `var(${composed}-tracking)`,
  }
}

function StyleSheetSpecimenColumn({
  family,
  specimen,
}: {
  family: StyleSheetFamily
  specimen: StyleSheetSpecimen
}) {
  return (
    <div className="min-w-0 flex-1" style={specimenStyle(family, specimen)}>
      <p className="m-0">{family.title}</p>
      <p className="m-0">
        {specimen.label} ({family.sizePx}px/{family.sizeRem})
      </p>
      <p className="m-0 mt-1 text-[9px] text-[var(--screening-text-secondary)]">{family.semanticPath}</p>
    </div>
  )
}

function StyleSheetFamilySection({ family }: { family: StyleSheetFamily }) {
  return (
    <section className="border-b border-[var(--color-border)] py-8 last:border-b-0">
      <p className="m-0 mb-4 text-base font-bold text-[var(--screening-text-muted)]">{family.title}</p>
      <div className="flex flex-col gap-6 text-[var(--screening-text-primary)] sm:flex-row sm:gap-8">
        {family.specimens.map((specimen) => (
          <StyleSheetSpecimenColumn
            key={`${family.id}-${specimen.weight}`}
            family={family}
            specimen={specimen}
          />
        ))}
      </div>
    </section>
  )
}

export function TypographyStyleSheetView({ families }: { families: StyleSheetFamily[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2 shadow-[var(--lab-shadow-sm)] sm:px-8">
      <p className="m-0 border-b border-[var(--color-border)] py-6 text-sm text-[var(--screening-text-muted)]">
        Manage all your typefaces in here. All typefaces are in Noto Sans. Specimens use composed{' '}
        <code className="text-[var(--screening-text-primary)]">--type-*</code> styles backed by semantic
        Desktop JSON tokens.
      </p>
      {families.map((family) => (
        <StyleSheetFamilySection key={family.id} family={family} />
      ))}
    </div>
  )
}
