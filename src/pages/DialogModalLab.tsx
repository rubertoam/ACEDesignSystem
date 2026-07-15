import { useState } from 'react'
import { AceInputField } from '../components/atoms/AceInputField'
import { AceDropdownMenu } from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import {
  DialogModal,
  DialogModalInlineMessage,
} from '../components/molecules/DialogModal/DialogModal'
import {
  ACE_INLINE_MESSAGE_TONES,
  type AceInlineMessageTone,
} from '../components/molecules/AceInlineMessage/inlineMessageFieldStyles'
import { LabCheckbox, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

type DialogVariantId = 'action' | 'delete' | 'dropdown' | 'form' | 'extended-form'

const VARIANTS: DialogVariantId[] = ['action', 'delete', 'dropdown', 'form', 'extended-form']

const VARIANT_LABELS: Record<DialogVariantId, string> = {
  action: 'Dialog Modal / Basic / Action',
  delete: 'Dialog Modal / Basic / Delete',
  dropdown: 'Dialog Modal / Basic / Dropdown',
  form: 'Dialog Modal / Basic / Form',
  'extended-form': 'Dialog Modal / Basic / Extended Form',
}

const VARIANT_SHORT: Record<DialogVariantId, string> = {
  action: 'Action',
  delete: 'Delete',
  dropdown: 'Dropdown',
  form: 'Form',
  'extended-form': 'Extended form',
}

const INLINE_TONE_LABELS: Record<AceInlineMessageTone, string> = {
  error: 'Error',
  success: 'Success',
  info: 'Info',
  warning: 'Warning',
}

const INLINE_COPY: Record<AceInlineMessageTone, string> = {
  error: 'This is an error inline message.',
  success: 'This is a success inline message.',
  info: 'This is a user info inline message.',
  warning: 'This is a warning inline message.',
}

const SUPPORTING_COPY = (
  <>
    This is supporting text that may have a <strong className="font-semibold">subject</strong> in bold.
  </>
)

const DROPDOWN_ITEMS = [
  { type: 'item' as const, label: 'Option A' },
  { type: 'item' as const, label: 'Option B' },
  { type: 'item' as const, label: 'Option C' },
]

const openButtonClass = cn(
  'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-background)]',
)

function noop() {}

function InlineStrip({ show, tone }: { show: boolean; tone: AceInlineMessageTone }) {
  if (!show) return null
  return <DialogModalInlineMessage tone={tone}>{INLINE_COPY[tone]}</DialogModalInlineMessage>
}

function LabeledDropdown({ label, triggerLabel }: { label: string; triggerLabel: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)] text-[var(--dialog-modal-title)]">
        {label}
      </span>
      <AceDropdownMenu
        triggerLabel={triggerLabel}
        triggerMode="field"
        size="sm"
        showChevron
        align="start"
        items={DROPDOWN_ITEMS}
        className="w-[12.5rem]"
      />
    </div>
  )
}

function VariantBody({
  variant,
  showInlineMessage,
  inlineTone,
  idPrefix,
}: {
  variant: DialogVariantId
  showInlineMessage: boolean
  inlineTone: AceInlineMessageTone
  idPrefix: string
}) {
  const inline = <InlineStrip show={showInlineMessage} tone={inlineTone} />

  switch (variant) {
    case 'action':
    case 'delete':
      return inline
    case 'dropdown':
      return (
        <>
          <AceDropdownMenu
            triggerLabel="Dropdown No Label"
            triggerMode="field"
            size="sm"
            showChevron
            align="start"
            items={DROPDOWN_ITEMS}
            className="w-full max-w-[12.5rem]"
          />
          {inline}
        </>
      )
    case 'form':
      return (
        <>
          <AceInputField
            fieldSize="md"
            defaultValue="[Sample text]"
            aria-label="Sample text"
            id={`${idPrefix}-sample`}
          />
          {inline}
        </>
      )
    case 'extended-form':
      return (
        <>
          <div className="flex w-full flex-col gap-8 py-2">
            <div className="flex flex-wrap gap-8">
              <LabeledDropdown label="Label" triggerLabel="Dropdown Label" />
              <LabeledDropdown label="Label" triggerLabel="Dropdown Label" />
            </div>
            <div className="flex flex-col gap-3">
              <AceInputField
                label="Label"
                fieldSize="md"
                defaultValue="[Sample text]"
                id={`${idPrefix}-field-1`}
              />
              <AceInputField
                label="Label"
                fieldSize="md"
                defaultValue="[Sample text]"
                id={`${idPrefix}-field-2`}
              />
            </div>
          </div>
          {inline}
        </>
      )
    default:
      return null
  }
}

function ModalChrome({
  variant,
  showInlineMessage,
  inlineTone,
  presentation,
  open,
  onClose,
  idPrefix,
}: {
  variant: DialogVariantId
  showInlineMessage: boolean
  inlineTone: AceInlineMessageTone
  presentation: 'overlay' | 'static'
  open: boolean
  onClose: () => void
  idPrefix: string
}) {
  const isDelete = variant === 'delete'

  return (
    <DialogModal
      open={open}
      onClose={onClose}
      presentation={presentation}
      title="[Headline]"
      description={SUPPORTING_COPY}
      size="lg"
      secondaryAction={{ label: 'Cancel', onClick: onClose }}
      primaryAction={{
        label: isDelete ? 'Delete' : '[Action]',
        variant: isDelete ? 'danger' : 'default',
        onClick: onClose,
      }}
    >
      <VariantBody
        variant={variant}
        showInlineMessage={showInlineMessage}
        inlineTone={inlineTone}
        idPrefix={idPrefix}
      />
    </DialogModal>
  )
}

export function DialogModalLab() {
  const [showInlineMessage, setShowInlineMessage] = useState(true)
  const [inlineTone, setInlineTone] = useState<AceInlineMessageTone>('error')
  const [liveVariant, setLiveVariant] = useState<DialogVariantId | null>(null)

  const toolbar = (
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      <LabCheckbox
        label="Inline message"
        checked={showInlineMessage}
        onCheckedChange={setShowInlineMessage}
      />
      <LabSelect
        label="Inline message tone"
        value={inlineTone}
        onChange={(v) => setInlineTone(v as AceInlineMessageTone)}
        options={ACE_INLINE_MESSAGE_TONES.map((value) => ({
          value,
          label: INLINE_TONE_LABELS[value],
        }))}
        disabled={!showInlineMessage}
      />
      <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
        <p className="m-0 [font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)] text-[var(--screening-text-primary)]">
          Open live
        </p>
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((id) => (
            <button key={id} type="button" className={openButtonClass} onClick={() => setLiveVariant(id)}>
              {VARIANT_SHORT[id]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <ComponentLabPage
        title="Dialog modal"
        description="ACE dialog modals for single-task decisions - Basic Action, Delete, Dropdown, Form, and Extended Form (Figma Dialog Modals 3047:2036). Optional AceInlineMessage strip with selectable tone."
        examplesToolbar={toolbar}
        examples={
          <div className={cn(labExampleSectionClass, 'items-stretch')}>
            <p className={labSectionLabelClass}>Variants</p>
            <p className="m-0 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
              Static panels match the Figma matrix. Use the toolbar to show or hide the inline message and pick its
              tone; Open live for the overlay experience.
            </p>
            <div className="mt-6 flex flex-col gap-12">
              {VARIANTS.map((variant) => (
                <div key={variant} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="m-0 text-sm font-medium text-[var(--color-text-primary)]">
                      {VARIANT_LABELS[variant]}
                    </p>
                    <button
                      type="button"
                      className={openButtonClass}
                      onClick={() => setLiveVariant(variant)}
                    >
                      Open live
                    </button>
                  </div>
                  <ModalChrome
                    variant={variant}
                    showInlineMessage={showInlineMessage}
                    inlineTone={inlineTone}
                    presentation="static"
                    open
                    onClose={noop}
                    idPrefix={`static-${variant}`}
                  />
                </div>
              ))}
            </div>
          </div>
        }
        code={
          <ComponentLabCode>{`import {
  DialogModal,
  DialogModalInlineMessage,
} from '../components/molecules/DialogModal/DialogModal'

<DialogModal
  open={open}
  onClose={() => setOpen(false)}
  title="[Headline]"
  description={<>This is supporting text that may have a <strong>subject</strong> in bold.</>}
  size="lg"
  secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
  primaryAction={{ label: '[Action]', onClick: onConfirm }}
>
  <DialogModalInlineMessage tone="error">
    This is an error inline message.
  </DialogModalInlineMessage>
</DialogModal>

{/* Docs / gallery - no overlay */}
<DialogModal presentation="static" open onClose={() => {}} title="[Headline]" … />`}</ComponentLabCode>
        }
        usage={
          <>
            <section className={labUsageSectionClass}>
              <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
              <p className="m-0 text-[var(--screening-text-muted)]">
                Use dialog modals when the user must complete a single high-risk or focused task - confirm delete, add
                content, or submit a short form. Prefer inline messages over toasts for validation that stays with the
                dialog.
              </p>
            </section>
            <section className={labUsageSectionClass}>
              <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Variants</h4>
              <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
                <li>
                  <strong className="text-[var(--screening-text-primary)]">Action / Delete</strong>: copy + optional
                  inline message; Delete uses the danger primary.
                </li>
                <li>
                  <strong className="text-[var(--screening-text-primary)]">Dropdown / Form</strong>: one control, then
                  optional inline message.
                </li>
                <li>
                  <strong className="text-[var(--screening-text-primary)]">Extended Form</strong>: labeled picklists +
                  fields, then optional inline message.
                </li>
              </ul>
            </section>
          </>
        }
        variables={
          <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
            <li>
              Modal chrome - <code className="text-[var(--color-text-primary)]">--dialog-modal-*</code> (surface, XL
              shadow, FinScan primary, danger).
            </li>
            <li>
              Inline strip - <code className="text-[var(--color-text-primary)]">DialogModalInlineMessage</code> with{' '}
              <code className="text-[var(--color-text-primary)]">--ace-inline-message-*</code>.
            </li>
            <li>
              Static gallery - <code className="text-[var(--color-text-primary)]">presentation=&quot;static&quot;</code>
            </li>
          </ul>
        }
      />

      {liveVariant != null ? (
        <ModalChrome
          variant={liveVariant}
          showInlineMessage={showInlineMessage}
          inlineTone={inlineTone}
          presentation="overlay"
          open
          onClose={() => setLiveVariant(null)}
          idPrefix={`live-${liveVariant}`}
        />
      ) : null}
    </>
  )
}
