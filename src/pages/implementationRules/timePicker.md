# Time Picker business rules

Component: `TimePicker`

## 1. Data model

### 1.1 TimeValue

| Field | Type | 12-hour | 24-hour |
|-------|------|---------|---------|
| `hour` | number | 1-12 | 0-23 |
| `minute` | number | 0-59 | 0-59 |
| `period` | `'AM' \| 'PM'` | Required | Omit |

### 1.2 Display format (trigger and confirmed state)

| Mode | Pattern | Example |
|------|---------|---------|
| 12-hour | `{hour} : {mm} {AM\|PM}` | `2 : 30 PM` |
| 24-hour | `{HH} : {mm}` | `14 : 30` |

- Minutes always use two digits (`00-59`)
- Hours in 12-hour mode are not zero-padded (`1-12`)
- Hours in 24-hour mode are zero-padded (`00-23`)
- Put spaces around the colon: ` : `

### 1.3 Draft vs confirmed value

| State | Meaning |
|-------|---------|
| Confirmed | Last value applied with Set. Shown on the closed trigger |
| Draft | Working copy while the panel is open. Thrown away on Cancel, Escape, or outside click |

Changes inside the panel do not update the trigger or fire `onChange` until the user presses Set.

---

## 2. Component structure

### 2.1 Trigger (closed state)
- Label above the field (default: “Select Time”)
- Field trigger matches the dropdown field styling (border, type, chevron)
- Shows the confirmed time, or the placeholder if nothing is confirmed yet (default `"Select time"`)
- Click or keyboard activation opens the panel

### 2.2 Panel (open state)
The popover lines up with the trigger and uses the dropdown menu surface tokens plus the XS drop shadow.

Layout from left to right:
1. Hours column: up chevron, numeric input, down chevron
2. Colon `:` (decorative, not focusable)
3. Minutes column: up chevron, numeric input, down chevron
4. AM/PM column (12-hour only): up chevron, period label, down chevron
5. Footer: Cancel (secondary) and Set (primary)

Chevron steppers use the primary purple accent. They are not in the tab order (see section 5).

---

## 3. Time format configuration

### 3.1 Host-controlled format
- Prop: `format="12"` or `format="24"`
- Default: `"12"`
- No 12/24 toggle inside the picker itself

### 3.2 Switching format at the app level
When the host switches format:
- Convert the confirmed time through a 24-hour canonical value (`toHour24` then `fromHour24`)
- Remount or re-initialize so the panel matches the new format

### 3.3 12-hour AM/PM rules
- AM/PM is its own control next to minutes. Don’t infer it from typing hours alone
- AM/PM does not flip automatically when hours roll over (for example, 11:55 AM to 12:05 PM needs an explicit period change)
- Up / down on the period control (or arrow keys while focused) toggles AM and PM

---

## 4. Stepping and rollover

### 4.1 Hour stepper
- Step by 1
- 12-hour: 1-12, wrapping `12 → 1` and `1 → 12`
- 24-hour: 0-23, wrapping `23 → 00` and `00 → 23`

### 4.2 Minute stepper
- Default step is 5 (`minuteStep={5}`, configurable)
- Overflow / hour carry for steppers and up / down on inputs:

| Action | Result |
|--------|--------|
| Step up past 59 | Minute becomes 00, hour increases by 1 (with hour wrap) |
| Step down below 00 | Minute becomes the highest step at or below 59 (for example 55), hour decreases by 1 |

### 4.3 Typed input vs stepper interval
People can type any minute from 0-59, even values that are off the 5-minute grid. The step interval only applies to steppers and arrow keys.

### 4.4 Hour field typing
- Numbers only, two digits max while typing
- On blur, clamp to the valid hour range for the active format
- After two valid hour digits, focus moves to minutes with the text selected

### 4.5 Minute field typing
- Numbers only, two digits max while typing
- On blur, clamp to `0-59`
- If the value is greater than 59, clamp to 59 and show: “Minutes adjusted to the nearest valid value (0-59).”

---

## 5. Keyboard and focus

### 5.1 Tab order (panel open)

| Order | 12-hour | 24-hour |
|-------|---------|---------|
| 1 | Hours input | Hours input |
| 2 | Minutes input | Minutes input |
| 3 | AM/PM control | n/a |
| 4 | Cancel | Cancel |
| 5 | Set | Set |

Steppers are skipped (`tabIndex={-1}`). Shift+Tab goes in reverse.

### 5.2 Select all on focus
When Hours or Minutes receive focus, select the whole value. After up / down, keep it selected.

### 5.3 Arrow keys

| Context | Up / down |
|---------|-----------|
| Hours | Change hour by 1 (with wrap) |
| Minutes | Change by `minuteStep` (with hour carry) |
| AM/PM | Toggle AM and PM |

### 5.4 Enter

| Context | Enter |
|---------|-------|
| Hours / Minutes / AM/PM | Set (confirm) |
| Set button | Set (confirm) |
| Cancel | Do not confirm |

### 5.5 Escape
Closes the panel and restores the last confirmed value, same as Cancel.

### 5.6 Steppers (mouse)
Still clickable with `tabIndex={-1}`. After a click, put focus and selection back on the related input when that makes sense.

---

## 6. Defaults and initial state

### 6.1 Panel open: never empty
When the panel opens, hours and minutes are always filled in.

| `defaultMode` | Initial draft when nothing has been confirmed yet |
|---------------|-----------------------------------------------------|
| `"general"` (default) | 12:00 PM (12h) or 12:00 (24h) |
| `"scheduling"` | Current time rounded up to the next `minuteStep` |

### 6.2 Reopen after cancel
Show the last confirmed value again, not the generic default.

### 6.3 First focus on open
Focus the Hours input with the value selected.

---

## 7. Confirmation and dismissal

### 7.1 No auto-submit
Don’t call `onChange`, update the trigger, or submit parent forms until Set.

### 7.2 Set
Move draft to confirmed, close the panel, update the trigger, and fire `onChange(timeValue)` once.

### 7.3 Cancel
Throw away the draft, restore confirmed, close the panel, leave the trigger alone.

### 7.4 Dismiss without Set
Cancel, Escape, and outside click all behave like Cancel.

---

## 8. API

```
type TimeFormat = '12' | '24'
type TimePeriod = 'AM' | 'PM'
type TimeValue = { hour: number; minute: number; period?: TimePeriod }

TimePickerProps = {
  label?: string                    // default: "Select Time"
  value?: TimeValue | null
  defaultValue?: TimeValue
  onChange?: (value: TimeValue) => void  // fires only on Set
  format?: TimeFormat               // default: "12"
  minuteStep?: number               // default: 5
  placeholder?: string              // default: "Select time"
  disabled?: boolean
  defaultMode?: 'general' | 'scheduling'
  portalContainer?: HTMLElement | null
  className?: string
  id?: string
}
```

Controlled: pass `value` and `onChange`. Uncontrolled: leave `value` off; you can still pass `defaultValue` and listen for Set with `onChange`.

---

## 9. Accessibility

- Panel uses `role="dialog"` and `aria-modal="true"`, labeled by the field label and described with screen-reader-only instructions
- Hour and minute inputs expose `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-label`
- AM/PM is a focusable group with `aria-label="AM or PM"` and a live region for period changes
- The minute correction message uses `role="status"`
- Focus stays trapped while the panel is open
- Aim for WCAG 2.2 Level AA

---

## 10. Visual and design tokens

| Area | Tokens / components |
|------|---------------------|
| Trigger | Dropdown field (`--screening-border-strong`, `--font-screening`, primary focus ring) |
| Panel | `--ace-dropdown-menu-*`, `--ace-drop-shadow-xs` |
| Widths | `--ace-time-picker-trigger-width` (240px), `--ace-time-picker-panel-width` (240px) |
| Type | `--ace-type-paragraph-p1-regular`, `--ace-type-paragraph-p1-bold` |
| Steppers | `--screening-primary`, `--screening-primary-soft-bg` |
| Footer | `Button` secondary Cancel and primary Set, size `sm` |
| Correction | `--ace-input-error-message` |

---

## 11. QA checklist

- Opening the panel focuses hours with the value selected; draft is never blank
- Editing the draft leaves the trigger alone until Set
- Set, Enter on a field, or Enter on Set fires `onChange` once and updates the trigger
- Cancel, Escape, and outside click discard the draft and leave the trigger alone
- Tab order is Hours, Minutes, AM/PM (12h), Cancel, Set (steppers skipped)
- Up / down adjust values; minute carry changes the hour; hour wrap does not flip AM/PM
- Typing 67 minutes and blurring clamps to 59 and shows the status message
- Typing two hour digits moves focus to minutes with the value selected
- 24h mode has no AM/PM column and hours stay in 0-23
- `minuteStep` only affects steppers and arrows, not free typing
- `defaultMode="scheduling"` rounds up to the next step from now
- Disabled: trigger is inert and the panel does not open
