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
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { cn } from '../lib/cn'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

export function TooltipLab() {
  return (
    <ComponentLabPage
      title="Tooltips"
      description="Short contextual labels on hover or focus. Screening toolbar tooltips use Caption Regular on a bordered surface with XS drop shadow and no arrow."
      examples={
        <div className={cn('space-y-8', labExampleSectionClass)}>
          <div className="space-y-4">
            <p className={labSectionLabelClass}>Default</p>
            <div
              className={cn(aceTooltipContentClass, 'static')}
              role="presentation"
              aria-hidden
            >
              Helpful context on hover or keyboard focus.
            </div>
          </div>

          <div className="space-y-4">
            <p className={labSectionLabelClass}>Screening toolbar</p>
            <div
              className={cn(aceScreeningToolbarTooltipContentClass, 'static')}
              role="presentation"
              aria-hidden
            >
              Show
            </div>
          </div>

          <div className="space-y-4">
            <p className={labSectionLabelClass}>Interactive</p>
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
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use tooltips for icon-only controls where the visible label would clutter the toolbar. Keep copy to one or
              two words when possible (Show / Hide, Columns).
            </p>
          </section>
          <section className="space-y-2">
            <h4 className="m-0 text-sm font-semibold text-[var(--screening-text-primary)]">Animation</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>
                <strong className="text-[var(--screening-text-primary)]">Properties</strong> — opacity, transform
                (scale 0.95 → 1, 2px slide on the open side)
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Duration</strong> —{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-tooltip-duration</code> (
                <code className="text-[var(--screening-text-primary)]">--ace-motion-duration-fast</code>, 150ms)
              </li>
              <li>
                <strong className="text-[var(--screening-text-primary)]">Easing</strong> —{' '}
                <code className="text-[var(--screening-text-primary)]">--ace-tooltip-ease</code> (
                <code className="text-[var(--screening-text-primary)]">--ace-motion-ease-standard</code>)
              </li>
              <li>
                Slide offset follows Radix <code className="text-[var(--screening-text-primary)]">data-side</code> via{' '}
                <code className="text-[var(--screening-text-primary)]">src/styles/tooltip.css</code>. Catalog entry:{' '}
                <code className="text-[var(--screening-text-primary)]">tooltip-enter-exit</code> on the Animations lab.
              </li>
            </ul>
          </section>
          <section className="space-y-2">
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
            Surface — <code className="text-[var(--color-text-primary)]">--ace-tooltip-surface</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-border</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-text</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-shadow</code>
          </li>
          <li>
            Layout — <code className="text-[var(--color-text-primary)]">--ace-tooltip-radius</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-px</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-py</code>
          </li>
          <li>
            Motion — <code className="text-[var(--color-text-primary)]">--ace-tooltip-duration</code>,{' '}
            <code className="text-[var(--color-text-primary)]">--ace-tooltip-ease</code>
          </li>
          <li>
            Type — Caption Regular (<code className="text-[var(--color-text-primary)]">--ace-type-caption-regular</code>)
          </li>
        </ul>
      }
    />
  )
}
