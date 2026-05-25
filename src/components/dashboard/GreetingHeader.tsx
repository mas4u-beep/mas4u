import { motion } from 'framer-motion'
import { Sun, Moon, Bell, User } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

interface GreetingHeaderProps {
  clientName?: string
  lastLogin?: string
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'בוקר טוב'
  if (hour < 17) return 'צהריים טובים'
  return 'ערב טוב'
}

export default function GreetingHeader({ clientName = 'לקוח יקר', lastLogin }: GreetingHeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between rounded-2xl bg-gradient-to-l from-primary/10 to-primary/5 border border-primary/20 p-6"
      dir="rtl"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
          <User className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()}, {clientName}!
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {lastLogin ? `כניסה אחרונה: ${lastLogin}` : 'ברוכים הבאים לפורטל הלקוחות שלכם'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border hover:bg-accent transition-colors"
          aria-label="החלף ערכת נושא"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border hover:bg-accent transition-colors"
          aria-label="התראות"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-1 ring-background" />
        </button>
      </div>
    </motion.div>
  )
}
