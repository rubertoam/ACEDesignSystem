/**
 * Injects `qa={...}` from labTabDocs into ComponentLabPage labs that lack QA.
 * Also upgrades thin Cards code/usage when placeholders match.
 */
import fs from 'node:fs'
import path from 'node:path'

const pagesDir = 'src/pages'

/** lab file → named export in labTabDocs */
const QA_MAP = {
  'ButtonPlaygroundLab.tsx': 'buttonLabQa',
  'CheckboxPlaygroundLab.tsx': 'checkboxLabQa',
  'RadioPlaygroundLab.tsx': 'radioLabQa',
  'TogglePlaygroundLab.tsx': 'toggleLabQa',
  'InputPlaygroundLab.tsx': 'inputLabQa',
  'DropdownsLab.tsx': 'dropdownsLabQa',
  'TooltipLab.tsx': 'tooltipLabQa',
  'TabsLab.tsx': 'tabsLabQa',
  'BadgesLab.tsx': 'badgesLabQa',
  'ToastMessagesLab.tsx': 'toastLabQa',
  'InlineMessagesLab.tsx': 'inlineMessageLabQa',
  'DialogModalLab.tsx': 'dialogModalLabQa',
  'InlineDrawerLab.tsx': 'inlineDrawerLabQa',
  'PaginationLab.tsx': 'paginationLabQa',
  'AccordionLab.tsx': 'accordionLabQa',
  'SlidersLab.tsx': 'sliderLabQa',
  'SteppersLab.tsx': 'stepperLabQa',
  'ProgressIndicatorsLab.tsx': 'progressLabQa',
  'CardsLab.tsx': 'cardsLabQa',
  'AttachmentsLab.tsx': 'attachmentsLabQa',
  'ScrollableListLab.tsx': 'scrollableListLabQa',
  'SiteHeaderLab.tsx': 'siteHeaderLabQa',
  'TimelineLab.tsx': 'timelineLabQa',
  'TaskBarLab.tsx': 'taskBarLabQa',
  'PageHeadersLab.tsx': 'pageHeadersLabQa',
  'DateAndTimePickersLab.tsx': 'dateTimeLabQa',
  'FinScanIconLab.tsx': 'finScanIconLabQa',
  'LayoutsLab.tsx': 'layoutsLabQa',
  'ColorsLab.tsx': 'colorsLabQa',
  'TypographyLab.tsx': 'typographyLabQa',
  'DropShadowsLab.tsx': 'dropShadowsLabQa',
  'TokensLab.tsx': 'tokensLabQa',
  'AnimationsLab.tsx': 'animationsLabQa',
  'IconographyLab.tsx': 'iconographyLabQaExtra',
  'AtomsLab.tsx': 'overviewLabQa',
  'MoleculesLab.tsx': 'overviewLabQa',
  'OrganismsLab.tsx': 'overviewLabQa',
}

/** Labs that already ship QA via implementationRules — still add matrix via qa prop (overrides empty only; ComponentLabPage prefers qa). */
const ALSO_WIRE = new Set([
  'FilteringLab.tsx',
  'SidebarLab.tsx',
  'DataTableLab.tsx',
  // DateAndTime already in QA_MAP
  // Iconography already in QA_MAP
])

// Filtering/Sidebar/DataTable keep markdown QA; skip overriding unless we want matrix supplement.
// User asked for all tabs updated — for those with markdown QA, leave markdown as source of truth.

function ensureImport(src, exportName) {
  if (src.includes(`from './labTabDocs'`) || src.includes(`from \"./labTabDocs\"`)) {
    // merge export into existing import
    return src.replace(
      /import\s*\{([^}]*)\}\s*from\s*['\"]\.\/labTabDocs['\"]/,
      (full, inner) => {
        const names = inner.split(',').map((s) => s.trim()).filter(Boolean)
        if (names.includes(exportName)) return full
        names.push(exportName)
        return `import { ${names.join(', ')} } from './labTabDocs'`
      },
    )
  }
  // after ComponentLabPage import
  if (src.includes(`from './ComponentLabPage'`) || src.includes(`from \"./ComponentLabPage\"`)) {
    return src.replace(
      /(import\s*\{[^}]*\}\s*from\s*['\"]\.\/ComponentLabPage['\"]\s*)/,
      `$1\nimport { ${exportName} } from './labTabDocs'\n`,
    )
  }
  return `import { ${exportName} } from './labTabDocs'\n` + src
}

function injectQaProp(src, exportName) {
  if (/\bqa=\{/.test(src)) return src
  // Insert before closing of ComponentLabPage — prefer before changelog= or before />
  if (/changelog=\{/.test(src)) {
    return src.replace(/(\s+)(changelog=\{)/, `$1qa={${exportName}}\n$1$2`)
  }
  if (/implementationRulesMarkdown=\{/.test(src)) {
    return src.replace(
      /(\s+)(implementationRulesMarkdown=\{)/,
      `$1qa={${exportName}}\n$1$2`,
    )
  }
  // before final />
  return src.replace(
    /(<ComponentLabPage[\s\S]*?)(\n\s*\/>)/,
    `$1\n      qa={${exportName}}$2`,
  )
}

function upgradeButtonLab(src) {
  if (!src.includes('ButtonPlaygroundLab') && !src.includes('function ButtonPlaygroundLab')) return src
  let out = src
  if (!out.includes('buttonLabCode')) {
    out = ensureImport(out, 'buttonLabCode')
    out = ensureImport(out, 'buttonLabUsage')
    out = ensureImport(out, 'buttonLabQa')
  }
  // Replace code={...} block is risky; only ensure qa
  return out
}

function upgradeCardsLab(src) {
  if (!src.includes('function CardsLab')) return src
  let out = ensureImport(src, 'cardsLabCode')
  out = ensureImport(out, 'cardsLabUsage')
  out = ensureImport(out, 'cardsLabQa')
  // Replace thin code/usage if present
  out = out.replace(
    /code=\{\s*<ComponentLabCode>\{`[\s\S]*?`\}<\/ComponentLabCode>\s*\}/,
    'code={cardsLabCode}',
  )
  out = out.replace(
    /usage=\{\s*<div className="space-y-6[\s\S]*?<\/div>\s*\}/,
    'usage={cardsLabUsage}',
  )
  return out
}

let changed = 0
for (const [file, exportName] of Object.entries(QA_MAP)) {
  const full = path.join(pagesDir, file)
  if (!fs.existsSync(full)) {
    console.warn('missing', file)
    continue
  }
  let src = fs.readFileSync(full, 'utf8')
  if (!src.includes('ComponentLabPage')) {
    console.warn('no ComponentLabPage', file)
    continue
  }
  if (/\bqa=\{/.test(src)) {
    console.log('skip (has qa)', file)
    continue
  }
  src = ensureImport(src, exportName)
  src = injectQaProp(src, exportName)
  if (file === 'CardsLab.tsx') src = upgradeCardsLab(src)
  if (file === 'ButtonPlaygroundLab.tsx') {
    src = ensureImport(src, 'buttonLabCode')
    src = ensureImport(src, 'buttonLabUsage')
    // Replace code/usage with shared docs when we can find props
    if (/code=\{/.test(src) && !src.includes('code={buttonLabCode}')) {
      // keep existing rich code; only qa is required
    }
  }
  fs.writeFileSync(full, src)
  changed += 1
  console.log('wired', file, '→', exportName)
}

console.log('changed', changed)
