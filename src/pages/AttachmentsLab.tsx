import { useMemo, useState } from 'react'
import {
  Attachments,
  DEMO_ATTACHMENT_FILES,
  DEMO_ATTACHMENT_LINKS,
  type AttachmentFile,
  type AttachmentLink,
} from '../components/organisms/Attachments/Attachments'
import { labComponentContainerClass } from '../lib/labChrome'
import { labExampleSectionClass, labSectionLabelClass, labStaticExampleGroupClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabPage } from './ComponentLabPage'
import { attachmentsLabCode, attachmentsLabQa, attachmentsLabUsage } from './labTabDocs'
function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function AttachmentsLab() {
  const [files, setFiles] = useState<AttachmentFile[]>([])
  const [links, setLinks] = useState<AttachmentLink[]>([])
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
      qa={attachmentsLabQa}
      title="Attachments"
      description="File upload dropzone and URL linking pattern for case workflows (Figma Attachments 3313:156). Built from Button, Input, and ACE typography tokens."
      examplesCanvas={false}
      examples={
        <div className="space-y-10">
          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Interactive</p>
            <div className={cn(labComponentContainerClass, 'w-1/2 min-w-0 max-w-full')}>
              <Attachments {...interactiveProps} />
            </div>
          </div>

          <div className={cn('w-full', labExampleSectionClass)}>
            <p className={labSectionLabelClass}>Static examples</p>
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
          </div>
        </div>
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
