import { useEffect, useId, useMemo, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AceAvailabilityTag } from '../components/atoms/AceAvailabilityTag/AceAvailabilityTag'
import { AceTabs, aceTabButtonId } from '../components/atoms/AceTabs/AceTabs'
import { getLabAvailability } from '../lib/labAvailability'
import { cn } from '../lib/cn'
import { labUsageSections } from './labContent'

export type ComponentLabTab = 'examples' | 'code' | 'usage'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const panel = cn(
  'rounded-[var(--radius-lg)] border border-solid border-[var(--screening-border-strong)]',
  'bg-[var(--screening-surface)] p-6 shadow-[var(--ace-drop-shadow-xs)]',
)

const examplesToolbarPanel = cn(
  'w-full min-w-0 rounded-[var(--radius-lg)] border border-solid border-[var(--screening-border-strong)]',
  'bg-[var(--screening-surface)] p-4 shadow-[var(--ace-drop-shadow-xs)] sm:p-5',
)

const examplesCanvasPanel = cn(
  'w-full min-w-0 rounded-[var(--radius-lg)] border border-solid border-[var(--screening-border-strong)]',
  'bg-[var(--screening-surface)] p-6 shadow-[var(--ace-drop-shadow-xs)]',
)

const codeBlockClass = cn(
  'overflow-x-auto rounded-[var(--radius-md)] border border-solid border-[var(--screening-border-soft)]',
  'bg-[var(--screening-surface-muted)] p-4 text-xs leading-relaxed text-[var(--screening-text-primary)]',
)

export type ComponentLabPageProps = {
  title: string
  description?: string
  examples?: ReactNode
  /** When false, examples render without the outer canvas panel (e.g. nested section containers). Default true. */
  examplesCanvas?: boolean
  examplesToolbar?: ReactNode
  code?: ReactNode
  usage?: ReactNode
  /** @deprecated Use `examples` */
  preview?: ReactNode
  /** @deprecated Use `examplesToolbar` */
  previewToolbar?: ReactNode
  /** @deprecated Fold into `usage` */
  variables?: ReactNode
}

export function ComponentLabCode({ children }: { children: string }) {
  return <pre className={codeBlockClass}>{children}</pre>
}

export function ComponentLabPage({
  title,
  description,
  examples,
  examplesCanvas = true,
  examplesToolbar,
  code,
  usage,
  preview,
  previewToolbar,
  variables,
}: ComponentLabPageProps) {
  const { pathname } = useLocation()
  const availability = getLabAvailability(pathname)
  const tabListId = useId()
  const examplesPanelId = `${tabListId}-examples-panel`
  const codePanelId = `${tabListId}-code-panel`
  const usagePanelId = `${tabListId}-usage-panel`

  const examplesContent = examples ?? preview
  const toolbarContent = examplesToolbar ?? previewToolbar

  const usageContent = usage
    ? labUsageSections(usage, variables)
    : variables
      ? labUsageSections(null, variables)
      : null

  const hasExamples = examplesContent != null
  const hasCode = code != null
  const hasUsage = usageContent != null

  const tabItems = useMemo(() => {
    const items: { id: ComponentLabTab; label: string }[] = []
    if (hasExamples) items.push({ id: 'examples', label: 'Examples' })
    if (hasCode) items.push({ id: 'code', label: 'Code' })
    if (hasUsage) items.push({ id: 'usage', label: 'Usage' })
    return items
  }, [hasExamples, hasCode, hasUsage])

  const [tab, setTab] = useState<ComponentLabTab>(tabItems[0]?.id ?? 'examples')

  useEffect(() => {
    if (!tabItems.some((t) => t.id === tab)) {
      setTab(tabItems[0]?.id ?? 'examples')
    }
  }, [tab, tabItems])

  return (
    <div className="w-full max-w-none space-y-6">
      <div className={panel}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2
              className={cn(
                'm-0',
                '[font:var(--ace-type-heading-h5-bold)] [letter-spacing:var(--ace-type-heading-h5-bold-tracking)]',
                'text-[var(--screening-text-primary)]',
              )}
            >
              {title}
            </h2>
            {description ? (
              <p className={cn('mt-2', p1, 'text-[var(--screening-text-muted)]')}>{description}</p>
            ) : null}
          </div>
          {availability ? (
            <AceAvailabilityTag status={availability} className="mt-0.5 shrink-0" />
          ) : null}
        </div>
      </div>

      {tabItems.length > 0 ? (
        <div>
          <AceTabs
            idPrefix={tabListId}
            items={tabItems}
            value={tab}
            onValueChange={(id) => setTab(id as ComponentLabTab)}
            aria-label={`${title} documentation`}
          />

          {hasExamples && tab === 'examples' ? (
            <section
              id={examplesPanelId}
              role="tabpanel"
              aria-labelledby={aceTabButtonId(tabListId, 'examples')}
              className="pt-6"
            >
              {toolbarContent != null ? (
                <div className="mb-3 flex flex-col gap-2">
                  <div className={examplesToolbarPanel}>{toolbarContent}</div>
                </div>
              ) : null}
              {examplesCanvas ? (
                <div className={examplesCanvasPanel}>{examplesContent}</div>
              ) : (
                <div className="w-full min-w-0">{examplesContent}</div>
              )}
            </section>
          ) : null}

          {hasCode && tab === 'code' ? (
            <section
              id={codePanelId}
              role="tabpanel"
              aria-labelledby={aceTabButtonId(tabListId, 'code')}
              className="pt-6"
            >
              <div className={cn(panel, 'space-y-4', p1)}>{code}</div>
            </section>
          ) : null}

          {hasUsage && tab === 'usage' ? (
            <section
              id={usagePanelId}
              role="tabpanel"
              aria-labelledby={aceTabButtonId(tabListId, 'usage')}
              className="pt-6"
            >
              <div className={cn(panel, 'space-y-4', p1, 'text-[var(--screening-text-primary)]')}>{usageContent}</div>
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
