// components/PortfolioCard.jsx
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
            role="article"
            aria-label={`Project: ${item.title}`}
        >
            {/* Image */}
            <div className='h-48 overflow-hidden relative bg-gray-900/5'>
                <img 
                    src={item.image} 
                    alt={item.title}
                    className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
                    loading='lazy'
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
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
                
                {/* Buttons Container */}
                <div className='flex gap-3 mt-4'>
                    {/* View Project Button */}
                    <button 
                        onClick={() => handleViewProject(item.link)}
                        className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-300 ${isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } ${!item.link || item.link === '#' ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                        disabled={!item.link || item.link === '#'}
                        aria-label={`View ${item.title} project`}
                    >
                        View Project
                    </button>
                    
                    {/* Demo Button - Only for apps */}
                    {item.category === 'App' && item.demoLink && item.demoLink !== '#' && (
                        <button 
                            onClick={() => handleDemoClick(item)}
                            className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-300 ${isDarkMode 
                                ? 'bg-indigo-400 text-white hover:bg-indigo-500' 
                                : 'bg-indigo-400 text-white hover:bg-indigo-500'
                            } hover:shadow-md`}
                            aria-label={`View ${item.title} demo`}
                        >
                            Demo
                        </button>
                    )}
                </div>
                
                {/* Description (Optional - if you want to add it) */}
                {item.description && (
                    <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PortfolioCard;