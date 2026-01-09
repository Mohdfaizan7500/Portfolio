// Portfolio.js
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Import components
import PortfolioHeader from '../componenets/portfolioCompoents/PortfolioHeader';
import PortfolioTabs from '../componenets/portfolioCompoents/PortfolioTabs';
import PortfolioGrid from '../componenets/portfolioCompoents/PortfolioGrid';
import DemoModal from '../componenets/portfolioCompoents/DemoModal';

// Import data
import { tabs, portfolioItems } from '../data/portfolioData';

const Portfolio = () => {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('All');
    const [selectedDemo, setSelectedDemo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredItems = activeTab === 'All' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === activeTab);

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
                        {/* Header */}
                        <PortfolioHeader isDarkMode={isDarkMode} />
                        
                        {/* Tabs */}
                        <PortfolioTabs 
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            tabs={tabs}
                            isDarkMode={isDarkMode}
                        />

                        {/* Portfolio Grid */}
                        <PortfolioGrid 
                            filteredItems={filteredItems}
                            isDarkMode={isDarkMode}
                            handleViewProject={handleViewProject}
                            handleDemoClick={handleDemoClick}
                        />
                    </div>
                </div>
            </div>

            {/* Demo Modal */}
            <DemoModal 
                isModalOpen={isModalOpen}
                selectedDemo={selectedDemo}
                closeModal={closeModal}
            />
        </>
    );
};

export default Portfolio;