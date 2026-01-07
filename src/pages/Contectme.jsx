import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsChatDots } from "react-icons/bs";
import { FaLinkedinIn } from 'react-icons/fa6';
import { PlayIcon } from 'lucide-react';

const ContactMe = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const contactDetails = [
        {
            icon: <HiOutlineMail className={`w-7 h-7 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'} `} />,
            platform: "Email",
            username: "faizanpatha34@gmail.com",
            action: "Mail me"
        },
        {
            icon: <FaWhatsapp className={`w-7 h-7 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'} `} />,
            platform: "WhatsApp",
            username: "+91 7078254220",
            action: "Text me"
        },
        {
            icon: <FaLinkedinIn className={`w-7 h-7 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'} `} />,
            platform: "LinkedIn",
            username: "mohd-faizan-khan-924211244",
            action: "Write me"
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className='container mx-auto px-4 py-16'>
                {/* Header */}
                <div className='animate-fadeInBack opacity-0 flex flex-col items-center justify-center mb-12 [animation-delay:200ms] animate-fill-forwards'>
                    <h6 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Get in touch</h6>
                    <h2 className='text-2xl font-bold text-indigo-400 mb-8'>Contact Me</h2>
                </div>

                <div className='flex flex-col lg:flex-row gap-12'>
                    {/* Contact Details - Left Side */}
                    <div className='animate-slideInFromLeft opacity-0 lg:w-1/2 [animation-delay:400ms] animate-fill-forwards'>
                        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} `}>
                            <div className='flex items-center justify-center gap-3 mb-8'>
                                <BsChatDots className='w-6 h-6 text-indigo-400' />
                                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                    Talk to me
                                </h3>
                            </div>

                            <div className='space-y-6'>
                                {contactDetails.map((detail, index) => (
                                    <div
                                        key={index}
                                        className={`p-7 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${isDarkMode ? 'bg-gray-800 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className='flex items-center justify-center text-center gap-4'>

                                            <div>
                                                <div className='flex justify-center'>
                                                    {detail.icon}
                                                </div>

                                                <h4 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                                    {detail.platform}
                                                </h4>
                                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    {detail.username}
                                                </p>
                                                <div className='flex items-center gap-2 mt-2 justify-center'>
                                                    <span className='text-xs text-indigo-400 font-medium'>
                                                        Write me
                                                    </span>
                                                    <PlayIcon className='w-4 h-4 text-indigo-400' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form - Right Side */}
                    <div className='animate-slideInFromRight opacity-0 lg:w-1/2 [animation-delay:600ms] animate-fill-forwards'>
                        <div className='flex justify-center mb-8 '>
                            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                Write Me your Message
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-8'>
                            {/* Name Input */}
                            <div className='relative'>
                                <label
                                    className={`block absolute -top-3 left-4 px-2 text-sm font-medium transition-all duration-200 ${isDarkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`}
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-7 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${isDarkMode
                                        ? 'bg-gray-900 text-gray-100 border-2 border-gray-300'
                                        : 'bg-white text-gray-800 border-2 border-gray-300'
                                        }`}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className='relative'>
                                <label
                                    className={`block absolute -top-3 left-4 px-2 text-sm font-medium transition-all duration-200 ${isDarkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`}
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-5 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${isDarkMode
                                        ? 'bg-gray-900 text-gray-100 border-2 border-gray-300'
                                        : 'bg-white text-gray-800 border-2 border-gray-300'
                                        }`}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Message Input */}
                            <div className='relative'>
                                <label
                                    className={`block absolute -top-3 left-4 px-2 text-sm font-medium transition-all duration-200 ${isDarkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`}
                                >
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className={`w-full px-4 py-5 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none ${isDarkMode
                                        ? 'bg-gray-900 text-gray-100 border-2 border-gray-300'
                                        : 'bg-white text-gray-800 border-2 border-gray-300'
                                        }`}
                                    placeholder="Write your message here..."
                                    required
                                />
                            </div>

                            {/* Send Button */}
                            <button
                                type="submit"
                                className="px-10 inline-block bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactMe