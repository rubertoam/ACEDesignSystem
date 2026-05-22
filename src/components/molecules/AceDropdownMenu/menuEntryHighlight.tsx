import type { ReactNode } from 'react'

/** Bold the first occurrence of `query` in `label` (search results menus). */
export function highlightMenuLabel(label: string, query: string): ReactNode {
  if (!query) return label
  const index = label.toLowerCase().indexOf(query.toLowerCase())
  if (index < 0) return label
  const end = index + query.length
  return (
    <>
      <span className="font-bold">{label.slice(index, end)}</span>
      {label.slice(end)}
    </>
  )
}
