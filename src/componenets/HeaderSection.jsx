import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react';
import { ThemeToggle } from './ThemeButton';
import { useTheme } from '../context/ThemeContext';

const HeaderSection = () => {
    const { theme, isDarkMode } = useTheme();
    const [hasShadow, setHasShadow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if scroll position is more than 3 pixels
            if (window.scrollY > 3) {
                setHasShadow(true);
            } else {
                setHasShadow(false);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Check initial scroll position
        handleScroll();

        // Clean up
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    console.log("theme:", theme, "is dark mode :", isDarkMode);

    return (
        <div className={`
            fixed top-0 left-0 right-0 z-50
            flex items-center justify-between w-full 
            px-7 sm:px-9 md:px-15 lg:px-20 xl:px-30 2xl:px-40 
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
                <div className="text-lg lg:text-2xl font-semibold text-cyan-500 dark:text-indigo-400">
                    Mohd Faizan Khan
                </div>

                <ThemeToggle />
            </div>
        </div>
    )
}

export default HeaderSection