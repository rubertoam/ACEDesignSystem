import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Toggle } from '../components/atoms/Toggle/Toggle'
import { aceToggleLabelClass } from '../components/atoms/Toggle/toggleFieldStyles'
import {
  DropdownMenu,
  type DropdownMenuEntry,
} from '../components/molecules/DropdownMenu/DropdownMenu'
import {
  SiteHeader,
  type SiteHeaderNavItem,
} from '../components/organisms/SiteHeader/SiteHeader'
import {
  FINSCAN_PROFILE_AVATARS,
  getFinScanProfileAvatar,
  type FinScanProfileId,
} from '../lib/finscanProfileAvatars'
import { LabControlField, LabSelect } from '../lib/labControls'
import { labExampleSectionClass, labSectionLabelClass } from '../lib/labExampleSection'
import { ComponentLabCode, ComponentLabPage } from './ComponentLabPage'

import { siteHeaderLabQa } from './labTabDocs'

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

  const navItems: SiteHeaderNavItem[] = useMemo(
    () =>
      ALL_NAV_ITEMS.filter((item) => navEnabled[item.id]).map((item) => ({
        id: item.id,
        label: item.label,
        onSelect: () => setLastAction(item.label),
      })),
    [navEnabled],
  )

  const menuDropdownItems: DropdownMenuEntry[] = useMemo(
    () => [
      { type: 'menuHeader', label: 'Menu options' },
      ...ALL_NAV_ITEMS.map(
        (item): DropdownMenuEntry => ({
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

  const navEnabledCount = countEnabled(navEnabled)

  const examplesToolbar = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-start gap-x-5 gap-y-4">
        <DropdownMenu
          triggerLabel={`Menu options (${navEnabledCount}/${ALL_NAV_ITEMS.length})`}
          items={menuDropdownItems}
          panelWidth="wide"
          align="start"
        />
        {TOOLBAR_OPTIONS.map((item) => (
          <LabControlField key={item.id} label={item.label} className="shrink-0">
            <div className="flex min-h-9 items-center gap-2">
              <Toggle
                size="sm"
                checked={toolbarEnabled[item.id]}
                onCheckedChange={(checked) =>
                  setToolbarEnabled((prev) => ({ ...prev, [item.id]: checked }))
                }
                aria-label={item.label}
              />
              <span className={aceToggleLabelClass}>{toolbarEnabled[item.id] ? 'On' : 'Off'}</span>
            </div>
          </LabControlField>
        ))}
        <LabSelect
          label="Profile image"
          value={profileId}
          onChange={(v) => setProfileId(v as FinScanProfileId)}
          options={FINSCAN_PROFILE_AVATARS.map((avatar) => ({
            value: avatar.id,
            label: avatar.label,
          }))}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-solid border-[var(--screening-border-soft)] pt-6">
        {lastAction ? (
          <p className="m-0 text-xs text-[var(--screening-text-muted)]">
            Last menu click: <strong className="text-[var(--screening-text-primary)]">{lastAction}</strong>
          </p>
        ) : null}
        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-solid border-[var(--screening-border-strong)]">
          <SiteHeader
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
      </div>
    </div>
  )

  return (
    <ComponentLabPage
      qa={siteHeaderLabQa}
      title="Site header"
      description="Top navigation for FinScan - brand, primary menu items with dropdown chevrons, and user toolbar actions."
      examplesToolbar={examplesToolbar}
      code={
        <>
          <p className="m-0 text-[var(--screening-text-muted)]">
            Pass only the nav entries you want visible; toolbar regions are controlled with boolean props. Profile
            photos live in <code className="text-[var(--screening-text-primary)]">public/brand/profiles/</code>.
          </p>
          <ComponentLabCode>{`import { SiteHeader } from '../components/organisms/SiteHeader/SiteHeader'

const navItems = [
  { id: 'home', label: 'Home', onSelect: () => {} },
  { id: 'settings', label: 'Settings', onSelect: () => {} },
]

<SiteHeader
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
              <li>Height: <code className="text-[var(--screening-text-primary)]">--site-header-height</code> (48px)</li>
              <li>Horizontal padding: <code className="text-[var(--screening-text-primary)]">--site-header-px</code> (32px)</li>
              <li>Nav item hover: <code className="text-[var(--screening-text-primary)]">--site-header-nav-hover</code></li>
              <li>Greeting uses caption bold + primary color</li>
              <li>
                Brand lockup: <code className="text-[var(--screening-text-primary)]">FinScanIcon</code> (
                <Link className="text-[var(--color-accent)] underline underline-offset-2" to="/lab/atoms/finscan-logo">
                  FinScan Logo lab
                </Link>
                )
              </li>
              <li>Profile avatars from Figma Actions (node 3127:35)</li>
            </ul>
          </section>
        </>
      }
    />
  )
}
