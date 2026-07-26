import React from 'react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { BsInstagram } from 'react-icons/bs'
import { useData } from '../context/DataContext'

const iconComponents = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: BsInstagram,
  whatsapp: FaWhatsapp,
};

const FooterSection = () => {
  const { data } = useData();
  const { footer } = data;

  const activeSocialLinks = data.socialLinks.filter(l => l.active);

  const handleSocialClick = (url, platform) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 80;
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
        <div className='animate-fade-up opacity-0' style={{ animationDelay: '200ms' }}>
          <h3 className='text-3xl font-bold text-gray-900 pb-10'>{footer.name}</h3>
        </div>

        <ul className='flex flex-row justify-center gap-5'>
          {footer.navLinks.map((item, index) => (
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

        <div className='flex flex-row gap-5 mt-10 justify-center'>
          {activeSocialLinks.map((link, index) => {
            const Icon = iconComponents[link.platform] || FaLinkedinIn;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className='animate-fade-up opacity-0 p-3 bg-gray-900 rounded-md cursor-pointer hover:scale-110 transition-transform duration-300'
                style={{ animationDelay: `${800 + (index * 100)}ms` }}
                title={link.title}
                onClick={(e) => {
                  e.preventDefault()
                  handleSocialClick(link.url, link.title)
                }}
              >
                <Icon className={`w-3 md:w-4 lg:w-6 h-3 md:h-4 lg:h-6 text-indigo-400 hover:text-white transition-colors duration-300`} />
              </a>
            );
          })}
        </div>

        <div className='animate-fade-up opacity-0' style={{ animationDelay: '1200ms' }}>
          <h5 className='text-gray-800 text-md mt-20'>{footer.copyright}</h5>
        </div>
      </div>
    </div>
  )
}

export default FooterSection
