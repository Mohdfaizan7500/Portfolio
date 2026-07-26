import React from 'react'
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import resumePDF from '../assets/Faizan-React-Native.pdf';

const NameSection = () => {
    const { theme, isDarkMode } = useTheme();
    const { data } = useData();
    const pi = data.personalInfo;

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = resumePDF;
        link.download = pi.resumeFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAboutClick = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            window.history.pushState({}, '', '#about');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center text-center min-h-[400px]'>
            <div className='animate-slide-down opacity-0' style={{ animationDelay: '200ms' }}>
                <h1 className={`text-lg md:text-3xl lg:text-4xl ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-3`}>
                    {pi.greeting}
                </h1>
            </div>
            <div className='animate-slide-down opacity-0' style={{ animationDelay: '400ms' }}>
                <h2 className={`text-2xl md:text-4xl font-bold text-indigo-400 mb-4`}>
                    {pi.name}
                </h2>
            </div>
            <div className='animate-slide-down opacity-0' style={{ animationDelay: '600ms' }}>
                <p className={`text-md md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} max-w-2xl mb-10`}>
                    {pi.jobTitle}
                </p>
            </div>
            <div className='animate-slide-down opacity-0' style={{ animationDelay: '800ms' }}>
                <div className='flex flex-row gap-4 md:gap-4 lg:gap-6'>
                    <button 
                        onClick={handleDownloadCV}
                        className={`px-4 py-3 text-sm border-1 border-indigo-400 ${isDarkMode ? 'text-indigo-400' : 'text-gray-800'} ${isDarkMode && `hover:text-gray-900`} font-semibold rounded-lg hover:bg-indigo-400 transition duration-300 shadow-xl`}
                    >
                        {pi.downloadCVLabel}
                    </button>
                    <button 
                        onClick={handleAboutClick}
                        className='px-6 py-3 shadow-2xl text-sm bg-indigo-400 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-300'
                    >
                        {pi.aboutButtonLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NameSection;
