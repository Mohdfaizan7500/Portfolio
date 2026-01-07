import React from 'react'
import { useTheme } from '../context/ThemeContext';
import resumePDF from '../assets/Faizan-React-Native.pdf';
const NameSection = () => {
    const { theme, isDarkMode } = useTheme();
    
    // Function to handle CV download
    const handleDownloadCV = () => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = resumePDF; // Path to your PDF in public folder
        link.download = 'Mohd_Faizan_Khan_CV.pdf'; // Custom filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className='flex flex-col items-center justify-center text-center min-h-[400px]'>
            {/* "Hello, I'm" with slide-down animation */}
            <div className='animate-slide-down opacity-0' style={{ animationDelay: '200ms' }}>
                <h1 className={`text-lg md:text-3xl lg:text-4xl ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-3`}>
                    Hello, I'm
                </h1>
            </div>

            {/* Name with slide-down animation */}
            <div className='animate-slide-down opacity-0' style={{ animationDelay: '400ms' }}>
                <h2 className={`text-2xl md:text-4xl font-bold text-indigo-400 mb-4`}>
                    Mohd Faizan Khan
                </h2>
            </div>

            {/* Job title with slide-down animation */}
            <div className='animate-slide-down opacity-0' style={{ animationDelay: '600ms' }}>
                <p className={`text-md md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} max-w-2xl mb-10`}>
                    React Native Developer
                </p>
            </div>

            {/* Buttons with slide-down animation */}
            <div className='animate-slide-down opacity-0' style={{ animationDelay: '800ms' }}>
                <div className='flex flex-row gap-4 md:gap-4 lg:gap-6'>
                    <button 
                        onClick={handleDownloadCV}
                        className={`px-4 py-3 text-sm border-1 border-indigo-400 ${isDarkMode ? 'text-indigo-400' : 'text-gray-800'} ${isDarkMode && `hover:text-gray-900`} font-semibold rounded-lg hover:bg-indigo-400 transition duration-300 shadow-xl`}
                    >
                        Download CV
                    </button>
                    <button className='px-6 py-3 shadow-2xl text-sm bg-indigo-400 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-300'>
                        About
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NameSection;