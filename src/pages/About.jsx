import React from 'react'
import { BiAward } from "react-icons/bi";
import { IoBagAdd } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import profilepic from '../assets/images/profilepic.png'

const iconMap = {
  award: <BiAward className="w-4 h-4" />,
  bag: <IoBagAdd className="w-4 h-4" />,
  support: <BiSupport className="w-4 h-4" />,
};

const About = () => {
    const { theme, isDarkMode } = useTheme();
    const { data } = useData();
    const pi = data.personalInfo;

    const details = data.aboutStats.map(stat => ({
      ...stat,
      icon: iconMap[stat.icon] || <BiAward className="w-4 h-4" />
    }));

    const handleContactMeClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            window.history.pushState({}, '', '#contact');
        }
    };

    return (
       <div id="about" className="scroll-mt-20"> 
            <div className={`flex ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className='container mx-auto lg:px-30 flex flex-col py-10 justify-center items-center rounded-2xl'>
                    <div className='animate-fadeInBack opacity-0 flex flex-col items-center justify-center [animation-delay:200ms] animate-fill-forwards'>
                        <h6 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{pi.aboutSectionTitle}</h6>
                        <h2 className='text-2xl font-bold text-indigo-400 mb-8'>{pi.aboutSectionHeading}</h2>
                    </div>

                    <div className='flex flex-col md:flex-row items-center gap-10 px-8 pt-13'>
                        <div className='animate-fadeInBack opacity-0 [animation-delay:400ms] animate-fill-forwards'>
                            <div className={`w-80 md:w-100 lg:w-100 h-80 md:h-100 lg:h-100 ${isDarkMode ? 'bg-gray-900 ' : 'bg-white '}rounded-3xl flex items-center justify-center`}>
                                <img
                                    src={profilepic}
                                    alt="Profile"
                                    className='max-w-full max-h-full object-cover rounded-2xl'
                                />
                            </div>
                        </div>

                        <div className='justify-between flex flex-col h-full py-5'>
                            <div className='animate-fadeInBack opacity-0 [animation-delay:600ms] animate-fill-forwards'>
                                <div className='grid grid-cols-3 md:grid-cols-3 gap-2'>
                                    {details.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-5 rounded-xl shadow-lg text-center`}
                                        >
                                            <div className='flex justify-center mb-3'>
                                                <div className='text-indigo-400'>
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <h4 className={`text-[10px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{item.title}</h4>
                                            <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'} text-[8px] mt-3`}>{item.des}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='animate-fadeInBack opacity-0 [animation-delay:800ms] animate-fill-forwards'>
                                <div className='mt-10 px-6 text-center max-w-2xl text-sm'>
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {pi.bio}
                                    </p>
                                </div>
                            </div>

                            <div className='animate-fadeInBack opacity-0 [animation-delay:1000ms] animate-fill-forwards'>
                                <div className='px-5 justify-center flex py-8'>
                                    <button 
                                    onClick={handleContactMeClick}
                                    className='bg-indigo-400 px-5 py-2 rounded-md text-white text-lg font-bold hover:bg-indigo-500 transition-colors duration-300'>
                                        {pi.contactButtonLabel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
