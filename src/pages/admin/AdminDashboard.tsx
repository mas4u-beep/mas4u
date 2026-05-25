import { motion } from 'framer-motion'
import { Users, FileText, TrendingUp, AlertCircle, BarChart2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { formatCurrency } from '@/lib/utils'

const stats = [
  { label: '××§××××ª ×¤×¢××××', value: '47', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950', change: '+3' },
  { label: '××¡×××× ××××© ××', value: '128', icon: FileText, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950', change: '+12' },
  { label: '××× ×¡× ××××©××ª', value: 'âª84,500', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950', change: '+8%' },
  { label: '××©××××ª ×¤×ª××××ª', value: '9', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950', change: '-2' },
]

const monthlyData = [
  { month: '×× ×', clients: 42, docs: 95, revenue: 72000 },
  { month: '×¤××¨', clients: 43, docs: 108, revenue: 75000 },
  { month: '××¨×¥', clients: 44, docs: 115, revenue: 79000 },
  { month: '××¤×¨', clients: 45, docs: 121, revenue: 81000 },
  { month: '×××', clients: 46, docs: 119, revenue: 82500 },
  { month: '××× ', clients: 47, docs: 128, revenue: 84500 },
]

const tasksByType = [
  { name: '××¡××××', value: 45, color: '#3b82f6' },
  { name: '×××××ª', value: 30, color: '#10b981' },
  { name: '×××¢××¥', value: 15, color: '#8b5cf6' },
  { name: '×××¨', value: 10, color: '#f59e0b' },
]

const recentClients = [
  { name: '××©×¨×× ××©×¨×××', type: '×¢×¦×××', status: '×¤×¢××', lastActivity: '××¤× × ×©×¢×' },
  { name: '×××¨×ª ×× ×××× ××¢"×', type: '×××¨×', status: '×¤×¢××', lastActivity: '××¤× × 2 ×©×¢××ª' },
  { name: '×¨×× ××ª ×××', type: '×©×××¨×', status: '×××ª××', lastActivity: '××ª×××' },
  { name: 'Tech Solutions Ltd', type: '×××¨×', status: '×¤×¢××', lastActivity: '××¤× × 3 ××××' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function AdminDashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
      dir="rtl"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">×¡×§××¨× ×××××ª</h1>
        <p className="text-muted-foreground">× ×××× ×××©×¨× ×××¢×§× ×××¨ ××§××××ª</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                <p className="mt-0.5 text-xs text-green-600">{stat.change} ××××××© ××§×××</p>
              </div>
              <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bar Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">×××××ª ××××©×××ª</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="clients" name="××§××××ª" fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="docs" name="××¡××××" fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={itemVariants} className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">×¡××× ×¢×××××ª</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={tasksByType} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {tasksByType.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => v + '%'} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {tasksByType.map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Clients */}
      <motion.div variants={itemVariants} className="rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b p-6">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">×¤×¢××××ª ××§××××ª ×××¨×× ×</h2>
        </div>
        <div className="divide-y">
          {recentClients.map((client) => (
            <div key={client.name} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {client.name[0]}
                </div>
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.type} Â· {client.lastActivity}</p>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                client.status === '×¤×¢××' 
                  ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {client.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
