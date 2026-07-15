import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'

const h3Class = cn(
  'm-0 mt-8 first:mt-0',
  '[font:var(--ace-type-heading-h6-bold)] [letter-spacing:var(--ace-type-heading-h6-bold-tracking)]',
  'text-base text-[var(--screening-text-primary)]',
)

const h4Class = cn(
  'm-0 mt-6',
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]',
  'text-sm text-[var(--screening-text-primary)]',
)

const h5Class = cn(
  'm-0 mt-4',
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]',
  'text-sm text-[var(--screening-text-primary)]',
)

const muted = 'text-[var(--screening-text-muted)]'
const codeClass =
  'rounded-[var(--radius-sm)] bg-[var(--screening-surface-muted)] px-1 py-0.5 text-[0.8125rem] text-[var(--screening-text-primary)]'

const wipTagClass = cn(
  'inline-flex items-center rounded-[var(--radius-sm)] border border-solid border-[var(--ace-notice-400)]',
  'bg-[var(--ace-notice-50)] px-2 py-0.5 text-[11px] font-semibold leading-snug text-[var(--ace-notice-800)]',
)

function inlineFormat(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /(`[^`]+`|\*\*[^*]+\*\*)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = re.exec(text)) != null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const token = match[0]
    if (token.startsWith('`')) {
      parts.push(
        <code key={key++} className={codeClass}>
          {token.slice(1, -1)}
        </code>,
      )
    } else {
      parts.push(
        <strong key={key++} className="font-semibold text-[var(--screening-text-primary)]">
          {token.slice(2, -2)}
        </strong>,
      )
    }
    last = match.index + token.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function parseTable(rows: string[]): ReactNode {
  const cells = (line: string) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim())

  const header = cells(rows[0])
  const body = rows.slice(2).map(cells)

  return (
    <div className="my-4 overflow-x-auto rounded-[var(--radius-md)] border border-solid border-[var(--screening-border-soft)]">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        <thead className="bg-[var(--screening-surface-muted)]">
          <tr>
            {header.map((cell) => (
              <th
                key={cell}
                className={cn(
                  'border-b border-[var(--screening-border-soft)] px-3 py-2',
                  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]',
                  'text-[var(--screening-text-primary)]',
                )}
              >
                {inlineFormat(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i} className="border-b border-[var(--screening-border-soft)] last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className={cn('px-3 py-2 align-top', muted)}>
                  {inlineFormat(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Split rules markdown into Usage body (without QA) and QA checklist body. */
export function splitImplementationRulesMarkdown(markdown: string): {
  usageMarkdown: string
  qaMarkdown: string | null
} {
  const normalized = markdown.replace(/\r\n/g, '\n').trim()
  const match = normalized.match(/\n---\n\n## \d+\. QA checklist\n([\s\S]*)$/i)
  if (!match || match.index == null) {
    return { usageMarkdown: normalized, qaMarkdown: null }
  }
  const usageMarkdown = normalized.slice(0, match.index).trim()
  const qaBody = match[1].trim()
  const qaMarkdown = qaBody ? `## QA checklist\n\n${qaBody}` : null
  return { usageMarkdown, qaMarkdown }
}

function isVisualTokensHeading(title: string) {
  return /visual\s*(?:&|and)\s*design\s*tokens/i.test(title)
}

/** Renders lab Implementation Rules markdown (headings, lists, tables, code fences). */
export function LabImplementationRulesDoc({
  markdown,
  showDocumentTitle = true,
}: {
  markdown: string
  /** When false, skips the leading `# …` title (useful inside a merged Usage tab). */
  showDocumentTitle?: boolean
}) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const nodes: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i += 1
      continue
    }

    if (line.startsWith('```')) {
      const fence = []
      i += 1
      while (i < lines.length && !lines[i].startsWith('```')) {
        fence.push(lines[i])
        i += 1
      }
      i += 1
      nodes.push(
        <pre
          key={key++}
          className="my-4 overflow-x-auto rounded-[var(--radius-md)] border border-solid border-[var(--screening-border-soft)] bg-[var(--screening-surface-muted)] p-4 text-xs leading-relaxed text-[var(--screening-text-primary)]"
        >
          {fence.join('\n')}
        </pre>,
      )
      continue
    }

    if (line.trim().startsWith('|') && i + 1 < lines.length && /^\|?\s*-+/.test(lines[i + 1].trim())) {
      const tableRows = [line]
      i += 1
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableRows.push(lines[i])
        i += 1
      }
      nodes.push(<div key={key++}>{parseTable(tableRows)}</div>)
      continue
    }

    if (line.startsWith('# ')) {
      if (showDocumentTitle) {
        nodes.push(
          <h3 key={key++} className={h3Class}>
            {inlineFormat(line.slice(2).trim())}
          </h3>,
        )
      }
      i += 1
      continue
    }
    if (line.startsWith('## ')) {
      const title = line.slice(3).trim()
      const visualTokens = isVisualTokensHeading(title)
      nodes.push(
        <div key={key++} className="mt-6 flex flex-wrap items-center gap-2 first:mt-0">
          <h4 className={cn(h4Class, 'mt-0')}>{inlineFormat(title)}</h4>
          {visualTokens ? (
            <span className={wipTagClass}>
              Work in Progress. Do not reference AI-generated tokens. Tokens are subject to change.
            </span>
          ) : null}
        </div>,
      )
      i += 1
      continue
    }
    if (line.startsWith('### ')) {
      nodes.push(
        <h5 key={key++} className={h5Class}>
          {inlineFormat(line.slice(4).trim())}
        </h5>,
      )
      i += 1
      continue
    }

    if (/^[-*] /.test(line) || /^\d+\. /.test(line)) {
      const items: string[] = []
      const ordered = /^\d+\. /.test(line)
      while (i < lines.length && (ordered ? /^\d+\. /.test(lines[i]) : /^[-*] /.test(lines[i]))) {
        items.push(lines[i].replace(ordered ? /^\d+\. / : /^[-*] /, ''))
        i += 1
      }
      const ListTag = ordered ? 'ol' : 'ul'
      nodes.push(
        <ListTag
          key={key++}
          className={cn(
            'my-3 space-y-1 pl-5',
            ordered ? 'list-decimal' : 'list-disc',
            p1,
            muted,
          )}
        >
          {items.map((item, idx) => (
            <li key={idx}>{inlineFormat(item)}</li>
          ))}
        </ListTag>,
      )
      continue
    }

    if (line.startsWith('---')) {
      nodes.push(
        <hr key={key++} className="my-8 border-0 border-t border-solid border-[var(--screening-border-soft)]" />,
      )
      i += 1
      continue
    }

    const para = [line]
    i += 1
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].trim().startsWith('|') &&
      !/^[-*] /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      lines[i] !== '---'
    ) {
      para.push(lines[i])
      i += 1
    }
    nodes.push(
      <p key={key++} className={cn('my-3 m-0', p1, muted)}>
        {inlineFormat(para.join(' '))}
      </p>,
    )
  }

  return <div className="max-w-[52rem]">{nodes}</div>
}

export const EMPTY_IMPLEMENTATION_RULES = (
  <p className={cn('m-0', p1, muted)}>
    Implementation rules for this component have not been documented yet.
  </p>
)

export const EMPTY_QA_CHECKLIST = (
  <p className={cn('m-0', p1, muted)}>
    QA checklist for this component has not been documented yet.
  </p>
)
