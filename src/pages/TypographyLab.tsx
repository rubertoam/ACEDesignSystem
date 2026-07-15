import type { CSSProperties } from 'react'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'
import { cn } from '../lib/cn'
import { labUsageSectionClass } from '../lib/labExampleSection'
import aceTypographyDoc from '../styles/ace-typography-from-figma.json'

type AceTypographyRow = {
  figmaName: string
  token: string
  family: string
  style: string
  sizePx: number
  sizeRem: string
  weight: number
  lineHeightCss: string
  letterSpacingCss: string
  figmaValue: string
}

type AceDoc = {
  meta: {
    source: string
    nodeId?: string
  }
  typography: AceTypographyRow[]
}

const doc = aceTypographyDoc as AceDoc

/** Present in typography-tokens.css but not in the Figma export JSON yet */
const ADDITIONAL_ROWS: AceTypographyRow[] = [
  {
    figmaName: 'Label / Bold',
    token: '--ace-type-label-bold',
    family: 'Noto Sans',
    style: 'Bold',
    sizePx: 10,
    sizeRem: '0.6250rem',
    weight: 700,
    lineHeightCss: '1.649999976158142',
    letterSpacingCss: '0.02em',
    figmaValue: 'See typography-tokens.css (dense UI / table headers)',
  },
]

const SAMPLE = 'The quick brown fox 1970'

function typeStyle(token: string): CSSProperties {
  return {
    font: `var(${token})`,
    letterSpacing: `var(${token}-tracking)`,
  }
}

function isDisplayToken(token: string) {
  return token.includes('display-0')
}

export function TypographyLab() {
  const rows = [...doc.typography, ...ADDITIONAL_ROWS]

  return (
    <ComponentLabPage
      title="Typography"
      description="ACE type tokens from typography-tokens.css, documented from the Figma font variable export. Each row uses the font shorthand token plus its matching -tracking custom property."
      examples={
        <div className="space-y-8">
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--color-text-primary)]">Font stacks</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <p className="m-0 text-xs font-medium text-[var(--color-text-muted)]">--font-ace-noto</p>
                <p className="m-0 mt-2 text-lg" style={{ fontFamily: 'var(--font-ace-noto)' }}>
                  Noto Sans - {SAMPLE}
                </p>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <p className="m-0 text-xs font-medium text-[var(--color-text-muted)]">--font-ace-inter</p>
                <p className="m-0 mt-2 text-lg" style={{ fontFamily: 'var(--font-ace-inter)' }}>
                  Inter - {SAMPLE}
                </p>
              </div>
            </div>
          </section>

          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]">
            <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
              <thead className="sticky top-0 z-[1] bg-[var(--color-background)] text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                <tr>
                  <th className="border-b border-[var(--color-border)] px-3 py-2">Figma name</th>
                  <th className="border-b border-[var(--color-border)] px-3 py-2">Token</th>
                  <th className="border-b border-[var(--color-border)] px-3 py-2">Meta</th>
                  <th className="border-b border-[var(--color-border)] px-3 py-2">Sample</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.token} className="border-b border-[var(--color-border)] last:border-b-0">
                    <td className="max-w-[14rem] px-3 py-2 align-top text-[var(--color-text-primary)]">{row.figmaName}</td>
                    <td className="px-3 py-2 align-top">
                      <code className="break-all text-xs text-[var(--color-text-muted)]">{row.token}</code>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 align-top text-xs text-[var(--color-text-muted)]">
                      {row.family} · {row.weight} · {row.sizeRem}
                    </td>
                    <td
                      className={cn(
                        'px-3 py-2 align-middle text-[var(--color-text-primary)]',
                        isDisplayToken(row.token) && 'max-h-28 overflow-hidden',
                      )}
                      style={typeStyle(row.token)}
                    >
                      {SAMPLE}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      code={
        <ComponentLabCode>
          {[
            'function aceTypography(token: string) {',
            '  return `[font:var(${token})] [letter-spacing:var(${token}-tracking)]`',
            '}',
            '',
            "<p className={aceTypography('--ace-type-paragraph-p1-regular')}>",
            '  Body copy',
            '</p>',
          ].join('\n')}
        </ComponentLabCode>
      }
      usage={
        <p className="m-0 text-[var(--color-text-muted)]">
          In components, pair each <code className="text-[var(--color-text-primary)]">--ace-type-*</code> font token with its{' '}
          <code className="text-[var(--color-text-primary)]">--ace-type-*-tracking</code> sibling (same prefix +{' '}
          <code className="text-[var(--color-text-primary)]">-tracking</code>).
        </p>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            CSS definitions: <code className="text-[var(--color-text-primary)]">src/styles/typography-tokens.css</code>.
          </li>
          <li>
            Figma alignment: <code className="text-[var(--color-text-primary)]">src/styles/ace-typography-from-figma.json</code> ({doc.meta.source}).
          </li>
          <li>
            Regenerate the JSON when Figma font variables change; add any app-only tokens (like Label Bold) to{' '}
            <code className="text-[var(--color-text-primary)]">ADDITIONAL_ROWS</code> in <code className="text-[var(--color-text-primary)]">TypographyLab.tsx</code> until
            they appear in the export.
          </li>
        </ul>
      }
    />
  )
}
