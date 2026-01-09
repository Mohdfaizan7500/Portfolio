// components/PortfolioTabs.js
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const PortfolioTabs = ({ activeTab, setActiveTab, tabs, isDarkMode }) => {
    return (
        <div className='flex flex-wrap justify-center gap-3 mb-12'>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.tabName)}
                    className={`px-5 py-2 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${activeTab === tab.tabName
                            ? 'bg-indigo-400 text-white shadow-lg'
                            : isDarkMode
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {tab.tabName}
                </button>
            ))}
        </div>
    );
};

export default PortfolioTabs;