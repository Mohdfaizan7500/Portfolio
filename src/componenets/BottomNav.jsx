import React, { useState, useEffect } from 'react'
import { Home, User, Briefcase, Mail, FileText } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const BottomNav = () => {
    const { isDarkMode } = useTheme()
    const [activeTab, setActiveTab] = useState('home')

    const navItems = [
        { id: 1, icon: Home, label: 'Home', href: '#home', key: 'home' },
        { id: 2, icon: User, label: 'About', href: '#about', key: 'about' },
        { id: 4, icon: FileText, label: 'Skills', href: '#skills', key: 'skills' },
        { id: 3, icon: Briefcase, label: 'Work', href: '#work', key: 'work' },
        { id: 5, icon: Mail, label: 'Contact', href: '#contact', key: 'contact' }
    ]

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
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[380px] ">
                {/* Container */}
                <div className={`rounded-full px-6 py-4 backdrop-blur-3xl shadow-lg ${
                    isDarkMode 
                        ? 'bg-gray-900/15 border border-gray-700/20' 
                        : 'bg-white/15 border border-gray-300/20'
                }`}>
                    <div className="flex justify-between items-center">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.key

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.href, item.key)}
                                    className="relative p-2 group"
                                >
                                    {/* Gradient background with smooth transition */}
                                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ease-out ${
                                        isActive 
                                            ? 'bg-gradient-to-b from-indigo-500/80 via-indigo-300/80 to-indigo-100/80 blur-[1px] scale-100' 
                                            : 'scale-0'
                                    }`}></div>
                                    
                                    {/* Icon with smooth transition */}
                                    <div className="relative z-10">
                                        <Icon className={`w-6 h-6 transition-all duration-300 ease-out ${
                                            isActive 
                                                ? isDarkMode ? 'text-gray-100 scale-110' : 'text-gray-900 scale-110'
                                                : isDarkMode 
                                                    ? 'text-gray-300 group-hover:text-indigo-400 group-hover:scale-105' 
                                                    : 'text-gray-600 group-hover:text-indigo-500 group-hover:scale-105'
                                        }`} />
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="h-20 md:h-0"></div>
        </>
    )
}

export default BottomNav