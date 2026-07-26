import React, { useState, useEffect } from 'react'
import { Home, User, Briefcase, Mail, FileText } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useData } from '../context/DataContext'

const iconMap = {
  Home,
  User,
  Briefcase,
  Mail,
  FileText,
};

const BottomNav = () => {
    const { isDarkMode } = useTheme()
    const { data } = useData()
    const [activeTab, setActiveTab] = useState('home')

    const navItems = data.bottomNav;

    useEffect(() => {
        const handleScroll = () => {
            navItems.forEach(item => {
                const element = document.querySelector(item.href)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveTab(item.key)
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href, key) => {
        setActiveTab(key)
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            window.history.pushState({}, '', href)
        }
    }

    return (
        <>
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[380px]">
                <div className={`rounded-full px-6 py-4 backdrop-blur-3xl shadow-lg ${
                    isDarkMode 
                        ? 'bg-gray-900/10 border border-gray-700/30' 
                        : 'bg-white/10 border border-gray-300/30'
                }`}>
                    <div className="flex justify-between items-center">
                        {navItems.map((item) => {
                            const Icon = iconMap[item.icon] || Home
                            const isActive = activeTab === item.key

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.href, item.key)}
                                    className="relative p-2 group focus:outline-none"
                                    aria-label={item.label}
                                >
                                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ease-out ${
                                        isActive 
                                            ? 'bg-gradient-to-b from-indigo-500/80 via-indigo-300/80 to-indigo-100/80 blur-[1px] scale-100' 
                                            : 'scale-0'
                                    }`}></div>
                                    
                                    <div className="relative z-10">
                                        <Icon className={`w-6 h-6 transition-all duration-300 ease-out ${
                                            isActive 
                                                ? isDarkMode ? 'text-gray-100 scale-110' : 'text-gray-900 scale-110'
                                                : isDarkMode 
                                                    ? 'text-gray-300 group-hover:text-indigo-400 group-hover:scale-105' 
                                                    : 'text-gray-600 group-hover:text-indigo-500 group-hover:scale-105'
                                        }`} />
                                    </div>
                                    
                                    <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none ${
                                        isDarkMode 
                                            ? 'bg-gray-800 text-gray-200' 
                                            : 'bg-gray-900 text-white'
                                    }`}>
                                        {item.label}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomNav
