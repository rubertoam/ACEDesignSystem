import { useMemo, useState, type ReactNode } from 'react'
import { AceLandingPageCard, LANDING_PAGE_CARD_ICONS } from '../components/organisms/AceCards'
import { LabCheckbox, LabControlField, LabTextInput } from '../lib/labControls'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const DEFAULT_DESCRIPTION =
  '[Description option for this card which can provide some contextual information to users about what this is.]'

const labComponentContainerClass = cn(
  'flex w-full min-w-0 flex-col gap-[var(--ace-section-label-gap)] rounded-[var(--radius-lg)]',
  'border border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)]',
  'p-4 shadow-[var(--ace-drop-shadow-xs)] sm:p-5',
)

const labControlsPanelClass =
  'flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--screening-border-soft)] bg-[var(--screening-surface-elevated)] p-4'

function LabControlsPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={labControlsPanelClass}>
      <h4 className="m-0 text-sm font-bold leading-[1.65] text-[var(--color-text-primary)]">{title}</h4>
      {children}
    </div>
  )
}

function CardsChangelog() {
  return (
    <div className="space-y-8">
      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">25 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Header chrome: no divider under title; optional header badge via{' '}
            <code className="text-[var(--color-text-primary)]">showBadge</code>.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>Removed the 1px stroke under the landing page card header.</li>
          <li>
            Added <code className="text-[var(--color-text-primary)]">showBadge</code> (lab: Header badge) to hide the
            description-variant AceBadge without clearing <code className="text-[var(--color-text-primary)]">tag</code>
            .
          </li>
        </ul>
      </article>

      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">25 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Cards lab shows Landing Page cards only; Data Card demo hidden from the DS reference page.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Removed the expandable Data Card section from the Cards lab (examples, controls, usage, and code samples).{' '}
            <code className="text-[var(--color-text-primary)]">AceDataCard</code> remains in the package for product
            use.
          </li>
        </ul>
      </article>

      <article className="space-y-3">
        <header className="space-y-1">
          <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">25 August 2026</h3>
          <p className="m-0 text-sm text-[var(--color-text-muted)]">
            Sync with ACE Design System v.3 Figma Landing Page Cards (
            <code className="text-[var(--color-text-primary)]">4130:1977</code> / component set{' '}
            <code className="text-[var(--color-text-primary)]">4212:1424–1427</code>) and semantic color/typography
            tokens.
          </p>
        </header>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Rewired landing page card surface, border, text, icon, link, and divider aliases to semantic{' '}
            <code className="text-[var(--color-text-primary)]">--color-*</code> tokens (
            <code className="text-[var(--color-text-primary)]">surface/primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">border/default</code>,{' '}
            <code className="text-[var(--color-text-primary)]">text/primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">icon/primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">action/primary</code>).
          </li>
          <li>
            Footer no longer uses the soft purple strip — Status row is{' '}
            <code className="text-[var(--color-text-primary)]">colors/surface/primary</code> like the card body
            (Figma Status frame).
          </li>
          <li>
            Description tag switched from solid purple/white pill to{' '}
            <code className="text-[var(--color-text-primary)]">AceBadge</code> purple pill (
            <code className="text-[var(--color-text-primary)]">colors/badges/purple-fill</code> /{' '}
            <code className="text-[var(--color-text-primary)]">purple-border</code>).
          </li>
          <li>
            Default → Hover shadow now uses ACE Drop Shadow XS → XL (
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xs</code> /{' '}
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xl</code>) instead of a hardcoded
            12px blur.
          </li>
          <li>
            Compact header action hit targets; third stats icon uses the Figma people glyph asset.
          </li>
          <li>Added this Changelog tab; Usage tab lists Tokens in use with Figma paths + CSS vars.</li>
        </ul>
      </article>
    </div>
  )
}

export function CardsLab() {
  const [title, setTitle] = useState('[Enter Card Title]')
  const [bodyText, setBodyText] = useState(DEFAULT_DESCRIPTION)
  const [statLabel, setStatLabel] = useState('Data Point')
  const [showBadge, setShowBadge] = useState(true)
  const [showHeaderActions, setShowHeaderActions] = useState(true)
  const [showFooterStats, setShowFooterStats] = useState(true)
  const [showFooterLink, setShowFooterLink] = useState(true)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const statItems = useMemo(
    () => [
      {
        id: 'users',
        label: statLabel,
        iconSrc: LANDING_PAGE_CARD_ICONS.statUsers,
        iconClassName: 'h-[1.125rem] w-5',
      },
      {
        id: 'folder',
        label: statLabel,
        iconSrc: LANDING_PAGE_CARD_ICONS.statFolder,
        iconClassName: 'h-4 w-5',
      },
      {
        id: 'people',
        label: statLabel,
        iconSrc: LANDING_PAGE_CARD_ICONS.statWorkflow,
        iconClassName: 'h-3 w-6',
      },
    ],
    [statLabel],
  )

  const cardProps = {
    title,
    tag: 'Purple',
    showBadge,
    showHeaderActions,
    showFooterStats,
    showFooterLink,
    onHeaderActionClick: (id: string) => setLastAction(id),
    onFooterLinkClick: () => setLastAction('footer-link'),
  }

  const landingControls = (
    <LabControlsPanel title="Landing Page Card">
      <p className="m-0 max-w-xl text-xs leading-relaxed text-[var(--color-text-muted)]">
        Configure both Landing Page card variants (Figma 4130:1977). Stats icons from node 4212:1138.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <LabTextInput label="Card title" value={title} onChange={setTitle} className="max-w-md" />
        <LabTextInput label="Description body" value={bodyText} onChange={setBodyText} className="max-w-md" />
        <LabTextInput label="Stat label" value={statLabel} onChange={setStatLabel} className="max-w-md" />
      </div>
      <LabControlField label="Visibility">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <LabCheckbox label="Header badge" checked={showBadge} onCheckedChange={setShowBadge} />
          <LabCheckbox
            label="Header icons"
            checked={showHeaderActions}
            onCheckedChange={setShowHeaderActions}
          />
          <LabCheckbox label="Footer data" checked={showFooterStats} onCheckedChange={setShowFooterStats} />
          <LabCheckbox label="Footer link" checked={showFooterLink} onCheckedChange={setShowFooterLink} />
        </div>
      </LabControlField>
      {lastAction ? (
        <p className="m-0 text-xs text-[var(--color-text-muted)]">
          Last action: <strong className="text-[var(--color-text-primary)]">{lastAction}</strong>
        </p>
      ) : null}
    </LabControlsPanel>
  )

  return (
    <ComponentLabPage
      title="Cards"
      description="Landing page navigation cards (stats and description) — semantic tokens, AceBadge, and ACE drop shadows. Figma 4130:1977."
      examplesCanvas={false}
      examples={
        <div className={labComponentContainerClass}>
          {landingControls}
          <div className="flex flex-wrap gap-8">
            <AceLandingPageCard variant="stats" statItems={statItems} {...cardProps} />
            <AceLandingPageCard variant="description" description={bodyText} {...cardProps} />
          </div>
        </div>
      }
      code={
        <ComponentLabCode>{`import { AceLandingPageCard } from '../components/organisms/AceCards'

<AceLandingPageCard variant="stats" title="Screening" statItems={...} />
<AceLandingPageCard variant="description" title="Screening" tag="Purple" showBadge description="..." />`}</ComponentLabCode>
      }
      usage={
        <div className="space-y-6 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <p className="m-0">
            Landing page cards navigate users to tools (screening, simulators, etc.). Variants:{' '}
            <code className="text-[var(--color-text-primary)]">stats</code> (icon row) and{' '}
            <code className="text-[var(--color-text-primary)]">description</code> (body copy + optional purple
            AceBadge). Hover elevates shadow XS → XL.
          </p>
          <div className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--color-text-primary)]">Tokens in use</h4>
            <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Surface &amp; border</strong> —{' '}
                <code className="text-[var(--color-text-primary)]">colors/surface/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>;{' '}
                <code className="text-[var(--color-text-primary)]">colors/border/default</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-border-default</code> (thin 0.5px); radius{' '}
                <code className="text-[var(--color-text-primary)]">radius/sm</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--radius-sm</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Type &amp; icons</strong> — title P1
                Bold / body &amp; footer Caption Regular (
                <code className="text-[var(--color-text-primary)]">--ace-type-paragraph-p1-bold</code>,{' '}
                <code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>); text{' '}
                <code className="text-[var(--color-text-primary)]">colors/text/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-text-primary</code>; icons{' '}
                <code className="text-[var(--color-text-primary)]">colors/icon/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-icon-primary</code>.
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Link &amp; badge</strong> — link{' '}
                <code className="text-[var(--color-text-primary)]">colors/action/primary</code> →{' '}
                <code className="text-[var(--color-text-primary)]">--color-action-primary</code>; badge{' '}
                <code className="text-[var(--color-text-primary)]">colors/badges/purple-fill</code> /{' '}
                <code className="text-[var(--color-text-primary)]">purple-border</code> via{' '}
                <code className="text-[var(--color-text-primary)]">AceBadge</code> purple (
                <code className="text-[var(--color-text-primary)]">--ace-status-pill-purple-*</code>).
              </li>
              <li>
                <strong className="font-medium text-[var(--color-text-primary)]">Shadows</strong> — Default Shadow (XS)
                → <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xs</code>; Hover Shadow (XL) →{' '}
                <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xl</code>.
              </li>
            </ul>
          </div>
        </div>
      }
      variables={
        <ul className="m-0 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-text-muted)]">
          <li>
            Landing aliases: <code className="text-[var(--color-text-primary)]">--ace-landing-page-card-*</code> →{' '}
            <code className="text-[var(--color-text-primary)]">--color-surface-primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-border-default</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-text-primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-icon-primary</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--color-action-primary</code>; shadows{' '}
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xs</code> /{' '}
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xl</code>.
          </li>
          <li>
            Badge: <code className="text-[var(--color-text-primary)]">--ace-status-pill-purple-*</code> (Figma{' '}
            <code className="text-[var(--color-text-primary)]">colors/badges/purple-*</code>).
          </li>
        </ul>
      }
      changelog={<CardsChangelog />}
    />
  )
}
