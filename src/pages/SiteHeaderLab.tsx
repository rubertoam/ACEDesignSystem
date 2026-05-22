import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AceDropdownMenu,
  type AceDropdownMenuEntry,
} from '../components/molecules/AceDropdownMenu/AceDropdownMenu'
import {
  AceSiteHeader,
  type AceSiteHeaderNavItem,
} from '../components/organisms/AceSiteHeader/AceSiteHeader'
import {
  FINSCAN_PROFILE_AVATARS,
  getFinScanProfileAvatar,
  type FinScanProfileId,
} from '../lib/finscanProfileAvatars'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

const FIGMA_SITE_HEADER_URL =
  'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=225-1406&m=dev'

const FIGMA_ACTIONS_URL =
  'https://www.figma.com/design/nIr5xquI2bOX7A9JRpamOg/ACE-Design-System-v.3?node-id=3127-35&m=dev'

const ALL_NAV_ITEMS: { id: string; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'reporting', label: 'Reporting' },
  { id: 'settings', label: 'Settings' },
  { id: 'administration', label: 'Administration' },
]

const TOOLBAR_OPTIONS = [
  { id: 'notifications', label: 'Notifications' },
  { id: 'help', label: 'Help' },
  { id: 'profile', label: 'Profile button' },
] as const

type ToolbarId = (typeof TOOLBAR_OPTIONS)[number]['id']

function countEnabled(flags: Record<string, boolean>) {
  return Object.values(flags).filter(Boolean).length
}

export function SiteHeaderLab() {
  const [navEnabled, setNavEnabled] = useState<Record<string, boolean>>({
    home: true,
    reporting: true,
    settings: true,
    administration: true,
  })
  const [toolbarEnabled, setToolbarEnabled] = useState<Record<ToolbarId, boolean>>({
    notifications: true,
    help: true,
    profile: true,
  })
  const [profileId, setProfileId] = useState<FinScanProfileId>('janet')
  const [lastAction, setLastAction] = useState<string | null>(null)

  const selectedProfile = getFinScanProfileAvatar(profileId)

  const navItems: AceSiteHeaderNavItem[] = useMemo(
    () =>
      ALL_NAV_ITEMS.filter((item) => navEnabled[item.id]).map((item) => ({
        id: item.id,
        label: item.label,
        onSelect: () => setLastAction(item.label),
      })),
    [navEnabled],
  )

  const menuDropdownItems: AceDropdownMenuEntry[] = useMemo(
    () => [
      { type: 'menuHeader', label: 'Menu options' },
      ...ALL_NAV_ITEMS.map(
        (item): AceDropdownMenuEntry => ({
          type: 'checkbox',
          id: item.id,
          label: item.label,
          checked: navEnabled[item.id],
          onCheckedChange: (checked) =>
            setNavEnabled((prev) => ({ ...prev, [item.id]: checked })),
        }),
      ),
    ],
    [navEnabled],
  )

  const toolbarDropdownItems: AceDropdownMenuEntry[] = useMemo(
    () => [
      { type: 'menuHeader', label: 'Toolbar actions' },
      ...TOOLBAR_OPTIONS.map(
        (item): AceDropdownMenuEntry => ({
          type: 'checkbox',
          id: item.id,
          label: item.label,
          checked: toolbarEnabled[item.id],
          onCheckedChange: (checked) =>
            setToolbarEnabled((prev) => ({ ...prev, [item.id]: checked })),
        }),
      ),
    ],
    [toolbarEnabled],
  )

  const profileDropdownItems: AceDropdownMenuEntry[] = useMemo(
    () => [
      { type: 'menuHeader', label: 'Profile image' },
      {
        type: 'radioGroup',
        value: profileId,
        onValueChange: (value) => setProfileId(value as FinScanProfileId),
        options: FINSCAN_PROFILE_AVATARS.map((avatar) => ({
          value: avatar.id,
          label: avatar.label,
          imageUrl: avatar.imageUrl,
        })),
      },
    ],
    [profileId],
  )

  const navEnabledCount = countEnabled(navEnabled)
  const toolbarEnabledCount = countEnabled(toolbarEnabled)

  const examplesToolbar = (
    <div className="flex flex-col gap-4">
      <p className="m-0 max-w-xl text-xs leading-relaxed text-[var(--screening-text-muted)]">
        Use the dropdowns to configure the header. Menu and toolbar items support multiple checkboxes; profile
        images are mutually exclusive (one at a time).{' '}
        <a
          href={FIGMA_ACTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--color-accent)] underline underline-offset-2"
        >
          Figma Actions layer
        </a>
        .
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <AceDropdownMenu
          triggerLabel={`Menu options (${navEnabledCount}/${ALL_NAV_ITEMS.length})`}
          items={menuDropdownItems}
          panelWidth="wide"
          align="start"
        />
        <AceDropdownMenu
          triggerLabel={`Toolbar (${toolbarEnabledCount}/${TOOLBAR_OPTIONS.length})`}
          items={toolbarDropdownItems}
          panelWidth="wide"
          align="start"
        />
        <AceDropdownMenu
          triggerLabel={`Profile: ${selectedProfile.label}`}
          items={profileDropdownItems}
          panelWidth="wide"
          align="start"
        />
      </div>
      {lastAction ? (
        <p className="m-0 text-xs text-[var(--screening-text-muted)]">
          Last menu click: <strong className="text-[var(--screening-text-primary)]">{lastAction}</strong>
        </p>
      ) : null}
    </div>
  )

  return (
    <ComponentLabPage
      title="Site header"
      description="Top navigation for FinScan — brand, primary menu items with dropdown chevrons, and user toolbar actions."
      figmaUrl={FIGMA_SITE_HEADER_URL}
      figmaLinkLabel="Site navigation in Figma"
      examplesToolbar={examplesToolbar}
      examples={
        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)]">
          <AceSiteHeader
            navItems={navItems}
            userName={selectedProfile.greetingName}
            showNotifications={toolbarEnabled.notifications}
            showHelp={toolbarEnabled.help}
            showProfile={toolbarEnabled.profile}
            profileImageUrl={selectedProfile.imageUrl}
            profileInitials={selectedProfile.initials}
            onNotificationsClick={() => setLastAction('Notifications')}
            onHelpClick={() => setLastAction('Help')}
            onProfileClick={() => setLastAction('Profile')}
          />
          <div className="bg-[var(--screening-surface-muted)] px-8 py-6">
            <p className="m-0 text-sm text-[var(--screening-text-muted)]">Page content area</p>
          </div>
        </div>
      }
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Pass only the nav entries you want visible; toolbar regions are controlled with boolean props. Profile
            photos live in <code className="text-[var(--screening-text-primary)]">public/brand/profiles/</code>.
          </p>
          <ComponentLabCode>{`import { AceSiteHeader } from '../components/organisms/AceSiteHeader/AceSiteHeader'

const navItems = [
  { id: 'home', label: 'Home', onSelect: () => {} },
  { id: 'settings', label: 'Settings', onSelect: () => {} },
]

<AceSiteHeader
  navItems={navItems}
  userName="User Name"
  showNotifications
  showHelp
  showProfile
  profileImageUrl="/brand/profiles/janet.png"
/>`}</ComponentLabCode>
        </>
      }
      usage={
        <>
          <section className={labExampleSectionClass}>
            <h4 className={labSectionLabelClass}>When to use</h4>
            <p className="m-0 text-[var(--screening-text-muted)]">
              Use at the top of every FinScan application view. Parent apps supply which menu labels appear and
              wire dropdown panels to each item’s <code className="text-[var(--screening-text-primary)]">onSelect</code> or{' '}
              <code className="text-[var(--screening-text-primary)]">href</code>.
            </p>
          </section>
          <section className={labExampleSectionClass}>
            <h4 className={labSectionLabelClass}>Anatomy</h4>
            <ul className="m-0 list-disc space-y-1 pl-5 text-[var(--screening-text-muted)]">
              <li>Height: <code className="text-[var(--screening-text-primary)]">--ace-site-header-height</code> (64px)</li>
              <li>Horizontal padding: <code className="text-[var(--screening-text-primary)]">--ace-site-header-px</code> (32px)</li>
              <li>Nav item hover: <code className="text-[var(--screening-text-primary)]">--ace-site-header-nav-hover</code></li>
              <li>Greeting uses caption bold + primary color</li>
              <li>
                Brand lockup: <code className="text-[var(--screening-text-primary)]">FinScanIcon</code> (
                <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/finscan-icon">
                  FinScan icon lab
                </Link>
                )
              </li>
              <li>
                Profile avatars from{' '}
                <a
                  href={FIGMA_ACTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-accent)] underline underline-offset-2"
                >
                  Figma Actions (3127:35)
                </a>
              </li>
            </ul>
          </section>
        </>
      }
    />
  )
}
