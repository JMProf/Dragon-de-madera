import { Routes, Route } from 'react-router-dom'
import { HomePage, ClubPage, SocioPage, LoginPage, SocioAreaPage } from '@/pages'
import { ProtectedRoute } from '@/components/atoms/ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/club" element={<ClubPage />} />
      <Route path="/socio" element={<SocioPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/area-socios"
        element={
          <ProtectedRoute>
            <SocioAreaPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
