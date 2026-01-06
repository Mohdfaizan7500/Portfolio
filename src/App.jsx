import React from 'react'
import HeaderSection from './componenets/HeaderSection'
import FooterSection from './componenets/FooterSection'
import Home from './pages/Home'

const App = () => {
  return (
    // <div className='w-full container mx-auto bg-amber-800'>
    <>
      <HeaderSection />
      <Home />
      <FooterSection />
      </>

    // </div>
  )
}

export default App