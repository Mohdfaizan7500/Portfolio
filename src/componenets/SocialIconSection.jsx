import React from 'react'
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { useTheme } from '../context/ThemeContext';

const SocialIconSection = () => {
    const { theme, isDarkMode } = useTheme();

    // Social media links - Replace with your actual URLs
    const socialLinks = [
        {
            Icon: FaLinkedinIn,
            delay: '200ms',
            url: 'https://linkedin.com/in/mohd-faizan-khan-924211244',
            title: 'Connect on LinkedIn'
        },
        {
            Icon: FaGithub,
            delay: '400ms',
            url: 'https://github.com/Mohdfaizan7500', // Replace with your GitHub
            title: 'View GitHub Profile'
        },
        {
            Icon: BsInstagram,
            delay: '600ms',
            url: 'https://instagram.com/pathan_sahab__91/', // Replace with your Instagram
            title: 'Follow on Instagram'
        }
    ];

    const handleIconClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className='flex flex-col gap-3 md:gap-4 lg:gap-6 items-center justify-end h-full'>
            {socialLinks.map(({ Icon, delay, url, title }) => (
                <div 
                    key={delay}
                    className='animate-slide-up opacity-0 cursor-pointer' 
                    style={{ animationDelay: delay }}
                    onClick={() => handleIconClick(url)}
                    title={title}
                >
                    <div className={`group ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2 flex justify-center items-center rounded-[10px] hover:bg-indigo-400 shadow-lg ${isDarkMode ? 'shadow-indigo-900/50' : 'shadow-indigo-900/30'} hover:shadow-xl hover:shadow-indigo-900/70 transition-all duration-300`}>
                        <Icon className={`w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 ${isDarkMode ? 'text-indigo-400' : 'text-gray-900'} group-hover:text-white transition-colors duration-300`} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SocialIconSection