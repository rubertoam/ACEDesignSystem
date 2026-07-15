# Filtering business rules

Components: `FilterTrigger`, `FilterChip`, `FilterToggleChip`, `TableFilterHeader`

## 1. Data model

| Concept | Representation | Notes |
|---------|----------------|-------|
| Filter dimension | Host id (lab examples: locked / users / groups / statuses) | Menu checkbox maps to a chip |
| Applied filters | Host `Set` or array | Checking adds a chip; clearing removes it |
| Toggle chip state | `pressed: boolean` | Standalone on / off control |

These pieces are UI only. The host owns the actual filter logic.

---

## 2. Component structure

| Export | Role |
|--------|------|
| `FilterTrigger` | Button with optional chevron; used as the Filters menu trigger |
| `FilterChip` | Open control (label + chevron) plus optional clear |
| `FilterToggleChip` | Single pressed toggle; no chevron or clear |
| `TableFilterHeader` | Title, actions, trailing slot, search, and optional chips row |
| `filterViewMode.ts` | Modes, labels, menu items, wide panel width |
| `filterFieldStyles.ts` | Shared class tokens |

---

## 3. Configuration

| Component | Key props | Defaults |
|-----------|-----------|----------|
| `FilterTrigger` | `label`, `showChevron` | Chevron on |
| `FilterChip` | `label`, `onOpen?`, `onClear?`, `clearLabel`, `clearable`, `showChevron` | `clearLabel='Clear filter'`; clear only renders when `clearable` and `onClear` are set |
| `FilterToggleChip` | `label`, `pressed` | `pressed` starts false |
| `TableFilterHeader` | `title`, `actions?`, `trailing?`, `chips?`, search props | Search placeholder and aria label default to `'Search'` |

---

## 4. Interaction rules

### Filters menu and applied chips (host pattern)
1. Open Filters and show checkbox options
2. Checking an option adds an applied chip (for example `Locked: All`)
3. Unchecking or clearing a chip removes it from the applied set
4. Hide the chips row when nothing is applied

### Toggle chips
- Click flips `pressed`
- Stays in the active Neutral/700 look while pressed, including on hover
- Not tied to the filters menu, these are meant to be dynamic filters based on user actions in the table

### Clearable chip
- Clear stops propagation, then calls `onClear`
- Open is optional via `onOpen` (the lab may leave it out)

---

## 5. Defaults and visual rest state

| State | Appearance |
|-------|------------|
| Rest | Shade 0 surface, Neutral/400 border |
| Hover / pressed toggle | Transparent border, Neutral/700 fill, Neutral/100 text |
| Clear icon at rest | Neutral/500 fill; follows the selected icon color when the chip is hovered |
| Search width | `--ace-filter-search-width` (12.5rem) |

---

## 6. API

```
<DropdownMenu triggerLabel="Filters" triggerMode="filter" items={[checkbox…]} />
<FilterChip label="Locked: All" onClear={…} />
<FilterToggleChip label="Filter 1" pressed={on} onClick={toggle} />
<TableFilterHeader title="…" actions={…} trailing={…} chips={…} searchValue={…} />
```

Helpers include `FILTER_VIEW_MODES`, `filterViewModeLabel`, `filterViewModeMenuItems`, and layout class exports.

---

## 7. Accessibility

- Toggle chips use `aria-pressed`
- Clear button has an `aria-label` (default `"Clear filter"`)
- Open button uses `aria-label={openLabel ?? label}`
- Header search uses `aria-label={searchAriaLabel}`
- Chevron and clear SVGs are `aria-hidden`
- Disabled trigger / toggle use `pointer-events-none` and `opacity-50`

---

## 8. Visual and design tokens

| Area | Tokens |
|------|--------|
| Geometry | `--ace-filter-radius` (4px), `-gap`, `-px`, `-py` |
| Trigger / toggle | `--ace-filter-trigger-*`, `-active-*` |
| Chips | `--ace-filter-chip-*`, `-selected-*`, `-clear` |
| Header | `--ace-filter-header-title`, `-header-gap`, `-search-width` |
| Motion | About 150ms ease-out on color changes |

---

## 9. QA checklist

- Filters trigger opens the menu; checkboxes add and remove chips
- Clearing a chip removes it and unchecks the matching option when the host wires that up
- Toggle chips flip `aria-pressed` and keep the active look while pressed
- Chip hover updates open, clear, and chevron colors
- Header layout: title and actions on the left, trailing and search on the right; chips are optional
- Focus rings show on every interactive chip and trigger part
- Disabled trigger / toggle use the muted opacity treatment
