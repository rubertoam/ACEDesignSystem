import { Link } from 'react-router-dom'
import { labExampleSectionClass, labSectionLabelClass } from '../../lib/labExampleSection'
import { cn } from '../../lib/cn'
import {
  inferLabTokenLevel,
  LAB_TOKEN_LEVEL_LABELS,
  LAB_TOKEN_LEVEL_ORDER,
  type LabTokenGroup,
  type LabTokenLevel,
  type LabTokenRef,
} from '../../pages/labComponentTokens'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'
const p1Semi =
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]'

function TokenListItem({ token }: { token: LabTokenRef }) {
  return (
    <li>
      {token.figma ? (
        <>
          <code className="text-[var(--color-text-primary)]">{token.figma}</code>
          {' → '}
        </>
      ) : null}
      <code className="text-[var(--color-text-primary)]">{token.cssVar}</code>
      {token.note ? <span className="text-[var(--color-text-muted)]"> — {token.note}</span> : null}
    </li>
  )
}

function tokensByLevel(groups: LabTokenGroup[]): Record<LabTokenLevel, LabTokenRef[]> {
  const seen = new Set<string>()
  const out: Record<LabTokenLevel, LabTokenRef[]> = {
    primitive: [],
    semantic: [],
    component: [],
  }

  for (const group of groups) {
    for (const token of group.tokens) {
      const key = `${token.figma ?? ''}:${token.cssVar}`
      if (seen.has(key)) continue
      seen.add(key)
      out[inferLabTokenLevel(token)].push(token)
    }
  }

  return out
}

export function LabTokensInUse({ groups }: { groups: LabTokenGroup[] }) {
  if (!groups.length) return null

  const byLevel = tokensByLevel(groups)
  const hasAny = LAB_TOKEN_LEVEL_ORDER.some((level) => byLevel[level].length > 0)
  if (!hasAny) return null

  return (
    <section
      className={cn(
        'border-t border-solid border-[var(--screening-border-soft)] pt-6',
        labExampleSectionClass,
      )}
    >
      <h4 className={labSectionLabelClass}>Tokens in use</h4>
      <p className={cn('m-0 mb-4 text-[var(--color-text-muted)]', p1)}>
        Figma paths and CSS variables this lab consumes, grouped by ACE layer. Full catalog:{' '}
        <Link
          to="/lab/layouts/tokens"
          className={cn(p1Semi, 'text-[var(--color-text-brand)] underline-offset-2 hover:underline')}
        >
          Layouts → Tokens
        </Link>
        .
      </p>

      <div className="space-y-5">
        {LAB_TOKEN_LEVEL_ORDER.map((level) => {
          const tokens = byLevel[level]
          if (!tokens.length) return null
          return (
            <div key={level} className="space-y-2">
              <h5 className={cn('m-0 text-[var(--color-text-primary)]', p1Semi)}>
                {LAB_TOKEN_LEVEL_LABELS[level]}
              </h5>
              <ul className={cn('m-0 list-disc space-y-1.5 pl-5 text-[var(--color-text-muted)]', p1)}>
                {tokens.map((token) => (
                  <TokenListItem key={`${level}:${token.figma ?? ''}:${token.cssVar}`} token={token} />
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
