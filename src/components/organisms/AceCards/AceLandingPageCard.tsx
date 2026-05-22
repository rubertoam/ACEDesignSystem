import { cn } from '../../../lib/cn'
import {
  LandingPageCardHeaderActions,
  type LandingPageCardHeaderActionsProps,
} from './LandingPageCardHeaderActions'
import { LANDING_PAGE_CARD_ICONS } from './landingPageCardAssets'

const p1Bold =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)]'
const caption =
  '[font:var(--ace-type-caption-regular)] [letter-spacing:var(--ace-type-caption-regular-tracking)]'
const footerBold =
  '[font:var(--ace-type-caption-bold)] [letter-spacing:var(--ace-type-caption-bold-tracking)]'

export type AceLandingPageCardVariant = 'stats' | 'description'

export type AceLandingPageCardStatItem = {
  id: string
  label: string
  iconSrc?: string
  iconClassName?: string
}

export type AceLandingPageCardFooterStat = {
  label: string
  value: string
}

export type AceLandingPageCardProps = {
  variant?: AceLandingPageCardVariant
  title: string
  /** Shown beside the title on the description variant (Purple 500 pill). */
  tag?: string
  description?: string
  statItems?: AceLandingPageCardStatItem[]
  footerStats?: AceLandingPageCardFooterStat[]
  footerLinkLabel?: string
  footerLinkHref?: string
  onFooterLinkClick?: () => void
  onHeaderActionClick?: LandingPageCardHeaderActionsProps['onActionClick']
  showHeaderActions?: boolean
  showFooterStats?: boolean
  showFooterLink?: boolean
  /** Applies elevated shadow on hover (Figma Hover state). Default true. */
  elevateOnHover?: boolean
  className?: string
}

const DEFAULT_STAT_ITEMS: AceLandingPageCardStatItem[] = [
  {
    id: 'users',
    label: 'Data Point',
    iconSrc: LANDING_PAGE_CARD_ICONS.statUsers,
    iconClassName: 'h-[1.125rem] w-5',
  },
  {
    id: 'folder',
    label: 'Data Point',
    iconSrc: LANDING_PAGE_CARD_ICONS.statFolder,
    iconClassName: 'h-4 w-5',
  },
  {
    id: 'workflow',
    label: 'Data Point',
    iconSrc: LANDING_PAGE_CARD_ICONS.statWorkflow,
    iconClassName: 'h-3 w-6',
  },
]

const DEFAULT_FOOTER_STATS: AceLandingPageCardFooterStat[] = [
  { label: 'Data', value: '#' },
  { label: 'Data', value: '#' },
]

function FooterStat({ label, value }: AceLandingPageCardFooterStat) {
  return (
    <p className={cn('m-0 whitespace-nowrap', caption, 'text-[var(--ace-landing-page-card-footer-stat-color)]')}>
      <span>{label} · </span>
      <span className={footerBold}>{value}</span>
    </p>
  )
}

function StatIcon({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn('flex shrink-0 items-center justify-center', className)} aria-hidden>
      <img src={src} alt="" className="block h-full w-full max-h-full max-w-full object-contain" />
    </div>
  )
}

export function AceLandingPageCard({
  variant = 'stats',
  title,
  tag,
  description = '[Description option for this card which can provide some contextual information to users about what this is.]',
  statItems = DEFAULT_STAT_ITEMS,
  footerStats = DEFAULT_FOOTER_STATS,
  footerLinkLabel = 'Link',
  footerLinkHref,
  onFooterLinkClick,
  onHeaderActionClick,
  showHeaderActions = true,
  showFooterStats = true,
  showFooterLink = true,
  elevateOnHover = true,
  className,
}: AceLandingPageCardProps) {
  const isDescription = variant === 'description'

  const footerLinkClass = cn(
    footerBold,
    'text-[0.625rem] tracking-[0.0125rem] text-[var(--ace-landing-page-card-link-color)]',
    'rounded-[var(--radius-sm)] transition-colors duration-[var(--ace-motion-duration-fast)]',
    '[transition-timing-function:var(--ace-motion-ease-standard)]',
    'hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--screening-primary-ring)]',
  )

  const footerLink =
    footerLinkHref != null ? (
      <a href={footerLinkHref} className={footerLinkClass}>
        {footerLinkLabel}
      </a>
    ) : (
      <button type="button" className={footerLinkClass} onClick={onFooterLinkClick}>
        {footerLinkLabel}
      </button>
    )

  return (
    <article
      className={cn(
        'group/card flex w-[var(--ace-landing-page-card-width)] min-h-[var(--ace-landing-page-card-min-height)] flex-col',
        'overflow-hidden rounded-[var(--ace-landing-page-card-radius)] border-[0.5px] border-solid',
        'border-[var(--ace-landing-page-card-border)] bg-[var(--ace-landing-page-card-surface)]',
        'shadow-[var(--ace-landing-page-card-shadow)]',
        elevateOnHover &&
          'transition-[box-shadow] duration-[var(--ace-motion-duration-fast)] [transition-timing-function:var(--ace-motion-ease-standard)] hover:shadow-[var(--ace-landing-page-card-shadow-hover)]',
        className,
      )}
    >
      <header className="shrink-0 border-x-[0.5px] border-t-[0.5px] border-solid border-[var(--ace-landing-page-card-border)] bg-[var(--ace-landing-page-card-surface)]">
        <div
          className={cn(
            'flex min-h-[2.125rem] items-center justify-between gap-3',
            'px-[var(--ace-landing-page-card-header-px)] py-[var(--ace-landing-page-card-header-py)]',
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <h3
              className={cn(
                'm-0 truncate text-sm leading-[1.65]',
                p1Bold,
                'text-[var(--ace-landing-page-card-title-color)]',
              )}
            >
              {title}
            </h3>
            {isDescription && tag ? (
              <span
                className={cn(
                  'inline-flex shrink-0 items-center rounded-full px-3 py-0.5',
                  caption,
                  'bg-[var(--ace-landing-page-card-tag-bg)] text-[0.625rem] tracking-[0.0125rem] text-[var(--ace-landing-page-card-tag-text)]',
                )}
              >
                {tag}
              </span>
            ) : null}
          </div>
          <div
            className={cn(
              'flex shrink-0 items-center',
              !showHeaderActions && 'pointer-events-none invisible',
            )}
            aria-hidden={!showHeaderActions}
          >
            <LandingPageCardHeaderActions onActionClick={onHeaderActionClick} />
          </div>
        </div>
      </header>

      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col',
          isDescription
            ? 'gap-1 px-[var(--ace-landing-page-card-body-px)] py-[var(--ace-landing-page-card-body-py-desc)]'
            : 'justify-center px-[var(--ace-landing-page-card-body-px)] pb-[var(--ace-landing-page-card-body-px)] pt-[var(--ace-landing-page-card-body-py-stats)]',
        )}
      >
        {isDescription ? (
          <p
            className={cn(
              'm-0 text-xs leading-[1.65] text-[var(--ace-landing-page-card-body-color)]',
              caption,
            )}
          >
            {description}
          </p>
        ) : (
          <div className="flex w-full items-center justify-between">
            {statItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center gap-1 text-[var(--ace-landing-page-card-body-color)]"
              >
                {item.iconSrc ? (
                  <StatIcon src={item.iconSrc} className={item.iconClassName} />
                ) : null}
                <span className={cn('whitespace-nowrap', caption)}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer
        className={cn(
          'flex shrink-0 items-center',
          showFooterStats && showFooterLink ? 'justify-between' : showFooterLink ? 'justify-end' : 'justify-start',
          'border-x-[0.5px] border-b-[0.5px] border-solid border-[var(--ace-landing-page-card-border)]',
          'rounded-b-[var(--ace-landing-page-card-radius)] bg-[var(--ace-landing-page-card-footer-bg)]',
          'px-[var(--ace-landing-page-card-footer-px)] py-[var(--ace-landing-page-card-footer-py)]',
        )}
      >
        {showFooterStats ? (
          <div className="flex items-center gap-4">
            {footerStats.map((stat, index) => (
              <FooterStat key={`${stat.label}-${index}`} {...stat} />
            ))}
          </div>
        ) : (
          <span className="sr-only">Footer</span>
        )}
        {showFooterLink ? footerLink : null}
      </footer>
    </article>
  )
}
