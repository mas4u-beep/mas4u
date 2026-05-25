import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts'
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface PnlDataPoint {
  month: string
  income: number
  expenses: number
  profit: number
}

interface PnlChartProps {
  data?: PnlDataPoint[]
  title?: string
}

const defaultData: PnlDataPoint[] = [
  { month: 'ינואר', income: 85000, expenses: 62000, profit: 23000 },
  { month: 'פברואר', income: 92000, expenses: 71000, profit: 21000 },
  { month: 'מרץ', income: 78000, expenses: 58000, profit: 20000 },
  { month: 'אפריל', income: 105000, expenses: 79000, profit: 26000 },
  { month: 'מאי', income: 98000, expenses: 74000, profit: 24000 },
  { month: 'יוני', income: 115000, expenses: 85000, profit: 30000 },
  { month: 'יולי', income: 88000, expenses: 67000, profit: 21000 },
  { month: 'אוגוסט', income: 95000, expenses: 72000, profit: 23000 },
  { month: 'ספטמבר', income: 102000, expenses: 78000, profit: 24000 },
  { month: 'אוקטובר', income: 110000, expenses: 81000, profit: 29000 },
  { month: 'נובמבר', income: 108000, expenses: 83000, profit: 25000 },
  { month: 'דצמבר', income: 125000, expenses: 90000, profit: 35000 },
]

type ChartView = 'area' | 'bar' | 'profit'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border bg-background p-3 shadow-lg text-sm" dir="rtl">
      <p className="font-semibold mb-2 text-foreground">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function PnlChart({ data = defaultData, title = 'דוח רווח והפסד' }: PnlChartProps) {
  const [view, setView] = useState<ChartView>('area')

  const totalIncome = data.reduce((s, d) => s + d.income, 0)
  const totalExpenses = data.reduce((s, d) => s + d.expenses, 0)
  const totalProfit = totalIncome - totalExpenses
  const profitChange = ((data[data.length - 1].profit - data[0].profit) / data[0].profit) * 100

  const views: { key: ChartView; label: string }[] = [
    { key: 'area', label: 'שטח' },
    { key: 'bar', label: 'עמודות' },
    { key: 'profit', label: 'רווח' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border bg-card shadow-sm"
      dir="rtl"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {views.map(v => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${view === v.key ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 p-5 pb-3">
        {[
          { label: 'סה"כ הכנסות', value: totalIncome, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/40' },
          { label: 'סה"כ הוצאות', value: totalExpenses, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/40' },
          { label: 'רווח נקי', value: totalProfit, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/40' },
        ].map(item => (
          <div key={item.label} className={`rounded-xl p-3 ${item.bg}`}>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className={`text-sm font-bold mt-0.5 ${item.color}`}>{formatCurrency(item.value)}</p>
          </div>
        ))}
      </div>

      <div className="px-2 pb-4">
        <ResponsiveContainer width="100%" height={280}>
          {view === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.07)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => v === 'income' ? 'הכנסות' : 'הוצאות'} />
              <Area type="monotone" dataKey="income" name="income" stroke="#3b82f6" fill="url(#incomeGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" name="expenses" stroke="#ef4444" fill="url(#expGrad)" strokeWidth={2} />
            </AreaChart>
          ) : view === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.07)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => v === 'income' ? 'הכנסות' : 'הוצאות'} />
              <Bar dataKey="income" name="income" fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="expenses" name="expenses" fill="#ef4444" radius={[4,4,0,0]} />
            </BarChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.07)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#666" />
              <Bar dataKey="profit" name="profit" radius={[4,4,0,0]}
                fill="#22c55e"
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1.5 border-t px-5 py-3 text-sm text-muted-foreground">
        {profitChange >= 0 ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span>
          שינוי ברווח מינואר עד דצמבר:{' '}
          <span className={profitChange >= 0 ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
            {profitChange >= 0 ? '+' : ''}{profitChange.toFixed(1)}%
          </span>
        </span>
      </div>
    </motion.div>
  )
        }
