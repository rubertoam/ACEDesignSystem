import type { ReactNode } from 'react'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'

/** Merges legacy Variables section into Usage tab content. */
export function labUsageSections(usage: ReactNode, variables?: ReactNode): ReactNode {
  if (!variables) return usage
  return (
    <>
      {usage}
      <section
        className={cn(
          'border-t border-solid border-[var(--screening-border-soft)] pt-6',
          labExampleSectionClass,
        )}
      >
        <h4 className={labSectionLabelClass}>Design tokens</h4>
        {variables}
      </section>
    </>
  )
}
