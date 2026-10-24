/**
 * Shared Code / Usage / QA bodies for component labs.
 * Prefer importing these into each *Lab.tsx so tabs stay consistent.
 */
import { ComponentLabCode } from './ComponentLabPage'
import {
  LabQaChecklist,
  LabQaItems,
  LabQaSection,
  LabQaVariantTable,
  LabUsageSection,
} from './labQa'

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

export const buttonLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Primary export is <code className="text-[var(--screening-text-primary)]">Button</code>. Descriptive cards use{' '}
      <code className="text-[var(--screening-text-primary)]">ButtonDescriptive</code>. Deprecated{' '}
      <code className="text-[var(--screening-text-primary)]">AceButton</code> /{' '}
      <code className="text-[var(--screening-text-primary)]">AceDescriptiveButton</code> aliases still resolve.
    </p>
    <ComponentLabCode>{`import { Button } from '../components/atoms/Button'
import { ButtonDescriptive } from '../components/molecules/ButtonDescriptive'

<Button variant="primary" actionTone="primary" size="md">
  Save
</Button>

<Button variant="secondary" actionTone="error" size="sm" icon="left">
  Delete
</Button>

<ButtonDescriptive
  title="[Report Name]"
  description="This is the report description."
/>`}</ComponentLabCode>
  </>
)

export const buttonLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use <code className="text-[var(--screening-text-primary)]">Button</code> for actions in toolbars, forms, and
        dialogs. Use <code className="text-[var(--screening-text-primary)]">ButtonDescriptive</code> when the control
        must show a title plus short description (reports, landing shortcuts).
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <strong className="text-[var(--screening-text-primary)]">variant</strong> —{' '}
          <code className="text-[var(--screening-text-primary)]">primary</code> |{' '}
          <code className="text-[var(--screening-text-primary)]">secondary</code> |{' '}
          <code className="text-[var(--screening-text-primary)]">tertiary</code>
        </li>
        <li>
          <strong className="text-[var(--screening-text-primary)]">actionTone</strong> — remaps fill tokens to{' '}
          primary / secondary / success / error / warning action colors (disabled always uses disabled-button)
        </li>
        <li>
          <strong className="text-[var(--screening-text-primary)]">size</strong> — sm / md / lg;{' '}
          <strong className="text-[var(--screening-text-primary)]">icon</strong> — none / left / right
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Icon-only buttons need an accessible name. Disabled buttons stay in the tab order only when required by the
        host pattern; otherwise prefer omitting the control.
      </p>
    </LabUsageSection>
  </>
)

export const buttonLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'primary × each actionTone',
            cover: 'default, hover, pressed, disabled × sm/md/lg',
            pass: 'Fill/text match action tokens; disabled uses disabled-button fill',
          },
          {
            variant: 'secondary × each actionTone',
            cover: 'default → hover → pressed → disabled',
            pass: 'Border/text use tone fill; hover fills solid correctly',
          },
          {
            variant: 'tertiary × each actionTone',
            cover: 'default → hover → pressed → disabled',
            pass: 'Transparent rest; hover/pressed fill; no stray border',
          },
          {
            variant: 'icon left / right',
            cover: 'All sizes with Material chevron/icon',
            pass: 'Gap and icon color follow size tokens; label stays readable',
          },
          {
            variant: 'ButtonDescriptive',
            cover: 'default, hover, active, disabled',
            pass: 'Title + description layout; focus ring; disabled inert',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction">
      <LabQaItems
        items={[
          'Click and Enter/Space activate enabled buttons and fire the host handler once',
          'Disabled buttons do not fire handlers and show the disabled token set',
          'Focus-visible ring appears on keyboard focus for every variant',
          'Preview-state matrices stay frozen (no live hover) when the lab preview control is set',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

/* -------------------------------------------------------------------------- */
/* Checkbox / Radio / Toggle / Input                                          */
/* -------------------------------------------------------------------------- */

export const checkboxLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'size sm / md / lg',
            cover: 'With and without label',
            pass: 'Hit target and label alignment match size; brand fill when checked',
          },
          {
            variant: 'states',
            cover: 'rest, hover, active/checked, disabled, disabled+checked',
            pass: 'Inset check mark only when checked; disabled uses disabled tokens',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Space toggles when focused; click toggles the same way',
          'Label click toggles when a label is present',
          'Disabled is inert (no toggle)',
          'Accessible name comes from the visible label or aria-label',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const radioLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'plain vs with background',
            cover: 'Each size in the lab matrix',
            pass: 'Field surface/border only on background variant; selection indicator correct',
          },
          {
            variant: 'RadioGroup',
            cover: 'Change selection across items; disabled item',
            pass: 'Only one selected; disabled item cannot be chosen; roving tabindex works',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Arrow keys move selection within the group',
          'Space selects the focused item',
          'Focus ring visible on the radio control',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const toggleLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'Standard toggle',
            cover: 'sm/lg × on/off × rest/hover/disabled',
            pass: 'Track/thumb colors match selected state; disabled inert',
          },
          {
            variant: 'Icon toggle',
            cover: 'Selected and unselected with glyphs',
            pass: 'Icon colors invert correctly on selected track',
          },
          {
            variant: 'With label',
            cover: 'Label click and control click',
            pass: 'Both toggle; accessible name includes label',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Space toggles when focused',
          'aria-checked (or pressed, if used) stays in sync with visuals',
          'Reduced motion: no jarring thumb animation when prefers-reduced-motion is on',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const inputLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'fieldSize sm / md / lg',
            cover: 'Default, focus, error, disabled',
            pass: 'Height/padding match size; focus shows brand border + focus ring',
          },
          {
            variant: 'icon left / right / none',
            cover: 'Each size in default and disabled',
            pass: 'Icon color follows tokens; disabled icon uses disabled icon color',
          },
          {
            variant: 'error',
            cover: 'Message + field chrome',
            pass: 'Error border/bg and message color; announced as invalid',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Typing updates value; disabled rejects input',
          'Label is associated with the input',
          'Placeholder uses placeholder token and disappears when typing',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

/* -------------------------------------------------------------------------- */
/* Dropdowns / Tooltip / Tabs / Badges                                        */
/* -------------------------------------------------------------------------- */

export const dropdownsLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'triggerMode field',
            cover: 'Open/close; select item; disabled',
            pass: 'Trigger shows selected label; panel width matches field pattern',
          },
          {
            variant: 'triggerMode filter',
            cover: 'Open; select; active pressed styling',
            pass: 'Filter chip styling when open/selected; closes on select as designed',
          },
          {
            variant: 'search + checkbox / Select All',
            cover: 'Filter list; toggle rows; Select All / Reset',
            pass: 'Search filters entries; Select All updates all enabled rows; Reset clears',
          },
          {
            variant: 'destructive / assignment rows',
            cover: 'Danger row + multi-select assignment patterns in lab',
            pass: 'Danger uses error color; selection highlight tokens correct',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Escape and outside click close the panel without applying draft multi-select changes (when draft applies)',
          'Keyboard: open with Enter/Space; arrows move; Enter selects',
          'Focus returns to the trigger on close',
          'Portal mode is not clipped by overflow parents',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const tooltipLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'default',
            cover: 'Hover and focus; each side',
            pass: 'Content appears with arrow (unless hideArrow); side placement correct',
          },
          {
            variant: 'screening-toolbar',
            cover: 'Icon button triggers in toolbar density',
            pass: 'Caption type and compact padding match screening pattern',
          },
          {
            variant: 'disabled + TooltipIconWrap',
            cover: 'Hover the wrap around a disabled button',
            pass: 'Tooltip still opens; disabled control stays inert',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Accessibility">
      <LabQaItems
        items={[
          'Icon-only triggers expose aria-label',
          'Tooltip content is available to keyboard focus users via focus on the trigger',
          'Escape dismisses when focus is in the trigger/content pattern',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const tabsLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'horizontal Tabs',
            cover: 'Select each tab; keyboard arrows',
            pass: 'Indicator under active tab; only one selected',
          },
          {
            variant: 'vertical Tabs',
            cover: 'Select each tab',
            pass: 'Vertical indicator; spacing matches vertical tokens',
          },
          {
            variant: 'TabCards',
            cover: 'Default vs emphasis/selected card',
            pass: 'Border/surface tokens; title/subtitle/description readable',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Arrow keys move among tabs; Home/End jump to ends when implemented',
          'aria-selected / tabpanel association stays correct',
          'Focus ring visible on the active tab control',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const badgesLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'appearance pill',
            cover: 'Each color (purple, orange, green, gray, blue, yellow, pink, teal, red)',
            pass: 'Fill/border/label/dot tokens match colors/badges/*',
          },
          {
            variant: 'appearance tag',
            cover: 'Default and warning tag',
            pass: 'Squared radius; warning icon + colors when warning',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Content & a11y">
      <LabQaItems
        items={[
          'Long labels truncate or wrap without breaking the pill height',
          'Decorative dots/icons are aria-hidden when the text conveys status',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

/* -------------------------------------------------------------------------- */
/* Messaging / overlays                                                       */
/* -------------------------------------------------------------------------- */

export const toastLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'tone success / info / warning / error',
            cover: 'Each tone in the lab',
            pass: 'Status icon + accent colors match tone tokens',
          },
          {
            variant: 'layouts',
            cover: 'default, multi-line, text action, double action, confirm',
            pass: 'Structure matches layout; actions fire once; dismiss closes',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction">
      <LabQaItems
        items={[
          'Dismiss control closes the toast',
          'Text actions and Confirm/Cancel call the provided handlers',
          'role/status or alert is appropriate for the tone when used live',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const inlineMessageLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'tone error / success / info / warning',
            cover: 'Each tone in toolbar + static matrix',
            pass: 'Border/bg/icon tokens; Material icon matches tone',
          },
          {
            variant: 'width contexts',
            cover: 'Constrained vs full-width banner in examples',
            pass: 'Radius uses --radius-component-inline-message; text Caption Regular',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Accessibility">
      <LabQaItems
        items={[
          'Error defaults to role="alert"; other tones use role="status" unless overridden',
          'Message text is readable against tone background',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const dialogModalLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'Basic / Delete / Form / Extended',
            cover: 'Open each presentation in the lab',
            pass: 'Title, body, footer actions, and danger styling (Delete) are correct',
          },
          {
            variant: 'Inline message slot',
            cover: 'Toggle inline message tones on/off',
            pass: 'InlineMessage appears under header with correct tone',
          },
          {
            variant: 'live overlay',
            cover: 'Open, focus trap, Escape, Cancel, primary action',
            pass: 'Focus trapped; Escape/Cancel close; primary fires once',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Accessibility">
      <LabQaItems
        items={[
          'Dialog has accessible name (title)',
          'Focus moves into the dialog on open and returns to the trigger on close',
          'Outside click policy matches the presentation (modal vs non-modal if any)',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const inlineDrawerLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'InlineDrawer',
            cover: 'Open/close; size options in lab',
            pass: 'In-flow panel animates; content scroll works; footer actions visible',
          },
          {
            variant: 'SideDrawer',
            cover: 'Open/close overlay drawer',
            pass: 'Viewport ratio width; Escape closes; focus management correct',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction">
      <LabQaItems
        items={[
          'Primary/secondary footer buttons fire handlers',
          'Close control dismisses the drawer',
          'Reduced motion: panel still reaches open/closed without broken layout',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

/* -------------------------------------------------------------------------- */
/* Forms / navigation organisms                                               */
/* -------------------------------------------------------------------------- */

export const paginationLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'page list',
            cover: 'First, middle, last pages; ellipsis jump',
            pass: 'Current page marked; prev/next disable at ends',
          },
          {
            variant: 'page size',
            cover: 'Change page size when control is shown',
            pass: 'List resets to a valid page; range label updates',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Clicking a page fires onPageChange with the correct index',
          'Buttons expose clear names (Previous, Next, page numbers)',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const accordionLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'surface gray / white',
            cover: 'Expand/collapse each',
            pass: 'Surface/border tokens; chevron rotates; content reveals',
          },
          {
            variant: 'tag + headerTrailing',
            cover: 'With tag and review progress trailing',
            pass: 'Trailing content does not steal header toggle unexpectedly',
          },
          {
            variant: 'dropShadow',
            cover: 'On vs off',
            pass: 'Shadow token applied only when enabled',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction">
      <LabQaItems
        items={[
          'Header click and keyboard activate expand/collapse',
          'aria-expanded reflects state',
          'Reduced motion shortens or removes height animation cleanly',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const sliderLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Primary export is <code className="text-[var(--screening-text-primary)]">Slider</code> from{' '}
      <code className="text-[var(--screening-text-primary)]">molecules/Slider</code>. Four Figma variants share the same
      API.
    </p>
    <ComponentLabCode>{`import { Slider } from '../components/molecules/Slider'

<Slider variant="continuous" defaultValue={50} onValueChange={(v) => { /* … */ }} />
<Slider variant="discrete" discreteSteps={10} />
<Slider variant="ranged" defaultValue={[25, 75]} showTooltip onValueChange={(v) => { /* … */ }} />
<Slider variant="centered" defaultValue={-17} showTooltip />`}</ComponentLabCode>
  </>
)

export const sliderLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use for numeric ranges where dragging is faster than typing — filters, opacity, volume, or bipolar offsets.
        Prefer a Stepper or Input when the value must be exact and rarely scrubbed.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <code className="text-[var(--screening-text-primary)]">continuous</code> — free value along the track
        </li>
        <li>
          <code className="text-[var(--screening-text-primary)]">discrete</code> — snaps to{' '}
          <code className="text-[var(--screening-text-primary)]">discreteSteps</code> ticks
        </li>
        <li>
          <code className="text-[var(--screening-text-primary)]">ranged</code> — two thumbs; value is{' '}
          <code className="text-[var(--screening-text-primary)]">[min, max]</code>
        </li>
        <li>
          <code className="text-[var(--screening-text-primary)]">centered</code> — bipolar around zero; pair with{' '}
          <code className="text-[var(--screening-text-primary)]">showTooltip</code> for the value bubble
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Thumbs expose <code className="text-[var(--screening-text-primary)]">aria-valuemin</code> /{' '}
        <code className="text-[var(--screening-text-primary)]">max</code> /{' '}
        <code className="text-[var(--screening-text-primary)]">now</code>. Arrow keys nudge by step; Home/End jump when
        supported. Provide a visible label or{' '}
        <code className="text-[var(--screening-text-primary)]">aria-label</code> for each slider.
      </p>
    </LabUsageSection>
  </>
)

export const sliderLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'continuous / discrete / ranged / centered',
            cover: 'Drag and keyboard adjust each',
            pass: 'Thumb(s) and fill match variant; ticks only where discrete',
          },
          {
            variant: 'showTooltip',
            cover: 'On vs off while dragging',
            pass: 'Tooltip value tracks thumb when enabled',
          },
          {
            variant: 'disabled',
            cover: 'Attempt drag/keyboard',
            pass: 'Control inert; disabled track/handle tokens',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Arrow keys nudge by step; Home/End jump when supported',
          'aria-valuemin/max/now exposed on the slider thumb',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const stepperLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Primary export is <code className="text-[var(--screening-text-primary)]">Stepper</code>. Horizontal places − / +
      beside the value; vertical stacks chevrons.
    </p>
    <ComponentLabCode>{`import { Stepper } from '../components/molecules/Stepper'

<Stepper variant="horizontal" value={5} onValueChange={setValue} min={0} max={10} step={1} />

<Stepper variant="vertical" value={5} onValueChange={setValue} disabled={false} />`}</ComponentLabCode>
  </>
)

export const stepperLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use for small integer adjustments (quantity, page size, offsets) where ± controls are clearer than a free text
        field. Prefer Slider for continuous scrubbing across a wide range.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <code className="text-[var(--screening-text-primary)]">variant=&quot;horizontal&quot;</code> — minus / plus
          flanking the value
        </li>
        <li>
          <code className="text-[var(--screening-text-primary)]">variant=&quot;vertical&quot;</code> — chevrons above and
          below the value
        </li>
        <li>
          Bound with <code className="text-[var(--screening-text-primary)]">value</code> /{' '}
          <code className="text-[var(--screening-text-primary)]">onValueChange</code>; optional{' '}
          <code className="text-[var(--screening-text-primary)]">min</code>,{' '}
          <code className="text-[var(--screening-text-primary)]">max</code>,{' '}
          <code className="text-[var(--screening-text-primary)]">step</code>,{' '}
          <code className="text-[var(--screening-text-primary)]">disabled</code>
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Increment/decrement controls need accessible names. Disabled buttons at min/max stay visible but inert. Keep the
        current value announced to assistive tech (native spinbutton semantics or an associated label).
      </p>
    </LabUsageSection>
  </>
)

export const stepperLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'horizontal vs vertical',
            cover: 'Increment/decrement each orientation',
            pass: 'Layout tokens; value updates; disabled buttons at min/max',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction">
      <LabQaItems
        items={[
          'Buttons change value by step without going outside min/max',
          'Disabled whole control rejects interaction',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const progressLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Use <code className="text-[var(--screening-text-primary)]">AccordionReviewProgress</code> for determinate table
      review counts. Use <code className="text-[var(--screening-text-primary)]">ProgressIndicator</code> for
      indeterminate processing cards. Default{' '}
      <code className="text-[var(--screening-text-primary)]">tone=&quot;surface&quot;</code> (outlined);{' '}
      <code className="text-[var(--screening-text-primary)]">tone=&quot;brand&quot;</code> for filled purple.{' '}
      <code className="text-[var(--screening-text-primary)]">type</code> is{' '}
      <code className="text-[var(--screening-text-primary)]">no-action</code> or{' '}
      <code className="text-[var(--screening-text-primary)]">action</code> (Cancel via{' '}
      <code className="text-[var(--screening-text-primary)]">onCancel</code>).
    </p>
    <ComponentLabCode>{`import { ProgressIndicator } from '../components/atoms/ProgressIndicator'
import { AccordionReviewProgress } from '../components/molecules/Accordion/AccordionReviewProgress'

<AccordionReviewProgress reviewed={5} total={12} />

{/* Outlined (default) */}
<ProgressIndicator tone="surface" type="no-action" label="Progress" />

{/* Filled + cancel */}
<ProgressIndicator
  tone="brand"
  type="action"
  label="Progress"
  onCancel={() => { /* abort */ }}
/>`}</ComponentLabCode>
  </>
)

export const progressLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        <strong className="text-[var(--screening-text-primary)]">Table / review progress</strong>: show how many rows
        are reviewed in screening results or accordion headers.{' '}
        <strong className="text-[var(--screening-text-primary)]">Processing</strong>: block or overlay while a copy,
        export, or similar job runs. Prefer{' '}
        <strong className="text-[var(--screening-text-primary)]">Action</strong> when the user can cancel.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <strong className="text-[var(--screening-text-primary)]">Filled off</strong> (
          <code className="text-[var(--screening-text-primary)]">tone=&quot;surface&quot;</code>): white surface, brand
          border, brand spinner and label
        </li>
        <li>
          <strong className="text-[var(--screening-text-primary)]">Filled on</strong> (
          <code className="text-[var(--screening-text-primary)]">tone=&quot;brand&quot;</code>): solid FinScan Primary
          fill, light spinner and label
        </li>
        <li>
          <code className="text-[var(--screening-text-primary)]">type=&quot;no-action&quot;</code> — spinner + status
          only; <code className="text-[var(--screening-text-primary)]">type=&quot;action&quot;</code> — adds secondary
          Cancel
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Pair indeterminate spinners with visible status text; use{' '}
        <code className="text-[var(--screening-text-primary)]">aria-busy</code> on the busy region when appropriate.
        Cancel remains keyboard operable. Determinate review bars should expose reviewed/total in text, not color alone.
      </p>
    </LabUsageSection>
  </>
)

export const progressLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'ProgressIndicator tones/types',
            cover: 'Brand vs surface; with/without actions in lab',
            pass: 'Shell, label, and spinner colors match type/tone tokens',
          },
          {
            variant: 'ProgressSpinner',
            cover: 'On brand and on surface',
            pass: 'Animation runs; colors match tone class',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Accessibility">
      <LabQaItems
        items={[
          'Busy/progress is conveyed with text and/or aria-busy as documented in the lab',
          'Action buttons inside indicators remain keyboard operable',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const cardsLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'LandingPageCard stats',
            cover: 'Toggle badge, header icons, footer stats/link',
            pass: 'Sections show/hide; hover shadow XS→XL; actions fire',
          },
          {
            variant: 'LandingPageCard description',
            cover: 'Body copy + optional purple badge',
            pass: 'Description layout; badge uses purple badge tokens',
          },
          {
            variant: 'DataCard (if shown)',
            cover: 'Header, rows, insight block',
            pass: 'Tokens and link styling match data-card aliases',
          },
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const cardsLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Landing page cards route users into tools. Prefer{' '}
        <code className="text-[var(--screening-text-primary)]">stats</code> when KPI icons help scanning, and{' '}
        <code className="text-[var(--screening-text-primary)]">description</code> when a short blurb is enough.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <code className="text-[var(--screening-text-primary)]">variant=&quot;stats&quot;</code> — icon/stat row
        </li>
        <li>
          <code className="text-[var(--screening-text-primary)]">variant=&quot;description&quot;</code> — body copy +
          optional Badge
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Motion">
      <p className="m-0">Hover elevates card shadow from XS to XL; keep the rest of the chrome static.</p>
    </LabUsageSection>
  </>
)

export const cardsLabCode = (
  <ComponentLabCode>{`import { LandingPageCard } from '../components/organisms/Cards'

<LandingPageCard
  variant="stats"
  title="Screening"
  statItems={statItems}
  showBadge
  tag="New"
/>

<LandingPageCard
  variant="description"
  title="Screening"
  description="Short supporting copy."
/>`}</ComponentLabCode>
)

/* -------------------------------------------------------------------------- */
/* Remaining organisms                                                        */
/* -------------------------------------------------------------------------- */

export const attachmentsLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Primary export is <code className="text-[var(--screening-text-primary)]">Attachments</code>. Demo arrays (
      <code className="text-[var(--screening-text-primary)]">DEMO_ATTACHMENT_FILES</code> /{' '}
      <code className="text-[var(--screening-text-primary)]">DEMO_ATTACHMENT_LINKS</code>) seed the lab; product code
      owns upload and URL APIs.
    </p>
    <ComponentLabCode>{`import {
  Attachments,
  DEMO_ATTACHMENT_FILES,
  DEMO_ATTACHMENT_LINKS,
} from '../components/organisms/Attachments/Attachments'

<Attachments
  files={files}
  links={links}
  urlDraft={urlDraft}
  onUrlDraftChange={setUrlDraft}
  onFilesSelected={handleFiles}
  onAddUrl={handleAddUrl}
  onRemoveFile={removeFile}
  onRemoveLink={removeLink}
/>

{/* Read-only demo seed */}
<Attachments files={DEMO_ATTACHMENT_FILES} links={DEMO_ATTACHMENT_LINKS} />`}</ComponentLabCode>
  </>
)

export const attachmentsLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use when users attach supporting documents and external reference links to a record. The dropzone supports
        drag-and-drop and Upload; URL links use the caption input and Add URL action.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <strong className="text-[var(--screening-text-primary)]">Files</strong> — uploading / queued / failed /
          complete rows with remove when complete
        </li>
        <li>
          <strong className="text-[var(--screening-text-primary)]">Links</strong> — URL list with remove; draft field +
          Add URL
        </li>
        <li>
          <strong className="text-[var(--screening-text-primary)]">Dropzone</strong> — dashed brand border empty state
          for file pick / drag
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Upload and Add URL are real buttons; remove controls need accessible names. Surface failed uploads with text
        (and error tokens), not color alone. Keep keyboard focus order: dropzone → file list → URL field → links.
      </p>
    </LabUsageSection>
  </>
)

export const attachmentsLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'files + links',
            cover: 'Add/remove demo files and links',
            pass: 'List updates; status/error styling shows when forced in lab',
          },
          {
            variant: 'dropzone',
            cover: 'Hover/focus dropzone chrome',
            pass: 'Border/brand tokens; empty state copy visible',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction">
      <LabQaItems
        items={[
          'Remove controls delete the intended row only',
          'Error state text uses error tokens and remains readable',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const scrollableListLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'search / filter / sort',
            cover: 'Each control in the header',
            pass: 'List subset updates; selected item highlight persists correctly',
          },
          {
            variant: 'minimize / expand shell',
            cover: 'Collapse chrome when offered',
            pass: 'Layout remains usable; list scroll region intact',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="Interaction & a11y">
      <LabQaItems
        items={[
          'Keyboard can move selection through visible items',
          'Person vs organization icons render for the matching item kind',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const siteHeaderLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'brand + nav',
            cover: 'Logo, nav items, active route styling',
            pass: 'Height 3rem chrome; nav hover; greeting/brand color tokens',
          },
          {
            variant: 'toolbar',
            cover: 'Notifications / help / user actions',
            pass: 'Icon buttons hit 24px glyphs; tooltips if present',
          },
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const timelineLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'status surfaces',
            cover: 'system / escalation / pending / blocked / safe',
            pass: 'Icon well + highlight colors match status tokens',
          },
          {
            variant: 'sort + expand',
            cover: 'Change sort; expand/collapse items',
            pass: 'Order updates; expanded body uses expanded-bg token',
          },
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const taskBarLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Primary export is <code className="text-[var(--screening-text-primary)]">TaskBar</code>. Put selection context in{' '}
      <code className="text-[var(--screening-text-primary)]">leading</code>; primary / secondary actions as children (
      usually <code className="text-[var(--screening-text-primary)]">Button</code>).
    </p>
    <ComponentLabCode>{`import { Button } from '../components/atoms/Button'
import { TaskBar } from '../components/molecules/TaskBar'

<TaskBar
  leading={
    <>
      <span>3 selected</span>
      <button type="button">Deselect all</button>
    </>
  }
>
  <Button variant="secondary" onClick={openModal}>Modal</Button>
  <Button variant="primary" onClick={openDrawer}>Inline Drawer</Button>
</TaskBar>

{/* Actions only */}
<TaskBar>
  <Button variant="primary">Continue</Button>
</TaskBar>`}</ComponentLabCode>
  </>
)

export const taskBarLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use under the main content column in app shells (e.g. Layouts / Review Assigned) for primary page actions. Keep
        selection context in <code className="text-[var(--screening-text-primary)]">leading</code> (end-aligned,
        before the action buttons) and CTAs as children.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <strong className="text-[var(--screening-text-primary)]">With leading</strong> — selection count / deselect
          beside end actions
        </li>
        <li>
          <strong className="text-[var(--screening-text-primary)]">Actions only</strong> — omit{' '}
          <code className="text-[var(--screening-text-primary)]">leading</code> for a simple CTA strip
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Treat the bar as a toolbar region; keep focus order leading → actions. Deselect and action buttons need clear
        names. Do not rely on position alone to convey selection state — keep the count text visible.
      </p>
    </LabUsageSection>
  </>
)

export const taskBarLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'Leading context and end actions layout on one bar without wrapping awkwardly at lab width',
          'Action buttons remain clickable and show correct Button variants',
          'Bar uses task-bar surface/border/shadow tokens',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const pageHeadersLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Exports are <code className="text-[var(--screening-text-primary)]">PageHeader</code> and{' '}
      <code className="text-[var(--screening-text-primary)]">SubHeader</code>. PageHeader sits under SiteHeader; SubHeader
      fills content regions with optional stats, paging, menu, or drill-down.
    </p>
    <ComponentLabCode>{`import { PageHeader } from '../components/molecules/PageHeader'
import { SubHeader } from '../components/molecules/SubHeader'

<PageHeader
  title="Headline"
  showSidebarControl
  sidebarOpen={sidebarOpen}
  onToggleSidebar={toggleSidebar}
/>

<SubHeader
  statistics
  paging
  moreMenu={false}
  drillDown={false}
  paginationLabel="1 of 12"
  onPrevPage={goPrev}
  onNextPage={goNext}
/>`}</ComponentLabCode>
  </>
)

export const pageHeadersLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Place <code className="text-[var(--screening-text-primary)]">PageHeader</code> under{' '}
        <code className="text-[var(--screening-text-primary)]">SiteHeader</code> for the page title. Use{' '}
        <code className="text-[var(--screening-text-primary)]">SubHeader</code> in content regions — it fills its parent
        width and supports optional statistics, paging, more menu, or drill-down.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <code className="text-[var(--screening-text-primary)]">PageHeader</code> — title; optional sidebar toggle via{' '}
          <code className="text-[var(--screening-text-primary)]">showSidebarControl</code>
        </li>
        <li>
          <code className="text-[var(--screening-text-primary)]">SubHeader</code> flags —{' '}
          <code className="text-[var(--screening-text-primary)]">statistics</code>,{' '}
          <code className="text-[var(--screening-text-primary)]">paging</code>,{' '}
          <code className="text-[var(--screening-text-primary)]">moreMenu</code>,{' '}
          <code className="text-[var(--screening-text-primary)]">drillDown</code> (combine as needed)
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Page title should map to a heading level appropriate for the shell. Sidebar toggle and paging prev/next need
        accessible names; disable prev/next at range ends. More-menu trigger must expose its menu relationship.
      </p>
    </LabUsageSection>
  </>
)

export const pageHeadersLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'PageHeader',
            cover: 'Title + leading/trailing actions in examples',
            pass: 'Padding/border tokens; actions aligned',
          },
          {
            variant: 'SubHeader layouts',
            cover: 'Full / split / drilldown padding',
            pass: 'Back link, stats, pagination label patterns render correctly',
          },
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const dateTimeLabQa = (
  <LabQaChecklist intro="Use the Date and Time examples separately. Time Picker also has detailed rules in the Usage tab from implementationRules/timePicker.md — still run this matrix.">
    <LabQaSection title="DatePicker">
      <LabQaVariantTable
        rows={[
          {
            variant: 'single',
            cover: 'Open; pick day; Set / Cancel / Reset',
            pass: 'Trigger updates only on Set; Cancel restores prior',
          },
          {
            variant: 'range',
            cover: 'Select start/end across months',
            pass: 'Range fill tokens; dual-month width; incomplete range handled',
          },
        ]}
      />
    </LabQaSection>
    <LabQaSection title="TimePicker">
      <LabQaItems
        items={[
          '12h and 24h modes; Set commits; Cancel/Escape discard',
          'Steppers honor minuteStep; typing clamps invalid minutes',
          'Disabled trigger does not open the panel',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const finScanIconLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'Hash mark, wordmark, and combined FinScanIcon render at lab sizes without clipping',
          'Brand mark colors use FinScan green/blue/magenta tokens',
          'Decorative marks are aria-hidden when adjacent text names the brand',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const layoutsLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'Each layout composition matches the labeled example (header/sidebar/content regions)',
          'Spacing uses layout tokens; no overlapping chrome at the lab viewport',
          'Interactive slots (if any) remain clickable',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

/* Foundation labs — lighter QA */
export const colorsLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'Swatches show correct hex/token pairing for light and dark themes',
          'Semantic groups (text, border, action, badges) are complete vs Figma export',
          'Copy/token labels match --color-* names used in components',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const typographyLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'Each specimen uses the documented --ace-type-* / --typography-* token',
          'Weights and tracking match the label',
          'Long sample text wraps without clipping',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const dropShadowsLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Elevation tokens live in <code className="text-[var(--screening-text-primary)]">variables.css</code> as{' '}
      <code className="text-[var(--screening-text-primary)]">--ace-drop-shadow-*</code> (none → xl). Apply via{' '}
      <code className="text-[var(--screening-text-primary)]">box-shadow</code> or Tailwind arbitrary values.
    </p>
    <ComponentLabCode>{`.elevated-card {
  box-shadow: var(--ace-drop-shadow-md);
  border-radius: var(--radius-lg);
}

.floating-panel {
  box-shadow: var(--ace-drop-shadow-xl);
}

.flat-surface {
  box-shadow: var(--ace-drop-shadow-none);
}

/* Tailwind */
<div className="shadow-[var(--ace-drop-shadow-sm)]" />`}</ComponentLabCode>
  </>
)

export const dropShadowsLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use ACE drop shadows for product elevation (cards, menus, modals). Prefer larger steps for higher elevation;{' '}
        <code className="text-[var(--screening-text-primary)]">none</code> removes shadow. Lab shell{' '}
        <code className="text-[var(--screening-text-primary)]">--shadow-sm</code> is separate chrome — do not substitute
        it for product surfaces.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <code className="text-[var(--screening-text-primary)]">--ace-drop-shadow-none</code> →{' '}
          <code className="text-[var(--screening-text-primary)]">xs</code> →{' '}
          <code className="text-[var(--screening-text-primary)]">sm</code> →{' '}
          <code className="text-[var(--screening-text-primary)]">md</code> →{' '}
          <code className="text-[var(--screening-text-primary)]">lg</code> →{' '}
          <code className="text-[var(--screening-text-primary)]">xl</code>
        </li>
        <li>
          Dialog modal maps <code className="text-[var(--screening-text-primary)]">--dialog-modal-shadow</code> →{' '}
          <code className="text-[var(--screening-text-primary)]">var(--ace-drop-shadow-xl)</code>
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Shadow is decorative elevation only — never the sole focus or state cue. Pair interactive elevated surfaces with
        borders/focus rings. Dark theme bumps shadow alpha for legibility on dark surfaces.
      </p>
    </LabUsageSection>
  </>
)

export const dropShadowsLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'XS→XL samples visibly step in elevation',
          'Token names match --ace-drop-shadow-*',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const tokensLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Tokens ship as CSS variables from Figma JSON. Prefer semantic / component names in product CSS; primitives define
      new aliases. Regenerate catalog data with the lab script after token exports change.
    </p>
    <ComponentLabCode>{`/* Prefer semantic intent */
.button-primary {
  background: var(--color-action-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
}

/* Figma path → CSS */
/* colors/action/primary → --color-action-primary */
/* spacing/component padding/md → --spacing-component-padding-md */

/* Sources */
/* tokens/figma/Primitives/Default.tokens.json */
/* tokens/figma/Semantic/Light.tokens.json | Dark.tokens.json */

/* Generated */
/* src/styles/color-tokens.css */
/* src/pages/tokensLabData.ts ← node scripts/generate-tokens-lab-data.mjs */`}</ComponentLabCode>
  </>
)

export const tokensLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use this lab to verify Figma → CSS parity across Primitive, Semantic, and Component layers. Prefer Semantic (or
        Component) names in product UI; reach for Primitives only when defining new Semantic aliases.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <ul className="m-0 list-disc space-y-1 pl-5">
        <li>
          <strong className="text-[var(--screening-text-primary)]">Primitive</strong>: the raw ingredients (colors,
          spacing, corners, type sizes). Rarely used directly in product UI.
        </li>
        <li>
          <strong className="text-[var(--screening-text-primary)]">Semantic</strong>: names for purpose (“primary
          action,” “body text,” “page background”), including light and dark values. Prefer these in product UI.
        </li>
        <li>
          <strong className="text-[var(--screening-text-primary)]">Component</strong>: values owned by a specific
          control (button radius, icon size, field padding).
        </li>
      </ul>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Contrast and theme switches matter more than the catalog UI: confirm semantic text/border/action pairs remain
        readable under light and dark (
        <code className="text-[var(--screening-text-primary)]">[data-theme=&apos;dark&apos;]</code> on{' '}
        <code className="text-[var(--screening-text-primary)]">&lt;html&gt;</code>).
      </p>
    </LabUsageSection>
  </>
)

export const tokensLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'Primitive / Semantic / Component groups render without missing sections',
          'Dark theme toggle (if present) updates semantic samples',
          'Names match Figma export paths shown in the lab',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const animationsLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'Each motion demo plays and respects reduced-motion when enabled in OS settings',
          'Durations match the labeled fast/medium/slow tokens',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const iconographyLabQaExtra = (
  <LabQaChecklist intro="Supplement the Usage-tab rules doc with this variant matrix while testing the Iconography lab.">
    <LabQaSection title="Variant matrix">
      <LabQaVariantTable
        rows={[
          {
            variant: 'size sm → xl',
            cover: 'Outlined and filled samples',
            pass: 'Optical size matches --icon-size-*; weight 300 hits target',
          },
          {
            variant: 'ghost / stroke buttons',
            cover: 'Icon-only buttons in catalog',
            pass: 'aria-label present; focus ring visible',
          },
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)

export const atomsLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Atoms are indivisible primitives under <code className="text-[var(--screening-text-primary)]">src/components/atoms</code>.
      Open a child lab for full Code samples; overview only shows import shape.
    </p>
    <ComponentLabCode>{`import { Button } from '../components/atoms/Button'
import { Badge } from '../components/atoms/Badge/Badge'
import { Input } from '../components/atoms/Input'

<Button variant="primary">Save</Button>
<Badge appearance="status" variant="green">Active</Badge>
<Input label="Name" />`}</ComponentLabCode>
  </>
)

export const atomsLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Start here to browse atom labs (buttons, inputs, badges, tabs, …). Implement product UI from the child lab that
        matches the Figma component — this overview is navigation only.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <p className="m-0">
        Each atom lab documents its own variant matrix. Availability tags on the list reflect{' '}
        <code className="text-[var(--screening-text-primary)]">labAvailability</code> for that route.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Atom labs own a11y rules (labels, focus, disabled). Prefer semantic tokens from Usage/Variables on the child
        page when auditing contrast.
      </p>
    </LabUsageSection>
  </>
)

export const moleculesLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Molecules compose atoms under <code className="text-[var(--screening-text-primary)]">src/components/molecules</code>.
      Child labs have full snippets; overview shows typical import paths.
    </p>
    <ComponentLabCode>{`import { Button } from '../components/atoms/Button'
import { Slider } from '../components/molecules/Slider'
import { Stepper } from '../components/molecules/Stepper'
import { TaskBar } from '../components/molecules/TaskBar'

<Slider variant="continuous" defaultValue={50} />
<Stepper variant="horizontal" value={3} onValueChange={setValue} />
<TaskBar><Button variant="primary">Continue</Button></TaskBar>`}</ComponentLabCode>
  </>
)

export const moleculesLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use a molecule when a small composition of atoms has a stable layout and API (slider, stepper, page header,
        toast). Prefer an atom when a single control is enough.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <p className="m-0">See each molecule lab for prop-level variants. This page lists routes and availability only.</p>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Composed controls must preserve child a11y (labels, keyboard). Document composite name/description on the child
        lab Usage tab.
      </p>
    </LabUsageSection>
  </>
)

export const organismsLabCode = (
  <>
    <p className="m-0 text-[var(--screening-text-muted)]">
      Organisms are full patterns under{' '}
      <code className="text-[var(--screening-text-primary)]">src/components/organisms</code>. Child labs hold detailed
      Code; overview shows representative imports.
    </p>
    <ComponentLabCode>{`import { Attachments } from '../components/organisms/Attachments/Attachments'
import { SiteHeader } from '../components/organisms/SiteHeader/SiteHeader'
import { LandingPageCard } from '../components/organisms/Cards'

<SiteHeader … />
<LandingPageCard variant="stats" title="Screening" statItems={…} />
<Attachments files={files} links={links} … />`}</ComponentLabCode>
  </>
)

export const organismsLabUsage = (
  <>
    <LabUsageSection title="When to use">
      <p className="m-0">
        Use organisms for shell chrome and multi-region patterns (site header, sidebar, attachments, cards). Pair with
        Figma screenshots for layout parity.
      </p>
    </LabUsageSection>
    <LabUsageSection title="Variants">
      <p className="m-0">Each organism lab documents composition variants and data props. Follow links from this overview.</p>
    </LabUsageSection>
    <LabUsageSection title="Accessibility">
      <p className="m-0">
        Organisms own landmark structure (banner, navigation, complementary). Verify focus order across regions in the
        child lab QA checklist.
      </p>
    </LabUsageSection>
  </>
)

export const overviewLabQa = (
  <LabQaChecklist>
    <LabQaSection title="Tasks">
      <LabQaItems
        items={[
          'Every linked component card navigates to the correct lab route',
          'Availability tags match labAvailability for that route',
        ]}
      />
    </LabQaSection>
  </LabQaChecklist>
)
