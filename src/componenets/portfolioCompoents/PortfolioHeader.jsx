// components/PortfolioHeader.js
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const PortfolioHeader = ({ isDarkMode }) => {
    return (
        <div className='text-center mb-12'>
            <h6 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                My Portfolio
            </h6>
            <h2 className='text-3xl md:text-4xl font-bold text-indigo-400 mb-10'>
                Recent Works
            </h2>
        </div>
    );
};

export default PortfolioHeader;