import { useId, useRef, type DragEvent } from 'react'
import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import { MaterialSymbol } from '../../molecules/Accordion/MaterialSymbol'
import { cn } from '../../../lib/cn'
import {
  attachmentsActionsRowClass,
  attachmentsDeleteIconClass,
  attachmentsDividerClass,
  attachmentsDropzoneClass,
  attachmentsDropzonePromptClass,
  attachmentsErrorIconClass,
  attachmentsFailedStatusClass,
  attachmentsFileIconClass,
  attachmentsFileMetaClass,
  attachmentsFileNameClass,
  attachmentsFileNameGroupClass,
  attachmentsFileRowClass,
  attachmentsIconButtonClass,
  attachmentsLinkIconClass,
  attachmentsLinkRowClass,
  attachmentsLinkTextClass,
  attachmentsPanelClass,
  attachmentsSectionLabelClass,
  attachmentsShellClass,
  attachmentsStatusClass,
  attachmentsStatusGroupClass,
  attachmentsTitleClass,
  attachmentsUploadIconClass,
  attachmentsUploadedHeaderClass,
  type AttachmentFileStatus,
} from './attachmentsFieldStyles'

export type AttachmentFile = {
  id: string
  name: string
  sizeLabel?: string
  status: AttachmentFileStatus
}

export type AttachmentLink = {
  id: string
  url: string
}

export type AttachmentsProps = {
  files?: AttachmentFile[]
  links?: AttachmentLink[]
  urlDraft?: string
  onUrlDraftChange?: (value: string) => void
  onUploadClick?: () => void
  onFilesSelected?: (files: FileList) => void
  onAddUrl?: () => void
  onRemoveFile?: (id: string) => void
  onRemoveLink?: (id: string) => void
  className?: string
  disabled?: boolean
  accept?: string
  multiple?: boolean
}

const STATUS_LABELS: Record<AttachmentFileStatus, string | null> = {
  uploading: 'Uploading...',
  queued: 'Queued...',
  failed: 'Failed',
  complete: null,
}

function AttachmentFileRow({
  file,
  onRemove,
  disabled,
}: {
  file: AttachmentFile
  onRemove?: (id: string) => void
  disabled?: boolean
}) {
  const statusLabel = STATUS_LABELS[file.status]
  const showSize = file.status === 'failed' || file.status === 'complete'

  return (
    <div className={attachmentsFileRowClass}>
      <div className={attachmentsFileNameGroupClass}>
        <MaterialSymbol name="draft" size="sm" className={attachmentsFileIconClass} />
        <span className={attachmentsFileNameClass}>{file.name}</span>
        {showSize && file.sizeLabel ? (
          <span className={attachmentsFileMetaClass}>{file.sizeLabel}</span>
        ) : null}
      </div>

      <div className={attachmentsStatusGroupClass}>
        {statusLabel ? (
          <span
            className={cn(
              file.status === 'failed' ? attachmentsFailedStatusClass : attachmentsStatusClass,
            )}
          >
            {statusLabel}
          </span>
        ) : null}
        {file.status === 'failed' ? (
          <MaterialSymbol name="error" size="sm" className={attachmentsErrorIconClass} />
        ) : null}
        {file.status === 'complete' ? (
          <button
            type="button"
            className={attachmentsIconButtonClass}
            aria-label={`Remove ${file.name}`}
            disabled={disabled}
            onClick={() => onRemove?.(file.id)}
          >
            <MaterialSymbol name="delete" size="sm" className={attachmentsDeleteIconClass} />
          </button>
        ) : null}
      </div>
    </div>
  )
}

function AttachmentLinkRow({
  link,
  onRemove,
  disabled,
}: {
  link: AttachmentLink
  onRemove?: (id: string) => void
  disabled?: boolean
}) {
  return (
    <div className={attachmentsLinkRowClass}>
      <div className="flex min-w-0 items-center gap-2">
        <MaterialSymbol name="link" size="sm" className={attachmentsLinkIconClass} />
        <span className={attachmentsLinkTextClass}>{link.url}</span>
      </div>
      <button
        type="button"
        className={attachmentsIconButtonClass}
        aria-label={`Remove link ${link.url}`}
        disabled={disabled}
        onClick={() => onRemove?.(link.id)}
      >
        <MaterialSymbol name="delete" size="sm" className={attachmentsDeleteIconClass} />
      </button>
    </div>
  )
}

export function Attachments({
  files = [],
  links = [],
  urlDraft = '',
  onUrlDraftChange,
  onUploadClick,
  onFilesSelected,
  onAddUrl,
  onRemoveFile,
  onRemoveLink,
  className,
  disabled = false,
  accept,
  multiple = true,
}: AttachmentsProps) {
  const fileInputId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hasFiles = files.length > 0

  const openFilePicker = () => {
    if (disabled) return
    onUploadClick?.()
    fileInputRef.current?.click()
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0 || disabled) return
    onFilesSelected?.(fileList)
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (disabled) return
    handleFiles(event.dataTransfer.files)
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <section className={cn(attachmentsShellClass, className)} aria-label="Attachments">
      <h2 className={attachmentsTitleClass}>Attachments</h2>

      <div className="flex w-full min-w-0 flex-col gap-3">
        <p className={attachmentsSectionLabelClass}>Upload Files</p>

        <div
          className={attachmentsDropzoneClass}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <div className="flex w-full min-w-0 items-center justify-between gap-3">
            <div className={attachmentsDropzonePromptClass}>
              <MaterialSymbol name="cloud_upload" size="md" className={attachmentsUploadIconClass} />
              <span className="min-w-0 leading-none">Drag and drop files here or upload</span>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={disabled}
              onClick={openFilePicker}
            >
              Upload
            </Button>
          </div>

          <input
            ref={fileInputRef}
            id={fileInputId}
            type="file"
            className="sr-only"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={(event) => {
              handleFiles(event.target.files)
              event.target.value = ''
            }}
          />

          {hasFiles ? (
            <div className="flex w-full min-w-0 flex-col gap-2">
              <div className="flex flex-col gap-1">
                <p className={attachmentsUploadedHeaderClass}>Uploaded Files</p>
                <div className={attachmentsDividerClass} role="presentation" />
              </div>
              <div className="flex w-full min-w-0 flex-col gap-2">
                {files.map((file) => (
                  <AttachmentFileRow
                    key={file.id}
                    file={file}
                    disabled={disabled}
                    onRemove={onRemoveFile}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-2">
        <p className={attachmentsSectionLabelClass}>Link URL</p>

        <div className={attachmentsPanelClass}>
          {links.map((link) => (
            <AttachmentLinkRow
              key={link.id}
              link={link}
              disabled={disabled}
              onRemove={onRemoveLink}
            />
          ))}

          <Input
            fieldSize="sm"
            placeholder="Paste URL here"
            value={urlDraft}
            disabled={disabled}
            onChange={(event) => onUrlDraftChange?.(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                onAddUrl?.()
              }
            }}
            aria-label="Paste URL here"
          />

          <div className={attachmentsActionsRowClass}>
            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={disabled || !urlDraft.trim()}
              onClick={onAddUrl}
            >
              Add URL
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const DEMO_ATTACHMENT_FILES: AttachmentFile[] = [
  { id: 'file-1', name: 'filename2.pdf', status: 'uploading' },
  { id: 'file-2', name: 'filename3.pdf', status: 'queued' },
  { id: 'file-3', name: 'filename4.pdf', sizeLabel: '64mb', status: 'failed' },
  { id: 'file-4', name: 'paymentfile1.pdf', sizeLabel: '40mb', status: 'complete' },
  { id: 'file-5', name: 'paymentfile2.pdf', sizeLabel: '51mb', status: 'complete' },
]

export const DEMO_ATTACHMENT_LINKS: AttachmentLink[] = [
  { id: 'link-1', url: 'www.finscan.com/paymentmatches' },
  { id: 'link-2', url: 'www.dowjones.com/watchlists' },
]
