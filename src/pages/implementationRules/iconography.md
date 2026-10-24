# Iconography business rules

System: Google Material Symbols Outlined through `MaterialSymbol`

## 1. Data model

| Field | Values |
|-------|--------|
| Ligature `name` | Underscore form (`account_circle`) |
| `MaterialSymbolSize` | `sm` 16, `md` 24, `lg` 28, `xl` 32 px |
| `filled` | FILL axis 0 or 1 (default outlined) |
| `weight` | 300, 400, 500, 600, or 700 (default 400) |
| Catalog `fill` | `'outlined'`, `'filled'`, or `'either'` |
| Icon button surface | No border stroke (sidebar) vs border stroke (table toolbar) |

Optical size (`opsz`): sm uses 20; md uses 24; lg / xl track rendered size.
Rendered size is set with inline `font-size` / width / height so Google Fonts’ default 24px cannot override the scale.

---

## 2. Component structure

```
MaterialSymbol → <span class="material-symbols-outlined">{name}</span>
  fontVariationSettings: FILL, wght, GRAD 0, opsz

Helpers:
  aceChevronIconClass                    → 1rem chevron box
  sidebarIconButtonClass / row actions  → ghost (no rest border)
  screeningToolbarIconButtonClass       → bordered toolbar control
```

The Material Symbols Outlined variable font is loaded in app CSS / HTML.

---

## 3. Configuration (`MaterialSymbol`)

| Prop | Default | Rule |
|------|---------|------|
| `name` | required | Ligature string |
| `size` | `'md'` | Sets text size and opsz |
| `filled` | `false` | Sets FILL to 1 when true |
| `weight` | `400` | Variable font weight |
| `className` / `style` | n/a | Color comes from `currentColor` |
| `title` | n/a | If set, the glyph is not `aria-hidden` |

---

## 4. Interaction and usage rules

Prefer the horizontal kebab `more_horiz` for menus.

### Icon button hover

| Variant | Rest | Hover |
|---------|------|-------|
| No border stroke | Transparent + transparent border; icon `--ace-icon-button-icon-rest-ghost` | `--ace-icon-button-hover-bg` + `--ace-icon-button-border` + `--ace-icon-button-icon` |
| Border stroke | `--ace-icon-button-surface` + `--ace-icon-button-border` + `--ace-icon-button-icon` | Same border; fill `--ace-icon-button-hover-bg` |

Figma semantic aliases: `colors/bg/primary` → `--icon-button-hover-bg` (and `--ace-icon-button-hover-bg`); `colors/border/default` → `--icon-button-border`; `colors/icon/primary` → `--icon-button-icon`; `colors/surface/primary` → `--icon-button-surface`.

Sidebar row actions fade in on row or header hover / focus. An open menu keeps the hover look.

---

## 5. Defaults

| Default | Value |
|---------|-------|
| Style | Outlined (`filled=false`) |
| Size | `md` |
| Weight | `400` |
| GRAD | `0` |
| Decorative a11y | `aria-hidden={true}` unless `title` is set |
| Color | Inherits `currentColor` |

---

## 6. API

```
<MaterialSymbol name="search" size="md" />
<MaterialSymbol name="favorite" filled className="text-[var(--ace-error-500)]" />

<button type="button" aria-label="…" className={sidebarIconButtonClass}>
  <MaterialSymbol name="more_horiz" size="md" className="text-current" />
</button>
```

Look up names on fonts.google.com/icons and turn spaces into underscores.

---

## 7. Accessibility

- Decorative icons default to `aria-hidden`
- If you need a meaningful glyph, prefer labeling the control; use `title` sparingly
- Icon-only buttons need an `aria-label`
- Don’t rely on color alone for status; pair icons with message text in toast and inline message

---

## 8. Visual and design tokens

| Area | Tokens / notes |
|------|----------------|
| Favorite selected | `--ace-error-500` |
| Status glyphs | `--ace-toast-icon-success/info/error/warning` |
| Ghost hover | `--ace-icon-button-hover-bg`, `--ace-icon-button-border`, `--ace-icon-button-icon` |
| Stroke rest / hover | `--ace-icon-button-surface`, `--ace-icon-button-border`, `--ace-icon-button-hover-bg` |
| Chevrons | `--screening-icon-chevron` plus `aceChevronIconClass` |
| Size guidance | sm for accordion / dense UI, md default, lg for controls, xl for headers / toolbar |

---

## 9. QA checklist

### Matrix
| Variant / mode | Cover | Pass when |
|----------------|-------|-----------|
| size sm → xl | Outlined and filled samples | Optical size matches `--icon-size-*`; weight 300 still hits cleanly |
| ghost / stroke icon buttons | Rest + hover on gray and white surfaces | Hover tokens apply; focus ring visible |
| status / toast glyphs | Success, info, warning, error | Colors match toast/status icon tokens |

### Interaction & a11y
- Font loads and ligatures render as icons, not raw text
- Icon-only buttons have `aria-label`; decorative glyphs stay `aria-hidden`
- Dense toolbars with `weight={300}` still hit cleanly in 32px (`size-8`) targets
- Don’t rely on color alone for status — pair icons with visible text in messaging patterns
