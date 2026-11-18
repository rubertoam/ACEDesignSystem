# ACE Design System design tokens inventory

Generated for Figma variable creation. Source: CSS custom properties in `src/styles`.

> **Work in Progress.** Confirm these against Figma before treating Usage-tab token sections as the source of truth. This inventory mirrors the current CSS codebase.

## variables.css

| Token | Value |
|-------|-------|
| --font-sans | system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif |
| --font-screening | 'Noto Sans', var(--font-sans) |
| --text-2xs | 0.625rem |
| --text-xs | 0.75rem |
| --text-13 | 0.8125rem |
| --text-14 | 0.875rem |
| --text-15 | 0.9375rem |
| --text-base | 1rem |
| --space-1 | 0.25rem |
| --space-2 | 0.5rem |
| --space-3 | 0.75rem |
| --space-4 | 1rem |
| --space-6 | 1.5rem |
| --space-8 | 2rem |
| --radius-sm | 0.25rem |
| --radius-md | 0.375rem |
| --radius-lg | 0.5rem |
| --radius-checkbox | 0.1875rem |
| --shadow-sm | 0 1px 2px rgb(0 0 0 / 0.05) |
| --section-label-gap | var(--space-3) |
| --shadow-none | none |
| --shadow-xs | 0 4px 8px rgb(0 0 0 / 0.1) |
| --shadow-sm | 0 6px 12px rgb(0 0 0 / 0.1) |
| --shadow-md | 0 8px 16px rgb(0 0 0 / 0.1) |
| --shadow-lg | 0 10px 20px rgb(0 0 0 / 0.1) |
| --shadow-xl | 0 12px 24px rgb(0 0 0 / 0.1) |
| --dialog-modal-surface | #ffffff |
| --dialog-modal-border | #eff0f2 |
| --dialog-modal-radius | 0.5rem |
| --dialog-modal-padding | 1.5rem |
| --dialog-modal-body-focus-gutter | 0.25rem |
| --dialog-modal-section-gap | 1.5rem |
| --dialog-modal-shadow | var(--shadow-xl) |
| --dialog-modal-overlay | rgb(0 0 0 / 0.45) |
| --dialog-modal-title | #23262c |
| --dialog-modal-body | #23262c |
| --dialog-modal-muted | #464c59 |
| --dialog-modal-primary | #3d2e8a |
| --dialog-modal-primary-hover | #322475 |
| --dialog-modal-on-primary | #ffffff |
| --dialog-modal-outline-border | #3d2e8a |
| --dialog-modal-outline-text | #3d2e8a |
| --dialog-modal-outline-hover-bg | #f8f7fc |
| --dialog-modal-danger | #dc264b |
| --dialog-modal-danger-hover | #c41e42 |
| --dialog-modal-close-hover | var(--color-neutral-100) |
| --dialog-modal-btn-radius | 0.25rem |
| --dialog-modal-footer-btn-gap | 0.75rem |
| --dialog-modal-content-max-h | min(85vh, 32rem) |
| --dialog-modal-max-width-md | 28rem |
| --dialog-modal-max-width-lg | 38.5rem |
| --dialog-modal-inline-error-bg | var(--color-error-50) |
| --dialog-modal-inline-error-border | #dc264b |
| --color-neutral-100 | #f5f6f8 |
| --color-neutral-50 | #fafafb |
| --color-neutral-200 | #e8eaed |
| --screening-surface | #ffffff |
| --screening-surface-muted | #fafafb |
| --screening-surface-hover | var(--color-neutral-100) |
| --screening-surface-row-muted | #f3f4f6 |
| --screening-surface-expanded | #ffffff |
| --screening-surface-selected | rgb(244 241 252 / 0.6) |
| --screening-border | var(--screening-border-strong) |
| --screening-border-strong | #cfd2d9 |
| --screening-border-row | #eff0f2 |
| --screening-border-soft | #e4e6ea |
| --screening-text-primary | #23262c |
| --screening-text-secondary | #464c59 |
| --screening-text-muted | #6a7285 |
| --screening-text-on-primary | #ffffff |
| --screening-primary | #523eb9 |
| --screening-primary-hover-border | #4334a3 |
| --screening-primary-soft-bg | #efeef9 |
| --screening-primary-soft-bg-hover | #e4dff3 |
| --screening-primary-ring | rgb(82 62 185 / 0.35) |
| --screening-primary-ring-offset | #ffffff |
| --color-background | var(--screening-surface-muted) |
| --color-surface | var(--screening-surface) |
| --color-text-primary | var(--screening-text-primary) |
| --color-text-muted | var(--screening-text-muted) |
| --color-border | var(--screening-border-strong) |
| --color-accent | var(--screening-primary) |
| --screening-icon-muted | #949baa |
| --screening-progress-track | #eff0f2 |
| --screening-progress-fill | #523eb9 |
| --screening-chip-inactive-bg | #ffffff |
| --screening-chip-inactive-border | #cfd2d9 |
| --screening-chip-inactive-hover-bg | var(--color-neutral-100) |
| --screening-chip-inactive-hover-border | #949baa |
| --screening-pill-new-border | #d6cef5 |
| --screening-pill-new-surface | #f4f1fc |
| --screening-pill-new-dot | #523eb9 |
| --screening-pill-new-label | #523eb9 |
| --screening-chip-active-text | #523eb9 |
| --screening-chip-active-border | #523eb9 |
| --screening-pill-escalated-border | #ffcc80 |
| --screening-pill-escalated-surface | #fff4e8 |
| --screening-pill-escalated-dot | #ef6c00 |
| --screening-pill-escalated-label | #e65100 |
| --screening-score-high | #c62828 |
| --screening-age-fresh | #2e7d32 |
| --screening-age-warn | #ef6c00 |
| --screening-age-stale | #c62828 |
| --screening-tile-e-bg | #fdeaea |
| --screening-tile-e-fg | #9e2a2a |
| --screening-tile-e-border | rgb(194 40 40 / 0.12) |
| --screening-tile-n-bg | #e8f4ea |
| --screening-tile-n-fg | #2d6a3e |
| --screening-tile-n-border | rgb(46 125 50 / 0.12) |
| --screening-tile-c1-bg | #fff4e8 |
| --screening-tile-c1-fg | #b35c00 |
| --screening-tile-c1-border | rgb(230 126 0 / 0.12) |
| --screening-tile-c2-bg | #fff9e6 |
| --screening-tile-c2-fg | #9a6b00 |
| --screening-tile-c2-border | rgb(249 168 37 / 0.15) |
| --screening-tile-b-bg | #f0f1f3 |
| --screening-tile-b-fg | #5c6370 |
| --screening-tile-b-border | rgb(106 114 130 / 0.15) |
| --dropdown-menu-trigger-width | 12.5rem |
| --dropdown-menu-shadow | var(--shadow-xs) |
| --dropdown-menu-surface | var(--screening-surface) |
| --dropdown-menu-border | var(--screening-border-strong) |
| --dropdown-menu-text | var(--screening-text-primary) |
| --dropdown-menu-text-muted | var(--screening-text-muted) |
| --dropdown-menu-primary | var(--screening-primary) |
| --dropdown-menu-row-hover | var(--screening-surface-hover) |
| --dropdown-menu-row-emphasis | var(--screening-surface-muted) |
| --dropdown-menu-danger | var(--dialog-modal-danger) |
| --time-picker-trigger-width | 15rem |
| --time-picker-panel-width | 15rem |
| --date-picker-trigger-width | 15rem |
| --date-picker-panel-width | 29.25rem |
| --date-picker-panel-width-single | 15.5rem |
| --date-picker-month-title | var(--color-neutral-800) |
| --date-picker-weekday | var(--screening-text-secondary) |
| --date-picker-day | var(--screening-text-secondary) |
| --date-picker-day-muted | var(--screening-text-muted) |
| --date-picker-day-on-primary | #ffffff |
| --date-picker-range-fill | var(--screening-primary-soft-bg) |
| --date-picker-day-size | 1.75rem |
| --date-picker-day-gap | 0.125rem |
| --color-neutral-800 | #23262c |
| --site-header-height | 4rem |
| --site-header-px | 2rem |
| --site-header-py | 0.75rem |
| --site-header-surface | var(--screening-surface) |
| --site-header-border | var(--screening-border-strong) |
| --site-header-logo-gap | var(--finscan-icon-gap) |
| --site-header-nav-gap | 2rem |
| --site-header-actions-gap | 1.5rem |
| --site-header-toolbar-gap | 1rem |
| --site-header-toolbar-icon-color | var(--color-neutral-800) |
| --site-header-icon-notifications-width | 2rem |
| --site-header-icon-notifications-height | 1.96875rem |
| --site-header-icon-help-size | 2.125rem |
| --site-header-nav-hover | var(--screening-surface-hover) |
| --site-header-greeting-color | var(--screening-primary) |
| --lab-segmented-track-bg | var(--screening-surface-muted) |
| --lab-segmented-track-border | var(--screening-border-soft) |
| --lab-segmented-indicator-bg | var(--screening-surface) |
| --lab-segmented-indicator-shadow | 0 1px 2px rgb(35 38 44 / 0.06), 0 2px 6px rgb(35 38 44 / 0.08) |
| --lab-segmented-padding | 0.25rem |
| --finscan-icon-gap | 0.75rem |
| --color-success-400 | #99ca3c |
| --color-blue-500 | #0672a3 |
| --color-secondary-500 | #92278f |
| --color-secondary-50 | #fcf2fb |
| --color-secondary-100 | #f1ccf0 |
| --color-secondary-200 | #e7a5e5 |
| --color-secondary-300 | #dd7fda |
| --color-secondary-400 | #d258cf |
| --color-secondary-500 | var(--color-secondary-500) |
| --color-secondary-600 | #6d1d6b |
| --color-secondary-700 | #491447 |
| --color-secondary-800 | #250a24 |
| --color-secondary-900 | #120512 |
| --color-teal-50 | #f0fbfc |
| --color-teal-100 | #c1f0f3 |
| --color-teal-200 | #93e5eb |
| --color-teal-300 | #64dae2 |
| --color-teal-400 | #28cad5 |
| --color-teal-500 | #22adb6 |
| --color-teal-600 | #198289 |
| --color-teal-700 | #11565b |
| --color-teal-800 | #092b2e |
| --color-teal-900 | #041617 |
| --color-dark-50 | #3a3c43 |
| --color-dark-100 | #373a41 |
| --color-dark-200 | #35373e |
| --color-dark-300 | #30333a |
| --color-dark-400 | #2e3138 |
| --color-dark-500 | #292c33 |
| --color-dark-600 | #272a31 |
| --color-dark-700 | #24272f |
| --color-dark-800 | #20232a |
| --color-dark-900 | #14171f |
| --color-primary-500 | #3d2e8a |
| --color-primary-500 | #3d2e8a |
| --color-primary-400 | #454cbc |
| --sidebar-width | 18.125rem |
| --sidebar-menu-icon | var(--color-neutral-800) |
| --color-success-50 | #f8fbf1 |
| --color-success-500 | #87b531 |
| --color-warning-50 | #fdf3ea |
| --color-warning-100 | #f9e0cb |
| --color-warning-200 | #f4c8a1 |
| --color-warning-300 | #f0af77 |
| --color-warning-400 | #eb974d |
| --color-warning-500 | #e67e23 |
| --color-warning-600 | #c16616 |
| --color-warning-700 | #934e11 |
| --color-warning-800 | #66360c |
| --color-warning-900 | #391e06 |
| --color-warning-2-50 | #fffcf3 |
| --color-warning-2-100 | #fff2ce |
| --color-warning-2-200 | #ffe8aa |
| --color-warning-2-300 | #ffdf85 |
| --color-warning-2-400 | #ffd560 |
| --color-warning-2-500 | #ffbe0b |
| --color-warning-2-600 | #c89200 |
| --color-warning-2-700 | #c89200 |
| --color-warning-2-800 | #856200 |
| --color-warning-2-900 | #423100 |
| --color-error-50 | #fdf4f6 |
| --color-error-500 | #dc264b |
| --color-success-500 | var(--color-success-500) |
| --sidebar-shadow | 6px 0 5px rgb(0 0 0 / 0.03) |
| --sidebar-border | var(--screening-border-strong) |
| --sidebar-border-accent | #7868cd |
| --sidebar-heading-bg | var(--screening-surface-muted) |
| --sidebar-heading-border | var(--screening-border-strong) |
| --sidebar-item-radius | var(--radius-md) |
| --sidebar-item-selected-bg | var(--screening-primary-soft-bg) |
| --sidebar-item-selected-text | var(--dialog-modal-primary) |
| --sidebar-item-hover-bg | var(--color-neutral-100) |
| --sidebar-group-expanded-border | var(--button-neutral-400) |
| --sidebar-group-hover-bg | var(--color-neutral-100) |
| --sidebar-row-action-hover-bg | var(--screening-surface-hover) |
| --sidebar-group-gap | var(--space-3) |
| --sidebar-nav-px | var(--space-3) |
| --sidebar-nav-py | 0.375rem |
| --sidebar-control-width | calc(var(--sidebar-width) - 2 * var(--sidebar-nav-px)) |
| --edit-group-restore-bg | var(--color-success-500) |
| --edit-group-restore-hover-bg | var(--color-success-50) |
| --edit-group-trash-hover-bg | var(--color-error-50) |
| --edit-group-item-row-height | 2.5rem |
| --edit-group-items-list-max-height | calc(
    5 * var(--edit-group-item-row-height) + 4 * var(--space-1) + 2 * var(--space-2)
  ) |
| --motion-ease-standard | cubic-bezier(0.33, 1, 0.68, 1) |
| --motion-duration-fast | 150ms |
| --motion-duration-medium | 300ms |
| --motion-duration-slow | 420ms |
| --sidebar-duration-panel | var(--motion-duration-medium) |
| --sidebar-duration-expand | var(--motion-duration-medium) |
| --inline-drawer-width | 32rem |
| --inline-drawer-border | var(--color-neutral-400) |
| --inline-drawer-shadow | -6px 0 5px rgb(0 0 0 / 0.03) |
| --inline-drawer-duration-panel | var(--sidebar-duration-panel) |
| --inline-drawer-header-px | 1.5rem |
| --inline-drawer-header-py | 1rem |
| --inline-drawer-body-px | 1.5rem |
| --inline-drawer-body-py | 1rem |
| --inline-drawer-section-gap | 0.625rem |
| --inline-drawer-footer-gap | 1rem |
| --tabs-gap | var(--space-3) |
| --tabs-text-active | var(--screening-primary) |
| --tabs-text-inactive | var(--screening-icon-muted) |
| --tabs-indicator-bg | var(--screening-primary) |
| --tabs-indicator-height | 0.09375rem |
| --tabs-indicator-radius | var(--radius-sm) |
| --tab-card-gap | var(--space-4) |
| --tab-card-radius | 6px |
| --tab-card-padding | 0.875rem |
| --tab-card-max-width | 23.3125rem |
| --tab-card-surface-default | var(--screening-surface) |
| --tab-card-border-default | var(--button-neutral-400) |
| --tab-card-surface-emphasis | var(--screening-primary-soft-bg) |
| --tab-card-border-active | var(--screening-primary) |
| --tab-card-title-color | var(--color-neutral-800) |
| --tab-card-subtitle-color | var(--screening-text-secondary) |
| --tab-card-description-color | var(--color-neutral-800) |
| --tab-card-icon-primary | var(--screening-primary) |
| --screening-shadow-card | var(--shadow-xs) |
| --screening-shadow-card-hover | var(--shadow-sm) |
| --landing-page-card-width | 25rem |
| --landing-page-card-min-height | 12.5rem |
| --landing-page-card-radius | 4px |
| --landing-page-card-border | var(--screening-border-row) |
| --landing-page-card-surface | var(--screening-surface) |
| --landing-page-card-footer-bg | var(--screening-primary-soft-bg) |
| --landing-page-card-shadow | var(--screening-shadow-card) |
| --landing-page-card-shadow-hover | 0 12px 12px rgb(0 0 0 / 0.1) |
| --landing-page-card-title-color | var(--color-neutral-800) |
| --landing-page-card-body-color | var(--color-neutral-800) |
| --landing-page-card-footer-stat-color | var(--screening-text-secondary) |
| --landing-page-card-link-color | var(--screening-primary) |
| --landing-page-card-tag-bg | var(--button-purple-500) |
| --landing-page-card-tag-text | #ffffff |
| --landing-page-card-header-px | 1.5rem |
| --landing-page-card-header-py | 0.75rem |
| --landing-page-card-body-px | 1.5rem |
| --landing-page-card-body-py-stats | 0.75rem |
| --landing-page-card-body-py-desc | 1.5rem |
| --landing-page-card-footer-px | 1.5rem |
| --landing-page-card-footer-py | 0.75rem |
| --data-card-width | 43.25rem |
| --data-card-radius | 4px |
| --data-card-border | var(--screening-border-row) |
| --data-card-surface | var(--screening-surface) |
| --data-card-header-bg | var(--screening-surface-muted) |
| --data-card-header-height | 2.625rem |
| --data-card-shadow | var(--shadow-sm) |
| --data-card-shadow-hover | var(--shadow-xl) |
| --data-card-row-muted | var(--screening-text-muted) |
| --data-card-insight-bg | var(--screening-primary-soft-bg) |
| --data-card-insight-border | var(--screening-primary) |
| --screening-shadow-row-accent | inset 2px 0 0 0 rgb(82 62 185 / 0.2) |
| --screening-shadow-thead | 0 1px 0 rgb(207 210 217 / 0.6) |
| --screening-table-header-font-size | 0.75rem |
| --screening-header-min-height | 3.5rem |
| --screening-progress-width | 7.5rem |
| --screening-progress-height | var(--space-2) |
| --screening-table-min-width | 45rem |
| --screening-body-max-height | calc(100dvh - 14rem) |
| --screening-checkbox-inner-bg | #ffffff |
| --screening-checkbox-border | #262d3b |
| --screening-checkbox-border-hover | var(--screening-primary) |
| --screening-checkbox-bg-hover | var(--screening-primary-soft-bg) |
| --screening-checkbox-checked-bg | var(--screening-primary) |
| --screening-checkbox-checked-border | var(--screening-primary) |
| --screening-checkbox-checked-inset | #ffffff |
| --screening-checkbox-check | #ffffff |
| --screening-checkbox-disabled-border | #cfd2d9 |
| --screening-checkbox-disabled-bg | #eff0f2 |
| --screening-checkbox-disabled-check | #949baa |
| --screening-checkbox-disabled-checked-bg | #cfd2d9 |
| --toggle-duration | var(--motion-duration-medium) |
| --toggle-ease | var(--motion-ease-standard) |
| --toggle-thumb | #ffffff |
| --toggle-thumb-disabled | #eff0f2 |
| --toggle-track-off | var(--color-neutral-200) |
| --toggle-track-on | #523eb9 |
| --toggle-track-off-hover | #dfe2e8 |
| --toggle-track-on-hover | #4334a3 |
| --toggle-track-disabled-off | #cfd2d9 |
| --toggle-track-disabled-on | #cbc5ec |
| --toggle-focus-ring | var(--screening-primary-ring) |
| --toggle-ring-offset | var(--screening-primary-ring-offset) |
| --toggle-track-padding | 0.25rem |
| --toggle-icon-glyph-off | var(--color-neutral-800) |
| --toggle-icon-glyph-on | var(--toggle-thumb) |
| --tooltip-radius | var(--radius-sm) |
| --tooltip-px | var(--space-3) |
| --tooltip-py | var(--space-2) |
| --tooltip-surface | var(--screening-surface) |
| --tooltip-border | var(--screening-border-strong) |
| --tooltip-text | var(--screening-text-primary) |
| --tooltip-shadow | var(--shadow-xs) |
| --tooltip-duration | var(--motion-duration-fast) |
| --tooltip-ease | ease |
| --badge-gap | 0.375rem |
| --badge-py | 0.25rem |
| --badge-pl | 0.375rem |
| --badge-pr | 0.5rem |
| --badge-dot-size | 0.5rem |
| --badge-label-size | 0.6875rem |
| --badge-label-size-sm | 0.75rem |
| --badge-purple-border | var(--screening-pill-new-border) |
| --badge-purple-surface | var(--screening-pill-new-surface) |
| --badge-purple-dot | #523eb9 |
| --badge-purple-label | var(--screening-pill-new-label) |
| --badge-orange-border | #ffcc80 |
| --badge-orange-surface | #fff4e8 |
| --badge-orange-dot | #ef6c00 |
| --badge-orange-label | #e65100 |
| --badge-green-border | #a5d6a7 |
| --badge-green-surface | #e8f4ea |
| --badge-green-dot | #2e7d32 |
| --badge-green-label | #2d6a3e |
| --badge-gray-border | #cfd2d9 |
| --badge-gray-surface | #f5f6f8 |
| --badge-gray-dot | #6a7285 |
| --badge-gray-label | #464c59 |
| --badge-blue-border | #90caf9 |
| --badge-blue-surface | #e3f2fd |
| --badge-blue-dot | #1976d2 |
| --badge-blue-label | #1565c0 |
| --badge-yellow-border | #ffe082 |
| --badge-yellow-surface | #fff8e1 |
| --badge-yellow-dot | #f9a825 |
| --badge-yellow-label | #f57f17 |
| --badge-pink-border | #ce93d8 |
| --badge-pink-surface | #f3e5f5 |
| --badge-pink-dot | #8e24aa |
| --badge-pink-label | #6a1b9a |
| --badge-teal-border | #80cbc4 |
| --badge-teal-surface | #e0f2f1 |
| --badge-teal-dot | #00897b |
| --badge-teal-label | #00695c |
| --badge-red-border | #ef9a9a |
| --badge-red-surface | #fdecea |
| --badge-red-dot | #c62828 |
| --badge-red-label | #b71c1c |
| --badge-tag-gap | 0.375rem |
| --badge-tag-radius | var(--radius-sm) |
| --badge-tag-px | 0.5rem |
| --badge-tag-py | 0.125rem |
| --badge-tag-border | var(--screening-border-strong) |
| --badge-tag-surface | var(--screening-surface-muted) |
| --badge-tag-label | var(--screening-text-secondary) |
| --badge-tag-warning-border | var(--screening-pill-escalated-dot) |
| --badge-tag-warning-surface | var(--color-warning-50) |
| --badge-tag-warning-label | var(--screening-pill-escalated-label) |
| --badge-tag-warning-icon-size | 0.75rem |
| --badge-tag-warning-icon-text-size | 0.5rem |
| --badge-tag-warning-icon-bg | #ef6c00 |
| --badge-tag-warning-icon-fg | #ffffff |
| --toast-message-width | 25rem |
| --toast-message-radius | 4px |
| --toast-message-px | 1.5rem |
| --toast-message-py | 1rem |
| --toast-message-gap | 0.75rem |
| --toast-message-body-indent | 2rem |
| --toast-message-action-gap | 1rem |
| --toast-message-bg | #ffffff |
| --toast-message-border | #cfd2d9 |
| --toast-message-shadow | var(--shadow-md) |
| --toast-message-text | var(--screening-text-secondary) |
| --toast-message-action-text | var(--button-purple-500) |
| --toast-message-action-text-hover | var(--screening-primary) |
| --toast-message-confirm-bg | var(--button-purple-500) |
| --toast-message-confirm-bg-hover | var(--screening-primary-hover-border) |
| --toast-message-confirm-text | #ffffff |
| --toast-message-confirm-radius | 4px |
| --toast-message-confirm-px | 0.5rem |
| --toast-message-confirm-py | 0.25rem |
| --toast-message-dismiss-icon | #64748b |
| --toast-message-dismiss-icon-hover | var(--screening-text-primary) |
| --toast-message-icon-glyph | #ffffff |
| --toast-message-icon-success | var(--color-success-500) |
| --toast-message-icon-info | var(--button-purple-500) |
| --toast-message-icon-warning | var(--color-warning-500) |
| --toast-message-icon-error | var(--dialog-modal-danger) |
| --inline-message-radius | 4px |
| --inline-message-px | 1rem |
| --inline-message-py | 0.5rem |
| --inline-message-gap | 0.75rem |
| --inline-message-text | var(--color-neutral-800) |
| --inline-message-error-bg | var(--color-error-50) |
| --inline-message-error-border | var(--color-error-500) |
| --inline-message-error-icon | var(--color-error-500) |
| --inline-message-success-bg | var(--color-success-50) |
| --inline-message-success-border | var(--color-success-500) |
| --inline-message-success-icon | var(--color-success-500) |
| --inline-message-info-bg | var(--button-blue-50) |
| --inline-message-info-border | var(--button-blue-500) |
| --inline-message-info-icon | var(--button-blue-500) |
| --inline-message-warning-bg | var(--color-warning-50) |
| --inline-message-warning-border | var(--color-warning-500) |
| --inline-message-warning-icon | var(--color-warning-500) |
| --timeline-radius | 4px |
| --timeline-padding | 1rem |
| --timeline-section-gap | 1.5rem |
| --timeline-item-gap | 1rem |
| --timeline-item-padding | 0.75rem |
| --timeline-sort-width | 12.5rem |
| --timeline-icon-size | 2rem |
| --timeline-icon-size-hover | 2.2rem |
| --timeline-icon-glyph-size | 1rem |
| --timeline-icon-glyph-size-hover | 1.1rem |
| --timeline-surface | var(--screening-surface) |
| --timeline-border | #cfd2d9 |
| --timeline-sort-bg | #ffffff |
| --timeline-title | var(--color-neutral-800) |
| --timeline-subtitle | var(--color-neutral-800) |
| --timeline-separator | #cfd2d9 |
| --timeline-link | var(--screening-primary) |
| --timeline-link-hover | var(--screening-primary-hover-border) |
| --timeline-expanded-bg | #fafafb |
| --timeline-body-bg | #ffffff |
| --timeline-icon-glyph | #ffffff |
| --timeline-icon-system | var(--screening-primary) |
| --timeline-icon-escalation | var(--color-warning-500) |
| --timeline-icon-pending | var(--color-warning-2-500) |
| --timeline-icon-blocked | var(--dialog-modal-danger) |
| --timeline-icon-safe | var(--color-success-500) |
| --timeline-highlight-system | var(--screening-primary-soft-bg) |
| --timeline-highlight-escalation | var(--color-warning-50) |
| --timeline-highlight-pending | var(--color-warning-2-50) |
| --timeline-highlight-blocked | var(--color-error-50) |
| --timeline-highlight-safe | var(--color-success-50) |
| --attachments-radius | 4px |
| --attachments-padding | 0.75rem |
| --attachments-gap | 0.75rem |
| --attachments-border | #cfd2d9 |
| --attachments-surface | var(--screening-surface) |
| --attachments-dropzone-bg | #fafafb |
| --attachments-dropzone-border | var(--screening-primary) |
| --attachments-panel-bg | #fafafb |
| --attachments-title | var(--screening-primary) |
| --attachments-label | var(--color-neutral-800) |
| --attachments-link | var(--screening-primary) |
| --attachments-muted | #6a7285 |
| --attachments-status | var(--screening-primary) |
| --attachments-error | var(--dialog-modal-danger) |
| --attachments-divider | #cfd2d9 |
| --filter-radius | 4px |
| --filter-gap | 0.5rem |
| --filter-px | 0.5rem |
| --filter-py | 0.25rem |
| --filter-trigger-border | #cfd2d9 |
| --filter-trigger-bg | var(--screening-surface) |
| --filter-trigger-text | var(--color-neutral-800) |
| --filter-trigger-active-bg | #464c59 |
| --filter-trigger-active-text | #eff0f2 |
| --filter-chip-border | #cfd2d9 |
| --filter-chip-bg | var(--screening-surface) |
| --filter-chip-text | var(--color-neutral-800) |
| --filter-chip-icon | var(--color-neutral-800) |
| --filter-chip-clear | #949baa |
| --filter-chip-selected-bg | #464c59 |
| --filter-chip-selected-text | #eff0f2 |
| --filter-chip-selected-icon | #eff0f2 |
| --filter-header-title | #464c59 |
| --filter-header-gap | 0.75rem |
| --filter-search-width | 12.5rem |
| --slider-track-height | 0.625rem |
| --slider-radius | 4px |
| --slider-handle-height | 2.25rem |
| --slider-handle-width | 4px |
| --slider-handle-width-hover | 8px |
| --slider-tick-inset | 4px |
| --slider-tooltip-size | 1.75rem |
| --slider-track-inactive | #efeef9 |
| --slider-track-border | #523eb9 |
| --slider-range | #523eb9 |
| --slider-handle | #523eb9 |
| --slider-tick-on-range | #efeef9 |
| --slider-tick-on-track | #523eb9 |
| --slider-tooltip-bg | #23262c |
| --slider-tooltip-text | #fafafb |
| --slider-track-inactive-disabled | #eff0f2 |
| --slider-track-border-disabled | #cfd2d9 |
| --slider-range-disabled | #cbc5ec |
| --slider-handle-disabled | #949baa |
| --slider-focus-ring | var(--screening-primary-ring) |
| --slider-ring-offset | var(--screening-primary-ring-offset) |
| --radio-bg-inner | #ffffff |
| --radio-border-default | #23262c |
| --radio-border-hover | #23262c |
| --radio-surface-hover | var(--color-neutral-100) |
| --radio-border-selected | #523eb9 |
| --radio-indicator-selected | #523eb9 |
| --radio-border-disabled | #949baa |
| --radio-indicator-disabled | #d4d6db |
| --radio-label-disabled | #949baa |
| --radio-focus-ring | var(--screening-primary-ring) |
| --radio-focus-offset | var(--screening-primary-ring-offset) |
| --radio-field-border | #cfd2d9 |
| --radio-field-bg | #ffffff |
| --radio-field-bg-hover | #efeef9 |
| --radio-field-bg-active | #efeef9 |
| --radio-field-border-active | #523eb9 |
| --radio-field-bg-disabled | #eff0f2 |
| --screening-icon-chevron | 1rem |
| --screening-duration-accordion | 420ms |
| --screening-ease-accordion | cubic-bezier(0.33, 1, 0.68, 1) |
| --accordion-surface | #ffffff |
| --accordion-surface-muted | #fafafb |
| --accordion-border | #cfd2d9 |
| --accordion-radius | 0.25rem |
| --accordion-px | 1rem |
| --accordion-py | 0.75rem |
| --accordion-gap | 1rem |
| --accordion-title | #23262c |
| --accordion-tag-bg | #e4e6ea |
| --accordion-tag-text | #23262c |
| --accordion-icon | #23262c |
| --accordion-content-bg | #ffffff |
| --accordion-duration | 420ms |
| --accordion-ease | cubic-bezier(0.33, 1, 0.68, 1) |
| --availability-tag-available-bg | #e8f4ea |
| --availability-tag-available-border | rgb(46 125 50 / 0.2) |
| --availability-tag-available-text | #2e7d32 |
| --availability-tag-in-progress-bg | var(--color-warning-2-100) |
| --availability-tag-in-progress-border | var(--color-warning-2-200) |
| --availability-tag-in-progress-text | var(--color-warning-600) |
| --availability-tag-planned-bg | #f4f1fc |
| --availability-tag-planned-border | #d6cef5 |
| --availability-tag-planned-text | #523eb9 |
| --screening-pagination-btn-size | 2rem |
| --screening-pagination-btn-radius | 0.1875rem |
| --screening-pagination-gap | 0.25rem |
| --screening-pagination-page-size-border | #949baa |
| --screening-input-height-sm | 2.25rem |
| --screening-input-radius | 0.25rem |
| --screening-input-px | 0.75rem |
| --screening-input-gap | 0.75rem |
| --screening-input-border | #bcbcca |
| --screening-input-border-focus | #9090a7 |
| --screening-input-bg-focus | #efeef9 |
| --screening-input-focus-ring | #7868cd |
| --screening-input-placeholder | #bcbcca |
| --input-height-sm | var(--screening-input-height-sm) |
| --input-height-md | 2.75rem |
| --input-height-lg | 3.25rem |
| --input-font-sm | 0.875rem |
| --input-font-md | 1rem |
| --input-font-lg | 1.125rem |
| --input-leading-sm | 1.0625rem |
| --input-leading-md | 1.1875rem |
| --input-leading-lg | 1.35rem |
| --input-error-bg | var(--color-error-50) |
| --input-error-border | #dc264b |
| --input-error-message | #ef4444 |
| --input-disabled-bg | #eff0f2 |
| --input-disabled-border | #dedee5 |
| --input-disabled-text | #464c59 |
| --button-radius | var(--dialog-modal-btn-radius) |
| --button-on-solid | #ffffff |
| --button-purple-500 | #3d2e8a |
| --button-purple-700 | #261c55 |
| --button-purple-400 | #523eb9 |
| --button-blue-500 | #0672a3 |
| --button-blue-700 | #033952 |
| --button-blue-400 | #089de1 |
| --button-blue-50 | #eaf8fe |
| --button-blue-200 | #6fcefa |
| --button-neutral-400 | #cfd2d9 |
| --button-neutral-500 | #949baa |
| --button-neutral-600 | #6a7285 |
| --button-disabled-primary-bg | var(--button-neutral-400) |
| --button-disabled-primary-text | var(--button-neutral-600) |
| --button-focus-ring | rgb(120 104 205 / 0.45) |
| --button-px-sm | 0.75rem |
| --button-py-sm | 0.25rem |
| --button-gap-sm | 0.5rem |
| --button-px-md | 1rem |
| --button-py-md | 0.5rem |
| --button-gap-md | 0.5rem |
| --button-px-lg | 1.125rem |
| --button-py-lg | 0.75rem |
| --button-gap-lg | 0.75rem |

## typography-tokens.css

| Token | Value |
|-------|-------|
| --font-noto | "Noto Sans", var(--font-sans) |
| --font-inter | "Inter", var(--font-sans) |
| --type-heading-regular | 400 4.5000rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.04em |
| --type-heading-semi-bold | 600 4.5000rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.04em |
| --type-heading-bold | 700 4.5000rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.04em |
| --type-subheading | 600 1.0000rem/1.5000rem var(--font-inter) |
| --type-subheading-tracking | 0 |
| --type-heading-regular | 400 3.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.04em |
| --type-heading-semi-bold | 600 3.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.04em |
| --type-heading-bold | 700 3.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.04em |
| --type-heading-regular | 400 3.0000rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.04em |
| --type-heading-semi-bold | 600 3.0000rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.04em |
| --type-heading-bold | 700 3.0000rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.04em |
| --type-heading-regular | 400 2.1250rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.04em |
| --type-heading-semi-bold | 600 2.1250rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.04em |
| --type-heading-bold | 700 2.1250rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.04em |
| --type-heading-regular | 400 2.4375rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.02em |
| --type-heading-semi-bold | 600 2.4375rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | 0 |
| --type-heading-bold | 700 2.4375rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | 0 |
| --type-heading-regular | 400 2.0625rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.02em |
| --type-heading-semi-bold | 600 2.0625rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.02em |
| --type-heading-bold | 700 2.0625rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.02em |
| --type-heading-regular | 400 2.0625rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.02em |
| --type-heading-semi-bold | 600 2.0625rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.02em |
| --type-heading-bold | 700 2.0625rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.02em |
| --type-heading-regular | 400 1.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.02em |
| --type-heading-semi-bold | 600 1.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.02em |
| --type-heading-bold | 700 1.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.02em |
| --type-heading-regular | 400 1.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.02em |
| --type-heading-semi-bold | 600 1.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.02em |
| --type-heading-bold | 700 1.7500rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.02em |
| --type-subheading-regular | 400 1.4375rem/1.649999976158142 var(--font-noto) |
| --type-subheading-regular-tracking | -0.02em |
| --type-subheading-semi-bold | 600 1.4375rem/1.649999976158142 var(--font-noto) |
| --type-subheading-semi-bold-tracking | -0.02em |
| --type-subheading-bold | 700 1.4375rem/1.649999976158142 var(--font-noto) |
| --type-subheading-bold-tracking | -0.02em |
| --type-subheading-regular | 400 1.4375rem/1.649999976158142 var(--font-noto) |
| --type-subheading-regular-tracking | -0.02em |
| --type-subheading-semi-bold | 600 1.4375rem/1.649999976158142 var(--font-noto) |
| --type-subheading-semi-bold-tracking | -0.02em |
| --type-subheading-bold | 700 1.4375rem/1.649999976158142 var(--font-noto) |
| --type-subheading-bold-tracking | -0.02em |
| --type-subheading-regular | 400 1.1875rem/1.649999976158142 var(--font-noto) |
| --type-subheading-regular-tracking | -0.02em |
| --type-subheading-semi-bold | 600 1.1875rem/1.649999976158142 var(--font-noto) |
| --type-subheading-semi-bold-tracking | -0.02em |
| --type-subheading-bold | 700 1.1875rem/1.649999976158142 var(--font-noto) |
| --type-subheading-bold-tracking | -0.02em |
| --type-heading-regular | 400 1.1875rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | -0.02em |
| --type-heading-semi-bold | 600 1.1875rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | -0.02em |
| --type-heading-bold | 700 1.1875rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | -0.02em |
| --type-subheading-regular | 400 1.0000rem/1.649999976158142 var(--font-noto) |
| --type-subheading-regular-tracking | -0.02em |
| --type-subheading-semi-bold | 600 1.0000rem/1.649999976158142 var(--font-noto) |
| --type-subheading-semi-bold-tracking | -0.02em |
| --type-subheading-bold | 700 1.0000rem/1.649999976158142 var(--font-noto) |
| --type-subheading-bold-tracking | -0.02em |
| --type-heading-regular | 400 1.2500rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | 0 |
| --type-heading-semi-bold | 600 1.2500rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | 0 |
| --type-heading-bold | 700 1.2500rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | 0 |
| --type-body-regular | 400 0.8750rem/1.649999976158142 var(--font-noto) |
| --type-body-regular-tracking | 0 |
| --type-body-semi-bold | 600 0.8750rem/1.649999976158142 var(--font-noto) |
| --type-body-semi-bold-tracking | 0 |
| --type-body-bold | 700 0.8750rem/1.649999976158142 var(--font-noto) |
| --type-body-bold-tracking | 0 |
| --type-subheading-regular | 400 1.0000rem/1.649999976158142 var(--font-noto) |
| --type-subheading-regular-tracking | 0 |
| --type-subheading-semi-bold | 600 1.0000rem/1.649999976158142 var(--font-noto) |
| --type-subheading-semi-bold-tracking | 0 |
| --type-subheading-bold | 700 1.0000rem/1.649999976158142 var(--font-noto) |
| --type-subheading-bold-tracking | 0 |
| --type-heading-regular | 400 1.1250rem/1.649999976158142 var(--font-noto) |
| --type-heading-regular-tracking | 0 |
| --type-heading-semi-bold | 600 1.1250rem/1.649999976158142 var(--font-noto) |
| --type-heading-semi-bold-tracking | 0 |
| --type-heading-bold | 700 1.1250rem/1.649999976158142 var(--font-noto) |
| --type-heading-bold-tracking | 0 |
| --type-caption-regular | 400 0.7500rem/1.649999976158142 var(--font-noto) |
| --type-caption-regular-tracking | 0 |
| --type-caption-semi-bold | 600 0.7500rem/1.649999976158142 var(--font-noto) |
| --type-caption-semi-bold-tracking | 0 |
| --type-caption-bold | 700 0.7500rem/1.649999976158142 var(--font-noto) |
| --type-caption-bold-tracking | 0 |
| --type-footnote-bold | 700 0.6250rem/1.649999976158142 var(--font-noto) |
| --type-footnote-bold-tracking | 0.02em |
| --type-footnote-regular | 400 0.6250rem/1.649999976158142 var(--font-noto) |
| --type-footnote-regular-tracking | 0.02em |
| --type-footnote-semi-bold | 600 0.6250rem/1.649999976158142 var(--font-noto) |
| --type-footnote-semi-bold-tracking | 0.02em |
| --type-footnote-bold | 700 0.6250rem/1.649999976158142 var(--font-noto) |
| --type-footnote-bold-tracking | 0.02em |
| --type-micro-regular | 400 0.5000rem/1.649999976158142 var(--font-noto) |
| --type-micro-regular-tracking | 0.02em |
| --type-micro-semi-bold | 600 0.5000rem/1.649999976158142 var(--font-noto) |
| --type-micro-semi-bold-tracking | 0.02em |
| --type-micro-bold | 700 0.5000rem/1.649999976158142 var(--font-noto) |
| --type-micro-bold-tracking | 0.02em |
| --type-heading-bold | 800 2.1250rem/2.5000rem var(--font-inter) |
| --type-heading-bold-tracking | -0.04em |
| --type-subheading-regular | 400 1.0000rem/1.1875rem var(--font-inter) |
| --type-subheading-regular-tracking | 0 |

---

**Total unique tokens:** 778
