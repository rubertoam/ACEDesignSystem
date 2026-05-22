import type { ReactNode } from 'react'
import { cn } from './cn'

/** Subsection title in lab examples (e.g. “Landing Page”, “Interactive”). */
export const labSectionLabelClass =
  'm-0 text-sm font-semibold text-[var(--screening-text-primary)]'

/** 20px between label and content — uses --ace-section-label-gap. */
export const labExampleSectionClass = 'flex flex-col gap-[var(--ace-section-label-gap)]'

export function LabExampleSection({
  title,
  children,
  className,
  as: Tag = 'section',
}: {
  title: ReactNode
  children: ReactNode
  className?: string
  as?: 'section' | 'div'
}) {
  return (
    <Tag className={cn(labExampleSectionClass, className)}>
      {typeof title === 'string' ? <h3 className={labSectionLabelClass}>{title}</h3> : title}
      {children}
    </Tag>
  )
}
