// components/PortfolioGrid.js
import React from 'react';
import PortfolioCard from './PortfolioCard';

const PortfolioGrid = ({ 
    filteredItems, 
    isDarkMode, 
    handleViewProject, 
    handleDemoClick 
}) => {
    if (filteredItems.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No projects found in this category.
                </p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredItems.map((item) => (
                <PortfolioCard
                    key={item.id}
                    item={item}
                    isDarkMode={isDarkMode}
                    handleViewProject={handleViewProject}
                    handleDemoClick={handleDemoClick}
                />
            ))}
        </div>
    );
};

export default PortfolioGrid;