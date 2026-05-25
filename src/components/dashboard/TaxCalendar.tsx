import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronRight, ChevronLeft, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

type EventType = 'vat' | 'income_tax' | 'national_insurance' | 'report' | 'deadline'

interface TaxEvent {
  id: string
  date: string // DD/MM/YYYY
  title: string
  type: EventType
  description?: string
  isCompleted?: boolean
  isDue?: boolean
}

interface TaxCalendarProps {
  events?: TaxEvent[]
}

const typeConfig: Record<EventType, { color: string; bg: string; label: string }> = {
  vat: { color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/50', label: 'מע"מ' },
  income_tax: { color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/50', label: 'מ. הכנסה' },
  national_insurance: { color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/50', label: 'ביטוח לאומי' },
  report: { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/50', label: 'דיווח' },
  deadline: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/50', label: 'מועד אחרון' },
}

const defaultEvents: TaxEvent[] = [
  { id: '1', date: '15/07/2025', title: 'דיווח מע"מ חודשי', type: 'vat', description: 'הגשת דוח מע"מ לחודש יוני', isDue: true },
  { id: '2', date: '31/07/2025', title: 'מקדמת מס הכנסה', type: 'income_tax', description: 'תשלום מקדמה חודשית' },
  { id: '3', date: '31/07/2025', title: 'דמי ביטוח לאומי', type: 'national_insurance' },
  { id: '4', date: '15/08/2025', title: 'דיווח מע"מ חודשי', type: 'vat', description: 'הגשת דוח מע"מ לחודש יולי' },
  { id: '5', date: '31/08/2025', title: 'מקדמת מס הכנסה', type: 'income_tax' },
  { id: '6', date: '30/09/2025', title: 'דוח שנתי 2024 — מועד אחרון', type: 'deadline', isDue: true },
  { id: '7', date: '15/06/2025', title: 'דיווח מע"מ מאי', type: 'vat', isCompleted: true },
  { id: '8', date: '30/06/2025', title: 'מקדמת מס הכנסה', type: 'income_tax', isCompleted: true },
]

function parseDate(dateStr: string): Date {
  const [d, m, y] = dateStr.split('/').map(Number)
  return new Date(y, m - 1, d)
}

const MONTHS_HE = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר']

export default function TaxCalendar({ events = defaultEvents }: TaxCalendarProps) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const monthEvents = events
    .filter(e => {
      const d = parseDate(e.date)
      return d.getMonth() === viewMonth && d.getFullYear() === viewYear
    })
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())

  const upcomingEvents = events
    .filter(e => {
      const d = parseDate(e.date)
      return d >= today && !e.isCompleted
    })
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())
    .slice(0, 4)

  const daysUntil = (dateStr: string) => {
    const d = parseDate(dateStr)
    return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border bg-card shadow-sm"
      dir="rtl"
    >
      <div className="flex items-center gap-2 border-b p-5">
        <Calendar className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">לוח מועדי מס</h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Month nav */}
        <div className="flex items-center justify-between">
          <button onClick={nextMonth} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
          <h3 className="font-semibold text-foreground">{MONTHS_HE[viewMonth]} {viewYear}</h3>
          <button onClick={prevMonth} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Month events */}
        <div className="space-y-2">
          {monthEvents.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">אין מועדים בחודש זה</p>
          ) : (
            monthEvents.map(event => {
              const cfg = typeConfig[event.type]
              const d = parseDate(event.date)
              return (
                <div key={event.id} className={`flex items-start gap-3 rounded-lg border p-3 ${event.isCompleted ? 'opacity-60' : ''} ${event.isDue ? 'border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20' : ''}`}>
                  <div className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg ${cfg.bg}`}>
                    <span className={`text-lg font-bold leading-none ${cfg.color}`}>{d.getDate()}</span>
                    <span className={`text-xs ${cfg.color}`}>{MONTHS_HE[d.getMonth()].slice(0,3)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                      {event.isCompleted && <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />}
                      {event.isDue && !event.isCompleted && <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />}
                    </div>
                    {event.description && <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>}
                    <span className={`inline-block mt-1 text-xs px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Upcoming events */}
        {upcomingEvents.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> קרוב אלייך
            </h4>
            <div className="space-y-1.5">
              {upcomingEvents.map(event => {
                const days = daysUntil(event.date)
                const cfg = typeConfig[event.type]
                return (
                  <div key={event.id} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${cfg.bg.replace('bg-','bg-').replace('/50','').replace('/40','')}`} style={{ backgroundColor: cfg.color.replace('text-','').includes('-') ? '' : '' }} />
                      <span className="text-sm text-foreground truncate">{event.title}</span>
                    </div>
                    <span className={`text-xs font-medium shrink-0 mr-2 ${days <= 7 ? 'text-red-500' : days <= 14 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                      {days === 0 ? 'היום!' : days === 1 ? 'מחר' : `עוד ${days} ימים`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
    }
