import { Bell, Sun, Moon, User } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  isAdmin?: boolean
}

export default function Header({ isAdmin = false }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6" dir="rtl">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          {isAdmin ? '× ×××× ×××¢×¨××ª' : '×©×××, ××§×× ××§×¨'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {new Intl.DateTimeFormat('he-IL', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          }).format(new Date())}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          title="××××£ ××¦× ×ª×¦×××"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <span className="text-foreground">××©××× ×</span>
        </button>
      </div>
    </header>
  )
}
