import React, { useState, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useData } from '../context/DataContext'
import { HiOutlineMail } from "react-icons/hi";
import { BsChatDots } from "react-icons/bs";
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { PlayIcon, Loader2, MailOpen } from 'lucide-react';
import emailjs from '@emailjs/browser';

const iconMap = {
  email: <HiOutlineMail className="w-7 h-7 text-inherit" />,
  whatsapp: <FaWhatsapp className="w-7 h-7 text-inherit" />,
  linkedin: <FaLinkedinIn className="w-7 h-7 text-inherit" />,
};

const ContactMe = () => {
    const { isDarkMode } = useTheme();
    const { data } = useData();
    const ci = data.contactInfo;
    const ej = data.emailJS;
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const contactDetails = [
        {
            icon: React.cloneElement(iconMap.email, { className: `w-7 h-7 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}` }),
            platform: "Email",
            username: ci.email,
            action: ci.mailAction,
            link: ci.emailLink,
            type: "email"
        },
        {
            icon: React.cloneElement(iconMap.whatsapp, { className: `w-7 h-7 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}` }),
            platform: "WhatsApp",
            username: ci.whatsapp,
            action: ci.textAction,
            link: ci.whatsappLink,
            type: "whatsapp"
        },
        {
            icon: React.cloneElement(iconMap.linkedin, { className: `w-7 h-7 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}` }),
            platform: "LinkedIn",
            username: ci.linkedinUsername,
            action: ci.writeAction,
            link: ci.linkedinUrl,
            type: "linkedin"
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const stateFieldName = name === 'user_name' ? 'name' : 
                               name === 'user_email' ? 'email' : 
                               name === 'message' ? 'message' : name;
        setFormData(prev => ({ ...prev, [stateFieldName]: value }));
        if (isSuccess || error) {
            setIsSuccess(false);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await emailjs.sendForm(
                ej.serviceId,
                ej.templateId,
                formRef.current,
                ej.publicKey
            );

            if (result.status === 200 || result.text === 'OK') {
                setIsSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                alert(`✅ Message sent successfully!\n\nThank you ${formData.name}! Your message has been delivered.\n\nI'll get back to you within 24 hours.`);
                setIsSuccess(false);
            }
        } catch (err) {
            console.error('Email sending failed:', err);
            alert(`❌ Failed to send message.\n\nPlease try again later or contact me directly at ${ci.email}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="contact" className="scroll-mt-10">
            <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className='container mx-auto px-4 lg:px-35 md:px-52 py-16'>
                    <div className='animate-fadeInBack opacity-0 flex flex-col items-center justify-center mb-12 [animation-delay:200ms] animate-fill-forwards'>
                        <h6 className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{ci.sectionSubtitle}</h6>
                        <h2 className='text-2xl font-bold text-indigo-400 mb-8'>{ci.sectionTitle}</h2>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-12'>
                        <div className='animate-slideInFromLeft opacity-0 lg:w-1/2 [animation-delay:400ms] animate-fill-forwards'>
                            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                                <div className='flex items-center justify-center gap-3 mb-8'>
                                    <BsChatDots className='w-6 h-6 text-indigo-400' />
                                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                        {ci.connectHeading}
                                    </h3>
                                </div>

                                <div className='space-y-6'>
                                    {contactDetails.map((detail, index) => (
                                        <a
                                            key={index}
                                            href={detail.link}
                                            target={detail.type === 'email' ? '_self' : '_blank'}
                                            rel={detail.type !== 'email' ? 'noopener noreferrer' : ''}
                                            className={`block p-7 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isDarkMode
                                                    ? 'bg-gray-800 hover:bg-gray-700'
                                                    : 'bg-gray-100 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className='flex items-center justify-center text-center gap-4'>
                                                <div>
                                                    <div className='flex justify-center'>
                                                        {detail.icon}
                                                    </div>
                                                    <h4 className={`font-semibold mt-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-890'}`}>
                                                        {detail.platform}
                                                    </h4>
                                                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                        {detail.username}
                                                    </p>
                                                    <div className='flex items-center gap-2 mt-3 justify-center'>
                                                        <span className='text-xs text-indigo-400 font-medium'>
                                                            {detail.action}
                                                        </span>
                                                        <PlayIcon className='w-4 h-4 text-indigo-400' />
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='animate-slideInFromRight opacity-0 lg:w-1/2 [animation-delay:600ms] animate-fill-forwards'>
                            <div className='flex justify-center mb-8'>
                                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {ci.formHeading}
                                </h3>
                            </div>

                            {isLoading && (
                                <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg text-center">
                                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                                    Sending your message...
                                </div>
                            )}
                            
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                                    ❌ {error}
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} className='space-y-8'>
                                <div className='relative'>
                                    <label
                                        className={`block absolute -top-3 left-4 px-2 text-sm font-medium transition-all duration-200 ${isDarkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-white'}`}
                                    >
                                        {ci.formNameLabel}
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-7 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${isDarkMode
                                            ? 'bg-gray-900 text-gray-100 border-2 border-gray-700'
                                            : 'bg-white text-gray-800 border-2 border-gray-300'
                                            }`}
                                        placeholder="Enter your name"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className='relative'>
                                    <label
                                        className={`block absolute -top-3 left-4 px-2 text-sm font-medium transition-all duration-200 ${isDarkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-white'}`}
                                    >
                                        {ci.formEmailLabel}
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-5 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${isDarkMode
                                            ? 'bg-gray-900 text-gray-100 border-2 border-gray-700'
                                            : 'bg-white text-gray-800 border-2 border-gray-300'
                                            }`}
                                        placeholder="Enter your email"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className='relative'>
                                    <label
                                        className={`block absolute -top-3 left-4 px-2 text-sm font-medium transition-all duration-200 ${isDarkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-white'}`}
                                    >
                                        {ci.formMessageLabel}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="5"
                                        className={`w-full px-4 py-5 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none ${isDarkMode
                                            ? 'bg-gray-900 text-gray-200 border-2 border-gray-700'
                                            : 'bg-white text-gray-800 border-2 border-gray-300'
                                            }`}
                                        placeholder="Write your message here..."
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <input type="hidden" name="to_email" value={ci.toEmail} />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending your message...
                                        </>
                                    ) : (
                                        <>
                                            <MailOpen className="w-5 h-5" />
                                            {ci.sendButtonLabel}
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                                    {ci.privacyNote}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactMe;
