import type { ReactNode } from 'react'
import { cn } from './cn'

/** Subsection title in lab examples / usage (e.g. “Interactive”, “Animation”). */
export const labSectionLabelClass =
  'm-0 text-sm font-semibold text-[var(--screening-text-primary)]'

/** 12px between label and content — uses --ace-section-label-gap. */
export const labExampleSectionClass = 'flex flex-col gap-[var(--ace-section-label-gap)]'

/** Same gap for Usage-tab sections (When to use, Animation, Accessibility, …). */
export const labUsageSectionClass = labExampleSectionClass

/** 12px between static example labels and preview content. */
export const labStaticExampleGroupClass =
  'flex min-w-0 flex-col gap-[var(--ace-section-label-gap)]'

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
