import { Link } from 'react-router-dom'
import { AceAvailabilityTag } from '../components/atoms/AceAvailabilityTag/AceAvailabilityTag'
import { labNavSections, type LabNavSectionTitle } from '../pages/labNav'

const OVERVIEW_PATHS: Record<LabNavSectionTitle, string> = {
  Atoms: '/lab/atoms',
  Molecules: '/lab/molecules',
  Organisms: '/lab/organisms',
}

export function LabOverviewList({ section }: { section: LabNavSectionTitle }) {
  const items =
    labNavSections
      .find((s) => s.title === section)
      ?.items.filter((item) => item.to !== OVERVIEW_PATHS[section]) ?? []

  return (
    <ul className="m-0 list-none space-y-3 p-0">
      {items.map((item) => (
        <li
          key={item.to}
          className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0"
        >
          <div className="min-w-0 flex-1">
            <Link
              className="text-[var(--color-accent)] underline underline-offset-2"
              to={item.to}
            >
              {item.label}
            </Link>
            {item.overviewHint ? (
              <p className="m-0 mt-1 text-[var(--color-text-muted)]">{item.overviewHint}</p>
            ) : null}
          </div>
          {item.availability ? (
            <AceAvailabilityTag status={item.availability} size="sm" className="shrink-0" />
          ) : null}
        </li>
      ))}
    </ul>
  )
}
