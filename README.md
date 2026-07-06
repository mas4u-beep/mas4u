# Mas4U Portal – פורטל לקוחות

> פורטל לקוחות מתקדם למשרד רואי חשבון, נבנה עם React + TypeScript + Tailwind CSS + Shadcn UI

## 🛠️ סטאק טכנולוגי

| טכנולוגיה | גרסה | תיאור |
|-----------|------|--------|
| **Vite** | ^5.3 | כלי בנייה מהיר |
| **React** | ^18.3 | ספריית UI |
| **TypeScript** | ^5.5 | בטיחות טיפוסים |
| **Tailwind CSS** | ^3.4 | עיצוב Utility-first + מצב כהה + RTL |
| **Shadcn UI** | latest | ספריית קומפוננטות UI |
| **Framer Motion** | ^11.3 | אנימציות ומעברים |
| **Recharts** | ^2.12 | גרפים ותרשימים |
| **Lucide React** | ^0.400 | אייקונים |
| **React Router** | ^6.24 | ניווט בין דפים |
| **Zustand** | ^4.5 | ניהול state |

**פונטים:** Rubik + Heebo (Google Fonts, עבריים)

## 📁 מבנה התיקיות

```
src/
├── components/
│   ├── dashboard/          # רכיבי לוח הבקרה (כרטיסי סטטיסטיקה, גרפים)
│   ├── layout/             # Header, Sidebar, Layout ראשי
│   └── ui/                 # קומפוננטות Shadcn UI בסיסיות
├── features/
│   ├── documents/          # טיפוסים ולוגיקה של מסמכים
│   ├── tools/              # טיפוסים ומחשבון מע"מ
│   └── knowledge/          # טיפוסים של מאגר ידע
├── hooks/
│   ├── useTheme.ts         # הוק למצב כהה/בהיר
│   └── useDocuments.ts     # הוק לניהול מסמכים
├── lib/
│   └── utils.ts            # פונקציית cn() + פורמט תאריכים ומספרים בעברית
├── pages/
│   ├── client/             # דפי לקוח: לוח בקרה, מסמכים, כלים, מאגר ידע
│   └── admin/              # דפי ניהול: לוח בקרה, ניהול לקוחות
├── App.tsx                 # ראוטר וניתוב
├── main.tsx                # נקודת הכניסה לאפליקציה
└── index.css               # Tailwind + משתני CSS + תמיכת RTL
```

## 🛠️ התקנה והרצה

```bash
# שכפול הפרויקט
git clone https://github.com/mas4u-beep/mas4u.git
cd mas4u

# התקנת תלויות
npm install

# הרצה במצב פיתוח
npm run dev

# בנייה לפרודקשן
npm run build
```

## ✨ תכונות

### 👤 פורטל לקוחות
- 📊 **לוח בקרה** – סטטיסטיקות, גרף פעילות חודשי (AreaChart), עדכונים אחרונים
- 📄 **מסמכים** – העלאה, הורדה, סינון לפי קטגוריה, מעקב סטטוס
- 🧮 **כלים פיננסיים** – מחשבון מע"מ, שכר, מס הכנסה, תזכורות מיסים
- 📚 **מאגר ידע** – מאמרים ומדריכים מקצועיים עם תמיכת חיפוש

### 🛡️ פורטל ניהול
- 📈 **סקירה כללית** – סטטיסטיקות משרד, BarChart, PieChart
- 👥 **ניהול לקוחות** – רשימת לקוחות, סינון, סטטיסטיקה

## 🎨 עיצוב

- ✅ תמיכה מלאה ב-**RTL** (עברית ואנגלית)
- 🌙 **Dark Mode** מובנה עם CSS variables
- 🔤 גופנים עבריים: **Rubik** ו-**Heebo**
- 🎨 צבע מותג Mas4U (כחול #1e40af)
- ✨ אנימציות עם **Framer Motion**

## 📦 Shadcn UI Setup

```bash
npx shadcn@latest add button card badge dialog tabs select
```

---
**Built for Mas4U Accounting Portal** 🏢
