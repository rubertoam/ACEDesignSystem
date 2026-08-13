import { Fragment, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import { MaterialSymbol } from '../AceAccordion/MaterialSymbol'
import { cn } from '../../../lib/cn'
import {
  aceSubHeaderBackClass,
  aceSubHeaderDrilldownPaddingClass,
  aceSubHeaderHeadlineClass,
  aceSubHeaderIconButtonClass,
  aceSubHeaderPaginationLabelClass,
  aceSubHeaderPaginationNavClass,
  aceSubHeaderShellClass,
  aceSubHeaderStatClass,
  aceSubHeaderStatSeparatorClass,
} from './subHeaderFieldStyles'

export type AceSubHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'title'> & {
  /** Left-side title. Hidden when `drillDown` is on. Default `[Headline]`. */
  headline?: ReactNode
  /** Show statistics cluster (`# Data` separators). */
  statistics?: boolean
  /** Stat labels when `statistics` is on. */
  stats?: ReactNode[]
  /** Show prev / label / next paging controls. */
  paging?: boolean
  /** Paging label. Default `# of #`. */
  paginationLabel?: ReactNode
  onPrevPage?: () => void
  onNextPage?: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
  /** Show vertical three-dot menu action. */
  moreMenu?: boolean
  onMore?: () => void
  /** Replace headline with Back control and add drill-down start padding. */
  drillDown?: boolean
  backLabel?: ReactNode
  onBack?: () => void
  onRefresh?: () => void
  onFavorite?: () => void
  /** Optional trailing slot override (replaces built-in trailing controls). */
  trailing?: ReactNode
  /** Accessible name for the header landmark. */
  'aria-label'?: string
}

function HeaderIconButton({
  label,
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} className={cn(aceSubHeaderIconButtonClass, className)} {...rest}>
      {children}
    </button>
  )
}

function PaginationControls({
  label,
  onPrevPage,
  onNextPage,
  prevDisabled,
  nextDisabled,
}: {
  label: ReactNode
  onPrevPage?: () => void
  onNextPage?: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
}) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-4">
      <button
        type="button"
        aria-label="Previous"
        disabled={prevDisabled}
        onClick={onPrevPage}
        className={aceSubHeaderPaginationNavClass}
      >
        <MaterialSymbol name="chevron_left" size="md" className="block size-[11px] !text-[11px] leading-none" />
      </button>
      <p className={aceSubHeaderPaginationLabelClass}>{label}</p>
      <button
        type="button"
        aria-label="Next"
        disabled={nextDisabled}
        onClick={onNextPage}
        className={aceSubHeaderPaginationNavClass}
      >
        <MaterialSymbol name="chevron_right" size="md" className="block size-[11px] !text-[11px] leading-none" />
      </button>
    </div>
  )
}

/**
 * FinScan sub-header — responsive region chrome under the page header.
 * Fills its parent width; optional statistics, paging, more menu, and drill-down.
 */
export function AceSubHeader({
  headline = '[Headline]',
  statistics = false,
  stats = ['# Data', '# Data', '# Data', '# Data'],
  paging = false,
  paginationLabel = '# of #',
  onPrevPage,
  onNextPage,
  prevDisabled,
  nextDisabled,
  moreMenu = false,
  onMore,
  drillDown = false,
  backLabel = 'Back',
  onBack,
  onRefresh,
  onFavorite,
  trailing,
  className,
  'aria-label': ariaLabel = 'Sub-header',
  ...rest
}: AceSubHeaderProps) {
  const showActions = paging || moreMenu || onRefresh != null || onFavorite != null
  const showTrailing = trailing != null || statistics || showActions

  return (
    <header
      {...rest}
      aria-label={ariaLabel}
      className={cn(aceSubHeaderShellClass, drillDown && aceSubHeaderDrilldownPaddingClass, className)}
    >
      {drillDown ? (
        <button type="button" className={aceSubHeaderBackClass} onClick={onBack}>
          <MaterialSymbol
            name="chevron_left"
            size="md"
            className="block size-[11px] !text-[11px] leading-none text-current"
          />
          <span>{backLabel}</span>
        </button>
      ) : (
        <p className={aceSubHeaderHeadlineClass}>{headline}</p>
      )}

      {trailing != null ? (
        trailing
      ) : showTrailing ? (
        <div className="flex shrink-0 items-center gap-8 py-3">
          {statistics && stats.length > 0 ? (
            <div className="flex shrink-0 items-center gap-3">
              {stats.map((stat, index) => (
                <Fragment key={index}>
                  {index > 0 ? <span aria-hidden className={aceSubHeaderStatSeparatorClass} /> : null}
                  <p className={aceSubHeaderStatClass}>{stat}</p>
                </Fragment>
              ))}
            </div>
          ) : null}

          {showActions ? (
            <div className="flex shrink-0 items-center gap-4">
              {paging ? (
                <PaginationControls
                  label={paginationLabel}
                  onPrevPage={onPrevPage}
                  onNextPage={onNextPage}
                  prevDisabled={prevDisabled}
                  nextDisabled={nextDisabled}
                />
              ) : null}
              {onRefresh != null ? (
                <HeaderIconButton label="Refresh" onClick={onRefresh} className="h-[20px] w-4">
                  <MaterialSymbol name="autorenew" size="md" className="block size-4 !text-base leading-none" />
                </HeaderIconButton>
              ) : null}
              {onFavorite != null ? (
                <HeaderIconButton label="Favorite" onClick={onFavorite} className="h-[22px] w-6">
                  <MaterialSymbol name="star" size="lg" className="block size-6 !text-2xl leading-none" />
                </HeaderIconButton>
              ) : null}
              {moreMenu ? (
                <HeaderIconButton label="More actions" onClick={onMore} className="h-5 w-1">
                  <MaterialSymbol name="more_vert" size="lg" className="block !text-xl leading-none" />
                </HeaderIconButton>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
