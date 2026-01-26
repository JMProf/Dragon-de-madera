import { Routes, Route } from 'react-router-dom'
import { HomePage, ClubPage, SocioPage, LoginPage } from '@/pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/club" element={<ClubPage />} />
      <Route path="/socio" element={<SocioPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
