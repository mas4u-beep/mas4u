import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from '@/components/layout/Layout'
import LoadingSpinner from '@/components/layout/LoadingSpinner'

// Lazy load pages
const Dashboard = lazy(() => import('@/pages/client/Dashboard'))
const Documents = lazy(() => import('@/pages/client/Documents'))
const Tools = lazy(() => import('@/pages/client/Tools'))
const Knowledge = lazy(() => import('@/pages/client/Knowledge'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminClients = lazy(() => import('@/pages/admin/AdminClients'))

function App() {
  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="documents" element={<Documents />} />
            <Route path="tools" element={<Tools />} />
            <Route path="knowledge" element={<Knowledge />} />
          </Route>
          <Route path="/admin" element={<Layout isAdmin />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="clients" element={<AdminClients />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
