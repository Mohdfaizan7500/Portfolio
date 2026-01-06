import React from 'react';
import { useTheme } from '../context/ThemeContext';
import NameSection from '../componenets/NameSection';
import MouseSection from '../componenets/MouseSection';
import SocialIconSection from '../componenets/SocialIconSection';
const HeroSection = () => {
  const { theme, isDarkMode, } = useTheme();
  console.log("")
  return (
    <section className={` ${isDarkMode ? 'bg-gray-900' : 'bg-white'}  md:pt-10 lg:pt-18 lg:px-40`}>
      <div className='container mx-auto px-4 flex flex-row justify-between items-center'>
        <SocialIconSection />
        <NameSection />
        <MouseSection />


      </div>
    </section>
  );
};

export default HeroSection;