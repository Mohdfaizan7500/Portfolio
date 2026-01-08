import React from 'react'
import HeroSection from '../pages/HeroSection'
import About from '../pages/About'
import Contectme from '../pages/Contectme'
import Skilles from '../pages/Skilles'
import Portfolio from '../pages/Portfolio'

const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Skilles />
      <Portfolio />
      <Contectme />
    </>
  )
}

export default Home