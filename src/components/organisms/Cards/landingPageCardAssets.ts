import { publicAsset } from '../../../lib/publicAsset'

/** Figma Landing Page Card icons (ACE Design System v.3, node 4212:1128). */
export const LANDING_PAGE_CARD_ICONS = {
  headerLock: publicAsset('/brand/cards/header-lock.svg'),
  headerRefresh: publicAsset('/brand/cards/header-refresh.svg'),
  headerVisibility: publicAsset('/brand/cards/header-visibility.svg'),
  headerMoreHorizontal: publicAsset('/brand/cards/header-more-horizontal.svg'),
  statUsers: publicAsset('/brand/cards/stat-users.svg'),
  statFolder: publicAsset('/brand/cards/stat-folder.svg'),
  statWorkflow: publicAsset('/brand/cards/stat-workflow.svg'),
} as const
