import { cn } from '../lib/cn'
import { publicAsset } from '../lib/publicAsset'

const text = 'text-[var(--screening-text-primary)]'
const body =
  '[font:var(--ace-type-paragraph-p1-regular)] [letter-spacing:var(--ace-type-paragraph-p1-regular-tracking)] text-sm leading-[1.65]'
const bodyBold =
  '[font:var(--ace-type-paragraph-p1-bold)] [letter-spacing:var(--ace-type-paragraph-p1-bold-tracking)] text-sm leading-[1.65]'
const display =
  '[font-family:var(--lab-display-font)] font-extrabold tracking-[-0.03em] text-[var(--screening-text-primary)]'

const PRINCIPLES = [
  {
    id: 'adaptive',
    title: 'Adaptive',
    description:
      'Remain adaptive to the technological improvements, evolving market trends, and growing needs and requirements of our users.',
    iconSrc: publicAsset('/brand/guidelines/adaptive.jpg'),
    iconClass: 'size-[7.5rem] rounded-[var(--radius-md)] object-cover',
  },
  {
    id: 'clarity',
    title: 'Clarity',
    description:
      'Ensure clarity by creating a simple, unambiguous and easy-to-use product user experience.',
    iconSrc: publicAsset('/brand/guidelines/clarity.jpg'),
    iconClass: 'size-[7.5rem] rounded-[var(--radius-md)] object-cover',
  },
  {
    id: 'empowerment',
    title: 'Empowerment',
    description:
      'Empower the user by building an experience that encourages them to explore with confidence.',
    iconSrc: publicAsset('/brand/guidelines/empowerment.jpg'),
    iconClass: 'size-[7.5rem] rounded-[var(--radius-md)] object-cover',
  },
] as const

export function GuidelinesPage() {
  return (
    <div className="flex justify-center px-1 py-2 sm:px-2 sm:py-3">
      <article className="lab-philosophy-hero flex w-full max-w-[65.125rem] flex-col px-8 py-10 sm:px-12 sm:py-12">
        <header className="relative z-[1] flex flex-col gap-5">
          <h1 className={cn('m-0 text-3xl sm:text-4xl', display)}>Our Philosophy</h1>
          <p className={cn('m-0 max-w-[52rem]', text, body)}>
            <span className={bodyBold}>ACE stands for </span>
            <span className={bodyBold}>Adaptability, Clarity, and Empowerment</span>
            <span>
              {' '}
              which are the UX team&apos;s three core design principles. The ACE design system is an
              investment to build better-designed products{' '}
            </span>
            <span className={bodyBold}>that scale faster</span>
            <span>
              {' '}
              because a cohesive experience is more easily understood by our users, and gives us a
              common language to work with{' '}
            </span>
            <span className={bodyBold}>when delivering designs to front end developers</span>
            <span>
              . It is a repository of all the visual assets, source code, guidelines, and principles
              to facilitate the design and development of any product within the ISI ecosystem. The
              goal is to share the same understanding of our visual design, enhance collaboration
              between teams, improve overall work efficiency and bring consistency as we continue
              to innovate.
            </span>
          </p>
        </header>

        <section className="relative z-[1] mt-10 flex flex-col gap-6" aria-label="Core principles">
          <p className={cn('m-0 max-w-[48rem]', text, body)}>
            The following principles have been adopted by the UX team and we highly encourage other
            teams to use them as guiding tenets while weighing in on design intent and execution.
            These core principles are intended to build a shared vision and guide the design choices
            while keeping us rooted in our brand goals and objectives.
          </p>

          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <li key={principle.id} className="lab-philosophy-card flex flex-col gap-4 p-5">
                <div className="flex items-center justify-center">
                  <img
                    src={principle.iconSrc}
                    alt=""
                    className={principle.iconClass}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <h2 className={cn('m-0 text-lg', display)}>{principle.title}</h2>
                  <p className={cn('m-0', text, body)}>{principle.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  )
}
