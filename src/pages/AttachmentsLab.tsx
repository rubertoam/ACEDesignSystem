import { useMemo, useState } from 'react'
import {
  AceAttachments,
  DEMO_ATTACHMENT_FILES,
  DEMO_ATTACHMENT_LINKS,
  type AceAttachmentFile,
  type AceAttachmentLink,
} from '../components/organisms/AceAttachments/AceAttachments'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labStaticExampleGroupClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function AttachmentsLab() {
  const [files, setFiles] = useState<AceAttachmentFile[]>([])
  const [links, setLinks] = useState<AceAttachmentLink[]>([])
  const [urlDraft, setUrlDraft] = useState('')

  const interactiveProps = useMemo(
    () => ({
      files,
      links,
      urlDraft,
      onUrlDraftChange: setUrlDraft,
      onFilesSelected: (fileList: FileList) => {
        const next = Array.from(fileList).map((file) => ({
          id: createId('upload'),
          name: file.name,
          status: 'complete' as const,
          sizeLabel: file.size ? `${Math.max(1, Math.round(file.size / (1024 * 1024)))}mb` : undefined,
        }))
        setFiles((current) => [...current, ...next])
      },
      onAddUrl: () => {
        const trimmed = urlDraft.trim()
        if (!trimmed) return
        setLinks((current) => [...current, { id: createId('link'), url: trimmed }])
        setUrlDraft('')
      },
      onRemoveFile: (id: string) => setFiles((current) => current.filter((file) => file.id !== id)),
      onRemoveLink: (id: string) => setLinks((current) => current.filter((link) => link.id !== id)),
    }),
    [files, links, urlDraft],
  )

  return (
    <ComponentLabPage
      title="Attachments"
      description="File upload dropzone and URL linking pattern for case workflows (Figma Attachments 3313:156). Built from AceButton, AceInputField, and ACE typography tokens."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            <div className={cn(labComponentContainerClass, 'w-1/2 min-w-0 max-w-full')}>
              <AceAttachments {...interactiveProps} />
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Static examples</p>
            <div className={labComponentContainerClass}>
              <div className="grid w-full min-w-0 gap-8 lg:grid-cols-2 lg:items-start">
                <div className={labStaticExampleGroupClass}>
                  <p className="m-0 text-xs font-semibold text-[var(--screening-text-muted)]">Empty</p>
                  <AceAttachments />
                </div>

                <div className={labStaticExampleGroupClass}>
                  <p className="m-0 text-xs font-semibold text-[var(--screening-text-muted)]">Active</p>
                  <AceAttachments
                    files={DEMO_ATTACHMENT_FILES}
                    links={DEMO_ATTACHMENT_LINKS}
                    urlDraft=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Control file rows and links with arrays. Wire upload and URL actions to your API; the organism handles
            layout and status presentation only.
          </p>
          <ComponentLabCode>{`import {
  AceAttachments,
  DEMO_ATTACHMENT_FILES,
  DEMO_ATTACHMENT_LINKS,
} from '../components/organisms/AceAttachments/AceAttachments'

<AceAttachments
  files={files}
  links={links}
  urlDraft={urlDraft}
  onUrlDraftChange={setUrlDraft}
  onFilesSelected={handleFiles}
  onAddUrl={handleAddUrl}
  onRemoveFile={removeFile}
  onRemoveLink={removeLink}
/>

<AceAttachments
  files={DEMO_ATTACHMENT_FILES}
  links={DEMO_ATTACHMENT_LINKS}
/>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use when users need to attach supporting documents and external reference links to a record. The dropzone
              supports drag-and-drop and the Upload button; URL links are added through the caption input and Add URL
              action.
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">File statuses</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">Uploading / Queued</strong>: in-progress
                transfer
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Failed</strong>: error with alert icon
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Complete</strong>: removable with trash
                control
              </li>
            </ul>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Shell - <code className="text-[var(--color-text-primary)]">--ace-attachments-border</code>, padding, gap
          </li>
          <li>
            Typography - H6 Small Bold title, footer labels, caption file names
          </li>
          <li>
            Dropzone - dashed primary border on{' '}
            <code className="text-[var(--color-text-primary)]">--ace-attachments-dropzone-bg</code>
          </li>
          <li>
            Status - link and progress text use{' '}
            <code className="text-[var(--color-text-primary)]">--ace-attachments-status</code>; errors use{' '}
            <code className="text-[var(--color-text-primary)]">--ace-attachments-error</code>
          </li>
        </ul>
      }
    />
  )
}
