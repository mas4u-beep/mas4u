import { motion } from 'framer-motion'
import { Building2, Bell, Users, Palette, Save } from 'lucide-react'
import { useState } from 'react'

const officeInfo = {
  name: 'משרד רואי חשבון Mas4U',
  email: 'office@mas4u.co.il',
  phone: '03-9998877',
  address: 'רחוב הברזל 12, תל אביב',
}

const teamMembers = [
  { name: 'רו"ח אבי כהן', role: 'רואה חשבון ראשי', email: 'avi@mas4u.co.il' },
  { name: 'רו"ח מיכל שרון', role: 'רואת חשבון', email: 'michal@mas4u.co.il' },
  { name: 'דניאל אזולאי', role: 'מנהל/ת תפעול', email: 'daniel@mas4u.co.il' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AdminSettings() {
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyDocs, setNotifyDocs] = useState(true)
  const [darkModeDefault, setDarkModeDefault] = useState(false)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-8"
      dir="rtl"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">הגדרות</h1>
        <p className="text-muted-foreground">ניהול פרטי המשרד, הצוות והעדפות המערכת</p>
      </motion.div>

      {/* Office info */}
      <motion.div variants={itemVariants} className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">פרטי המשרד</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">שם המשרד</label>
            <input
              type="text"
              defaultValue={officeInfo.name}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">דוא"ל</label>
            <input
              type="email"
              defaultValue={officeInfo.email}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">טלפון</label>
            <input
              type="text"
              defaultValue={officeInfo.phone}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">כתובת</label>
            <input
              type="text"
              defaultValue={officeInfo.address}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={itemVariants} className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">התראות</h2>
        </div>
        <div className="space-y-3">
          <label className="flex items-center justify-between text-sm">
            <span>שליחת התראות בדוא"ל על מסמכים חדשים</span>
            <input
              type="checkbox"
              checked={notifyDocs}
              onChange={(e) => setNotifyDocs(e.target.checked)}
              className="h-4 w-4"
            />
          </label>
          <label className="flex items-center justify-between text-sm">
            <span>עדכוני דוא"ל על פעילות לקוחות</span>
            <input
              type="checkbox"
              checked={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.checked)}
              className="h-4 w-4"
            />
          </label>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div variants={itemVariants} className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">תצוגה</h2>
        </div>
        <label className="flex items-center justify-between text-sm">
          <span>מצב כהה כברירת מחדל</span>
          <input
            type="checkbox"
            checked={darkModeDefault}
            onChange={(e) => setDarkModeDefault(e.target.checked)}
            className="h-4 w-4"
          />
        </label>
      </motion.div>

      {/* Team */}
      <motion.div variants={itemVariants} className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">חברי הצוות</h2>
        </div>
        <div className="divide-y">
          {teamMembers.map((member) => (
            <div key={member.email} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <span className="text-sm text-muted-foreground">{member.email}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-end">
        <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Save className="h-4 w-4" />
          שמירת שינויים
        </button>
      </motion.div>
    </motion.div>
  )
}
