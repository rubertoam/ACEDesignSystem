import { Link } from 'react-router-dom'
import { AvailabilityTag } from '../components/atoms/AvailabilityTag/AvailabilityTag'
import { cn } from './cn'
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
    <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.to} className="m-0 min-w-0 p-0">
          <Link to={item.to} className="lab-overview-card">
            <div className="flex items-start justify-between gap-3">
              <span
                className={cn(
                  'lab-overview-card__title min-w-0',
                  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]',
                )}
              >
                {item.label}
              </span>
              {item.availability ? (
                <AvailabilityTag status={item.availability} className="shrink-0" />
              ) : null}
            </div>
            {item.overviewHint ? (
              <p
                className={cn(
                  'm-0 flex-1',
                  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
                  'text-[var(--screening-text-muted)]',
                )}
              >
                {item.overviewHint}
              </p>
            ) : (
              <p
                className={cn(
                  'm-0 flex-1',
                  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
                  'text-[var(--screening-text-muted)]',
                )}
              >
                Open lab
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
