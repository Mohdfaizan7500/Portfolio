import React from 'react';
import { useData } from '../../context/DataContext';

const PortfolioHeader = ({ isDarkMode }) => {
    const { data } = useData();
    const labels = data.sectionLabels.portfolio;

    return (
        <div className='text-center mb-12'>
            <h6 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                {labels.subtitle}
            </h6>
            <h2 className='text-3xl md:text-4xl font-bold text-indigo-400 mb-10'>
                {labels.title}
            </h2>
        </div>
    );
};

export default PortfolioHeader;
