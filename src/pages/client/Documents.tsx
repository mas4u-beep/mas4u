import { motion } from 'framer-motion'
import { FileText, Download, Eye, Search, Filter, Upload } from 'lucide-react'
import { useState } from 'react'
import { formatShortDate } from '@/lib/utils'

const documents = [
  { id: 1, name: '××× ×¨××¢×× × Q2 2025', type: 'PDF', size: '2.4 MB', date: new Date('2025-06-15'), category: '×××××ª', status: '×××©××' },
  { id: 2, name: '×ª×××©× ×©××¨ ××× 2025', type: 'PDF', size: '1.1 MB', date: new Date('2025-06-01'), category: '×©××¨', status: '×××ª××' },
  { id: 3, name: '××¦××¨×ª ××× 2024', type: 'XLSX', size: '3.7 MB', date: new Date('2025-05-28'), category: '××¡××', status: '××××¤××' },
  { id: 4, name: '××¢"× ××¤×¨×× 2025', type: 'PDF', size: '890 KB', date: new Date('2025-05-20'), category: '××¢"×', status: '×××©××' },
  { id: 5, name: '××©××× ××ª ×©××¨××ª - ××¨×¥ 2025', type: 'PDF', size: '450 KB', date: new Date('2025-04-05'), category: '××©××× ×××ª', status: '×××©××' },
]

const categories = ['×××', '×××××ª', '×©××¨', '××¡××', '××¢"×', '××©××× ×××ª']

const statusColors: Record<string, string> = {
  '×××©××': 'text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-300',
  '×××ª××': 'text-amber-700 bg-amber-50 dark:bg-amber-950 dark:text-amber-300',
  '××××¤××': 'text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-300',
}

export default function Documents() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('×××')

  const filtered = documents.filter(doc => {
    const matchSearch = doc.name.includes(search) || doc.category.includes(search)
    const matchCat = activeCategory === '×××' || doc.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">××¡××××</h1>
          <p className="text-muted-foreground">×× ×××¡×××× ×©×× ×××§×× ×××</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Upload className="h-4 w-4" />
          ××¢×××ª ××¡××
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="×××¤××© ××¡××××..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-card px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm hover:bg-accent transition-colors">
          <Filter className="h-4 w-4" />
          ×¡×× ××
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border hover:bg-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">×©× ×××¡××</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">×§××××¨××</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">×ª××¨××</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">××××</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">×¡××××¡</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">×¤×¢××××ª</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((doc) => (
              <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{doc.category}</td>
                <td className="px-6 py-4 text-muted-foreground">{formatShortDate(doc.date)}</td>
                <td className="px-6 py-4 text-muted-foreground">{doc.size}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[doc.status]}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="rounded-md p-1.5 hover:bg-accent transition-colors" title="×¦×¤×××">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="rounded-md p-1.5 hover:bg-accent transition-colors" title="×××¨××">
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
