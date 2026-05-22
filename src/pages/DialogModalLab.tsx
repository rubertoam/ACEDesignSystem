import { useState } from 'react'
import { AceInputField } from '../components/atoms/AceInputField'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { DialogModal, DialogModalInlineError } from '../components/molecules/DialogModal/DialogModal'

const FIGMA_DIALOG_URL =
  'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=3047-2036&m=dev'

export function DialogModalLab() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  const previewToolbar = (
    <p className="m-0 max-w-xl text-xs leading-relaxed text-[var(--color-text-muted)]">
      Open sample modals below. Layout, tokens, and buttons follow the ACE dialog pattern.
    </p>
  )

  return (
    <>
      <ComponentLabPage
        title="Dialog modal"
        description="ACE dialog modal — headline, close control, supporting copy, optional inline error, and right-aligned Cancel + primary actions (default or danger)."
        figmaUrl={FIGMA_DIALOG_URL}
        figmaLinkLabel="Dialog modals in Figma"
        examplesToolbar={previewToolbar}
        examples={
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setBasicOpen(true)}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-background)]"
            >
              Basic / Action
            </button>
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-background)]"
            >
              Basic / Delete
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--color-background)]"
            >
              Basic / Form
            </button>
          </div>
        }
        code={
          <ComponentLabCode>{`import { DialogModal, DialogModalInlineError } from '../components/molecules/DialogModal/DialogModal'

<DialogModal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm"
  description="Are you sure?"
  size="lg"
  secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
  primaryAction={{ label: 'Continue', onClick: onConfirm }}
>
  <DialogModalInlineError>Something went wrong.</DialogModalInlineError>
</DialogModal>`}</ComponentLabCode>
        }
        usage={
          <p className="m-0 text-[var(--color-text-muted)]">
            Use <code className="text-[var(--color-text-primary)]">DialogModal</code> for overlays that need a decision. Pass{' '}
            <code className="text-[var(--color-text-primary)]">secondaryAction</code> and{' '}
            <code className="text-[var(--color-text-primary)]">primaryAction</code> for the standard button row, or{' '}
            <code className="text-[var(--color-text-primary)]">footer</code> for a custom footer.
          </p>
        }
        variables={
          <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
            <li>
              Modal chrome uses <code className="text-[var(--color-text-primary)]">--dialog-modal-*</code> in{' '}
              <code className="text-[var(--color-text-primary)]">variables.css</code> (surface, border, shadow, FinScan primary #3D2E8A, danger #DC264B, inline error
              strip).
            </li>
            <li>
              Typography uses ACE tokens: heading H6 bold for the title, Paragraph P1 for body and button labels, Caption for inline error text.
            </li>
          </ul>
        }
      />

      <DialogModal
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="[Headline]"
        description={
          <>
            This is supporting text that may have a <strong className="font-semibold">subject</strong> in bold.
          </>
        }
        size="lg"
        secondaryAction={{ label: 'Cancel', onClick: () => setBasicOpen(false) }}
        primaryAction={{ label: '[Action]', onClick: () => setBasicOpen(false) }}
      >
        <DialogModalInlineError>This is an error inline message.</DialogModalInlineError>
      </DialogModal>

      <DialogModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="[Headline]"
        description={
          <>
            This is supporting text that may have a <strong className="font-semibold">subject</strong> in bold.
          </>
        }
        size="lg"
        secondaryAction={{ label: 'Cancel', onClick: () => setDeleteOpen(false) }}
        primaryAction={{ label: 'Delete', variant: 'danger', onClick: () => setDeleteOpen(false) }}
      >
        <DialogModalInlineError>This is an error inline message.</DialogModalInlineError>
      </DialogModal>

      <DialogModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="[Headline]"
        description={
          <>
            This is supporting text that may have a <strong className="font-semibold">subject</strong> in bold.
          </>
        }
        size="lg"
        secondaryAction={{ label: 'Cancel', onClick: () => setFormOpen(false) }}
        primaryAction={{ label: '[Action]', onClick: () => setFormOpen(false) }}
      >
        <AceInputField
          label="Label"
          fieldSize="md"
          defaultValue="[Sample text]"
          id="dialog-modal-lab-sample"
        />
        <DialogModalInlineError>This is an error inline message.</DialogModalInlineError>
      </DialogModal>
    </>
  )
}
