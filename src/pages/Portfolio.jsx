import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

// Import images from assets folder
import groceryApp from '../assets/images/toptenbazar.png';
import ecommerceWeb from '../assets/images/notaryweb.png';
import fitnessTracker from '../assets/images/notarymate.png';
import portfolioWeb from '../assets/images/lumtechweb.png';
import chatApp from '../assets/images/todolist.jpg';
import dashboardUI from '../assets/images/toptenweb.png';
import lernlyst from '../assets/images/lernlyst.png';

const Portfolio = () => {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('All');

    const tabs = [
        { id: 1, tabName: 'All' },
        { id: 2, tabName: 'App' },
        { id: 3, tabName: 'Web' },
    ];

    const portfolioItems = [
        {
            id: 1,
            title: 'Grocery App',
            category: 'App',
            link: '#',
            image: groceryApp
        },
        {
            id: 2,
            title: 'Notery Mate Web',
            category: 'Web',
            link: '#',
            image: ecommerceWeb
        },
        {
            id: 3,
            title: 'Notary Mate',
            category: 'App',
            link: '#',
            image: fitnessTracker
        },
        {
            id: 4,
            title: 'Lumetech Website',
            category: 'Web',
            link: '#',
            image: portfolioWeb
        },
        {
            id: 5,
            title: 'Todo List App',
            category: 'App',
            link: '#',
            image: chatApp
        },
        {
            id: 6,
            title: 'TopTenBazar website',
            category: 'Web',
            link: '#',
            image: dashboardUI
        },
         {
            id: 7,
            title: 'Learnlyst',
            category: 'App',
            link: '#',
            image: lernlyst
        },
    ];

    const filteredItems = activeTab === 'All' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === activeTab);

    return (
        <div id="work" className="scroll-mt-20"> 
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} id="portfolio">
            <div className='container mx-auto px-8 lg:px-40 py-16'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <h6 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                        My Portfolio
                    </h6>
                    <h2 className='text-3xl md:text-4xl font-bold text-indigo-400 mb-10'>
                        Recent Works
                    </h2>
                    
                    {/* Tabs */}
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
                </div>

                {/* Portfolio Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredItems.map((item) => (
                        <div 
                            key={item.id}
                            className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
                        >
                            {/* Image */}
                            <div className='h-48 overflow-hidden relative'>
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className='w-full h-full  object-contain transition-transform duration-500 hover:scale-110'
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
                                <button className={`w-full py-2 rounded-lg font-medium ${isDarkMode 
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                } transition-colors duration-300`}>
                                    View Project
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className='text-center py-12'>
                        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            No projects found in this category.
                        </p>
                    </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default Portfolio