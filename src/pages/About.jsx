import React from 'react'
import { BiAward } from "react-icons/bi";
import { IoBagAdd } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { useTheme } from '../context/ThemeContext';

const About = () => {
    const { theme, isDarkMode } = useTheme();

    const imgLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s';

    const details = [
        {
            title: "Experience",
            des: "1+ Years Working",
            icon: <BiAward className="w-4 h-4" />
        },
        {
            title: "Projects",
            des: "4+ Completed",
            icon: <IoBagAdd className="w-4 h-4" />
        },
        {
            title: "Clients",
            des: "2+ Happy Clients",
            icon: <BiSupport className="w-4 h-4" />
        }
    ];

    return (
        <div className={`flex ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className='container mx-auto lg:px-30 flex flex-col py-10 justify-center items-center rounded-2xl'>
                {/* Header */}
                <div className='animate-fadeInBack opacity-0 flex flex-col items-center justify-center [animation-delay:200ms] animate-fill-forwards'>
                    <h6 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>My Intro</h6>
                    <h2 className='text-2xl font-bold text-indigo-400 mb-8'>About Me</h2>
                </div>

                {/* Content */}
                <div className='flex flex-col md:flex-row items-center gap-10 px-8 pt-13'>
                    {/* Image with fade animation - appears first */}
                    <div className='animate-fadeInBack opacity-0 [animation-delay:400ms] animate-fill-forwards'>
                        <img
                            src={imgLink}
                            alt="Profile"
                            className='w-80 md:w-100 lg:w-100 h-80 md:h-100 lg:h-100 object-cover rounded-3xl shadow-xl'
                        />
                    </div>

                    {/* Details Grid with fade animation - appears second */}
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
                        
                        {/* Description with fade animation - appears third */}
                        <div className='animate-fadeInBack opacity-0 [animation-delay:800ms] animate-fill-forwards'>
                            <div className='mt-10 px-6 text-center max-w-2xl text-sm'>
                                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Hello, I'm Faizan. As a React Native Developer, I specialize in developing high-performance mobile applications using JavaScript and React Native. My skill set includes creating responsive UIs, integrating RESTful APIs, implementing native modules, and optimizing app performance. I thrive on solving complex problems and delivering robust mobile solutions.
                                </p>
                            </div>
                        </div>
                        
                        {/* Button with fade animation - appears last */}
                        <div className='animate-fadeInBack opacity-0 [animation-delay:1000ms] animate-fill-forwards'>
                            <div className='px-5 justify-center flex py-8'>
                                <button className='bg-indigo-400 px-5 py-2 rounded-md text-white text-lg font-bold hover:bg-indigo-500 transition-colors duration-300'>
                                    Contact me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About