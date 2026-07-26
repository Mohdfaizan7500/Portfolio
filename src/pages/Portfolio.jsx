import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

import PortfolioHeader from '../componenets/portfolioCompoents/PortfolioHeader';
import PortfolioTabs from '../componenets/portfolioCompoents/PortfolioTabs';
import PortfolioGrid from '../componenets/portfolioCompoents/PortfolioGrid';
import DemoModal from '../componenets/portfolioCompoents/DemoModal';

import { portfolioItems as defaultItems } from '../data/portfolioData';

const Portfolio = () => {
    const { isDarkMode } = useTheme();
    const { data } = useData();
    const [activeTab, setActiveTab] = useState('All');
    const [selectedDemo, setSelectedDemo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const items = data.portfolioItems.length > 0 ? data.portfolioItems : defaultItems;
    const tabs = data.portfolioTabs;

    const filteredItems = activeTab === 'All' 
        ? items
        : items.filter(item => item.category === activeTab);

    const handleViewProject = (link) => {
        if (link && link !== '#') {
            window.open(link, '_blank');
        }
    };

    const handleDemoClick = (item) => {
        if (item.demoLink && item.demoLink !== '#') {
            setSelectedDemo(item);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDemo(null);
    };

    return (
        <>
            <div id="work" className="scroll-mt-20"> 
                <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} id="portfolio">
                    <div className='container mx-auto px-8 lg:px-40 py-16'>
                        <PortfolioHeader isDarkMode={isDarkMode} />
                        
                        <PortfolioTabs 
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            tabs={tabs}
                            isDarkMode={isDarkMode}
                        />

                        <PortfolioGrid 
                            filteredItems={filteredItems}
                            isDarkMode={isDarkMode}
                            handleViewProject={handleViewProject}
                            handleDemoClick={handleDemoClick}
                        />
                    </div>
                </div>
            </div>

            <DemoModal 
                isModalOpen={isModalOpen}
                selectedDemo={selectedDemo}
                closeModal={closeModal}
            />
        </>
    );
};

export default Portfolio;
