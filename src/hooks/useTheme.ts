import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('mas4u-theme') as Theme
    return saved || 'system'
  })

  useEffect(() => {
    const root = document.documentElement
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    root.classList.toggle('dark', isDark)
    localStorage.setItem('mas4u-theme', theme)
  }, [theme])

  return { theme, setTheme }
}
