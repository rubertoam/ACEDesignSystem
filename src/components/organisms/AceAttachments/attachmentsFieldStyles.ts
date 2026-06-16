import { cn } from '../../../lib/cn'

export type AceAttachmentFileStatus = 'uploading' | 'queued' | 'failed' | 'complete'

const sectionLabelClass = cn(
  'm-0 [font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[var(--ace-attachments-label)]',
)

export const aceAttachmentsShellClass = cn(
  'flex w-full min-w-0 flex-col gap-[var(--ace-attachments-gap)]',
  'rounded-[var(--ace-attachments-radius)] border border-solid border-[var(--ace-attachments-border)]',
  'bg-[var(--ace-attachments-surface)] p-[var(--ace-attachments-padding)]',
)

export const aceAttachmentsTitleClass = cn(
  'm-0 [font:var(--ace-type-heading-h6-small-bold)] [letter-spacing:var(--ace-type-heading-h6-small-bold-tracking)]',
  'text-[var(--ace-attachments-title)]',
)

export const aceAttachmentsSectionLabelClass = sectionLabelClass

export const aceAttachmentsDropzoneClass = cn(
  'flex w-full min-w-0 flex-col gap-4',
  'rounded-[var(--ace-attachments-radius)] border border-dashed border-[var(--ace-attachments-dropzone-border)]',
  'bg-[var(--ace-attachments-dropzone-bg)] px-3 py-5',
)

export const aceAttachmentsDropzonePromptClass = cn(
  'flex min-w-0 flex-1 items-center gap-2',
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'text-[var(--ace-attachments-label)]',
)

export const aceAttachmentsUploadIconClass = 'size-4 shrink-0 text-[var(--ace-attachments-title)]'

export const aceAttachmentsUploadedHeaderClass = cn(
  'm-0 [font:var(--ace-type-footer-semi-bold)] [letter-spacing:var(--ace-type-footer-semi-bold-tracking)]',
  'text-[var(--ace-attachments-label)]',
)

export const aceAttachmentsDividerClass = 'h-px w-full shrink-0 bg-[var(--ace-attachments-divider)]'

export const aceAttachmentsFileRowClass = 'flex w-full min-w-0 items-center justify-between gap-3'

export const aceAttachmentsFileNameGroupClass = 'flex min-w-0 items-center gap-2'

export const aceAttachmentsFileIconClass = 'size-3 shrink-0 text-[var(--ace-attachments-muted)]'

export const aceAttachmentsFileNameClass = cn(
  'truncate [font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'text-[var(--ace-attachments-link)]',
)

export const aceAttachmentsFileMetaClass = cn(
  'shrink-0 [font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[var(--ace-attachments-muted)]',
)

export const aceAttachmentsStatusClass = cn(
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[var(--ace-attachments-status)]',
)

export const aceAttachmentsFailedStatusClass = cn(
  aceAttachmentsStatusClass,
  'text-[var(--ace-attachments-muted)]',
)

export const aceAttachmentsErrorIconClass = 'size-3 shrink-0 text-[var(--ace-attachments-error)]'

export const aceAttachmentsPanelClass = cn(
  'flex w-full min-w-0 flex-col gap-4',
  'rounded-[var(--ace-attachments-radius)] border border-solid border-[var(--ace-attachments-border)]',
  'bg-[var(--ace-attachments-panel-bg)] px-3 py-5',
)

export const aceAttachmentsLinkRowClass = cn(
  'flex w-full min-w-0 items-center justify-between gap-2',
  'rounded-[var(--ace-attachments-radius)] border border-solid border-[var(--ace-attachments-border)]',
  'bg-[var(--ace-attachments-surface)] px-2 py-1',
)

export const aceAttachmentsLinkTextClass = cn(
  'min-w-0 truncate [font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[var(--ace-attachments-link)]',
)

export const aceAttachmentsLinkIconClass = 'size-3 shrink-0 text-[var(--ace-attachments-title)]'

export const aceAttachmentsIconButtonClass = cn(
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0',
  'text-[var(--ace-attachments-muted)] outline-none transition-colors',
  'hover:text-[var(--ace-attachments-error)]',
  'focus-visible:rounded-[var(--radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
  'focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
  'disabled:cursor-not-allowed disabled:opacity-50',
)

export const aceAttachmentsActionsRowClass = 'flex w-full items-center justify-end'
