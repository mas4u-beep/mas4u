import { motion } from 'framer-motion'
import { BookOpen, Search, ChevronLeft, Tag } from 'lucide-react'
import { useState } from 'react'

const articles = [
  {
    id: 1,
    title: '×××¨×× ×××©×ª ××× ×©× ×ª× ××¢×¦××××',
    summary: '×× ×× ×©×¦×¨×× ×××¢×ª ×¢× ×××©×ª ××× ×©× ×ª× ×××¡ ××× ×¡× ××¢×¦××× - ×××¢×××, ××¡×××× ××ª××××',
    category: '××¡ ××× ×¡×',
    tags: ['×¢×¦××××', '××× ×©× ×ª×', '××¡ ××× ×¡×'],
    readTime: '7 ××§××ª',
    date: '10/06/2025',
  },
  {
    id: 2,
    title: '×× ×× ×©×¦×¨×× ×××¢×ª ×¢× ××¢"×',
    summary: '××¡××¨ ××§××£ ×¢× ××¢"×: ×× ××××, ××ª× ××××©××, ××× × ××ª× ×× ×××ª',
    category: '××¢"×',
    tags: ['××¢"×', '××©××× ×××ª', '×¢×¡×§××'],
    readTime: '5 ××§××ª',
    date: '01/06/2025',
  },
  {
    id: 3,
    title: '× ×××××× ×××ª×¨×× ××××¦×××ª ×¢×¡×§×××ª',
    summary: '×¨×©×××ª ××××¦×××ª ××××ª×¨××ª ×× ×××× ××¦××¨×× ××¡ ××××¦× ××ª×¢× ×××ª× × ×××',
    category: '×××¦×××ª',
    tags: ['×××¦×××ª', '× ××××××', '×××¡××× ×××¡'],
    readTime: '6 ××§××ª',
    date: '25/05/2025',
  },
  {
    id: 4,
    title: '××××× ××××× ××¢×¦×××× - ×××¨×× ×××',
    summary: '×××× ××××× ××××× ××¢×¦××××, ×××©××, ×× ×××ª ××¤×××¨××',
    category: '××××× ×××××',
    tags: ['××××× ×××××', '×¢×¦××××', '××× ×××××'],
    readTime: '8 ××§××ª',
    date: '20/05/2025',
  },
]

const categories = ['×××', '××¡ ××× ×¡×', '××¢"×', '×××¦×××ª', '××××× ×××××']

const categoryColors: Record<string, string> = {
  '××¡ ××× ×¡×': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  '××¢"×': 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  '×××¦×××ª': 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  '××××× ×××××': 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
}

export default function Knowledge() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('×××')

  const filtered = articles.filter(article => {
    const matchSearch = article.title.includes(search) || article.summary.includes(search) || article.tags.some(t => t.includes(search))
    const matchCat = activeCategory === '×××' || article.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      dir="rtl"
    >
      <div>
        <h1 className="text-2xl font-bold">××¡××¡ ×××¢</h1>
        <p className="text-muted-foreground">×××¨×××× ×××××¨×× ××§×¦××¢××× ×× ××©×× ×××¡×× ×××©××× ×××ª</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="×××¤××© ××××¨××..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border bg-card px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
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

      {/* Articles Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((article) => (
          <motion.div
            key={article.id}
            whileHover={{ y: -2 }}
            className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="mb-3 flex items-start justify-between">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${categoryColors[article.category] || 'bg-muted text-muted-foreground'}`}>
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5" />
                {article.readTime}
              </div>
            </div>

            <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {article.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {article.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                ×§×¨×××
                <ChevronLeft className="h-3.5 w-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
