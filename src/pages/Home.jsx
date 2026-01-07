import React from 'react'
import HeroSection from './HeroSection'
import About from './About'
import Contectme from './Contectme'
import Skilles from './Skilles'
import Portfolio from './Portfolio'
const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Skilles/>
      <Portfolio/>
      <Contectme/>
    </>
  )
}

export default Home