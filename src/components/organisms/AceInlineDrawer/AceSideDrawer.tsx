import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { cn } from '../../../lib/cn'

const DEFAULT_WIDTH = 480
const DEFAULT_MIN_WIDTH = 320
const DEFAULT_MAX_WIDTH = 720

export type AceSideDrawerProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** localStorage key for persisted width; omit to skip persistence */
  widthStorageKey?: string
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  className?: string
}

/**
 * Resizable right-side in-flow drawer shell from Review Assigned (`SideDrawer`).
 * Hosts review / action panel content; not an overlay.
 */
export function AceSideDrawer({
  open,
  onClose,
  children,
  widthStorageKey,
  defaultWidth = DEFAULT_WIDTH,
  minWidth = DEFAULT_MIN_WIDTH,
  maxWidth = DEFAULT_MAX_WIDTH,
  className,
}: AceSideDrawerProps) {
  const clampWidth = useCallback(
    (w: number) => Math.min(maxWidth, Math.max(minWidth, w)),
    [minWidth, maxWidth],
  )

  const [width, setWidth] = useState(() => {
    if (typeof window === 'undefined' || !widthStorageKey) return defaultWidth
    const stored = localStorage.getItem(widthStorageKey)
    if (stored) {
      const n = Number.parseInt(stored, 10)
      if (!Number.isNaN(n)) return clampWidth(n)
    }
    return defaultWidth
  })

  const [isResizing, setIsResizing] = useState(false)
  const resizingRef = useRef(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(width)

  const persistWidth = useCallback(
    (w: number) => {
      if (widthStorageKey) localStorage.setItem(widthStorageKey, String(w))
    },
    [widthStorageKey],
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!resizingRef.current) return
      const delta = startXRef.current - e.clientX
      const next = clampWidth(startWidthRef.current + delta)
      setWidth(next)
    }
    const onUp = () => {
      if (!resizingRef.current) return
      resizingRef.current = false
      setIsResizing(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      setWidth((w) => {
        persistWidth(w)
        return w
      })
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [clampWidth, persistWidth])

  const onResizeStart = (e: MouseEvent) => {
    e.preventDefault()
    resizingRef.current = true
    setIsResizing(true)
    startXRef.current = e.clientX
    startWidthRef.current = width
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  return (
    <div
      data-open={open}
      aria-hidden={!open}
      className={cn(
        'relative z-20 flex max-h-full min-h-0 shrink-0 flex-col self-stretch overflow-hidden',
        'border-solid border-[var(--ace-inline-drawer-border)] bg-[var(--screening-surface)]',
        'shadow-[var(--ace-inline-drawer-shadow)]',
        isResizing
          ? 'transition-opacity duration-200 ease-out'
          : 'transition-[width,opacity,border-color,box-shadow] duration-200 ease-out',
        'motion-reduce:transition-none',
        open ? 'opacity-100 border-l-[0.5px]' : 'w-0 border-l-0 opacity-0 shadow-none',
        className,
      )}
      style={{ width: open ? width : 0 }}
    >
      {open ? (
        <>
          <button
            type="button"
            aria-label="Resize drawer"
            className={cn(
              'absolute left-0 top-0 z-10 h-full w-2 cursor-col-resize touch-none bg-transparent',
              'hover:bg-[color-mix(in_srgb,var(--screening-primary)_25%,transparent)]',
              'active:bg-[color-mix(in_srgb,var(--screening-primary)_40%,transparent)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
              'focus-visible:ring-[color-mix(in_srgb,var(--screening-primary)_40%,transparent)]',
            )}
            onMouseDown={onResizeStart}
          />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden pl-1.5">{children}</div>
        </>
      ) : null}
    </div>
  )
}
