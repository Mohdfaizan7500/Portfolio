import React, { useEffect, useState } from 'react'
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { useTheme } from '../context/ThemeContext';

const SocialIconSection = () => {
    const { theme, isDarkMode } = useTheme();

    return (
        <div className='flex flex-col gap-3 md:gap-4 lg:gap-6 items-center justify-end h-full'>
            <div className='animate-slide-up opacity-0' style={{ animationDelay: '200ms' }}>
                <div className={`group ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2 flex justify-center items-center rounded-[10px] hover:bg-indigo-400 shadow-lg ${isDarkMode ? 'shadow-indigo-900/50' : 'shadow-indigo-900/30'} hover:shadow-xl hover:shadow-indigo-900/70 transition-all duration-300`}>
                    <FaLinkedinIn className={`w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 ${isDarkMode ? 'text-indigo-400' : 'text-gray-900'} group-hover:text-white transition-colors duration-300`} />
                </div>
            </div>

            <div className='animate-slide-up opacity-0' style={{ animationDelay: '400ms' }}>
                <div className={`group ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2 flex justify-center items-center rounded-[10px] hover:bg-indigo-400 shadow-lg ${isDarkMode ? 'shadow-indigo-900/50' : 'shadow-indigo-900/30'} hover:shadow-xl hover:shadow-indigo-900/70 transition-all duration-300`}>
                    <FaGithub className={`w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 ${isDarkMode ? 'text-indigo-400' : 'text-gray-900'} group-hover:text-white transition-colors duration-300`} />
                </div>
            </div>

            <div className='animate-slide-up opacity-0' style={{ animationDelay: '600ms' }}>
                <div className={`group ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2 flex justify-center items-center rounded-[10px] hover:bg-indigo-400 shadow-lg ${isDarkMode ? 'shadow-indigo-900/50' : 'shadow-indigo-900/30'} hover:shadow-xl hover:shadow-indigo-900/70 transition-all duration-300`}>
                    <BsInstagram className={`w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 ${isDarkMode ? 'text-indigo-400' : 'text-gray-900'} group-hover:text-white transition-colors duration-300`} />
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(40px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-up {
                    animation: slideUp 1.4s ease-out forwards;
                }
            `}</style>
        </div>
    )
}

export default SocialIconSection