import {
  AlertCircle,
  CloudUpload,
  FileText,
  Link2,
  Trash2,
} from 'lucide-react'
import { useId, useRef, type DragEvent } from 'react'
import { AceButton } from '../../atoms/AceButton'
import { AceInputField } from '../../atoms/AceInputField'
import { cn } from '../../../lib/cn'
import {
  aceAttachmentsActionsRowClass,
  aceAttachmentsDividerClass,
  aceAttachmentsDropzoneClass,
  aceAttachmentsDropzonePromptClass,
  aceAttachmentsErrorIconClass,
  aceAttachmentsFailedStatusClass,
  aceAttachmentsFileIconClass,
  aceAttachmentsFileMetaClass,
  aceAttachmentsFileNameClass,
  aceAttachmentsFileNameGroupClass,
  aceAttachmentsFileRowClass,
  aceAttachmentsIconButtonClass,
  aceAttachmentsLinkIconClass,
  aceAttachmentsLinkRowClass,
  aceAttachmentsLinkTextClass,
  aceAttachmentsPanelClass,
  aceAttachmentsSectionLabelClass,
  aceAttachmentsShellClass,
  aceAttachmentsStatusClass,
  aceAttachmentsTitleClass,
  aceAttachmentsUploadIconClass,
  aceAttachmentsUploadedHeaderClass,
  type AceAttachmentFileStatus,
} from './attachmentsFieldStyles'

export type AceAttachmentFile = {
  id: string
  name: string
  sizeLabel?: string
  status: AceAttachmentFileStatus
}

export type AceAttachmentLink = {
  id: string
  url: string
}

export type AceAttachmentsProps = {
  files?: AceAttachmentFile[]
  links?: AceAttachmentLink[]
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

const STATUS_LABELS: Record<AceAttachmentFileStatus, string | null> = {
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
  file: AceAttachmentFile
  onRemove?: (id: string) => void
  disabled?: boolean
}) {
  const statusLabel = STATUS_LABELS[file.status]
  const showSize = file.status === 'failed' || file.status === 'complete'

  return (
    <div className={aceAttachmentsFileRowClass}>
      <div className={aceAttachmentsFileNameGroupClass}>
        <FileText className={aceAttachmentsFileIconClass} strokeWidth={2} aria-hidden />
        <span className={aceAttachmentsFileNameClass}>{file.name}</span>
        {showSize && file.sizeLabel ? (
          <span className={aceAttachmentsFileMetaClass}>{file.sizeLabel}</span>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {statusLabel ? (
          <span
            className={cn(
              file.status === 'failed' ? aceAttachmentsFailedStatusClass : aceAttachmentsStatusClass,
            )}
          >
            {statusLabel}
          </span>
        ) : null}
        {file.status === 'failed' ? (
          <AlertCircle className={aceAttachmentsErrorIconClass} strokeWidth={2} aria-hidden />
        ) : null}
        {file.status === 'complete' ? (
          <button
            type="button"
            className={aceAttachmentsIconButtonClass}
            aria-label={`Remove ${file.name}`}
            disabled={disabled}
            onClick={() => onRemove?.(file.id)}
          >
            <Trash2 className="size-3" strokeWidth={2} aria-hidden />
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
  link: AceAttachmentLink
  onRemove?: (id: string) => void
  disabled?: boolean
}) {
  return (
    <div className={aceAttachmentsLinkRowClass}>
      <div className="flex min-w-0 items-center gap-2">
        <Link2 className={aceAttachmentsLinkIconClass} strokeWidth={2} aria-hidden />
        <span className={aceAttachmentsLinkTextClass}>{link.url}</span>
      </div>
      <button
        type="button"
        className={aceAttachmentsIconButtonClass}
        aria-label={`Remove link ${link.url}`}
        disabled={disabled}
        onClick={() => onRemove?.(link.id)}
      >
        <Trash2 className="size-3" strokeWidth={2} aria-hidden />
      </button>
    </div>
  )
}

export function AceAttachments({
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
}: AceAttachmentsProps) {
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
    <section className={cn(aceAttachmentsShellClass, className)} aria-label="Attachments">
      <h2 className={aceAttachmentsTitleClass}>Attachments</h2>

      <div className="flex w-full min-w-0 flex-col gap-3">
        <p className={aceAttachmentsSectionLabelClass}>Upload Files</p>

        <div
          className={aceAttachmentsDropzoneClass}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <div className="flex w-full min-w-0 items-center justify-between gap-3">
            <div className={aceAttachmentsDropzonePromptClass}>
              <CloudUpload className={aceAttachmentsUploadIconClass} strokeWidth={2} aria-hidden />
              <span>Drag and drop files here or upload</span>
            </div>
            <AceButton
              type="button"
              variant="primary"
              palette="purple"
              size="sm"
              disabled={disabled}
              onClick={openFilePicker}
            >
              Upload
            </AceButton>
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
                <p className={aceAttachmentsUploadedHeaderClass}>Uploaded Files</p>
                <div className={aceAttachmentsDividerClass} role="presentation" />
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
        <p className={aceAttachmentsSectionLabelClass}>Link URL</p>

        <div className={aceAttachmentsPanelClass}>
          {links.map((link) => (
            <AttachmentLinkRow
              key={link.id}
              link={link}
              disabled={disabled}
              onRemove={onRemoveLink}
            />
          ))}

          <AceInputField
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

          <div className={aceAttachmentsActionsRowClass}>
            <AceButton
              type="button"
              variant="primary"
              palette="purple"
              size="sm"
              disabled={disabled || !urlDraft.trim()}
              onClick={onAddUrl}
            >
              Add URL
            </AceButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export const DEMO_ATTACHMENT_FILES: AceAttachmentFile[] = [
  { id: 'file-1', name: 'filename2.pdf', status: 'uploading' },
  { id: 'file-2', name: 'filename3.pdf', status: 'queued' },
  { id: 'file-3', name: 'filename4.pdf', sizeLabel: '64mb', status: 'failed' },
  { id: 'file-4', name: 'paymentfile1.pdf', sizeLabel: '40mb', status: 'complete' },
  { id: 'file-5', name: 'paymentfile2.pdf', sizeLabel: '51mb', status: 'complete' },
]

export const DEMO_ATTACHMENT_LINKS: AceAttachmentLink[] = [
  { id: 'link-1', url: 'www.finscan.com/paymentmatches' },
  { id: 'link-2', url: 'www.dowjones.com/watchlists' },
]
