# Data Table business rules

Component: `DataTable`

The lab also shows header filter patterns that are not wired into the table’s data pipeline. Watchlist Screening is just one demo dataset. This table is meant to be reused across the product.

## 1. Data model

The host app owns rows and column definitions. The lab uses a sample row shape like this:

```
RowStatus = 'New' | 'Escalated'   // demo statuses only

DataTableRow = {
  id,
  // host / demo fields (for example name, date, status, score, tags)
  status
}
```

| Rule | Detail |
|------|--------|
| High-risk score (demo) | Score of 85 or higher gets high-risk styling |
| Stale age indicator (demo) | Shows only when age tone is `stale` |
| Sort keys | Whatever column keys the host / demo define (status, name, date, age, score, tags, and so on) |
| Default columns | Every configured column starts visible, in definition order |

---

## 2. Component structure

```
DataTable
├─ Accordion shell (optional) OR flat card
└─ mainPanel
   ├─ Toolbar (quick filters | columns | history | search)
   ├─ Scroll → table (sticky thead, rows, expand rows, empty state)
   └─ Pagination (optional)
```

Also used nearby: columns menu, row actions menu, and shared toolbar / header styles.

---

## 3. Visibility controls

```
const visibilityControls = {
  ...DEFAULT_DATA_TABLE_VISIBILITY_CONTROLS,
  ...visibilityOverrides,
}
```

| Control | Default | When on |
|---------|---------|---------|
| `showAccordionHeader` | false | Wraps the table in an accordion and shows progress (for example completed / total) |
| `showQuickFilters` | true | Shows status chips; turning it off clears those filters |
| `showColumnMenu` | true | Shows the columns icon menu |
| `showHistoryToggle` | true | Lets users show or hide historical (non-active) rows |
| `showRowSearch` | true | Shows the search field; turning it off clears the query |
| `showCheckboxes` | true | Enables selection; turning it off clears selection |
| `showExpandChevrons` | true | Shows expand controls; turning it off collapses everything |
| `showPagination` | false | Shows footer pagination |
| `showDisabledRows` | true | Resolved / inactive rows look disabled; when off, those rows stay selectable |

The control column shows if expand or checkboxes are on. The toolbar shows if any toolbar visibility control is on.

---

## 4. Interaction rules

### Header
- **Pipeline order:** History filter, then status chips (empty set means all), then search, then sort, then pagination if it’s enabled
- **History:** Starts shown. Hiding it keeps only active rows (in the demo, `New`). The control is disabled when there is no history (`"There is no history to show."`)
- **Status chips:** Built from the unique statuses in `rows`. Multi-select. Changing filters, history, or search resets the page to `1`
- **Search:** Case-insensitive match across searchable fields. Clear with the clear control or the empty-state action
- **Columns menu:** You can’t hide the last remaining column. Reorder columns by drag and drop

### Table
- **Sort:** First click sorts ascending. Clicking the same column again toggles ascending / descending. Sort starts as `null`. There’s no UI to clear sort once you’ve sorted
- **Selection:** Controlled only when both `selectedIds` and `onSelectedIdsChange` are passed; otherwise selection is internal. Active rows are selectable. Inactive rows are selectable only when `showDisabledRows` is false. The header checkbox selects every actionable row in the full sorted set, not just the current page. Once anything is selected (`selectionMode`), row controls stay visible on every row
- **Expand:** Single-row and expand-all cover the full sorted set. Detail rows animate with a `0fr` / `1fr` grid. Detail content is still placeholder copy
- **Empty states (priority):** no rows; history hidden with no active rows left; filters and search / filters only / search only; then a generic empty message

### Pagination
- Defaults to page `1` and page size `10`. Size options are `10 / 25 / 50 / 100`
- Select all and expand all still apply across every page of the sorted set

---

## 5. Keyboard and focus

No keyboard support at this time.

---

## 6. Defaults and initial state

| State | Default |
|-------|---------|
| `rows` | Demo sample rows |
| `title` | `"Data Table"` |
| Status filters | Empty set |
| History shown | true |
| Columns | All keys, definition order |
| Sort | `null` / `asc` |
| Selection / expand | Empty |
| Page / size | `1` / `10` |

---

## 7. API

```
DataTableProps = {
  rows?: DataTableRow[]
  title?: string
  className?: string
  selectedIds?: Set<string>
  onSelectedIdsChange?: Dispatch<SetStateAction<Set<string>>>
  visibilityControls?: Partial<DataTableVisibilityControls>
}
```

For controlled selection, pass both selection props. Otherwise leave them off.

Exports include `DataTable`, `DEFAULT_DATA_TABLE_VISIBILITY_CONTROLS`, and demo rows / types as needed.

---

## 8. Accessibility

- The table uses `aria-labelledby` with a screen-reader-only caption (title, counts, filters / search)
- Expand and select controls use clear `aria-label` / `aria-expanded` text
- Sortable headers set `aria-sort`
- History and columns icon buttons get a tooltip and `aria-label`
- Row actions use `aria-label={`Actions for ${name}`}`

---

## 9. Visual and design tokens

| Area | Tokens |
|------|--------|
| Surfaces | Table surface, border, chip, score, tag, shadow, and body max-height tokens |
| Motion | Accordion expand duration and easing |
| Type | Heading and paragraph tokens from `typography-tokens.css` |
| Atoms | `Checkbox` md, `Badge` pills, `InputField` search sm, `Pagination` |

---

## 10. QA checklist

- Turning visibility controls off hides the UI and clears related state
- History show / hide works, and the control disables when there’s no history
- Status multi-filter and search behave as expected
- Sorting works per column; you can’t hide the last column; drag reorder works
- `showDisabledRows` on and off match the selection rules
- Expand single / all and pagination keep select-all / expand-all global
- Controlled and uncontrolled selection both work
- Preview Options: Done applies changes, Cancel discards them; header Filter Type does not change table data
