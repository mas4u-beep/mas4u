import { motion } from 'framer-motion'
import { Users, Search, Plus, MoreVertical, Phone, Mail } from 'lucide-react'
import { useState } from 'react'

const clients = [
  { id: 1, name: 'ישראל ישראלי', type: 'עצמאי', email: 'israel@example.com', phone: '050-1234567', status: 'פעיל', docs: 24, lastSeen: 'לפני שעה' },
  { id: 2, name: 'חברת הנחלים בע"מ', type: 'חברה', email: 'info@hanechalim.co.il', phone: '03-7654321', status: 'פעיל', docs: 67, lastSeen: 'לפני יומיים' },
  { id: 3, name: 'רונית לוי', type: 'שכיר', email: 'ronit@gmail.com', phone: '052-9876543', status: 'ממתין', docs: 8, lastSeen: 'לפני שבוע' },
  { id: 4, name: 'Tech Solutions Ltd', type: 'חברה', email: 'contact@techsol.com', phone: '04-1111222', status: 'פעיל', docs: 45, lastSeen: 'לפני 3 ימים' },
  { id: 5, name: 'דוד לוי', type: 'עצמאי', email: 'david@levy.com', phone: '054-3333444', status: 'לא פעיל', docs: 12, lastSeen: 'לפני חודש' },
]

const statusColors: Record<string, string> = {
  'פעיל': 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  'ממתין': 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  'לא פעיל': 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
}

export default function AdminClients() {
  const [search, setSearch] = useState('')

  const filtered = clients.filter(c =>
    c.name.includes(search) || c.email.includes(search) || c.type.includes(search)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ניהול לקוחות</h1>
          <p className="text-muted-foreground">{clients.length} לקוחות במערכת</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          לקוח חדש
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="חיפוש לקוחות..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border bg-card px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Clients Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">לקוח</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">סוג</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">אמצעי קשר</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">מסמכים</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">סטטוס</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((client) => (
              <tr key={client.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {client.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{client.name}</p>
                      <p className="text-xs text-muted-foreground">נראה לאחרונה: {client.lastSeen}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    {client.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      {client.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-medium">{client.docs}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[client.status]}`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="rounded-md p-1.5 hover:bg-accent transition-colors">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
