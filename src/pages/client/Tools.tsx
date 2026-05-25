import { motion } from 'framer-motion'
import { Calculator, FileSpreadsheet, Receipt, TrendingUp, ArrowLeft } from 'lucide-react'

const tools = [
  {
    id: 1,
    name: '×××©××× ××¢"×',
    description: '×××©×× ××¢"× ×¢× ×¢×¡×§×××ª ×××©××× ×××ª',
    icon: Calculator,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950',
    comingSoon: false,
  },
  {
    id: 2,
    name: '×××©××× ×©××¨',
    description: '×××©×× ×©××¨ × ×× ××¨×××, × ×××××× ××××¡××',
    icon: FileSpreadsheet,
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950',
    comingSoon: false,
  },
  {
    id: 3,
    name: '×××©××× ××¡ ××× ×¡×',
    description: '×××× ××¡ ××× ×¡× ×©× ×ª× ××¢×¦×××× ××©×××¨××',
    icon: Receipt,
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950',
    comingSoon: false,
  },
  {
    id: 4,
    name: '×ª××¨×× ××××× ××',
    description: '× ××ª×× ××ª××××ª ×ª××¨×× ××××× ×× ××××©×',
    icon: TrendingUp,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950',
    comingSoon: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

export default function Tools() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
      dir="rtl"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">×××× ×¤×× × ×¡×××</h1>
        <p className="text-muted-foreground">××× ×××©×× ××¢××¨ ×× ×××× ×××¡×¤×× ×©××</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-xl border bg-card p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            {tool.comingSoon && (
              <span className="absolute left-4 top-4 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                ××§×¨××
              </span>
            )}
            <div className={`mb-4 inline-flex rounded-xl p-3 ${tool.bg}`}>
              <tool.icon className={`h-6 w-6 ${tool.color}`} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{tool.name}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{tool.description}</p>
            {!tool.comingSoon && (
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                ×¤×ª×××ª ××××
                <ArrowLeft className="h-4 w-4" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
