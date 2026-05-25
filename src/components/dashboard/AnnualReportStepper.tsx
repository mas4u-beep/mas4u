import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock, FileText, Upload, Search, Send, Award } from 'lucide-react'

type StepStatus = 'completed' | 'current' | 'pending'

interface ReportStep {
  id: number
  label: string
  description: string
  status: StepStatus
  icon: React.ComponentType<{ className?: string }>
  date?: string
}

interface AnnualReportStepperProps {
  year?: number
  steps?: ReportStep[]
}

const defaultSteps: ReportStep[] = [
  { id: 1, label: 'איסוף מסמכים', description: 'העלאת כל המסמכים הנדרשים', status: 'completed', icon: Upload, date: '01/03/2025' },
  { id: 2, label: 'בדיקה ראשונית', description: 'בדיקת שלמות המסמכים', status: 'completed', icon: Search, date: '15/03/2025' },
  { id: 3, label: 'הכנת הדוח', description: 'עריכת דוח שנתי', status: 'current', icon: FileText },
  { id: 4, label: 'אישור לקוח', description: 'חתימה ואישור סופי', status: 'pending', icon: CheckCircle2 },
  { id: 5, label: 'הגשה לרשויות', description: 'הגשה לרשות המסים', status: 'pending', icon: Send },
  { id: 6, label: 'אישור הגשה', description: 'קבלת אישור הגשה', status: 'pending', icon: Award },
]

const statusConfig = {
  completed: { iconColor: 'text-green-500', lineColor: 'bg-green-500', bgColor: 'bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800' },
  current: { iconColor: 'text-primary', lineColor: 'bg-primary', bgColor: 'bg-primary/5 border-primary/30' },
  pending: { iconColor: 'text-muted-foreground', lineColor: 'bg-border', bgColor: 'bg-card border-border' },
}

export default function AnnualReportStepper({ year = 2024, steps = defaultSteps }: AnnualReportStepperProps) {
  const completedCount = steps.filter(s => s.status === 'completed').length
  const progress = Math.round((completedCount / steps.length) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border bg-card shadow-sm"
      dir="rtl"
    >
      <div className="flex items-center justify-between border-b p-5">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">דוח שנתי {year}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{completedCount}/{steps.length} שלבים</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {progress}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 pt-4 pb-1">
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </div>

      <div className="p-5 space-y-3">
        {steps.map((step, idx) => {
          const cfg = statusConfig[step.status]
          const Icon = step.icon
          const isLast = idx === steps.length - 1
          return (
            <div key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${cfg.bgColor} shrink-0`}>
                  {step.status === 'completed' ? (
                    <CheckCircle2 className={`h-5 w-5 ${cfg.iconColor}`} />
                  ) : step.status === 'current' ? (
                    <Clock className={`h-5 w-5 ${cfg.iconColor} animate-pulse`} />
                  ) : (
                    <Circle className={`h-5 w-5 ${cfg.iconColor}`} />
                  )}
                </div>
                {!isLast && <div className={`w-0.5 flex-1 mt-1 ${cfg.lineColor} min-h-[12px]`} />}
              </div>
              <div className={`pb-3 pt-1 flex-1 flex items-start justify-between`}>
                <div>
                  <p className={`text-sm font-medium ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                </div>
                {step.date && (
                  <span className="text-xs text-muted-foreground mt-0.5 shrink-0 mr-2">{step.date}</span>
                )}
                {step.status === 'current' && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium shrink-0 mr-2">
                    בתהליך
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
    }
