import type { CSSProperties } from 'react'
import type { StyleSheetFamily, StyleSheetSpecimen } from './typographyLabData'

function specimenStyle(family: StyleSheetFamily, specimen: StyleSheetSpecimen): CSSProperties {
  return {
    fontFamily: 'var(--font-ace-noto)',
    fontSize: family.sizeRem,
    fontWeight: specimen.weightValue,
    lineHeight: 1.65,
    letterSpacing: specimen.trackingCss,
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
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2 shadow-[var(--shadow-sm)] sm:px-8">
      <p className="m-0 border-b border-[var(--color-border)] py-6 text-sm text-[var(--screening-text-muted)]">
        Manage all your typefaces in here. All typefaces are in Noto Sans.
      </p>
      {families.map((family) => (
        <StyleSheetFamilySection key={family.id} family={family} />
      ))}
    </div>
  )
}
