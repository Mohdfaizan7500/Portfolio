import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Userlayouts from '../layouts/Userlayouts'
import AdminLayout from '../admin/components/AdminLayout'
import { useAdminAuth } from '../context/AdminAuthContext'

import Home from '../pages/Home'
import AdminLogin from '../admin/pages/Login'
import AdminDashboard from '../admin/pages/Dashboard'
import PersonalInfoPage from '../admin/pages/PersonalInfo'
import AboutStatsPage from '../admin/pages/AboutStats'
import SkillsPage from '../admin/pages/Skills'
import PortfolioItemsPage from '../admin/pages/PortfolioItems'
import DemoImagesPage from '../admin/pages/DemoImages'
import SocialLinksPage from '../admin/pages/SocialLinks'
import ContactInfoPage from '../admin/pages/ContactInfo'
import SectionLabelsPage from '../admin/pages/SectionLabels'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminAuth()
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Userlayouts />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Home />} />
        <Route path="contact" element={<Home />} />
        <Route path="portfolio" element={<Home />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="personal-info" element={<PersonalInfoPage />} />
        <Route path="about-stats" element={<AboutStatsPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="portfolio-items" element={<PortfolioItemsPage />} />
        <Route path="demo-images" element={<DemoImagesPage />} />
        <Route path="social-links" element={<SocialLinksPage />} />
        <Route path="contact-info" element={<ContactInfoPage />} />
        <Route path="section-labels" element={<SectionLabelsPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
