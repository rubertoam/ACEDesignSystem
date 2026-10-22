/**
 * Rename Ace* component CSS vars / React components to Figma PascalCase names.
 * Idempotent-safe: re-running skips already-migrated definitions, folders, and symbols.
 *
 * Usage: node scripts/rename-ace-to-figma.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')
const srcRoot = path.join(root, 'src')
const variablesPath = path.join(srcRoot, 'styles', 'variables.css')

const summary = {
  cssCanonical: 0,
  cssAliasesAdded: 0,
  cssUsagesUpdated: 0,
  foldersMoved: 0,
  filesRenamed: 0,
  stubsWritten: 0,
  filesRewritten: 0,
  skipped: [],
  warnings: [],
}

// ---------------------------------------------------------------------------
// CSS prefix map (longest-first)
// ---------------------------------------------------------------------------
const CSS_PREFIX_MAP = [
  ['descriptive-button', 'button-descriptive'],
  ['progress-indicator', 'progress-indicator'],
  ['progress-spinner', 'progress-spinner'],
  ['landing-page-card', 'landing-page-card'],
  ['data-card', 'data-card'],
  ['inline-message', 'inline-message'],
  ['scrollable-list', 'scrollable-list'],
  ['date-picker', 'date-picker'],
  ['time-picker', 'time-picker'],
  ['inline-drawer', 'inline-drawer'],
  ['side-drawer', 'side-drawer'],
  ['site-header', 'site-header'],
  ['page-header', 'page-header'],
  ['sub-header', 'sub-header'],
  ['task-bar', 'task-bar'],
  ['status-pill', 'badge'],
  ['badge-tag', 'badge-tag'],
  ['tab-card', 'tab-card'],
  ['dropdown-menu', 'dropdown-menu'],
  ['dropdown', 'dropdown-menu'],
  ['filter', 'filter'],
  ['toast', 'toast-message'],
  ['button', 'button'],
  ['tooltip', 'tooltip'],
  ['tabs', 'tabs'],
  ['input', 'input'],
  ['accordion', 'accordion'],
  ['slider', 'slider'],
  ['stepper', 'stepper'],
  ['attachments', 'attachments'],
  ['sidebar', 'sidebar'],
  ['timeline', 'timeline'],
  ['toggle', 'toggle'],
  ['radio', 'radio'],
  ['availability', 'availability-tag'],
  ['icon-button', 'icon-button'],
  ['pagination', 'pagination'],
].sort((a, b) => b[0].length - a[0].length)

const CSS_SKIP_PREFIXES = new Set([
  'type',
  'lab',
  'drop-shadow',
  'motion',
  'section-label',
  'finscan',
  'secondary',
  'dark-mode',
  'neutral',
  'error',
  'warning',
  'success',
  'notice',
  'edit-group',
  'header-status',
  'guidelines',
])

const CSS_COMPAT_MARKER = '/* ace→figma CSS compat aliases (generated) */'

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function mapCssVarName(aceName) {
  const raw = aceName.startsWith('--') ? aceName.slice(2) : aceName
  if (!raw.startsWith('ace-')) return null
  const afterAce = raw.slice(4)

  for (const skip of CSS_SKIP_PREFIXES) {
    if (afterAce === skip || afterAce.startsWith(skip + '-')) return null
  }

  for (const [from, to] of CSS_PREFIX_MAP) {
    if (afterAce === from || afterAce.startsWith(from + '-')) {
      const rest = afterAce.slice(from.length)
      return `--${to}${rest}`
    }
  }
  return null
}

function isCompatAliasLine(line) {
  const m = line.match(/^\s*(--ace-[\w-]+)\s*:\s*var\((--[\w-]+)\)\s*;/)
  if (!m) return false
  const mapped = mapCssVarName(m[1])
  return mapped === m[2]
}

function rewriteCssVarRefs(text, { skipCompatAliases = false } = {}) {
  const lines = text.split('\n')
  let changed = 0
  const out = lines.map((line) => {
    if (skipCompatAliases && isCompatAliasLine(line)) return line
    if (line.includes(CSS_COMPAT_MARKER)) return line
    return line.replace(/--ace-[\w-]+/g, (match) => {
      const mapped = mapCssVarName(match)
      if (mapped && mapped !== match) {
        changed++
        return mapped
      }
      return match
    })
  })
  return { text: out.join('\n'), changed }
}

function transformVariablesCss() {
  let css = fs.readFileSync(variablesPath, 'utf8')
  const aliases = []
  const defRe = /^(\s*)(--ace-([\w-]+))\s*:\s*([^;]+);(.*)$/gm
  const replacements = []
  const seenOld = new Set()

  for (const m of css.matchAll(defRe)) {
    const indent = m[1]
    const oldName = m[2]
    const value = m[4].trim()
    const trailing = m[5] || ''
    const newName = mapCssVarName(oldName)
    if (!newName) continue
    if (seenOld.has(oldName)) continue
    seenOld.add(oldName)

    // Already a compat alias for the mapped name — keep
    if (value === `var(${newName})`) continue

    const { text: newValue } = rewriteCssVarRefs(value)
    replacements.push({
      start: m.index,
      end: m.index + m[0].length,
      indent,
      oldName,
      newName,
      newValue,
      trailing,
    })
  }

  replacements.sort((a, b) => b.start - a.start)
  for (const r of replacements) {
    const canonicalExists = new RegExp(`${escapeRegExp(r.newName)}\\s*:`).test(css)
    const aliasExists = new RegExp(
      `${escapeRegExp(r.oldName)}\\s*:\\s*var\\(${escapeRegExp(r.newName)}\\)`,
    ).test(css)

    if (canonicalExists) {
      // Remove leftover non-alias --ace-* definition at this location
      const slice = css.slice(r.start, r.end)
      if (!slice.includes(`var(${r.newName})`)) {
        css = css.slice(0, r.start) + css.slice(r.end)
      }
      if (!aliasExists) {
        aliases.push(`${r.indent}${r.oldName}: var(${r.newName});`)
        summary.cssAliasesAdded++
      }
      continue
    }

    const canonicalLine = `${r.indent}${r.newName}: ${r.newValue};${r.trailing}`
    css = css.slice(0, r.start) + canonicalLine + css.slice(r.end)
    aliases.push(`${r.indent}${r.oldName}: var(${r.newName});`)
    summary.cssCanonical++
    summary.cssAliasesAdded++
  }

  // Collect ALL needed aliases (including for already-canonical defs)
  const neededAliases = new Set(aliases)
  for (const m of css.matchAll(/--(ace-[\w-]+)\s*:/g)) {
    const oldName = `--${m[1]}`
    const newName = mapCssVarName(oldName)
    if (!newName) continue
    if (!new RegExp(`${escapeRegExp(oldName)}\\s*:\\s*var\\(${escapeRegExp(newName)}\\)`).test(css)) {
      // Only if canonical exists
      if (new RegExp(`${escapeRegExp(newName)}\\s*:`).test(css)) {
        neededAliases.add(`  ${oldName}: var(${newName});`)
      }
    }
  }

  if (neededAliases.size) {
    const uniq = [...neededAliases]
    const block = `\n\n  ${CSS_COMPAT_MARKER}\n${uniq.join('\n')}\n`
    if (css.includes(CSS_COMPAT_MARKER)) {
      css = css.replace(
        new RegExp(`${escapeRegExp(CSS_COMPAT_MARKER)}[\\s\\S]*?(?=\\n})`),
        `${CSS_COMPAT_MARKER}\n${uniq.join('\n')}\n`,
      )
    } else {
      const closeIdx = css.lastIndexOf('\n}')
      css = closeIdx !== -1 ? css.slice(0, closeIdx) + block + css.slice(closeIdx) : css + block
    }
  }

  // Rewrite refs in values (leave true compat alias lines alone)
  const rewritten = rewriteCssVarRefs(css, { skipCompatAliases: true })
  fs.writeFileSync(variablesPath, rewritten.text, 'utf8')
}

function updateCssUsagesAcrossSrc() {
  walkFiles(srcRoot, (file) => {
    if (!/\.(tsx?|css)$/.test(file)) return
    if (path.normalize(file) === path.normalize(variablesPath)) return
    const before = fs.readFileSync(file, 'utf8')
    const { text, changed } = rewriteCssVarRefs(before)
    if (changed > 0 && text !== before) {
      fs.writeFileSync(file, text, 'utf8')
      summary.cssUsagesUpdated += changed
      summary.filesRewritten++
    }
  })
}

// ---------------------------------------------------------------------------
// React symbol map (longest-first)
// ---------------------------------------------------------------------------
const SYMBOL_MAP = [
  ['AceAccordionReviewProgress', 'AccordionReviewProgress'],
  ['AceLandingPageCardFooterStat', 'LandingPageCardFooterStat'],
  ['AceLandingPageCardStatItem', 'LandingPageCardStatItem'],
  ['AceLandingPageCardVariant', 'LandingPageCardVariant'],
  ['AceLandingPageCard', 'LandingPageCard'],
  ['AceScrollableListFilterOption', 'ScrollableListFilterOption'],
  ['AceScrollableListFilterGroup', 'ScrollableListFilterGroup'],
  ['AceScrollableListSortOption', 'ScrollableListSortOption'],
  ['AceScrollableListItemRow', 'ScrollableListItemRow'],
  ['AceScrollableListItemIcon', 'ScrollableListItemIcon'],
  ['AceScrollableListIconKind', 'ScrollableListIconKind'],
  ['AceScrollableListBody', 'ScrollableListBody'],
  ['AceScrollableListItem', 'ScrollableListItem'],
  ['AceScrollableList', 'ScrollableList'],
  ['AceDropdownMenuPanelWidth', 'DropdownMenuPanelWidth'],
  ['AceDropdownMenuPanel', 'DropdownMenuPanel'],
  ['AceDropdownMenuEntry', 'DropdownMenuEntry'],
  ['AceDropdownMenuSubItem', 'DropdownMenuSubItem'],
  ['AceDropdownTriggerMode', 'DropdownTriggerMode'],
  ['AceDropdownMenu', 'DropdownMenu'],
  ['AceProgressIndicatorTone', 'ProgressIndicatorTone'],
  ['AceProgressIndicatorType', 'ProgressIndicatorType'],
  ['AceProgressIndicator', 'ProgressIndicator'],
  ['AceProgressSpinner', 'ProgressSpinner'],
  ['AceDescriptiveButtonPreviewState', 'ButtonDescriptivePreviewState'],
  ['AceDescriptiveButton', 'ButtonDescriptive'],
  ['AceTableFilterHeader', 'TableFilterHeader'],
  ['AceFilterToggleChip', 'FilterToggleChip'],
  ['AceFilterTrigger', 'FilterTrigger'],
  ['AceFilterHeader', 'FilterHeader'],
  ['AceFilterChip', 'FilterChip'],
  ['AceTabButtonId', 'TabButtonId'],
  ['AceInlineMessageTone', 'InlineMessageTone'],
  ['AceInlineMessage', 'InlineMessage'],
  ['AceInlineDrawer', 'InlineDrawer'],
  ['AceSideDrawer', 'SideDrawer'],
  ['AceAvailabilityTag', 'AvailabilityTag'],
  // AceStatusPill → handled only via stubs/index compat (avoid Badge = Badge self-aliases)
  ['AceBadgeAppearance', 'BadgeAppearance'],
  ['AceBadgeVariant', 'BadgeVariant'],
  ['AceBadge', 'Badge'],
  ['AceTooltipProvider', 'TooltipProvider'],
  ['AceTooltipContent', 'TooltipContent'],
  ['AceTooltipTrigger', 'TooltipTrigger'],
  ['AceTooltipIconWrap', 'TooltipIconWrap'],
  ['AceTooltip', 'Tooltip'],
  ['AceTabCardHeaderIcons', 'TabCardHeaderIcons'],
  ['AceTabCards', 'TabCards'],
  ['AceTabCardItem', 'TabCardItem'],
  ['AceTabsOrientation', 'TabsOrientation'],
  ['AceTabItem', 'TabItem'],
  ['AceTabs', 'Tabs'],
  ['AceInputVisualState', 'InputVisualState'],
  ['AceInputFieldIcon', 'InputIcon'],
  ['AceInputFieldSize', 'InputSize'],
  ['AceInputField', 'Input'],
  ['AceButtonActionTone', 'ButtonActionTone'],
  ['AceButtonPreviewState', 'ButtonPreviewState'],
  ['AceButtonVariant', 'ButtonVariant'],
  ['AceButtonSize', 'ButtonSize'],
  ['AceButtonIcon', 'ButtonIcon'],
  ['AceButton', 'Button'],
  ['AceDataCardDataPoint', 'DataCardDataPoint'],
  ['AceDataCard', 'DataCard'],
  ['AceDatePickerRangeProps', 'DatePickerRangeProps'],
  ['AceDatePickerSingleProps', 'DatePickerSingleProps'],
  ['AceDatePickerMode', 'DatePickerMode'],
  ['AceDatePicker', 'DatePicker'],
  ['AceTimePickerDefaultMode', 'TimePickerDefaultMode'],
  ['AceTimePicker', 'TimePicker'],
  ['AceSiteHeaderNavItem', 'SiteHeaderNavItem'],
  ['AceSiteHeader', 'SiteHeader'],
  ['AcePageHeader', 'PageHeader'],
  ['AceSubHeader', 'SubHeader'],
  ['AceTaskBar', 'TaskBar'],
  ['AcePagination', 'Pagination'],
  ['AceSliderField', 'SliderField'],
  ['AceSliderValue', 'SliderValue'],
  ['AceSliderVariant', 'SliderVariant'],
  ['AceSlider', 'Slider'],
  ['AceStepperVariant', 'StepperVariant'],
  ['AceStepper', 'Stepper'],
  ['AceAccordionSurface', 'AccordionSurface'],
  ['AceAccordion', 'Accordion'],
  ['AceToast', 'ToastMessage'],
  ['AceTableColumn', 'TableColumn'],
  ['AceTable', 'Table'],
  ['AceAttachments', 'Attachments'],
  ['AceAttachmentFile', 'AttachmentFile'],
  ['AceAttachmentLink', 'AttachmentLink'],
  ['AceTimelineItemData', 'TimelineItemData'],
  ['AceTimelineItemSurface', 'TimelineItemSurface'],
  ['AceTimelineItem', 'TimelineItem'],
  ['AceTimelineSort', 'TimelineSort'],
  ['AceTimelineVariant', 'TimelineVariant'],
  ['AceTimeline', 'Timeline'],
  ['AceSidebarOrganizationDisplay', 'SidebarOrganizationDisplay'],
  ['AceSidebarOrganization', 'SidebarOrganization'],
  ['AceSidebarMenuAction', 'SidebarMenuAction'],
  ['AceSidebarNavItem', 'SidebarNavItem'],
  ['AceSidebarGroup', 'SidebarGroup'],
  ['AceSidebarVariant', 'SidebarVariant'],
  ['AceSidebar', 'Sidebar'],
  ['AceCheckboxSize', 'CheckboxSize'],
  ['AceToggleVariant', 'ToggleVariant'],
  ['AceToggleSize', 'ToggleSize'],
  ['AceRadioFieldState', 'RadioFieldState'],
  ['AceRadioSize', 'RadioSize'],
].sort((a, b) => b[0].length - a[0].length)

const MOVES = [
  {
    kind: 'file',
    from: 'src/components/atoms/AceButton.tsx',
    to: 'src/components/atoms/Button.tsx',
    stubExports: [
      ['Button', 'AceButton'],
      ['ButtonProps', 'AceButtonProps'],
      ['ButtonVariant', 'AceButtonVariant'],
      ['ButtonActionTone', 'AceButtonActionTone'],
      ['ButtonSize', 'AceButtonSize'],
      ['ButtonIcon', 'AceButtonIcon'],
      ['ButtonPreviewState', 'AceButtonPreviewState'],
    ],
    stubModule: './Button',
  },
  {
    kind: 'file',
    from: 'src/components/atoms/AceInputField.tsx',
    to: 'src/components/atoms/Input.tsx',
    stubExports: [
      ['Input', 'AceInputField'],
      ['InputProps', 'AceInputFieldProps'],
      ['InputIcon', 'AceInputFieldIcon'],
      ['InputSize', 'AceInputFieldSize'],
      ['InputVisualState', 'AceInputVisualState'],
    ],
    stubModule: './Input',
  },
  {
    kind: 'dir',
    from: 'src/components/atoms/AceBadge',
    to: 'src/components/atoms/Badge',
    fileRenames: [['AceBadge.tsx', 'Badge.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/atoms/AceTooltip',
    to: 'src/components/atoms/Tooltip',
    fileRenames: [['AceTooltip.tsx', 'Tooltip.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/atoms/AceTabs',
    to: 'src/components/atoms/Tabs',
    fileRenames: [
      ['AceTabs.tsx', 'Tabs.tsx'],
      ['AceTabCards.tsx', 'TabCards.tsx'],
      ['AceTabCardHeaderIcons.tsx', 'TabCardHeaderIcons.tsx'],
    ],
  },
  {
    kind: 'dir',
    from: 'src/components/atoms/AceProgressIndicator',
    to: 'src/components/atoms/ProgressIndicator',
    fileRenames: [
      ['AceProgressIndicator.tsx', 'ProgressIndicator.tsx'],
      ['AceProgressSpinner.tsx', 'ProgressSpinner.tsx'],
    ],
  },
  {
    kind: 'dir',
    from: 'src/components/atoms/AceAvailabilityTag',
    to: 'src/components/atoms/AvailabilityTag',
    fileRenames: [['AceAvailabilityTag.tsx', 'AvailabilityTag.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceInlineMessage',
    to: 'src/components/molecules/InlineMessage',
    fileRenames: [['AceInlineMessage.tsx', 'InlineMessage.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceToast',
    to: 'src/components/molecules/ToastMessage',
    fileRenames: [['AceToast.tsx', 'ToastMessage.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceAccordion',
    to: 'src/components/molecules/Accordion',
    fileRenames: [
      ['AceAccordion.tsx', 'Accordion.tsx'],
      ['AceAccordionReviewProgress.tsx', 'AccordionReviewProgress.tsx'],
    ],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceDropdownMenu',
    to: 'src/components/molecules/DropdownMenu',
    fileRenames: [['AceDropdownMenu.tsx', 'DropdownMenu.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceFiltering',
    to: 'src/components/molecules/Filtering',
    fileRenames: [
      ['AceFilterChip.tsx', 'FilterChip.tsx'],
      ['AceFilterToggleChip.tsx', 'FilterToggleChip.tsx'],
      ['AceFilterTrigger.tsx', 'FilterTrigger.tsx'],
      ['AceTableFilterHeader.tsx', 'TableFilterHeader.tsx'],
    ],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceSlider',
    to: 'src/components/molecules/Slider',
    fileRenames: [
      ['AceSlider.tsx', 'Slider.tsx'],
      ['AceSliderField.tsx', 'SliderField.tsx'],
    ],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceStepper',
    to: 'src/components/molecules/Stepper',
    fileRenames: [['AceStepper.tsx', 'Stepper.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceTaskBar',
    to: 'src/components/molecules/TaskBar',
    fileRenames: [['AceTaskBar.tsx', 'TaskBar.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AcePageHeader',
    to: 'src/components/molecules/PageHeader',
    fileRenames: [['AcePageHeader.tsx', 'PageHeader.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceSubHeader',
    to: 'src/components/molecules/SubHeader',
    fileRenames: [['AceSubHeader.tsx', 'SubHeader.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AcePagination',
    to: 'src/components/molecules/Pagination',
    fileRenames: [['AcePagination.tsx', 'Pagination.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceTable',
    to: 'src/components/molecules/Table',
    fileRenames: [['AceTable.tsx', 'Table.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/molecules/AceDescriptiveButton',
    to: 'src/components/molecules/ButtonDescriptive',
    fileRenames: [['AceDescriptiveButton.tsx', 'ButtonDescriptive.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceAttachments',
    to: 'src/components/organisms/Attachments',
    fileRenames: [['AceAttachments.tsx', 'Attachments.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceCards',
    to: 'src/components/organisms/Cards',
    fileRenames: [
      ['AceLandingPageCard.tsx', 'LandingPageCard.tsx'],
      ['AceDataCard.tsx', 'DataCard.tsx'],
    ],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceDatePicker',
    to: 'src/components/organisms/DatePicker',
    fileRenames: [['AceDatePicker.tsx', 'DatePicker.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceTimePicker',
    to: 'src/components/organisms/TimePicker',
    fileRenames: [['AceTimePicker.tsx', 'TimePicker.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceInlineDrawer',
    to: 'src/components/organisms/InlineDrawer',
    fileRenames: [
      ['AceInlineDrawer.tsx', 'InlineDrawer.tsx'],
      ['AceSideDrawer.tsx', 'SideDrawer.tsx'],
    ],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceScrollableList',
    to: 'src/components/organisms/ScrollableList',
    fileRenames: [
      ['AceScrollableList.tsx', 'ScrollableList.tsx'],
      ['AceScrollableListBody.tsx', 'ScrollableListBody.tsx'],
      ['AceScrollableListItemRow.tsx', 'ScrollableListItemRow.tsx'],
    ],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceSidebar',
    to: 'src/components/organisms/Sidebar',
    fileRenames: [['AceSidebar.tsx', 'Sidebar.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceSiteHeader',
    to: 'src/components/organisms/SiteHeader',
    fileRenames: [['AceSiteHeader.tsx', 'SiteHeader.tsx']],
  },
  {
    kind: 'dir',
    from: 'src/components/organisms/AceTimeline',
    to: 'src/components/organisms/Timeline',
    fileRenames: [
      ['AceTimeline.tsx', 'Timeline.tsx'],
      ['AceTimelineItem.tsx', 'TimelineItem.tsx'],
    ],
  },
]

const PATH_SEGMENT_MAP = [
  ['AceDescriptiveButton', 'ButtonDescriptive'],
  ['AceProgressIndicator', 'ProgressIndicator'],
  ['AceAvailabilityTag', 'AvailabilityTag'],
  ['AceInlineMessage', 'InlineMessage'],
  ['AceDropdownMenu', 'DropdownMenu'],
  ['AceScrollableList', 'ScrollableList'],
  ['AceInlineDrawer', 'InlineDrawer'],
  ['AceLandingPageCard', 'LandingPageCard'],
  ['AceDatePicker', 'DatePicker'],
  ['AceTimePicker', 'TimePicker'],
  ['AcePageHeader', 'PageHeader'],
  ['AceSubHeader', 'SubHeader'],
  ['AceSiteHeader', 'SiteHeader'],
  ['AceAttachments', 'Attachments'],
  ['AceFiltering', 'Filtering'],
  ['AcePagination', 'Pagination'],
  ['AceAccordion', 'Accordion'],
  ['AceStepper', 'Stepper'],
  ['AceTaskBar', 'TaskBar'],
  ['AceSidebar', 'Sidebar'],
  ['AceTimeline', 'Timeline'],
  ['AceSlider', 'Slider'],
  ['AceToast', 'ToastMessage'],
  ['AceTable', 'Table'],
  ['AceCards', 'Cards'],
  ['AceBadge', 'Badge'],
  ['AceTooltip', 'Tooltip'],
  ['AceTabs', 'Tabs'],
  ['AceButton', 'Button'],
  ['AceInputField', 'Input'],
  ['AceStatusPill', 'Badge'],
].sort((a, b) => b[0].length - a[0].length)

function hasGit() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { cwd: root, stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

const useGit = hasGit()

function movePath(fromAbs, toAbs) {
  fs.mkdirSync(path.dirname(toAbs), { recursive: true })
  if (useGit) {
    try {
      execSync(`git mv -f "${fromAbs}" "${toAbs}"`, { cwd: root, stdio: 'pipe' })
      return
    } catch {
      /* fall through */
    }
  }
  try {
    fs.renameSync(fromAbs, toAbs)
  } catch (err) {
    // Windows EPERM / locked handles — copy then remove
    if (fs.statSync(fromAbs).isDirectory()) {
      fs.cpSync(fromAbs, toAbs, { recursive: true })
      fs.rmSync(fromAbs, { recursive: true, force: true })
    } else {
      fs.copyFileSync(fromAbs, toAbs)
      fs.rmSync(fromAbs, { force: true })
    }
  }
}

function isStubDir(dirAbs) {
  if (!fs.existsSync(dirAbs)) return false
  const entries = fs.readdirSync(dirAbs)
  if (entries.length > 4) return false
  const indexPath = path.join(dirAbs, 'index.ts')
  if (!fs.existsSync(indexPath)) return false
  const t = fs.readFileSync(indexPath, 'utf8')
  return t.includes('@deprecated') || t.includes('Figma-named')
}

function isStubFile(fileAbs) {
  if (!fs.existsSync(fileAbs)) return false
  const t = fs.readFileSync(fileAbs, 'utf8')
  return t.includes('@deprecated') && t.length < 2000
}

function pascalToCamel(name) {
  return name.charAt(0).toLowerCase() + name.slice(1)
}

function pascalToSnakeUpper(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toUpperCase()
}

/**
 * Prefix-aware identifier rewrite:
 *   AceBadgeProps → BadgeProps
 *   aceBadgeStatusDotClass → badgeStatusDotClass
 *   ACE_INLINE_MESSAGE_TONES → INLINE_MESSAGE_TONES
 */
function rewriteIdentifiers(text) {
  let out = text
  let count = 0

  for (const [from, to] of SYMBOL_MAP) {
    // Pascal prefix (AceFoo / AceFooProps / AceFooBar)
    const pascalRe = new RegExp(`\\b${escapeRegExp(from)}([A-Za-z0-9]*)\\b`, 'g')
    out = out.replace(pascalRe, (_, rest) => {
      count++
      return to + rest
    })

    // camelCase aceFoo…
    const camelFrom = pascalToCamel(from) // aceBadge
    const camelTo = pascalToCamel(to) // badge
    const camelRe = new RegExp(`\\b${escapeRegExp(camelFrom)}([A-Za-z0-9]*)\\b`, 'g')
    out = out.replace(camelRe, (_, rest) => {
      count++
      return camelTo + rest
    })

    // SCREAMING ACE_FOO…
    const fromCore = from.replace(/^Ace/, '')
    const fromSnake = pascalToSnakeUpper(fromCore)
    const toSnake = pascalToSnakeUpper(to)
    const aceConst = `ACE_${fromSnake}`
    const screamRe = new RegExp(`\\b${escapeRegExp(aceConst)}([A-Z0-9_]*)\\b`, 'g')
    out = out.replace(screamRe, (_, rest) => {
      count++
      return toSnake + rest
    })
  }

  return { text: out, count }
}

function rewriteImportPaths(text) {
  let out = text
  let count = 0
  for (const [from, to] of PATH_SEGMENT_MAP) {
    const re = new RegExp(`(['"\`])([^'"\`]*?)${escapeRegExp(from)}([^'"\`]*)\\1`, 'g')
    out = out.replace(re, (full, q, pre, post) => {
      // Don't rewrite inside stub re-export alias comments unnecessarily —
      // but path segments should always update to new folders.
      count++
      return `${q}${pre}${to}${post}${q}`
    })
  }
  return { text: out, count }
}

function isAceStubPath(fileAbs) {
  const rel = path.relative(srcRoot, fileAbs).replace(/\\/g, '/')
  if (/components\/atoms\/AceButton\.tsx$/.test(rel)) return true
  if (/components\/atoms\/AceInputField\.tsx$/.test(rel)) return true
  // Entire Ace* stub directories (compat re-exports) — do not rewrite Ace aliases
  if (/components\/[^/]+\/Ace[^/]+\//.test(rel)) {
    if (isStubDir(path.dirname(fileAbs)) || isStubFile(fileAbs)) return true
  }
  return false
}

function rewriteFileContent(fileAbs) {
  if (isAceStubPath(fileAbs)) {
    // Stubs: CSS vars only. Do NOT rewrite import paths (AceStatusPill → Badge breaks stubs).
    const before = fs.readFileSync(fileAbs, 'utf8')
    const text = rewriteCssVarRefs(before).text
    if (text !== before) {
      fs.writeFileSync(fileAbs, text, 'utf8')
      summary.filesRewritten++
    }
    return
  }

  const before = fs.readFileSync(fileAbs, 'utf8')
  let text = before
  text = rewriteCssVarRefs(text).text
  text = rewriteImportPaths(text).text
  text = rewriteIdentifiers(text).text

  if (text !== before) {
    fs.writeFileSync(fileAbs, text, 'utf8')
    summary.filesRewritten++
  }
}

function writeDeprecatedStubFile(stubAbs, modulePath, exports) {
  const clean = ['/** @deprecated Re-export — prefer the Figma-named export. */']
  for (const [neu, old] of exports) {
    const asType =
      old.endsWith('Props') ||
      /Variant$|Size$|Tone$|Type$|Mode$|State$|Appearance$|Orientation$|Icon$/.test(old)
    if (asType) {
      clean.push(`export type { ${neu} as ${old} } from '${modulePath}'`)
    } else {
      clean.push(`export { ${neu} as ${old} } from '${modulePath}'`)
    }
  }
  clean.push('')
  fs.mkdirSync(path.dirname(stubAbs), { recursive: true })
  fs.writeFileSync(stubAbs, clean.join('\n'), 'utf8')
  summary.stubsWritten++
}

function writeDirStub(oldDirAbs, newDirAbs) {
  fs.mkdirSync(oldDirAbs, { recursive: true })
  // Relative from inside oldDir to newDir
  let rel = path.relative(oldDirAbs, newDirAbs).replace(/\\/g, '/')
  if (!rel.startsWith('.')) rel = './' + rel
  const stub = `/** @deprecated Import from the Figma-named folder instead. */\nexport * from '${rel}'\n`
  fs.writeFileSync(path.join(oldDirAbs, 'index.ts'), stub, 'utf8')
  summary.stubsWritten++
}

function clearDirContents(dirAbs) {
  if (!fs.existsSync(dirAbs)) return
  for (const entry of fs.readdirSync(dirAbs)) {
    fs.rmSync(path.join(dirAbs, entry), { recursive: true, force: true })
  }
}

function performMovesOnly() {
  for (const move of MOVES) {
    const fromAbs = path.join(root, move.from)
    const toAbs = path.join(root, move.to)

    if (move.kind === 'file') {
      if (fs.existsSync(toAbs)) {
        if (fs.existsSync(fromAbs) && isStubFile(fromAbs)) {
          summary.skipped.push(`file already moved ${move.to}`)
        } else if (fs.existsSync(fromAbs) && !isStubFile(fromAbs)) {
          // Target exists with real content; replace from with stub
          writeDeprecatedStubFile(fromAbs, move.stubModule, move.stubExports)
          summary.warnings.push(`wrote stub over leftover ${move.from}`)
        } else {
          // Ensure stub exists
          if (!fs.existsSync(fromAbs)) {
            writeDeprecatedStubFile(fromAbs, move.stubModule, move.stubExports)
          }
          summary.skipped.push(`file target exists ${move.to}`)
        }
        continue
      }
      if (!fs.existsSync(fromAbs)) {
        summary.skipped.push(`missing ${move.from}`)
        continue
      }
      if (isStubFile(fromAbs)) {
        summary.skipped.push(`stub only ${move.from}`)
        continue
      }
      movePath(fromAbs, toAbs)
      summary.filesRenamed++
      writeDeprecatedStubFile(fromAbs, move.stubModule, move.stubExports)
      continue
    }

    // Directory
    if (fs.existsSync(toAbs) && isStubDir(fromAbs)) {
      // Fix stub path if wrong
      writeDirStub(fromAbs, toAbs)
      summary.skipped.push(`dir already moved ${move.to}`)
      continue
    }

    if (fs.existsSync(toAbs) && fs.existsSync(fromAbs) && !isStubDir(fromAbs)) {
      // Partial: dest exists, source still has content — prefer dest, stub source
      summary.warnings.push(`both exist; stubbing source ${move.from}`)
      // Rename files inside dest if needed
      for (const [fromName, toName] of move.fileRenames || []) {
        const f = path.join(toAbs, fromName)
        const t = path.join(toAbs, toName)
        if (fs.existsSync(f) && !fs.existsSync(t)) {
          movePath(f, t)
          summary.filesRenamed++
        }
      }
      clearDirContents(fromAbs)
      writeDirStub(fromAbs, toAbs)
      continue
    }

    if (!fs.existsSync(fromAbs)) {
      summary.skipped.push(`missing dir ${move.from}`)
      continue
    }

    if (isStubDir(fromAbs)) {
      summary.skipped.push(`already stub ${move.from}`)
      continue
    }

    movePath(fromAbs, toAbs)
    summary.foldersMoved++

    for (const [fromName, toName] of move.fileRenames || []) {
      const f = path.join(toAbs, fromName)
      const t = path.join(toAbs, toName)
      if (fs.existsSync(f) && !fs.existsSync(t)) {
        movePath(f, t)
        summary.filesRenamed++
      }
    }

    writeDirStub(fromAbs, toAbs)
  }

  // AceStatusPill → Badge stub
  const statusPillDir = path.join(root, 'src/components/atoms/AceStatusPill')
  const badgeDir = path.join(root, 'src/components/atoms/Badge')
  if (fs.existsSync(badgeDir)) {
    clearDirContents(statusPillDir)
    fs.mkdirSync(statusPillDir, { recursive: true })
    fs.writeFileSync(
      path.join(statusPillDir, 'AceStatusPill.tsx'),
      `/** @deprecated Use Badge. */\nexport { Badge as AceStatusPill, type BadgeProps as AceStatusPillProps } from '../Badge/Badge'\n`,
      'utf8',
    )
    fs.writeFileSync(
      path.join(statusPillDir, 'statusPillFieldStyles.ts'),
      `/** @deprecated Use Badge/badgeFieldStyles. */\nexport {\n  badgeStatusDotClass as aceStatusPillDotClass,\n  badgeStatusLabelClass as aceStatusPillLabelClass,\n  badgeStatusShellClass as aceStatusPillShellClass,\n  badgeVariantTokens as aceStatusPillVariantTokens,\n  type BadgeVariant as AceStatusPillVariant,\n} from '../Badge/badgeFieldStyles'\n`,
      'utf8',
    )
    fs.writeFileSync(
      path.join(statusPillDir, 'index.ts'),
      `/** @deprecated Use Badge. */\nexport * from './AceStatusPill'\nexport * from './statusPillFieldStyles'\n`,
      'utf8',
    )
    summary.stubsWritten += 3
  }
}

function rewriteAllSrc() {
  const indexPath = path.join(srcRoot, 'index.ts')
  walkFiles(srcRoot, (file) => {
    if (!/\.(tsx?|css)$/.test(file)) return
    if (path.normalize(file) === path.normalize(variablesPath)) return
    // index.ts is owned by rewriteIndexTs — never rewrite Ace* aliases away
    if (path.normalize(file) === path.normalize(indexPath)) return
    rewriteFileContent(file)
  })
}

function dedupeExportList(list) {
  const seen = new Set()
  const parts = []
  for (const raw of list.split(',')) {
    const item = raw.trim()
    if (!item) continue
    const key = item.replace(/^type\s+/, '')
    if (seen.has(key)) continue
    seen.add(key)
    parts.push(item)
  }
  return parts.join(', ')
}

function rewriteIndexTs() {
  const indexPath = path.join(srcRoot, 'index.ts')
  if (!fs.existsSync(indexPath)) return

  let text = fs.readFileSync(indexPath, 'utf8')
  const compatMarker = '/* ace→figma deprecated re-exports */'
  if (text.includes(compatMarker)) {
    text = text.slice(0, text.indexOf(compatMarker)).trimEnd() + '\n'
  }

  text = rewriteCssVarRefs(text).text
  text = rewriteImportPaths(text).text
  text = rewriteIdentifiers(text).text
  text = text.replaceAll("from './components/atoms/AceButton'", "from './components/atoms/Button'")
  text = text.replaceAll("from './components/atoms/AceInputField'", "from './components/atoms/Input'")
  // Collapse AceStatusPill → Badge duplicates inside export lists
  text = text.replace(/export \{([^}]+)\} from/g, (_, list) => `export { ${dedupeExportList(list)} } from`)

  const compat = `
${compatMarker}
/** @deprecated Use Badge */
export { Badge as AceBadge, type BadgeProps as AceBadgeProps } from './components/atoms/Badge/Badge'
/** @deprecated Use Badge */
export { Badge as AceStatusPill, type BadgeProps as AceStatusPillProps } from './components/atoms/Badge/Badge'
/** @deprecated Use Button */
export { Button as AceButton, type ButtonProps as AceButtonProps } from './components/atoms/Button'
/** @deprecated Use Input */
export { Input as AceInputField, type InputProps as AceInputFieldProps } from './components/atoms/Input'
/** @deprecated Use Tooltip */
export {
  Tooltip as AceTooltip,
  TooltipContent as AceTooltipContent,
  TooltipProvider as AceTooltipProvider,
  TooltipTrigger as AceTooltipTrigger,
  TooltipIconWrap as AceTooltipIconWrap,
} from './components/atoms/Tooltip/Tooltip'
/** @deprecated Use Tabs */
export { Tabs as AceTabs } from './components/atoms/Tabs/Tabs'
export { TabCards as AceTabCards } from './components/atoms/Tabs/TabCards'
/** @deprecated Use ProgressIndicator */
export {
  ProgressIndicator as AceProgressIndicator,
  ProgressSpinner as AceProgressSpinner,
} from './components/atoms/ProgressIndicator'
/** @deprecated Use AvailabilityTag */
export { AvailabilityTag as AceAvailabilityTag } from './components/atoms/AvailabilityTag/AvailabilityTag'
/** @deprecated Use InlineMessage */
export { InlineMessage as AceInlineMessage } from './components/molecules/InlineMessage/InlineMessage'
/** @deprecated Use ToastMessage */
export { ToastMessage as AceToast } from './components/molecules/ToastMessage/ToastMessage'
/** @deprecated Use Accordion */
export { Accordion as AceAccordion } from './components/molecules/Accordion/Accordion'
/** @deprecated Use DropdownMenu */
export { DropdownMenu as AceDropdownMenu } from './components/molecules/DropdownMenu/DropdownMenu'
/** @deprecated Use Filtering */
export {
  FilterChip as AceFilterChip,
  FilterToggleChip as AceFilterToggleChip,
  FilterTrigger as AceFilterTrigger,
  TableFilterHeader as AceTableFilterHeader,
} from './components/molecules/Filtering'
/** @deprecated Use Slider */
export { Slider as AceSlider, SliderField as AceSliderField } from './components/molecules/Slider'
/** @deprecated Use Stepper */
export { Stepper as AceStepper } from './components/molecules/Stepper'
/** @deprecated Use TaskBar */
export { TaskBar as AceTaskBar } from './components/molecules/TaskBar'
/** @deprecated Use PageHeader */
export { PageHeader as AcePageHeader } from './components/molecules/PageHeader'
/** @deprecated Use SubHeader */
export { SubHeader as AceSubHeader } from './components/molecules/SubHeader'
/** @deprecated Use Pagination */
export { Pagination as AcePagination } from './components/molecules/Pagination/Pagination'
/** @deprecated Use Table */
export { Table as AceTable } from './components/molecules/Table/Table'
/** @deprecated Use ButtonDescriptive */
export { ButtonDescriptive as AceDescriptiveButton } from './components/molecules/ButtonDescriptive'
/** @deprecated Use Cards */
export { LandingPageCard as AceLandingPageCard, DataCard as AceDataCard } from './components/organisms/Cards'
/** @deprecated Use DatePicker */
export { DatePicker as AceDatePicker } from './components/organisms/DatePicker/DatePicker'
/** @deprecated Use TimePicker */
export { TimePicker as AceTimePicker } from './components/organisms/TimePicker/TimePicker'
/** @deprecated Use InlineDrawer */
export { InlineDrawer as AceInlineDrawer } from './components/organisms/InlineDrawer/InlineDrawer'
/** @deprecated Use SideDrawer */
export { SideDrawer as AceSideDrawer } from './components/organisms/InlineDrawer/SideDrawer'
/** @deprecated Use ScrollableList */
export { ScrollableList as AceScrollableList } from './components/organisms/ScrollableList/ScrollableList'
/** @deprecated Use Sidebar */
export { Sidebar as AceSidebar } from './components/organisms/Sidebar/Sidebar'
/** @deprecated Use SiteHeader */
export { SiteHeader as AceSiteHeader } from './components/organisms/SiteHeader/SiteHeader'
/** @deprecated Use Timeline */
export { Timeline as AceTimeline } from './components/organisms/Timeline/Timeline'
export { TimelineItem as AceTimelineItem } from './components/organisms/Timeline/TimelineItem'
/** @deprecated Use Attachments */
export { Attachments as AceAttachments } from './components/organisms/Attachments/Attachments'
`

  text = text.trimEnd() + '\n' + compat
  fs.writeFileSync(indexPath, text, 'utf8')
  summary.filesRewritten++
}

function ensureBarrelsAndRadixFix() {
  const barrels = {
    'src/components/atoms/Badge': ['./Badge', './badgeFieldStyles'],
    'src/components/atoms/Tooltip': ['./Tooltip', './tooltipFieldStyles'],
    'src/components/atoms/Tabs': ['./Tabs', './TabCards', './TabCardHeaderIcons'],
    'src/components/atoms/AvailabilityTag': ['./AvailabilityTag'],
    'src/components/molecules/InlineMessage': ['./InlineMessage', './inlineMessageFieldStyles'],
    'src/components/molecules/ToastMessage': ['./ToastMessage', './toastFieldStyles'],
    'src/components/molecules/Accordion': ['./Accordion', './AccordionReviewProgress', './MaterialSymbol'],
    'src/components/molecules/DropdownMenu': ['./DropdownMenu', './menuEntryHighlight'],
    'src/components/molecules/Pagination': ['./Pagination'],
    'src/components/molecules/Table': ['./Table'],
    'src/components/organisms/Attachments': ['./Attachments', './attachmentsFieldStyles'],
    'src/components/organisms/DatePicker': ['./DatePicker', './datePickerUtils'],
    'src/components/organisms/TimePicker': ['./TimePicker', './timePickerUtils'],
    'src/components/organisms/InlineDrawer': ['./InlineDrawer', './SideDrawer'],
    'src/components/organisms/ScrollableList': [
      './ScrollableList',
      './ScrollableListBody',
      './ScrollableListItemRow',
      './scrollableListIcons',
      './scrollableListFieldStyles',
    ],
    'src/components/organisms/Sidebar': [
      './Sidebar',
      './GroupFormDialog',
      './SidebarOverflowMenu',
      './sidebarRowActions',
    ],
    'src/components/organisms/SiteHeader': ['./SiteHeader', './FinScanLogo', './SiteHeaderToolbarIcons'],
    'src/components/organisms/Timeline': ['./Timeline', './TimelineItem'],
  }

  for (const [dir, mods] of Object.entries(barrels)) {
    const abs = path.join(root, dir)
    if (!fs.existsSync(abs)) continue
    const indexPath = path.join(abs, 'index.ts')
    if (dir.endsWith('Sidebar')) {
      fs.writeFileSync(
        indexPath,
        `export * from './Sidebar'
export * from './GroupFormDialog'
export { EditGroupDialog } from './EditGroupDialog'
export * from './SidebarOverflowMenu'
export * from './sidebarRowActions'
`,
        'utf8',
      )
      continue
    }
    if (fs.existsSync(indexPath)) continue
    const content = mods.map((m) => `export * from '${m}'`).join('\n') + '\n'
    fs.writeFileSync(indexPath, content, 'utf8')
  }

  // Strip accidental self-aliases created when AceStatusPill → Badge
  walkFiles(path.join(srcRoot, 'components'), (file) => {
    if (!/\.(tsx?)$/.test(file)) return
    let t = fs.readFileSync(file, 'utf8')
    const before = t
    t = t.replace(/\n\/\*\* @deprecated[^*]*\*\/\nexport const (\w+) = \1\n/g, '\n')
    t = t.replace(/\n\/\*\* @deprecated[^*]*\*\/\nexport type (\w+) = \1\n/g, '\n')
    if (t !== before) fs.writeFileSync(file, t, 'utf8')
  })

  // Radix namespace collision: import * as DropdownMenu + export function DropdownMenu
  const radixTargets = [
    'src/components/molecules/DropdownMenu/DropdownMenu.tsx',
    'src/components/organisms/Sidebar/Sidebar.tsx',
    'src/components/organisms/DatePicker/DatePicker.tsx',
    'src/components/organisms/TimePicker/TimePicker.tsx',
    'src/components/organisms/ScreeningResultsTable/ScreeningColumnsMenu.tsx',
  ]
  for (const rel of radixTargets) {
    const p = path.join(root, rel)
    if (!fs.existsSync(p)) continue
    let t = fs.readFileSync(p, 'utf8')
    if (!t.includes("import * as DropdownMenu from '@radix-ui/react-dropdown-menu'")) continue
    t = t.replace(
      "import * as DropdownMenu from '@radix-ui/react-dropdown-menu'",
      "import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'",
    )
    t = t.replace(/\bDropdownMenu\./g, 'DropdownMenuPrimitive.')
    fs.writeFileSync(p, t, 'utf8')
  }
}

function walkFiles(dir, fn) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkFiles(full, fn)
    else fn(full)
  }
}

function main() {
  console.log('rename-ace-to-figma: starting…')

  console.log('1/6 CSS variables.css canonical + aliases')
  transformVariablesCss()

  console.log('2/6 CSS usages across src/')
  updateCssUsagesAcrossSrc()

  console.log('3/6 Move Ace* → Figma folders/files + stubs (no content rewrite yet)')
  performMovesOnly()

  console.log('4/6 Rewrite imports/symbols across src/')
  rewriteAllSrc()

  console.log('5/6 Rewrite src/index.ts + deprecated Ace re-exports')
  rewriteIndexTs()

  console.log('6/6 Barrels, radix collision fix, self-alias cleanup')
  ensureBarrelsAndRadixFix()

  // Second pass for any stragglers
  rewriteAllSrc()

  console.log('\n=== Summary ===')
  console.log(`CSS canonical defs created/updated: ${summary.cssCanonical}`)
  console.log(`CSS aliases added: ${summary.cssAliasesAdded}`)
  console.log(`CSS usage ref updates: ${summary.cssUsagesUpdated}`)
  console.log(`Folders moved: ${summary.foldersMoved}`)
  console.log(`Inner files renamed: ${summary.filesRenamed}`)
  console.log(`Compat stubs written: ${summary.stubsWritten}`)
  console.log(`Source files rewritten: ${summary.filesRewritten}`)
  if (summary.warnings.length) {
    console.log(`Warnings (${summary.warnings.length}):`)
    for (const w of summary.warnings.slice(0, 40)) console.log(`  - ${w}`)
  }
  if (summary.skipped.length) {
    console.log(`Skipped (${summary.skipped.length}):`)
    for (const s of summary.skipped.slice(0, 50)) console.log(`  - ${s}`)
  }
  console.log('Done.')
}

main()
