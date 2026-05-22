import { Link } from 'react-router-dom'

import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'



export function OrganismsLab() {

  return (

    <ComponentLabPage

      title="Overview"

      description="Nav bars, sidebars, headers, and other full patterns built from molecules and atoms."

      examples={

        <div className="space-y-3 text-sm text-[var(--color-text-muted)]">

          <p className="m-0">

            Show full organism layout; pair with <code className="text-[var(--color-text-primary)]">get_screenshot</code> parity checks.

          </p>

          <ul className="m-0 list-disc space-y-1 pl-5">

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/organisms/dialog-modal">

                Dialog modal

              </Link>{' '}

              — ACE dialog overlay (molecule) used inside organisms.

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/organisms/data-table">

                Data Table

              </Link>

            </li>

            <li>

              <Link

                className="text-[var(--color-accent)] underline underline-offset-2"

                to="/lab/organisms/date-time-pickers"

              >

                Date and time pickers

              </Link>

              {' '}

              — time picker prototype (scheduling controls).

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/organisms/sidebar">

                Sidebar

              </Link>

              {' '}

              — navigation and grouped query layouts.

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/organisms/site-header">

                Site header

              </Link>

              {' '}

              — top navigation, FinScan brand, and user toolbar.

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/organisms/cards">

                Cards

              </Link>

              {' '}

              — landing page navigation cards (stats and description variants).

            </li>

          </ul>

        </div>

      }

      code={

        <ComponentLabCode>{`import { YourOrganism } from '../components/organisms/YourOrganism'



<YourOrganism />`}</ComponentLabCode>

      }

      usage={

        <p className="m-0 text-[var(--color-text-muted)]">

          Document data requirements, events, and accessibility expectations for the full pattern.

        </p>

      }

      variables={

        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">

          <li>

            Organisms usually pull many tokens; keep this list exhaustive so designers can trace Figma →{' '}

            <code className="text-[var(--color-text-primary)]">variables.css</code>.

          </li>

        </ul>

      }

    />

  )

}

