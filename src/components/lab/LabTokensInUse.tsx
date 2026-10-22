import { Link } from 'react-router-dom'
import { labExampleSectionClass, labSectionLabelClass } from '../../lib/labExampleSection'
import { cn } from '../../lib/cn'
import type { LabTokenGroup } from '../../pages/labComponentTokens'

const p1 =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)]'
const p1Semi =
  '[font:var(--ace-type-paragraph-p1-semi-bold)] [letter-spacing:var(--ace-type-paragraph-p1-semi-bold-tracking)]'

export function LabTokensInUse({ groups }: { groups: LabTokenGroup[] }) {
  if (!groups.length) return null

  return (
    <section
      className={cn(
        'border-t border-solid border-[var(--screening-border-soft)] pt-6',
        labExampleSectionClass,
      )}
    >
      <h4 className={labSectionLabelClass}>Tokens in use</h4>
      <p className={cn('m-0 mb-4 text-[var(--color-text-muted)]', p1)}>
        Figma Semantic / Component paths and the CSS variables this lab consumes. Full catalog:{' '}
        <Link
          to="/lab/layouts/tokens"
          className={cn(p1Semi, 'text-[var(--color-text-brand)] underline-offset-2 hover:underline')}
        >
          Layouts → Tokens
        </Link>
        .
      </p>
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h5 className={cn('m-0 text-[var(--color-text-primary)]', p1Semi)}>{group.title}</h5>
            <ul className={cn('m-0 list-disc space-y-1.5 pl-5 text-[var(--color-text-muted)]', p1)}>
              {group.tokens.map((token) => (
                <li key={`${token.figma ?? ''}:${token.cssVar}`}>
                  {token.figma ? (
                    <>
                      <code className="text-[var(--color-text-primary)]">{token.figma}</code>
                      {' → '}
                    </>
                  ) : null}
                  <code className="text-[var(--color-text-primary)]">{token.cssVar}</code>
                  {token.note ? (
                    <span className="text-[var(--color-text-muted)]"> — {token.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
