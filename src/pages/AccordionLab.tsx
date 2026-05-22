import { useState } from 'react'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { AceAccordion, type AceAccordionSurface } from '../components/molecules/AceAccordion/AceAccordion'
import { LabCheckbox, LabRadioGroup } from '../lib/labControls'

const sampleBody = (
  <p className="m-0 min-h-[18rem] [font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-[var(--screening-text-secondary)]">
    Accordion body content goes here. Expand and collapse uses a 420ms ease-out curve (
    <code className="text-[var(--screening-text-primary)]">--ace-accordion-ease</code>).
  </p>
)

export function AccordionLab() {
  const [surface, setSurface] = useState<AceAccordionSurface>('white')
  const [dropShadow, setDropShadow] = useState(false)
  const [showTag, setShowTag] = useState(true)
  const [showAddIcon, setShowAddIcon] = useState(true)
  const [showDeleteIcon, setShowDeleteIcon] = useState(true)
  const [showEditIcon, setShowEditIcon] = useState(true)
  const [showMoreIcon, setShowMoreIcon] = useState(true)
  const [startOpen, setStartOpen] = useState(false)

  const accordionKey = [
    surface,
    dropShadow,
    showTag,
    showAddIcon,
    showDeleteIcon,
    showEditIcon,
    showMoreIcon,
    startOpen,
  ].join('-')

  return (
    <ComponentLabPage
      title="Accordions"
      description="Standard collapsed / expanded accordion from ACE (Figma Accordions). Toggle gray or white background, drop shadow (XS) independently, and show or hide the tag and each Material icon on the right."
      examplesToolbar={
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
            <LabRadioGroup
              label="Background"
              value={surface}
              onChange={setSurface}
              options={[
                { value: 'white', label: 'White' },
                { value: 'gray', label: 'Gray' },
              ]}
            />
            <LabCheckbox label="Drop shadow (XS)" checked={dropShadow} onCheckedChange={setDropShadow} />
            <LabCheckbox label="Show tag" checked={showTag} onCheckedChange={setShowTag} />
            <LabCheckbox label="Start expanded" checked={startOpen} onCheckedChange={setStartOpen} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--color-border)] pt-3">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Icons</span>
            <LabCheckbox label="Add" checked={showAddIcon} onCheckedChange={setShowAddIcon} />
            <LabCheckbox label="Delete" checked={showDeleteIcon} onCheckedChange={setShowDeleteIcon} />
            <LabCheckbox label="Edit" checked={showEditIcon} onCheckedChange={setShowEditIcon} />
            <LabCheckbox label="More" checked={showMoreIcon} onCheckedChange={setShowMoreIcon} />
          </div>
        </div>
      }
      examples={
        <div className="flex w-full justify-start">
          <div className="w-full max-w-[42rem] min-w-[min(100%,42rem)]">
            <AceAccordion
              key={accordionKey}
              title="[Enter Title]"
              surface={surface}
              dropShadow={dropShadow}
              showTag={showTag}
              showAddIcon={showAddIcon}
              showDeleteIcon={showDeleteIcon}
              showEditIcon={showEditIcon}
              showMoreIcon={showMoreIcon}
              defaultOpen={startOpen}
            >
              {sampleBody}
            </AceAccordion>
          </div>
        </div>
      }
      code={
        <ComponentLabCode>{`<AceAccordion
  title="[Enter Title]"
  surface="white"
  dropShadow
  showTag
  showAddIcon
  showDeleteIcon
  showEditIcon
  showMoreIcon
>
  {children}
</AceAccordion>`}</ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          Set <code className="text-[var(--color-text-primary)]">surface</code> to{' '}
          <code className="text-[var(--color-text-primary)]">gray</code> or{' '}
          <code className="text-[var(--color-text-primary)]">white</code>, then use{' '}
          <code className="text-[var(--color-text-primary)]">dropShadow</code> for elevation without changing the fill.
          Each header icon is controlled with <code className="text-[var(--color-text-primary)]">showAddIcon</code>,{' '}
          <code className="text-[var(--color-text-primary)]">showDeleteIcon</code>,{' '}
          <code className="text-[var(--color-text-primary)]">showEditIcon</code>, and{' '}
          <code className="text-[var(--color-text-primary)]">showMoreIcon</code>.
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-accordion-surface-muted</code> (gray),{' '}
            <code className="text-[var(--color-text-primary)]">--ace-accordion-surface</code> (white)
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xs</code> when{' '}
            <code className="text-[var(--color-text-primary)]">dropShadow</code> is true
          </li>
          <li>
            <code className="text-[var(--color-text-primary)]">--ace-accordion-duration</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-accordion-ease</code>
          </li>
        </ul>
      }
    />
  )
}
