import {
  Attachments,
  DEMO_ATTACHMENT_FILES,
  DEMO_ATTACHMENT_LINKS,
} from '../components/organisms/Attachments/Attachments'
import { labComponentContainerClass } from '../lib/labChrome'
import { labStaticExampleGroupClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabPage } from './ComponentLabPage'
import { attachmentsLabCode, attachmentsLabQa, attachmentsLabUsage } from './labTabDocs'

export function AttachmentsLab() {
  return (
    <ComponentLabPage
      qa={attachmentsLabQa}
      title="Attachments"
      description="File upload dropzone and URL linking pattern for case workflows (Figma Attachments 3313:156). Built from Button, Input, and ACE typography tokens."
      examplesCanvas={false}
      examples={
        <section className="space-y-5">
          <div className={cn('w-full min-w-0', labUsageSectionClass)}>
            <h4 className="m-0 text-base font-semibold text-[var(--color-text-primary)]">Static reference</h4>
            <p className="m-0 w-full text-sm leading-relaxed text-[var(--color-text-muted)]">
              Empty and populated states from the Figma Attachments set.
            </p>
          </div>
          <div className={labComponentContainerClass}>
            <div className="grid w-full min-w-0 gap-8 lg:grid-cols-2 lg:items-start">
              <div className={labStaticExampleGroupClass}>
                <p className="m-0 text-xs font-semibold text-[var(--screening-text-muted)]">Empty</p>
                <Attachments />
              </div>

              <div className={labStaticExampleGroupClass}>
                <p className="m-0 text-xs font-semibold text-[var(--screening-text-muted)]">Active</p>
                <Attachments
                  files={DEMO_ATTACHMENT_FILES}
                  links={DEMO_ATTACHMENT_LINKS}
                  urlDraft=""
                />
              </div>
            </div>
          </div>
        </section>
      }
      code={attachmentsLabCode}
      usage={attachmentsLabUsage}
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Shell - <code className="text-[var(--color-text-primary)]">--attachments-border</code>, padding, gap
          </li>
          <li>
            Typography - H6 Small Bold title, footer labels, caption file names
          </li>
          <li>
            Dropzone - dashed primary border on{' '}
            <code className="text-[var(--color-text-primary)]">--attachments-dropzone-bg</code>
          </li>
          <li>
            Status - link and progress text use{' '}
            <code className="text-[var(--color-text-primary)]">--attachments-status</code>; errors use{' '}
            <code className="text-[var(--color-text-primary)]">--attachments-error</code>
          </li>
        </ul>
      }
    />
  )
}
