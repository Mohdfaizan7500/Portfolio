import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Userlayouts from '../layouts/Userlayouts'
import Home from '../pages/Home'
// Import other pages you might have
import About from '../pages/About'
import Contact from '../pages/Contectme'
import Portfolio from '../pages/Portfolio'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Userlayouts />}>
        <Route index element={<Home />} />
        {/* Add more routes as needed */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="portfolio" element={<Portfolio />} />
      </Route>
      {/* Admin Routes */}
    </Routes>
  )
}

export default AppRoutes