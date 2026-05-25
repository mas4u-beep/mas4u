# Mas4U Portal â ×¤××¨×× ××§××××ª

> ×¤××¨×× ××§××××ª ××ª×§×× ×××©×¨× ×¨××× ××©×××, ×× ×× ×¢× React + TypeScript + Tailwind CSS + Shadcn UI

## ð ×¡×××§ ××× ×××××

| ××× ×××××× | ××¨×¡× | ×ª××××¨ |
|-----------|------|--------|
| **Vite** | ^5.3 | Build tool ××××¨ |
| **React** | ^18.3 | UI Framework |
| **TypeScript** | ^5.5 | Type safety |
| **Tailwind CSS** | ^3.4 | Utility-first CSS + dark mode + RTL |
| **Shadcn UI** | latest | ×§×××¤×× × ×××ª UI |
| **Framer Motion** | ^11.3 | ×× ×××¦×××ª ×××§××ª |
| **Recharts** | ^2.12 | ××¨×¤×× ××ª×¨×©×××× |
| **Lucide React** | ^0.400 | ××××§×× ×× |
| **React Router** | ^6.24 | × ×××× |
| **Zustand** | ^4.5 | State management |

**×¤×× ×××:** Rubik + Heebo (Google Fonts, ×¢××¨××ª)

## ð ××× × ×ª××§×××ª

```
src/
âââ components/
â   âââ dashboard/
â   â   âââ StatsCard.tsx          # ××¨×××¡ ×¡××××¡×××§×
â   âââ layout/
â   â   âââ Layout.tsx             # Layout ×¨××©× RTL
â   â   âââ Sidebar.tsx            # ×ª×¤×¨×× ×¦×
â   â   âââ Header.tsx             # ×××ª×¨×ª + dark mode
â   â   âââ LoadingSpinner.tsx     # ×××¢×
â   âââ ui/
â       âââ button.tsx             # Shadcn Button
â       âââ card.tsx               # Shadcn Card
â       âââ badge.tsx              # Shadcn Badge
âââ pages/
â   âââ client/
â   â   âââ Dashboard.tsx          # ××× ××§×¨× ××§××
â   â   âââ Documents.tsx          # × ×××× ××¡××××
â   â   âââ Tools.tsx              # ×××× ×¤×× × ×¡×××
â   â   âââ Knowledge.tsx          # ××¡××¡ ×××¢
â   âââ admin/
â       âââ AdminDashboard.tsx     # ××× ××§×¨× ×××××
â       âââ AdminClients.tsx       # × ×××× ××§××××ª
âââ features/
â   âââ documents/                 # Types + logic
â   âââ tools/                     # Types + VAT calculator
â   âââ knowledge/                 # Types
âââ hooks/
â   âââ useTheme.ts               # Dark mode hook
â   âââ useDocuments.ts           # Documents hook
âââ lib/
â   âââ utils.ts                  # cn() + Hebrew formatters
âââ App.tsx                       # Router + routes
âââ main.tsx                      # Entry point
âââ index.css                     # Tailwind + CSS variables + RTL
```

## ð ï¸ ××ª×§× × ×××¨×¦×

```bash
# ×©××¤×× ××¤×¨×××§×
git clone https://github.com/mas4u-beep/mas4u-portal.git
cd mas4u-portal

# ××ª×§× ×ª ×ª×××××ª
npm install

# ××¨×¦× ××¡××××ª ×¤××ª××
npm run dev

# ×× ××× ××¤×¨×××§×©×
npm run build
```

## ð ×ª××× ××ª

### ð¤ ×¤××¨×× ××§××××ª
- ð **××× ××§×¨×** â ×¡××××¡×××§××ª, ××¨×¤×× ×¤×× × ×¡××× (AreaChart), ××¡×××× ×××¨×× ××
- ð **××¡××××** â × ××××, ×××¤××©, ×¡×× ×× ××¤× ×§××××¨××, ×××¨×× ××¦×¤×××
- ð§ **×××× ×¤×× × ×¡×××** â ×××©××× ××¢"×, ×©××¨, ××¡ ××× ×¡×, ×ª××¨×× ××××× ××
- ð **××¡××¡ ×××¢** â ××××¨×× ××××¨×××× ××§×¦××¢××× ×¢× ×ª××××ª ××××¤××©

### ð ×¤×× × × ××××
- ð **×¡×§××¨× ×××××ª** â ×¡××××¡×××§××ª ××©×¨×, BarChart, PieChart
- ð¥ **× ×××× ××§××××ª** â ×¨×©××× ××××, ×××¤××©, ×¡××××¡××

## ð¨ ×¢××¦××

- â ×ª×××× ×××× ×-**RTL** (×××× ××©×××)
- ð **Dark Mode** ×××× × ×¢× CSS variables
- ð¤ ×××¤× ×× ×¢××¨×××: **Rubik** ×-**Heebo**
- ð¨ ×¦××¢× ×××ª× Mas4U (×××× #1e40af)
- â¨ ×× ×××¦×××ª ×¢× **Framer Motion**

## ð Shadcn UI Setup

```bash
npx shadcn@latest add button card badge dialog tabs select
```

---
**Built for Mas4U Accounting Portal** ð¢
