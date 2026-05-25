import { motion } from 'framer-motion'
import { FileText, Clock, CheckCircle, AlertCircle, TrendingUp, Calendar } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'

const stats = [
  { label: '××¡×××× ×¤×¢××××', value: '24', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950' },
  { label: '×××ª×× ××××¤××', value: '3', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950' },
  { label: '×××©×× ×××××©', value: '18', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950' },
  { label: '×××¨×© ×ª×©×××ª ××', value: '2', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950' },
]

const chartData = [
  { month: '×× ×', income: 45000, expenses: 32000 },
  { month: '×¤××¨', income: 52000, expenses: 38000 },
  { month: '××¨×¥', income: 48000, expenses: 35000 },
  { month: '××¤×¨', income: 61000, expenses: 42000 },
  { month: '×××', income: 55000, expenses: 39000 },
  { month: '××× ', income: 67000, expenses: 45000 },
]

const recentDocs = [
  { name: '××× ×¨××¢×× × Q2 2025', date: '15/06/2025', status: '×××©××', statusColor: 'text-green-600 bg-green-50' },
  { name: '×ª×××©× ×©××¨ ××× 2025', date: '01/06/2025', status: '×××ª××', statusColor: 'text-amber-600 bg-amber-50' },
  { name: '××¦××¨×ª ××× 2024', date: '28/05/2025', status: '××××¤××', statusColor: 'text-blue-600 bg-blue-50' },
  { name: '××¢"× ××¤×¨×× 2025', date: '20/05/2025', status: '×××©××', statusColor: 'text-green-600 bg-green-50' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
      dir="rtl"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-foreground">××× ××§×¨×</h1>
        <p className="text-muted-foreground">××¨×× ××× ××¤××¨×× ×××§××××ª ×©××</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div variants={itemVariants} className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">×¡×§××¨× ×¤×× × ×¡××ª</h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis tickFormatter={(v) => formatCurrency(v)} className="text-xs" />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Area type="monotone" dataKey="income" name="××× ×¡××ª" stroke="#3b82f6" fill="url(#incomeGradient)" />
            <Area type="monotone" dataKey="expenses" name="×××¦×××ª" stroke="#ef4444" fill="url(#expensesGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Documents */}
      <motion.div variants={itemVariants} className="rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b p-6">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">××¡×××× ×××¨×× ××</h2>
        </div>
        <div className="divide-y">
          {recentDocs.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-foreground">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${doc.statusColor}`}>
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
