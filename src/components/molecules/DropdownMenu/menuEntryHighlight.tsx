import type { ReactNode } from 'react'

/**
 * Figma DropdownMenu / Secondary / Search / Results: match substring uses Body/Bold,
 * remainder Body/Regular (typography/body/body-main).
 */
export function highlightMenuLabel(label: string, query: string): ReactNode {
  const q = query.trim()
  if (!q) return label

  const lower = label.toLowerCase()
  const qLower = q.toLowerCase()
  const index = lower.indexOf(qLower)
  if (index < 0) return label

  const before = label.slice(0, index)
  const match = label.slice(index, index + q.length)
  const after = label.slice(index + q.length)

  return (
    <>
      {before}
      <span className="[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]">
        {match}
      </span>
      {after}
    </>
  )
}
