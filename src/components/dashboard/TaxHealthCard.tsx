import { motion } from 'framer-motion'
import { ShieldCheck, AlertTriangle, XCircle, TrendingUp } from 'lucide-react'

type HealthStatus = 'good' | 'warning' | 'critical'

interface TaxItem {
  label: string
  status: HealthStatus
  detail: string
  dueDate?: string
}

interface TaxHealthCardProps {
  score?: number
  items?: TaxItem[]
}

const defaultItems: TaxItem[] = [
  { label: 'מע"מ', status: 'good', detail: 'עדכני', dueDate: '15/07/2025' },
  { label: 'מקדמות מס הכנסה', status: 'warning', detail: 'דיווח ממתין', dueDate: '31/07/2025' },
  { label: 'ניכויים במקור', status: 'good', detail: 'הוגש', dueDate: '15/07/2025' },
  { label: 'ביטוח לאומי', status: 'good', detail: 'שולם', dueDate: '31/07/2025' },
  { label: 'דוח שנתי 2024', status: 'critical', detail: 'נדרשת פעולה מיידית' },
]

const statusConfig = {
  good: { icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/50', label: 'תקין' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/50', label: 'ממתין' },
  critical: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/50', label: 'דחוף' },
}

function getScoreColor(score: number) {
  if (score >= 80) return 'text-green-500'
  if (score >= 50) return 'text-amber-500'
  return 'text-red-500'
}

function getScoreLabel(score: number) {
  if (score >= 80) return 'מצב תקין'
  if (score >= 50) return 'דורש תשומת לב'
  return 'דורש טיפול דחוף'
}

export default function TaxHealthCard({ score = 76, items = defaultItems }: TaxHealthCardProps) {
  const circumference = 2 * Math.PI * 36
  const dash = (score / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl border bg-card shadow-sm overflow-hidden"
      dir="rtl"
    >
      <div className="flex items-center gap-2 border-b p-5">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">מצב מס</h2>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="relative flex items-center justify-center">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="36" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
              <circle
                cx="44" cy="44" r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${dash} ${circumference}`}
                strokeLinecap="round"
                className={getScoreColor(score)}
              />
            </svg>
            <div className="absolute text-center">
              <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className="block text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-semibold ${getScoreColor(score)}`}>{getScoreLabel(score)}</p>
            <p className="text-sm text-muted-foreground mt-1">ציון בריאות מס</p>
          </div>
        </div>
        <div className="space-y-2">
          {items.map((item) => {
            const cfg = statusConfig[item.status]
            const Icon = cfg.icon
            return (
              <div key={item.label} className={`flex items-center justify-between rounded-lg p-3 ${cfg.bg}`}>
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${cfg.color}`} />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <div className="text-left">
                  <span className={`text-xs ${cfg.color}`}>{item.detail}</span>
                  {item.dueDate && (
                    <span className="block text-xs text-muted-foreground">{item.dueDate}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
