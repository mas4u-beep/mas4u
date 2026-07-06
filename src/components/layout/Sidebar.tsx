import { NavLink } from 'react-router-dom'
import { 
    LayoutDashboard, FileText, Wrench, BookOpen, 
    Users, Settings, LogOut, Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
    isAdmin?: boolean
}

const clientNav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'לוח בקרה' },
  { to: '/documents', icon: FileText, label: 'מסמכים' },
  { to: '/tools', icon: Wrench, label: 'כלים' },
  { to: '/knowledge', icon: BookOpen, label: 'בסיס ידע' },
  ]

const adminNav = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'סקירה כללית' },
  { to: '/admin/clients', icon: Users, label: 'לקוחות' },
  { to: '/admin/settings', icon: Settings, label: 'הגדרות' },
  ]

export default function Sidebar({ isAdmin = false }: SidebarProps) {
    const navItems = isAdmin ? adminNav : clientNav

  return (
        <aside className="flex h-screen w-64 flex-col border-l bg-card shadow-sm" dir="rtl">
          {/* Logo */}
              <div className="flex h-16 items-center gap-3 border-b px-6">
                      <Building2 className="h-8 w-8 text-primary" />
                      <div>
                                <h1 className="text-lg font-bold text-primary">Mas4U</h1>h1>
                                <p className="text-xs text-muted-foreground">
                                  {isAdmin ? 'ניהול' : 'פורטל לקוחות'}
                                </p>p>
                      </div>div>
              </div>div>
        
          {/* Navigation */}
              <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                    <NavLink
                                  key={item.to}
                                  to={item.to}
                                  className={({ isActive }) =>
                                                  cn(
                                                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                                                    isActive
                                                                      ? 'bg-primary text-primary-foreground'
                                                                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                                  )
                                  }
                                >
                                <item.icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>NavLink>
                  ))}
              </nav>nav>
        
          {/* Footer */}
              <div className="border-t p-4">
                      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                                <LogOut className="h-5 w-5" />
                                יציאה
                      </button>button>
              </div>div>
        </aside>aside>
      )
}
</aside>
