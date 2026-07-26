import React, { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeButton';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

const HeaderSection = () => {
    const { theme, isDarkMode } = useTheme();
    const { data } = useData();
    const [hasShadow, setHasShadow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 3) {
                setHasShadow(true);
            } else {
                setHasShadow(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`
            fixed top-0 left-0 right-0 z-50
            flex items-center justify-between w-full 
            px-7 sm:px-9 md:px-20 lg:px-30 xl:px-30 2xl:px-40 
            py-4 xl:py-6 
            transition-all duration-300
            ${isDarkMode
                ? 'bg-gray-900 border-gray-900 text-gray-100'
                : 'bg-white border-gray-200 text-gray-900'
            }
            ${hasShadow 
                ? (isDarkMode 
                    ? 'shadow-lg shadow-black/30' 
                    : 'shadow-lg shadow-gray-400/30'
                  )
                : 'shadow-none'
            }
        `}>
            <div className='container mx-auto flex justify-between'>
                <div className="text-lg lg:text-2xl font-semibold text-indigo-400">
                    {data.personalInfo.name}
                </div>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default HeaderSection
