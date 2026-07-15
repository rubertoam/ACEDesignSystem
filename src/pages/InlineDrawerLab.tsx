import { useState, type ReactNode } from 'react'
import { AceButton } from '../components/atoms/AceButton'
import { AceInputField } from '../components/atoms/AceInputField'
import { Checkbox } from '../components/atoms/Checkbox/Checkbox'
import { RadioGroup, RadioItem } from '../components/atoms/Radio/RadioGroup'
import { AceDropdownMenu } from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import { AceInlineMessage } from '../components/molecules/AceInlineMessage/AceInlineMessage'
import { MaterialSymbol } from '../components/molecules/AceAccordion/MaterialSymbol'
import { AceInlineDrawer } from '../components/organisms/AceInlineDrawer/AceInlineDrawer'
import { sidebarIconButtonClass } from '../components/organisms/AceSidebar/sidebarRowActions'
import { cn } from '../lib/cn'
import { LabCheckbox, LabRadioGroup, labControlLegendClass } from '../lib/labControls'
import { labUsageSectionClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const h6Bold =
  '[font:var(--ace-type-heading-h6-bold)] [letter-spacing:var(--ace-type-heading-h6-bold-tracking)]'
const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'
const sectionHeaderClass = cn(
  'm-0 [font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]',
  'text-sm text-[var(--screening-primary)]',
)
const captionClass = cn(
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'm-0 text-[var(--screening-text-primary)]',
)
const fieldLabelClass = cn(
  '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]',
  'text-[var(--screening-text-primary)]',
)

type ContentMode = 'content' | 'no-content'

const DROPDOWN_ITEMS = [
  { type: 'item' as const, label: 'Option A' },
  { type: 'item' as const, label: 'Option B' },
  { type: 'item' as const, label: 'Option C' },
]

function DrawerSection({ children }: { children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-[var(--ace-inline-drawer-section-gap)]">
      <div className="flex w-full flex-col gap-2 pb-3">
        <p className={sectionHeaderClass}>Section Header</p>
        <div className="h-px w-full bg-[var(--screening-primary)]" aria-hidden />
      </div>
      <div className="flex w-full flex-col gap-4">{children}</div>
    </section>
  )
}

/** Sample body matching Figma Property 3=Content (Default header). */
function InlineDrawerDemoContent() {
  const [dropdown, setDropdown] = useState('Dropdown')
  const [radio, setRadio] = useState('')
  const [checks, setChecks] = useState({ a: false, b: true, c: true })

  return (
    <>
      <DrawerSection>
        <p className={captionClass}>[Contextual text block about the fields below.]</p>
        <div className="flex w-full flex-col gap-2">
          <span className={fieldLabelClass}>Dropdown Label</span>
          <AceDropdownMenu
            triggerLabel={dropdown}
            items={DROPDOWN_ITEMS.map((item) => ({
              ...item,
              onSelect: () => setDropdown(item.label),
            }))}
            triggerMode="field"
            size="sm"
            className="w-full [&_button]:!w-full [&_button]:!max-w-full"
          />
        </div>
        <AceInputField fieldSize="sm" label="Input Field Label" defaultValue="Input Field" />
        <div className="flex w-full items-start justify-end gap-4">
          <AceButton type="button" variant="secondary" size="sm">
            Secondary Button
          </AceButton>
          <AceButton type="button" variant="primary" size="sm">
            Primary Button
          </AceButton>
        </div>
      </DrawerSection>

      <DrawerSection>
        <p className={captionClass}>[Contextual text block about the fields below.]</p>
        <AceInlineMessage tone="info">This is a user info inline message.</AceInlineMessage>
        <AceInputField fieldSize="sm" label="Textbox Label" defaultValue="Textbox" />
        <RadioGroup
          value={radio}
          onValueChange={setRadio}
          className="flex w-full items-start justify-between gap-2"
        >
          <RadioItem value="a" size="md" id="drawer-radio-a">
            Radio Button
          </RadioItem>
          <RadioItem value="b" size="md" id="drawer-radio-b">
            Radio Button
          </RadioItem>
          <RadioItem value="c" size="md" id="drawer-radio-c">
            Radio Button
          </RadioItem>
        </RadioGroup>
        <div className="flex w-full items-start justify-between gap-2">
          {(
            [
              ['a', checks.a],
              ['b', checks.b],
              ['c', checks.c],
            ] as const
          ).map(([key, checked]) => (
            <label key={key} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                size="md"
                checked={checked}
                onCheckedChange={(next) =>
                  setChecks((prev) => ({ ...prev, [key]: next === true }))
                }
              />
              <span className={cn(p1, 'text-sm text-[var(--ace-neutral-700)]')}>Checkbox</span>
            </label>
          ))}
        </div>
      </DrawerSection>

      <DrawerSection>
        <p className={captionClass}>[Contextual text block about the fields below.]</p>
        <div className="flex w-full items-start gap-4">
          <div className="min-w-0 flex-1">
            <AceInputField fieldSize="sm" label="Textbox Label" defaultValue="Textbox" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <span className={fieldLabelClass}>Dropdown Label</span>
            <AceDropdownMenu
              triggerLabel="Dropdown"
              items={DROPDOWN_ITEMS}
              triggerMode="field"
              size="sm"
              className="w-full [&_button]:!w-full [&_button]:!max-w-full"
            />
          </div>
        </div>
      </DrawerSection>
    </>
  )
}

function DrawerMockHeader({
  open,
  onToggleDrawer,
}: {
  open: boolean
  onToggleDrawer: () => void
}) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b-[0.5px] border-solid border-[var(--screening-border-strong)] bg-[var(--screening-surface)] px-8 py-3">
      <h1 className={cn(h6Bold, 'm-0 text-base text-[var(--ace-neutral-800)]')}>Header</h1>
      <button
        type="button"
        onClick={onToggleDrawer}
        aria-label={open ? 'Close drawer' : 'Open drawer'}
        aria-expanded={open}
        className={sidebarIconButtonClass}
      >
        <MaterialSymbol
          name="right_panel_close"
          size="md"
          className={cn(
            'text-current transition-transform duration-[var(--ace-motion-duration-medium)] [transition-timing-function:var(--ace-motion-ease-standard)] motion-reduce:transition-none',
            !open && 'rotate-180',
          )}
        />
      </button>
    </header>
  )
}

export function InlineDrawerLab() {
  const [open, setOpen] = useState(true)
  const [contentMode, setContentMode] = useState<ContentMode>('content')
  const [showBackButton, setShowBackButton] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(false)

  const examplesToolbar = (
    <div className="flex flex-wrap items-end gap-6">
      <LabRadioGroup
        label="Frame"
        value={contentMode}
        onChange={setContentMode}
        options={[
          { value: 'content', label: 'Content' },
          { value: 'no-content', label: 'No content' },
        ]}
      />
      <div className="flex flex-col gap-2">
        <p className={cn(labControlLegendClass, 'm-0')}>Header</p>
        <div className="flex flex-wrap gap-4">
          <LabCheckbox
            checked={showBackButton}
            onCheckedChange={setShowBackButton}
            label="Back button"
          />
          <LabCheckbox checked={showToggle} onCheckedChange={setShowToggle} label="Toggle" />
        </div>
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      title="Inline Drawer"
      description="Right-side in-flow panel that reflows sibling content - same open/close width motion as Sidebar, not an overlay. Figma Inline Drawer 1063:3635 (Default Content and NoContent frames)."
      examplesToolbar={examplesToolbar}
      examples={
        <div className="flex h-[min(85vh,52rem)] min-h-[40rem] flex-col overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)]">
          <DrawerMockHeader open={open} onToggleDrawer={() => setOpen((v) => !v)} />
          <div className="flex min-h-0 flex-1">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[var(--screening-surface-muted)] p-6">
              <p className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Main content</p>
              <p className="mt-2 max-w-prose text-sm text-[var(--screening-text-muted)]">
                Opening the drawer shrinks this region. Motion matches the sidebar panel duration and easing.
              </p>
            </div>
            <AceInlineDrawer
              open={open}
              title="Title"
              showBackButton={showBackButton}
              showToggle={showToggle}
              toggleChecked={toggleChecked}
              onToggleChange={setToggleChecked}
              onCancel={() => setOpen(false)}
              onSave={() => setOpen(false)}
            >
              {contentMode === 'content' ? <InlineDrawerDemoContent /> : null}
            </AceInlineDrawer>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Place the drawer as a flex sibling after main content. Control{' '}
            <code className="text-[var(--screening-text-primary)]">open</code> from the app header - width animates
            in-flow so neighbors reflow.
          </p>
          <ComponentLabCode>{`import { AceInlineDrawer } from '../components/organisms/AceInlineDrawer/AceInlineDrawer'

const [open, setOpen] = useState(true)

<div className="flex min-h-0 flex-1">
  <main className="min-w-0 flex-1">{/* page content */}</main>
  <AceInlineDrawer
    open={open}
    title="Title"
    onCancel={() => setOpen(false)}
    onSave={handleSave}
  >
    {/* optional body - omit for NoContent */}
  </AceInlineDrawer>
</div>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use for contextual editing or detail forms that should stay on the page and push layout, not cover it.
              Prefer Dialog Modal when the task is blocking or disconnected from the current view.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Anatomy</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">Header</strong>: title; optional back chevron
                and view toggle.
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Body</strong>: scrollable slot for form
                sections (Content) or empty (NoContent).
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Footer</strong>: Cancel / Save aligned end
                (customizable via <code className="text-[var(--screening-text-primary)]">footer</code>).
              </li>
            </ul>
          </section>
        </>
      }
    />
  )
}
