import { useState } from 'react'
import { InlineMessage } from '../components/molecules/InlineMessage/InlineMessage'
import {
  INLINE_MESSAGE_TONES,
  type InlineMessageTone,
} from '../components/molecules/InlineMessage/inlineMessageFieldStyles'
import { LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'


import { inlineMessageLabQa } from './labTabDocs'
const TONE_LABELS: Record<InlineMessageTone, string> = {
  error: 'Error',
  success: 'Success',
  info: 'Info',
  warning: 'Warning',
}

const TONE_COPY: Record<InlineMessageTone, string> = {
  error: 'This is an error inline message.',
  success: 'This is a success inline message.',
  info: 'This is a user info inline message.',
  warning: 'This is a warning inline message.',
}

export function InlineMessagesLab() {
  const [tone, setTone] = useState<InlineMessageTone>('error')

  const toolbar = (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
      <LabSelect
        label="Tone"
        value={tone}
        onChange={(v) => setTone(v as InlineMessageTone)}
        options={INLINE_MESSAGE_TONES.map((value) => ({
          value,
          label: TONE_LABELS[value],
        }))}
      />
    </div>
  )

  return (
    <ComponentLabPage
      qa={inlineMessageLabQa}
      title="Inline messages"
      description="In-page and banner alerts for error, information, success, and warning feedback (Figma Inline Messages 4481:275). Uses the same Material status icons as Toast messages and the Iconography catalog."
      examplesToolbar={toolbar}
      examples={
        <div className="space-y-10">
          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>{TONE_LABELS[tone]}</p>
            <InlineMessage tone={tone} className="max-w-xl">
              {TONE_COPY[tone]}
            </InlineMessage>
          </div>

          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>All tones</p>
            <div className="grid w-full gap-6 sm:grid-cols-2">
              {INLINE_MESSAGE_TONES.map((item) => (
                <div key={item} className="space-y-2">
                  <p className="m-0 text-xs text-[var(--color-text-muted)]">{TONE_LABELS[item]} message</p>
                  <InlineMessage tone={item}>{TONE_COPY[item]}</InlineMessage>
                </div>
              ))}
            </div>
          </div>

          <div className={cn('items-start', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Banner width</p>
            <InlineMessage tone={tone}>{TONE_COPY[tone]}</InlineMessage>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Prefer inline messages for persistent context next to the content they describe. Use toasts for brief,
            transient feedback.
          </p>
          <ComponentLabCode>{`import { InlineMessage } from '../components/molecules/InlineMessage/InlineMessage'

<InlineMessage tone="error">
  This is an error inline message.
</InlineMessage>

<InlineMessage tone="info">
  This is a user info inline message.
</InlineMessage>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use inline messages (or banners) when feedback should stay visible until the user resolves the related
              content - form validation summaries, page-level notices, and contextual warnings. Keep copy to one short
              sentence.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Tones</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">Error</strong>: failures and blocking issues (
                <code className="text-[var(--screening-text-primary)]">error</code>)
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Info</strong>: neutral guidance (
                <code className="text-[var(--screening-text-primary)]">info</code>)
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Success</strong>: completed or confirmed state (
                <code className="text-[var(--screening-text-primary)]">check_circle</code>)
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Warning</strong>: caution without failure (
                <code className="text-[var(--screening-text-primary)]">warning</code>)
              </li>
            </ul>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Error tone defaults to <code className="text-[var(--screening-text-primary)]">role="alert"</code>; other
              tones use <code className="text-[var(--screening-text-primary)]">role="status"</code>. Override{' '}
              <code className="text-[var(--screening-text-primary)]">role</code> when the surrounding live region already
              handles announcement.
            </p>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Layout - <code className="text-[var(--color-text-primary)]">--inline-message-radius</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--inline-message-px</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--inline-message-py</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--inline-message-gap</code>
          </li>
          <li>
            Text - <code className="text-[var(--color-text-primary)]">--inline-message-text</code> (Caption Regular)
          </li>
          <li>
            Tones - <code className="text-[var(--color-text-primary)]">--inline-message-*-bg</code>,{' '}
            <code className="text-[var(--color-text-primary)]">*-border</code>,{' '}
            <code className="text-[var(--color-text-primary)]">*-icon</code> for error, success, info, warning
          </li>
          <li>
            Icons - Material Symbols <code className="text-[var(--color-text-primary)]">error</code>,{' '}
            <code className="text-[var(--color-text-primary)]">check_circle</code>,{' '}
            <code className="text-[var(--color-text-primary)]">info</code>,{' '}
            <code className="text-[var(--color-text-primary)]">warning</code> (same set as Toast messages)
          </li>
        </ul>
      }

      changelog={
        <div className="space-y-8">
          <article className="space-y-3">
            <header className="space-y-1">
              <h3 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">22 October 2026</h3>
              <p className="m-0 text-sm text-[var(--color-text-muted)]">
                Figma-aligned naming - <code className="text-[var(--color-text-primary)]">AceInlineMessage</code> →{' '}
                <code className="text-[var(--color-text-primary)]">InlineMessage</code>.
              </p>
            </header>
            <ul className="m-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>
                CSS vars are now <code className="text-[var(--color-text-primary)]">--inline-message-*</code> (radius
                → <code className="text-[var(--color-text-primary)]">--radius-component-inline-message</code>).
              </li>
              <li>
                Temporary compat: <code className="text-[var(--color-text-primary)]">AceInlineMessage</code> export and{' '}
                <code className="text-[var(--color-text-primary)]">--ace-inline-message-*</code> aliases still resolve.
              </li>
            </ul>
          </article>
        </div>
      }
    />
  )
}
