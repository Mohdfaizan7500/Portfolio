import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// Option 1: Simple Icon Toggle
export const ThemeToggle = ({ className = '' }) => {
    const { theme, toggleTheme, isDarkMode } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
        relative p-2 rounded-full 
       
        transition-all duration-300 ease-in-out
        
        ${className}
      `}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
            <div className="relative w-5 h-5">
                <MoonIcon
                    className={`
            w-5 h-5 text-indigo-400 
            transition-all duration-300 ease-in-out
            ${isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}
          `}
                />
                <SunIcon
                    className={`
            absolute top-0 left-0 w-5 h-5 text-yellow-500
            transition-all duration-300 ease-in-out
            ${isDarkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}
          `}
                />
            </div>
        </button>
    );
};
