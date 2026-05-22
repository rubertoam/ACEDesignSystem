import { Link } from 'react-router-dom'

import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'



export function AtomsLab() {

  return (

    <ComponentLabPage

      title="Overview"

      description="Buttons, icons, inputs, and other indivisible UI primitives. Add nested routes in App.tsx when you need one lab page per atom."

      examples={

        <div className="space-y-3 text-sm text-[var(--color-text-muted)]">

          <p className="m-0">Mount atom previews here (states, sizes, disabled, and so on).</p>

          <ul className="m-0 list-disc space-y-1 pl-5">

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/colors">

                Colors

              </Link>{' '}

              — tokens from variables.css with swatches.

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/typography">

                Typography

              </Link>{' '}

              — ACE type tokens and samples from the Figma export JSON.

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/animations">

                Animations

              </Link>{' '}

              — motion catalog, easing/duration tokens, and live demos for developers.

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/drop-shadows">

                Drop shadows

              </Link>{' '}

              — elevation tokens (Figma Drop Shadows 71-71).

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/buttons">

                Buttons

              </Link>{' '}

              — ACE button variants, sizes, and states (Figma Buttons frame).

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/inputs">

                Inputs

              </Link>{' '}

              — text fields, sizes, states, optional search icon (Figma Input frame).

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/checkboxes">

                Checkboxes

              </Link>{' '}

              — with/without label, sizes, states (Figma Checkboxes 317-1492).

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/toggles">

                Toggles

              </Link>{' '}

              — switch states, descriptive pattern (Figma Toggles 117-1265).

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/radios">

                Radio buttons

              </Link>{' '}

              — sizes, states, field wrapper (Figma Radio Buttons 331-1755).

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/tabs">

                Tabs

              </Link>{' '}

              — horizontal tab list for related views (Figma Tabs).

            </li>

            <li>

              <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/finscan-icon">

                FinScan icon

              </Link>{' '}

              — hash mark + wordmark lockup (Figma Icon / FinScan 2782:29).

            </li>

          </ul>

        </div>

      }

      code={

        <ComponentLabCode>{`import { YourAtom } from '../components/atoms/YourAtom'



<YourAtom />`}</ComponentLabCode>

      }

      usage={

        <p className="m-0 text-[var(--color-text-muted)]">

          After pulling the node with <code className="text-[var(--color-text-primary)]">get_design_context</code>, document import path and props.

        </p>

      }

      variables={

        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">

          <li>

            <code className="text-[var(--color-text-primary)]">--radius-lg</code>, <code className="text-[var(--color-text-primary)]">--color-border</code>,{' '}

            <code className="text-[var(--color-text-primary)]">--shadow-sm</code> — lab shell only; list the tokens your component actually uses.

          </li>

        </ul>

      }

    />

  )

}

