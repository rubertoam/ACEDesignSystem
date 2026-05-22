import { createContext, useContext, type ReactNode } from 'react'

export type LabTheme = 'light' | 'dark'

const LabThemeContext = createContext<LabTheme>('light')

export function LabThemeProvider({ theme, children }: { theme: LabTheme; children: ReactNode }) {
  return <LabThemeContext.Provider value={theme}>{children}</LabThemeContext.Provider>
}

export function useLabTheme(): LabTheme {
  return useContext(LabThemeContext)
}
