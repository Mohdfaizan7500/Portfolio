import React from 'react'
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

const iconMap = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: BsInstagram,
  whatsapp: FaWhatsapp,
};

const SocialIconSection = () => {
    const { theme, isDarkMode } = useTheme();
    const { data } = useData();

    const activeLinks = data.socialLinks.filter(l => l.active).slice(0, 4);

    const handleIconClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className='flex flex-col gap-3 md:gap-4 lg:gap-6 items-center justify-end h-full'>
            {activeLinks.map((link, index) => {
              const Icon = iconMap[link.platform] || FaLinkedinIn;
              const delay = `${(index + 1) * 200}ms`;
              return (
                <div 
                    key={link.platform}
                    className='animate-slide-up opacity-0 cursor-pointer' 
                    style={{ animationDelay: delay }}
                    onClick={() => handleIconClick(link.url)}
                    title={link.title}
                >
                    <div className={`group ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2 flex justify-center items-center rounded-[10px] hover:bg-indigo-400 shadow-lg ${isDarkMode ? 'shadow-indigo-900/50' : 'shadow-indigo-900/30'} hover:shadow-xl hover:shadow-indigo-900/70 transition-all duration-300`}>
                        <Icon className={`w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 ${isDarkMode ? 'text-indigo-400' : 'text-gray-900'} group-hover:text-white transition-colors duration-300`} />
                    </div>
                </div>
              );
            })}
        </div>
    )
}

export default SocialIconSection
