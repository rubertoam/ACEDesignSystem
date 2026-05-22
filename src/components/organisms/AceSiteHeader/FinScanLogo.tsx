import { FinScanIcon } from '../../atoms/FinScanIcon/FinScanIcon'

/** @deprecated Use FinScanIcon — kept for site header imports */
export function FinScanLogo({ className }: { className?: string }) {
  return <FinScanIcon variant="lockup" size={24} className={className} aria-label="FinScan" />
}
