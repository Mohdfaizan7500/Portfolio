import React from 'react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { BsInstagram } from 'react-icons/bs';

const FooterSection = () => {

  return (
    <div className='w-full flex text-center bg-indigo-400 justify-center py-10 pb-35'>
      <div>
        {/* Name with animation */}
        <div className='animate-fade-up opacity-0' style={{ animationDelay: '200ms' }}>
          <h3 className='text-3xl font-bold text-gray-900 pb-10'>Mohd Faizan Khan</h3>
        </div>

        {/* Navigation with staggered animation */}
        <ul className='flex flex-row justify-center gap-5'>
          {['Home', 'About', 'Skill', 'Work', 'Contact'].map((item, index) => (
            <li
              key={item}
              className='animate-fade-up opacity-0 text-xl text-gray-900'
              style={{ animationDelay: `${300 + (index * 100)}ms` }}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Social icons with staggered animation */}
        <div className='flex flex-row gap-5 mt-10 justify-center'>
          {[
            { Icon: FaLinkedinIn, delay: 800 },
            { Icon: FaGithub, delay: 900 },
            { Icon: BsInstagram, delay: 1000 },
            { Icon: FaWhatsapp, delay: 1100 }
          ].map(({ Icon, delay }) => (
            <div
              key={delay}
              className='animate-fade-up opacity-0 p-3 bg-gray-900 rounded-md cursor-pointer hover:scale-110 transition-transform duration-300'
              style={{ animationDelay: `${delay}ms` }}
            >
              <Icon className={`w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 text-indigo-400 hover:text-white transition-colors duration-300`} />
            </div>
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