import { cn } from '../lib/cn'
import { publicAsset } from '../lib/publicAsset'

const guidelinesText = 'text-[var(--screening-text-primary)]'
const guidelinesBody =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-sm leading-[1.65]'
const guidelinesBodyBold =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)] text-sm leading-[1.65]'
const guidelinesHeading =
  '[font:var(--ace-type-paragraph-p2-bold)] [letter-spacing:var(--ace-type-paragraph-p2-bold-tracking)] text-base leading-[1.65]'

const PRINCIPLES = [
  {
    id: 'adaptive',
    title: 'Adaptive',
    description:
      'Remain adaptive to the technological improvements, evolving market trends, and growing needs and requirements of our users.',
    iconSrc: publicAsset('/brand/guidelines/adaptive.png'),
    iconClass: 'size-[6.25rem] object-contain',
  },
  {
    id: 'clarity',
    title: 'Clarity',
    description:
      'Ensure clarity by creating a simple, unambiguous and easy-to-use product user experience.',
    iconSrc: publicAsset('/brand/guidelines/clarity.png'),
    iconClass: 'h-[6.625rem] w-[8.4375rem] object-contain',
  },
  {
    id: 'empowerment',
    title: 'Empowerment',
    description:
      'Empower the user by building an experience that encourages them to explore with confidence.',
    iconSrc: publicAsset('/brand/guidelines/empowerment.png'),
    iconClass: 'h-[4.9375rem] w-[6.25rem] object-contain',
  },
] as const

export function GuidelinesPage() {
  return (
    <div className="flex justify-center px-4 py-2 sm:px-6 sm:py-4">
      <article
        className={cn(
          'flex w-full max-w-[65.125rem] flex-col',
          'rounded-[var(--radius-lg)] border border-solid border-[var(--screening-border-strong)]',
          'bg-[var(--screening-surface)] px-10 py-12 shadow-[var(--ace-drop-shadow-sm)] sm:px-14 sm:py-14',
        )}
      >
        <header className="flex flex-col gap-6">
          <h1 className={cn('m-0', guidelinesText, guidelinesHeading)}>Design Principles</h1>
          <p className={cn('m-0', guidelinesText, guidelinesBody)}>
            <span className={guidelinesBodyBold}>ACE stands for </span>
            <span className={guidelinesBodyBold}>Adaptability, Clarity, and Empowerment</span>
            <span>
              {' '}
              which are the UX team&apos;s three core design principles. The ACE design system is an
              investment to build better-designed products{' '}
            </span>
            <span className={guidelinesBodyBold}>that scale faster</span>
            <span>
              {' '}
              because a cohesive experience is more easily understood by our users, and gives us a
              common language to work with{' '}
            </span>
            <span className={guidelinesBodyBold}>when delivering designs to front end developers</span>
            <span>
              . It is a repository of all the visual assets, source code, guidelines, and principles
              to facilitate the design and development of any product within the ISI ecosystem. The
              goal is to share the same understanding of our visual design, enhance collaboration
              between teams, improve overall work efficiency and bring consistency as we continue
              to innovate.
            </span>
          </p>
        </header>

        <hr
          className="my-10 border-0 border-t border-solid border-[var(--screening-border-strong)]"
          aria-hidden
        />

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className={cn('m-0', guidelinesText, guidelinesHeading)}>Design Principles</h2>
            <p className={cn('m-0', guidelinesText, guidelinesBody)}>
              The following principles have been adopted by the UX team and we highly encourage other
              teams to use them as guiding tenets while weighing in on design intent and execution.
              These core principles are intended to build a shared vision and guide the design choices
              while keeping us rooted in our brand goals and objectives.
            </p>
          </div>

          <ul className="m-0 flex list-none flex-col gap-8 p-0">
            {PRINCIPLES.map((principle) => (
              <li key={principle.id} className="flex items-start gap-8">
                <div className="flex w-[6.25rem] shrink-0 items-start justify-center">
                  <img
                    src={principle.iconSrc}
                    alt=""
                    className={principle.iconClass}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2 pt-1">
                  <h3 className={cn('m-0', guidelinesText, guidelinesHeading)}>
                    {principle.title}
                  </h3>
                  <p className={cn('m-0', guidelinesText, guidelinesBody)}>
                    {principle.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  )
}
