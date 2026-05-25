import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { cn } from '@/lib/utils'

interface LayoutProps {
  isAdmin?: boolean
}

export default function Layout({ isAdmin = false }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background" dir="rtl">
      <Sidebar isAdmin={isAdmin} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header isAdmin={isAdmin} />
        <main className={cn(
          "flex-1 overflow-y-auto p-6",
          "bg-muted/30"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
