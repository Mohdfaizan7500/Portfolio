import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useData } from '../context/DataContext'
import { CheckCircle } from 'lucide-react'

const Skills = () => {
    const { isDarkMode } = useTheme();
    const { data } = useData();
    const skills = data.skills;

    return (
        <div id="skills" className="scroll-mt-20">
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className='container mx-auto px-5 md:px:20 lg:px-35 py-16'>
                <div className='animate-fadeInBack opacity-0 flex flex-col items-center justify-center mb-12 [animation-delay:200ms] animate-fill-forwards'>
                    <h6 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{skills.heading}</h6>
                    <h2 className='text-2xl font-bold text-indigo-400 mb-8'>{skills.title}</h2>
                </div>

                <div className='animate-fadeInBack opacity-0 [animation-delay:400ms] animate-fill-forwards'>
                    <div className={`border-2 px-10  md:px-15 lg:px-20 py-10 rounded-4xl ${isDarkMode ? 'border-gray-700 ':'border-gray-300  '}shadow-2xl`}>
                        <h3 className={`text-xl font-bold mb-8 text-center ${isDarkMode ?'text-gray-100':'text-gray-800'} `}>
                            {skills.subHeading}
                        </h3>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {skills.items.map((skill, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 p-4  rounded-xl transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-500':'bg-white/80'} `}
                                >
                                    <CheckCircle className='w-5 h-5 text-indigo-400' />
                                    <span className={`font-medium ${isDarkMode ? 'text-gray-200':'text-gray-800'}`}>
                                        {skill}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='animate-fadeInBack opacity-0 mt-12 [animation-delay:600ms] animate-fill-forwards text-center'>
                    <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {skills.description}
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Skills
