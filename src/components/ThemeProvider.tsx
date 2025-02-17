'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  toggleTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem(storageKey) as Theme
    } catch {
      return defaultTheme
    }
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const toggleTheme = (theme: Theme) => {
    try {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    } catch (error) {
      console.error(error)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeProps = useMemo(() => ({ theme, toggleTheme }), [theme])

  return (
    <ThemeProviderContext.Provider {...props} value={themeProps}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
