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
| --ace-section-label-gap | var(--space-3) |
| --ace-drop-shadow-none | none |
| --ace-drop-shadow-xs | 0 4px 8px rgb(0 0 0 / 0.1) |
| --ace-drop-shadow-sm | 0 6px 12px rgb(0 0 0 / 0.1) |
| --ace-drop-shadow-md | 0 8px 16px rgb(0 0 0 / 0.1) |
| --ace-drop-shadow-lg | 0 10px 20px rgb(0 0 0 / 0.1) |
| --ace-drop-shadow-xl | 0 12px 24px rgb(0 0 0 / 0.1) |
| --dialog-modal-surface | #ffffff |
| --dialog-modal-border | #eff0f2 |
| --dialog-modal-radius | 0.5rem |
| --dialog-modal-padding | 1.5rem |
| --dialog-modal-body-focus-gutter | 0.25rem |
| --dialog-modal-section-gap | 1.5rem |
| --dialog-modal-shadow | var(--ace-drop-shadow-xl) |
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
| --dialog-modal-close-hover | var(--ace-neutral-100) |
| --dialog-modal-btn-radius | 0.25rem |
| --dialog-modal-footer-btn-gap | 0.75rem |
| --dialog-modal-content-max-h | min(85vh, 32rem) |
| --dialog-modal-max-width-md | 28rem |
| --dialog-modal-max-width-lg | 38.5rem |
| --dialog-modal-inline-error-bg | var(--ace-error-50) |
| --dialog-modal-inline-error-border | #dc264b |
| --ace-neutral-100 | #f5f6f8 |
| --ace-neutral-50 | #fafafb |
| --ace-neutral-200 | #e8eaed |
| --screening-surface | #ffffff |
| --screening-surface-muted | #fafafb |
| --screening-surface-hover | var(--ace-neutral-100) |
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
| --screening-chip-inactive-hover-bg | var(--ace-neutral-100) |
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
| --ace-dropdown-trigger-width | 12.5rem |
| --ace-dropdown-menu-shadow | var(--ace-drop-shadow-xs) |
| --ace-dropdown-menu-surface | var(--screening-surface) |
| --ace-dropdown-menu-border | var(--screening-border-strong) |
| --ace-dropdown-menu-text | var(--screening-text-primary) |
| --ace-dropdown-menu-text-muted | var(--screening-text-muted) |
| --ace-dropdown-menu-primary | var(--screening-primary) |
| --ace-dropdown-menu-row-hover | var(--screening-surface-hover) |
| --ace-dropdown-menu-row-emphasis | var(--screening-surface-muted) |
| --ace-dropdown-menu-danger | var(--dialog-modal-danger) |
| --ace-time-picker-trigger-width | 15rem |
| --ace-time-picker-panel-width | 15rem |
| --ace-date-picker-trigger-width | 15rem |
| --ace-date-picker-panel-width | 29.25rem |
| --ace-date-picker-panel-width-single | 15.5rem |
| --ace-date-picker-month-title | var(--ace-neutral-800) |
| --ace-date-picker-weekday | var(--screening-text-secondary) |
| --ace-date-picker-day | var(--screening-text-secondary) |
| --ace-date-picker-day-muted | var(--screening-text-muted) |
| --ace-date-picker-day-on-primary | #ffffff |
| --ace-date-picker-range-fill | var(--screening-primary-soft-bg) |
| --ace-date-picker-day-size | 1.75rem |
| --ace-date-picker-day-gap | 0.125rem |
| --ace-neutral-800 | #23262c |
| --ace-site-header-height | 4rem |
| --ace-site-header-px | 2rem |
| --ace-site-header-py | 0.75rem |
| --ace-site-header-surface | var(--screening-surface) |
| --ace-site-header-border | var(--screening-border-strong) |
| --ace-site-header-logo-gap | var(--ace-finscan-icon-gap) |
| --ace-site-header-nav-gap | 2rem |
| --ace-site-header-actions-gap | 1.5rem |
| --ace-site-header-toolbar-gap | 1rem |
| --ace-site-header-toolbar-icon-color | var(--ace-neutral-800) |
| --ace-site-header-icon-notifications-width | 2rem |
| --ace-site-header-icon-notifications-height | 1.96875rem |
| --ace-site-header-icon-help-size | 2.125rem |
| --ace-site-header-nav-hover | var(--screening-surface-hover) |
| --ace-site-header-greeting-color | var(--screening-primary) |
| --ace-lab-segmented-track-bg | var(--screening-surface-muted) |
| --ace-lab-segmented-track-border | var(--screening-border-soft) |
| --ace-lab-segmented-indicator-bg | var(--screening-surface) |
| --ace-lab-segmented-indicator-shadow | 0 1px 2px rgb(35 38 44 / 0.06), 0 2px 6px rgb(35 38 44 / 0.08) |
| --ace-lab-segmented-padding | 0.25rem |
| --ace-finscan-icon-gap | 0.75rem |
| --ace-finscan-mark-green | #99ca3c |
| --ace-finscan-mark-blue | #0672a3 |
| --ace-finscan-mark-magenta | #92278f |
| --ace-secondary-enlighten-violet-50 | #fcf2fb |
| --ace-secondary-enlighten-violet-100 | #f1ccf0 |
| --ace-secondary-enlighten-violet-200 | #e7a5e5 |
| --ace-secondary-enlighten-violet-300 | #dd7fda |
| --ace-secondary-enlighten-violet-400 | #d258cf |
| --ace-secondary-enlighten-violet-500 | var(--ace-finscan-mark-magenta) |
| --ace-secondary-enlighten-violet-600 | #6d1d6b |
| --ace-secondary-enlighten-violet-700 | #491447 |
| --ace-secondary-enlighten-violet-800 | #250a24 |
| --ace-secondary-enlighten-violet-900 | #120512 |
| --ace-secondary-teal-50 | #f0fbfc |
| --ace-secondary-teal-100 | #c1f0f3 |
| --ace-secondary-teal-200 | #93e5eb |
| --ace-secondary-teal-300 | #64dae2 |
| --ace-secondary-teal-400 | #28cad5 |
| --ace-secondary-teal-500 | #22adb6 |
| --ace-secondary-teal-600 | #198289 |
| --ace-secondary-teal-700 | #11565b |
| --ace-secondary-teal-800 | #092b2e |
| --ace-secondary-teal-900 | #041617 |
| --ace-dark-mode-50 | #3a3c43 |
| --ace-dark-mode-100 | #373a41 |
| --ace-dark-mode-200 | #35373e |
| --ace-dark-mode-300 | #30333a |
| --ace-dark-mode-400 | #2e3138 |
| --ace-dark-mode-500 | #292c33 |
| --ace-dark-mode-600 | #272a31 |
| --ace-dark-mode-700 | #24272f |
| --ace-dark-mode-800 | #20232a |
| --ace-dark-mode-900 | #14171f |
| --ace-finscan-mark-primary | #3d2e8a |
| --ace-finscan-wordmark-fill | #3d2e8a |
| --ace-guidelines-principle-title | #454cbc |
| --ace-sidebar-width | 18.125rem |
| --ace-sidebar-menu-icon | var(--ace-neutral-800) |
| --ace-success-50 | #f8fbf1 |
| --ace-success-500 | #87b531 |
| --ace-warning-50 | #fdf3ea |
| --ace-warning-100 | #f9e0cb |
| --ace-warning-200 | #f4c8a1 |
| --ace-warning-300 | #f0af77 |
| --ace-warning-400 | #eb974d |
| --ace-warning-500 | #e67e23 |
| --ace-warning-600 | #c16616 |
| --ace-warning-700 | #934e11 |
| --ace-warning-800 | #66360c |
| --ace-warning-900 | #391e06 |
| --ace-notice-50 | #fffcf3 |
| --ace-notice-100 | #fff2ce |
| --ace-notice-200 | #ffe8aa |
| --ace-notice-300 | #ffdf85 |
| --ace-notice-400 | #ffd560 |
| --ace-notice-500 | #ffbe0b |
| --ace-notice-600 | #c89200 |
| --ace-notice-700 | #c89200 |
| --ace-notice-800 | #856200 |
| --ace-notice-900 | #423100 |
| --ace-error-50 | #fdf4f6 |
| --ace-error-500 | #dc264b |
| --ace-header-status-success | var(--ace-success-500) |
| --ace-sidebar-shadow | 6px 0 5px rgb(0 0 0 / 0.03) |
| --ace-sidebar-border | var(--screening-border-strong) |
| --ace-sidebar-border-accent | #7868cd |
| --ace-sidebar-heading-bg | var(--screening-surface-muted) |
| --ace-sidebar-heading-border | var(--screening-border-strong) |
| --ace-sidebar-item-radius | var(--radius-md) |
| --ace-sidebar-item-selected-bg | var(--screening-primary-soft-bg) |
| --ace-sidebar-item-selected-text | var(--dialog-modal-primary) |
| --ace-sidebar-item-hover-bg | var(--ace-neutral-100) |
| --ace-sidebar-group-expanded-border | var(--ace-button-neutral-400) |
| --ace-sidebar-group-hover-bg | var(--ace-neutral-100) |
| --ace-sidebar-row-action-hover-bg | var(--screening-surface-hover) |
| --ace-sidebar-group-gap | var(--space-3) |
| --ace-sidebar-nav-px | var(--space-3) |
| --ace-sidebar-nav-py | 0.375rem |
| --ace-sidebar-control-width | calc(var(--ace-sidebar-width) - 2 * var(--ace-sidebar-nav-px)) |
| --ace-edit-group-restore-bg | var(--ace-success-500) |
| --ace-edit-group-restore-hover-bg | var(--ace-success-50) |
| --ace-edit-group-trash-hover-bg | var(--ace-error-50) |
| --ace-edit-group-item-row-height | 2.5rem |
| --ace-edit-group-items-list-max-height | calc(
    5 * var(--ace-edit-group-item-row-height) + 4 * var(--space-1) + 2 * var(--space-2)
  ) |
| --ace-motion-ease-standard | cubic-bezier(0.33, 1, 0.68, 1) |
| --ace-motion-duration-fast | 150ms |
| --ace-motion-duration-medium | 300ms |
| --ace-motion-duration-slow | 420ms |
| --ace-sidebar-duration-panel | var(--ace-motion-duration-medium) |
| --ace-sidebar-duration-expand | var(--ace-motion-duration-medium) |
| --ace-inline-drawer-width | 32rem |
| --ace-inline-drawer-border | var(--ace-neutral-400) |
| --ace-inline-drawer-shadow | -6px 0 5px rgb(0 0 0 / 0.03) |
| --ace-inline-drawer-duration-panel | var(--ace-sidebar-duration-panel) |
| --ace-inline-drawer-header-px | 1.5rem |
| --ace-inline-drawer-header-py | 1rem |
| --ace-inline-drawer-body-px | 1.5rem |
| --ace-inline-drawer-body-py | 1rem |
| --ace-inline-drawer-section-gap | 0.625rem |
| --ace-inline-drawer-footer-gap | 1rem |
| --ace-tabs-gap | var(--space-3) |
| --ace-tabs-text-active | var(--screening-primary) |
| --ace-tabs-text-inactive | var(--screening-icon-muted) |
| --ace-tabs-indicator-bg | var(--screening-primary) |
| --ace-tabs-indicator-height | 0.09375rem |
| --ace-tabs-indicator-radius | var(--radius-sm) |
| --ace-tab-card-gap | var(--space-4) |
| --ace-tab-card-radius | 6px |
| --ace-tab-card-padding | 0.875rem |
| --ace-tab-card-max-width | 23.3125rem |
| --ace-tab-card-surface-default | var(--screening-surface) |
| --ace-tab-card-border-default | var(--ace-button-neutral-400) |
| --ace-tab-card-surface-emphasis | var(--screening-primary-soft-bg) |
| --ace-tab-card-border-active | var(--screening-primary) |
| --ace-tab-card-title-color | var(--ace-neutral-800) |
| --ace-tab-card-subtitle-color | var(--screening-text-secondary) |
| --ace-tab-card-description-color | var(--ace-neutral-800) |
| --ace-tab-card-icon-primary | var(--screening-primary) |
| --screening-shadow-card | var(--ace-drop-shadow-xs) |
| --screening-shadow-card-hover | var(--ace-drop-shadow-sm) |
| --ace-landing-page-card-width | 25rem |
| --ace-landing-page-card-min-height | 12.5rem |
| --ace-landing-page-card-radius | 4px |
| --ace-landing-page-card-border | var(--screening-border-row) |
| --ace-landing-page-card-surface | var(--screening-surface) |
| --ace-landing-page-card-footer-bg | var(--screening-primary-soft-bg) |
| --ace-landing-page-card-shadow | var(--screening-shadow-card) |
| --ace-landing-page-card-shadow-hover | 0 12px 12px rgb(0 0 0 / 0.1) |
| --ace-landing-page-card-title-color | var(--ace-neutral-800) |
| --ace-landing-page-card-body-color | var(--ace-neutral-800) |
| --ace-landing-page-card-footer-stat-color | var(--screening-text-secondary) |
| --ace-landing-page-card-link-color | var(--screening-primary) |
| --ace-landing-page-card-tag-bg | var(--ace-button-purple-500) |
| --ace-landing-page-card-tag-text | #ffffff |
| --ace-landing-page-card-header-px | 1.5rem |
| --ace-landing-page-card-header-py | 0.75rem |
| --ace-landing-page-card-body-px | 1.5rem |
| --ace-landing-page-card-body-py-stats | 0.75rem |
| --ace-landing-page-card-body-py-desc | 1.5rem |
| --ace-landing-page-card-footer-px | 1.5rem |
| --ace-landing-page-card-footer-py | 0.75rem |
| --ace-data-card-width | 43.25rem |
| --ace-data-card-radius | 4px |
| --ace-data-card-border | var(--screening-border-row) |
| --ace-data-card-surface | var(--screening-surface) |
| --ace-data-card-header-bg | var(--screening-surface-muted) |
| --ace-data-card-header-height | 2.625rem |
| --ace-data-card-shadow | var(--ace-drop-shadow-sm) |
| --ace-data-card-shadow-hover | var(--ace-drop-shadow-xl) |
| --ace-data-card-row-muted | var(--screening-text-muted) |
| --ace-data-card-insight-bg | var(--screening-primary-soft-bg) |
| --ace-data-card-insight-border | var(--screening-primary) |
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
| --ace-toggle-duration | var(--ace-motion-duration-medium) |
| --ace-toggle-ease | var(--ace-motion-ease-standard) |
| --ace-toggle-thumb | #ffffff |
| --ace-toggle-thumb-disabled | #eff0f2 |
| --ace-toggle-track-off | var(--ace-neutral-200) |
| --ace-toggle-track-on | #523eb9 |
| --ace-toggle-track-off-hover | #dfe2e8 |
| --ace-toggle-track-on-hover | #4334a3 |
| --ace-toggle-track-disabled-off | #cfd2d9 |
| --ace-toggle-track-disabled-on | #cbc5ec |
| --ace-toggle-focus-ring | var(--screening-primary-ring) |
| --ace-toggle-ring-offset | var(--screening-primary-ring-offset) |
| --ace-toggle-track-padding | 0.25rem |
| --ace-toggle-icon-glyph-off | var(--ace-neutral-800) |
| --ace-toggle-icon-glyph-on | var(--ace-toggle-thumb) |
| --ace-tooltip-radius | var(--radius-sm) |
| --ace-tooltip-px | var(--space-3) |
| --ace-tooltip-py | var(--space-2) |
| --ace-tooltip-surface | var(--screening-surface) |
| --ace-tooltip-border | var(--screening-border-strong) |
| --ace-tooltip-text | var(--screening-text-primary) |
| --ace-tooltip-shadow | var(--ace-drop-shadow-xs) |
| --ace-tooltip-duration | var(--ace-motion-duration-fast) |
| --ace-tooltip-ease | ease |
| --ace-status-pill-gap | 0.375rem |
| --ace-status-pill-py | 0.25rem |
| --ace-status-pill-pl | 0.375rem |
| --ace-status-pill-pr | 0.5rem |
| --ace-status-pill-dot-size | 0.5rem |
| --ace-status-pill-label-size | 0.6875rem |
| --ace-status-pill-label-size-sm | 0.75rem |
| --ace-status-pill-purple-border | var(--screening-pill-new-border) |
| --ace-status-pill-purple-surface | var(--screening-pill-new-surface) |
| --ace-status-pill-purple-dot | #523eb9 |
| --ace-status-pill-purple-label | var(--screening-pill-new-label) |
| --ace-status-pill-orange-border | #ffcc80 |
| --ace-status-pill-orange-surface | #fff4e8 |
| --ace-status-pill-orange-dot | #ef6c00 |
| --ace-status-pill-orange-label | #e65100 |
| --ace-status-pill-green-border | #a5d6a7 |
| --ace-status-pill-green-surface | #e8f4ea |
| --ace-status-pill-green-dot | #2e7d32 |
| --ace-status-pill-green-label | #2d6a3e |
| --ace-status-pill-gray-border | #cfd2d9 |
| --ace-status-pill-gray-surface | #f5f6f8 |
| --ace-status-pill-gray-dot | #6a7285 |
| --ace-status-pill-gray-label | #464c59 |
| --ace-status-pill-blue-border | #90caf9 |
| --ace-status-pill-blue-surface | #e3f2fd |
| --ace-status-pill-blue-dot | #1976d2 |
| --ace-status-pill-blue-label | #1565c0 |
| --ace-status-pill-yellow-border | #ffe082 |
| --ace-status-pill-yellow-surface | #fff8e1 |
| --ace-status-pill-yellow-dot | #f9a825 |
| --ace-status-pill-yellow-label | #f57f17 |
| --ace-status-pill-pink-border | #ce93d8 |
| --ace-status-pill-pink-surface | #f3e5f5 |
| --ace-status-pill-pink-dot | #8e24aa |
| --ace-status-pill-pink-label | #6a1b9a |
| --ace-status-pill-teal-border | #80cbc4 |
| --ace-status-pill-teal-surface | #e0f2f1 |
| --ace-status-pill-teal-dot | #00897b |
| --ace-status-pill-teal-label | #00695c |
| --ace-status-pill-red-border | #ef9a9a |
| --ace-status-pill-red-surface | #fdecea |
| --ace-status-pill-red-dot | #c62828 |
| --ace-status-pill-red-label | #b71c1c |
| --ace-badge-tag-gap | 0.375rem |
| --ace-badge-tag-radius | var(--radius-sm) |
| --ace-badge-tag-px | 0.5rem |
| --ace-badge-tag-py | 0.125rem |
| --ace-badge-tag-border | var(--screening-border-strong) |
| --ace-badge-tag-surface | var(--screening-surface-muted) |
| --ace-badge-tag-label | var(--screening-text-secondary) |
| --ace-badge-tag-warning-border | var(--screening-pill-escalated-dot) |
| --ace-badge-tag-warning-surface | var(--ace-warning-50) |
| --ace-badge-tag-warning-label | var(--screening-pill-escalated-label) |
| --ace-badge-tag-warning-icon-size | 0.75rem |
| --ace-badge-tag-warning-icon-text-size | 0.5rem |
| --ace-badge-tag-warning-icon-bg | #ef6c00 |
| --ace-badge-tag-warning-icon-fg | #ffffff |
| --ace-toast-width | 25rem |
| --ace-toast-radius | 4px |
| --ace-toast-px | 1.5rem |
| --ace-toast-py | 1rem |
| --ace-toast-gap | 0.75rem |
| --ace-toast-body-indent | 2rem |
| --ace-toast-action-gap | 1rem |
| --ace-toast-bg | #ffffff |
| --ace-toast-border | #cfd2d9 |
| --ace-toast-shadow | var(--ace-drop-shadow-md) |
| --ace-toast-text | var(--screening-text-secondary) |
| --ace-toast-action-text | var(--ace-button-purple-500) |
| --ace-toast-action-text-hover | var(--screening-primary) |
| --ace-toast-confirm-bg | var(--ace-button-purple-500) |
| --ace-toast-confirm-bg-hover | var(--screening-primary-hover-border) |
| --ace-toast-confirm-text | #ffffff |
| --ace-toast-confirm-radius | 4px |
| --ace-toast-confirm-px | 0.5rem |
| --ace-toast-confirm-py | 0.25rem |
| --ace-toast-dismiss-icon | #64748b |
| --ace-toast-dismiss-icon-hover | var(--screening-text-primary) |
| --ace-toast-icon-glyph | #ffffff |
| --ace-toast-icon-success | var(--ace-success-500) |
| --ace-toast-icon-info | var(--ace-button-purple-500) |
| --ace-toast-icon-warning | var(--ace-warning-500) |
| --ace-toast-icon-error | var(--dialog-modal-danger) |
| --ace-inline-message-radius | 4px |
| --ace-inline-message-px | 1rem |
| --ace-inline-message-py | 0.5rem |
| --ace-inline-message-gap | 0.75rem |
| --ace-inline-message-text | var(--ace-neutral-800) |
| --ace-inline-message-error-bg | var(--ace-error-50) |
| --ace-inline-message-error-border | var(--ace-error-500) |
| --ace-inline-message-error-icon | var(--ace-error-500) |
| --ace-inline-message-success-bg | var(--ace-success-50) |
| --ace-inline-message-success-border | var(--ace-success-500) |
| --ace-inline-message-success-icon | var(--ace-success-500) |
| --ace-inline-message-info-bg | var(--ace-button-blue-50) |
| --ace-inline-message-info-border | var(--ace-button-blue-500) |
| --ace-inline-message-info-icon | var(--ace-button-blue-500) |
| --ace-inline-message-warning-bg | var(--ace-warning-50) |
| --ace-inline-message-warning-border | var(--ace-warning-500) |
| --ace-inline-message-warning-icon | var(--ace-warning-500) |
| --ace-timeline-radius | 4px |
| --ace-timeline-padding | 1rem |
| --ace-timeline-section-gap | 1.5rem |
| --ace-timeline-item-gap | 1rem |
| --ace-timeline-item-padding | 0.75rem |
| --ace-timeline-sort-width | 12.5rem |
| --ace-timeline-icon-size | 2rem |
| --ace-timeline-icon-size-hover | 2.2rem |
| --ace-timeline-icon-glyph-size | 1rem |
| --ace-timeline-icon-glyph-size-hover | 1.1rem |
| --ace-timeline-surface | var(--screening-surface) |
| --ace-timeline-border | #cfd2d9 |
| --ace-timeline-sort-bg | #ffffff |
| --ace-timeline-title | var(--ace-neutral-800) |
| --ace-timeline-subtitle | var(--ace-neutral-800) |
| --ace-timeline-separator | #cfd2d9 |
| --ace-timeline-link | var(--screening-primary) |
| --ace-timeline-link-hover | var(--screening-primary-hover-border) |
| --ace-timeline-expanded-bg | #fafafb |
| --ace-timeline-body-bg | #ffffff |
| --ace-timeline-icon-glyph | #ffffff |
| --ace-timeline-icon-system | var(--screening-primary) |
| --ace-timeline-icon-escalation | var(--ace-warning-500) |
| --ace-timeline-icon-pending | var(--ace-notice-500) |
| --ace-timeline-icon-blocked | var(--dialog-modal-danger) |
| --ace-timeline-icon-safe | var(--ace-success-500) |
| --ace-timeline-highlight-system | var(--screening-primary-soft-bg) |
| --ace-timeline-highlight-escalation | var(--ace-warning-50) |
| --ace-timeline-highlight-pending | var(--ace-notice-50) |
| --ace-timeline-highlight-blocked | var(--ace-error-50) |
| --ace-timeline-highlight-safe | var(--ace-success-50) |
| --ace-attachments-radius | 4px |
| --ace-attachments-padding | 0.75rem |
| --ace-attachments-gap | 0.75rem |
| --ace-attachments-border | #cfd2d9 |
| --ace-attachments-surface | var(--screening-surface) |
| --ace-attachments-dropzone-bg | #fafafb |
| --ace-attachments-dropzone-border | var(--screening-primary) |
| --ace-attachments-panel-bg | #fafafb |
| --ace-attachments-title | var(--screening-primary) |
| --ace-attachments-label | var(--ace-neutral-800) |
| --ace-attachments-link | var(--screening-primary) |
| --ace-attachments-muted | #6a7285 |
| --ace-attachments-status | var(--screening-primary) |
| --ace-attachments-error | var(--dialog-modal-danger) |
| --ace-attachments-divider | #cfd2d9 |
| --ace-filter-radius | 4px |
| --ace-filter-gap | 0.5rem |
| --ace-filter-px | 0.5rem |
| --ace-filter-py | 0.25rem |
| --ace-filter-trigger-border | #cfd2d9 |
| --ace-filter-trigger-bg | var(--screening-surface) |
| --ace-filter-trigger-text | var(--ace-neutral-800) |
| --ace-filter-trigger-active-bg | #464c59 |
| --ace-filter-trigger-active-text | #eff0f2 |
| --ace-filter-chip-border | #cfd2d9 |
| --ace-filter-chip-bg | var(--screening-surface) |
| --ace-filter-chip-text | var(--ace-neutral-800) |
| --ace-filter-chip-icon | var(--ace-neutral-800) |
| --ace-filter-chip-clear | #949baa |
| --ace-filter-chip-selected-bg | #464c59 |
| --ace-filter-chip-selected-text | #eff0f2 |
| --ace-filter-chip-selected-icon | #eff0f2 |
| --ace-filter-header-title | #464c59 |
| --ace-filter-header-gap | 0.75rem |
| --ace-filter-search-width | 12.5rem |
| --ace-slider-track-height | 0.625rem |
| --ace-slider-radius | 4px |
| --ace-slider-handle-height | 2.25rem |
| --ace-slider-handle-width | 4px |
| --ace-slider-handle-width-hover | 8px |
| --ace-slider-tick-inset | 4px |
| --ace-slider-tooltip-size | 1.75rem |
| --ace-slider-track-inactive | #efeef9 |
| --ace-slider-track-border | #523eb9 |
| --ace-slider-range | #523eb9 |
| --ace-slider-handle | #523eb9 |
| --ace-slider-tick-on-range | #efeef9 |
| --ace-slider-tick-on-track | #523eb9 |
| --ace-slider-tooltip-bg | #23262c |
| --ace-slider-tooltip-text | #fafafb |
| --ace-slider-track-inactive-disabled | #eff0f2 |
| --ace-slider-track-border-disabled | #cfd2d9 |
| --ace-slider-range-disabled | #cbc5ec |
| --ace-slider-handle-disabled | #949baa |
| --ace-slider-focus-ring | var(--screening-primary-ring) |
| --ace-slider-ring-offset | var(--screening-primary-ring-offset) |
| --ace-radio-bg-inner | #ffffff |
| --ace-radio-border-default | #23262c |
| --ace-radio-border-hover | #23262c |
| --ace-radio-surface-hover | var(--ace-neutral-100) |
| --ace-radio-border-selected | #523eb9 |
| --ace-radio-indicator-selected | #523eb9 |
| --ace-radio-border-disabled | #949baa |
| --ace-radio-indicator-disabled | #d4d6db |
| --ace-radio-label-disabled | #949baa |
| --ace-radio-focus-ring | var(--screening-primary-ring) |
| --ace-radio-focus-offset | var(--screening-primary-ring-offset) |
| --ace-radio-field-border | #cfd2d9 |
| --ace-radio-field-bg | #ffffff |
| --ace-radio-field-bg-hover | #efeef9 |
| --ace-radio-field-bg-active | #efeef9 |
| --ace-radio-field-border-active | #523eb9 |
| --ace-radio-field-bg-disabled | #eff0f2 |
| --screening-icon-chevron | 1rem |
| --screening-duration-accordion | 420ms |
| --screening-ease-accordion | cubic-bezier(0.33, 1, 0.68, 1) |
| --ace-accordion-surface | #ffffff |
| --ace-accordion-surface-muted | #fafafb |
| --ace-accordion-border | #cfd2d9 |
| --ace-accordion-radius | 0.25rem |
| --ace-accordion-px | 1rem |
| --ace-accordion-py | 0.75rem |
| --ace-accordion-gap | 1rem |
| --ace-accordion-title | #23262c |
| --ace-accordion-tag-bg | #e4e6ea |
| --ace-accordion-tag-text | #23262c |
| --ace-accordion-icon | #23262c |
| --ace-accordion-content-bg | #ffffff |
| --ace-accordion-duration | 420ms |
| --ace-accordion-ease | cubic-bezier(0.33, 1, 0.68, 1) |
| --ace-availability-available-bg | #e8f4ea |
| --ace-availability-available-border | rgb(46 125 50 / 0.2) |
| --ace-availability-available-text | #2e7d32 |
| --ace-availability-in-progress-bg | var(--ace-notice-100) |
| --ace-availability-in-progress-border | var(--ace-notice-200) |
| --ace-availability-in-progress-text | var(--ace-warning-600) |
| --ace-availability-planned-bg | #f4f1fc |
| --ace-availability-planned-border | #d6cef5 |
| --ace-availability-planned-text | #523eb9 |
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
| --ace-input-height-sm | var(--screening-input-height-sm) |
| --ace-input-height-md | 2.75rem |
| --ace-input-height-lg | 3.25rem |
| --ace-input-font-sm | 0.875rem |
| --ace-input-font-md | 1rem |
| --ace-input-font-lg | 1.125rem |
| --ace-input-leading-sm | 1.0625rem |
| --ace-input-leading-md | 1.1875rem |
| --ace-input-leading-lg | 1.35rem |
| --ace-input-error-bg | var(--ace-error-50) |
| --ace-input-error-border | #dc264b |
| --ace-input-error-message | #ef4444 |
| --ace-input-disabled-bg | #eff0f2 |
| --ace-input-disabled-border | #dedee5 |
| --ace-input-disabled-text | #464c59 |
| --ace-button-radius | var(--dialog-modal-btn-radius) |
| --ace-button-on-solid | #ffffff |
| --ace-button-purple-500 | #3d2e8a |
| --ace-button-purple-700 | #261c55 |
| --ace-button-purple-400 | #523eb9 |
| --ace-button-blue-500 | #0672a3 |
| --ace-button-blue-700 | #033952 |
| --ace-button-blue-400 | #089de1 |
| --ace-button-blue-50 | #eaf8fe |
| --ace-button-blue-200 | #6fcefa |
| --ace-button-neutral-400 | #cfd2d9 |
| --ace-button-neutral-500 | #949baa |
| --ace-button-neutral-600 | #6a7285 |
| --ace-button-disabled-primary-bg | var(--ace-button-neutral-400) |
| --ace-button-disabled-primary-text | var(--ace-button-neutral-600) |
| --ace-button-focus-ring | rgb(120 104 205 / 0.45) |
| --ace-button-px-sm | 0.75rem |
| --ace-button-py-sm | 0.25rem |
| --ace-button-gap-sm | 0.5rem |
| --ace-button-px-md | 1rem |
| --ace-button-py-md | 0.5rem |
| --ace-button-gap-md | 0.5rem |
| --ace-button-px-lg | 1.125rem |
| --ace-button-py-lg | 0.75rem |
| --ace-button-gap-lg | 0.75rem |

## typography-tokens.css

| Token | Value |
|-------|-------|
| --font-ace-noto | "Noto Sans", var(--font-sans) |
| --font-ace-inter | "Inter", var(--font-sans) |
| --ace-type-display-01-regular | 400 4.5000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-display-01-regular-tracking | -0.04em |
| --ace-type-display-01-semi-bold | 600 4.5000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-display-01-semi-bold-tracking | -0.04em |
| --ace-type-display-01-bold | 700 4.5000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-display-01-bold-tracking | -0.04em |
| --ace-type-body-semibold-default-16px-inter | 600 1.0000rem/1.5000rem var(--font-ace-inter) |
| --ace-type-body-semibold-default-16px-inter-tracking | 0 |
| --ace-type-display-02-regular | 400 3.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-display-02-regular-tracking | -0.04em |
| --ace-type-display-02-semi-bold | 600 3.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-display-02-semi-bold-tracking | -0.04em |
| --ace-type-display-02-bold | 700 3.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-display-02-bold-tracking | -0.04em |
| --ace-type-heading-h1-regular | 400 3.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h1-regular-tracking | -0.04em |
| --ace-type-heading-h1-semi-bold | 600 3.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h1-semi-bold-tracking | -0.04em |
| --ace-type-heading-h1-bold | 700 3.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h1-bold-tracking | -0.04em |
| --ace-type-heading-h1-small-regular | 400 2.1250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h1-small-regular-tracking | -0.04em |
| --ace-type-heading-h1-small-semi-bold | 600 2.1250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h1-small-semi-bold-tracking | -0.04em |
| --ace-type-heading-h1-small-bold | 700 2.1250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h1-small-bold-tracking | -0.04em |
| --ace-type-heading-h2-regular | 400 2.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h2-regular-tracking | -0.02em |
| --ace-type-heading-h2-semi-bold | 600 2.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h2-semi-bold-tracking | 0 |
| --ace-type-heading-h2-bold | 700 2.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h2-bold-tracking | 0 |
| --ace-type-heading-h2-small-regular | 400 2.0625rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h2-small-regular-tracking | -0.02em |
| --ace-type-heading-h2-small-semi-bold | 600 2.0625rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h2-small-semi-bold-tracking | -0.02em |
| --ace-type-heading-h2-small-bold | 700 2.0625rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h2-small-bold-tracking | -0.02em |
| --ace-type-heading-h3-regular | 400 2.0625rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h3-regular-tracking | -0.02em |
| --ace-type-heading-h3-semi-bold | 600 2.0625rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h3-semi-bold-tracking | -0.02em |
| --ace-type-heading-h3-bold | 700 2.0625rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h3-bold-tracking | -0.02em |
| --ace-type-heading-h3-small-regular | 400 1.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h3-small-regular-tracking | -0.02em |
| --ace-type-heading-h3-small-semi-bold | 600 1.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h3-small-semi-bold-tracking | -0.02em |
| --ace-type-heading-h3-small-bold | 700 1.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h3-small-bold-tracking | -0.02em |
| --ace-type-heading-h4-regular | 400 1.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h4-regular-tracking | -0.02em |
| --ace-type-heading-h4-semi-bold | 600 1.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h4-semi-bold-tracking | -0.02em |
| --ace-type-heading-h4-bold | 700 1.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h4-bold-tracking | -0.02em |
| --ace-type-heading-h4-small-regular | 400 1.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h4-small-regular-tracking | -0.02em |
| --ace-type-heading-h4-small-semi-bold | 600 1.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h4-small-semi-bold-tracking | -0.02em |
| --ace-type-heading-h4-small-bold | 700 1.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h4-small-bold-tracking | -0.02em |
| --ace-type-heading-h5-regular | 400 1.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h5-regular-tracking | -0.02em |
| --ace-type-heading-h5-semi-bold | 600 1.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h5-semi-bold-tracking | -0.02em |
| --ace-type-heading-h5-bold | 700 1.4375rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h5-bold-tracking | -0.02em |
| --ace-type-heading-h5-small-regular | 400 1.1875rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h5-small-regular-tracking | -0.02em |
| --ace-type-heading-h5-small-semi-bold | 600 1.1875rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h5-small-semi-bold-tracking | -0.02em |
| --ace-type-heading-h5-small-bold | 700 1.1875rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h5-small-bold-tracking | -0.02em |
| --ace-type-heading-h6-regular | 400 1.1875rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h6-regular-tracking | -0.02em |
| --ace-type-heading-h6-semi-bold | 600 1.1875rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h6-semi-bold-tracking | -0.02em |
| --ace-type-heading-h6-bold | 700 1.1875rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h6-bold-tracking | -0.02em |
| --ace-type-heading-h6-small-regular | 400 1.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h6-small-regular-tracking | -0.02em |
| --ace-type-heading-h6-small-semi-bold | 600 1.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h6-small-semi-bold-tracking | -0.02em |
| --ace-type-heading-h6-small-bold | 700 1.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-heading-h6-small-bold-tracking | -0.02em |
| --ace-type-subheading-regular | 400 1.2500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-subheading-regular-tracking | 0 |
| --ace-type-subheading-semi-bold | 600 1.2500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-subheading-semi-bold-tracking | 0 |
| --ace-type-subheading-bold | 700 1.2500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-subheading-bold-tracking | 0 |
| --ace-type-paragraph-p1-regular | 400 0.8750rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p1-regular-tracking | 0 |
| --ace-type-paragraph-p1-semi-bold | 600 0.8750rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p1-semi-bold-tracking | 0 |
| --ace-type-paragraph-p1-bold | 700 0.8750rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p1-bold-tracking | 0 |
| --ace-type-paragraph-p2-regular | 400 1.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p2-regular-tracking | 0 |
| --ace-type-paragraph-p2-semi-bold | 600 1.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p2-semi-bold-tracking | 0 |
| --ace-type-paragraph-p2-bold | 700 1.0000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p2-bold-tracking | 0 |
| --ace-type-paragraph-p3-regular | 400 1.1250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p3-regular-tracking | 0 |
| --ace-type-paragraph-p3-semi-bold | 600 1.1250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p3-semi-bold-tracking | 0 |
| --ace-type-paragraph-p3-bold | 700 1.1250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-paragraph-p3-bold-tracking | 0 |
| --ace-type-caption-regular | 400 0.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-caption-regular-tracking | 0 |
| --ace-type-caption-semi-bold | 600 0.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-caption-semi-bold-tracking | 0 |
| --ace-type-caption-bold | 700 0.7500rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-caption-bold-tracking | 0 |
| --ace-type-label-bold | 700 0.6250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-label-bold-tracking | 0.02em |
| --ace-type-footer-regular | 400 0.6250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-footer-regular-tracking | 0.02em |
| --ace-type-footer-semi-bold | 600 0.6250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-footer-semi-bold-tracking | 0.02em |
| --ace-type-footer-bold | 700 0.6250rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-footer-bold-tracking | 0.02em |
| --ace-type-footer-02-regular | 400 0.5000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-footer-02-regular-tracking | 0.02em |
| --ace-type-footer-02-semi-bold | 600 0.5000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-footer-02-semi-bold-tracking | 0.02em |
| --ace-type-footer-02-bold | 700 0.5000rem/1.649999976158142 var(--font-ace-noto) |
| --ace-type-footer-02-bold-tracking | 0.02em |
| --ace-type-heading-h1-small-extra-bold-inter | 800 2.1250rem/2.5000rem var(--font-ace-inter) |
| --ace-type-heading-h1-small-extra-bold-inter-tracking | -0.04em |
| --ace-type-paragraph-p2-regular-inter | 400 1.0000rem/1.1875rem var(--font-ace-inter) |
| --ace-type-paragraph-p2-regular-inter-tracking | 0 |

---

**Total unique tokens:** 778
