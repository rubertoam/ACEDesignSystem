import { AceButton } from '../components/atoms/AceButton'
import {
  AceTooltip,
  AceTooltipContent,
  AceTooltipTrigger,
} from '../components/atoms/AceTooltip/AceTooltip'
import {
  aceScreeningToolbarTooltipContentClass,
  aceTooltipContentClass,
} from '../components/atoms/AceTooltip/tooltipFieldStyles'
import { labExampleSectionClass, labSectionLabelClass, labUsageSectionClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

export function TooltipLab() {
  return (
    <ComponentLabPage
      title="Tooltips"
      description="Short contextual labels on hover or focus. Screening toolbar tooltips use Caption Regular on a bordered surface with XS drop shadow and no arrow."
      examples={
        <div className="space-y-8">
          <div className={labExampleSectionClass}>
            <p className={labSectionLabelClass}>Default</p>
            <div
              className={cn(aceTooltipContentClass, 'static')}
              role="presentation"
              aria-hidden
            >
              Helpful context on hover or keyboard focus.
            </div>
          </div>

          <div className={labExampleSectionClass}>
            <p className={labSectionLabelClass}>Screening toolbar</p>
            <div
              className={cn(aceScreeningToolbarTooltipContentClass, 'static')}
              role="presentation"
              aria-hidden
            >
              Show
            </div>
          </div>

          <div className={labExampleSectionClass}>
            <p className={labSectionLabelClass}>Interactive</p>
            <div className="w-fit">
              <AceTooltip>
                <AceTooltipTrigger asChild>
                  <AceButton type="button" variant="secondary" size="sm">
                    Show tooltip
                  </AceButton>
                </AceTooltipTrigger>
                <AceTooltipContent side="top" hideArrow variant="screening-toolbar">
                  Show
                </AceTooltipContent>
              </AceTooltip>
            </div>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Use <code className="text-[var(--screening-text-primary)]">variant="screening-toolbar"</code> and{' '}
            <code className="text-[var(--screening-text-primary)]">hideArrow</code> for screening toolbar icon
            tooltips. Wrap disabled icon buttons in{' '}
            <code className="text-[var(--screening-text-primary)]">AceTooltipIconWrap</code> so the tooltip can receive
            pointer events.
          </p>
          <ComponentLabCode>{`import {
  AceTooltip,
  AceTooltipContent,
  AceTooltipTrigger,
} from '../components/atoms/AceTooltip/AceTooltip'

<AceTooltip>
  <AceTooltipTrigger asChild>
    <button type="button" aria-label="Show review history">…</button>
  </AceTooltipTrigger>
  <AceTooltipContent side="top" hideArrow variant="screening-toolbar">
    Show
  </AceTooltipContent>
</AceTooltip>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use tooltips for icon-only controls where the visible label would clutter the toolbar. Keep copy to one or
              two words when possible (Show / Hide, Columns).
            </p>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Animation</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">Properties</strong>: opacity, scale, and
                side-aware slide via <code className="text-[var(--screening-text-primary)]">tw-animate-css</code>{' '}
                (<code className="text-[var(--screening-text-primary)]">animate-in fade-in-0 zoom-in-95</code>, plus{' '}
                <code className="text-[var(--screening-text-primary)]">slide-in-from-*</code> by{' '}
                <code className="text-[var(--screening-text-primary)]">data-side</code>)
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Duration / easing</strong>  - {' '}
                <code className="text-[var(--screening-text-primary)]">150ms</code> /{' '}
                <code className="text-[var(--screening-text-primary)]">ease</code> (same defaults as Review Assigned)
              </li>
              <li>
                Transform origin uses{' '}
                <code className="text-[var(--screening-text-primary)]">--radix-tooltip-content-transform-origin</code>.
                Catalog entry: <code className="text-[var(--screening-text-primary)]">tooltip-enter-exit</code> on the
                Motion lab.
              </li>
            </ul>
          </section>
          <section className={labUsageSectionClass}>
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Accessibility</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              The trigger still needs an <code className="text-[var(--screening-text-primary)]">aria-label</code> when it
              is icon-only. Use the button itself as the tooltip trigger when enabled; wrap disabled icon buttons in{' '}
              <code className="text-[var(--screening-text-primary)]">AceTooltipIconWrap</code> so the tooltip can receive
              pointer events.
            </p>
          </section>
        </>
      }
      variables={
        <ul className="m-0 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>
            Surface - <code className="text-[var(--color-text-primary)]">--ace-tooltip-surface</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-border</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-text</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-shadow</code> (aliases{' '}
            <code className="text-[var(--color-text-primary)]">--ace-drop-shadow-xs</code>)
          </li>
          <li>
            Layout - <code className="text-[var(--color-text-primary)]">--ace-tooltip-radius</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-px</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-py</code>
          </li>
          <li>
            Motion - Review Assigned pattern via <code className="text-[var(--color-text-primary)]">tw-animate-css</code>{' '}
            (<code className="text-[var(--color-text-primary)]">animate-in</code> /{' '}
            <code className="text-[var(--color-text-primary)]">animate-out</code>, 150ms ease)
          </li>
          <li>
            Type - Caption Regular (<code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>)
          </li>
        </ul>
      }
    />
  )
}
