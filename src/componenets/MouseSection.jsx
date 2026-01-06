import { Mouse } from 'lucide-react'
import React from 'react'
import { useTheme } from '../context/ThemeContext'

const MouseSection = () => {
    const { isDarkMode } = useTheme();
    
    return (
        <div className='flex flex-col gap-10 lg:gap-15 items-center w-8 p-0 m-0'>
            {/* Mouse Icon with slide-up animation */}
            <div className='animate-slide-up opacity-0' style={{ animationDelay: '200ms' }}>
                <Mouse className={`w-5 md:w-8 lg:w-10 h-5 md:h-8 lg:h-10 ${isDarkMode ? 'text-indigo-400' : 'text-gray-800'}`} />
            </div>

            {/* Rotated text with slide-up animation */}
            <div className='animate-slide-up opacity-0' style={{ animationDelay: '400ms' }}>
                <div className="transform -rotate-90 whitespace-nowrap">
                    <span className={`text-sm lg:text-lg md:text-md ${isDarkMode ? 'text-indigo-400' : 'text-gray-700'}`}>
                        Scroll Down
                    </span>
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

export default MouseSection