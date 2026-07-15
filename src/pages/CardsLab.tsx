import { useMemo, useState, type ReactNode } from 'react'
import { AceDataCard, AceLandingPageCard, LANDING_PAGE_CARD_ICONS } from '../components/organisms/AceCards'
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
      <h4 className="m-0 text-sm font-bold leading-[1.65] text-[var(--ace-neutral-800)]">{title}</h4>
      {children}
    </div>
  )
}

export function CardsLab() {
  const [title, setTitle] = useState('[Enter Card Title]')
  const [bodyText, setBodyText] = useState(DEFAULT_DESCRIPTION)
  const [statLabel, setStatLabel] = useState('Data Point')
  const [showTag, setShowTag] = useState(true)
  const [showHeaderActions, setShowHeaderActions] = useState(true)
  const [showFooterStats, setShowFooterStats] = useState(true)
  const [showFooterLink, setShowFooterLink] = useState(true)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const [dataHeading, setDataHeading] = useState('[Heading]')
  const [dataEnterLabel, setDataEnterLabel] = useState('[Enter Data]')
  const [dataPointLabel, setDataPointLabel] = useState('Data Point')
  const [dataCardChecked, setDataCardChecked] = useState(false)
  const [dataShowCheckbox, setDataShowCheckbox] = useState(true)
  const [dataShowStatus, setDataShowStatus] = useState(true)
  const [dataShowHeadingInfo, setDataShowHeadingInfo] = useState(true)
  const [dataShowEnterData, setDataShowEnterData] = useState(true)
  const [dataShowHeaderActions, setDataShowHeaderActions] = useState(true)
  const [dataShowDataTable, setDataShowDataTable] = useState(true)
  const [dataShowInfoBlock, setDataShowInfoBlock] = useState(true)
  const [dataShowInlineLink, setDataShowInlineLink] = useState(true)

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
        id: 'workflow',
        label: statLabel,
        iconSrc: LANDING_PAGE_CARD_ICONS.statWorkflow,
        iconClassName: 'h-3 w-6',
      },
    ],
    [statLabel],
  )

  const dataColumn = useMemo(
    () => [
      { label: dataPointLabel, value: 'Data' },
      { label: dataPointLabel, value: 'Data' },
      { label: dataPointLabel, value: 'Data' },
    ],
    [dataPointLabel],
  )

  const cardProps = {
    title,
    tag: showTag ? 'Tag' : undefined,
    showHeaderActions,
    showFooterStats,
    showFooterLink,
    onHeaderActionClick: (id: string) => setLastAction(id),
    onFooterLinkClick: () => setLastAction('footer-link'),
  }

  const landingControls = (
    <LabControlsPanel title="Landing Page Card">
      <p className="m-0 max-w-xl text-xs leading-relaxed text-[var(--screening-text-muted)]">
        Configure both Landing Page card variants. Stat body icons from node 4212:1138.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <LabTextInput label="Card title" value={title} onChange={setTitle} className="max-w-md" />
        <LabTextInput label="Description body" value={bodyText} onChange={setBodyText} className="max-w-md" />
        <LabTextInput label="Stat label" value={statLabel} onChange={setStatLabel} className="max-w-md" />
      </div>
      <LabControlField label="Visibility">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <LabCheckbox label="Show tag" checked={showTag} onCheckedChange={setShowTag} />
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
        <p className="m-0 text-xs text-[var(--screening-text-muted)]">
          Last action: <strong className="text-[var(--screening-text-primary)]">{lastAction}</strong>
        </p>
      ) : null}
    </LabControlsPanel>
  )

  const dataCardControls = (
    <LabControlsPanel title="Data Card">
      <p className="m-0 max-w-xl text-xs leading-relaxed text-[var(--screening-text-muted)]">
        Medium expandable data card from node 2046:5157. Expand/collapse uses the same easing as the accordion.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <LabTextInput label="Heading" value={dataHeading} onChange={setDataHeading} className="max-w-md" />
        <LabTextInput
          label="Enter data label"
          value={dataEnterLabel}
          onChange={setDataEnterLabel}
          className="max-w-md"
        />
        <LabTextInput
          label="Data point label"
          value={dataPointLabel}
          onChange={setDataPointLabel}
          className="max-w-md"
        />
      </div>
      <LabControlField label="Visibility">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <LabCheckbox label="Checkbox" checked={dataShowCheckbox} onCheckedChange={setDataShowCheckbox} />
          <LabCheckbox label="Status dots" checked={dataShowStatus} onCheckedChange={setDataShowStatus} />
          <LabCheckbox
            label="Heading info"
            checked={dataShowHeadingInfo}
            onCheckedChange={setDataShowHeadingInfo}
          />
          <LabCheckbox label="Enter data" checked={dataShowEnterData} onCheckedChange={setDataShowEnterData} />
          <LabCheckbox
            label="Header actions"
            checked={dataShowHeaderActions}
            onCheckedChange={setDataShowHeaderActions}
          />
          <LabCheckbox label="Data table" checked={dataShowDataTable} onCheckedChange={setDataShowDataTable} />
          <LabCheckbox label="Info block" checked={dataShowInfoBlock} onCheckedChange={setDataShowInfoBlock} />
          <LabCheckbox label="Inline link" checked={dataShowInlineLink} onCheckedChange={setDataShowInlineLink} />
        </div>
      </LabControlField>
    </LabControlsPanel>
  )

  return (
    <ComponentLabPage
      title="Cards"
      description="Landing page and medium data cards - expandable sections, header actions, and design-token shadows."
      examplesCanvas={false}
      examples={
        <div className="flex flex-col gap-10">
          <div className={labComponentContainerClass}>
            {landingControls}
            <div className="flex flex-wrap gap-8">
              <AceLandingPageCard variant="stats" statItems={statItems} {...cardProps} />
              <AceLandingPageCard variant="description" description={bodyText} {...cardProps} />
            </div>
          </div>

          <div className={labComponentContainerClass}>
            {dataCardControls}
            <div className="grid w-full min-w-0">
              <div
                className="col-start-1 row-start-1 invisible pointer-events-none select-none"
                aria-hidden
              >
                <AceDataCard
                  heading={dataHeading}
                  enterData={dataEnterLabel}
                  expanded
                  leftColumn={dataColumn}
                  rightColumn={dataColumn}
                />
              </div>
              <div className="col-start-1 row-start-1 min-w-0">
                <AceDataCard
                  heading={dataHeading}
                  enterData={dataEnterLabel}
                  leftColumn={dataColumn}
                  rightColumn={dataColumn}
                  checked={dataCardChecked}
                  onCheckedChange={setDataCardChecked}
                  showCheckbox={dataShowCheckbox}
                  showStatusIndicator={dataShowStatus}
                  showHeadingInfo={dataShowHeadingInfo}
                  showEnterData={dataShowEnterData}
                  showHeaderActions={dataShowHeaderActions}
                  showDataTable={dataShowDataTable}
                  showInfoBlock={dataShowInfoBlock}
                  showInlineLink={dataShowInlineLink}
                />
              </div>
            </div>
          </div>
        </div>
      }
      code={
        <ComponentLabCode>{`import { AceLandingPageCard, AceDataCard } from '../components/organisms/AceCards'

<AceLandingPageCard variant="stats" title="Screening" statItems={...} />
<AceDataCard heading="[Heading]" expanded showDataTable />`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--screening-text-muted)]">
          Data card expand/collapse uses{' '}
          <code className="text-[var(--screening-text-primary)]">--ace-accordion-duration</code> and{' '}
          <code className="text-[var(--screening-text-primary)]">--ace-accordion-ease</code>. The embedded table uses the{' '}
          <code className="text-[var(--screening-text-primary)]">AceTable</code> molecule with screening table tokens.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--screening-text-muted)]">
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-landing-page-card-*</code> - landing page card layout and tag.
          </li>
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-data-card-*</code> - medium data card width (692px), header, shadows.
          </li>
          <li>
            <code className="text-[var(--screening-text-primary)]">--ace-accordion-duration</code>,{' '}
            <code className="text-[var(--screening-text-primary)]">--ace-accordion-ease</code> - expand panel motion.
          </li>
        </ul>
      }
    />
  )
}
