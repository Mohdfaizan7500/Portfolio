import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderSection from '../componenets/HeaderSection'
import FooterSection from '../componenets/FooterSection'
import BottomNav from '../componenets/BottomNav'

const Userlayouts = () => {
    return (
        <>
            <HeaderSection />
            <Outlet />
            <FooterSection />
            <BottomNav />
        </>
    )
}

export default Userlayouts