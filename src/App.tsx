import { Navigate, Route, Routes } from 'react-router-dom'
import { LabLayout } from './layouts/LabLayout'
import { AtomsLab } from './pages/AtomsLab'
import { ColorsLab } from './pages/ColorsLab'
import { TypographyLab } from './pages/TypographyLab'
import { GuidelinesPage } from './pages/GuidelinesPage'
import { MoleculesLab } from './pages/MoleculesLab'
import { DropdownsLab } from './pages/DropdownsLab'
import { AccordionLab } from './pages/AccordionLab'
import { PaginationLab } from './pages/PaginationLab'
import { SlidersLab } from './pages/SlidersLab'
import { OrganismsLab } from './pages/OrganismsLab'
import { DialogModalLab } from './pages/DialogModalLab'
import { DateAndTimePickersLab } from './pages/DateAndTimePickersLab'
import { SidebarLab } from './pages/SidebarLab'
import { SiteHeaderLab } from './pages/SiteHeaderLab'
import { CardsLab } from './pages/CardsLab'
import { DataTableLab } from './pages/DataTableLab'
import { ButtonPlaygroundLab } from './pages/ButtonPlaygroundLab'
import { InputPlaygroundLab } from './pages/InputPlaygroundLab'
import { CheckboxPlaygroundLab } from './pages/CheckboxPlaygroundLab'
import { TogglePlaygroundLab } from './pages/TogglePlaygroundLab'
import { RadioPlaygroundLab } from './pages/RadioPlaygroundLab'
import { DropShadowsLab } from './pages/DropShadowsLab'
import { TabsLab } from './pages/TabsLab'
import { AnimationsLab } from './pages/AnimationsLab'
import { FinScanIconLab } from './pages/FinScanIconLab'
import { BadgesLab } from './pages/BadgesLab'
import { TooltipLab } from './pages/TooltipLab'
import { ToastMessagesLab } from './pages/ToastMessagesLab'
import { TimelineLab } from './pages/TimelineLab'
import { AttachmentsLab } from './pages/AttachmentsLab'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lab" replace />} />
      <Route path="/lab" element={<LabLayout />}>
        <Route index element={<GuidelinesPage />} />
        <Route path="atoms" element={<AtomsLab />} />
        <Route path="atoms/colors" element={<ColorsLab />} />
        <Route path="atoms/typography" element={<TypographyLab />} />
        <Route path="atoms/drop-shadows" element={<DropShadowsLab />} />
        <Route path="atoms/buttons" element={<ButtonPlaygroundLab />} />
        <Route path="atoms/inputs" element={<InputPlaygroundLab />} />
        <Route path="atoms/checkboxes" element={<CheckboxPlaygroundLab />} />
        <Route path="atoms/toggles" element={<TogglePlaygroundLab />} />
        <Route path="atoms/radios" element={<RadioPlaygroundLab />} />
        <Route path="atoms/badges" element={<BadgesLab />} />
        <Route path="atoms/tooltips" element={<TooltipLab />} />
        <Route path="atoms/tabs" element={<Navigate to="/lab/molecules/tabs" replace />} />
        <Route path="atoms/animations" element={<AnimationsLab />} />
        <Route path="atoms/finscan-logo" element={<FinScanIconLab />} />
        <Route path="atoms/finscan-icon" element={<Navigate to="/lab/atoms/finscan-logo" replace />} />
        <Route path="molecules" element={<MoleculesLab />} />
        <Route path="molecules/dropdowns" element={<DropdownsLab />} />
        <Route path="molecules/accordions" element={<AccordionLab />} />
        <Route path="molecules/pagination" element={<PaginationLab />} />
        <Route path="molecules/sliders" element={<SlidersLab />} />
        <Route path="molecules/tabs" element={<TabsLab />} />
        <Route path="molecules/toast-messages" element={<ToastMessagesLab />} />
        <Route path="organisms" element={<OrganismsLab />} />
        <Route path="organisms/data-table" element={<DataTableLab />} />
        <Route path="organisms/screening-results-table" element={<Navigate to="/lab/organisms/data-table" replace />} />
        <Route path="organisms/dialog-modal" element={<DialogModalLab />} />
        <Route path="organisms/date-time-pickers" element={<DateAndTimePickersLab />} />
        <Route path="organisms/sidebar" element={<SidebarLab />} />
        <Route path="organisms/site-header" element={<SiteHeaderLab />} />
        <Route path="organisms/cards" element={<CardsLab />} />
        <Route path="organisms/timeline" element={<TimelineLab />} />
        <Route path="organisms/attachments" element={<AttachmentsLab />} />
      </Route>
      <Route path="*" element={<Navigate to="/lab" replace />} />
    </Routes>
  )
}
