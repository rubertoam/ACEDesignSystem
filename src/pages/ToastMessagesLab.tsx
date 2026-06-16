import { useState } from 'react'
import { AceToast } from '../components/molecules/AceToast/AceToast'
import type { AceToastLayout, AceToastTone } from '../components/molecules/AceToast/toastFieldStyles'
import { LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const TONES: { value: AceToastTone; label: string }[] = [
  { value: 'success', label: 'Success' },
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
]

const LAYOUTS: { value: AceToastLayout; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'action', label: 'Action' },
  { value: 'double-action', label: 'Double action' },
  { value: 'multi-line', label: 'Multi-line' },
  { value: 'multi-line-action', label: 'Multi-line w/ action' },
  { value: 'multi-line-double-action', label: 'Multi-line w/ double action' },
]

const MULTI_LINE_COPY = [
  'Example of notification with multiple lines.',
  'Another line of information.',
  'Displaying a count of data: ##',
]

function toastCopy(
  tone: AceToastTone,
  layout: AceToastLayout,
): { message: string | string[]; title?: string } {
  if (layout.startsWith('multi-line')) {
    return { message: MULTI_LINE_COPY }
  }

  if (layout === 'default') {
    if (tone === 'success') {
      return {
        title: 'Success!',
        message: 'Example of a success message!',
      }
    }

    const simple: Record<Exclude<AceToastTone, 'success'>, string> = {
      info: 'Example of an info message.',
      warning: 'Example of a warning message.',
      error: 'Example of an error message.',
    }

    return { message: simple[tone] }
  }

  const actionCopy: Record<AceToastTone, string> = {
    success: 'Info message with an interaction.',
    info: 'Success message with interaction.',
    warning: 'Warning message with interaction.',
    error: 'Error message with interaction.',
  }

  return { message: actionCopy[tone] }
}

function DemoToast({
  tone,
  layout,
  onDismiss,
}: {
  tone: AceToastTone
  layout: AceToastLayout
  onDismiss?: () => void
}) {
  const copy = toastCopy(tone, layout)

  return (
    <AceToast
      tone={tone}
      layout={layout}
      title={'title' in copy ? copy.title : undefined}
      message={copy.message}
      onDismiss={onDismiss}
      onAction={() => undefined}
      onCancel={() => undefined}
      onConfirm={() => undefined}
    />
  )
}

export function ToastMessagesLab() {
  const [tone, setTone] = useState<AceToastTone>('success')
  const [layout, setLayout] = useState<AceToastLayout>('default')
  const [visible, setVisible] = useState(true)

  const toolbar = (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
      <LabSelect
        label="Tone"
        value={tone}
        onChange={(v) => {
          setTone(v as AceToastTone)
          setVisible(true)
        }}
        options={TONES.map(({ value, label }) => ({ value, label }))}
      />
      <LabSelect
        label="Layout"
        value={layout}
        onChange={(v) => {
          setLayout(v as AceToastLayout)
          setVisible(true)
        }}
        options={LAYOUTS.map(({ value, label }) => ({ value, label }))}
      />
    </div>
  )

  return (
    <ComponentLabPage
      title="Toast messages"
      description="Transient notification cards for success, info, warning, and error feedback (Figma Toast Messages 2783:5). Six layouts — default, action, double action, and multi-line variants — with dismiss, text actions, and confirm."
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-10">
          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            {visible ? (
              <DemoToast tone={tone} layout={layout} onDismiss={() => setVisible(false)} />
            ) : (
              <button
                type="button"
                className="text-sm text-[var(--screening-primary)] underline-offset-2 hover:underline"
                onClick={() => setVisible(true)}
              >
                Show toast again
              </button>
            )}
          </div>

          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>All tones — {LAYOUTS.find((l) => l.value === layout)?.label}</p>
            <div className="flex w-full max-w-[var(--ace-toast-width)] flex-col gap-4">
              {TONES.map((item) => (
                <DemoToast key={item.value} tone={item.value} layout={layout} />
              ))}
            </div>
          </div>

          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>All layouts — {TONES.find((t) => t.value === tone)?.label}</p>
            <div className="flex w-full max-w-[var(--ace-toast-width)] flex-col gap-4">
              {LAYOUTS.map((item) => (
                <DemoToast key={item.value} tone={tone} layout={item.value} />
              ))}
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Pass <code className="text-[var(--screening-text-primary)]">message</code> as a string or array for
            multi-line layouts. Use <code className="text-[var(--screening-text-primary)]">title</code> on the default
            success pattern.
          </p>
          <ComponentLabCode>{`import { AceToast } from '../components/molecules/AceToast/AceToast'

<AceToast
  tone="success"
  layout="default"
  title="Success!"
  message="Example of a success message!"
  onDismiss={() => hide()}
/>

<AceToast
  tone="warning"
  layout="multi-line-double-action"
  message={[
    'Example of notification with multiple lines.',
    'Another line of information.',
    'Displaying a count of data: ##',
  ]}
  onDismiss={() => hide()}
  onCancel={() => dismiss()}
  onConfirm={() => confirm()}
/>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use toasts for brief, non-blocking feedback after an action completes, a background process updates, or
              the user needs a lightweight confirmation. Keep copy short; use multi-line layouts only when the message
              truly needs extra detail.
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Tones</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">Success</strong> — completed actions
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Info</strong> — neutral context
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Warning</strong> — caution without failure
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Error</strong> — failed or blocked actions
              </li>
            </ul>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Toasts use <code className="text-[var(--screening-text-primary)]">role="status"</code>. Dismiss and action
              controls are native buttons with visible focus rings. Pair with live-region announcements in product flows
              when timing or persistence matters.
            </p>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Surface — <code className="text-[var(--color-text-primary)]">--ace-toast-bg</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toast-border</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-toast-shadow</code>
          </li>
          <li>
            Layout — <code className="text-[var(--color-text-primary)]">--ace-toast-width</code>, padding, gap, body
            indent
          </li>
          <li>
            Actions — <code className="text-[var(--color-text-primary)]">--ace-toast-action-text</code>, confirm button
            tokens
          </li>
          <li>
            Icons — <code className="text-[var(--color-text-primary)]">--ace-toast-icon-success</code> through error
          </li>
        </ul>
      }
    />
  )
}
