import { motion } from 'framer-motion'
import GreetingHeader from '@/components/dashboard/GreetingHeader'
import TaxHealthCard from '@/components/dashboard/TaxHealthCard'
import AnnualReportStepper from '@/components/dashboard/AnnualReportStepper'
import PnlChart from '@/components/dashboard/PnlChart'
import QuickUpload from '@/components/dashboard/QuickUpload'
import TaxCalendar from '@/components/dashboard/TaxCalendar'
import ActivityTimeline from '@/components/dashboard/ActivityTimeline'
import ChatPreview from '@/components/dashboard/ChatPreview'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export default function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-8"
      dir="rtl"
    >
      {/* Greeting Header — full width */}
      <GreetingHeader
        clientName="ישראל ישראלי"
        lastLogin="24/05/2025 09:15"
      />

      {/* Row 1: Tax Health + Annual Stepper */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TaxHealthCard score={76} />
        <AnnualReportStepper year={2024} />
      </div>

      {/* Row 2: P&L Chart — full width */}
      <PnlChart title="דוח רווח והפסד 2025" />

      {/* Row 3: Quick Upload + Tax Calendar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <QuickUpload />
        <TaxCalendar />
      </div>

      {/* Row 4: Activity Timeline + Chat Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityTimeline />
        <ChatPreview />
      </div>
    </motion.div>
  )
}
