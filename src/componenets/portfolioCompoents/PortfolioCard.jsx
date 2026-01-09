// components/PortfolioCard.js
import React from 'react';

const PortfolioCard = ({ 
    item, 
    isDarkMode, 
    handleViewProject, 
    handleDemoClick 
}) => {
    return (
        <div 
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
        >
            {/* Image */}
            <div className='h-48 overflow-hidden relative'>
                <img 
                    src={item.image} 
                    alt={item.title}
                    className='w-full h-full object-contain transition-transform duration-500 hover:scale-110'
                    loading='lazy'
                />
            </div>
            
            {/* Content */}
            <div className='p-6'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.title}
                    </h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                        {item.category}
                    </span>
                </div>
                
                {/* View Button */}
                <div className='flex flex-row gap-4'>
                    <button 
                        onClick={() => handleViewProject(item.link)}
                        className={`w-full py-2 rounded-lg font-medium ${isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } transition-colors duration-300 ${!item.link || item.link === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!item.link || item.link === '#'}
                    >
                        View Project
                    </button>
                    <button 
                        onClick={() => handleDemoClick(item)}
                        className={`w-full py-2 rounded-lg font-medium ${isDarkMode 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                            : 'bg-indigo-500 text-white hover:bg-indigo-600'
                        } transition-colors duration-300 ${!item.demoLink || item.demoLink === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!item.demoLink || item.demoLink === '#'}
                    >
                        Demo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioCard;