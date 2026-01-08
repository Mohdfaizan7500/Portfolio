import React from 'react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { BsInstagram } from 'react-icons/bs'

const FooterSection = () => {
  // Social media links
  const socialLinks = [
    {
      Icon: FaLinkedinIn,
      delay: 800,
      url: 'https://www.linkedin.com/in/mohd-faizan-khan-924211244/',
      title: 'LinkedIn'
    },
    {
      Icon: FaGithub,
      delay: 900,
      url: 'https://github.com/Mohdfaizan7500',
      title: 'GitHub'
    },
    {
      Icon: BsInstagram,
      delay: 1000,
      url: 'hhttps://www.instagram.com/pathan_sahab__91/',
      title: 'Instagram'
    },
    {
      Icon: FaWhatsapp,
      delay: 1100,
      url: 'https://wa.me/+917078254220',
      title: 'WhatsApp'
    }
  ]

  // Navigation links (you can add actual hrefs to these too)
  const navLinks = [
    { name: 'Home', href: '#home' },       // Your HeroSection should have id="home"
    { name: 'About', href: '#about' },     // About.jsx should have id="about"
    { name: 'Skill', href: '#skills' },    // Skilles.jsx should have id="skills"
    { name: 'Work', href: '#work' },       // Portfolio.jsx should have id="work"
    { name: 'Contact', href: '#contact' }  // ContactMe.jsx should have id="contact"
  ]
  const handleSocialClick = (url, platform) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleNavClick = (href) => {
    // For smooth scrolling to sections if they exist on the same page
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        // Calculate offset for fixed header (adjust 80px based on your header height)
        const headerHeight = 80; // Adjust this based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className='w-full flex text-center bg-indigo-400 justify-center py-10 pb-35'>
      <div>
        {/* Name with animation */}
        <div className='animate-fade-up opacity-0' style={{ animationDelay: '200ms' }}>
          <h3 className='text-3xl font-bold text-gray-900 pb-10'>Mohd Faizan Khan</h3>
        </div>

        {/* Navigation with staggered animation */}
        <ul className='flex flex-row justify-center gap-5'>
          {navLinks.map((item, index) => (
            <li
              key={item.name}
              className='animate-fade-up opacity-0 text-xl text-gray-900 cursor-pointer hover:text-gray-700 transition-colors duration-300'
              style={{ animationDelay: `${300 + (index * 100)}ms` }}
              onClick={() => handleNavClick(item.href)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Social icons with staggered animation */}
        <div className='flex flex-row gap-5 mt-10 justify-center'>
          {socialLinks.map(({ Icon, delay, url, title }) => (
            <a
              key={delay}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className='animate-fade-up opacity-0 p-3 bg-gray-900 rounded-md cursor-pointer hover:scale-110 transition-transform duration-300'
              style={{ animationDelay: `${delay}ms` }}
              title={title}
              onClick={(e) => {
                e.preventDefault()
                handleSocialClick(url, title)
              }}
            >
              <Icon className={`w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 text-indigo-400 hover:text-white transition-colors duration-300`} />
            </a>
          ))}
        </div>

        {/* Copyright with animation */}
        <div className='animate-fade-up opacity-0' style={{ animationDelay: '1200ms' }}>
          <h5 className='text-gray-800 text-md mt-20'>© 2023 SSPK@. All rights reserved.</h5>
        </div>
      </div>
    </div>
  )
}

export default FooterSection