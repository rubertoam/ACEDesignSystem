import fs from 'node:fs'
import path from 'node:path'

const pagesDir = 'src/pages'

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

for (const [file, exportName] of Object.entries(QA_MAP)) {
  const full = path.join(pagesDir, file)
  let src = fs.readFileSync(full, 'utf8')

  // Strip every qa={...LabQa} / qa={overviewLabQa} injection
  src = src.replace(/\n\s*qa=\{[A-Za-z0-9_]+\}/g, '')

  // Clean unused buttonLabCode/Usage imports if present without usage
  if (file === 'ButtonPlaygroundLab.tsx') {
    src = src.replace(
      /import\s*\{([^}]*)\}\s*from\s*['\"]\.\/labTabDocs['\"]/,
      (fullImp, inner) => {
        const names = inner
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
          .filter((n) => n === exportName || src.includes(n + '}') || src.includes(n + ',') || src.includes(`{${n}`))
        // keep only exportName for buttons if code/usage unused
        const keep = names.filter((n) => n === exportName || src.includes(`={${n}`) || src.includes(`{${n}}`))
        const final = keep.length ? keep : [exportName]
        // ensure exportName present
        if (!final.includes(exportName)) final.push(exportName)
        return `import { ${[...new Set(final)].join(', ')} } from './labTabDocs'`
      },
    )
  }

  // Ensure import exists
  if (!src.includes(`from './labTabDocs'`) && !src.includes(`from \"./labTabDocs\"`)) {
    src = src.replace(
      /(import\s*\{[^}]*\}\s*from\s*['\"]\.\/ComponentLabPage['\"]\s*)/,
      `$1\nimport { ${exportName} } from './labTabDocs'\n`,
    )
  } else if (!new RegExp(`\\b${exportName}\\b`).test(src.match(/import\s*\{[^}]*\}\s*from\s*['\"]\.\/labTabDocs['\"]/)?.[0] ?? '')) {
    src = src.replace(
      /import\s*\{([^}]*)\}\s*from\s*['\"]\.\/labTabDocs['\"]/,
      (fullImp, inner) => {
        const names = inner.split(',').map((s) => s.trim()).filter(Boolean)
        if (!names.includes(exportName)) names.push(exportName)
        return `import { ${names.join(', ')} } from './labTabDocs'`
      },
    )
  }

  // Insert qa right after <ComponentLabPage opening tag's first newline props
  if (!src.includes(`qa={${exportName}}`)) {
    src = src.replace(
      /<ComponentLabPage(\s+)/,
      `<ComponentLabPage$1qa={${exportName}}$1`,
    )
  }

  // Cards: ensure shared code/usage if imports present
  if (file === 'CardsLab.tsx') {
    if (src.includes('cardsLabCode') && !src.includes('code={cardsLabCode}')) {
      src = src.replace(
        /code=\{\s*<ComponentLabCode>\{`[\s\S]*?`\}<\/ComponentLabCode>\s*\}/,
        'code={cardsLabCode}',
      )
    }
    if (src.includes('cardsLabUsage') && !src.includes('usage={cardsLabUsage}')) {
      src = src.replace(
        /usage=\{\s*<div className="space-y-6[\s\S]*?<\/div>\s*\}/,
        'usage={cardsLabUsage}',
      )
    }
    // Remove unused ComponentLabCode import if code={cardsLabCode}
    if (src.includes('code={cardsLabCode}')) {
      src = src.replace(
        /import\s*\{\s*ComponentLabCode\s*,\s*ComponentLabPage\s*\}\s*from\s*['\"]\.\/ComponentLabPage['\"]/,
        `import { ComponentLabPage } from './ComponentLabPage'`,
      )
      src = src.replace(
        /import\s*\{\s*ComponentLabPage\s*,\s*ComponentLabCode\s*\}\s*from\s*['\"]\.\/ComponentLabPage['\"]/,
        `import { ComponentLabPage } from './ComponentLabPage'`,
      )
    }
  }

  fs.writeFileSync(full, src)
  console.log('fixed', file)
}
