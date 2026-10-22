import { cn } from '../../../lib/cn'

export type AttachmentFileStatus = 'uploading' | 'queued' | 'failed' | 'complete'

const sectionLabelClass = cn(
  'm-0 [font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'text-[var(--attachments-label)]',
)

/** Centers Material Symbol glyphs in a fixed box (avoids size-* fighting font-size). */
const iconGlyphBox = 'inline-flex shrink-0 items-center justify-center leading-none'

export const attachmentsShellClass = cn(
  'flex w-full min-w-0 flex-col gap-[var(--attachments-gap)]',
  'rounded-[var(--attachments-radius)] border border-solid border-[var(--attachments-border)]',
  'bg-[var(--attachments-surface)] p-[var(--attachments-padding)]',
)

export const attachmentsTitleClass = cn(
  'm-0 [font:var(--ace-type-heading-h6-small-bold)] [letter-spacing:var(--ace-type-heading-h6-small-bold-tracking)]',
  'text-[var(--attachments-title)]',
)

export const attachmentsSectionLabelClass = sectionLabelClass

export const attachmentsDropzoneClass = cn(
  'flex w-full min-w-0 flex-col gap-4',
  'rounded-[var(--attachments-radius)] border border-dashed border-[var(--attachments-dropzone-border)]',
  'bg-[var(--attachments-dropzone-bg)] px-3 py-5',
)

export const attachmentsDropzonePromptClass = cn(
  'flex min-w-0 flex-1 items-center gap-2',
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'text-[var(--attachments-label)]',
)

/** Dropzone cloud — 16px glyph in 16px box (Figma ~24×16 asset optical). */
export const attachmentsUploadIconClass = cn(
  iconGlyphBox,
  'size-4 text-[var(--attachments-title)]',
)

export const attachmentsUploadedHeaderClass = cn(
  'm-0 [font:var(--ace-type-footer-semi-bold)] [letter-spacing:var(--ace-type-footer-semi-bold-tracking)]',
  'text-[var(--attachments-label)]',
)

export const attachmentsDividerClass = 'h-px w-full shrink-0 bg-[var(--attachments-divider)]'

export const attachmentsFileRowClass = 'flex w-full min-w-0 items-center justify-between gap-3'

export const attachmentsFileNameGroupClass = 'flex min-w-0 items-center gap-2'

/** File / document — 12px glyph (Figma ~10×12.5). */
export const attachmentsFileIconClass = cn(
  iconGlyphBox,
  'size-3 text-[var(--attachments-muted)]',
)

export const attachmentsFileNameClass = cn(
  'truncate [font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]',
  'leading-none text-[var(--attachments-link)]',
)

export const attachmentsFileMetaClass = cn(
  'shrink-0 [font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'leading-none text-[var(--attachments-muted)]',
)

export const attachmentsStatusClass = cn(
  '[font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'leading-none text-[var(--attachments-status)]',
)

export const attachmentsFailedStatusClass = cn(
  attachmentsStatusClass,
  'text-[var(--attachments-muted)]',
)

export const attachmentsStatusGroupClass = 'flex shrink-0 items-center gap-1'

/** Failed indicator — 12px. */
export const attachmentsErrorIconClass = cn(
  iconGlyphBox,
  'size-3 text-[var(--attachments-error)]',
)

export const attachmentsPanelClass = cn(
  'flex w-full min-w-0 flex-col gap-4',
  'rounded-[var(--attachments-radius)] border border-solid border-[var(--attachments-border)]',
  'bg-[var(--attachments-panel-bg)] px-3 py-5',
)

export const attachmentsLinkRowClass = cn(
  'flex w-full min-w-0 items-center justify-between gap-2',
  'rounded-[var(--attachments-radius)] border border-solid border-[var(--attachments-border)]',
  'bg-[var(--attachments-surface)] px-2 py-1.5',
)

export const attachmentsLinkTextClass = cn(
  'min-w-0 truncate [font:var(--ace-type-footer-regular)] [letter-spacing:var(--ace-type-footer-regular-tracking)]',
  'leading-none text-[var(--attachments-link)]',
)

/** Link chain — 12px. */
export const attachmentsLinkIconClass = cn(
  iconGlyphBox,
  'size-3 text-[var(--attachments-title)]',
)

/** Trash control — fixed hit target, glyph centered. */
export const attachmentsIconButtonClass = cn(
  'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border-0 bg-transparent p-0',
  'text-[var(--attachments-muted)] outline-none',
  'transition-[color,background-color,box-shadow] duration-[var(--ace-motion-duration-medium)]',
  '[transition-timing-function:var(--ace-motion-ease-standard)]',
  'motion-reduce:transition-none motion-reduce:duration-0',
  'hover:bg-[var(--screening-surface-hover)] hover:text-[var(--attachments-error)]',
  'hover:shadow-[0_0_0_1px_var(--screening-border-strong)]',
  'focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
  'focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--screening-primary-ring-offset)]',
  'disabled:cursor-not-allowed disabled:opacity-50',
)

export const attachmentsDeleteIconClass = cn(iconGlyphBox, 'size-3 text-current')

export const attachmentsActionsRowClass = 'flex w-full items-center justify-end'
