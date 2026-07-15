import { AceInputField } from '../../atoms/AceInputField'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { MaterialSymbol } from '../../molecules/AceAccordion/MaterialSymbol'
import { DialogModal } from '../../molecules/DialogModal/DialogModal'
import { cn } from '../../../lib/cn'

const p1Bold =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]'
const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'
const captionBold =
  '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]'

/** Visible rows before the items list scrolls (row height matches --ace-edit-group-item-row-height) */
const MAX_ITEMS_WITHOUT_LIST_SCROLL = 5

export type GroupFormDialogMode = 'edit' | 'copy'

export type GroupFormDialogItem = {
  id: string
  label: string
  markedForRemoval: boolean
}

export type GroupFormDialogProps = {
  mode: GroupFormDialogMode
  open: boolean
  onClose: () => void
  groupName: string
  onGroupNameChange: (name: string) => void
  items: GroupFormDialogItem[]
  onToggleItemRemoval: (itemId: string) => void
  onPrimary: () => void
  primaryDisabled: boolean
}

function includedCountMessage(count: number): string {
  if (count === 1) return '1 item will be included in the copy'
  return `${count} items will be included in the copy`
}

function excludedCountMessage(count: number): string {
  if (count === 1) return '1 item will be deleted'
  return `${count} items will be deleted`
}

const MODE_COPY = {
  title: 'Copy Group',
  description: 'Edit the group name and select which queries to include in the copy.',
  itemsLabel: 'Items to Copy',
  emptyList: 'No items to copy.',
  primaryLabel: 'Copy',
  nameFieldId: 'copy-group-name',
} as const

const MODE_EDIT = {
  title: 'Edit Group',
  description: 'Update the group name and manage its items.',
  itemsLabel: 'Items in Group',
  emptyList: 'No items in this group.',
  primaryLabel: 'Save',
  nameFieldId: 'edit-group-name',
} as const

export function GroupFormDialog({
  mode,
  open,
  onClose,
  groupName,
  onGroupNameChange,
  items,
  onToggleItemRemoval,
  onPrimary,
  primaryDisabled,
}: GroupFormDialogProps) {
  const copy = mode === 'copy'
  const config = copy ? MODE_COPY : MODE_EDIT
  const activeCount = items.filter((i) => !i.markedForRemoval).length
  const excludedCount = items.length - activeCount
  const listScrolls = items.length > MAX_ITEMS_WITHOUT_LIST_SCROLL

  return (
    <DialogModal
      open={open}
      onClose={onClose}
      title={config.title}
      description={config.description}
      size="lg"
      fitContent
      footer={
        <div className="flex w-full flex-wrap items-center justify-end gap-[var(--dialog-modal-footer-btn-gap)]">
          <button
            type="button"
            onClick={onClose}
            className={cn(
              p1Bold,
              'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] border border-solid border-[var(--dialog-modal-outline-border)] bg-[var(--dialog-modal-surface)] px-4 py-2 text-[var(--dialog-modal-outline-text)] hover:bg-[var(--dialog-modal-outline-hover-bg)]',
            )}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={primaryDisabled}
            onClick={onPrimary}
            className={cn(
              p1Bold,
              'inline-flex items-center justify-center rounded-[var(--dialog-modal-btn-radius)] px-4 py-2 text-[var(--dialog-modal-on-primary)]',
              'bg-[var(--dialog-modal-primary)] hover:bg-[var(--dialog-modal-primary-hover)]',
              'disabled:pointer-events-none disabled:opacity-50',
            )}
          >
            {config.primaryLabel}
          </button>
        </div>
      }
    >
      <div className="flex w-full flex-col gap-6">
        <AceInputField
          id={config.nameFieldId}
          label="Group name"
          value={groupName}
          onChange={(e) => onGroupNameChange(e.target.value)}
          fieldSize="md"
        />

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className={cn(captionBold, 'm-0 text-sm text-[var(--dialog-modal-title)]')}>
              {config.itemsLabel}
            </p>
            {copy ? (
              <p className={cn(p1, 'm-0 text-sm text-[var(--ace-button-purple-400)]')}>
                {includedCountMessage(activeCount)}
              </p>
            ) : excludedCount > 0 ? (
              <p className={cn(p1, 'm-0 text-sm text-[var(--dialog-modal-danger)]')}>
                {excludedCountMessage(excludedCount)}
              </p>
            ) : null}
          </div>

          <div
            className={cn(
              'flex flex-col gap-1 rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)] p-2',
              listScrolls && 'max-h-[var(--ace-edit-group-items-list-max-height)] overflow-y-auto',
            )}
          >
            {items.length === 0 ? (
              <p className={cn(p1, 'm-0 px-2 py-3 text-center text-sm text-[var(--screening-text-muted)]')}>
                {config.emptyList}
              </p>
            ) : (
              items.map((item) =>
                copy ? (
                  <label
                    key={item.id}
                    className={cn(
                      'flex h-[var(--ace-edit-group-item-row-height)] cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-2',
                      item.markedForRemoval && 'opacity-60',
                    )}
                  >
                    <Checkbox
                      size="sm"
                      checked={!item.markedForRemoval}
                      onCheckedChange={(checked) => {
                        if (checked !== !item.markedForRemoval) onToggleItemRemoval(item.id)
                      }}
                      aria-label={`Include ${item.label} in copy`}
                    />
                    <span
                      className={cn(
                        p1,
                        'min-w-0 flex-1 truncate text-sm',
                        item.markedForRemoval
                          ? 'text-[var(--screening-text-muted)]'
                          : 'text-[var(--screening-text-secondary)]',
                      )}
                    >
                      {item.label}
                    </span>
                  </label>
                ) : (
                  <div
                    key={item.id}
                    className="flex h-[var(--ace-edit-group-item-row-height)] items-center justify-between gap-2 rounded-[var(--radius-sm)] pl-2 pr-1"
                  >
                    <span
                      className={cn(
                        p1,
                        'min-w-0 flex-1 truncate text-sm',
                        item.markedForRemoval
                          ? 'text-[var(--screening-text-muted)] opacity-50'
                          : 'text-[var(--screening-text-secondary)]',
                      )}
                    >
                      {item.label}
                    </span>
                    <button
                      type="button"
                      aria-label={
                        item.markedForRemoval
                          ? `Include ${item.label}`
                          : `Mark ${item.label} for deletion`
                      }
                      onClick={() => onToggleItemRemoval(item.id)}
                      className={cn(
                        'inline-flex size-6 shrink-0 items-center justify-center rounded-[var(--radius-sm)]',
                        'transition-colors duration-[var(--ace-motion-duration-fast)]',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
                        item.markedForRemoval
                          ? 'hover:bg-[var(--ace-edit-group-restore-hover-bg)]'
                          : cn(
                              'text-[var(--dialog-modal-danger)]',
                              'hover:bg-[var(--ace-edit-group-trash-hover-bg)]',
                            ),
                      )}
                    >
                      {item.markedForRemoval ? (
                        <span
                          className="inline-flex size-4 items-center justify-center rounded-full bg-[var(--ace-edit-group-restore-bg)]"
                          aria-hidden
                        >
                          <MaterialSymbol
                            name="add"
                            size="sm"
                            className="text-[var(--screening-text-on-primary)]"
                          />
                        </span>
                      ) : (
                        <MaterialSymbol name="delete" size="md" className="size-4" />
                      )}
                    </button>
                  </div>
                ),
              )
            )}
          </div>
        </div>
      </div>
    </DialogModal>
  )
}

/** @deprecated Use GroupFormDialog */
export type EditGroupDialogItem = GroupFormDialogItem
