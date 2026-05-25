import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, FileText, MessageSquare, CheckCircle, AlertCircle,
  Send, Eye, Download, Activity, ChevronDown
} from 'lucide-react'

type ActivityType = 'upload' | 'message' | 'approval' | 'alert' | 'submission' | 'view' | 'download'

interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  description?: string
  user?: string
  timestamp: string
  isNew?: boolean
  metadata?: Record<string, string>
}

interface ActivityTimelineProps {
  activities?: ActivityItem[]
  maxVisible?: number
}

const typeConfig: Record<ActivityType, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  upload: { icon: Upload, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/50' },
  message: { icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/50' },
  approval: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/50' },
  alert: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/50' },
  submission: { icon: Send, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/50' },
  view: { icon: Eye, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800' },
  download: { icon: Download, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/50' },
}

const defaultActivities: ActivityItem[] = [
  { id: '1', type: 'alert', title: 'מועד אחרון מתקרב', description: 'דוח שנתי 2024 — נותרו 36 ימים', timestamp: 'לפני 5 דקות', isNew: true },
  { id: '2', type: 'message', title: 'הודעה חדשה מהרואה חשבון', description: 'אנא שלח את תלושי השכר לחודש יוני', user: 'רו"ח כהן', timestamp: 'לפני שעה', isNew: true },
  { id: '3', type: 'approval', title: 'דוח מע"מ אושר', description: 'דוח מע"מ מאי 2025 הוגש בהצלחה', timestamp: 'אתמול, 14:32' },
  { id: '4', type: 'upload', title: 'מסמך הועלה', description: 'תלוש שכר מאי 2025.pdf', user: 'אתה', timestamp: 'לפני 2 ימים' },
  { id: '5', type: 'submission', title: 'דיווח מקדמה נשלח', description: 'מקדמת מס הכנסה יוני 2025 — ₪4,200', timestamp: 'לפני 3 ימים' },
  { id: '6', type: 'download', title: 'אישור הגשה הורד', description: 'אישור הגשת מע"מ אפריל 2025', timestamp: 'לפני שבוע' },
  { id: '7', type: 'message', title: 'תזכורת אוטומטית', description: 'מועד הגשת מע"מ מתקרב — 15 ליולי', timestamp: 'לפני שבוע' },
  { id: '8', type: 'upload', title: 'חשבונית הועלתה', description: 'חשבונית_0234.pdf', user: 'אתה', timestamp: 'לפני שבועיים' },
]

export default function ActivityTimeline({ activities = defaultActivities, maxVisible = 5 }: ActivityTimelineProps) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? activities : activities.slice(0, maxVisible)
  const newCount = activities.filter(a => a.isNew).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="rounded-2xl border bg-card shadow-sm"
      dir="rtl"
    >
      <div className="flex items-center justify-between border-b p-5">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">פעילות אחרונה</h2>
          {newCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {newCount}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">עדכון בזמן אמת</span>
      </div>

      <div className="p-5">
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute right-5 top-0 bottom-0 w-px bg-border" />

          <AnimatePresence>
            {visible.map((activity, idx) => {
              const cfg = typeConfig[activity.type]
              const Icon = cfg.icon
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative flex gap-4 pb-5 last:pb-0"
                >
                  {/* Icon dot */}
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${cfg.bg} ring-2 ring-background`}>
                    <Icon className={`h-4.5 w-4.5 ${cfg.color}`} style={{ width: '1.125rem', height: '1.125rem' }} />
                    {activity.isNew && (
                      <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500 ring-2 ring-background" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1.5 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className={`text-sm font-medium ${activity.isNew ? 'text-foreground' : 'text-foreground/80'}`}>
                          {activity.title}
                        </p>
                        {activity.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{activity.description}</p>
                        )}
                        {activity.user && (
                          <p className="text-xs text-primary mt-0.5">{activity.user}</p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{activity.timestamp}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {activities.length > maxVisible && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            {showAll ? 'הצג פחות' : `הצג עוד ${activities.length - maxVisible} פעולות`}
          </button>
        )}
      </div>
    </motion.div>
  )
              }
